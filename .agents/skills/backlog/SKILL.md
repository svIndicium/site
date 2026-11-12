---
name: backlog
description: Capture a new GitHub issue quickly on project 7 without refining or starting it. Use when asked to add a backlog item, create an issue, file a bug, or invoke /backlog.
metadata:
  opencode/autoinvoke: false
---

# Backlog

## Repository config

Read `.opencode/scrum.json` when present. It can override `owner`, `project`,
`baseBranch`, `branchPattern`, `checks`, and `review`. Defaults: owner
`svIndicium`, project `7`, base `main`, branch pattern
`^(feat|fix|chore|docs|refactor|test|perf|ci|build)/[1-9][0-9]*-[a-z0-9]+(?:-[a-z0-9]+)*$`.
Resolve `repo=$(gh repo view --json nameWithOwner -q .nameWithOwner)` before
using `--repo`. The main scrum board is project 7 for every repository.

Review defaults: schema `indicium/review/v2`, validator
`.agents/skills/review-branch/scripts/validate-review.mjs`, human-review paths
from `review.humanReviewPaths`.

Capture work now; refine and start it later. Do not create a branch, estimate,
assign, or change the issue to `Ready`.

## Discussions

GitHub Discussions is the parking lot for long-horizon ideas that are not ready
for project 7. WhatsApp is quick chat; issues are ready work; `ai-docs/` or the
wiki holds durable knowledge. Before creating an issue, search Discussions for
related ideas. If the item is exploratory, cross-repo or still months away,
propose an **Ideas** discussion instead of creating an issue. Link the discussion
from the issue `Context` and the issue back from the discussion. Never post
credentials, member data or PII. See
[`references/discussions.md`](references/discussions.md) for the rules. Agents
create or update a discussion only when asked.

## Input

Accept a title, a bullet list, or a free-form brain dump. The user does not need
to structure it; you do the structuring.

- Nothing usable: ask for a one-line problem or outcome.
- Free-form: see “Yap mode” below. Always show the proposed split and confirm
  before creating.
- Multiple items: one per line or bullet, for example:

  ```text
  - chore(deps): update shell-quote
  - Bug: fix login redirect loop
  - Feature: export profile as PDF
  ```

  Parse an optional `Bug:`, `Feature:`, or `Task:` prefix per item. If there is
  no prefix, infer the type.

- Search each title first:
  `gh issue list --search "<words>" --state open --limit 10`. If a likely
  duplicate exists, show it and ask before creating another.
- `gh` must be installed and authenticated. Adding to project 7 needs the
  `project` scope.
- Cap one invocation at 10 new issues. For more, split the batch.

## Yap mode

When the user just talks, do not ask them to rewrite it as a form. Parse it.

1. **Find the work items.** One coherent problem is one issue. Clearly separate
   asks become separate issues. Do not split into artificial subtasks; do not
   merge unrelated asks just because they arrived together.
2. **Keep the user's context.** Put their wording or a short faithful summary in
   `Context`. Normalise only the title.
3. **Separate facts from questions.** If the user was unsure, put the uncertainty
   under `Context` or an open question; do not invent acceptance criteria.
4. **Propose a table** with `#`, type, title, one-line outcome, labels, and any
   open question. Example:

   | #   | Type | Title                   | Outcome                            | Open question       |
   | --- | ---- | ----------------------- | ---------------------------------- | ------------------- |
   | 1   | Bug  | fix login redirect loop | redirects settle on the right page | which environments? |
   | 2   | Task | update shell-quote      | audit no longer fails              | none                |

5. **Ask once** with the `question` tool: **Create these**, **Merge into one**,
   **Edit**, or **Cancel**. If you cannot tell whether it is one issue or
   several, ask that single question instead of guessing.
6. Only then create the confirmed items.

A direct one-line title may be created without the table, but a free-form dump
always gets the proposal step.

## Draft

Infer the issue type unless the user gave one:

| Work                                    | `--type`  |
| --------------------------------------- | --------- |
| Broken behaviour or regression          | `Bug`     |
| New user-facing capability              | `Feature` |
| Dependency, CI, docs, refactor, tooling | `Task`    |

Use `type:chore` only when the issue must carry the legacy label; otherwise the
org issue type is enough. Add `area:*` only when the affected area is clear.

The body should be short but useful:

```md
## Goal / outcome

...

## Context

...

## Acceptance criteria

- [ ] ...

## Out of scope

- ...

## Verification

- `command` or manual step.
```

If the user has not supplied acceptance criteria, use `- [ ] Refine acceptance
criteria.` and add `needs-refinement`. A backlog capture is allowed to be
incomplete.

## Create one

Write the body under `tmp/backlog/<slug>.md`, then:

```bash
gh issue create --repo "$repo" \
  --type Task \
  --title "chore(area): short title" \
  --body-file "tmp/backlog/<slug>.md" \
  --label needs-refinement --label "area:frontend"
```

Then add it to the board and set `Backlog`:

```bash
gh project item-add 7 --owner svIndicium --url "<issue-url>"
gh project item-edit 7 --owner svIndicium --url "<issue-url>" \
  --field "Status" --value "Backlog"
```

Do not set Estimate, Size, Priority, or `agent:ready` unless the user asks.
Never assign a worker by default.

## Create multiple

For a batch:

1. Show a compact table of proposed items: `#`, type, title, labels, duplicate
   status.
2. Ask once with the `question` tool: **Create all**, **Edit**, or **Cancel**.
   Do not create anything before confirmation.
3. Create sequentially using the single-item flow. Do not stop on one failure;
   record it and continue.
4. Add each successful issue to project 7 and set `Backlog`.
5. Report a table of `#`, type, title, URL, and status. Mark failures clearly.

## Report

Return the issue URL(s), issue type(s), labels, and board status (`Backlog`). Say
what must be refined before an item can move to `Ready`. For a batch, include
created, skipped-duplicate, and failed counts.

## Hard stops

- Do not create a duplicate; ask when a likely match exists.
- Do not create more than 10 issues in one invocation.
- Do not create a branch, edit code, or start work.
- Do not move items to `Ready` or `In progress`.
- Do not commit, push, or open a PR.
