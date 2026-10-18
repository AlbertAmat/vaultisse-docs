# Actualitzacions i còpies de seguretat

## Comproveu quina versió s'executa

```bash
curl http://localhost:3000/api/rest/app/version
```

Feu servir la vostra adreça si no és `localhost:3000`, o la vostra URL pública quan el port no està publicat.

## Actualitzar Vaultisse

Les versions es llisten a la [pàgina de versions](/releases) i a [GitHub](https://github.com/AlbertAmat/vaultisse/releases).

1. **Feu abans una còpia de seguretat.** Consulteu [més avall](#backing-up).
2. A `.env`, definiu `APP_TAG` amb la versió que vulgueu, per exemple `APP_TAG=1.3.5`.
3. Baixeu la nova imatge i reinicieu:

   ```bash
   docker compose pull
   docker compose up -d
   ```

**Els canvis a la base de dades s'apliquen sols.** Quan una versió canvia la base de dades, el servidor aplica per si mateix els passos d'actualització que falten en arrencar i recorda quins ja ha executat. No hi ha res a executar a mà, i una actualització ja aplicada no es repeteix mai.

> **Consell:** Fixeu `APP_TAG` a un número de versió en lloc de `latest`. Així una actualització és una cosa que decidiu vosaltres, i no una cosa que passa quan el contenidor es reinicia.

Per passar per diverses versions podeu saltar directament a la més recent; els passos d'actualització s'executen en ordre.

## Còpies de seguretat {#backing-up}

Tot el que és important és a la base de dades. Dues maneres de protegir-la:

**Un fitxer de bolcat** (recomanat, funciona entre versions):

```bash
docker compose exec -T db pg_dump -U postgres vaultisse > vaultisse-$(date +%F).sql
```

Feu servir el vostre `DB_USER` i `DB_NAME` si els heu canviat. Executeu-lo de manera programada, per exemple amb `cron`:

```
0 3 * * * cd /path/to/vaultisse && docker compose exec -T db pg_dump -U postgres vaultisse > /backups/vaultisse-$(date +\%F).sql
```

Copieu també els fitxers fora de la màquina: una còpia al costat de les dades es perd amb elles.

**El propi volum:** atureu l'stack i copieu el volum `db-data`. Això només es restaura sobre la mateixa versió major de Postgres.

Deseu també una còpia del vostre `.env`. Sense `JWT_SECRET` i `DB_PASSWORD` podeu restaurar les dades, però tothom haurà d'iniciar sessió de nou.

> **Nota:** Els fitxers d'ebook pujats també es desen a la base de dades, així que formen part del bolcat.

## Restaurar

En una instal·lació nova (passos 1 i 2 d'[Instal·lació](./installation)), inicieu només la base de dades, carregueu el bolcat i després inicieu l'aplicació:

```bash
docker compose up -d db
docker compose exec -T db psql -U postgres -d vaultisse < vaultisse-2026-10-18.sql
docker compose up -d
```

Si el bolcat prové d'una versió anterior, el servidor l'actualitza en arrencar.

## Actualitzar PostgreSQL {#upgrading-postgresql-itself}

Canviar l'etiqueta `postgres:` de `docker-compose.yml` a una nova versió **major** no és com actualitzar Vaultisse. El format de les dades canvia entre versions majors, així que un volum existent no arrencarà. Feu un bolcat, creeu un volum nou i buit amb la nova versió i restaureu-hi el bolcat.

## Registres

```bash
docker compose logs -f app
```

Els mateixos missatges s'escriuen a `bookStorage.log`, al volum `app-logs`. Activeu `DEBUG_LOGGING=true` només mentre resoleu un problema: registra noms i SQL i no s'ha de quedar activat.
