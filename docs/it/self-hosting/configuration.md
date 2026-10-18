# Riferimento della configurazione

Vaultisse si configura con variabili d'ambiente, definite nel file `.env` accanto a `docker-compose.yml`. Dopo aver modificato `.env`, applicalo con:

```bash
docker compose up -d
```

Le impostazioni che ometti usano il valore predefinito indicato sotto.

## L'essenziale {#the-essentials}

| Variabile | Predefinito | Cosa fa |
|---|---|---|
| `JWT_SECRET` | nessuno, **obbligatorio** | Segreto che firma le sessioni. Usa un valore lungo e casuale: `openssl rand -hex 32`. Cambiarlo disconnette tutti. |
| `DB_PASSWORD` | nessuno, **obbligatorio** | Password del database. |
| `FRONT_END_URL` | `http://localhost:3000` | L'indirizzo che le persone digitano nel browser, con `https://` e senza barra finale. Controlla quali origini accetta il server, quindi deve coincidere esattamente. |
| `ALLOW_DEV_AUTH` | `false` | Salta l'accesso con una sessione finta. **Mai `true`** su un server reale. |
| `APP_TAG` | `latest` | Quale versione di Vaultisse eseguire. Fissala, per esempio `1.3.5`. |

## Rete e porte {#network-and-ports}

| Variabile | Predefinito | Cosa fa |
|---|---|---|
| `API_PORT` | `3000` | Porta su cui ascolta l'app, e porta pubblicata sull'host. |
| `TRUST_PROXY` | `false` | Imposta `true` **solo** quando un reverse proxy o un tunnel sta davanti all'app. Fa sì che la limitazione dei tentativi usi l'indirizzo reale di ogni visitatore. Attivato senza proxy, i visitatori possono falsificare il proprio indirizzo. |
| `ALLOW_HTTP` | `false` | Imposta `true` **solo** quando l'app è raggiunta tramite `http://` semplice su qualcosa di diverso da `localhost`, come `http://192.168.1.50:3000`. Senza di esso i browser riscrivono ogni link in `https://`. Lascialo `false` ogni volta che c'è HTTPS davanti. |
| `CSP_EXTRA_IMG_SRC` | vuoto | Siti web aggiuntivi autorizzati a fornire le copertine, separati da virgole, per esempio `https://covers.example.com`. |
| `CLOUDFLARE_TUNNEL_TOKEN` | vuoto | Usato solo con il profilo `cloudflare`, vedi [Reverse proxy e HTTPS](./reverse-proxy#cloudflare-tunnel). |

## Database {#database}

| Variabile | Predefinito | Cosa fa |
|---|---|---|
| `DB_NAME` | `vaultisse` | Nome del database. |
| `DB_USER` | `postgres` | Utente del database. |
| `DB_PASSWORD` | nessuno | Password del database. |

Con il file compose fornito l'app raggiunge sempre il database come `db` sulla porta 5432 dentro la rete Compose, qualunque cosa dicano `DB_HOST` e `DB_PORT`. Questi due contano solo se esegui l'app fuori da Docker.

## Account e sessioni {#accounts-and-sessions}

| Variabile | Predefinito | Cosa fa |
|---|---|---|
| `REGISTRATION_ENABLED` | `true` | `false` disattiva la pagina di registrazione e il link di iscrizione. Nessuno può creare un account con password. |
| `REGISTRATION_REQUIRES_APPROVAL` | `false` | `true` permette di registrarsi, ma lascia l'account disattivato finché non lo abiliti nel database, vedi [Installazione](./installation#decide-who-else-can-register). |
| `SESSION_TIME` | `3600000` | Quanto dura un accesso senza attività, in millisecondi (un'ora). L'attività lo rinnova. |
| `MAX_SESSION_AGE_DAYS` | `30` | Il massimo che un accesso può durare, anche con attività costante. Dopo questo tempo bisogna accedere di nuovo. |
| `DEMO_MODE` | `false` | Rende l'istanza di sola lettura per demo pubbliche: funzionano solo accesso e consultazione, e l'SSO è disattivato. |

## Single sign-on {#single-sign-on}

Tutto questo è spiegato passo per passo in [Single sign-on](./single-sign-on).

| Variabile | Predefinito | Cosa fa |
|---|---|---|
| `OIDC_ISSUER` | vuoto | Indirizzo del tuo provider di identità. |
| `OIDC_CLIENT_ID` | vuoto | ID client del provider. |
| `OIDC_CLIENT_SECRET` | vuoto | Segreto client del provider. |
| `OIDC_REDIRECT_URI` | vuoto | Deve essere esattamente `https://tuo-indirizzo/auth/oidc/callback`. |
| `OIDC_SCOPES` | `openid profile email` | Cosa chiedere al provider. |
| `OIDC_BUTTON_LABEL` | `Sign in with SSO` | Testo del pulsante nella pagina di accesso. |
| `OIDC_GROUP_ROLES` | vuoto | Associa i gruppi del provider ai ruoli della biblioteca. |
| `OIDC_GROUPS_CLAIM` | `groups` | Nome del campo che contiene i gruppi di una persona. |

L'SSO è attivo solo quando i primi quattro sono tutti impostati.

## Caricamenti e limiti {#uploads-and-limits}

| Variabile | Predefinito | Cosa fa |
|---|---|---|
| `MAX_EBOOK_FILE_SIZE_MB` | `10` | L'ebook più grande (`.epub`, `.pdf`, `.mobi`, `.azw3`) che si può caricare su un libro. Aumentalo per i PDF scansionati. |
| `MAX_IMPORT_FILE_SIZE_MB` | `10` | Il CSV più grande accettato da [Importare libri](../importing-books). |
| `MAX_JSON_BODY_PARSE` | `100kb` | Il corpo di richiesta più grande che l'API legge. Valgono valori come `500kb` o `1mb`. |
| `MAX_URLENCODED_BODY_PARSE` | `100kb` | Lo stesso, per le richieste in stile modulo. |

Se metti un reverse proxy davanti, può avere un suo limite di caricamento. Nginx, per esempio, si ferma a `1m` a meno che tu non aumenti `client_max_body_size`.

## Ricerca delle informazioni sui libri {#book-information-lookups}

| Variabile | Predefinito | Cosa fa |
|---|---|---|
| `GOOGLE_BOOKS_API_KEY` | vuoto | Opzionale. Ti dà più ricerche al giorno su Google Books. Open Library viene provata per prima e non richiede chiave. |
| `LIBRARYTHING_API_KEY` | vuoto | Opzionale. Un terzo posto dove cercare una copertina quando i primi due non ne hanno. Gratuito con un account LibraryThing. |

## Registri {#logging}

| Variabile | Predefinito | Cosa fa |
|---|---|---|
| `LOGGER_PATH` | `/app/logs` | Dove viene scritto il registro dentro il contenitore. Il volume `app-logs` lo conserva. Lascialo così. |
| `DEBUG_LOGGING` | `false` | Registrazione dettagliata, con query del database e nomi di persone e record. Usala brevemente durante la risoluzione dei problemi, poi disattivala. |

## Un file di partenza ragionevole {#a-sensible-starting-file}

```ini
APP_TAG=1.3.5
FRONT_END_URL=https://books.example.com
JWT_SECRET=<output di: openssl rand -hex 32>
DB_PASSWORD=<una password lunga e casuale>
ALLOW_DEV_AUTH=false
TRUST_PROXY=true
REGISTRATION_ENABLED=false
```

È pensato per un server pubblico dietro un reverse proxy, dove hai già creato gli account che ti servono.
