# vaultisse-docs

End-user documentation for [Vaultisse](https://vaultisse.com) — the open-source book
collection manager. Published at **[docs.vaultisse.com](https://docs.vaultisse.com)**,
built with [VitePress](https://vitepress.dev).

Available in English, Spanish, Catalan, and Italian.

## Project structure

```
docs/
├── .vitepress/
│   └── config.ts        # nav, sidebar, search, sitemap, per-locale settings
├── public/               # favicon, CNAME
├── index.md              # English home page
├── getting-started.md    # English sections (default locale, served at /)
├── ...
├── es/                    # Spanish sections, served at /es/
├── ca/                    # Catalan sections, served at /ca/
└── it/                    # Italian sections, served at /it/
```

Each section lives once per locale as a same-named file (e.g. `docs/adding-books.md` and
`docs/es/adding-books.md`), so cross-references between pages stay consistent across
languages.

## Prerequisites

- Node.js 20+

## Development

```sh
npm install
npm run docs:dev
```

## Build

```sh
npm run docs:build
npm run docs:preview
```

## Adding or editing a page

1. Add/edit the Markdown file under `docs/` (and its counterpart in `es/`, `ca/`, `it/`
   if translating).
2. Register the page in the relevant locale's `sidebar` entry (and `nav`, if it should be
   reachable from the top bar) in `docs/.vitepress/config.ts`.
3. Link to other pages with relative paths (e.g. `[Adding books](./adding-books)`) so
   links resolve correctly within each locale.

## Deployment

Pushes to `main` build the site and publish it to GitHub Pages automatically via
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). In the repo settings,
under **Pages**, set the source to **GitHub Actions**.

The custom domain is configured via `docs/public/CNAME`; a matching `CNAME` DNS record
must point `docs.vaultisse.com` at `<username>.github.io`.

## License

MIT, same as the [main Vaultisse app](https://github.com/AlbertAmat/vaultisse).
