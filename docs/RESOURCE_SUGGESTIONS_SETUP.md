# Resource suggestion intake setup

The public form lives at `suggest.html`. Personal contact information must go only to a private Google Sheet and must never be copied into this repository or a public data snapshot.

## Current publication state

`suggest-config.js` intentionally contains an empty `endpoint`. In this state the page is fully visible, but online submission is disabled and the page explains that the private review sheet is being connected.

## Connect the private Google Sheet

1. Create a private Google Sheet owned by the SEE organization.
2. Create a standalone Google Apps Script project and paste in `integrations/google-apps-script/Code.gs`.
3. In Apps Script, open **Project Settings → Script properties** and add `SPREADSHEET_ID` with the private Sheet ID as its value. Do not put the ID or any credentials in this repository.
4. Deploy the script as a web app that executes as the owner. Choose the narrowest access setting that still permits the public form to submit.
5. Test the deployment URL directly with non-personal sample data.
6. Put only the HTTPS web-app deployment URL in `suggest-config.js` as `endpoint`.
7. Test English and Simplified Chinese submissions, required-field validation, duplicate protection, and the private Sheet rows before publishing.

## Editorial workflow

The Apps Script creates a `Resource Suggestions` tab with these workflow fields:

- `status`: begin with `new`, then use `researching`, `approved`, `duplicate`, or `not_selected`.
- `editor_notes`: private internal notes; never publish this column.
- `contact_email`: optional private contact information; never publish this column.

An approved suggestion is only an intake lead. It must still pass the C4 content pipeline, source verification, editorial approval, and public-data safety checks before it becomes a resource record.

## Production hardening

The template includes validation, a honeypot, duplicate throttling, formula-injection protection, and locked writes. Before promoting the form for high-volume use, add a managed CAPTCHA or place the endpoint behind a serverless gateway with origin checks and rate limiting.
