# Servidor intermediari invers i HTTPS

Tal com ve, Vaultisse escolta en HTTP pla al port 3000. Està bé al vostre propi ordinador o xarxa domèstica. Per accedir-hi des d'internet necessiteu un nom de domini i HTTPS, de manera que contrasenyes i sessions viatgin xifrades. Trieu **una** d'aquestes maneres:

| Opció | Ideal quan | Necessita |
|---|---|---|
| [Caddy](#caddy) | Teniu un servidor amb adreça pública i voleu la menor feina | Un domini que apunti al servidor, ports 80 i 443 oberts |
| [Nginx](#nginx) | Ja feu servir Nginx | El mateix, més Certbot |
| [Cloudflare Tunnel](#cloudflare-tunnel) | El vostre domini és a Cloudflare, o no podeu obrir ports | Un compte gratuït de Cloudflare |
| [Unraid](#unraid) | Feu servir Unraid | La seva pestanya Docker |

Trieu el que trieu, aquests dos paràmetres de `.env` sempre fan falta:

```ini
FRONT_END_URL=https://books.example.com
TRUST_PROXY=true
```

`FRONT_END_URL` és l'adreça pública, exactament com s'escriu al navegador. `TRUST_PROXY=true` avisa Vaultisse que hi ha un intermediari davant, perquè la seva protecció contra l'endevinació de contrasenyes vegi l'adreça real de cada visitant i no la de l'intermediari. Deixeu `ALLOW_HTTP=false`.

## Mantingueu privat el port de l'aplicació {#keep-the-apps-own-port-private}

Si l'intermediari s'executa a la mateixa màquina, publiqueu el port de l'aplicació només a l'adreça de loopback, de manera que l'única entrada sigui l'intermediari. A `docker-compose.yml`, canvieu el servei `app`:

```yaml
    ports:
      - "127.0.0.1:${API_PORT:-3000}:${API_PORT:-3000}"
```

## Caddy {#caddy}

Caddy sol·licita i renova per si mateix el certificat HTTPS.

1. Apunteu el registre `A` del vostre domini (i `AAAA` per a IPv6) al servidor.
2. Instal·leu Caddy al servidor, fora de Docker, i poseu això a `/etc/caddy/Caddyfile`:

   ```
   books.example.com {
       reverse_proxy localhost:3000
   }
   ```

3. Apliqueu-ho:

   ```bash
   sudo systemctl reload caddy
   ```

4. Obriu els ports 80 i 443 al tallafoc. No cal obrir res més.

## Nginx {#nginx}

Afegiu un bloc `server` que passi les peticions a l'aplicació:

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

Després obteniu el certificat amb Certbot, que afegeix la part HTTPS per vosaltres:

```bash
sudo certbot --nginx -d books.example.com
```

`client_max_body_size` ha de ser almenys tan gran com `MAX_EBOOK_FILE_SIZE_MB`, o fallaran les pujades d'ebooks.

## Cloudflare Tunnel {#cloudflare-tunnel}

Un túnel fa una connexió sortint cap a Cloudflare, així que no obriu **cap port** ni gestioneu certificats.

1. Al tauler de Cloudflare, aneu a **Zero Trust → Networks → Tunnels** i creeu un túnel.
2. Afegiu un nom de host públic, per exemple `books.example.com`, amb el servei `http://app:3000`. És el nom del servei de Compose, no `localhost`.
3. Copieu el token del túnel i poseu-lo a `.env`:

   ```ini
   FRONT_END_URL=https://books.example.com
   TRUST_PROXY=true
   CLOUDFLARE_TUNNEL_TOKEN=<el vostre token>
   ```

4. Inicieu l'stack amb el perfil `cloudflare` perquè també s'executi el contenidor del túnel:

   ```bash
   docker compose --profile cloudflare up -d
   ```

Quan funcioni podeu treure del tot l'entrada `ports:` del servei `app`. El túnel arriba a l'aplicació per la xarxa interna de Docker, així que el servidor no té llavors cap port d'entrada.

## Unraid {#unraid}

Els usuaris d'Unraid poden afegir Vaultisse des de la pestanya Docker en lloc d'usar Compose.

1. Primer necessiteu un servidor PostgreSQL, un que ja feu servir o la plantilla oficial `postgres`. Carregueu `assets/db/databaseSchema.sql` una vegada en una base de dades buida.
2. En un navegador de la vostra xarxa, obriu aquesta adreça, substituint `TOWER-IP`:

   ```
   http://TOWER-IP/Docker/AddContainer?xmlTemplate=https://raw.githubusercontent.com/AlbertAmat/vaultisse/main/assets/unraid/vaultisse.xml
   ```

3. Ompliu `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `FRONT_END_URL` i `JWT_SECRET`, deixeu `ALLOW_DEV_AUTH` en `false` i feu clic a **Apply**.
4. Per a `http://TOWER-IP:3000` pla a la vostra xarxa, definiu `ALLOW_HTTP=true` i `TRUST_PROXY=false`. Si hi afegiu un intermediari o túnel amb HTTPS, definiu `ALLOW_HTTP=false` i `TRUST_PROXY=true`.

Si el feu accessible des d'internet, doneu a Vaultisse, al seu intermediari i a la seva pròpia base de dades una xarxa de Docker separada (`docker network create vaultisse-net`), i no feu servir xarxes `Host` ni `br0` per a ell. Així un problema en aquesta aplicació no pot arribar als vostres altres contenidors.

## Comproveu-ho {#check-it}

- Obriu `https://books.example.com` i comproveu que apareix el cadenat.
- Proveu d'iniciar sessió. Si la pàgina carrega però l'inici de sessió fa voltes o els enllaços fallen, `FRONT_END_URL` no coincideix amb el que heu escrit, o `ALLOW_HTTP` és incorrecte. Consulteu [Resolució de problemes](./troubleshooting).

## Llista de comprovació de seguretat {#security-checklist}

- [ ] `ALLOW_DEV_AUTH=false`
- [ ] `JWT_SECRET` generat amb `openssl rand -hex 32`
- [ ] `DB_PASSWORD` és una contrasenya real
- [ ] `TRUST_PROXY=true` darrere d'un intermediari o túnel, `false` en un altre cas
- [ ] `ALLOW_HTTP=false` sempre que hi hagi HTTPS davant
- [ ] El port de l'aplicació està enllaçat a `127.0.0.1`, o no publicat amb un túnel
- [ ] `APP_TAG` fixat a una versió
- [ ] El registre està tancat quan les persones que necessiteu ja tenen compte
