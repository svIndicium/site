# Review report schema

`.agents/skills/review-branch/references/review.schema.json` is the normative contract for
`tmp/<branch>/review.json` (JSON Schema draft 2020-12,
`schema: indicium/review/v2`). This page explains the fields; the JSON Schema
and `.agents/skills/review-branch/scripts/validate-review.mjs` decide whether a report is valid.

```bash
node .agents/skills/review-branch/scripts/validate-review.mjs tmp/<branch>/review.json \
  --issue 42 --head 0123456789abcdef0123456789abcdef01234567 \
  --tree 89abcdef0123456789abcdef0123456789abcdef
```

The validator is the exit gate. It checks required fields, types, enums, the
branch pattern, unique finding IDs, check reason rules, finding decision
consistency, verdict consistency, and that `report.issue` matches the number in
`report.branch`. It also checks `--issue`, `--head`, and `--tree` when provided.
`--head` compares `reviewed_head`; `--tree` compares `reviewed_tree`. It does not
judge whether the evidence is true.

A `indicium/review/v1` artifact fails immediately with one message:
`review/v1 is retired; rerun /review-branch with the v2 contract`. Rerun the
review; do not patch a v1 report.

## Modes

`mode` records what was reviewed:

- `staged` — the index was the checkpoint. `reviewed_tree` is
  `git write-tree`, the diff is `git diff --cached <base_sha>`. The index has
  staged changes, and there are no unstaged tracked, untracked, or unmerged
  paths.
- `committed` — HEAD was the checkpoint. The index and worktree are clean, there
  are no untracked or unmerged paths, and HEAD is not the base. The diff is
  `git diff "$base_sha" "$reviewed_head"`, and `reviewed_tree` is
  `git rev-parse HEAD^{tree}`.

If neither mode applies, the skill stops and asks the author to stage (`git add`)
or commit the work. A report without a valid mode is invalid.

## Top level

| Field                   | Meaning                                                              |
| ----------------------- | -------------------------------------------------------------------- |
| `schema`                | Always `indicium/review/v2`.                                     |
| `issue`                 | GitHub issue number, integer >= 1.                                   |
| `branch`                | `<type>/<issue>-<slug>`, e.g. `feat/42-passkey-login`.               |
| `base`                  | Base ref compared against, normally `origin/main`.                   |
| `mode`                  | `staged` or `committed`; see above.                                  |
| `reviewed_head`         | `git rev-parse HEAD` at review time, 40 hex characters.              |
| `reviewed_tree`         | Reviewed tree, 40 hex characters; staged tree or HEAD tree per mode. |
| `generated_at`          | ISO-8601 date-time.                                                  |
| `agent`                 | Producer, e.g. `opencode/reviewer`.                                  |
| `verdict`               | `pass`, `pass_with_findings`, `changes_requested`, `blocked`.        |
| `checks`                | Gates that ran; see below.                                           |
| `acceptance_criteria`   | One entry per extracted issue criterion.                             |
| `findings`              | Review findings; see below.                                          |
| `summary`               | Short human-readable conclusion.                                     |
| `human_review_required` | Sensitive area or human judgement needed.                            |
| `triage`                | Optional; `{decided_at, verdict_before}` after human triage.         |

Unknown top-level fields are rejected (`additionalProperties: false`).
`triage.decided_at` is an ISO-8601 date-time and `triage.verdict_before` is one
of the four verdicts.

## Checks

Every entry has `name`, `command`, `status` (`pass`/`fail`/`skipped`), `reason`,
`exit_code` (integer or `null`), `duration_seconds` (>= 0), and `output_path`
(usually `tmp/<branch>/checks.log`). Names must be unique. `reason` is required:
a non-empty string for skipped gates, `null` otherwise. The skill runs `lint` for
every change and the path-triggered gates only when their paths
changed, so skipped gates still appear with a reason. A required gate that fails
because of branch code is a `major` finding, not a skipped check.

A `pass` or `pass_with_findings` verdict needs a non-empty `checks` array, no
`fail` status, and a passing `lint`.

## Acceptance criteria

Each entry has `criterion`, `status`, and `evidence`. Statuses:

- `met` — the diff or a passing check demonstrates it.
- `unmet` — the diff or a failing check contradicts it.
- `unverified` — there is not enough evidence, or a required check did not run.
- `waived` — only a human or the issue may waive it; include the reason.

An empty `acceptance_criteria` array blocks the review: there is nothing to
verify.

## Findings

Required fields:

| Field                   | Values / meaning                                                                      |
| ----------------------- | ------------------------------------------------------------------------------------- |
| `id`                    | Unique, e.g. `F1`; case-sensitive.                                                    |
| `severity`              | `blocker`, `major`, `minor`, `nit`.                                                   |
| `category`              | `correctness`, `security`, `performance`, `tests`, `docs`, `style`, `scope`, `other`. |
| `file`                  | Changed file path.                                                                    |
| `line`                  | 1-based line on the changed side.                                                     |
| `end_line`              | Last line, or `null`; when set, must be `>= line` (validator-enforced).               |
| `symbol`                | Function/class/component, or `null`.                                                  |
| `title`                 | One-line finding.                                                                     |
| `evidence`              | Concrete diff/log excerpt or observation.                                             |
| `why_it_matters`        | Impact, not restatement.                                                              |
| `recommendation`        | What to change.                                                                       |
| `confidence`            | 0–1. Lower it when uncertain.                                                         |
| `pre_existing`          | True only when the diff shows the issue predates the change.                          |
| `status`                | `open`, `fixed`, `accepted`, `false_positive`.                                        |
| `verification`          | Command or check a human can run.                                                     |
| `human_review_required` | Sensitive area or human judgement needed.                                   |

Optional triage fields:

| Field             | Values / meaning                                                         |
| ----------------- | ------------------------------------------------------------------------ |
| `decision`        | `pending` (default), `fix_now`, `accept`, `false_positive`, `follow_up`. |
| `follow_up_issue` | Issue number for `follow_up`; integer >= 1, otherwise `null` or omitted. |
| `decision_note`   | Short rationale, string or `null`.                                       |

The validator enforces decision/status consistency:

| Condition                       | Required result                           |
| ------------------------------- | ----------------------------------------- |
| `decision: fix_now`             | `status` is `open` or `fixed`.            |
| `decision: accept`              | `status` is `accepted`.                   |
| `decision: false_positive`      | `status` is `false_positive`.             |
| `decision: follow_up`           | `status` is `accepted` and integer issue. |
| `follow_up_issue` is not `null` | `decision` is `follow_up`.                |

Severity is about impact, not taste:

- `blocker` — data loss, security hole, broken main path, or cannot review.
- `major` — likely bug, missing required test for new behaviour, contract break.
- `minor` — real but non-blocking defect, maintainability trap, missing docs.
- `nit` — style or wording; never blocks.

Only `open` findings with `blocker` or `major` block. `minor` and `nit` are
follow-ups.

## Verdict rules

| Verdict              | Valid when                                               |
| -------------------- | -------------------------------------------------------- |
| `pass`               | No open findings; gates pass; criteria met/waived.       |
| `pass_with_findings` | No open blocker/major; gates pass; criteria met/waived.  |
| `changes_requested`  | At least one open blocker/major.                         |
| `blocked`            | Review could not be completed or needs a human decision. |

The validator enforces the blocker/major rules. It does not require `pass` to
have zero findings or `pass_with_findings` to have at least one; use the
definitions above. Both require non-empty `checks`, no failed check, every
`when: "always"` check passing, no open blocker/major, and every criterion `met`
or `waived`.

If any finding has `human_review_required: true`, the top-level field must also
be `true`. Paths listed in `review.humanReviewPaths` in `.opencode/scrum.json`
always set it.

## Minimal valid report

```json
{
  "schema": "indicium/review/v2",
  "issue": 42,
  "branch": "feat/42-passkey-login",
  "base": "origin/main",
  "mode": "staged",
  "reviewed_head": "0123456789abcdef0123456789abcdef01234567",
  "reviewed_tree": "89abcdef0123456789abcdef0123456789abcdef",
  "generated_at": "2026-10-30T12:00:00Z",
  "agent": "opencode/reviewer",
  "verdict": "pass_with_findings",
  "checks": [
    {
      "name": "lint",
      "command": "task lint",
      "status": "pass",
      "reason": null,
      "exit_code": 0,
      "duration_seconds": 9.2,
      "output_path": "tmp/feat/42-passkey-login/checks.log"
    },
    {
      "name": "backend",
      "command": "cd backend; ./gradlew check",
      "status": "skipped",
      "reason": "not applicable: no backend changes",
      "exit_code": null,
      "duration_seconds": 0,
      "output_path": "tmp/feat/42-passkey-login/checks.log"
    }
  ],
  "acceptance_criteria": [
    {
      "criterion": "The login page offers a passkey button.",
      "status": "met",
      "evidence": "diff.patch adds the button in path/to/file:24."
    }
  ],
  "findings": [
    {
      "id": "F1",
      "severity": "minor",
      "category": "docs",
      "file": "path/to/doc.md",
      "line": 12,
      "end_line": null,
      "symbol": null,
      "title": "Example finding",
      "evidence": "The sentence still describes the old flow.",
      "why_it_matters": "Readers would follow an outdated flow.",
      "recommendation": "Update the sentence with the new endpoint.",
      "confidence": 0.8,
      "pre_existing": false,
      "status": "open",
      "verification": "Read path/to/doc.md:12.",
      "human_review_required": false,
      "decision": "fix_now",
      "follow_up_issue": null,
      "decision_note": "Fix before merge."
    }
  ],
  "summary": "The feature works and the gates pass; one docs follow-up remains.",
  "human_review_required": false
}
```

The example is intentionally small. Real reports include all gate checks and all
acceptance criteria from `issue.json`.
