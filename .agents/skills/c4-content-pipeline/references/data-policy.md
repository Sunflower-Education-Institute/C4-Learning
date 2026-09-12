# C4 Learning data policy

## Locations

- `C4-Learning-Data/raw`: immutable source copies.
- `C4-Learning-Data/working`: transformations and editorial work.
- `C4-Learning-Data/approved/public-content`: exact snapshots approved for publication.
- `C4-Learning-Data/imports/database-ready`: validated future database imports.
- `C4-Learning-Data/exports`: database exports; never a publication source.
- `C4-Learning-Data/sensitive`: restricted personal or private content.
- `C4-Learning/data`: generated public website payload only.

## Required checks

- Compare checksums after copying raw sources.
- Reconcile record counts and stable IDs.
- Reject duplicate JSON keys and duplicate `sourceId` values.
- Validate reviews against an existing resource ID and rating range 1–5.
- Verify absolute HTTPS URLs where available.
- Require a source URL and verification date for price, trial, curriculum, accreditation, and availability claims.
- Confirm image rights before publication.
- Scan for emails, credentials, tokens, IP addresses, child details, and internal notes.

Approval applies to a specific snapshot and does not automatically apply to later edits.
