# Localization plan

The public site currently supports four interface locales:

- `en` — the default public language
- `zh-Hans` — Simplified Chinese, selected through the language control
- `es` — AI-assisted Spanish draft, pending human review
- `ar` — AI-assisted Arabic draft with right-to-left layout, pending human review

English and Chinese resource pages now include the complete long-form overview, every published review, and an AI-assisted summary for all 39 resources. Chinese long-form overviews retain the original Chinese editorial copy. English long-form overviews and Chinese-origin reviews are machine-assisted translations pending human review. Each translated review includes a control for switching between the site-language translation and the original text.

Spanish and Arabic currently translate the public interface, all 39 resource-card summaries, and the three English-language family reviews. Their long-form overviews and AI-assisted summaries are intentionally deferred, so those sections display translated pending-review messages rather than importing Chinese or English drafts.

## Reviewing Spanish and Arabic

Review the drafts in this order:

1. Review interface strings and the 39 resource summaries in `data/localizations.js`.
2. Review family-review translations and compare them with the English originals.
3. Review every public page: library, resource detail, suggestion form, sign-in dialog, and saved-resource comparison.
4. For Arabic, test navigation, cards, disclosures, forms, numbers, and punctuation at desktop and mobile widths.
5. Replace draft translations in place after approval; do not overwrite English or Chinese source fields.

Machine-assisted translations require human editorial review before publication, especially resource claims, pricing, family reviews, and right-to-left layout.
