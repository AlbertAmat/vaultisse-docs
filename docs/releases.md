# Releases

Everything that's shipped in Vaultisse, newest first. Vaultisse started life as **PaperBooks**;
the rename happened during the [v1.1.0](#v1-1-0) release, and this page uses the current name
throughout, even for changes that shipped before it.

## v1.3.6 — 2026-10-18 {#v1-3-6}

**Roles from SSO groups, per member.** The group mapping that arrived in v1.3.5 is reworked so a vault
admin decides, member by member, whether a role follows the identity provider. See
[Sharing a library & roles](./sharing-and-roles#roles-from-sso-groups).

- **A new role option: Based on SSO groups.** In a vault's member list, a person who has signed in
  with SSO can be set to follow their groups instead of a fixed role. At each SSO login they get the
  highest role their groups map to, and a pending request is accepted at the same time. A person
  with no mapped group keeps the role they have. Choosing a role by hand switches them back to manual.
- **Works across vaults.** Each vault decides per member, and personal libraries are never touched.
- **`OIDC_GROUP_VAULT_ID` is gone.** Only `OIDC_GROUP_ROLES` (and `OIDC_GROUPS_CLAIM`) remain. Remove
  `OIDC_GROUP_VAULT_ID` from your `.env`; members are no longer synced automatically, a vault admin
  opts them in. See [Single sign-on](./self-hosting/single-sign-on#_3-roles-from-groups-optional).
- Group changes that would leave a vault without an admin, or make someone a borrower in a vault
  without loans, are skipped and logged, and the login still succeeds.
- The database upgrade (a `role_source` column on vault members) is applied automatically on start.

## v1.3.5 — 2026-10-18 {#v1-3-5}

**An OPDS feed, regional book lookups, and a first version of SSO group roles.**

- **OPDS feed for ebook apps.** In **Settings** you can create a private feed link, and reader apps
  such as KOReader can browse and download the ebook files of your active vault. The link is shown
  only once when you create it, you can replace it with a new one, or disable it. Anyone with the link
  can read the library, so keep it private. Both OPDS 1.2 and 2.0 are offered.
- **Regional ISBN lookups are on.** Adding a book by ISBN now asks the national library for the ISBN's
  region first (Spain, Italy or Germany), together with Open Library and Google Books at the same
  time, and merges the answers in that order of priority. If the German National Library's MARC 21 answer
  fails, it falls back to its Dublin Core one. This enables the groundwork shipped in v1.3.4.
- **Loans are now a vault setting.** The Loans switch moved from each person's Settings to the
  vault's settings, so it applies to every member. It can't be switched off while the vault has
  borrower members or books on loan. Vaults already using loans keep them on.
- **SSO group roles, first version.** A new `OIDC_GROUP_ROLES` setting maps identity-provider groups
  to roles in one shared vault chosen with `OIDC_GROUP_VAULT_ID`. This was replaced by the per-member
  option in [v1.3.6](#v1-3-6).
- **Server log shows why a sign-in failed.** Locked 2FA, a wrong 2FA code, a wrong password and an
  unknown account are written to the log, and so are other errors the server prints, which helps
  when you [troubleshoot](./self-hosting/troubleshooting).
- Updated the app's libraries, including Vue and Vuetify, and fixed some styles.

## v1.3.4 — 2026-10-10 {#v1-3-4}

**Borrowers.** Shared libraries can now be used by people who only *borrow* from them. See
[Sharing a library & roles](./sharing-and-roles).

- **Lend to vault members.** A copy can be lent to a member of your vault (Borrower, Normal or Admin
  role), not only to a customer. The **Booked by** list in the stock dialog shows both.
- **A browse-only app for Borrower and Read-only roles.** They see the library, locations, categories
  and authors, but the Add, Import, Edit and Delete buttons, the stock editor, cover upload and the
  print queue are hidden. The Customers and Loans management pages are off limits too.
- **My loans.** A new page for members who can borrow, with a **Loans** tab for the books they have
  right now and a **Loan history** tab with everything they've ever borrowed.
- **Reading status is now personal.** Each member of a shared library has their own *Want to read*,
  *Currently reading* and *Read* shelves, and every role can use them. The Library filters, counters
  and Dashboard shelves show your own list. Existing statuses were handed to each library's admins
  on upgrade.
- **Loan history follows renames.** Loans now point at the customer or member instead of copying
  their name, so a rename shows up everywhere. Deleting a customer or an account deletes their loan
  history.
- **Stricter permissions.** Listing customers and everyone's loans, and lending or returning books
  through the Customers page, now require the Normal or Admin role — previously a Borrower could.
  Borrowers no longer receive other people's customer or loan details.
- The new screens are translated into all six languages.
- Groundwork for region-specific ISBN lookups (German DNB, Spanish BNE, Italian SBN) — not yet
  switched on in the app. The Docker image now includes the YAZ Z39.50 client these lookups use.

## v1.3.3 — 2026-10-05 {#v1-3-3}

- Added the `MAX_JSON_BODY_PARSE` and `MAX_URLENCODED_BODY_PARSE` settings so self-hosters can raise
  the maximum request size, fixing "Payload Too Large" errors on big requests.

## v1.3.2 — 2026-09-28 {#v1-3-2}

- Added **French** and **German** translations of the whole app, selectable alongside English,
  Spanish, Catalan and Italian.
- Added a `REGISTRATION_ENABLED` setting (on by default) to turn off sign-ups once everyone who needs
  an account has one.

## v1.3.1 — 2026-09-26 {#v1-3-1}

- **Security:** vault roles are now enforced by the server. Before, a Read-only member could still
  create, edit or delete things by calling the API directly, even though their role said otherwise.
- Fixed two-factor sign-in rejecting valid authenticator codes entered a few seconds late.

## v1.3.0 — 2026-09-26 {#v1-3-0}

**Library sharing.** The headline feature of this release: a library ("vault") can now be shared
between multiple accounts instead of belonging to a single person.

- Belong to multiple vaults and switch between them from the vault selector in the app bar.
- Invite others with a shareable link. Anyone who requests to join starts at the least-privileged
  (read-only) role, pending approval from someone who can manage members.
- Four roles per vault — **Read-only**, **Borrower**, **Normal**, **Admin** — control who can
  borrow books, edit the catalog, manage members, or manage the vault's settings.
- Manage members, roles, and pending join requests from **Settings → Vaults**.
- Deleting a vault is blocked if it's the only one you belong to. If it still has books,
  customers, or other content, you're offered to move everything into another of your vaults
  first, instead of having to empty it by hand.
- Books now show who added them.

## v1.2.4 — 2026-09-22 {#v1-2-4}

- Fixed an upgrade check that was missing for accounts still running a very old (pre-1.0)
  database, so their automatic schema upgrade no longer gets stuck.

## v1.2.3 — 2026-09-22 {#v1-2-3}

- Packaging release following v1.2.2's database fixes below — no additional user-facing changes.

## v1.2.2 — 2026-09-22 {#v1-2-2}

- Added support for connecting to the database over a local socket, alongside the existing
  host/port connection, and reorganized the related environment variables.
- Fixed a bug where a socket connection string could silently override the regular PostgreSQL
  connection string.
- Established a proper baseline database schema that every migration now builds on top of, and
  aligned the automated tests to run against real migrations instead of a full schema snapshot.
- Added an `ALLOW_HTTP` option for self-hosters who need to run over plain HTTP.
- Patched several findings from a security audit.

## v1.2.1 — 2026-09-15 {#v1-2-1}

- Fixed a Content-Security-Policy bug that could block some book cover images from loading, and
  added a way for self-hosters to allow extra image sources without waiting for a new release.

## v1.2.0 — 2026-09-14 {#v1-2-0}

- Internal server refactor (types → repositories → services → controllers → routes) and expanded
  API documentation. No user-facing changes, but this groundwork is what made v1.3.0's library
  sharing feature possible to build cleanly.

## v1.1.8 — 2026-09-13 {#v1-1-8}

- Added optional single sign-on (OIDC/SSO) login alongside the usual password login.
- Fixed an SSO configuration issue that could cause different people to be signed into the same
  account.
- Database schema upgrades are now applied automatically on startup — no manual migration step
  needed after updating.
- Goodreads imports now return immediately and fill in book covers in the background instead of
  making you wait.
- The running app version is now shown in the footer.
- Added Italian to the languages checked when looking up a book's synopsis and cover online.

## v1.1.7 — 2026-09-13 {#v1-1-7}

- New books can be given a default location automatically when added.
- Added a "Find cover" button to look up a cover for a book you've already added, without
  re-entering it.
- Added LibraryThing as a third cover-lookup source, after Google Books and Open Library.
- Replaced the barcode scanner with a more reliable one, fixing scans that used to fail
  intermittently.
- ISBN lookups now fall back to Open Library automatically when Google Books has no match.

## v1.1.6 — 2026-09-12 {#v1-1-6}

- Redesigned the book detail view for a cleaner look, including books with no cover image yet.
- Finished renaming the app from PaperBooks to Vaultisse throughout the interface.
- Added an import dialog supporting both Vaultisse's own CSV format and Goodreads exports,
  matching Goodreads "shelves" to your own locations.

## v1.1.5 — 2026-09-12 {#v1-1-5}

- Added a reading status to books — Want to read, Currently reading, Read — editable right from
  the book view.
- The Loans filter and dashboard card are now hidden automatically when Leasing is turned off.
- In public demo deployments, active sessions and login activity are now hidden.

## v1.1.4 — 2026-09-11 {#v1-1-4}

- Packaging release — no user-facing changes.

## v1.1.3 — 2026-09-11 {#v1-1-3}

- Added CSV import for books, supporting both a Goodreads export and Vaultisse's own CSV
  template.
- Removed the in-app help pages in favor of this documentation site.
- Login and registration now trim accidental leading/trailing spaces from your username and
  email.

## v1.1.2 — 2026-09-11 {#v1-1-2}

- Fixed the ebook PDF preview being blocked from loading in some setups.
- Fixed a book's description not refreshing right after editing it.
- Added a category filter and a "group by category" option to the library search page.

## v1.1.1 — 2026-09-05 {#v1-1-1}

- Fixed the add-book dialog forgetting its contents, the ebook-format field not updating, stock
  fields appearing even with Leasing turned off, and a dark-theme accent-color glitch.

## v1.1.0 — 2026-09-05 {#v1-1-0}

**Initial public release.** Everything below shipped under the name **PaperBooks** before this
release completed the rename to Vaultisse (and the move to vaultisse.com) — it's grouped here
since these were the first versions, tracked informally before formal release tags began.

**Cataloging**
- Add, edit, and browse your book collection, with cover images, categories, and authors.
- Add books by ISBN, with automatic title/author/cover lookup (Google Books, falling back to
  Open Library) or by scanning a barcode.
- Book stock: track individual physical copies of a book, each with its own barcode and status
  (available, booked, damaged).
- Print scannable barcode labels for your stock, with a print queue.

**Lending**
- Customers and customer groups.
- Assign a copy to a customer and mark it returned, with a full loan history.
- An optional **Leasing** toggle shows or hides the Customers and Loans pages, for collections
  that are just tracked and never lent out.

**Organization & overview**
- Locations (shelves, rooms, branches), including moving books between them.
- A dashboard with an overview chart, recent additions, and current loans.
- Library search with filters and grouping.

**Accounts & security**
- Registration and login, with an optional public-institution mode for schools and libraries
  handling minors' data.
- Two-factor authentication, active-session management, and a login/security activity log.
- Several rounds of security hardening from internal review (authentication, authorization, and
  session handling fixes).

**Other**
- Multi-language interface: English, Spanish, Catalan, and Italian.
- Multiple ebook file attachments per book (EPUB/PDF/MOBI), with in-app preview.
- Docker deployment with a versioned release pipeline, including a one-click Unraid template and
  optional reverse-proxy/Cloudflare Tunnel support.
