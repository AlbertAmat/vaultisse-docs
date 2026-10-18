# Configuration reference

Vaultisse is configured with environment variables, set in the `.env` file next to `docker-compose.yml`. After you change `.env`, apply it with:

```bash
docker compose up -d
```

Settings you leave out use the default shown below.

## The essentials

| Variable | Default | What it does |
|---|---|---|
| `JWT_SECRET` | none, **required** | Secret that signs login sessions. Use a long random value: `openssl rand -hex 32`. Changing it signs everyone out. |
| `DB_PASSWORD` | none, **required** | Password for the database. |
| `FRONT_END_URL` | `http://localhost:3000` | The address people type in the browser, including `https://` and no trailing slash. It controls which origins the server accepts, so it must match exactly. |
| `ALLOW_DEV_AUTH` | `false` | Skips login with a fake session. **Never `true`** on a real server. |
| `APP_TAG` | `latest` | Which Vaultisse version to run. Pin it, for example `1.3.5`. |

## Network and ports

| Variable | Default | What it does |
|---|---|---|
| `API_PORT` | `3000` | Port the app listens on, and the port published on the host. |
| `TRUST_PROXY` | `false` | Set `true` **only** when a reverse proxy or tunnel is in front of the app. It makes rate limiting use each visitor's real address. With it on and no proxy, visitors can fake their address. |
| `ALLOW_HTTP` | `false` | Set `true` **only** when the app is reached over plain `http://` on something other than `localhost`, such as `http://192.168.1.50:3000`. Without it browsers rewrite every link to `https://`. Leave `false` whenever HTTPS is in front. |
| `CSP_EXTRA_IMG_SRC` | empty | Extra websites allowed to serve book covers, comma separated, for example `https://covers.example.com`. |
| `CLOUDFLARE_TUNNEL_TOKEN` | empty | Only used with the `cloudflare` profile, see [Reverse proxy & HTTPS](./reverse-proxy#cloudflare-tunnel). |

## Database

| Variable | Default | What it does |
|---|---|---|
| `DB_NAME` | `vaultisse` | Name of the database. |
| `DB_USER` | `postgres` | Database user. |
| `DB_PASSWORD` | none | Database password. |

With the supplied compose file the app always reaches the database as `db` on port 5432 inside the Compose network, whatever `DB_HOST` and `DB_PORT` say. Those two only matter if you run the app outside Docker.

## Accounts and sessions

| Variable | Default | What it does |
|---|---|---|
| `REGISTRATION_ENABLED` | `true` | `false` turns off the registration page and the sign-up link. Nobody can create an account by password. |
| `REGISTRATION_REQUIRES_APPROVAL` | `false` | `true` lets people register but keeps the account disabled until you enable it in the database, see [Installation](./installation#_5-decide-who-else-can-register). |
| `SESSION_TIME` | `3600000` | How long a login lasts without activity, in milliseconds (one hour). Activity renews it. |
| `MAX_SESSION_AGE_DAYS` | `30` | The longest a login can last, even with constant activity. After this people must sign in again. |
| `DEMO_MODE` | `false` | Makes the instance read-only for public demos: only sign-in and browsing work, and SSO is switched off. |

## Single sign-on

All of these are explained, step by step, on [Single sign-on](./single-sign-on).

| Variable | Default | What it does |
|---|---|---|
| `OIDC_ISSUER` | empty | Address of your identity provider. |
| `OIDC_CLIENT_ID` | empty | Client ID from the provider. |
| `OIDC_CLIENT_SECRET` | empty | Client secret from the provider. |
| `OIDC_REDIRECT_URI` | empty | Must be exactly `https://your-address/auth/oidc/callback`. |
| `OIDC_SCOPES` | `openid profile email` | What to ask the provider for. |
| `OIDC_BUTTON_LABEL` | `Sign in with SSO` | Text of the button on the sign-in page. |
| `OIDC_GROUP_ROLES` | empty | Maps provider groups to vault roles. |
| `OIDC_GROUPS_CLAIM` | `groups` | Name of the field that holds a person's groups. |

SSO is on only when the first four are all set.

## Uploads and limits

| Variable | Default | What it does |
|---|---|---|
| `MAX_EBOOK_FILE_SIZE_MB` | `10` | Largest ebook file (`.epub`, `.pdf`, `.mobi`, `.azw3`) a person can upload to a book. Raise it for scanned PDFs. |
| `MAX_IMPORT_FILE_SIZE_MB` | `10` | Largest CSV accepted by [Importing books](../importing-books). |
| `MAX_JSON_BODY_PARSE` | `100kb` | Largest request body the API reads. Values such as `500kb` or `1mb` work. |
| `MAX_URLENCODED_BODY_PARSE` | `100kb` | Same, for form-style requests. |

If you put a reverse proxy in front, it may have its own upload limit too. Nginx, for example, stops at `1m` unless you raise `client_max_body_size`.

## Book information lookups

| Variable | Default | What it does |
|---|---|---|
| `GOOGLE_BOOKS_API_KEY` | empty | Optional. Gives you more lookups per day from Google Books. Open Library is tried first and needs no key. |
| `LIBRARYTHING_API_KEY` | empty | Optional. A third place to look for a cover when the first two have none. Free with a LibraryThing account. |

## Logging

| Variable | Default | What it does |
|---|---|---|
| `LOGGER_PATH` | `/app/logs` | Where the log is written inside the container. The `app-logs` volume keeps it. Leave it. |
| `DEBUG_LOGGING` | `false` | Detailed logging, including database queries and names of people and records. Use it briefly while troubleshooting, then turn it off. |

## A sensible starting file

```ini
APP_TAG=1.3.5
FRONT_END_URL=https://books.example.com
JWT_SECRET=<output of: openssl rand -hex 32>
DB_PASSWORD=<a long random password>
ALLOW_DEV_AUTH=false
TRUST_PROXY=true
REGISTRATION_ENABLED=false
```

This is for a public server behind a reverse proxy where you have already created the accounts you need.
