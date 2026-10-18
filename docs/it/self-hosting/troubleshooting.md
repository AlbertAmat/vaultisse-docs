# Risoluzione dei problemi

Parti dal registro. Nella maggior parte dei casi nomina il problema:

```bash
docker compose logs --tail 100 app
```

## Il contenitore dell'app si riavvia di continuo {#the-app-container-keeps-restarting}

Leggi le ultime righe del registro. Il server si rifiuta di avviarsi, con un messaggio, quando:

- `JWT_SECRET` è vuoto.
- Non riesce a raggiungere il database. Esegui `docker compose ps` e verifica che `db` sia **healthy**, e che `DB_PASSWORD` in `.env` sia quella con cui è stato creato il database. La password viene usata solo la prima volta che il volume viene creato, quindi cambiarla dopo in `.env` non cambia l'utente del database. Oppure la cambi dentro Postgres o, su una nuova installazione senza dati, rimuovi il volume (`docker compose down -v`) e riparti.
- `OIDC_GROUP_ROLES` contiene un errore di battitura, per esempio un ruolo che non esiste.

## La pagina si carica ma sembra rotta, o i link non portano da nessuna parte {#the-page-loads-but-looks-broken-or-links-go-nowhere}

HTTP semplice su qualcosa di diverso da `localhost`. Imposta `ALLOW_HTTP=true` e assicurati che `FRONT_END_URL` sia l'indirizzo che digiti davvero; poi `docker compose up -d`. Se usi HTTPS tramite un proxy, `ALLOW_HTTP` deve essere `false`.

## Non riesco ad accedere, o vengo rimandato alla pagina di login {#i-cannot-sign-in-or-i-am-sent-back-to-the-login-page}

- `FRONT_END_URL` deve coincidere esattamente con l'indirizzo nel browser: stesso `http`/`https`, stesso host, stessa porta, senza barra finale.
- Dietro un proxy bisogna impostare `TRUST_PROXY=true`, e il proxy deve passare le intestazioni `X-Forwarded-For` e `X-Forwarded-Proto` (l'esempio Nginx in [Reverse proxy e HTTPS](./reverse-proxy#nginx) lo fa).
- Dopo aver cambiato `JWT_SECRET`, tutti devono accedere di nuovo. È previsto.

## "Too many attempts, please try again later" {#too-many-attempts-please-try-again-later}

Accesso e registrazione consentono ciascuno solo cinque tentativi per indirizzo in cinque minuti. Se lo raggiungi durante i test, aspetta un po', oppure riavvia il contenitore dell'app per azzerarlo. Se succede a **tutti**, sei dietro un proxy e `TRUST_PROXY` è `false`, quindi tutti i visitatori sembrano un solo indirizzo. Impostalo su `true`.

## Ho dimenticato la password {#i-forgot-my-password}

Non esiste ancora il ripristino via email. Un'altra persona con accesso al database può impostare un nuovo hash della password, oppure puoi creare un nuovo account. Se le persone che servi usano il [single sign-on](./single-sign-on), non hanno bisogno di alcuna password di Vaultisse.

## Il caricamento degli ebook non riesce {#ebook-uploads-fail}

Il file è più grande di `MAX_EBOOK_FILE_SIZE_MB` (10 per impostazione predefinita), o più grande di quanto consente il tuo proxy. Aumenta entrambi, vedi il [Riferimento della configurazione](./configuration#uploads-and-limits).

## Le copertine non si caricano da un sito di immagini {#book-covers-do-not-load-for-an-image-site}

Le copertine di siti non integrati sono bloccate dalle regole di sicurezza del browser. Aggiungi il sito a `CSP_EXTRA_IMG_SRC`, per esempio `https://covers.example.com`.

## Ricominciare da capo su un'installazione di prova {#starting-over-on-a-test-install}

Solo su un'installazione **senza dati a cui tieni**:

```bash
docker compose down -v
docker compose up -d
```

Con `-v` si elimina il volume del database. Non farlo mai su un server con dati reali, vedi [Aggiornamenti e backup](./updating-and-backups).

## Sei ancora bloccato {#still-stuck}

Apri una segnalazione su [github.com/AlbertAmat/vaultisse/issues](https://github.com/AlbertAmat/vaultisse/issues) con la versione (`/api/rest/app/version`), ciò che ti aspettavi e le righe pertinenti di `docker compose logs app`. Rimuovi qualsiasi segreto dal registro prima di incollarlo.
