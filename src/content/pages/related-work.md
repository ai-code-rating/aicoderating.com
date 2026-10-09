---
page_title: Related Work
page_description: How AI Code Rating compares with other AI disclosure standards, AI contribution policies, and AI instruction files.
permalink: /related-work/
date_updated: 2026-10-09
---
AI Code Rating isn't the first attempt to standardize how projects disclose AI use, and it shouldn't pretend to be. This page lists the other efforts we know of, what each one does well, and where AI Code Rating takes a different approach. If we've described a project unfairly or missed one, please [send a correction on GitHub]({{ meta.url_issue_related }}).

## What Makes AI Code Rating Different

Most disclosure standards describe AI involvement with a single level, such as "none", "assisted", or "generated". A single level has to fold several questions into one answer. AI Code Rating keeps three of them apart:

- **Who checks the code.** Maintainer Expertise rates the people who approve and merge changes. As far as we know, no other standard records this, yet it shapes how far readers can trust everything else. The same AI-written code means something different when an expert reviews it than when nobody on the project can read it.
- **How much AI wrote.** AI Share is only a quantity. It says nothing about quality on its own.
- **How carefully it was checked.** Oversight records review and testing separately, so a project where AI wrote most of the code can still show that every change was read.

All three fit in a short code, such as `A2b`, that works in a badge, a README, or a search.

## Other Disclosure Standards

| Standard | File | How it describes AI use |
|---|---|---|
| [AI-DECLARATION.md](https://ai-declaration.md/) | `AI-DECLARATION.md` | One of six levels, from `none` to `auto`, with optional detail per development phase. |
| [Quillx](https://github.com/qainsights/quillx) | Spec documents | Five tiers named after kinds of writing, from Verse (human-written) to Lorem Ipsum (shipped without review). |
| [AI Disclosure](https://github.com/ggfevans/ai-disclosure) | `AI_DISCLOSURE.md` | One of four levels, plus tags on individual source files. |
| [AI Attestation](https://github.com/korext/ai-attestation) | `.ai-attestation.yaml` | The AI tools used and the share of commits they were involved in, detected from git history. |
| [AI Contribution Level](https://github.com/Essk/ai-contribution-level) | Badge | A single level for how AI was used: None, Research Only, Autocomplete, Interactive, or One Shot. |

### AI-DECLARATION.md

The most complete of the alternatives. Its six levels describe how closely a person and AI worked together, from AI giving occasional hints to AI working on its own, and a project can declare a level for each phase of development, such as design, testing, or deployment. It has badges, tooling, and documentation in several languages. Where AI-DECLARATION.md goes deeper on how AI took part in each phase, AI Code Rating separates the amount of AI code from how it was checked, and adds who checked it.

### Quillx

Describes authorship with tiers named after kinds of writing. Each tier combines how much AI wrote with how much a person reviewed. "Ghostwritten" means AI wrote it and a person reviewed it, for example. AI Code Rating records those two things as separate positions, so a project with a lot of AI code and careful review doesn't share a tier with one that has less of both.

### AI Disclosure

Builds on existing vocabularies (the W3C AI Content Disclosure terms and SPDX-style tags) and can mark AI involvement down to individual files. It states plainly that its levels aren't a quality signal, which AI Code Rating agrees with for AI Share. AI Code Rating rates the project as a whole rather than file by file.

### AI Attestation

Measures rather than declares: it detects AI tools from commit trailers and other signals and reports the share of AI-assisted commits. That approach could help with one of AI Code Rating's open questions, how to estimate AI Share consistently.

## AI Contribution Policies

Many projects now publish a policy on AI-assisted contributions. Some ban them, as [Zig](https://ziglang.org/code-of-conduct/#strict-no-llm-no-ai-policy) does, some require contributors to disclose AI use, as [Ghostty](https://github.com/ghostty-org/ghostty/blob/main/AI_POLICY.md) does, and proposals such as [ai-contribution-policy.yml](https://github.com/dapper-agent/oss-ai-contribution-policy) make those policies machine-readable. A policy says what contributors may do. AI Code Rating says how the code that's already in the project was made. A project can have both, and a disclosure requirement in the pull request template makes the rating easier to keep accurate.

## AI Instruction Files

Files such as `AGENTS.md`, `CLAUDE.md` and `.cursorrules` give instructions to AI coding tools. They often show that a project uses AI, but they're written for the tools, not for people deciding whether to trust the code. `{{ meta.file_name }}` is written for those people.

## Working Together

These efforts share a goal: making AI use visible instead of something readers have to guess. A project can publish more than one disclosure file if it wants to. If you maintain one of these standards and see a way to map between them, we'd like to hear from you: [open an issue on GitHub]({{ meta.url_issue_new }}).
