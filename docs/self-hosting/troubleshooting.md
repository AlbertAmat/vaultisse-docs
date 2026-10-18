# Troubleshooting

Start with the log. It names the problem in most cases:

```bash
docker compose logs --tail 100 app
```

## The app container keeps restarting

Read the last lines of the log. The server refuses to start, with a message, when:

- `JWT_SECRET` is empty.
- It cannot reach the database. Run `docker compose ps` and check that `db` is **healthy**, and that `DB_PASSWORD` in `.env` is the one the database was created with. The password is only used the first time the volume is created, so changing it later in `.env` does not change the database user. Either change it inside Postgres, or, on a fresh install with no data, remove the volume (`docker compose down -v`) and start again.
- `OIDC_GROUP_ROLES` has a typo, for example a role that does not exist.

## The page loads but looks broken, or links go nowhere

Plain HTTP on something other than `localhost`. Set `ALLOW_HTTP=true` and make sure `FRONT_END_URL` is the address you actually type, then `docker compose up -d`. If you use HTTPS through a proxy, `ALLOW_HTTP` should be `false`.

## I cannot sign in, or I am sent back to the login page

- `FRONT_END_URL` must match the address in the browser exactly: same `http`/`https`, same host, same port, no trailing slash.
- Behind a proxy, `TRUST_PROXY=true` must be set, and the proxy should pass the `X-Forwarded-For` and `X-Forwarded-Proto` headers (the Nginx example in [Reverse proxy & HTTPS](./reverse-proxy#nginx) does).
- After changing `JWT_SECRET`, everyone has to sign in again. That is expected.

## "Too many attempts, please try again later"

Sign-in and registration each allow only five attempts per address in five minutes. If you hit it while testing, wait a while, or restart the app container to clear it. If **everyone** hits it, you are behind a proxy and `TRUST_PROXY` is `false`, so all visitors look like one address. Set it to `true`.

## I forgot my password

There is no email reset yet. Another person with database access can set a new password hash, or you can create a new account. If the people you serve use [single sign-on](./single-sign-on), they do not need a Vaultisse password at all.

## Ebook uploads fail

The file is bigger than `MAX_EBOOK_FILE_SIZE_MB` (default 10), or bigger than your proxy allows. Raise both, see the [Configuration reference](./configuration#uploads-and-limits).

## Book covers do not load for an image site

Covers from sites that are not built in are blocked by the browser's security rules. Add the site to `CSP_EXTRA_IMG_SRC`, for example `https://covers.example.com`.

## Starting over on a test install

Only on an install with **no data you care about**:

```bash
docker compose down -v
docker compose up -d
```

The `-v` deletes the database volume. Never do this on a server with real data, see [Updating & backups](./updating-and-backups).

## Still stuck

Open an issue at [github.com/AlbertAmat/vaultisse/issues](https://github.com/AlbertAmat/vaultisse/issues) with the version (`/api/rest/app/version`), what you expected, and the relevant lines of `docker compose logs app`. Remove any secrets from the log before you paste it.
