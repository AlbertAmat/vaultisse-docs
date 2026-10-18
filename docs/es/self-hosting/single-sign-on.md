# Inicio de sesión único

Vaultisse permite que la gente inicie sesión con una cuenta que ya tiene en tu organización, mediante **OpenID Connect (OIDC)**. Funciona con Authentik, Keycloak, Authelia y cualquier otro proveedor que hable OIDC. Los ejemplos de abajo usan Authentik.

La contraseña sigue funcionando junto al SSO. Cuando el SSO está activado, la página de inicio de sesión muestra un botón más:

![La página de inicio de sesión con un botón "Sign in with SSO" sobre los campos de usuario y contraseña](/screenshots/login-sso.png)

## Cómo se comporta {#how-it-behaves}

- La primera vez que alguien inicia sesión con SSO, Vaultisse le crea una cuenta, con su propia biblioteca y sin paso de aprobación. **Entra quien el proveedor de identidad deje entrar**, así que controla el acceso allí. `REGISTRATION_REQUIRES_APPROVAL` y `REGISTRATION_ENABLED` no se aplican al SSO.
- Si una persona ya tiene una cuenta con contraseña con el mismo correo, y el proveedor dice que ese correo está verificado, el SSO se vincula a esa cuenta y conserva una sola biblioteca. Un correo que el proveedor no ha verificado nunca se usa para vincular cuentas.
- Los inicios de sesión SSO se saltan la verificación en dos pasos propia de Vaultisse, porque el proveedor ya hizo ese paso si lo exiges.
- Cerrar sesión termina solo la sesión de Vaultisse. No cierra la sesión de la persona en el proveedor.
- Cada inicio de SSO pide al proveedor que autentique de nuevo (`prompt=login`), así que un ordenador compartido nunca reutiliza en silencio la sesión de la persona anterior.

## 1. Crea la aplicación en el proveedor {#1-create-the-application-at-the-provider}

En Authentik, crea una aplicación con un **proveedor OAuth2/OpenID**. Los nombres de los menús cambian entre versiones; los valores que necesitas son:

| Ajuste | Valor |
|---|---|
| Tipo de cliente | **Confidential** |
| URI de redirección / callback | `https://books.example.com/auth/oidc/callback`, coincidiendo exactamente |
| Ámbitos (scopes) | `openid`, `profile`, `email` |

Después anota tres cosas del proveedor: el **Client ID**, el **Client secret** y la dirección del **emisor (issuer)**. En Authentik el emisor tiene este aspecto: `https://auth.example.com/application/o/vaultisse/`, con la barra final.

En Authentik, quien puede abrir la aplicación es quien puede iniciar sesión en Vaultisse, así que vincúlala a los grupos o usuarios que quieras.

## 2. Configura Vaultisse {#2-configure-vaultisse}

Añade esto a `.env`:

```ini
OIDC_ISSUER=https://auth.example.com/application/o/vaultisse/
OIDC_CLIENT_ID=<client id>
OIDC_CLIENT_SECRET=<client secret>
OIDC_REDIRECT_URI=https://books.example.com/auth/oidc/callback
```

`OIDC_REDIRECT_URI` debe ser idéntica a la registrada en el proveedor, carácter por carácter. A propósito no se deduce de la barra de direcciones. Aplícalo:

```bash
docker compose up -d
```

Recarga la página de inicio de sesión: el botón debería estar ahí. Para cambiar su texto, define `OIDC_BUTTON_LABEL`. Si trabajas detrás de un proxy, hace falta `TRUST_PROXY=true` como siempre, consulta [Proxy inverso y HTTPS](./reverse-proxy).

## 3. Roles a partir de grupos (opcional) {#3-roles-from-groups-optional}

De fábrica, el SSO solo decide **quién puede iniciar sesión**. Lo que cada persona puede hacer en una biblioteca compartida lo fija un administrador de la biblioteca en la lista de miembros, consulta [Compartir una biblioteca y roles](../sharing-and-roles).

Si tu gente ya pertenece a grupos en el proveedor, puedes dejar que esos grupos decidan el rol. Primero dile a Vaultisse qué grupo significa qué rol, en `.env`:

```ini
OIDC_GROUP_ROLES=example-users=borrower,example-managers=normal,example-admins=admin
```

Es una lista separada por comas de `grupo=rol`. Los roles son los cuatro de Vaultisse: `readonly`, `borrower`, `normal` y `admin`. Un error en esta lista detiene el servidor al arrancar con un mensaje, en lugar de fallar en silencio al iniciar sesión.

Vaultisse lee los grupos de un campo del token de inicio de sesión, llamado `groups` por defecto. Si tu proveedor usa otro nombre, define `OIDC_GROUPS_CLAIM`. En Authentik los grupos se incluyen con el ámbito `profile`.

Después, **por miembro**, un administrador de la biblioteca elige **Según los grupos SSO** en lugar de un rol fijo:

![El menú de roles en la lista de miembros de una biblioteca, con "Según los grupos SSO" como última opción](/screenshots/vault-member-role-picker.png)

Cómo funciona:

- En cada inicio de sesión SSO, en cada biblioteca donde esa persona esté en **Según los grupos SSO**, recibe el rol más alto entre sus grupos. Una persona que está en `example-users` y en `example-admins` pasa a ser admin.
- Una solicitud pendiente en esa biblioteca se acepta a la vez.
- Si ninguno de sus grupos está en la lista, conserva el rol que ya tiene. Nadie es expulsado ni rebajado por no tener un grupo.
- Los miembros fijados a mano y la biblioteca personal de cada persona nunca se modifican.
- La opción solo aparece para quienes han iniciado sesión con SSO al menos una vez.
- Una biblioteca siempre conserva un admin, y `borrower` no se puede aplicar en una biblioteca con los préstamos desactivados. Cuando un cambio rompería una de estas reglas, se omite y se escribe en el registro del servidor. El inicio de sesión sigue funcionando.

> **Nota:** Quitar a alguien de un grupo en el proveedor no le baja el rol por sí solo, porque un grupo que falta no cambia nada. Cambia su rol en la biblioteca, o pásalo a un grupo de rango inferior.

La lista de grupos se lee al iniciar sesión, así que un cambio en el proveedor se aplica la próxima vez que la persona inicie sesión.

## Solución de problemas {#troubleshooting}

**No aparece "Sign in with SSO".** Uno de los cuatro valores `OIDC_` obligatorios está vacío, o `DEMO_MODE` está activado. Compruébalo con `docker compose exec app env | grep OIDC_`.

**El inicio de sesión vuelve a la página de acceso con un error.** El mensaje es genérico a propósito. El motivo está en el registro: `docker compose logs app`. Las causas habituales son una URI de redirección que no es idéntica en ambos extremos, un secreto de cliente erróneo, un emisor sin su barra final, o una cuenta del proveedor sin dirección de correo.

**Los roles no se aplican.** Comprueba, por orden: `OIDC_GROUP_ROLES` está definido y los nombres de grupo coinciden exactamente con los del proveedor, mayúsculas incluidas; la persona está en **Según los grupos SSO** en esa biblioteca; el proveedor envía los grupos (el ámbito `profile` en Authentik); y la persona volvió a iniciar sesión después del cambio.

**Quiero que la gente siga pudiendo usar contraseñas.** No hay nada que hacer, ambas siguen disponibles. Para cerrar el alta con contraseña manteniendo el SSO, define `REGISTRATION_ENABLED=false`.
