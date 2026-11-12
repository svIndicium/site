# Rubric examples

## Good acceptance criteria

- "A member can register a passkey and sign in with it after signing out; an
  invalid challenge returns 401 and creates no session."
- "When a full read succeeds and a record is absent, it is marked inactive; a
  failed or partial read changes nothing."

## Bad acceptance criteria

- "Passkeys work."
- "Improve sync."
- "Add tests."

## Split warnings

Split when:

- Size is XL.
- Estimate is 8 and the work cannot ship in one reviewable change.
- One issue mixes unrelated outcomes.

Do not split a coherent vertical slice just to make numbers smaller.

## Waivers

Only the user can waive an acceptance criterion. Record the waiver and reason in
the review artifact and the PR body. Never waive security, data-loss or
migration-safety criteria without an explicit decision.
