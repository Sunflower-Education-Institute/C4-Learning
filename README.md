# C4 Learning

C4 Learning is the standalone public learning-resource website for The Sunflower Education Institute. It is intentionally separate from `sunflower-education-restored`, which is a legacy dynamic application retained only for reference.

## Open locally

Open `index.html` in a modern browser. The page reads only local files:

- `data/resources.js`
- `data/reviews.js`
- `assets/brand/`
- `assets/resources/`

The published website must not read files from `Meeting Demo`, `sunflower-education-restored`, or `C4-Learning-Data`.

## Data boundary

This repository may contain only content approved for public display. Raw spreadsheets, working CSV/JSON, validation output, database exports, and personal data belong in the sibling private folder `C4-Learning-Data`.

The current files in `data/` are generated only from an explicitly approved public-content snapshot. Content changes must follow the C4 content pipeline before publication.

## Browser-local guest account

The prefilled guest account stores its signed-in and saved-resource state only in the current browser's local storage. It is not an authentication service or user database.

Resource cards link to `resource.html`, while official source links appear only on that internal detail page. Signed-in guests can open `saved.html` to select two to four saved resources for comparison.

The detail-page AI summary is pre-generated rather than a live model call. `data/review-summaries.js` contains separately authored English and Simplified Chinese summaries for selected resources and records the number of published reviews used. Reviewer display names and badges live in `data/reviewers.js`.

## Resource suggestions

`suggest.html` contains the bilingual public intake form. Its submission endpoint remains disabled until a private Google Sheet and the Apps Script template under `integrations/google-apps-script/` are deployed. See [docs/RESOURCE_SUGGESTIONS_SETUP.md](docs/RESOURCE_SUGGESTIONS_SETUP.md) for the privacy boundary and connection steps.

See [docs/DATA_FLOW.md](docs/DATA_FLOW.md) and [docs/CONTENT_RULES.md](docs/CONTENT_RULES.md) before updating content.

## GitHub Pages

The site has no application build step and GitHub Pages publishes from the repository root. A private repository does not make the published Pages site private; treat every deployed file as publicly downloadable.
