# Referencia de configuración

Vaultisse se configura con variables de entorno, definidas en el archivo `.env` junto a `docker-compose.yml`. Después de cambiar `.env`, aplícalo con:

```bash
docker compose up -d
```

Los ajustes que omitas usan el valor por defecto que se indica abajo.

## Lo esencial {#the-essentials}

| Variable | Por defecto | Qué hace |
|---|---|---|
| `JWT_SECRET` | ninguno, **obligatorio** | Secreto que firma las sesiones. Usa un valor largo y aleatorio: `openssl rand -hex 32`. Cambiarlo cierra la sesión de todo el mundo. |
| `DB_PASSWORD` | ninguno, **obligatorio** | Contraseña de la base de datos. |
| `FRONT_END_URL` | `http://localhost:3000` | La dirección que la gente escribe en el navegador, con `https://` y sin barra final. Controla qué orígenes acepta el servidor, así que debe coincidir exactamente. |
| `ALLOW_DEV_AUTH` | `false` | Omite el inicio de sesión con una sesión falsa. **Nunca `true`** en un servidor real. |
| `APP_TAG` | `latest` | Qué versión de Vaultisse ejecutar. Fíjala, por ejemplo `1.3.5`. |

## Red y puertos {#network-and-ports}

| Variable | Por defecto | Qué hace |
|---|---|---|
| `API_PORT` | `3000` | Puerto en el que escucha la aplicación, y puerto publicado en el host. |
| `TRUST_PROXY` | `false` | Pon `true` **solo** cuando haya un proxy inverso o un túnel delante de la aplicación. Hace que la limitación de intentos use la dirección real de cada visitante. Activado y sin proxy, los visitantes pueden falsear su dirección. |
| `ALLOW_HTTP` | `false` | Pon `true` **solo** cuando se acceda a la aplicación por `http://` plano en algo distinto de `localhost`, como `http://192.168.1.50:3000`. Sin esto los navegadores reescriben todos los enlaces a `https://`. Déjalo en `false` siempre que haya HTTPS delante. |
| `CSP_EXTRA_IMG_SRC` | vacío | Sitios web adicionales autorizados a servir portadas de libros, separados por comas, por ejemplo `https://covers.example.com`. |
| `CLOUDFLARE_TUNNEL_TOKEN` | vacío | Solo se usa con el perfil `cloudflare`, consulta [Proxy inverso y HTTPS](./reverse-proxy#cloudflare-tunnel). |

## Base de datos {#database}

| Variable | Por defecto | Qué hace |
|---|---|---|
| `DB_NAME` | `vaultisse` | Nombre de la base de datos. |
| `DB_USER` | `postgres` | Usuario de la base de datos. |
| `DB_PASSWORD` | ninguno | Contraseña de la base de datos. |

Con el archivo compose incluido, la aplicación siempre llega a la base de datos como `db` en el puerto 5432 dentro de la red de Compose, digan lo que digan `DB_HOST` y `DB_PORT`. Esos dos solo importan si ejecutas la aplicación fuera de Docker.

## Cuentas y sesiones {#accounts-and-sessions}

| Variable | Por defecto | Qué hace |
|---|---|---|
| `REGISTRATION_ENABLED` | `true` | `false` desactiva la página de registro y el enlace de alta. Nadie puede crear una cuenta con contraseña. |
| `REGISTRATION_REQUIRES_APPROVAL` | `false` | `true` permite registrarse, pero mantiene la cuenta desactivada hasta que la habilites en la base de datos, consulta [Instalación](./installation#decide-who-else-can-register). |
| `SESSION_TIME` | `3600000` | Cuánto dura una sesión sin actividad, en milisegundos (una hora). La actividad la renueva. |
| `MAX_SESSION_AGE_DAYS` | `30` | Lo máximo que puede durar una sesión, incluso con actividad constante. Pasado ese tiempo hay que iniciar sesión de nuevo. |
| `DEMO_MODE` | `false` | Deja la instancia en solo lectura para demostraciones públicas: solo funcionan el inicio de sesión y la consulta, y el SSO se desactiva. |

## Inicio de sesión único {#single-sign-on}

Todo esto se explica paso a paso en [Inicio de sesión único](./single-sign-on).

| Variable | Por defecto | Qué hace |
|---|---|---|
| `OIDC_ISSUER` | vacío | Dirección de tu proveedor de identidad. |
| `OIDC_CLIENT_ID` | vacío | ID de cliente del proveedor. |
| `OIDC_CLIENT_SECRET` | vacío | Secreto de cliente del proveedor. |
| `OIDC_REDIRECT_URI` | vacío | Debe ser exactamente `https://tu-direccion/auth/oidc/callback`. |
| `OIDC_SCOPES` | `openid profile email` | Qué pedir al proveedor. |
| `OIDC_BUTTON_LABEL` | `Sign in with SSO` | Texto del botón de la página de inicio de sesión. |
| `OIDC_GROUP_ROLES` | vacío | Asocia los grupos del proveedor a roles de biblioteca. |
| `OIDC_GROUPS_CLAIM` | `groups` | Nombre del campo que contiene los grupos de una persona. |

El SSO solo está activo cuando están definidos los cuatro primeros.

## Subidas y límites {#uploads-and-limits}

| Variable | Por defecto | Qué hace |
|---|---|---|
| `MAX_EBOOK_FILE_SIZE_MB` | `10` | El ebook más grande (`.epub`, `.pdf`, `.mobi`, `.azw3`) que se puede subir a un libro. Auméntalo para PDF escaneados. |
| `MAX_IMPORT_FILE_SIZE_MB` | `10` | El CSV más grande que acepta [Importar libros](../importing-books). |
| `MAX_JSON_BODY_PARSE` | `100kb` | El cuerpo de petición más grande que lee la API. Valen valores como `500kb` o `1mb`. |
| `MAX_URLENCODED_BODY_PARSE` | `100kb` | Lo mismo, para peticiones tipo formulario. |

Si pones un proxy inverso delante, puede tener su propio límite de subida. Nginx, por ejemplo, se detiene en `1m` salvo que aumentes `client_max_body_size`.

## Consulta de información de libros {#book-information-lookups}

| Variable | Por defecto | Qué hace |
|---|---|---|
| `GOOGLE_BOOKS_API_KEY` | vacío | Opcional. Te da más consultas diarias a Google Books. Open Library se prueba primero y no necesita clave. |
| `LIBRARYTHING_API_KEY` | vacío | Opcional. Un tercer sitio donde buscar una portada cuando los dos primeros no la tienen. Gratis con una cuenta de LibraryThing. |

## Registros {#logging}

| Variable | Por defecto | Qué hace |
|---|---|---|
| `LOGGER_PATH` | `/app/logs` | Dónde se escribe el registro dentro del contenedor. El volumen `app-logs` lo conserva. Déjalo. |
| `DEBUG_LOGGING` | `false` | Registro detallado, con consultas a la base de datos y nombres de personas y registros. Úsalo brevemente al resolver problemas y luego desactívalo. |

## Un archivo de partida razonable {#a-sensible-starting-file}

```ini
APP_TAG=1.3.5
FRONT_END_URL=https://books.example.com
JWT_SECRET=<salida de: openssl rand -hex 32>
DB_PASSWORD=<una contraseña larga y aleatoria>
ALLOW_DEV_AUTH=false
TRUST_PROXY=true
REGISTRATION_ENABLED=false
```

Es para un servidor público detrás de un proxy inverso, donde ya has creado las cuentas que necesitas.
