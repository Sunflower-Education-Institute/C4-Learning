# Localization plan

The public site currently supports four interface locales:

- `en` — the default public language
- `zh-Hans` — Simplified Chinese, selected through the language control
- `es` — AI-assisted Spanish draft, pending human review
- `ar` — AI-assisted Arabic draft with right-to-left layout, pending human review

English pages must never fall back to Chinese editorial text. When an English long-form overview or review has not yet been approved, the English page shows an English pending message instead. Chinese pages may show approved Chinese editorial content and approved Chinese translations of English reviews.

Spanish and Arabic currently translate the public English interface, all 39 resource-card summaries, and the three English-language family reviews. English long-form overviews and most English review summaries are still awaiting editorial preparation, so the corresponding Spanish and Arabic sections display translated pending-review messages rather than importing the legacy Chinese text.

## Reviewing Spanish and Arabic

Review the drafts in this order:

1. Review interface strings and the 39 resource summaries in `data/localizations.js`.
2. Review family-review translations and compare them with the English originals.
3. Review every public page: library, resource detail, suggestion form, sign-in dialog, and saved-resource comparison.
4. For Arabic, test navigation, cards, disclosures, forms, numbers, and punctuation at desktop and mobile widths.
5. Replace draft translations in place after approval; do not overwrite English or Chinese source fields.

Machine-assisted translations require human editorial review before publication, especially resource claims, pricing, family reviews, and right-to-left layout.
