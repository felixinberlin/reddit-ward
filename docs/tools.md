# Tool and hosting research

Checked 30 October 2026 against primary project sources and upstream license files. These are candidates/comparators, not bundled integrations. Open-source code is separate from dataset permissions and platform access. License metadata alone can be incomplete; CampaignLens's actual LICENSE resolves GitHub's NOASSERTION result.

| Tool | License / openness | Where it runs | Practical fit / access |
|---|---|---|---|
| [Gephi](https://github.com/gephi/gephi) | Open source; upstream describes dual CDDL 1.0 / GNU GPL v3 licensing; inspect component notices | Java desktop, no hosted server needed for local analysis | Export network data for deeper analysis later. The desktop app cannot run on Pages. |
| [OpenRefine](https://github.com/OpenRefine/OpenRefine) | BSD-3-Clause | Local Java process exposing a local browser UI, or managed server | Clean imports outside Ward; its UI being browser-based does not make it a static Pages app. Network enrichment is optional and changes privacy behavior. |
| [4CAT](https://github.com/digitalmethodsinitiative/4cat) | MPL-2.0 | Python/database/background workers, locally or server via Docker | Optional external analysis toolkit. Not Pages compatible. Source support varies; current README does not list Reddit as an actively supported direct collection source. Check source-specific permissions. |
| [PRAW](https://github.com/praw-dev/praw) | BSD-2-Clause for modern versions | Python locally or server | API wrapper, not access permission. Reddit approval and approved OAuth credentials are required. Keep credentials outside the browser. No PRAW collector implemented here. |
| [Phantomatics](https://github.com/jerzy99jerzy/phantomatics) | Apache-2.0 | Python analysis pipeline; local batch or independently hosted worker | Candidate for later multi-signal graph analysis from permitted snapshots; not a drop-in Pages library. No automated identity attribution. Independently validate methods before adopting. |
| [Arctic Shift](https://github.com/ArthurHeitmann/arctic_shift) | Public source and archive project; no top-level license found at review | Hosted archive/API; local processing of downloaded files; operating equivalent archive infrastructure needs storage and services | Do not assume public source is open-source licensed or that archive content can be redistributed. Review component licenses, data provenance, deletion expectations, rights and terms. No direct archive API integration or automatic recovery of removed content. |
| [CampaignLens](https://github.com/AmineYagoub/campaignlens) | [BSD-3-Clause LICENSE](https://github.com/AmineYagoub/campaignlens/blob/main/LICENSE) | Reddit-hosted Devvit moderator app | Comparator for explainable evidence. Requires subreddit installation/moderation context and applicable Devvit review; cannot be hosted as a Pages app or repurposed as general research access. |
| [F5Bot](https://f5bot.com/faq) | Hosted service with free and paid tiers; no open-source release established from official FAQ | Provider's infrastructure with an account/email alerts | Optional manual discovery service, not a self-hostable core dependency. Its permissions do not confer collection permission on Ward. |

## Reddit access

[Reddit's Responsible Builder Policy](https://support.reddithelp.com/hc/en-us/articles/42728983564564-Responsible-Builder-Policy) explicitly requires approval before API access, including research. The [developer FAQ](https://developers.reddit.com/docs/guides/faq) separates Reddit-hosted Devvit apps from external API clients such as PRAW; Devvit authentication is not an external API client credential. Review the current policy when implementing any collector; access, pricing and eligibility can change. This MVP imports user-provided permitted exports and makes no Reddit API or scraping requests.

## Static architecture sources

[GitHub Pages documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages) defines static HTML/CSS/JS hosting and notes visit logging. [Vite static deployment guide](https://vite.dev/guide/static-deploy.html#github-pages) documents Actions deployment. [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) is local browser storage. [DuckDB-WASM](https://duckdb.org/docs/stable/clients/wasm/overview) is an optional future local query engine, not necessary for this MVP.

## Ward dependency choices

React (MIT), Vite (MIT), TypeScript (Apache-2.0), Papa Parse (MIT), idb-keyval (Apache-2.0) and Vitest (MIT) permit an open-source stack with their respective notices and obligations. The lockfile pins resolved dependencies. GitHub hosting is an optional hosted service; self-hosting the same static build is possible. No third-party code from the comparison table is incorporated.
