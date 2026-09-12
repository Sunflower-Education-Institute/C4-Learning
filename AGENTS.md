# C4 Learning project instructions

Use `.agents/skills/c4-content-pipeline/SKILL.md` for content updates, data preparation, repository review, or publication checks.

This is a static public website. Its runtime files must be independently runnable and must not reference sibling workspace directories. Build tools may receive an approved data location as an explicit command-line argument, but must not hardcode local workspace paths. Only approved public data may enter `data/` or `assets/resources/`.

Never copy raw spreadsheets, working files, database exports, credentials, user records, child information, private reviews, IP addresses, or unapproved images into this project. Do not publish or configure a Git remote without explicit user authorization.

Preserve stable `sourceId` values. Keep English and Simplified Chinese content separate and use BCP 47 identifiers (`en`, `zh-Hans`). Mutable facts require a source URL and verification date; leave unknown values unknown.
