# vaultisse-docs

End-user documentation for [Vaultisse](https://vaultisse.com), published at
[docs.vaultisse.com](https://docs.vaultisse.com) with [VitePress](https://vitepress.dev).

Available in English, Spanish, Catalan, and Italian (`docs/`, `docs/es/`, `docs/ca/`, `docs/it/`).

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

## Deployment

Pushes to `main` build the site and publish it to GitHub Pages automatically via
`.github/workflows/deploy.yml`. In the repo settings, under **Pages**, set the source to
**GitHub Actions**.
