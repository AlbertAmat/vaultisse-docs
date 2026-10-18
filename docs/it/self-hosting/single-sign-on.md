# Single sign-on

Vaultisse permette alle persone di accedere con un account che hanno già nella tua organizzazione, tramite **OpenID Connect (OIDC)**. Funziona con Authentik, Keycloak, Authelia e qualsiasi altro provider che parli OIDC. Gli esempi qui sotto usano Authentik.

L'accesso con password continua a funzionare accanto all'SSO. Quando l'SSO è attivo, la pagina di accesso mostra un pulsante in più:

![La pagina di accesso con un pulsante "Sign in with SSO" sopra i campi nome utente e password](/screenshots/login-sso.png)

## Come si comporta {#how-it-behaves}

- La prima volta che qualcuno accede con l'SSO, Vaultisse crea per lui un account, con la sua biblioteca e senza passaggio di approvazione. **Entra chiunque il provider di identità lasci entrare**, quindi controlla l'accesso lì. `REGISTRATION_REQUIRES_APPROVAL` e `REGISTRATION_ENABLED` non si applicano all'SSO.
- Se una persona ha già un account con password con la stessa email, e il provider dice che quell'email è verificata, l'SSO si collega a quell'account, così mantiene una sola biblioteca. Un'email che il provider non ha verificato non viene mai usata per collegare account.
- Gli accessi SSO saltano la verifica in due passaggi propria di Vaultisse, perché il provider ha già fatto quel passaggio se lo richiedi.
- Il logout termina solo la sessione di Vaultisse. Non disconnette la persona dal provider.
- Ogni avvio dell'SSO chiede al provider di autenticare di nuovo (`prompt=login`), così un computer condiviso non riutilizza mai in silenzio la sessione della persona precedente.

## 1. Crea l'applicazione presso il provider {#1-create-the-application-at-the-provider}

In Authentik, crea un'applicazione con un **provider OAuth2/OpenID**. I nomi dei menu cambiano tra le versioni; i valori che ti servono sono:

| Impostazione | Valore |
|---|---|
| Tipo di client | **Confidential** |
| URI di reindirizzamento / callback | `https://books.example.com/auth/oidc/callback`, corrispondente esattamente |
| Ambiti (scopes) | `openid`, `profile`, `email` |

Poi annota tre cose dal provider: il **Client ID**, il **Client secret** e l'indirizzo dell'**emittente (issuer)**. In Authentik l'emittente ha questo aspetto: `https://auth.example.com/application/o/vaultisse/`, con la barra finale.

In Authentik, chi può aprire l'applicazione è chi può accedere a Vaultisse, quindi associala ai gruppi o agli utenti che vuoi.

## 2. Configura Vaultisse {#2-configure-vaultisse}

Aggiungi questo a `.env`:

```ini
OIDC_ISSUER=https://auth.example.com/application/o/vaultisse/
OIDC_CLIENT_ID=<client id>
OIDC_CLIENT_SECRET=<client secret>
OIDC_REDIRECT_URI=https://books.example.com/auth/oidc/callback
```

`OIDC_REDIRECT_URI` deve essere identico a quello registrato presso il provider, carattere per carattere. Di proposito non viene ricavato dalla barra degli indirizzi. Applicalo:

```bash
docker compose up -d
```

Ricarica la pagina di accesso: il pulsante dovrebbe esserci. Per cambiarne il testo, imposta `OIDC_BUTTON_LABEL`. Se lavori dietro un proxy, serve `TRUST_PROXY=true` come sempre, vedi [Reverse proxy e HTTPS](./reverse-proxy).

## 3. Ruoli dai gruppi (opzionale) {#3-roles-from-groups-optional}

Di base, l'SSO decide solo **chi può accedere**. Ciò che ogni persona può fare in una biblioteca condivisa lo imposta un amministratore della biblioteca nell'elenco dei membri, vedi [Condividere una biblioteca e ruoli](../sharing-and-roles).

Se le tue persone appartengono già a dei gruppi presso il provider, puoi lasciare che siano quei gruppi a decidere il ruolo. Per prima cosa dì a Vaultisse quale gruppo significa quale ruolo, in `.env`:

```ini
OIDC_GROUP_ROLES=example-users=borrower,example-managers=normal,example-admins=admin
```

È un elenco separato da virgole di `gruppo=ruolo`. I ruoli sono i quattro di Vaultisse: `readonly`, `borrower`, `normal` e `admin`. Un errore in questo elenco ferma il server all'avvio con un messaggio, invece di fallire in silenzio all'accesso.

Vaultisse legge i gruppi da un campo del token di accesso, chiamato `groups` per impostazione predefinita. Se il tuo provider usa un altro nome, imposta `OIDC_GROUPS_CLAIM`. In Authentik i gruppi sono inclusi con l'ambito `profile`.

Poi, **per ogni membro**, un amministratore della biblioteca sceglie **In base ai gruppi SSO** invece di un ruolo fisso:

![Il menu dei ruoli nell'elenco dei membri di una biblioteca, con "In base ai gruppi SSO" come ultima opzione](/screenshots/vault-member-role-picker.png)

Come funziona:

- A ogni accesso SSO, in ogni biblioteca in cui quella persona è impostata su **In base ai gruppi SSO**, ottiene il ruolo più alto tra i suoi gruppi. Una persona che è in `example-users` e in `example-admins` diventa admin.
- Una richiesta in sospeso in quella biblioteca viene accettata contemporaneamente.
- Se nessuno dei suoi gruppi è nell'elenco, mantiene il ruolo che ha già. Nessuno viene rimosso o retrocesso per l'assenza di un gruppo.
- I membri impostati a mano e la biblioteca personale di ciascuno non vengono mai modificati.
- L'opzione compare solo per chi ha effettuato l'accesso con SSO almeno una volta.
- Una biblioteca mantiene sempre un admin, e `borrower` non può essere applicato in una biblioteca con i prestiti disattivati. Quando una modifica violerebbe una di queste regole, viene saltata e scritta nel registro del server. L'accesso funziona comunque.

> **Nota:** Togliere qualcuno da un gruppo presso il provider non ne abbassa il ruolo da solo, perché un gruppo mancante non cambia nulla. Cambia il suo ruolo nella biblioteca, oppure spostalo in un gruppo di rango inferiore.

L'elenco dei gruppi viene letto all'accesso, quindi una modifica presso il provider si applica la volta successiva che la persona accede.

## Risoluzione dei problemi {#troubleshooting}

**"Sign in with SSO" non compare.** Uno dei quattro valori `OIDC_` obbligatori è vuoto, oppure `DEMO_MODE` è attivo. Verifica con `docker compose exec app env | grep OIDC_`.

**L'accesso torna alla pagina di login con un errore.** Il messaggio è generico di proposito. Il motivo è nel registro: `docker compose logs app`. Le cause tipiche sono un URI di reindirizzamento non identico ai due capi, un segreto client sbagliato, un emittente senza la barra finale, o un account del provider senza indirizzo email.

**I ruoli non vengono applicati.** Controlla, in ordine: `OIDC_GROUP_ROLES` è impostato e i nomi dei gruppi coincidono esattamente con quelli del provider, maiuscole incluse; la persona è impostata su **In base ai gruppi SSO** in quella biblioteca; il provider invia i gruppi (l'ambito `profile` in Authentik); e la persona ha effettuato di nuovo l'accesso dopo la modifica.

**Voglio che le persone possano continuare a usare le password.** Non serve fare nulla, restano disponibili entrambe. Per chiudere l'iscrizione con password mantenendo l'SSO, imposta `REGISTRATION_ENABLED=false`.
