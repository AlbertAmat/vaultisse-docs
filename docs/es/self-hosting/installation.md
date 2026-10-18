# Instalación

Esta página instala Vaultisse con Docker Compose en una máquina y termina contigo con la sesión iniciada. Lleva unos diez minutos. Hacerlo accesible desde internet es un paso aparte, consulta [Proxy inverso y HTTPS](./reverse-proxy).

## 1. Consigue los archivos {#get-the-files}

Crea una carpeta para Vaultisse y descarga los tres archivos que necesita:

```bash
mkdir vaultisse && cd vaultisse
mkdir -p assets/db
curl -O https://raw.githubusercontent.com/AlbertAmat/vaultisse/main/docker-compose.yml
curl -O https://raw.githubusercontent.com/AlbertAmat/vaultisse/main/.env.example
curl -o assets/db/databaseSchema.sql https://raw.githubusercontent.com/AlbertAmat/vaultisse/main/assets/db/databaseSchema.sql
```

> **Nota:** El esquema de la base de datos debe quedar en `assets/db/databaseSchema.sql`, junto al archivo compose. `docker-compose.yml` lo monta con esa ruta relativa y el contenedor de la base de datos lo usa para crear las tablas la primera vez que arranca.

## 2. Crea tu archivo de ajustes {#create-your-settings-file}

```bash
cp .env.example .env
```

Abre `.env` en un editor de texto. Cuatro valores importan en una primera instalación:

| Ajuste | Qué poner |
|---|---|
| `JWT_SECRET` | Una cadena larga y aleatoria. Genérala con `openssl rand -hex 32`. Firma las sesiones, así que mantenla en privado. |
| `DB_PASSWORD` | Una contraseña a tu elección para la base de datos. No la dejes vacía. |
| `FRONT_END_URL` | La dirección que la gente escribirá en el navegador. `http://localhost:3000` si solo la usa esta máquina. Más abajo, otros casos. |
| `ALLOW_DEV_AUTH` | Déjalo en `false`. Omite la pantalla de inicio de sesión y existe solo para desarrollo. |

El `FRONT_END_URL` correcto depende de cómo se acceda al servidor:

- **Solo esta máquina:** `FRONT_END_URL=http://localhost:3000`.
- **Otros dispositivos de tu red doméstica** (un móvil, una tableta): usa la dirección de la máquina en la red, por ejemplo `FRONT_END_URL=http://192.168.1.50:3000`, y define también `ALLOW_HTTP=true`. Los navegadores fuerzan `https://` en todos los enlaces de un sitio HTTP plano salvo que sepan que es local, así que sin este ajuste la aplicación carga pero sus enlaces fallan.
- **Una dirección pública con HTTPS:** consulta [Proxy inverso y HTTPS](./reverse-proxy).

El resto de ajustes tiene un valor por defecto seguro. La lista completa está en la [Referencia de configuración](./configuration).

## 3. Arráncalo {#start-it}

```bash
docker compose up -d
```

El primer arranque descarga las imágenes y crea la base de datos, lo que puede tardar un minuto. Comprueba que ambos contenedores están en marcha:

```bash
docker compose ps
```

Deberías ver `db` como **healthy** y `app` como **running**. Si `app` se reinicia continuamente, ejecuta `docker compose logs app`; el mensaje del final suele indicar el ajuste que falta. Consulta [Solución de problemas](./troubleshooting).

## 4. Crea tu cuenta {#create-your-account}

Abre `FRONT_END_URL` seguido de `/register`, por ejemplo `http://localhost:3000/register`.

![La página de registro, con campos de nombre, correo, código de usuario y contraseña](/screenshots/register.png)

Rellena tus datos y haz clic en **Register**. La contraseña necesita al menos 8 caracteres, con una mayúscula, un dígito y un carácter especial. Después inicia sesión.

No hay una cuenta de administrador aparte ni contraseña por defecto. La primera persona que se registra recibe simplemente una cuenta normal, y cada cuenta empieza con su propia biblioteca (un *vault*) que administra. Más adelante se puede invitar a personas a la biblioteca de otras, consulta [Compartir una biblioteca y roles](../sharing-and-roles).

![El panel de control de una cuenta nueva de Vaultisse](/screenshots/dashboard.png)

## 5. Decide quién más puede registrarse {#decide-who-else-can-register}

Por defecto, cualquiera que llegue a `/register` puede crear una cuenta. Cuando las personas que necesitas ya se hayan registrado, puedes cerrarlo:

- `REGISTRATION_ENABLED=false` elimina por completo la página de registro. Nadie puede crear una cuenta.
- `REGISTRATION_REQUIRES_APPROVAL=true` mantiene la página, pero las cuentas nuevas no pueden iniciar sesión hasta que las habilites. Todavía no hay una pantalla de administración para esto, se hace en la base de datos:

  ```bash
  docker compose exec -T db psql -U postgres -d vaultisse \
    -c "UPDATE users SET disabled = FALSE WHERE code = 'su-usuario';"
  ```

  Usa tu propio `DB_USER` y `DB_NAME` si los cambiaste.

Tras cambiar `.env`, aplícalo con `docker compose up -d`. Compose recrea el contenedor solo cuando hace falta.

> **Consejo:** Si vas a usar el inicio de sesión único, el proveedor de identidad decide quién entra, y estos dos ajustes no se aplican a los inicios de sesión SSO. Consulta [Inicio de sesión único](./single-sign-on).

## Dónde se guarda cada cosa {#where-things-are-stored}

| Qué | Dónde |
|---|---|
| Todos tus datos (libros, préstamos, cuentas) | El volumen de Docker `db-data` |
| El registro de la aplicación | El volumen de Docker `app-logs`, archivo `bookStorage.log` |
| Tus ajustes | El archivo `.env` junto a `docker-compose.yml` |

No borres el volumen `db-data` y nunca ejecutes `docker compose down -v`, que elimina los volúmenes junto con los contenedores. Consulta [Actualizaciones y copias de seguridad](./updating-and-backups).

## Siguientes pasos

- Acceder desde fuera de casa: [Proxy inverso y HTTPS](./reverse-proxy).
- Iniciar sesión con las cuentas de tu organización: [Inicio de sesión único](./single-sign-on).
- Configura una copia de seguridad antes de añadir toda tu biblioteca: [Actualizaciones y copias de seguridad](./updating-and-backups).
