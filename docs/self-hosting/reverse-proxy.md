# Reverse proxy & HTTPS

Out of the box Vaultisse listens on plain HTTP on port 3000. That is fine on your own computer or home network. To reach it from the internet you need a domain name and HTTPS, so that passwords and sessions are encrypted. Pick **one** of these ways:

| Option | Best when | Needs |
|---|---|---|
| [Caddy](#caddy) | You have a server with a public address and want the least work | A domain pointing at the server, ports 80 and 443 open |
| [Nginx](#nginx) | You already run Nginx | The same, plus Certbot |
| [Cloudflare Tunnel](#cloudflare-tunnel) | Your domain is on Cloudflare, or you cannot open ports | A free Cloudflare account |
| [Unraid](#unraid) | You run Unraid | Its Docker tab |

Whichever you choose, these two settings in `.env` are always needed:

```ini
FRONT_END_URL=https://books.example.com
TRUST_PROXY=true
```

`FRONT_END_URL` is the public address, exactly as typed in the browser. `TRUST_PROXY=true` tells Vaultisse a proxy is in front, so its protection against password guessing sees each visitor's real address and not the proxy's. Leave `ALLOW_HTTP=false`.

## Keep the app's own port private

If a proxy runs on the same machine, publish the app's port on the loopback address only, so the only way in is through the proxy. In `docker-compose.yml`, change the `app` service:

```yaml
    ports:
      - "127.0.0.1:${API_PORT:-3000}:${API_PORT:-3000}"
```

## Caddy

Caddy asks for and renews the HTTPS certificate by itself.

1. Point your domain's `A` record (and `AAAA` for IPv6) at the server.
2. Install Caddy on the server, outside Docker, and put this in `/etc/caddy/Caddyfile`:

   ```
   books.example.com {
       reverse_proxy localhost:3000
   }
   ```

3. Apply it:

   ```bash
   sudo systemctl reload caddy
   ```

4. Open ports 80 and 443 on your firewall. Nothing else needs to be open.

## Nginx

Add a server block that passes requests to the app:

```nginx
server {
    server_name books.example.com;
    client_max_body_size 20m;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $remote_addr;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Then get the certificate with Certbot, which adds the HTTPS part for you:

```bash
sudo certbot --nginx -d books.example.com
```

`client_max_body_size` must be at least as large as `MAX_EBOOK_FILE_SIZE_MB`, or ebook uploads fail.

## Cloudflare Tunnel

A tunnel makes an outbound connection to Cloudflare, so you open **no ports** and manage no certificates.

1. In the Cloudflare dashboard, go to **Zero Trust → Networks → Tunnels** and create a tunnel.
2. Add a public hostname, for example `books.example.com`, with the service set to `http://app:3000`. That is the Compose service name, not `localhost`.
3. Copy the tunnel token and put it in `.env`:

   ```ini
   FRONT_END_URL=https://books.example.com
   TRUST_PROXY=true
   CLOUDFLARE_TUNNEL_TOKEN=<your token>
   ```

4. Start the stack with the `cloudflare` profile so the tunnel container runs too:

   ```bash
   docker compose --profile cloudflare up -d
   ```

Once it works you can remove the `ports:` entry from the `app` service entirely. The tunnel reaches the app over Docker's internal network, so the server then has no inbound ports at all.

## Unraid

Unraid users can add Vaultisse from its Docker tab instead of Compose.

1. You need a PostgreSQL server first, either one you already run or the official `postgres` template. Load `assets/db/databaseSchema.sql` into an empty database once.
2. In a browser on your network, open this address, replacing `TOWER-IP`:

   ```
   http://TOWER-IP/Docker/AddContainer?xmlTemplate=https://raw.githubusercontent.com/AlbertAmat/vaultisse/main/assets/unraid/vaultisse.xml
   ```

3. Fill in `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `FRONT_END_URL` and `JWT_SECRET`, keep `ALLOW_DEV_AUTH` as `false`, and click **Apply**.
4. For plain `http://TOWER-IP:3000` on your network, set `ALLOW_HTTP=true` and `TRUST_PROXY=false`. If you add a proxy or tunnel with HTTPS, set `ALLOW_HTTP=false` and `TRUST_PROXY=true`.

If you make it reachable from the internet, give Vaultisse, its proxy and its own database a separate Docker network (`docker network create vaultisse-net`), and do not use `Host` or `br0` networking for it. That way a problem in this one app cannot reach your other containers.

## Check it

- Open `https://books.example.com` and make sure the padlock shows.
- Try signing in. If the page loads but sign-in loops or links fail, `FRONT_END_URL` does not match what you typed, or `ALLOW_HTTP` is wrong. See [Troubleshooting](./troubleshooting).

## Security checklist

- [ ] `ALLOW_DEV_AUTH=false`
- [ ] `JWT_SECRET` generated with `openssl rand -hex 32`
- [ ] `DB_PASSWORD` is a real password
- [ ] `TRUST_PROXY=true` behind a proxy or tunnel, `false` otherwise
- [ ] `ALLOW_HTTP=false` whenever HTTPS is in front
- [ ] The app's port is bound to `127.0.0.1`, or not published at all with a tunnel
- [ ] `APP_TAG` is pinned to a version
- [ ] Registration is closed once the people you need have accounts
