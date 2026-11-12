# Handoff files

Write these under `tmp/<branch>/`. Never stage or commit them. `/finish-issue`
prepares them; `/create-pr` regenerates `pr.md` from the review after the human
pushes.

## Commit message (staged mode only)

`tmp/<branch>/commit-message.txt` holds one Conventional Commit line with the
issue reference:

```text
feat(profile): add passkey login (#42)
```

Use the branch type and the issue title. Keep it short; a body is optional.
Committed mode has no commit message file: the commit already exists.

## Pull request body

`tmp/<branch>/pr.md`, in this order:

```md
## Summary

- Short outcome.
- Another outcome, max three bullets.

Closes #42

<details>
<summary>Goal and approach</summary>

One short paragraph. Write it on one line; GitHub wraps it. Do not hard-wrap at
80 columns.

</details>

## Acceptance criteria

- [x] A member can register a passkey.
- [ ] Waived: ... (reason)

## Verification

| Check | Command              | Status |
| ----- | -------------------- | ------ |
| Lint  | `<configured check>` | pass   |
| Test  | `<configured check>` | pass   |

Skipped: path-specific checks (not applicable). Use one line, not an empty table row
for every skipped gate.

## Docs

- `docs/...` updated, or "none needed".

## Risk and rollback

- Risk: ...
- Rollback: revert this PR. Flyway migrations are forward-only; ship a compensating migration if a rollback is needed.

## Review

**Verdict:** `pass_with_findings` · **Reviewed tree:** `<short-sha>` · **Human review required:** yes/no.

<details>
<summary>Findings (3)</summary>

| ID  | Severity | Location       | Finding     | Decision  | Status   | Follow-up |
| --- | -------- | -------------- | ----------- | --------- | -------- | --------- |
| F1  | minor    | `path/file:12` | Short title | follow_up | accepted | #128      |

</details>

`🤖 Written by opencode`
```

Rules:

- Keep the body short. Summary max three bullets; collapse goal and findings.
- Write each paragraph on one line. Do not hard-wrap at 80 columns; GitHub wraps.
- Never mention `tmp/`, `review.json`, `review.md`, `finish.json`, or any other
  local artifact path in the PR body. Paste the verdict and findings instead.
- Keep `Closes #N` outside `<details>` and outside code fences.
- Use `- [x]` for met criteria and name waived criteria explicitly.
- For each finding, `Decision` is `review.decision` (`pending`, `fix_now`,
  `accept`, `false_positive`, or `follow_up`) and `Follow-up` is
  `follow_up_issue` when present.
- Put the findings table in the Review `<details>` block. If there are none,
  omit the block.
- End agent-created bodies with the attribution line. Do not add it to the
  repository PR template.
- If `human_review_required` is true, say so in the visible Review line.
- If human docs (`README.md`, etc.) need changes, do not edit them: put the
  proposed wording in the PR body or issue, and note it in `docs/proposals/`
  when useful.

## Handoff record

`tmp/<branch>/finish.json`:

```json
{
  "mode": "staged",
  "issue": 42,
  "branch": "feat/42-passkey-login",
  "head": "<HEAD at finish time>",
  "reviewedHead": "<review.reviewed_head>",
  "reviewedTree": "<review.reviewed_tree>",
  "reviewVerdict": "pass",
  "commitMessage": "tmp/feat/42-passkey-login/commit-message.txt",
  "prBody": "tmp/feat/42-passkey-login/pr.md",
  "preparedAt": "2026-10-30T12:34:56Z"
}
```

Committed mode sets `"mode": "committed"` and `"commitMessage": null`. Keep
`reviewedTree` and `reviewedHead` exactly as reviewed. Get the timestamp with
`node -p "new Date().toISOString()"`.
