---
name: create-pr
description: Open or update the pull request after a human pushed the reviewed branch, then move the issue to In review. Use when asked to create the PR, open the pull request, or invoke /create-pr.
metadata:
  opencode/autoinvoke: false
---

# Create PR

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

Post-push handoff. This is the only skill allowed to run `gh pr create`,
`gh pr edit`, and `gh pr ready`. It never commits, pushes, merges, closes,
approves, or requests changes.

## Inputs

- Current branch `<type>/<issue>-<slug>`, its issue number, and
  `tmp/<branch>/{review.json,review.md}` from `/review-branch`.
- `git` and an authenticated `gh` (`gh auth status`).

## Preflight

Run every gate; if one fails, stop and report it. Do not improvise.

| Gate        | Requirement                                                                                         |
| ----------- | --------------------------------------------------------------------------------------------------- |
| Branch      | matches the configured `branchPattern`; never `main`                                                |
| Review run  | both review files exist; `review.branch` is the current branch                                      |
| Review      | passes `.agents/skills/review-branch/scripts/validate-review.mjs`; `schema` is `indicium/review/v2` |
| Mode        | `review.mode` is `staged` or `committed`                                                            |
| Tree        | `review.reviewed_tree == git rev-parse HEAD^{tree}` (exact, full SHA)                               |
| Worktree    | clean index and worktree; no untracked or unmerged paths                                            |
| Pushed      | `git ls-remote --heads origin <branch>` SHA equals `git rev-parse HEAD`                             |
| Existing PR | checked with `gh pr list --head <branch> --state open`                                              |

```bash
git branch --show-current
git rev-parse HEAD
git rev-parse "HEAD^{tree}"
git diff --quiet
git diff --cached --quiet
git ls-files --others --exclude-standard
git ls-files -u
node .agents/skills/review-branch/scripts/validate-review.mjs "tmp/<branch>/review.json"
git ls-remote --heads origin "<branch>"
gh pr list --head "<branch>" --state open --json number,url,isDraft
```

This intentionally checks the tree, not `reviewed_head`: in `staged` mode the
human created a new commit after review, so `HEAD` moved while the tree stayed
the same. If the tree differs, the review is stale: stop and tell the human to
rerun `/review-branch` and push.

If the remote branch is missing or its SHA differs from `HEAD`, stop:

> Push the reviewed branch first: `git push -u origin HEAD`. Do not create the PR
> from an unpushed or different commit.

Never push yourself.

## Choose draft or ready

Use the `question` tool. Recommend **ready** only when the review verdict is
`pass` and `human_review_required` is false; otherwise recommend **draft**. Say
which you recommend and why.

If an existing PR is already ready and the human asks for draft, confirm
explicitly before converting it. `gh pr edit` cannot change draft state; after
confirmation, use the PR node ID:

```bash
gh pr view <n> --json id --jq .id
gh api graphql -f query='mutation($id: ID!) { convertPullRequestToDraft(input: {pullRequestId: $id}) { pullRequest { isDraft } } }' \
  -f id="<node-id>"
```

If it is a draft and the human asks for ready, run `gh pr ready <n>`. Never
convert ready to draft without asking.

## Write the PR body

Regenerate `tmp/<branch>/pr.md` from `review.json`; do not trust a stale file.
Follow [`../finish-issue/references/handoff.md`](../finish-issue/references/handoff.md)
for the exact shape. It must contain, in order:

- a short summary, max three bullets;
- `Closes #N` outside `<details>` and outside code fences;
- a collapsible **Goal and approach** block;
- an acceptance-criteria checklist;
- a compact verification table for gates that ran, plus one line for skipped gates;
- docs;
- risk and rollback;
- the visible review verdict and whether human review is required;
- a findings table inside a Review `<details>` block;
- a final `🤖 Written by <agent>` line.

Body rules:

- Write each paragraph on one line. Do not hard-wrap at 80 columns; GitHub wraps.
- Never mention `tmp/`, `review.json`, `review.md`, `finish.json`, or any other
  local artifact path.
- Keep the body under roughly 100 lines. Collapse goal and findings; do not
  collapse the verdict.
- Before creating/editing the PR, reject `pr.md` if it contains a local path:
  `node -e "const s=require('fs').readFileSync(process.argv[1],'utf8'); if(/tmp\\/|review\\.json|review\\.md|finish\\.json/.test(s)) process.exit(1)" "tmp/<branch>/pr.md"`.

Use `git log -1 --format=%s` for the title in committed mode, or
`tmp/<branch>/commit-message.txt` in staged mode. Append `(#N)` if the subject
lacks the issue reference. Keep the body factual; link follow-up issues with
`#N`.

## Create or update

Existing open PR: update it, never create a second one.

```bash
gh pr edit <n> --title "<title>" --body-file "tmp/<branch>/pr.md"
```

No open PR:

```bash
gh pr create --base "<baseBranch>" --title "<title>" --body-file "tmp/<branch>/pr.md"
```

Add `--draft` when the human chose draft. When the human chose ready and the PR
is a draft, run `gh pr ready <n>`. Never edit another author's PR or push to it.

## Verify the issue link

The issue is the board item; the PR is linked through `Closes #N`. After creating
or updating the PR, verify the link:

```bash
gh pr view <n> --repo "$repo" \
  --json number,url,closingIssuesReferences
```

`closingIssuesReferences` must contain the issue number. If it does not, stop and
fix the PR body (`Closes #N`) before touching the board. The issue's native
**Linked pull requests** field is populated from this link.

## Project item policy

Project 7 holds **issues only**. Do not add PRs as items. GitHub may auto-add the
PR through the **Pull request linked to issue** workflow; remove that PR item so
the board does not show a duplicate Backlog card:

```bash
gh project item-list 7 --owner svIndicium --limit 200 --format json
gh project item-delete 7 --owner svIndicium --id <pr-item-id>
```

Only delete the item whose `content.type` is `PullRequest` and whose
`content.number` is this PR. Never delete the issue item.

## Board and record

After the PR exists, verify the issue link, remove any auto-added PR item, then
read the PR metadata and move the issue:

```bash
gh issue view <n> --json url --jq .url
gh pr view <n> --json number,url,isDraft,author,createdAt,headRefName,headRefOid
gh project item-edit 7 --owner svIndicium --url "<issue-url>" \
  --field "Status" --value "In review"
```

Verify with `gh project item-list 7 --owner svIndicium` before reporting. Write
`tmp/<branch>/pr.json`:

```json
{
  "number": 43,
  "url": "https://github.com/the current repository/pull/43",
  "branch": "feat/42-passkey-login",
  "head": "<HEAD sha>",
  "isDraft": true,
  "author": "<login>",
  "createdAt": "2026-10-30T12:34:56Z"
}
```

## Report

Finish with the PR number and URL, draft/ready state, title, issue status
(`In review`), and any follow-up issues. Stop.

## Hard stops

- Never run `git commit`, `git push`, `git merge`, `git tag`, or close an issue.
- Never approve, request changes, or merge a PR.
- Never create a second PR for the branch, and never open a PR from a tree that
  does not match `reviewed_tree`.
- Never convert ready to draft without asking.
- Never move the board before the PR exists.
