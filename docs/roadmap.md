# Roadmap

## v0.1 — delivered

- Static React/TypeScript app, JSON/CSV imports and bounded validation.
- Local IndexedDB workspace, deletion, synthetic examples.
- Filter, UTC volume timeline, adjustable token-overlap comparisons.
- Provenance hashes and evidence metadata export; explicitly unreviewed findings.
- Contributor guidance, research boundaries, CI and Pages workflow.

## Next: robustness and review

- Browser end-to-end tests for import, persistence, deletion and export, plus accessibility audit.
- Worker-based pair analysis, candidate indexing, progress and cancellation; benchmark realistic permitted datasets before raising limits.
- Streaming / JSONL input and schema mapping; explicit rejected-row diagnostics and timestamp unit selection.
- Better deletion/retraction workflows and user-managed retention; migration checks for persisted schema versions.
- Human annotations, counter-evidence and documented alternative explanations; reproducible review state without publishing identifiable datasets.
- Spanish interface and multilingual tokenization evaluation.

## Later, only with evidence

- Optional DuckDB-WASM for larger local columnar datasets after Pages compatibility benchmarks.
- Optional local embedding models after quality, language bias and device-resource evaluation; no automatic remote upload.
- Domain and timing signals with baseline comparisons and false-positive calibration on synthetic/consented datasets.
- Independently hosted or local approved collector adapter, only after Reddit access approval and data lifecycle design. No unauthorized scraping fallback.
- Optional graph export to Gephi / batch adapter to Phantomatics; review licenses and method validity before integration.

No automatic bot verdicts, ideological scoring, account blacklists, de-anonymization, individual targeting or automatic moderation are planned. Claims of coordination require independent behavioral evidence and contextual human review; authenticity and sponsorship cannot be inferred from lexical similarity alone.
