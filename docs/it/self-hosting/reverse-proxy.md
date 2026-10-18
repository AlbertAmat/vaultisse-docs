# Reverse proxy e HTTPS

Così com'è, Vaultisse ascolta in HTTP semplice sulla porta 3000. Va bene sul tuo computer o sulla rete di casa. Per raggiungerlo da internet servono un nome di dominio e HTTPS, in modo che password e sessioni viaggino cifrate. Scegli **uno** di questi modi:

| Opzione | Ideale quando | Richiede |
|---|---|---|
| [Caddy](#caddy) | Hai un server con indirizzo pubblico e vuoi il minimo lavoro | Un dominio che punta al server, porte 80 e 443 aperte |
| [Nginx](#nginx) | Usi già Nginx | Lo stesso, più Certbot |
| [Cloudflare Tunnel](#cloudflare-tunnel) | Il tuo dominio è su Cloudflare, o non puoi aprire porte | Un account Cloudflare gratuito |
| [Unraid](#unraid) | Usi Unraid | La sua scheda Docker |

Qualunque tu scelga, queste due impostazioni in `.env` servono sempre:

```ini
FRONT_END_URL=https://books.example.com
TRUST_PROXY=true
```

`FRONT_END_URL` è l'indirizzo pubblico, esattamente come digitato nel browser. `TRUST_PROXY=true` avvisa Vaultisse che davanti c'è un proxy, così la sua protezione contro l'indovinare le password vede l'indirizzo reale di ogni visitatore e non quello del proxy. Lascia `ALLOW_HTTP=false`.

## Tieni privata la porta dell'app {#keep-the-apps-own-port-private}

Se il proxy gira sulla stessa macchina, pubblica la porta dell'app solo sull'indirizzo di loopback, così l'unico ingresso è il proxy. In `docker-compose.yml`, modifica il servizio `app`:

```yaml
    ports:
      - "127.0.0.1:${API_PORT:-3000}:${API_PORT:-3000}"
```

## Caddy {#caddy}

Caddy richiede e rinnova da solo il certificato HTTPS.

1. Punta il record `A` del tuo dominio (e `AAAA` per IPv6) al server.
2. Installa Caddy sul server, fuori da Docker, e inserisci questo in `/etc/caddy/Caddyfile`:

   ```
   books.example.com {
       reverse_proxy localhost:3000
   }
   ```

3. Applicalo:

   ```bash
   sudo systemctl reload caddy
   ```

4. Apri le porte 80 e 443 sul firewall. Non serve aprire altro.

## Nginx {#nginx}

Aggiungi un blocco `server` che passi le richieste all'app:

```nginx
server {
    server_name books.example.com;
    client_max_body_size 20m;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $remote_addr;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Poi ottieni il certificato con Certbot, che aggiunge per te la parte HTTPS:

```bash
sudo certbot --nginx -d books.example.com
```

`client_max_body_size` deve essere almeno grande quanto `MAX_EBOOK_FILE_SIZE_MB`, altrimenti i caricamenti degli ebook falliscono.

## Cloudflare Tunnel {#cloudflare-tunnel}

Un tunnel crea una connessione in uscita verso Cloudflare, quindi non apri **nessuna porta** e non gestisci certificati.

1. Nella dashboard di Cloudflare, vai su **Zero Trust → Networks → Tunnels** e crea un tunnel.
2. Aggiungi un hostname pubblico, per esempio `books.example.com`, con il servizio `http://app:3000`. È il nome del servizio Compose, non `localhost`.
3. Copia il token del tunnel e inseriscilo in `.env`:

   ```ini
   FRONT_END_URL=https://books.example.com
   TRUST_PROXY=true
   CLOUDFLARE_TUNNEL_TOKEN=<il tuo token>
   ```

4. Avvia lo stack con il profilo `cloudflare` in modo che giri anche il contenitore del tunnel:

   ```bash
   docker compose --profile cloudflare up -d
   ```

Quando funziona puoi rimuovere del tutto la voce `ports:` dal servizio `app`. Il tunnel raggiunge l'app attraverso la rete interna di Docker, quindi il server non ha più alcuna porta in ingresso.

## Unraid {#unraid}

Chi usa Unraid può aggiungere Vaultisse dalla scheda Docker invece di usare Compose.

1. Ti serve prima un server PostgreSQL, uno che già usi o il template ufficiale `postgres`. Carica `assets/db/databaseSchema.sql` una volta in un database vuoto.
2. In un browser sulla tua rete, apri questo indirizzo, sostituendo `TOWER-IP`:

   ```
   http://TOWER-IP/Docker/AddContainer?xmlTemplate=https://raw.githubusercontent.com/AlbertAmat/vaultisse/main/assets/unraid/vaultisse.xml
   ```

3. Compila `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `FRONT_END_URL` e `JWT_SECRET`, lascia `ALLOW_DEV_AUTH` su `false` e fai clic su **Apply**.
4. Per `http://TOWER-IP:3000` semplice sulla tua rete, imposta `ALLOW_HTTP=true` e `TRUST_PROXY=false`. Se aggiungi un proxy o un tunnel con HTTPS, imposta `ALLOW_HTTP=false` e `TRUST_PROXY=true`.

Se lo rendi raggiungibile da internet, dai a Vaultisse, al suo proxy e al suo database una rete Docker separata (`docker network create vaultisse-net`), e non usare reti `Host` o `br0` per esso. In questo modo un problema in questa app non può raggiungere gli altri tuoi contenitori.

## Verifica {#check-it}

- Apri `https://books.example.com` e controlla che compaia il lucchetto.
- Prova ad accedere. Se la pagina si carica ma l'accesso gira in tondo o i link non funzionano, `FRONT_END_URL` non coincide con ciò che hai digitato, oppure `ALLOW_HTTP` è sbagliato. Vedi [Risoluzione dei problemi](./troubleshooting).

## Lista di controllo della sicurezza {#security-checklist}

- [ ] `ALLOW_DEV_AUTH=false`
- [ ] `JWT_SECRET` generato con `openssl rand -hex 32`
- [ ] `DB_PASSWORD` è una password vera
- [ ] `TRUST_PROXY=true` dietro un proxy o un tunnel, `false` altrimenti
- [ ] `ALLOW_HTTP=false` ogni volta che c'è HTTPS davanti
- [ ] La porta dell'app è legata a `127.0.0.1`, oppure non pubblicata con un tunnel
- [ ] `APP_TAG` fissato a una versione
- [ ] La registrazione è chiusa quando le persone che ti servono hanno già un account
