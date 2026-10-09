---
page_title: FAQ
page_description: Answers to common questions about AI Code Rating and the ACR.md file.
permalink: /faq/
date_updated: 2026-10-08
---
Answers to the questions people ask most about AI Code Rating. The [spec]({{ meta.url_spec }}) is the final word wherever the two differ.

## About the Rating

### What Is AI Code Rating?

A three-character rating, such as `A2b`, that a project publishes in an `{{ meta.file_name }}` file at the root of its repository. It tells readers how experienced the person responsible for the code is (Maintainer Expertise), how much of the code AI wrote (AI Share), and how carefully a person checked that AI-written code (Oversight).

### Does a Higher AI Share Mean a Worse Project?

No. AI Share describes how the code was made, not how good it is. An `A3a` project, where an expert wrote most of the code with AI and checked every change, can be stronger than a `C1e` project with little AI code that nobody checked. Maintainer Expertise and Oversight are the positions that tell readers how much to trust the code.

### Why Rate the Maintainers at All?

Because the same AI-written code means different things in different hands. When an expert directs AI and reviews its work, they can catch subtle mistakes. When nobody on the project can read the code, nobody can. Readers need to know which situation they're in, and AI Share and Oversight alone can't tell them: Oversight says whether AI code was checked, and Maintainer Expertise says how well the people checking it could judge it.

A few things it isn't:

- **It's not a rating of every contributor.** It describes the person responsible for the code. In a solo project, that's you. On a team, it's whoever approves changes before they're merged, because they decide what ships. If your approvers have different levels of experience, see below for which one to rate.
- **It's not a judgement of anyone's worth.** It's about experience with this project's language and domain. An expert in one field can honestly be a `C` in another.
- **It's not a ranking of projects.** An `E` project can be useful, popular and well loved. The rating tells people what they're getting, so they can decide how to use it.

The level is self-assessed against two practical questions: could the person you're rating have written the code without AI, and can they explain every line?

### How Is This Different From Other AI Disclosure Standards?

Most of them describe AI involvement with a single level. AI Code Rating keeps three things apart: who checks the code, how much of it was written by AI, and how carefully it was checked. The [Related Work]({{ meta.url_related }}) page compares it with AI-DECLARATION.md, Quillx and others.

### Why Should I Publish a Rating?

People who use or contribute to your project increasingly want to know how AI was involved, and right now they have to guess. A rating answers the question up front, in a format they can compare across projects. It also shows that you're comfortable being open about how you work.

A high AI Share can look like a reason to stay quiet, but readers who can't tell will often assume the worst anyway. A rating lets you show what usually matters more to them: who checks the code and how carefully.

### Can't People Just Give Themselves a Good Rating?

Yes. Ratings are self-reported, and nothing stops a project from inflating one. But an inflated rating is easy to contradict: a project's commit history, pull requests and issue tracker show how it really works, and a rating that doesn't match them costs the project trust. An honest `D4c` tells readers more than a doubtful `B4b`. How the community could dispute a rating is an open question in the spec.

## Choosing Your Rating

The [rating examples]({{ meta.url_examples }}) show common setups and the rating each one gets, with the reasoning for every position.

### Does Using AI for Planning, Research or Code Review Count?

Not toward AI Share. AI Share counts only code that AI wrote and that is in the project today. A project where AI helped plan or review the work, but wrote none of the code, is `0` with Oversight `a`. Mention that kind of use in the text of your `{{ meta.file_name }}`. Whether the rating itself should show it is an open question in the spec.

### What Counts as Code?

Everything a computer reads or runs: source code, tests, styles, scripts, build and CI configuration, infrastructure as code, and database schemas and queries. Prose documentation, such as a README or a docs site, doesn't count. If AI wrote much of your documentation, say so in the text of your `{{ meta.file_name }}`.

### What About Autocomplete?

Single-word or single-line completions don't count. Multi-line suggestions you accepted do, even if you edited them afterwards.

### What About Dependencies, Vendored Code and Generated Files?

Leave out code your project doesn't maintain, such as dependencies and vendored libraries. Also leave out files produced by non-AI tools, such as lockfiles, compiled output and code from code generators. Files that AI generated do count.

### How Do I Estimate AI Share?

Most projects can only estimate it, which is why the bands are a quarter wide. Some ways to get a number:

- Count commits with AI co-author trailers, such as `Co-Authored-By: Claude`, against all commits, or better, the lines those commits changed.
- Go through the main parts of the project and estimate each one, then combine them by size.
- If you use an AI agent for whole features, list those features and compare them with the rest.

Pick the band your estimate falls in and say in the file how you estimated.

### Our Maintainers Have Different Levels of Experience. Which Do We Use?

Position 1 rates the person responsible for the code, which on a team means whoever approves changes. Use the level of the least experienced person who can approve a change for merging on their own, because that person's judgement can be the last check on what ships. If every change needs more than one approval, use the most experienced approver each change is guaranteed to get. For example, if every change needs sign-off from a senior maintainer, rate that maintainer.

### What If AI Tools Merge Changes Without a Person Approving Them?

Rate the person responsible for the project in position 1. Position 3 can be no better than `d` (Tested Only), because nobody reads those changes before they're merged. Say in the file which changes AI can merge on its own.

### We Have Thorough Tests but Don't Read AI Changes. Which Level?

`d` (Tested Only). Oversight measures whether people read AI-written code, so testing alone can't go higher, however thorough it is. Describe your test suite in the file: readers will want to know about it, and good tests can catch problems that a quick read would miss.

### Does AI Code Review Count as Oversight?

No. Oversight measures checking done by people. AI review can still catch real problems, so say in the file if you use it, but it doesn't raise the Oversight level.

### Parts of the Project Were Built Differently. What Then?

Rate the project as a whole, and say in the text of your `{{ meta.file_name }}` which parts were built differently and how. Whether a file should be able to rate parts separately is an open question in the spec.

### Our Practice Changed Over Time. Which Period Do We Rate?

Rate the code as it is today. If older code was written by hand and recent code mostly by AI, AI Share reflects the mix that's in the project now. Say in the file when and how your practice changed.

### What If I Don't Know Whether Contributors Used AI?

Estimate from what you do know. When you're unsure between two AI Share bands, pick the higher one, and say in the file what you don't know. Many projects now ask contributors to disclose AI use in their pull request template, which makes the next rating easier.

### How Often Should I Update the Rating?

Whenever the way you work changes, and at least once for each major release. Change the `updated` date whenever you check the rating, even if the rating stays the same, so readers know it's current.

### What About Forks and Monorepos?

A fork rates the code as its own maintainers maintain it. If the fork is mostly unchanged upstream code, say so in the file and link to the upstream project's rating. A monorepo publishes one rating at its root for the whole repository, and can say in the file which packages were built differently.

## The File

### Why a Separate ACR.md and Not AGENTS.md or CLAUDE.md?

Those files give instructions to AI tools. `{{ meta.file_name }}` tells people how AI was used. Keeping them separate means each file has one audience, and tools can find the rating without reading instructions meant for an AI.

### How Should I Write a Rating in Text?

With the `ACR` prefix, as in "ACR A2b". On their own, three-character codes are hard to search for, and some match common terms, such as `B2b` and "B2B". The prefix makes a rating easy to recognize and find. In the `rating` field of `{{ meta.file_name }}`, write just the three characters.

### Where Does the File Go?

In the root of the repository, named exactly `{{ meta.file_name }}`.

### Why Are Ratings Only Letters and Digits?

So a rating works anywhere without escaping: in URLs, badge services, file names, commit messages and search.

### How Can I Check My File?

Paste it into the [validator]({{ meta.url_validator }}). It checks the front matter against the spec and explains anything that's wrong. To check it automatically on every push and pull request, add the [GitHub Action]({{ meta.url_action }}). It runs the same checks, and also warns if the badge in your README shows a different rating from the file.

### What Happens to My Rating When the Spec Changes?

Nothing, until you change it. Your file names the spec version it follows, and every version keeps a permanent page, so readers can always look up what your rating meant. The [changelog]({{ meta.url_spec_changelog }}) lists what changed in each version.

## The Project

### Who Runs AI Code Rating?

It was started by Greg Chetcuti as a proposal. The AI Code Rating spec is still a draft, and its development happens in the open on [GitHub]({{ meta.url_repo }}).

Greg was building software for decades before AI coding tools came along, and has maintained [DomainMOD](https://github.com/domainmod/domainmod), an open source app, by hand since 2010. This site was built differently. It's rated `{{ own_rating.rating }}`: Claude Code writes nearly all of its code and drafts most of its text, directed by Greg. Its [`{{ meta.file_name }}`](/{{ meta.file_name }}) says how.

### How Can I Suggest a Change or Give Feedback?

[Open an issue on GitHub]({{ meta.url_issue_new }}). There's a short form for spec suggestions, site problems, corrections to the [Related Work]({{ meta.url_related }}) page and [adding your project]({{ meta.url_issue_rated }}) to Rated Projects, and a blank issue for questions and anything else. The [contributing guide]({{ meta.url_contributing }}) explains what makes a suggestion easy to act on, and how to send a pull request. Everyone taking part is expected to follow the [code of conduct]({{ meta.url_conduct }}).

### Does the Rating Say Anything About Copyright or Licensing?

No. Whether AI-written code can be copyrighted, and how it fits a project's licence, are legal questions that differ between countries and are still being settled. A rating describes how the code was made, which may help someone looking into them, but it isn't legal advice and doesn't change a project's licence.

### Can I Use the Spec in My Own Work?

Yes. The spec is licensed under [CC BY 4.0]({{ meta.url_licence_spec }}): you can copy, adapt and build on it, including commercially, as long as you credit AI Code Rating and link to the spec. The website's code is under the [MIT licence]({{ meta.url_licence_code }}).
