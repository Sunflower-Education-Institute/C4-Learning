---
name: c4-content-pipeline
description: Validate, prepare, or review C4 Learning resource content as it moves from the private data workspace to the static public website. Use for source-data inventory, cleaning, approval, JSON generation, website data updates, and pre-publication safety checks; do not use for unrelated visual design.
---

# C4 Content Pipeline

Preserve the boundary between the `C4-Learning` public website repository and the sibling `C4-Learning-Data` private workspace. Read [references/data-policy.md](references/data-policy.md) before handling source or working data.

## Workflow

1. Identify the source, owner, date, sensitivity, record count, and checksum.
2. Never edit files under `C4-Learning-Data/raw`; create a dated working copy.
3. Validate stable IDs, duplicates, field types, URLs, language separation, provenance, and mutable-fact verification dates.
4. Write unresolved findings under `C4-Learning-Data/reports/validation`.
5. Do not promote data from `working` to `approved` without explicit user approval for that exact snapshot.
6. Publish only from `approved/public-content` with `scripts/build-public-data.mjs`.
7. Inspect the generated diff and test the static site. Reject any reference to sibling directories or private fields.

## Safety invariants

- Never put raw spreadsheets, CSV review files, exports, credentials, personal data, child data, IP addresses, private reviews, or unapproved assets in `C4-Learning`.
- Treat all GitHub Pages files as publicly downloadable even when the repository is private.
- Keep `sourceId` immutable and unique.
- Keep `en` and `zh-Hans` content separate.
- Do not invent unknown content or present `needsReview` data as verified.
- Copy rather than move source files until verification and user approval permit archival.

When asked only to audit, report findings without changing or publishing data.
