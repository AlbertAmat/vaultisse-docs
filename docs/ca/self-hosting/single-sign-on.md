# Inici de sessió únic

Vaultisse permet que la gent iniciï sessió amb un compte que ja té a la vostra organització, mitjançant **OpenID Connect (OIDC)**. Funciona amb Authentik, Keycloak, Authelia i qualsevol altre proveïdor que parli OIDC. Els exemples de sota fan servir Authentik.

La contrasenya continua funcionant al costat de l'SSO. Quan l'SSO està activat, la pàgina d'inici de sessió mostra un botó més:

![La pàgina d'inici de sessió amb un botó "Sign in with SSO" sobre els camps d'usuari i contrasenya](/screenshots/login-sso.png)

## Com es comporta {#how-it-behaves}

- La primera vegada que algú inicia sessió amb SSO, Vaultisse li crea un compte, amb la seva pròpia biblioteca i sense pas d'aprovació. **Entra qui el proveïdor d'identitat deixi entrar**, així que controleu l'accés allà. `REGISTRATION_REQUIRES_APPROVAL` i `REGISTRATION_ENABLED` no s'apliquen a l'SSO.
- Si una persona ja té un compte amb contrasenya amb el mateix correu, i el proveïdor diu que aquest correu està verificat, l'SSO es vincula a aquest compte i conserva una sola biblioteca. Un correu que el proveïdor no ha verificat no s'utilitza mai per vincular comptes.
- Els inicis de sessió SSO se salten la verificació en dos passos pròpia de Vaultisse, perquè el proveïdor ja ha fet aquest pas si l'exigiu.
- Tancar la sessió acaba només la sessió de Vaultisse. No tanca la sessió de la persona al proveïdor.
- Cada inici d'SSO demana al proveïdor que autentiqui de nou (`prompt=login`), així que un ordinador compartit mai no reutilitza en silenci la sessió de la persona anterior.

## 1. Creeu l'aplicació al proveïdor {#1-create-the-application-at-the-provider}

A Authentik, creeu una aplicació amb un **proveïdor OAuth2/OpenID**. Els noms dels menús canvien entre versions; els valors que necessiteu són:

| Paràmetre | Valor |
|---|---|
| Tipus de client | **Confidential** |
| URI de redirecció / callback | `https://books.example.com/auth/oidc/callback`, coincidint exactament |
| Àmbits (scopes) | `openid`, `profile`, `email` |

Després anoteu tres coses del proveïdor: el **Client ID**, el **Client secret** i l'adreça de l'**emissor (issuer)**. A Authentik l'emissor té aquest aspecte: `https://auth.example.com/application/o/vaultisse/`, amb la barra final.

A Authentik, qui pot obrir l'aplicació és qui pot iniciar sessió a Vaultisse, així que vinculeu-la als grups o usuaris que vulgueu.

## 2. Configureu Vaultisse {#2-configure-vaultisse}

Afegiu això a `.env`:

```ini
OIDC_ISSUER=https://auth.example.com/application/o/vaultisse/
OIDC_CLIENT_ID=<client id>
OIDC_CLIENT_SECRET=<client secret>
OIDC_REDIRECT_URI=https://books.example.com/auth/oidc/callback
```

`OIDC_REDIRECT_URI` ha de ser idèntica a la registrada al proveïdor, caràcter per caràcter. A propòsit no es dedueix de la barra d'adreces. Apliqueu-ho:

```bash
docker compose up -d
```

Torneu a carregar la pàgina d'inici de sessió: el botó hi hauria de ser. Per canviar-ne el text, definiu `OIDC_BUTTON_LABEL`. Si treballeu darrere d'un intermediari, cal `TRUST_PROXY=true` com sempre, consulteu [Servidor intermediari invers i HTTPS](./reverse-proxy).

## 3. Rols a partir de grups (opcional) {#3-roles-from-groups-optional}

De sèrie, l'SSO només decideix **qui pot iniciar sessió**. El que cada persona pot fer en una biblioteca compartida ho fixa un administrador de la biblioteca a la llista de membres, consulteu [Compartir una biblioteca i rols](../sharing-and-roles).

Si la vostra gent ja pertany a grups al proveïdor, podeu deixar que aquests grups decideixin el rol. Primer digueu a Vaultisse quin grup vol dir quin rol, a `.env`:

```ini
OIDC_GROUP_ROLES=example-users=borrower,example-managers=normal,example-admins=admin
```

És una llista separada per comes de `grup=rol`. Els rols són els quatre de Vaultisse: `readonly`, `borrower`, `normal` i `admin`. Un error en aquesta llista atura el servidor en arrencar amb un missatge, en lloc de fallar en silenci en iniciar sessió.

Vaultisse llegeix els grups d'un camp del token d'inici de sessió, anomenat `groups` per defecte. Si el vostre proveïdor fa servir un altre nom, definiu `OIDC_GROUPS_CLAIM`. A Authentik els grups s'inclouen amb l'àmbit `profile`.

Després, **per membre**, un administrador de la biblioteca tria **Segons els grups SSO** en lloc d'un rol fix:

![El menú de rols a la llista de membres d'una biblioteca, amb "Segons els grups SSO" com a darrera opció](/screenshots/vault-member-role-picker.png)

Com funciona:

- En cada inici de sessió SSO, en cada biblioteca on aquesta persona estigui en **Segons els grups SSO**, rep el rol més alt entre els seus grups. Una persona que és a `example-users` i a `example-admins` passa a ser admin.
- Una sol·licitud pendent en aquesta biblioteca s'accepta alhora.
- Si cap dels seus grups és a la llista, conserva el rol que ja té. Ningú no és expulsat ni rebaixat per no tenir un grup.
- Els membres fixats a mà i la biblioteca personal de cada persona no es modifiquen mai.
- L'opció només apareix per a qui ha iniciat sessió amb SSO almenys un cop.
- Una biblioteca sempre conserva un admin, i `borrower` no es pot aplicar en una biblioteca amb els préstecs desactivats. Quan un canvi trencaria una d'aquestes regles, s'omet i s'escriu al registre del servidor. L'inici de sessió continua funcionant.

> **Nota:** Treure algú d'un grup al proveïdor no li baixa el rol per si sol, perquè un grup que falta no canvia res. Canvieu-li el rol a la biblioteca, o passeu-lo a un grup de rang inferior.

La llista de grups es llegeix en iniciar sessió, així que un canvi al proveïdor s'aplica la propera vegada que la persona iniciï sessió.

## Resolució de problemes {#troubleshooting}

**No apareix "Sign in with SSO".** Un dels quatre valors `OIDC_` obligatoris és buit, o `DEMO_MODE` està activat. Comproveu-ho amb `docker compose exec app env | grep OIDC_`.

**L'inici de sessió torna a la pàgina d'accés amb un error.** El missatge és genèric a propòsit. El motiu és al registre: `docker compose logs app`. Les causes habituals són una URI de redirecció que no és idèntica en tots dos extrems, un secret de client erroni, un emissor sense la barra final, o un compte del proveïdor sense adreça de correu.

**Els rols no s'apliquen.** Comproveu, per ordre: `OIDC_GROUP_ROLES` està definit i els noms de grup coincideixen exactament amb els del proveïdor, majúscules incloses; la persona està en **Segons els grups SSO** en aquella biblioteca; el proveïdor envia els grups (l'àmbit `profile` a Authentik); i la persona va tornar a iniciar sessió després del canvi.

**Vull que la gent pugui continuar fent servir contrasenyes.** No cal fer res, totes dues continuen disponibles. Per tancar l'alta amb contrasenya mantenint l'SSO, definiu `REGISTRATION_ENABLED=false`.
