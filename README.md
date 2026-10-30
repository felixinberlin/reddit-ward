# Reddit Ward

**Follow the message. Keep the evidence in view.** A privacy-first, open-source workspace for researching public Reddit narratives and repeated messaging.

[Open the app](https://felixinberlin.github.io/reddit-ward/) · [Architecture](docs/architecture.md) · [Tool research](docs/tools.md) · [Roadmap](docs/roadmap.md) · [Contribute](CONTRIBUTING.md)

An independent Amélie Lab idea, kept in a separate repository from [Amélie](https://github.com/felixinberlin/Amelie) and [Amélie AI-Lab](https://github.com/felixinberlin/Amlelie-Lab). No integration, inherited data, or changes to those repositories. The Amélie idea is a gift; this implementation uses **AGPL-3.0-only**, a deliberate copyleft choice rather than the parent project's CC0 convention. Third-party licenses remain their own.

## What works now

- Import local JSON arrays, Reddit Listing JSON (including arrays of listings), or header-based CSV. Replace one workspace at a time.
- Filter by text/community; inspect a UTC daily timeline and ranked pairs of repeated language.
- Adjust token Jaccard overlap threshold. Scores measure shared vocabulary, not semantic similarity, truth, intent, political ideology, or probability of coordination.
- Preserve original-file SHA-256, filename, import time, acquisition note, source row, record ID and safe Reddit permalink. Export analysis metadata for reproducibility.
- Save normalized records to IndexedDB in this browser, with explicit deletion. No author fields are retained, though text and permalinks can identify people.
- Try synthetic JSON or CSV in `public/samples/`. All records and communities are fictional; synthetic repetition deliberately includes ordinary civic agreement.

**This is a research MVP, not a coordinated-behavior detector.** Repeated words and timing are leads for human review. Shared reporting, quotations, memes and legitimate organizing can create the same patterns. There is no ideological blacklist, account ranking, automated attribution, or moderation action.

## ¿Qué es? / Español

Reddit Ward es una herramienta abierta para investigar narrativas públicas, mensajes repetidos y posibles señales que merecen revisión humana. Importa archivos JSON/CSV y analiza los datos en tu navegador. No sube los archivos ni guarda nombres de autor como campos separados; los textos y enlaces aún pueden identificar personas. Los ejemplos son sintéticos. La similitud no demuestra coordinación, intención ni falsedad. Las opiniones políticas no son prueba de comportamiento inauténtico.

La aplicación funciona en GitHub Pages sin servidor propio. Recopilar datos nuevos requiere una herramienta externa autorizada y, para la API de Reddit, aprobación explícita. No incluye scraping, seguimiento de personas ni publicación automática de acusaciones.

## Run locally

Node.js 22 recommended.

```sh
npm ci
npm run dev
npm test
npm run build
npm run preview
```

Visit the local URL printed by Vite. GitHub Actions tests, builds and deploys `dist/` to Pages on pushes to `main`; pull requests only validate. Enable Pages with source **GitHub Actions** in repository settings if hosting a fork.

## Import contract

CSV must have a header. JSON supports flat objects in an array and Reddit Listings; arbitrary nested schemas and JSONL are not supported.

| Field | Accepted values |
|---|---|
| Text | `text`, `body`, or `selftext`; optional `title` is prepended |
| Time | `created_utc` (Unix seconds), or ISO date in `date` / `created_at`; UTC strongly recommended |
| ID | `name` or `id`; otherwise generated from source row |
| Community | `subreddit`; defaults to `unknown` |
| Source link | optional `permalink`; relative Reddit paths or HTTPS reddit.com/www/old URLs only |

5 MB and 2,000 input records maximum. Blank/deleted/removed text, invalid dates and duplicate IDs are skipped and counted. Text is capped at 20,000 characters. Keep the original file: normalized storage omits fields and report exports contain metadata, not the original text. A file hash provides identity, not authenticity. Duplicate IDs keep the first item. Source rows for JSON mean flattened record positions.

## What needs a server?

**No application server:** UI, local imports, IndexedDB, simple text analysis and charts. This application code and its runtime dependencies are open source. GitHub Pages itself is a hosted service, not part of the self-hostable code; the build can be served by any static host.

**Optional external process:** approved collection, scheduled jobs, long-running analysis, large archives, shared multi-user workspaces, or remote models. A local Python process may suffice; a continuously running service requires independent hosting. Never put API credentials in Vite variables, browser bundles, repository files or Pages. No collector is implemented. See [the researched tool matrix](docs/tools.md).

## Privacy and responsible research

No analytics, external fonts, remote model calls, account login, uploads or Reddit fetching in the app. The only app fetch loads the bundled synthetic sample. GitHub may log visits; opening evidence links contacts Reddit. IndexedDB is unencrypted and accessible to this site's code and people using the browser profile. Clear local data after research; downloaded files remain your responsibility. This is local-first privacy, not anonymity or a secure evidence vault.

Import only data you are permitted to process. Public accessibility is not permission to collect, redistribute, or retain indefinitely. Respect removals, retention requirements, platform terms and applicable law. Do not commit real research imports or identifiable accusations to issues. Open-source code licenses do not license Reddit content. See [research practice](docs/research-practice.md).

## License

Copyright © 2026 Félix Martínez and contributors. Code and project documentation: [AGPL-3.0-only](LICENSE). Synthetic fixtures are original project content under the same license. Dependencies retain their own notices; `package-lock.json` fixes the build graph. No third-party tool source or Reddit content is bundled. For distribution, preserve license notices and review obligations for your particular modifications and deployment.
