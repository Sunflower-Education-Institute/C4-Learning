# C4 Learning

C4 Learning is the new standalone static website derived from the September 2026 meeting demo. It is intentionally separate from `sunflower-education-restored`, which is a legacy dynamic application retained only for reference.

## Open locally

Open `index.html` in a modern browser. The page reads only local files:

- `data/resources.js`
- `data/reviews.js`
- `assets/brand/`
- `assets/resources/`

The published website must not read files from `Meeting Demo`, `sunflower-education-restored`, or `C4-Learning-Data`.

## Data boundary

This repository may contain only content approved for public display. Raw spreadsheets, working CSV/JSON, validation output, database exports, and personal data belong in the sibling private folder `C4-Learning-Data`.

The current files in `data/` are a copied meeting-demo snapshot. They remain subject to editorial review before the site is treated as a production publication.

## Browser-only demo account

The sign-in, saved-resource, and comparison flows are front-end demonstrations. The prefilled account is fictional, and its signed-in and saved-resource state is stored only in the current browser's local storage. There is no authentication service or user database.

Resource cards link to `resource.html`, while official source links appear only on that internal detail page. Signed-in demo users can open `saved.html` to select two to four saved resources for comparison.

The detail-page AI summary is also a static demonstration rather than a live model call. `data/review-summaries.js` contains separately authored English and Simplified Chinese summaries for selected resources, records the number of published reviews used, and labels every entry as pre-generated demo content. Reviewer display names and badges live in `data/reviewers.js`.

See [docs/DATA_FLOW.md](docs/DATA_FLOW.md) and [docs/CONTENT_RULES.md](docs/CONTENT_RULES.md) before updating content.

## GitHub Pages

The site has no build step. When the repository is ready, GitHub Pages can publish from the repository root. A private repository does not make the published Pages site private; treat every deployed file as publicly downloadable.

Git initialization, remote configuration, and publication are deliberately not performed by this setup.
