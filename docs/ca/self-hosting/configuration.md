# Referència de configuració

Vaultisse es configura amb variables d'entorn, definides al fitxer `.env` al costat de `docker-compose.yml`. Després de canviar `.env`, apliqueu-ho amb:

```bash
docker compose up -d
```

Els paràmetres que ometeu fan servir el valor per defecte que s'indica a sota.

## L'essencial {#the-essentials}

| Variable | Per defecte | Què fa |
|---|---|---|
| `JWT_SECRET` | cap, **obligatori** | Secret que signa les sessions. Feu servir un valor llarg i aleatori: `openssl rand -hex 32`. Canviar-lo tanca la sessió de tothom. |
| `DB_PASSWORD` | cap, **obligatori** | Contrasenya de la base de dades. |
| `FRONT_END_URL` | `http://localhost:3000` | L'adreça que la gent escriu al navegador, amb `https://` i sense barra final. Controla quins orígens accepta el servidor, així que ha de coincidir exactament. |
| `ALLOW_DEV_AUTH` | `false` | Se salta l'inici de sessió amb una sessió falsa. **Mai `true`** en un servidor real. |
| `APP_TAG` | `latest` | Quina versió de Vaultisse s'executa. Fixeu-la, per exemple `1.3.5`. |

## Xarxa i ports {#network-and-ports}

| Variable | Per defecte | Què fa |
|---|---|---|
| `API_PORT` | `3000` | Port en què escolta l'aplicació, i port publicat al host. |
| `TRUST_PROXY` | `false` | Poseu `true` **només** quan hi hagi un servidor intermediari invers o un túnel davant de l'aplicació. Fa que la limitació d'intents faci servir l'adreça real de cada visitant. Activat i sense intermediari, els visitants poden falsejar la seva adreça. |
| `ALLOW_HTTP` | `false` | Poseu `true` **només** quan s'accedeixi a l'aplicació per `http://` pla en alguna cosa diferent de `localhost`, com `http://192.168.1.50:3000`. Sense això els navegadors reescriuen tots els enllaços a `https://`. Deixeu-lo en `false` sempre que hi hagi HTTPS davant. |
| `CSP_EXTRA_IMG_SRC` | buit | Llocs web addicionals autoritzats a servir cobertes de llibres, separats per comes, per exemple `https://covers.example.com`. |
| `CLOUDFLARE_TUNNEL_TOKEN` | buit | Només es fa servir amb el perfil `cloudflare`, consulteu [Servidor intermediari invers i HTTPS](./reverse-proxy#cloudflare-tunnel). |

## Base de dades {#database}

| Variable | Per defecte | Què fa |
|---|---|---|
| `DB_NAME` | `vaultisse` | Nom de la base de dades. |
| `DB_USER` | `postgres` | Usuari de la base de dades. |
| `DB_PASSWORD` | cap | Contrasenya de la base de dades. |

Amb el fitxer compose inclòs, l'aplicació sempre arriba a la base de dades com a `db` pel port 5432 dins de la xarxa de Compose, digui el que digui `DB_HOST` i `DB_PORT`. Aquests dos només importen si executeu l'aplicació fora de Docker.

## Comptes i sessions {#accounts-and-sessions}

| Variable | Per defecte | Què fa |
|---|---|---|
| `REGISTRATION_ENABLED` | `true` | `false` desactiva la pàgina de registre i l'enllaç d'alta. Ningú pot crear un compte amb contrasenya. |
| `REGISTRATION_REQUIRES_APPROVAL` | `false` | `true` permet registrar-se, però manté el compte desactivat fins que l'habiliteu a la base de dades, consulteu [Instal·lació](./installation#decide-who-else-can-register). |
| `SESSION_TIME` | `3600000` | Quant dura una sessió sense activitat, en mil·lisegons (una hora). L'activitat la renova. |
| `MAX_SESSION_AGE_DAYS` | `30` | El màxim que pot durar una sessió, fins i tot amb activitat constant. Passat aquest temps cal tornar a iniciar sessió. |
| `DEMO_MODE` | `false` | Deixa la instància en només lectura per a demostracions públiques: només funcionen l'inici de sessió i la consulta, i l'SSO es desactiva. |

## Inici de sessió únic {#single-sign-on}

Tot això s'explica pas a pas a [Inici de sessió únic](./single-sign-on).

| Variable | Per defecte | Què fa |
|---|---|---|
| `OIDC_ISSUER` | buit | Adreça del vostre proveïdor d'identitat. |
| `OIDC_CLIENT_ID` | buit | ID de client del proveïdor. |
| `OIDC_CLIENT_SECRET` | buit | Secret de client del proveïdor. |
| `OIDC_REDIRECT_URI` | buit | Ha de ser exactament `https://la-vostra-adreca/auth/oidc/callback`. |
| `OIDC_SCOPES` | `openid profile email` | Què demanar al proveïdor. |
| `OIDC_BUTTON_LABEL` | `Sign in with SSO` | Text del botó de la pàgina d'inici de sessió. |
| `OIDC_GROUP_ROLES` | buit | Associa els grups del proveïdor a rols de biblioteca. |
| `OIDC_GROUPS_CLAIM` | `groups` | Nom del camp que conté els grups d'una persona. |

L'SSO només és actiu quan els quatre primers estan definits.

## Pujades i límits {#uploads-and-limits}

| Variable | Per defecte | Què fa |
|---|---|---|
| `MAX_EBOOK_FILE_SIZE_MB` | `10` | L'ebook més gran (`.epub`, `.pdf`, `.mobi`, `.azw3`) que es pot pujar a un llibre. Augmenteu-lo per a PDF escanejats. |
| `MAX_IMPORT_FILE_SIZE_MB` | `10` | El CSV més gran que accepta [Importar llibres](../importing-books). |
| `MAX_JSON_BODY_PARSE` | `100kb` | El cos de petició més gran que llegeix l'API. Valen valors com `500kb` o `1mb`. |
| `MAX_URLENCODED_BODY_PARSE` | `100kb` | El mateix, per a peticions tipus formulari. |

Si poseu un servidor intermediari invers davant, pot tenir el seu propi límit de pujada. Nginx, per exemple, s'atura a `1m` tret que augmenteu `client_max_body_size`.

## Consulta d'informació de llibres {#book-information-lookups}

| Variable | Per defecte | Què fa |
|---|---|---|
| `GOOGLE_BOOKS_API_KEY` | buit | Opcional. Us dona més consultes diàries a Google Books. Open Library es prova primer i no necessita clau. |
| `LIBRARYTHING_API_KEY` | buit | Opcional. Un tercer lloc on buscar una coberta quan els dos primers no en tenen. Gratuït amb un compte de LibraryThing. |

## Registres {#logging}

| Variable | Per defecte | Què fa |
|---|---|---|
| `LOGGER_PATH` | `/app/logs` | On s'escriu el registre dins del contenidor. El volum `app-logs` el conserva. Deixeu-ho. |
| `DEBUG_LOGGING` | `false` | Registre detallat, amb consultes a la base de dades i noms de persones i registres. Feu-lo servir breument en resoldre problemes i després desactiveu-lo. |

## Un fitxer de partida raonable {#a-sensible-starting-file}

```ini
APP_TAG=1.3.5
FRONT_END_URL=https://books.example.com
JWT_SECRET=<sortida de: openssl rand -hex 32>
DB_PASSWORD=<una contrasenya llarga i aleatòria>
ALLOW_DEV_AUTH=false
TRUST_PROXY=true
REGISTRATION_ENABLED=false
```

És per a un servidor públic darrere d'un servidor intermediari invers, on ja heu creat els comptes que necessiteu.
