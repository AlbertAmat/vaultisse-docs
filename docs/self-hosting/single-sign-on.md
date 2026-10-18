# Single sign-on

Vaultisse can let people sign in with an account they already have at your organization, through **OpenID Connect (OIDC)**. This works with Authentik, Keycloak, Authelia and any other provider that speaks OIDC. The examples below use Authentik.

Password sign-in keeps working next to it. When SSO is on, the sign-in page gains a button:

![The sign-in page with a "Sign in with SSO" button above the username and password fields](/screenshots/login-sso.png)

## How it behaves

- The first time someone signs in with SSO, Vaultisse creates an account for them, with its own library, and no approval step. **Whoever the identity provider lets in gets in**, so control access there. `REGISTRATION_REQUIRES_APPROVAL` and `REGISTRATION_ENABLED` do not apply to SSO.
- If a person already has a password account with the same email, and the provider says that email is verified, SSO links to that account, so they keep one library. An email the provider has not verified is never used to link accounts.
- SSO sign-ins skip Vaultisse's own two-factor prompt, because the provider already did that step if you require it.
- Logging out ends the Vaultisse session only. It does not sign the person out of the provider.
- Every SSO start asks the provider to authenticate again (`prompt=login`), so a shared computer never silently reuses the previous person's session.

## 1. Create the application at the provider

In Authentik, create an application with an **OAuth2/OpenID provider**. Names of menus change between versions, the values you need are:

| Setting | Value |
|---|---|
| Client type | **Confidential** |
| Redirect URI / callback | `https://books.example.com/auth/oidc/callback`, matched exactly |
| Scopes | `openid`, `profile`, `email` |

Then note three things from the provider: the **Client ID**, the **Client secret**, and the **issuer** address. In Authentik the issuer looks like `https://auth.example.com/application/o/vaultisse/`, with the slash at the end.

In Authentik, who can open the application is who can sign in to Vaultisse, so bind it to the groups or users you want.

## 2. Configure Vaultisse

Add these to `.env`:

```ini
OIDC_ISSUER=https://auth.example.com/application/o/vaultisse/
OIDC_CLIENT_ID=<client id>
OIDC_CLIENT_SECRET=<client secret>
OIDC_REDIRECT_URI=https://books.example.com/auth/oidc/callback
```

`OIDC_REDIRECT_URI` must be identical to the one registered at the provider, character for character. It is not worked out from the address bar on purpose. Apply it:

```bash
docker compose up -d
```

Reload the sign-in page, the button should be there. To change its text, set `OIDC_BUTTON_LABEL`. If you run behind a proxy, `TRUST_PROXY=true` is needed as usual, see [Reverse proxy & HTTPS](./reverse-proxy).

## 3. Roles from groups (optional)

Out of the box, SSO only decides **who can sign in**. What each person may do in a shared library is set by a vault administrator in the members list, see [Sharing a library & roles](../sharing-and-roles).

If your people already belong to groups at the provider, you can let those groups decide the role. First tell Vaultisse which group means which role, in `.env`:

```ini
OIDC_GROUP_ROLES=example-users=borrower,example-managers=normal,example-admins=admin
```

This is a comma-separated list of `group=role`. The roles are the four Vaultisse roles: `readonly`, `borrower`, `normal` and `admin`. A mistake in this list stops the server at startup with a message, instead of failing quietly at sign-in.

Vaultisse reads the groups from a field in the sign-in token, called `groups` by default. If your provider uses another name, set `OIDC_GROUPS_CLAIM`. In Authentik the groups are included with the `profile` scope.

Then, **per member**, a vault administrator picks **Based on SSO groups** instead of a fixed role:

![The role menu in a vault's member list, with "Based on SSO groups" as the last option](/screenshots/vault-member-role-picker.png)

How it works:

- At each SSO sign-in, in every vault where that person is set to **Based on SSO groups**, they get the highest role among their groups. A person in both `example-users` and `example-admins` becomes an admin.
- A pending request in that vault is accepted at the same time.
- If none of their groups is in the list, they keep the role they already have. Nobody is removed or demoted because of a missing group.
- Members who are set by hand, and everyone's personal library, are never changed.
- The option only shows for people who have signed in with SSO at least once.
- A vault always keeps one admin, and `borrower` cannot be applied in a vault with loans turned off. When a change would break one of these rules, it is skipped and written to the server log. The sign-in still works.

> **Note:** Removing someone from a group at the provider does not lower their role by itself, because a missing group changes nothing. Change their role in the vault, or move them to a lower-ranked group.

The group list is read at sign-in, so a change at the provider is applied the next time the person signs in.

## Troubleshooting

**"Sign in with SSO" does not appear.** One of the four required `OIDC_` values is empty, or `DEMO_MODE` is on. Check with `docker compose exec app env | grep OIDC_`.

**Sign-in returns to the login page with an error.** The message is intentionally generic. The reason is in the log: `docker compose logs app`. The usual causes are a redirect URI that is not identical at both ends, a wrong client secret, an issuer without its trailing slash, or a provider account with no email address.

**Roles are not applied.** Check, in order: `OIDC_GROUP_ROLES` is set and the group names match the provider's exactly, including case; the person is set to **Based on SSO groups** in that vault; the provider sends the groups (the `profile` scope in Authentik); and the person signed in again after the change.

**I want people to keep using passwords too.** Nothing to do, both stay available. To close password sign-up while keeping SSO, set `REGISTRATION_ENABLED=false`.
