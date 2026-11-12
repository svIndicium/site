---
name: finish-issue
description: Prepare a reviewed staged or committed branch for the human push and PR handoff. Use when asked to finish an issue, prepare the PR, wrap up #123, or invoke /finish-issue.
metadata:
  opencode/autoinvoke: false
---

# Finish Issue

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



Prepare the handoff without changing the repository. This skill never commits,
pushes, merges, tags, or opens a pull request, and never changes the index. A
human runs the final commands.

## Inputs

- Branch `<type>/<issue>-<slug>`, its issue number, and
  `tmp/<branch>/review.json` plus `review.md` from `/review-branch`. Stop if any
  is missing.

## Preflight

Run every gate; if one fails, stop and report it. Do not work around it.

| Gate            | Requirement                                                                                                |
| --------------- | ---------------------------------------------------------------------------------------------------------- |
| Branch          | matches the configured `branchPattern`                                                                     |
| Review run      | `review.json` and `review.md` exist; `review.branch` is the current branch                                 |
| Review artifact | passes `.agents/skills/review-branch/scripts/validate-review.mjs`                                                                    |
| Schema          | `schema` is `indicium/review/v2`; `mode` is `staged` or `committed`                                    |
| Verdict         | `pass` or `pass_with_findings`                                                                             |
| Findings        | no `blocker` or `major` finding with status `open`                                                         |
| Acceptance      | every criterion is `met` or `waived`                                                                       |
| Checks          | non-empty; no `fail`; every skip has a `reason`; every `always` check passed                               |
| Worktree        | no untracked or unmerged paths; mode-specific gates below also hold                                        |

```bash
git branch --show-current
git rev-parse HEAD
git rev-parse "HEAD^{tree}"
git diff --quiet
git diff --cached --quiet
git ls-files --others --exclude-standard
git ls-files -u
git write-tree
node .agents/skills/review-branch/scripts/validate-review.mjs "tmp/<branch>/review.json"
```

The validator owns the v2 cross-field checks. Compare `review.mode`,
`review.reviewed_head`, and `review.reviewed_tree` against the repository
yourself:

| Mode        | Required state                                                                                          |
| ----------- | ------------------------------------------------------------------------------------------------------- |
| `staged`    | index non-empty; `reviewed_tree == git write-tree`; `reviewed_head == HEAD`; worktree matches the index |
| `committed` | `reviewed_tree == git rev-parse HEAD^{tree}`; `reviewed_head == HEAD`; index and worktree clean         |

`reviewed_head` is the full 40-character SHA. If the mode does not match the
repository, stop: the review is stale.
For example, a `staged` review with a clean index and the change already in
`HEAD` means the human committed after review; rerun `/review-branch` on the
committed state. Do not stage, unstage, commit, amend, reset, or stash.

If a gate fails, stop with the actionable reason, for example:

> The staged checkpoint is incomplete. Stage the intended files with `git add`,
> rerun `/review-branch`, then rerun `/finish-issue`.

The review artifact is the gate; do not re-run the backend or frontend suites.
An unestimated issue may still ship.

## Prepare the handoff

Write under `tmp/<branch>/`; formats are in
[`references/handoff.md`](references/handoff.md).

- `staged`: write `commit-message.txt`, `pr.md`, and `finish.json` with
  `mode: "staged"`.
- `committed`: the commit already exists; do not ask for or write a commit
  message. Write `pr.md` and `finish.json` with `mode: "committed"`.

## Human commands

Print these and stop; do not run them.

`staged`:

```bash
git commit -F "tmp/<branch>/commit-message.txt"
git push -u origin HEAD
```

`committed`: print the push only when `origin/<branch>` is missing or differs
from `HEAD`:

```bash
git ls-remote --heads origin "<branch>"
git push -u origin HEAD
```

Then, in both modes:

```text
Then run /create-pr.
```

The commit tree must equal `reviewed_tree`. If a hook rewrites files, stop and
rerun `/review-branch` instead of amending. Do not run `gh pr create`; do not
move the board to `In review` before the PR exists. `/create-pr` owns the PR and
the board transition. Do not merge or close: `Closes #N` closes on merge.

## Report

Finish with the mode, branch, prepared paths, reviewed tree (short), review
verdict, board status (`In progress`), the exact human commands, and any waived
criteria or follow-ups.

## Hard stops

- Never run `git commit`, `git push`, `git merge`, `git tag`, `gh pr create`,
  `gh pr edit`, or `gh pr ready`.
- Never stage, unstage, or change the index; stop if it needs changing.
- Do not move the issue to `In review`; `/create-pr` does that after the PR
  exists.
- Do not commit `tmp/` or scratch files, skip hooks or gates, or edit human docs
  outside `docs/`.
- Do not use contribution status anywhere.
