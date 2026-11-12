---
name: handle-review
description: Record an explicit decision for each pending finding in a branch review, file follow-ups, and update the review report. Use when asked to handle review findings, triage review feedback, decide on findings, or invoke /handle-review.
metadata:
  opencode/autoinvoke: false
---

# Handle Review

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

Resolve each finding's `decision` in `tmp/<branch>/review.json`, update
`review.md`, and never change product code, the index, or a PR.

## Preconditions

Stop and report when any of these fail:

- Branch matches the configured `branchPattern` (default
  `^(feat|fix|chore|docs|refactor|test|perf|ci|build)/[1-9][0-9]*-[a-z0-9]+(?:-[a-z0-9]+)*$`).
- `tmp/<branch>/review.json` and `tmp/<branch>/review.md` exist and are non-empty.
- `review.branch` equals `git branch --show-current`.
- `review.schema` is `indicium/review/v2`, and
  `node .agents/skills/review-branch/scripts/validate-review.mjs "tmp/<branch>/review.json"` exits 0.
  Do not rerun gates; preserve `reviewed_head` and `reviewed_tree`.

## 1. Collect pending findings

A missing or empty `decision` is `pending`. Sort blocker → major → minor → nit,
then by ID; skip findings that already have a decision. With none pending, report
and stop. For each, gather `id`, `severity`, `file:line`, `title`,
`why_it_matters`, `recommendation`, `confidence`, and `verification`.

## 2. Ask the user

Use the `question` tool with one question per finding, or batch at most five
consecutive findings in one call. Each question repeats that full context. Offer
exactly:

- **Fix now** — leave it open; the user fixes and stages it.
- **Accept risk** — accept here with an explicit reason.
- **Follow-up issue** — accept here and track it in a new issue.
- **False positive** — the finding is not valid.

Ask for a one-line reason for Accept risk and Follow-up issue; store it in
`decision_note`. A skipped or unanswered question stays `pending`.

## 3. Apply decisions

- **Fix now** — `status: "open"`, `decision: "fix_now"`. Do not edit code; tell
  the user to fix, `git add`, and rerun `/review-branch`.
- **Accept risk** — `status: "accepted"`, `decision: "accept"`,
  `decision_note` = the user's reason.
- **False positive** — `status: "false_positive"`,
  `decision: "false_positive"`; keep any reason in `decision_note`.
- **Follow-up issue** — `status: "accepted"`, `decision: "follow_up"`. Confirm
  title and scope, then create and board it:

  ```bash
  gh issue create --type Task --title "..." --body-file "tmp/<branch>/follow-up-<id>.md" \
    --label needs-refinement --label "area:..."
  gh project item-add 7 --owner svIndicium --url "<issue-url>"
  gh project item-edit 7 --owner svIndicium --url "<issue-url>" --field "Status" --value "Backlog"
  ```

  Use `Bug` for a genuine defect, else `Task`. Add `area:*` only when clear and
  the label exists. The body links the source issue and finding, with evidence
  and recommendation. Record the number in `follow_up_issue`.

## 4. Update the report and verdict

On the first decision run, add `triage` with `decided_at` (ISO-8601 now) and
`verdict_before` (the current verdict); preserve it on reruns. In `review.md`,
update the findings table with `Decision`, `Status`, and `Follow-up` columns and
the verdict line. Do not edit a PR body; `/create-pr` regenerates it from
`review.json`.

Change the verdict only when decisions change blocking status:

- Keep `blocked` for a non-finding block (missing criteria, unavailable gate,
  or human decision).
- Keep `changes_requested` while any `blocker`/`major` is `open`
  (`fix_now`/`pending`).
- Set `pass_with_findings` when every `blocker`/`major` is decided `accept`,
  `follow_up`, or `false_positive`.
- Minor/nit decisions never change the verdict.

Validate with `node .agents/skills/review-branch/scripts/validate-review.mjs "tmp/<branch>/review.json" --issue <n>`; fix report data and rerun until it exits 0.

## 5. Report and stop

Report counts per decision, new follow-up numbers, the verdict, and next action:
`fix_now` → fix, `git add`, `/review-branch`; otherwise `/finish-issue` when
`pass`/`pass_with_findings`, then `/create-pr` after the human pushes. A human
commits and pushes.

## Hard stops

- Never edit product code, tests, or docs; never stage, unstage, or stash.
- Never commit, push, merge, tag, open or edit a PR, approve, or request changes.
- Never change `reviewed_head`/`reviewed_tree`, evidence, severity, or criteria.
- Never create a follow-up without confirmation or accept a finding silently.
