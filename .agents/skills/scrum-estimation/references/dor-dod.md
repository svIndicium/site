# Definition of Ready and Definition of Done

Keep this practical. A side project does not need a refinement ceremony, a
story-point vote, or every section filled in for a typo fix.

## Definition of Ready

An item is Ready when all four essentials are present:

1. **Outcome** - one or two sentences describing the user-visible result.
2. **Testable acceptance criteria** - at least one observable statement. A
   one-line criterion is fine for a trivial chore.
3. **Out of scope** - what this issue will not do.
4. **Verification known** - how to prove it works. A single command is enough
   for a trivial chore.

Estimate, Size, and Priority are **optional refinement metadata**. They help
when an item is being readied or started, but their absence never blocks a
Backlog item and is not a DoR failure by itself.

`Size` is scope (surface area); `Estimate` is effort, complexity, and
uncertainty. They are independent and do not need to agree.

For a tiny `chore` or `docs` issue, Ready can be:

- Outcome: "Fix the broken link on the login page."
- Acceptance: "The link points to the profile page and the build passes."
- Out of scope: "No other copy changes."
- Verification: `pnpm --filter frontend typecheck`.

That is a complete Ready item. Do not demand more.

### Issue body template

Use the body template in
[`drafting-issues.md`](drafting-issues.md#body-template). The board fields live
on project 7, not in the body; do not duplicate them in the issue text.

### Good and bad acceptance criteria

Bad: "Passkeys work."

Good: "A member can register a passkey from `/profile/security` and sign in
with it after signing out; an invalid challenge returns 401 and creates no
session."

Bad: "Improve sync."

Good: "When a full external read succeeds and a member's relation is absent,
that member is marked inactive; a failed or partial read changes no member."

Bad: "Add tests."

Good: "`OpenApiSpecGeneratorTest` covers the new endpoint and the regenerated
schema is committed."

## Refinement labels

Do not add a "Needs refinement" Status column. The board has exactly five
Status values: `Backlog`, `Ready`, `In progress`, `In review`, `Done`.

Use labels instead:

- `needs-refinement` on a Backlog item whose DoR is not met.
- Remove `needs-refinement` when the four essentials are present, then move the
  item to `Ready`.
- `agent:ready` is the explicit hand-off that an agent may start the item. Add
  it when a start runs and it is missing; it is not limited to the Ready column.
- `blocked` means waiting on a dependency or decision. It is a label, never a
  column.

## Definition of Done

An item is Done when:

- Every acceptance criterion is met, or explicitly waived by the user with a
  reason.
- Applicable checks pass: every `always` check from `.opencode/scrum.json`,
  plus path-triggered checks for changed areas. CI runs the full suite
  regardless.
- Generated-contract checks configured in `.opencode/scrum.json` were run and
  their outputs are staged when the contract changed.
- The branch review artifact is `pass` or `pass_with_findings` with no open
  blocker or major finding.
- Every required check passed on the staged checkpoint that was reviewed.
- Durable docs are updated under the repository docs location when behaviour,
  config, or a decision changed. Human docs such as `README.md` are proposed in
  the issue/PR, not edited.
- A human commits the staged checkpoint, pushes, and opens the PR linked with
  `Closes #N`; agents never run those commands. The issue is on project 7.
- Board Status is `In review` after the human opens the PR; merge/close
  automation moves it to `Done`.

Missing Estimate or Size is **not** a Definition of Done failure. If the item
was never estimated, ship it anyway.

## Waivers

Only the user can waive an acceptance criterion. Record the waiver and its
reason in the review artifact and the PR body. Do not waive a security,
data-loss, or migration-safety criterion without an explicit decision in the
issue.

## What blocks starting

For `feat` and `fix` work, stop when acceptance criteria, out-of-scope, or
verification is missing. For `chore` and `docs`, use judgement: a one-line
acceptance criterion and one verification command are enough.

Do not block starting because Estimate, Size, or Priority is missing. Propose
values once, then continue if the user declines.
