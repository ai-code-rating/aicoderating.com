# AI Code Rating

Website and draft spec for AI Code Rating (ACR): a three-character rating, published in an `ACR.md` file at the root of a repo, that tells readers who maintains a project, how much of its code is written by AI, and how closely a human checks the AI's work.

| Position | Measures | Values |
|---|---|---|
| 1 | Maintainer Expertise | `A` (expert) – `E` (non-programmer) |
| 2 | AI Share | `0` (none), then `1`–`4` in quarters (`4` = 76–100%) |
| 3 | Oversight of AI code | `a` (verified) – `e` (unchecked); `a` when there is no AI code |

Example: `A2b` means an expert maintainer, 26–50% of the code written by AI, every AI change reviewed before merge.

## Pages

- `/` — the levels, rating form and rated projects
- `/spec/` — the latest spec; every version also lives at `/spec/<version>/`, listed at `/spec/changelog/`
- `/faq/` — common questions
- `/examples/` — rating examples: common setups and the rating each one gets
- `/related-work/` — how AI Code Rating compares with other AI disclosure standards
- `/validate/` — checks an `ACR.md` file in the browser

The same checks run in CI through the [GitHub Action](https://github.com/ai-code-rating/action). They live in `src/assets/js/acr-check.js`, which the validator page uses and `scripts/sync-action.mjs` copies into the Action's repo.

## Contributing

Feedback and suggestions are welcome. [Open an issue](https://github.com/ai-code-rating/aicoderating.com/issues/new/choose), or see [CONTRIBUTING.md](CONTRIBUTING.md) for how to suggest spec changes and send pull requests. Everyone taking part is expected to follow the [code of conduct](CODE_OF_CONDUCT.md).

## Licences

The specification is licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) (see `LICENSE-SPEC`). The site code is licensed under MIT (see `LICENSE`).

## Development

```bash
npm install
npm run serve   # http://localhost:8080
npm run build   # outputs to _website/
```

The built site in `_website/` isn't committed.

The levels live in `src/_data/levels.json`; the home page, spec page and calculator are all generated from it.
