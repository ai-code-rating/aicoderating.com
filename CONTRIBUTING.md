# Contributing

Thanks for helping with AI Code Rating. The spec is a draft, so feedback now has the most influence on what version 1.0 looks like.

Everyone taking part is expected to follow the [code of conduct](CODE_OF_CONDUCT.md).

## Feedback and Questions

[Open an issue](https://github.com/ai-code-rating/aicoderating.com/issues/new/choose) for any of these. There's a short form for each kind, and a blank issue for anything else, such as questions:

- **Spec changes.** Something in the rating doesn't fit how real projects work, a level is unclear, or a situation isn't covered.
- **Unclear wording** anywhere on the site.
- **Site problems,** such as a broken page, the rating form, or the validator.
- **Problems with the GitHub Action** go to [its own issues](https://github.com/ai-code-rating/action/issues). If the Action and the validator disagree about a file, report it here, since they share the same checks.
- **Corrections to the Related Work page,** if we've described another standard inaccurately or missed one.
- **Adding your project** to [Rated Projects](https://aicoderating.com/#rated) on the home page, once its `ACR.md` passes the [validator](https://aicoderating.com/validate/).

## Suggesting a Spec Change

A suggestion is easiest to act on when it includes:

1. **The problem.** What a project can't express today, or where the current wording leads to the wrong rating.
2. **A real example.** The kind of project, how it uses AI, and the rating it gets now versus the rating it should get.
3. **A proposed change,** if you have one. Exact wording is welcome but not required.

Keep in mind the rating's main design goals: three characters, letters and digits only, five levels per position, and nothing in the file that projects have to keep updating beyond the rating itself and a short paragraph of context.

## Pull Requests

For anything larger than a typo, please open an issue first so we can agree on the change before you spend time on it.

```bash
npm install
npm run serve   # http://localhost:8080
```

- **The levels** (names, descriptions, examples) live in `src/_data/levels.json`. The home page, spec, rating form, and validator are all generated from it, so change them there.
- **Spec text** is in `src/content/spec/`. Released versions are never edited except for typos; changes go into the next version.
- **Don't commit `_website/`.** It's the build output and is ignored by git.
- **Check the validator** after changes that affect ratings: run `npm run build`, then `node scripts/test-validator.cjs`.
- **Keep the GitHub Action in step.** The checks in `src/assets/js/acr-check.js` are shared with the [GitHub Action](https://github.com/ai-code-rating/action). After changing them, `levels.json` or the spec version, run `node scripts/sync-action.mjs <path to the action repo>` and open a pull request there too.

### Writing Style

- Plain English, short sentences.
- Headings in headline case ("Reading a Rating", not "Reading a rating").
- Write ratings with the `ACR` prefix in text: "ACR A2b".
- Punctuation goes outside links.

## Licence

By contributing, you agree that your contributions to the spec are licensed under [CC BY 4.0](LICENSE-SPEC), and contributions to the site code under the [MIT licence](LICENSE).
