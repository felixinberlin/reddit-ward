# Initial release validation

30 October 2026:

- Six Vitest tests passed: nested Reddit listings and author minimization; quoted multiline CSV, duplicate IDs and invalid dates; safe permalink handling; short-token exclusions; positive/negative matching; malformed/empty/oversized record sets.
- TypeScript check and Vite production build passed.
- npm audit: zero reported vulnerabilities across installed dependencies at validation time.
- Chromium headless production-preview checks passed: synthetic JSON loading, actual CSV file input, persistence after reload, search filtering, evidence download with SHA-256 and pairs, deletion surviving reload, and a 390 px viewport without horizontal overflow.
- No browser page errors or external requests during those checks. A real source-link click was not part of the test and would contact Reddit.
- Desktop and mobile screenshots inspected during development; no claim of a full accessibility audit or Firefox/Safari validation.

The browser checks were executed with an external local test harness, not included in CI. CI runs the committed unit tests and build. Full cross-browser end-to-end coverage remains in the roadmap.
