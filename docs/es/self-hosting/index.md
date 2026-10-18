# Autoalojar Vaultisse

Vaultisse es de código abierto y está pensado para que lo ejecutes tú. Esta sección es para la persona que **instala y mantiene** un servidor de Vaultisse: un familiar con un servidor en casa, el responsable informático de un colegio o el voluntario de una pequeña biblioteca. Si solo quieres *usar* Vaultisse, empieza por [Primeros pasos](../getting-started).

## Qué estás ejecutando

Vaultisse se distribuye como **una sola imagen de Docker** (`ghcr.io/albertamat/vaultisse`) que contiene el servidor y la aplicación web, junto a una base de datos **PostgreSQL**. Un `docker-compose.yml` ya preparado inicia ambos.

![La página de inicio de sesión de Vaultisse, la primera pantalla que ves cuando el servidor está en marcha](/screenshots/login-sso.png)

Todo lo que guardas vive en el volumen de la base de datos, así que las copias de seguridad y las actualizaciones se reducen a ese volumen y a la etiqueta de la imagen. Ambos temas se explican en esta sección.

## Qué necesitas

- Una máquina que pueda ejecutar Docker, como un servidor Linux, un NAS o una pequeña máquina virtual en la nube.
- **Docker Engine con el plugin Compose.** Compruébalo con `docker compose version`.
- Una forma de acceder. Para uso doméstico basta con la dirección de la máquina en tu red. Para acceder desde cualquier lugar necesitas además un nombre de dominio y HTTPS, consulta [Proxy inverso y HTTPS](./reverse-proxy).

## Elige tu configuración

| Quieres… | Lee |
|---|---|
| Vaultisse solo en tu ordenador o red doméstica | [Instalación](./installation) y para ahí |
| Vaultisse accesible desde internet | [Instalación](./installation) y después [Proxy inverso y HTTPS](./reverse-proxy) |
| Todos los ajustes explicados | [Referencia de configuración](./configuration) |
| Iniciar sesión con Authentik, Keycloak u otro proveedor de identidad | [Inicio de sesión único](./single-sign-on) |
| Actualizar o hacer copias de seguridad | [Actualizaciones y copias de seguridad](./updating-and-backups) |
| Algo no funciona | [Solución de problemas](./troubleshooting) |

## La versión corta

Si tienes prisa, esta es toda la instalación en una máquina que ya tiene Docker:

```bash
mkdir vaultisse && cd vaultisse
mkdir -p assets/db
curl -O https://raw.githubusercontent.com/AlbertAmat/vaultisse/main/docker-compose.yml
curl -O https://raw.githubusercontent.com/AlbertAmat/vaultisse/main/.env.example
curl -o assets/db/databaseSchema.sql https://raw.githubusercontent.com/AlbertAmat/vaultisse/main/assets/db/databaseSchema.sql
cp .env.example .env
# edita .env: define JWT_SECRET y DB_PASSWORD
docker compose up -d
```

Después abre `http://localhost:3000/register` y crea tu cuenta. La página de [Instalación](./installation) explica cada paso.
