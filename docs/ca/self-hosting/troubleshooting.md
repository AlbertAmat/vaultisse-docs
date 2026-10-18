# Resolució de problemes

Comenceu pel registre. En la majoria dels casos anomena el problema:

```bash
docker compose logs --tail 100 app
```

## El contenidor de l'aplicació es reinicia contínuament {#the-app-container-keeps-restarting}

Llegiu les últimes línies del registre. El servidor es nega a arrencar, amb un missatge, quan:

- `JWT_SECRET` és buit.
- No pot arribar a la base de dades. Executeu `docker compose ps` i comproveu que `db` està **healthy**, i que `DB_PASSWORD` a `.env` és la mateixa amb què es va crear la base de dades. La contrasenya només es fa servir la primera vegada que es crea el volum, així que canviar-la després a `.env` no canvia l'usuari de la base de dades. O la canvieu dins de Postgres o, en una instal·lació nova sense dades, elimineu el volum (`docker compose down -v`) i comenceu de nou.
- `OIDC_GROUP_ROLES` té un error tipogràfic, per exemple un rol que no existeix.

## La pàgina carrega però es veu trencada, o els enllaços no porten enlloc {#the-page-loads-but-looks-broken-or-links-go-nowhere}

HTTP pla en alguna cosa diferent de `localhost`. Definiu `ALLOW_HTTP=true` i assegureu-vos que `FRONT_END_URL` és l'adreça que realment escriviu; després `docker compose up -d`. Si feu servir HTTPS a través d'un intermediari, `ALLOW_HTTP` ha de ser `false`.

## No puc iniciar sessió, o em torna a la pàgina d'accés {#i-cannot-sign-in-or-i-am-sent-back-to-the-login-page}

- `FRONT_END_URL` ha de coincidir exactament amb l'adreça del navegador: mateix `http`/`https`, mateix host, mateix port, sense barra final.
- Darrere d'un intermediari cal definir `TRUST_PROXY=true`, i l'intermediari ha de passar les capçaleres `X-Forwarded-For` i `X-Forwarded-Proto` (l'exemple de Nginx de [Servidor intermediari invers i HTTPS](./reverse-proxy#nginx) ho fa).
- Després de canviar `JWT_SECRET`, tothom ha de tornar a iniciar sessió. És l'esperat.

## "Too many attempts, please try again later" {#too-many-attempts-please-try-again-later}

L'inici de sessió i el registre permeten cadascun només cinc intents per adreça en cinc minuts. Si ho assoliu mentre proveu, espereu una estona o reinicieu el contenidor de l'aplicació per netejar-ho. Si li passa a **tothom**, sou darrere d'un intermediari i `TRUST_PROXY` és `false`, així que tots els visitants semblen una sola adreça. Poseu-lo en `true`.

## He oblidat la contrasenya {#i-forgot-my-password}

Encara no hi ha restabliment per correu. Una altra persona amb accés a la base de dades pot fixar un nou hash de contrasenya, o podeu crear un compte nou. Si les persones a qui doneu servei fan servir l'[inici de sessió únic](./single-sign-on), no necessiten cap contrasenya de Vaultisse.

## Fallen les pujades d'ebooks {#ebook-uploads-fail}

El fitxer és més gran que `MAX_EBOOK_FILE_SIZE_MB` (10 per defecte), o més gran del que permet el vostre intermediari. Augmenteu tots dos, consulteu la [Referència de configuració](./configuration#uploads-and-limits).

## No carreguen les cobertes d'un lloc d'imatges {#book-covers-do-not-load-for-an-image-site}

Les cobertes de llocs que no estan integrats les bloquegen les regles de seguretat del navegador. Afegiu el lloc a `CSP_EXTRA_IMG_SRC`, per exemple `https://covers.example.com`.

## Començar de zero en una instal·lació de prova {#starting-over-on-a-test-install}

Només en una instal·lació **sense dades que us importin**:

```bash
docker compose down -v
docker compose up -d
```

L'opció `-v` esborra el volum de la base de dades. No ho feu mai en un servidor amb dades reals, consulteu [Actualitzacions i còpies de seguretat](./updating-and-backups).

## Continueu encallats {#still-stuck}

Obriu una incidència a [github.com/AlbertAmat/vaultisse/issues](https://github.com/AlbertAmat/vaultisse/issues) amb la versió (`/api/rest/app/version`), el que esperàveu i les línies rellevants de `docker compose logs app`. Traieu qualsevol secret del registre abans d'enganxar-lo.
