# Instal·lació

Aquesta pàgina instal·la Vaultisse amb Docker Compose en una màquina i acaba amb vosaltres amb la sessió iniciada. Porta uns deu minuts. Fer-lo accessible des d'internet és un pas a part, consulteu [Servidor intermediari invers i HTTPS](./reverse-proxy).

## 1. Aconseguiu els fitxers {#get-the-files}

Creeu una carpeta per a Vaultisse i baixeu els tres fitxers que necessita:

```bash
mkdir vaultisse && cd vaultisse
mkdir -p assets/db
curl -O https://raw.githubusercontent.com/AlbertAmat/vaultisse/main/docker-compose.yml
curl -O https://raw.githubusercontent.com/AlbertAmat/vaultisse/main/.env.example
curl -o assets/db/databaseSchema.sql https://raw.githubusercontent.com/AlbertAmat/vaultisse/main/assets/db/databaseSchema.sql
```

> **Nota:** L'esquema de la base de dades ha de quedar a `assets/db/databaseSchema.sql`, al costat del fitxer compose. `docker-compose.yml` el munta amb aquesta ruta relativa i el contenidor de la base de dades l'utilitza per crear les taules la primera vegada que arrenca.

## 2. Creeu el fitxer de paràmetres {#create-your-settings-file}

```bash
cp .env.example .env
```

Obriu `.env` en un editor de text. Quatre valors importen en una primera instal·lació:

| Paràmetre | Què posar-hi |
|---|---|
| `JWT_SECRET` | Una cadena llarga i aleatòria. Genereu-la amb `openssl rand -hex 32`. Signa les sessions, així que mantingueu-la en privat. |
| `DB_PASSWORD` | Una contrasenya a la vostra elecció per a la base de dades. No la deixeu buida. |
| `FRONT_END_URL` | L'adreça que la gent escriurà al navegador. `http://localhost:3000` si només la fa servir aquesta màquina. Més avall, altres casos. |
| `ALLOW_DEV_AUTH` | Deixeu-lo en `false`. Se salta la pantalla d'inici de sessió i existeix només per al desenvolupament. |

El `FRONT_END_URL` correcte depèn de com s'accedeixi al servidor:

- **Només aquesta màquina:** `FRONT_END_URL=http://localhost:3000`.
- **Altres dispositius de la xarxa domèstica** (un mòbil, una tauleta): feu servir l'adreça de la màquina a la xarxa, per exemple `FRONT_END_URL=http://192.168.1.50:3000`, i definiu també `ALLOW_HTTP=true`. Els navegadors forcen `https://` en tots els enllaços d'un lloc HTTP pla tret que sàpiguen que és local, així que sense aquest paràmetre l'aplicació carrega però els seus enllaços fallen.
- **Una adreça pública amb HTTPS:** consulteu [Servidor intermediari invers i HTTPS](./reverse-proxy).

La resta de paràmetres té un valor per defecte segur. La llista completa és a la [Referència de configuració](./configuration).

## 3. Arrenqueu-lo {#start-it}

```bash
docker compose up -d
```

La primera arrencada baixa les imatges i crea la base de dades, cosa que pot trigar un minut. Comproveu que tots dos contenidors funcionen:

```bash
docker compose ps
```

Hauríeu de veure `db` com a **healthy** i `app` com a **running**. Si `app` es reinicia contínuament, executeu `docker compose logs app`; el missatge del final sol indicar el paràmetre que falta. Consulteu [Resolució de problemes](./troubleshooting).

## 4. Creeu el vostre compte {#create-your-account}

Obriu `FRONT_END_URL` seguit de `/register`, per exemple `http://localhost:3000/register`.

![La pàgina de registre, amb camps de nom, correu, codi d'usuari i contrasenya](/screenshots/register.png)

Ompliu les vostres dades i feu clic a **Register**. La contrasenya necessita almenys 8 caràcters, amb una majúscula, un dígit i un caràcter especial. Després inicieu sessió.

No hi ha cap compte d'administrador a part ni contrasenya per defecte. La primera persona que es registra rep simplement un compte normal, i cada compte comença amb la seva pròpia biblioteca (un *vault*) que administra. Més endavant es pot convidar persones a la biblioteca d'altres, consulteu [Compartir una biblioteca i rols](../sharing-and-roles).

![El tauler de control d'un compte nou de Vaultisse](/screenshots/dashboard.png)

## 5. Decidiu qui més es pot registrar {#decide-who-else-can-register}

Per defecte, qualsevol que arribi a `/register` pot crear un compte. Quan les persones que necessiteu ja s'hagin registrat, podeu tancar-ho:

- `REGISTRATION_ENABLED=false` elimina del tot la pàgina de registre. Ningú pot crear un compte.
- `REGISTRATION_REQUIRES_APPROVAL=true` manté la pàgina, però els comptes nous no poden iniciar sessió fins que els habiliteu. Encara no hi ha cap pantalla d'administració per a això, es fa a la base de dades:

  ```bash
  docker compose exec -T db psql -U postgres -d vaultisse \
    -c "UPDATE users SET disabled = FALSE WHERE code = 'el-seu-usuari';"
  ```

  Feu servir el vostre `DB_USER` i `DB_NAME` si els heu canviat.

Després de canviar `.env`, apliqueu-ho amb `docker compose up -d`. Compose recrea el contenidor només quan cal.

> **Consell:** Si feu servir l'inici de sessió únic, el proveïdor d'identitat decideix qui entra, i aquests dos paràmetres no s'apliquen als inicis de sessió SSO. Consulteu [Inici de sessió únic](./single-sign-on).

## On es desa cada cosa {#where-things-are-stored}

| Què | On |
|---|---|
| Totes les vostres dades (llibres, préstecs, comptes) | El volum de Docker `db-data` |
| El registre de l'aplicació | El volum de Docker `app-logs`, fitxer `bookStorage.log` |
| Els vostres paràmetres | El fitxer `.env` al costat de `docker-compose.yml` |

No elimineu el volum `db-data` i no executeu mai `docker compose down -v`, que elimina els volums juntament amb els contenidors. Consulteu [Actualitzacions i còpies de seguretat](./updating-and-backups).

## Propers passos

- Accedir-hi des de fora de casa: [Servidor intermediari invers i HTTPS](./reverse-proxy).
- Iniciar sessió amb els comptes de la vostra organització: [Inici de sessió únic](./single-sign-on).
- Configureu una còpia de seguretat abans d'afegir tota la biblioteca: [Actualitzacions i còpies de seguretat](./updating-and-backups).
