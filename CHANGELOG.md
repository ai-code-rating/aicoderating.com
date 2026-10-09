# Changelog

## 2026-10-08: Maintainer Expertise Starts From the Solo Case

Readers took position 1 to mean the developer's experience, since most projects with an `ACR.md` are solo projects where the developer and the maintainer are the same person. The explanations now start with the person responsible for the code ("in a solo project, that's you") and then give the team rule. The meaning, the name and every rating stay the same: position 1 still rates an approver (the least experienced person who can approve a change on their own, or the most experienced approval each change is guaranteed to get when it needs more than one), because that's the last person who could spot a problem.

- Home page: position 1's text in Reading a Rating starts with the solo case. The rating form's first question is now "How experienced is the person responsible for the code?", with a hint covering solo projects and both team rules (new `.q-hint` style), linked to the question with `aria-describedby` so screen readers announce it. The rule "Rate the People Who Merge" is now "Rate the People Responsible for the Code".
- Spec 0.1 (still a draft, edited in place, `date_updated` 2026-10-08): Position 1 opens with the person responsible for the code and the solo case, then the approver rule. The rule itself doesn't change.
- FAQ (`date_updated` 2026-10-08): "What Is AI Code Rating?", the "not a rating of every contributor" point and the self-assessment questions in "Why Rate the Maintainers at All?", and "Our Maintainers Have Different Levels of Experience" use the same framing. The team summary points to the rule for approvers with different levels, so it can't be read as "rate every approver".

## 2026-10-07: FAQ, Related Work and Spec Updates

- FAQ "Who Runs AI Code Rating?" now says Greg was building software for decades before AI coding tools, mentions DomainMOD (maintained by hand since 2010), and says up front that this site is rated `B4c`, with Claude Code writing nearly all of its code and drafting most of its text. The rating is read from `ACR.md`, so it stays in step.
- New FAQ "Does the Rating Say Anything About Copyright or Licensing?": no, it describes how the code was made and isn't legal advice.
- FAQ "Why Should I Publish a Rating?" now answers the worry that a high AI Share is a reason to stay quiet.
- DomainMOD is described without naming its language, in the FAQ and in Rated Projects.
- Related Work names Zig (bans AI contributions) and Ghostty (requires disclosure) as examples of AI contribution policies, with links.
- The rating form's intro says there's no sign-up and the form runs in the browser.
- The validator's "Checking..." message uses three dots instead of the single ellipsis character.
- The repo's history now starts from a single Initial Commit with `Co-Authored-By: Claude Code` and `Reviewed-By: Codex` trailers, so the history shows what `ACR.md` says. Every commit from now on carries the co-author trailer, and the review trailer when Codex reviewed it.
- `ACR.md` now says Codex reviews the code for bugs, and how commits are marked. Its "How AI Was Used" section is in the present tense, describing how the project works now, and so are the FAQ's "Who Runs AI Code Rating?" and this site's Rated Projects card. Its `updated` date is 2026-10-07.
- `CLAUDE.md` notes the commit trailers and the three-dots rule for ellipses.
- Spec 0.1 has one rating for the whole repository. Rating parts of a repository separately, such as AI-written docs or one package in a monorepo, is listed under Open Questions. The home page, FAQ, Examples and Related Work say to describe parts that were built differently in the text of `ACR.md`, and one of the home page's rules is now "Rate the Whole Project".
- The validator lists `rating`, `spec` and `updated` as the spec's fields; anything else gets a note that tools will ignore it.
- `package.json` links to the repository.
- The site, the Action and the organization profile each start from a single Initial Commit, and the Action from a fresh v1.0.0 release.

## 2026-10-06: Code Review Fixes

- The validator and the Action now accept only a real calendar date for `updated`, written as YYYY-MM-DD. Impossible dates such as `2026-02-31` used to roll over into March and pass; they now get their own error ("isn't a real date"). Timestamps are errors too, as the spec asks for a plain date. YAML is now read without its timestamp type, so dates are checked exactly as written.
- A date one day ahead no longer warns as "in the future", since the maintainer's local date can be ahead of UTC. The validator page and the rating form now use the visitor's local date instead of UTC's.
- Every page has a `<main>` landmark and a "Skip to content" link that appears on keyboard focus.
- Home page copy now agrees with the spec: position 1 explains the rule for changes that need more than one approval, and position 2 says single-line autocomplete doesn't count either.
- A rating with spaces around it, such as `" A2b"`, is now an error instead of being trimmed and passed, since the spec says the field holds just the three characters.
- The body check ignores HTML comments, and warns when the body has only headings or when a "How AI Was Used" section is empty. Before, a file from the rating form with the usage box left blank (which leaves a placeholder comment there) passed without a warning.
- `scripts/test-validator.cjs` has eight new samples (dates, spaces, heading-only body, placeholder, comment-only body). The Action got its own fixes and tests (see its changelog), synced with `scripts/sync-action.mjs`.

## 2026-10-06: Add My Project Issue Form

- New "Add my project" issue form for getting listed in Rated Projects. It asks for the project's name, repository, `ACR.md` link, rating and a one-sentence description, and has the maintainer confirm the file passes the validator.
- The "Your Project" card on the home page now links straight to the form, and the FAQ, `CONTRIBUTING.md` and the GitHub organization profile (a fifth Rate Your Project step) mention it.
- Published: the `rated project` label now exists on GitHub so the form's issues arrive labelled, and the site is deployed with the form links live.

## 2026-10-06: Rated Projects Order

- Email Health Check now comes before HomelabAPI in Rated Projects.

## 2026-10-06: Rated Projects Replace Made-Up Examples

- Removed the home page's "What Ratings Look Like" section of made-up projects. Real rated projects do the same job better, and `/examples/` already covers the full range of ratings with the reasoning behind each one.
- Rated Projects moved up into that place, between Reading a Rating and Get Your Rating, so visitors see real ratings right after learning to read one, and the rating form still leads straight into the `ACR.md` section. Its intro now links to `/examples/`.
- The `examples` entries in `levels.json` are no longer shown but are kept, so the Action's synced data doesn't change.
- `/examples/` has more space between examples (3.4em above each example heading instead of 2.2em).

## 2026-10-06: Rated Projects

- The home page has a new Rated Projects section, above the roadmap, listing projects that publish a rating. It starts with this site (`B4c`), DomainMOD (`B0a`), HomelabAPI (`B0a`) and Email Health Check (`B4c`). Each card shows the rating, linked to the project's `ACR.md` on GitHub, and the project's name, linked to its repo. A last "Your Project" card, with a dashed top border and `???` in place of a rating, links to the rating form and the issue form picker.
- The list comes from `src/_data/ratings.json`. This site's own entry reads its rating from `ACR.md`, so it never goes out of step with the footer badge.

## 2026-10-06: Centred Header Menu

- The header menu's cells are now centred, with their small field names (Scale, Rating, File and so on) in the monospace font, to match the strip above. Chosen from ten trial layouts.
- The brand cell has 50% more space on each side of the logo and title.

## 2026-10-06: Badge Formats and No Badge Service

- The rating form's README badge now comes in three formats: Markdown, HTML and reStructuredText, for projects whose README isn't Markdown. Each one links the badge to `ACR.md`, and the form remembers the format you picked.
- Dropped the planned badge service. Badges stay on shields.io, so nothing about a project's badge depends on this site. Instead, the GitHub Action warns when a README's badge shows a different rating from `ACR.md`. The FAQ mentions the new check.
- The home page roadmap now describes Tooling as the Action and the badge formats, and marks stage 3, Adoption, as the current stage.

## 2026-10-06: GitHub Action

- New GitHub Action ([ai-code-rating/action](https://github.com/ai-code-rating/action)) that checks `ACR.md` on every push and pull request. Errors fail the check, and warnings (such as a rating last checked over a year ago) show as notes on the file, with an option to fail on them too.
- The validator's checks moved into a shared file, `acr-check.js`, used by both the validator page and the Action, so they always agree. `scripts/sync-action.mjs` copies it, the levels and js-yaml into the Action's repo.
- The home page, FAQ and validator page link to the Action, and the rating form now says what to do with the file: save it in the repo root, check it with the validator, and add the Action.
- The home page roadmap now marks stage 2, Tooling, as the current stage.
- `CONTRIBUTING.md` says where to report problems with the Action.
- The GitHub organization profile lists the Action's repository and adds it as a fourth Rate Your Project step.

## 2026-10-06: Present-Tense Intro Sentence

- The intro sentence now says how much of a project's code "is written by AI" instead of "was written by AI". Changed on the home page, in the site description (meta and link preview tags), in the README and in the GitHub organization profile.

## 2026-10-05: Speed Fixes From a Lighthouse Audit

- Browsers now cache the site's files: fonts for a year, scripts and images for a day, while pages always check for a newer version. Repeat visits no longer download the fonts again.
- The badge images (footer and rating form) now have a fixed size, so the page doesn't shift when they load.

## 2026-10-05: Initial Release

- AI Code Rating spec 0.1 (draft): a three-character rating covering Maintainer Expertise (`A`–`E`), AI Share (`0`–`4`) and Oversight (`a`–`e`), published in an `ACR.md` file.
- Home page with the levels, a rating form that generates an `ACR.md` and a README badge, examples and usage rules.
- Versioned spec pages (`/spec/`, `/spec/0.1/`, `/spec/changelog/`), FAQ, Related Work and an in-browser `ACR.md` validator.
- The built site isn't committed; deployment-specific head tags (analytics) live in a gitignored include, not the source.
- This project's own rating: `ACR B4c`, published at `/ACR.md`.
- Spec licensed under CC BY 4.0; site code under MIT.
- Rating examples page (`/examples/`): thirteen common setups and the rating each gets, with the reasoning for every position. Linked from the home page and the FAQ.
- Feedback goes through GitHub Issues: linked from the footer, the FAQ, the Related Work page and the spec's open questions. Added CONTRIBUTING.md, a code of conduct (Contributor Covenant 3.0) and issue forms for spec suggestions, site problems and Related Work corrections.
- Validator: a valid rating now shows "Rating: B2b" in bold, with Maintainer, AI Share and Oversight each on their own indented, muted line below it instead of one dot-separated sentence, so the result is easier to scan.
- New header: a spec-sheet "data plate". A small strip at the top shows the spec version and links to the Changelog, Related Work and GitHub; below it, the site name and each section link sit in bordered cells, each link with a small label (Scale, Rating, File, Tool, Standard, Help). The current page is highlighted, and the frame is softer in dark mode.
- The site's example rating is now `A2b` (Expert, 26–50%, Reviewed) instead of `B2b`, which reads like the business term "B2B". Updated everywhere it appears, including the home page, spec example, validator sample, rating form defaults and link preview image. `B2b` stays only where the spec and FAQ use it to show why ratings need the `ACR` prefix.
- New home page headline: "Who Wrote the Code?" instead of "How Was the Code Made?". The link preview image is redrawn with it and also uploaded as the GitHub repo's social preview.
- `LICENSE` is now the plain MIT licence text. The extra note at the end (pointing to `LICENSE-SPEC`) stopped GitHub recognising it as MIT, so the repo showed "Other". The README's Licences section already says the spec is CC BY 4.0.
- The position numbers (1, 2, 3) on the home page level cards and rating form questions now sit in small filled circles.
- Dark mode is now the default for everyone. The footer toggle cycles Dark, Light and System, and a visitor's choice is still remembered. Visitors who already picked a setting keep it.
