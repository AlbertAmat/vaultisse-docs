# Releases

Everything that's shipped in Vaultisse, newest first. Vaultisse started life as **PaperBooks**;
the rename happened during the [v1.1.0](#v1-1-0) release, and this page uses the current name
throughout, even for changes that shipped before it.

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
