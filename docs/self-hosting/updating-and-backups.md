# Updating & backups

## Check what is running

```bash
curl http://localhost:3000/api/rest/app/version
```

Use your own address if it is not `localhost:3000`, or your public URL when the port is not published.

## Updating Vaultisse

Releases are listed on the [Releases page](../releases) and on [GitHub](https://github.com/AlbertAmat/vaultisse/releases).

1. **Back up first.** See [below](#backing-up).
2. In `.env`, set `APP_TAG` to the version you want, for example `APP_TAG=1.3.5`.
3. Pull the new image and restart:

   ```bash
   docker compose pull
   docker compose up -d
   ```

**Database changes are applied for you.** When a release changes the database, the server applies the missing upgrade steps by itself on startup and remembers which it has run. There is nothing to run by hand, and an upgrade that is already applied is never repeated.

> **Tip:** Pin `APP_TAG` to a version number instead of `latest`. That way an update is something you choose, and not something that happens when the container restarts.

To go through several versions, you can jump straight to the newest one, the upgrade steps run in order.

## Backing up

Everything that matters is in the database. Two ways to protect it:

**A dump file** (recommended, works across versions):

```bash
docker compose exec -T db pg_dump -U postgres vaultisse > vaultisse-$(date +%F).sql
```

Use your own `DB_USER` and `DB_NAME` if you changed them. Run this on a schedule, for example with `cron`:

```
0 3 * * * cd /path/to/vaultisse && docker compose exec -T db pg_dump -U postgres vaultisse > /backups/vaultisse-$(date +\%F).sql
```

Copy the files off the machine as well, a backup next to the data is lost with it.

**The volume itself:** stop the stack and copy the `db-data` volume. This only restores onto the same Postgres major version.

Also keep a copy of your `.env`. Without `JWT_SECRET` and `DB_PASSWORD` you can restore the data, but everyone has to sign in again.

> **Note:** Uploaded ebook files are stored in the database too, so they are part of the dump.

## Restoring

On a fresh install (steps 1 and 2 of [Installation](./installation)), start only the database, load the dump, then start the app:

```bash
docker compose up -d db
docker compose exec -T db psql -U postgres -d vaultisse < vaultisse-2026-10-18.sql
docker compose up -d
```

If the dump comes from an older version, the server brings it up to date when it starts.

## Upgrading PostgreSQL itself

Changing the `postgres:` tag in `docker-compose.yml` to a new **major** version is not like updating Vaultisse. The data format changes between major versions, so an existing volume will not start. Take a dump, create a new empty volume on the new version, and restore the dump into it.

## Logs

```bash
docker compose logs -f app
```

The same messages are written to `bookStorage.log` in the `app-logs` volume. Set `DEBUG_LOGGING=true` only while troubleshooting, it records names and SQL and should not stay on.
