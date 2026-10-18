# Aggiornamenti e backup

## Verifica cosa è in esecuzione

```bash
curl http://localhost:3000/api/rest/app/version
```

Usa il tuo indirizzo se non è `localhost:3000`, o il tuo URL pubblico quando la porta non è pubblicata.

## Aggiornare Vaultisse

Le versioni sono elencate nella [pagina delle versioni](/releases) e su [GitHub](https://github.com/AlbertAmat/vaultisse/releases).

1. **Fai prima un backup.** Vedi [più sotto](#backing-up).
2. In `.env`, imposta `APP_TAG` sulla versione desiderata, per esempio `APP_TAG=1.3.5`.
3. Scarica la nuova immagine e riavvia:

   ```bash
   docker compose pull
   docker compose up -d
   ```

**Le modifiche al database vengono applicate da sole.** Quando una versione cambia il database, il server applica da sé i passaggi di aggiornamento mancanti all'avvio e ricorda quali ha già eseguito. Non c'è nulla da eseguire a mano, e un aggiornamento già applicato non viene mai ripetuto.

> **Suggerimento:** Fissa `APP_TAG` a un numero di versione invece di `latest`. In questo modo un aggiornamento è una scelta tua, e non qualcosa che accade quando il contenitore si riavvia.

Per passare attraverso più versioni puoi saltare direttamente alla più recente: i passaggi di aggiornamento vengono eseguiti in ordine.

## Fare il backup {#backing-up}

Tutto ciò che conta è nel database. Due modi per proteggerlo:

**Un file di dump** (consigliato, funziona tra versioni diverse):

```bash
docker compose exec -T db pg_dump -U postgres vaultisse > vaultisse-$(date +%F).sql
```

Usa il tuo `DB_USER` e `DB_NAME` se li hai cambiati. Eseguilo in modo pianificato, per esempio con `cron`:

```
0 3 * * * cd /path/to/vaultisse && docker compose exec -T db pg_dump -U postgres vaultisse > /backups/vaultisse-$(date +\%F).sql
```

Copia i file anche fuori dalla macchina: un backup accanto ai dati va perso insieme a loro.

**Il volume stesso:** ferma lo stack e copia il volume `db-data`. Si ripristina solo sulla stessa versione maggiore di Postgres.

Conserva anche una copia del tuo `.env`. Senza `JWT_SECRET` e `DB_PASSWORD` puoi ripristinare i dati, ma tutti dovranno accedere di nuovo.

> **Nota:** Anche i file ebook caricati sono salvati nel database, quindi fanno parte del dump.

## Ripristinare

Su un'installazione nuova (passaggi 1 e 2 di [Installazione](./installation)), avvia solo il database, carica il dump e poi avvia l'app:

```bash
docker compose up -d db
docker compose exec -T db psql -U postgres -d vaultisse < vaultisse-2026-10-18.sql
docker compose up -d
```

Se il dump proviene da una versione precedente, il server lo aggiorna all'avvio.

## Aggiornare PostgreSQL stesso {#upgrading-postgresql-itself}

Cambiare il tag `postgres:` in `docker-compose.yml` con una nuova versione **maggiore** non è come aggiornare Vaultisse. Il formato dei dati cambia tra le versioni maggiori, quindi un volume esistente non si avvierà. Fai un dump, crea un volume nuovo e vuoto con la nuova versione e ripristina lì il dump.

## Registri

```bash
docker compose logs -f app
```

Gli stessi messaggi sono scritti in `bookStorage.log`, nel volume `app-logs`. Attiva `DEBUG_LOGGING=true` solo mentre risolvi un problema: registra nomi e SQL e non deve restare attivo.
