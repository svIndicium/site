# Drafting an issue

Use this when the user has only a task description. Draft first; create the
issue only after confirmation.

## Shape

1. Title in Conventional Commit style, for example `feat(auth): add passkey login`.
2. Outcome, testable acceptance criteria, out of scope, verification.
3. Type: `Feature`, `Bug`, or `Task`. Chore maps to `Task`.
4. Labels: `area:*` when known; add `needs-refinement` if the DoR is not met.
5. For a tiny chore, one acceptance line and one verification command are enough.

## Body template

```md
## Goal / outcome

What is true when this is done?

## Context and constraints

Why now, what exists, and what limits the solution?

## Acceptance criteria

- [ ] A testable criterion.
- [ ] Another observable result.

## Out of scope

- What this issue will not cover.

## Verification

- `command` or manual step.
```

Do not duplicate board fields in the body.

## Create it

```bash
gh issue create --repo "$repo" \
  --type Task \
  --title "chore(area): short title" \
  --body-file tmp/<slug>/issue-draft.md \
  --label "needs-refinement"
```

Add the issue to project 7 when needed. Never commit the scratch draft.
