# Autoallotjar Vaultisse

Vaultisse és de codi obert i està pensat perquè el pugueu executar vosaltres. Aquesta secció és per a la persona que **instal·la i manté** un servidor de Vaultisse: un familiar amb un servidor a casa, el responsable informàtic d'una escola o el voluntari d'una petita biblioteca. Si només voleu *fer servir* Vaultisse, comenceu per [Primers passos](../getting-started).

## Què esteu executant

Vaultisse es distribueix com **una sola imatge de Docker** (`ghcr.io/albertamat/vaultisse`) que conté el servidor i l'aplicació web, juntament amb una base de dades **PostgreSQL**. Un `docker-compose.yml` ja preparat inicia totes dues coses.

![La pàgina d'inici de sessió de Vaultisse, la primera pantalla que veieu quan el servidor funciona](/screenshots/login-sso.png)

Tot el que deseu viu al volum de la base de dades, de manera que les còpies de seguretat i les actualitzacions es redueixen a aquest volum i a l'etiqueta de la imatge. Totes dues coses s'expliquen en aquesta secció.

## Què necessiteu

- Una màquina que pugui executar Docker, com ara un servidor Linux, un NAS o una petita màquina virtual al núvol.
- **Docker Engine amb el connector Compose.** Comproveu-ho amb `docker compose version`.
- Una manera d'accedir-hi. Per a ús domèstic n'hi ha prou amb l'adreça de la màquina a la vostra xarxa. Per accedir-hi des de qualsevol lloc necessiteu a més un nom de domini i HTTPS, consulteu [Servidor intermediari invers i HTTPS](./reverse-proxy).

## Trieu la vostra configuració

| Voleu… | Llegiu |
|---|---|
| Vaultisse només al vostre ordinador o xarxa domèstica | [Instal·lació](./installation) i res més |
| Vaultisse accessible des d'internet | [Instal·lació](./installation) i després [Servidor intermediari invers i HTTPS](./reverse-proxy) |
| Tots els paràmetres explicats | [Referència de configuració](./configuration) |
| Iniciar sessió amb Authentik, Keycloak o un altre proveïdor d'identitat | [Inici de sessió únic](./single-sign-on) |
| Actualitzar o fer còpies de seguretat | [Actualitzacions i còpies de seguretat](./updating-and-backups) |
| Alguna cosa no funciona | [Resolució de problemes](./troubleshooting) |

## La versió curta

Si teniu pressa, aquesta és tota la instal·lació en una màquina que ja té Docker:

```bash
mkdir vaultisse && cd vaultisse
mkdir -p assets/db
curl -O https://raw.githubusercontent.com/AlbertAmat/vaultisse/main/docker-compose.yml
curl -O https://raw.githubusercontent.com/AlbertAmat/vaultisse/main/.env.example
curl -o assets/db/databaseSchema.sql https://raw.githubusercontent.com/AlbertAmat/vaultisse/main/assets/db/databaseSchema.sql
cp .env.example .env
# editeu .env: definiu JWT_SECRET i DB_PASSWORD
docker compose up -d
```

Després obriu `http://localhost:3000/register` i creeu el vostre compte. La pàgina d'[Instal·lació](./installation) explica cada pas.
