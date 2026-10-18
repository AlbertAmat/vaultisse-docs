# Self-hosting Vaultisse

Vaultisse is open source and built to be run by you. This section is for the person who **installs and looks after** a Vaultisse server: a family member with a home server, a school's IT person, or a small library's volunteer. If you only want to *use* Vaultisse, start with [Getting started](../getting-started) instead.

## What you are running

Vaultisse ships as **one Docker image** (`ghcr.io/albertamat/vaultisse`) that holds the server and the web app, plus a **PostgreSQL** database next to it. A ready-made `docker-compose.yml` starts both.

![The Vaultisse sign-in page, the first screen you see once the server is running](/screenshots/login-sso.png)

Everything you store lives in the database volume, so backing up and updating Vaultisse comes down to that volume and the image tag. Both are covered in this section.

## What you need

- A machine that can run Docker, such as a Linux server, a NAS or a small cloud VM.
- **Docker Engine with the Compose plugin.** Check with `docker compose version`.
- A way to reach it. For home use, the machine's address on your network is enough. To reach it from anywhere you also need a domain name and HTTPS, see [Reverse proxy & HTTPS](./reverse-proxy).

## Pick your setup

| You want… | Read |
|---|---|
| Vaultisse on your own computer or home network only | [Installation](./installation), then stop there |
| Vaultisse reachable from the internet | [Installation](./installation), then [Reverse proxy & HTTPS](./reverse-proxy) |
| Every setting explained | [Configuration reference](./configuration) |
| Sign-in with Authentik, Keycloak or another identity provider | [Single sign-on](./single-sign-on) |
| To upgrade or back up | [Updating & backups](./updating-and-backups) |
| Something is not working | [Troubleshooting](./troubleshooting) |

## The short version

If you are in a hurry, this is the whole install on a machine that already has Docker:

```bash
mkdir vaultisse && cd vaultisse
mkdir -p assets/db
curl -O https://raw.githubusercontent.com/AlbertAmat/vaultisse/main/docker-compose.yml
curl -O https://raw.githubusercontent.com/AlbertAmat/vaultisse/main/.env.example
curl -o assets/db/databaseSchema.sql https://raw.githubusercontent.com/AlbertAmat/vaultisse/main/assets/db/databaseSchema.sql
cp .env.example .env
# edit .env: set JWT_SECRET and DB_PASSWORD
docker compose up -d
```

Then open `http://localhost:3000/register` and create your account. The [Installation](./installation) page explains every step.
