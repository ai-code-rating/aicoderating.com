---
page_title: Rating Examples
page_description: Common ways projects use AI, and the AI Code Rating each one gets, with the reasoning for every position.
permalink: /examples/
date_updated: 2026-10-07
---
Find the setup closest to yours. Each example walks through the three positions and the rule that decides each one. The people and projects are made up, and the [spec]({{ meta.url_spec }}) is the final word wherever an example and the spec differ.

## No AI at All

A solo developer with years of professional experience in their language writes every line by hand.

- **Maintainer Expertise: `B`.** They approve their own changes and could write the whole project unaided.
- **AI Share: `0`.** No code was written by AI.
- **Oversight: `a`.** With no AI code, Oversight is always `a`, shown as "No AI Code".

<p class="worked-rating">{% acr "B0a" %}</p>

## AI for Planning and Review Only

The same developer asks an AI to suggest designs, explain errors and review pull requests, but writes all of the code themselves.

- **Maintainer Expertise: `B`.** Unchanged.
- **AI Share: `0`.** Only code that AI wrote counts. Planning, research and review don't.
- **Oversight: `a`.** No AI code, so `a`.

<p class="worked-rating">{% acr "B0a" %}</p>

The rating is the same as using no AI at all. The paragraph in `{{ meta.file_name }}` is where this kind of use belongs. Whether the rating itself should show it is an open question in the [spec]({{ meta.url_spec }}).

## Autocomplete in the Editor

A developer uses an AI completion tool in their editor. Most suggestions they accept are a word or a single line, but now and then they accept a multi-line block, usually a test or some boilerplate, and read it before keeping it.

- **Maintainer Expertise: `B`.**
- **AI Share: `1`.** Single-line completions don't count, but the accepted multi-line blocks do. They add up to well under a quarter of the code.
- **Oversight: `b`.** Every AI-written block is read before it's kept.

<p class="worked-rating">{% acr "B1b" %}</p>

If they only ever accepted single-line completions, AI Share would be `0`.

## A Team With Required Review

A company web app. Developers of mixed experience use AI suggestions in places, and every pull request needs approval from one of two senior engineers before it can merge.

- **Maintainer Expertise: `B`.** Use the most experienced approval each change is guaranteed to get. Every change needs a senior engineer's approval, so the rating describes them, not the least experienced developer.
- **AI Share: `1`.** AI wrote parts of the code, well under a quarter.
- **Oversight: `b`.** Every AI change is read in review before merge.

<p class="worked-rating">{% acr "B1b" %}</p>

If juniors could also merge their own changes without a senior's approval, position 1 would describe the least experienced of them instead.

## An Expert Directing an Agent

An expert uses an AI agent to write most of a new service. They read every diff line by line, understand it, and keep test coverage high.

- **Maintainer Expertise: `A`.**
- **AI Share: `4`.** AI wrote more than three quarters of the code.
- **Oversight: `a`.** Every AI change is read, understood and covered by tests.

<p class="worked-rating">{% acr "A4a" %}</p>

A high AI Share isn't a bad score. Here, the other two positions show the code was written under close expert supervision.

## Strong Tests, Little Reading

A team lets an AI agent write about two thirds of the code. A thorough automated test suite runs on every change, but nobody reads the AI's changes before merge.

- **Maintainer Expertise: `B`.**
- **AI Share: `3`.** Between half and three quarters.
- **Oversight: `d`.** Oversight measures reading. However thorough, tests alone stop at `d`.

<p class="worked-rating">{% acr "B3d" %}</p>

The test suite is worth describing in the paragraph of `{{ meta.file_name }}`, because readers will want to know about it.

## AI Code Review on Every Pull Request

A project runs an AI code reviewer on every pull request. People read some changes themselves, but rely on the AI reviewer and the tests for the rest.

- **Maintainer Expertise: `B`.**
- **AI Share: `2`.** AI wrote between a quarter and half of the code.
- **Oversight: `c`.** Only checks by people count. Some changes are read by a person and the rest are tested, which is `c`. The AI reviewer doesn't raise it.

<p class="worked-rating">{% acr "B2c" %}</p>

## A Hobby Project

A capable hobbyist has AI write most features. They read the tricky parts closely and check the rest by running the program.

- **Maintainer Expertise: `C`.** They can read, debug and change all of the code, but would need help writing some parts from scratch.
- **AI Share: `3`.**
- **Oversight: `c`.** Some AI changes are read; the rest are checked by running the program.

<p class="worked-rating">{% acr "C3c" %}</p>

## Learning With AI

A developer early in their career builds a project with heavy AI help. They read every change before keeping it, but understand only parts of what they read.

- **Maintainer Expertise: `D`.**
- **AI Share: `3`.**
- **Oversight: `b`.** Every change is read. It can't be `a` (Verified), because that means every change was understood, and at level `D` that isn't possible. The rating form and validator warn about `D` with `a`.

<p class="worked-rating">{% acr "D3b" %}</p>

## Built Entirely by Prompting

Someone who doesn't read code builds an app by describing what they want. They try each new version to see whether it works before keeping it.

- **Maintainer Expertise: `E`.**
- **AI Share: `4`.**
- **Oversight: `d`.** Nobody reads the changes, but each one is tested by running the app.

<p class="worked-rating">{% acr "E4d" %}</p>

If changes were kept without even trying them, Oversight would be `e`.

## AI Merges Changes on Its Own

A project lets an AI agent open and merge small fixes automatically when the tests pass, with no person approving them.

- **Maintainer Expertise: `B`.** Rate the person responsible for the project.
- **AI Share: `2`.**
- **Oversight: `d`.** When AI can merge without a person approving, Oversight can be no better than `d`. Here the changes are tested before merge, so `d`, not `e`.

<p class="worked-rating">{% acr "B2d" %}</p>

## Contributors Don't Say Whether They Used AI

An open source project accepts pull requests from many contributors and doesn't know how much of their code was AI-written. The maintainers review every pull request.

- **Maintainer Expertise: `A`.** The maintainers who approve merges are experts in the project's domain.
- **AI Share: `2`.** Their estimate falls between `1` and `2`. When unsure between two bands, pick the higher one.
- **Oversight: `b`.** Every change is reviewed before merge.

<p class="worked-rating">{% acr "A2b" %}</p>

The paragraph in `{{ meta.file_name }}` should say what the maintainers don't know. Asking contributors to disclose AI use in the pull request template makes the next rating easier.

## AI-Written Documentation

A library's code is written by hand, but AI drafted most of its documentation site, which a maintainer reviews.

- **The code:** `B`, `0` and `a`. Prose documentation isn't code, so it doesn't count toward AI Share.
- **The docs:** left out of the rating. The file's text says AI drafted them and a maintainer reviews them.

<p class="worked-rating">{% acr "B0a" %}</p>
