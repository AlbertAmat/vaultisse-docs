# Installazione

Questa pagina installa Vaultisse con Docker Compose su una macchina e finisce con te che hai effettuato l'accesso. Richiede circa dieci minuti. Renderlo raggiungibile da internet è un passaggio separato, vedi [Reverse proxy e HTTPS](./reverse-proxy).

## 1. Procurati i file {#get-the-files}

Crea una cartella per Vaultisse e scarica i tre file che servono:

```bash
mkdir vaultisse && cd vaultisse
mkdir -p assets/db
curl -O https://raw.githubusercontent.com/AlbertAmat/vaultisse/main/docker-compose.yml
curl -O https://raw.githubusercontent.com/AlbertAmat/vaultisse/main/.env.example
curl -o assets/db/databaseSchema.sql https://raw.githubusercontent.com/AlbertAmat/vaultisse/main/assets/db/databaseSchema.sql
```

> **Nota:** Lo schema del database deve finire in `assets/db/databaseSchema.sql`, accanto al file compose. `docker-compose.yml` lo monta con quel percorso relativo e il contenitore del database lo usa per creare le tabelle al primo avvio.

## 2. Crea il file delle impostazioni {#create-your-settings-file}

```bash
cp .env.example .env
```

Apri `.env` in un editor di testo. In una prima installazione contano quattro valori:

| Impostazione | Cosa inserire |
|---|---|
| `JWT_SECRET` | Una stringa lunga e casuale. Generala con `openssl rand -hex 32`. Firma le sessioni, quindi tienila riservata. |
| `DB_PASSWORD` | Una password a tua scelta per il database. Non lasciarla vuota. |
| `FRONT_END_URL` | L'indirizzo che le persone digiteranno nel browser. `http://localhost:3000` se lo usa solo questa macchina. Altri casi più sotto. |
| `ALLOW_DEV_AUTH` | Lascialo su `false`. Salta la schermata di accesso ed esiste solo per lo sviluppo. |

Il `FRONT_END_URL` giusto dipende da come si raggiunge il server:

- **Solo questa macchina:** `FRONT_END_URL=http://localhost:3000`.
- **Altri dispositivi della rete di casa** (un telefono, un tablet): usa l'indirizzo della macchina nella rete, per esempio `FRONT_END_URL=http://192.168.1.50:3000`, e imposta anche `ALLOW_HTTP=true`. I browser forzano `https://` su tutti i link di un sito HTTP semplice a meno che sappiano che è locale, quindi senza questa impostazione l'app si carica ma i suoi link non funzionano.
- **Un indirizzo pubblico con HTTPS:** vedi [Reverse proxy e HTTPS](./reverse-proxy).

Ogni altra impostazione ha un valore predefinito sicuro. L'elenco completo è nel [Riferimento della configurazione](./configuration).

## 3. Avvialo {#start-it}

```bash
docker compose up -d
```

Il primo avvio scarica le immagini e crea il database, il che può richiedere un minuto. Verifica che entrambi i contenitori siano in funzione:

```bash
docker compose ps
```

Dovresti vedere `db` come **healthy** e `app` come **running**. Se `app` si riavvia di continuo, esegui `docker compose logs app`: il messaggio in fondo di solito indica l'impostazione mancante. Vedi [Risoluzione dei problemi](./troubleshooting).

## 4. Crea il tuo account {#create-your-account}

Apri `FRONT_END_URL` seguito da `/register`, per esempio `http://localhost:3000/register`.

![La pagina di registrazione, con i campi nome, email, codice utente e password](/screenshots/register.png)

Compila i tuoi dati e fai clic su **Register**. La password richiede almeno 8 caratteri, con una lettera maiuscola, una cifra e un carattere speciale. Poi accedi.

Non esiste un account amministratore separato né una password predefinita. La prima persona che si registra riceve semplicemente un account normale, e ogni account parte con la propria biblioteca (un *vault*) che amministra. In seguito si possono invitare persone nella biblioteca di altri, vedi [Condividere una biblioteca e ruoli](../sharing-and-roles).

![La dashboard di un nuovo account Vaultisse](/screenshots/dashboard.png)

## 5. Decidi chi altro può registrarsi {#decide-who-else-can-register}

Per impostazione predefinita chiunque raggiunga `/register` può creare un account. Quando le persone che ti servono si sono registrate, puoi chiuderlo:

- `REGISTRATION_ENABLED=false` rimuove del tutto la pagina di registrazione. Nessuno può creare un account.
- `REGISTRATION_REQUIRES_APPROVAL=true` mantiene la pagina, ma i nuovi account non possono accedere finché non li abiliti. Non esiste ancora una schermata di amministrazione per questo, lo fai nel database:

  ```bash
  docker compose exec -T db psql -U postgres -d vaultisse \
    -c "UPDATE users SET disabled = FALSE WHERE code = 'nome-utente';"
  ```

  Usa il tuo `DB_USER` e `DB_NAME` se li hai cambiati.

Dopo aver modificato `.env`, applicalo con `docker compose up -d`. Compose ricrea il contenitore solo quando serve.

> **Suggerimento:** Se userai il single sign-on, è il provider di identità a decidere chi entra, e queste due impostazioni non si applicano agli accessi SSO. Vedi [Single sign-on](./single-sign-on).

## Dove sono salvate le cose {#where-things-are-stored}

| Cosa | Dove |
|---|---|
| Tutti i tuoi dati (libri, prestiti, account) | Il volume Docker `db-data` |
| Il registro dell'applicazione | Il volume Docker `app-logs`, file `bookStorage.log` |
| Le tue impostazioni | Il file `.env` accanto a `docker-compose.yml` |

Non eliminare il volume `db-data` e non eseguire mai `docker compose down -v`, che rimuove i volumi insieme ai contenitori. Vedi [Aggiornamenti e backup](./updating-and-backups).

## Prossimi passi

- Raggiungerlo da fuori casa: [Reverse proxy e HTTPS](./reverse-proxy).
- Accedere con gli account della tua organizzazione: [Single sign-on](./single-sign-on).
- Configura un backup prima di aggiungere tutta la tua biblioteca: [Aggiornamenti e backup](./updating-and-backups).
