# Actualizaciones y copias de seguridad

## Comprueba qué versión se ejecuta

```bash
curl http://localhost:3000/api/rest/app/version
```

Usa tu propia dirección si no es `localhost:3000`, o tu URL pública cuando el puerto no está publicado.

## Actualizar Vaultisse

Las versiones se listan en la [página de versiones](/releases) y en [GitHub](https://github.com/AlbertAmat/vaultisse/releases).

1. **Haz antes una copia de seguridad.** Consulta [más abajo](#backing-up).
2. En `.env`, define `APP_TAG` con la versión que quieras, por ejemplo `APP_TAG=1.3.5`.
3. Descarga la nueva imagen y reinicia:

   ```bash
   docker compose pull
   docker compose up -d
   ```

**Los cambios en la base de datos se aplican solos.** Cuando una versión cambia la base de datos, el servidor aplica por sí mismo los pasos de actualización que faltan al arrancar y recuerda cuáles ya ha ejecutado. No hay nada que ejecutar a mano, y una actualización ya aplicada nunca se repite.

> **Consejo:** Fija `APP_TAG` a un número de versión en lugar de `latest`. Así una actualización es algo que decides tú, y no algo que ocurre cuando el contenedor se reinicia.

Para pasar por varias versiones puedes saltar directamente a la más reciente; los pasos de actualización se ejecutan en orden.

## Copias de seguridad {#backing-up}

Todo lo importante está en la base de datos. Dos formas de protegerla:

**Un archivo de volcado** (recomendado, funciona entre versiones):

```bash
docker compose exec -T db pg_dump -U postgres vaultisse > vaultisse-$(date +%F).sql
```

Usa tu propio `DB_USER` y `DB_NAME` si los cambiaste. Ejecútalo de forma programada, por ejemplo con `cron`:

```
0 3 * * * cd /path/to/vaultisse && docker compose exec -T db pg_dump -U postgres vaultisse > /backups/vaultisse-$(date +\%F).sql
```

Copia también los archivos fuera de la máquina: una copia junto a los datos se pierde con ellos.

**El propio volumen:** detén el stack y copia el volumen `db-data`. Esto solo se restaura sobre la misma versión mayor de Postgres.

Guarda también una copia de tu `.env`. Sin `JWT_SECRET` y `DB_PASSWORD` puedes restaurar los datos, pero todo el mundo tendrá que iniciar sesión de nuevo.

> **Nota:** Los archivos de ebook subidos también se guardan en la base de datos, así que forman parte del volcado.

## Restaurar

En una instalación nueva (pasos 1 y 2 de [Instalación](./installation)), inicia solo la base de datos, carga el volcado y después inicia la aplicación:

```bash
docker compose up -d db
docker compose exec -T db psql -U postgres -d vaultisse < vaultisse-2026-10-18.sql
docker compose up -d
```

Si el volcado viene de una versión anterior, el servidor lo actualiza al arrancar.

## Actualizar PostgreSQL {#upgrading-postgresql-itself}

Cambiar la etiqueta `postgres:` de `docker-compose.yml` a una nueva versión **mayor** no es como actualizar Vaultisse. El formato de los datos cambia entre versiones mayores, así que un volumen existente no arrancará. Haz un volcado, crea un volumen nuevo y vacío con la nueva versión y restaura el volcado en él.

## Registros

```bash
docker compose logs -f app
```

Los mismos mensajes se escriben en `bookStorage.log`, en el volumen `app-logs`. Activa `DEBUG_LOGGING=true` solo mientras resuelves un problema: registra nombres y SQL y no debe quedarse activado.
