# Solución de problemas

Empieza por el registro. En la mayoría de los casos nombra el problema:

```bash
docker compose logs --tail 100 app
```

## El contenedor de la aplicación se reinicia continuamente {#the-app-container-keeps-restarting}

Lee las últimas líneas del registro. El servidor se niega a arrancar, con un mensaje, cuando:

- `JWT_SECRET` está vacío.
- No puede llegar a la base de datos. Ejecuta `docker compose ps` y comprueba que `db` está **healthy**, y que `DB_PASSWORD` en `.env` es la misma con la que se creó la base de datos. La contraseña solo se usa la primera vez que se crea el volumen, así que cambiarla después en `.env` no cambia el usuario de la base de datos. O la cambias dentro de Postgres o, en una instalación nueva sin datos, eliminas el volumen (`docker compose down -v`) y empiezas de nuevo.
- `OIDC_GROUP_ROLES` tiene un error tipográfico, por ejemplo un rol que no existe.

## La página carga pero se ve rota, o los enlaces no llevan a ningún sitio {#the-page-loads-but-looks-broken-or-links-go-nowhere}

HTTP plano en algo distinto de `localhost`. Define `ALLOW_HTTP=true` y asegúrate de que `FRONT_END_URL` es la dirección que realmente escribes; después `docker compose up -d`. Si usas HTTPS a través de un proxy, `ALLOW_HTTP` debe ser `false`.

## No puedo iniciar sesión, o me devuelve a la página de acceso {#i-cannot-sign-in-or-i-am-sent-back-to-the-login-page}

- `FRONT_END_URL` debe coincidir exactamente con la dirección del navegador: mismo `http`/`https`, mismo host, mismo puerto, sin barra final.
- Detrás de un proxy hay que definir `TRUST_PROXY=true`, y el proxy debe pasar las cabeceras `X-Forwarded-For` y `X-Forwarded-Proto` (el ejemplo de Nginx de [Proxy inverso y HTTPS](./reverse-proxy#nginx) lo hace).
- Tras cambiar `JWT_SECRET`, todo el mundo tiene que iniciar sesión de nuevo. Es lo esperado.

## "Too many attempts, please try again later" {#too-many-attempts-please-try-again-later}

El inicio de sesión y el registro permiten cada uno solo cinco intentos por dirección en cinco minutos. Si lo alcanzas mientras pruebas, espera un rato o reinicia el contenedor de la aplicación para limpiarlo. Si le pasa a **todo el mundo**, estás detrás de un proxy y `TRUST_PROXY` es `false`, así que todos los visitantes parecen una sola dirección. Ponlo en `true`.

## He olvidado mi contraseña {#i-forgot-my-password}

Todavía no hay restablecimiento por correo. Otra persona con acceso a la base de datos puede fijar un nuevo hash de contraseña, o puedes crear una cuenta nueva. Si las personas a las que das servicio usan el [inicio de sesión único](./single-sign-on), no necesitan ninguna contraseña de Vaultisse.

## Fallan las subidas de ebooks {#ebook-uploads-fail}

El archivo es mayor que `MAX_EBOOK_FILE_SIZE_MB` (10 por defecto), o mayor de lo que permite tu proxy. Aumenta ambos, consulta la [Referencia de configuración](./configuration#uploads-and-limits).

## No cargan las portadas de un sitio de imágenes {#book-covers-do-not-load-for-an-image-site}

Las portadas de sitios que no están integrados las bloquean las reglas de seguridad del navegador. Añade el sitio a `CSP_EXTRA_IMG_SRC`, por ejemplo `https://covers.example.com`.

## Empezar de cero en una instalación de prueba {#starting-over-on-a-test-install}

Solo en una instalación **sin datos que te importen**:

```bash
docker compose down -v
docker compose up -d
```

La opción `-v` borra el volumen de la base de datos. No lo hagas nunca en un servidor con datos reales, consulta [Actualizaciones y copias de seguridad](./updating-and-backups).

## Sigues atascado {#still-stuck}

Abre una incidencia en [github.com/AlbertAmat/vaultisse/issues](https://github.com/AlbertAmat/vaultisse/issues) con la versión (`/api/rest/app/version`), lo que esperabas y las líneas relevantes de `docker compose logs app`. Quita cualquier secreto del registro antes de pegarlo.
