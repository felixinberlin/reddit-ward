# Contributing

Issues and pull requests are welcome in English or Spanish. Start with the README and docs. Small fixes can go straight to a PR; discuss new data collection, scoring or external services before implementing them.

1. Fork and create a branch. Use Node 22 and `npm ci`.
2. Make a focused change and explain the user-visible behavior.
3. For analytical or import changes, test meaningful failure modes, false positives and provenance preservation with synthetic fixtures.
4. Run `npm test` and `npm run build`; manually inspect relevant UI behavior.
5. Open a PR describing the change, checks and remaining limitations. Contributions are licensed under AGPL-3.0-only; retain third-party notices.

Never attach real user datasets, credentials, unredacted screenshots, named-account accusations or personal information to public issues. Use synthetic reproductions. Avoid viewpoint-based labels. Discuss concrete observable behavior, data coverage and alternative explanations.

Good first contributions: accessible keyboard and screen-reader improvements, browser lifecycle tests, parser diagnostics, Spanish UI, and worker-based performance work. Do not add telemetry, remote embeddings, collectors, account profiles or automated decisions without design review. Maintainer: @felixinberlin. Review is volunteer-based; no response-time promise.
