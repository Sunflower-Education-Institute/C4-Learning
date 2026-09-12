# C4 Learning data flow

The website repository and private data workspace are separate siblings:

```text
C4-Learning-Data/raw
        ↓ preserve source
C4-Learning-Data/working
        ↓ clean and validate
C4-Learning-Data/approved/public-content
        ↓ explicit publication approval
C4-Learning/scripts/build-public-data.mjs
        ↓ generated public JavaScript
C4-Learning/data
        ↓ GitHub Pages
Public website
```

The current `data/resources.js` and `data/reviews.js` were copied from the meeting demo so the new folder works independently. They are a transition snapshot, not proof that every field is production-approved.

## Publication procedure

1. Copy source files into the dated `raw/` folder without editing them.
2. Work only on copies under `working/`.
3. Validate stable IDs, types, URLs, provenance, language fields, and duplicate relationships.
4. Record unresolved items in a validation report.
5. Obtain explicit approval for the exact JSON snapshot.
6. Place only the approved `resources.json` and `reviews.json` in `approved/public-content/`.
7. Run `node scripts/build-public-data.mjs ../C4-Learning-Data/approved/public-content` from this project.
8. Review the generated diff and test the website before committing.

Never run the publication step from `raw/`, `working/`, `exports/`, or `sensitive/`.
