# Auto-hosting di Vaultisse

Vaultisse è open source ed è pensato per essere eseguito da te. Questa sezione è per la persona che **installa e mantiene** un server Vaultisse: un familiare con un server in casa, il responsabile informatico di una scuola o il volontario di una piccola biblioteca. Se vuoi solo *usare* Vaultisse, parti da [Per iniziare](../getting-started).

## Cosa stai eseguendo

Vaultisse è distribuito come **una sola immagine Docker** (`ghcr.io/albertamat/vaultisse`) che contiene il server e l'app web, insieme a un database **PostgreSQL**. Un `docker-compose.yml` già pronto avvia entrambi.

![La pagina di accesso di Vaultisse, la prima schermata che vedi quando il server è in funzione](/screenshots/login-sso.png)

Tutto ciò che salvi vive nel volume del database, quindi backup e aggiornamenti si riducono a quel volume e al tag dell'immagine. Entrambi sono trattati in questa sezione.

## Cosa ti serve

- Una macchina che possa eseguire Docker, come un server Linux, un NAS o una piccola macchina virtuale nel cloud.
- **Docker Engine con il plugin Compose.** Verifica con `docker compose version`.
- Un modo per raggiungerlo. Per l'uso domestico basta l'indirizzo della macchina nella tua rete. Per raggiungerlo da ovunque servono anche un nome di dominio e HTTPS, vedi [Reverse proxy e HTTPS](./reverse-proxy).

## Scegli la tua configurazione

| Vuoi… | Leggi |
|---|---|
| Vaultisse solo sul tuo computer o sulla rete di casa | [Installazione](./installation), e ti fermi lì |
| Vaultisse raggiungibile da internet | [Installazione](./installation), poi [Reverse proxy e HTTPS](./reverse-proxy) |
| Tutte le impostazioni spiegate | [Riferimento della configurazione](./configuration) |
| Accedere con Authentik, Keycloak o un altro provider di identità | [Single sign-on](./single-sign-on) |
| Aggiornare o fare un backup | [Aggiornamenti e backup](./updating-and-backups) |
| Qualcosa non funziona | [Risoluzione dei problemi](./troubleshooting) |

## La versione breve

Se hai fretta, questa è l'intera installazione su una macchina che ha già Docker:

```bash
mkdir vaultisse && cd vaultisse
mkdir -p assets/db
curl -O https://raw.githubusercontent.com/AlbertAmat/vaultisse/main/docker-compose.yml
curl -O https://raw.githubusercontent.com/AlbertAmat/vaultisse/main/.env.example
curl -o assets/db/databaseSchema.sql https://raw.githubusercontent.com/AlbertAmat/vaultisse/main/assets/db/databaseSchema.sql
cp .env.example .env
# modifica .env: imposta JWT_SECRET e DB_PASSWORD
docker compose up -d
```

Poi apri `http://localhost:3000/register` e crea il tuo account. La pagina [Installazione](./installation) spiega ogni passaggio.
