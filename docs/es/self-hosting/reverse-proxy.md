# Proxy inverso y HTTPS

Tal como viene, Vaultisse escucha en HTTP plano en el puerto 3000. Está bien en tu propio ordenador o red doméstica. Para acceder desde internet necesitas un nombre de dominio y HTTPS, de modo que contraseñas y sesiones viajen cifradas. Elige **una** de estas formas:

| Opción | Ideal cuando | Necesita |
|---|---|---|
| [Caddy](#caddy) | Tienes un servidor con dirección pública y quieres el menor trabajo | Un dominio que apunte al servidor, puertos 80 y 443 abiertos |
| [Nginx](#nginx) | Ya usas Nginx | Lo mismo, más Certbot |
| [Cloudflare Tunnel](#cloudflare-tunnel) | Tu dominio está en Cloudflare, o no puedes abrir puertos | Una cuenta gratuita de Cloudflare |
| [Unraid](#unraid) | Usas Unraid | Su pestaña Docker |

Elijas lo que elijas, estos dos ajustes de `.env` siempre hacen falta:

```ini
FRONT_END_URL=https://books.example.com
TRUST_PROXY=true
```

`FRONT_END_URL` es la dirección pública, exactamente como se escribe en el navegador. `TRUST_PROXY=true` avisa a Vaultisse de que hay un proxy delante, para que su protección contra la adivinación de contraseñas vea la dirección real de cada visitante y no la del proxy. Deja `ALLOW_HTTP=false`.

## Mantén privado el puerto de la aplicación {#keep-the-apps-own-port-private}

Si el proxy se ejecuta en la misma máquina, publica el puerto de la aplicación solo en la dirección de loopback, para que la única entrada sea el proxy. En `docker-compose.yml`, cambia el servicio `app`:

```yaml
    ports:
      - "127.0.0.1:${API_PORT:-3000}:${API_PORT:-3000}"
```

## Caddy {#caddy}

Caddy solicita y renueva por sí mismo el certificado HTTPS.

1. Apunta el registro `A` de tu dominio (y `AAAA` para IPv6) al servidor.
2. Instala Caddy en el servidor, fuera de Docker, y pon esto en `/etc/caddy/Caddyfile`:

   ```
   books.example.com {
       reverse_proxy localhost:3000
   }
   ```

3. Aplícalo:

   ```bash
   sudo systemctl reload caddy
   ```

4. Abre los puertos 80 y 443 en tu cortafuegos. No hace falta abrir nada más.

## Nginx {#nginx}

Añade un bloque `server` que pase las peticiones a la aplicación:

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

Después obtén el certificado con Certbot, que añade la parte HTTPS por ti:

```bash
sudo certbot --nginx -d books.example.com
```

`client_max_body_size` debe ser al menos tan grande como `MAX_EBOOK_FILE_SIZE_MB`, o fallarán las subidas de ebooks.

## Cloudflare Tunnel {#cloudflare-tunnel}

Un túnel hace una conexión saliente hacia Cloudflare, así que no abres **ningún puerto** ni gestionas certificados.

1. En el panel de Cloudflare, ve a **Zero Trust → Networks → Tunnels** y crea un túnel.
2. Añade un nombre de host público, por ejemplo `books.example.com`, con el servicio `http://app:3000`. Es el nombre del servicio de Compose, no `localhost`.
3. Copia el token del túnel y ponlo en `.env`:

   ```ini
   FRONT_END_URL=https://books.example.com
   TRUST_PROXY=true
   CLOUDFLARE_TUNNEL_TOKEN=<tu token>
   ```

4. Inicia el stack con el perfil `cloudflare` para que también se ejecute el contenedor del túnel:

   ```bash
   docker compose --profile cloudflare up -d
   ```

Cuando funcione puedes quitar por completo la entrada `ports:` del servicio `app`. El túnel llega a la aplicación por la red interna de Docker, así que el servidor no tiene entonces ningún puerto de entrada.

## Unraid {#unraid}

Los usuarios de Unraid pueden añadir Vaultisse desde su pestaña Docker en lugar de usar Compose.

1. Primero necesitas un servidor PostgreSQL, uno que ya uses o la plantilla oficial `postgres`. Carga `assets/db/databaseSchema.sql` una vez en una base de datos vacía.
2. En un navegador de tu red, abre esta dirección, sustituyendo `TOWER-IP`:

   ```
   http://TOWER-IP/Docker/AddContainer?xmlTemplate=https://raw.githubusercontent.com/AlbertAmat/vaultisse/main/assets/unraid/vaultisse.xml
   ```

3. Rellena `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `FRONT_END_URL` y `JWT_SECRET`, deja `ALLOW_DEV_AUTH` en `false` y haz clic en **Apply**.
4. Para `http://TOWER-IP:3000` plano en tu red, define `ALLOW_HTTP=true` y `TRUST_PROXY=false`. Si añades un proxy o túnel con HTTPS, define `ALLOW_HTTP=false` y `TRUST_PROXY=true`.

Si lo haces accesible desde internet, dale a Vaultisse, a su proxy y a su propia base de datos una red de Docker separada (`docker network create vaultisse-net`), y no uses redes `Host` ni `br0` para él. Así un problema en esta aplicación no puede llegar a tus demás contenedores.

## Compruébalo {#check-it}

- Abre `https://books.example.com` y comprueba que aparece el candado.
- Intenta iniciar sesión. Si la página carga pero el inicio de sesión da vueltas o los enlaces fallan, `FRONT_END_URL` no coincide con lo que escribiste, o `ALLOW_HTTP` es incorrecto. Consulta [Solución de problemas](./troubleshooting).

## Lista de comprobación de seguridad {#security-checklist}

- [ ] `ALLOW_DEV_AUTH=false`
- [ ] `JWT_SECRET` generado con `openssl rand -hex 32`
- [ ] `DB_PASSWORD` es una contraseña real
- [ ] `TRUST_PROXY=true` detrás de un proxy o túnel, `false` en otro caso
- [ ] `ALLOW_HTTP=false` siempre que haya HTTPS delante
- [ ] El puerto de la aplicación está enlazado a `127.0.0.1`, o no publicado con un túnel
- [ ] `APP_TAG` fijado a una versión
- [ ] El registro está cerrado cuando las personas que necesitas ya tienen cuenta
