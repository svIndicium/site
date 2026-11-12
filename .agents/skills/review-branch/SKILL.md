---
name: review-branch
description: Review the current issue branch against its GitHub issue and acceptance criteria, run proportional gates, and write tmp/<branch>/review.json. Use when asked to review a branch or PR, verify acceptance criteria, or invoke /review-branch.
metadata:
  opencode/autoinvoke: false
---

# Review branch

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



Review the current branch for issue `<n>` without changing product code. The
output is evidence, not a merge: `tmp/<branch>/review.json` and `review.md`. A
human reviews and merges. Read
[`references/review-schema.md`](references/review-schema.md) first;
`.agents/skills/review-branch/references/review.schema.json` is normative.

## Inputs

- Branch from `git branch --show-current`; base ref `origin/<baseBranch>`
  (default `origin/main`).
- Issue number from `<type>/<issue>-<slug>` (for example
  `feat/42-passkey-login`).

## Preconditions and mode

Stop and report instead of improvising when any of these fail:

- The branch is `main` or `master`, or does not match the configured
  `branchPattern` (default
  `^(feat|fix|chore|docs|refactor|test|perf|ci|build)/[1-9][0-9]*-[a-z0-9]+(?:-[a-z0-9]+)*$`).
- `gh auth status` fails; ask for `gh auth refresh -s project,read:project` if
  project access is missing.
- `git fetch origin <baseBranch>` fails.

Then determine the review mode. Run `git merge-base origin/<baseBranch> HEAD` for
`base_sha`.

**staged** — the staged index is the complete checkpoint:

- `git diff --cached --quiet` exits 1 (the index has changes).
- `git diff --quiet` exits 0 (no unstaged tracked changes).
- `git ls-files --others --exclude-standard` is empty (no untracked files;
  `tmp/` is ignored).
- `git ls-files -u` is empty (no unmerged paths).

**committed** — HEAD is the checkpoint:

- `git diff --quiet` exits 0 and `git diff --cached --quiet` exits 0 (index and
  worktree clean).
- `git ls-files --others --exclude-standard` is empty.
- `git ls-files -u` is empty.
- `git rev-parse HEAD` differs from `base_sha` (HEAD is not the base).

If neither mode applies, stop and tell the user: "Stage the work with `git add`
or commit it, then rerun `/review-branch`." Reviewing never changes the index.

Scratch lives in gitignored `tmp/<branch>/` (keep the slash). Create it with
`mkdir -p` or `New-Item -ItemType Directory -Force`.

## 1. Capture the issue

```bash
gh issue view <n> --json number,title,body,labels,url
```

If `tmp/<branch>/issue.json` is missing, write `number`, `title`, `url`,
`labels`, `body` (labels as names), and `acceptance_criteria`: task-list items
under a heading matching `acceptance criteria` or `definition of done`, else all
task-list items in the body. Keep the checked state as context, not proof. Do
not overwrite an existing file. No criteria means an empty array and a `blocked`
verdict: there is nothing to verify.

## 2. Capture the diff and tree

```bash
base=origin/<baseBranch>
base_sha=$(git merge-base origin/<baseBranch> HEAD)
reviewed_head=$(git rev-parse HEAD)
```

For **staged**:

```bash
git diff --cached "$base_sha" --output=tmp/<branch>/diff.patch
git diff --cached --name-only "$base_sha"
reviewed_tree=$(git write-tree)
```

For **committed**:

```bash
git diff "$base_sha" "$reviewed_head" --output=tmp/<branch>/diff.patch
git diff --name-only "$base_sha" "$reviewed_head"
reviewed_tree=$(git rev-parse HEAD^{tree})
```

`--output` avoids shell redirection encoding problems on Windows. Record
`mode`, `base`, `reviewed_head`, and `reviewed_tree`.

If the name-only output is empty, stop: the checkpoint is empty, ask the user to
stage or commit the implementation, and do not write a report. `finish-issue`
keys the artifact to `reviewed_tree`; any index or HEAD change means rerun
`/review-branch` rather than patching the artifact.

## 3. Run gates

Run the checks configured in `.opencode/scrum.json` (`checks`), including every
`when: "always"` check and every path-triggered check whose glob matches the
change. Append every gate to `tmp/<branch>/checks.log`, including skips with a
reason. See [`references/gates.md`](references/gates.md) for the gate
configuration, log format, and failure semantics.

## 4. Ask the read-only reviewer

Invoke the read-only `reviewer` subagent with exactly
`tmp/<branch>/{diff.patch,issue.json,checks.log}`. Its output contract is
`.opencode/agents/reviewer.md`. It must not read other files, edit, or run
commands.

## 5. Write the review

You own the final JSON: merge the reviewer's proposal with your gate results and
criterion checks, then write `tmp/<branch>/review.json` following
[`references/review-schema.md`](references/review-schema.md) for fields,
severity, findings, decisions, sensitive paths, and verdict rules. Reminder:
`reviewed_tree` must equal the tree captured in step 2, and the validator is the
exit gate.

## 6. Write review.md and validate

Write `tmp/<branch>/review.md` for the issue/PR: summary, verdict, checks table,
acceptance-criteria table, findings table (`ID`, severity, `file:line`, title,
status, decision), and a callout when human review is required. Keep it short.

Validate with `.agents/skills/review-branch/scripts/validate-review.mjs` as documented in
`references/review-schema.md`; fix and rerun until it exits 0. Then report the
verdict, paths, and blocking findings, and stop.

## Hard stops

- Do not edit product code, tests, or docs.
- Do not commit, push, merge, or close the issue.
- Do not review unstaged work; stage or commit first.
- Do not restore files rewritten by `codegen`; report them and stop.
- Do not overrule a failed gate or an unmet criterion with prose.
- If findings need fixes, report them and stop; the author fixes, stages or
  commits, and reruns `/review-branch`.
