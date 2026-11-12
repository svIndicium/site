# Scope and effort

Two optional fields, measuring different things:

- **Size** — scope: how much product surface the work touches.
- **Estimate** — effort: relative work, complexity, and uncertainty.

They are independent. A small surface can hide hard work, and a large surface can
be mechanical. Do not force them to agree.

## Size (scope)

| Size | Scope                                                         |
| ---- | ------------------------------------------------------------- |
| XS   | One file or one copy string; no behaviour spread.             |
| S    | One layer: one endpoint, one component, or one config change. |
| M    | One vertical slice across two layers, usually API + UI.       |
| L    | Several layers: migration + service + endpoint + UI.          |
| XL   | Cross-cutting or poorly bounded; split before starting.       |

Size is about breadth, not difficulty. A one-file auth callback can be `S` even
if it is risky; a rename across 20 screens can be `L` even if it is mechanical.

## Estimate (effort)

Allowed values: **1, 2, 3, 5, 8**. Anything **13+ must be split**.

| Points | Effort and uncertainty                                      |
| ------ | ----------------------------------------------------------- |
| 1      | Trivial; obvious change and obvious verification.           |
| 2      | Small; one familiar layer, tests are straightforward.       |
| 3      | Normal; a known pattern, but tests and edge cases matter.   |
| 5      | Large; several moving parts, or one genuinely unknown area. |
| 8      | Very large or uncertain; split if possible.                 |
| 13+    | Too large to start; split into vertical slices first.       |

Estimate is not hours or days. Include tests, migrations, docs, and generated
contract updates. Do not inflate for review or meeting time. Re-estimate only
when the scope changes materially.

## They can diverge

| Situation                                        | Size | Estimate |
| ------------------------------------------------ | ---- | -------- |
| One auth callback with a security-sensitive flow | S    | 5        |
| Rename a label across 20 screens                 | L    | 2        |
| One endpoint with an unfamiliar vendor API       | S    | 5        |
| New page using an existing endpoint              | M    | 3        |

Use both when the distinction helps. Use only one when the other adds no
information; both are optional.

## Repo anchors for Estimate

Use the closest anchor and move up or down. Anchors include tests and required
docs.

- **1:** typo/copy fix, spacing token, one assertion, patch dependency bump.
- **2:** one read-only endpoint with DTO/controller/security/test; small
  component with tests; nullable column plus migration.
- **3:** one vertical slice (migration, repository, service, endpoint, DTO,
  security, tests); one profile field end to end; contract change plus codegen.
- **5:** magic-link login slice; one external sync slice; new authenticated page
  with states and e2e; passkey registration plus authentication.
- **8:** full auth onboarding; full external sync; cross-cutting security
  change; work that cannot ship in one reviewable PR.
- **13+:** split before Ready.

## When to skip

Skip both for tiny `chore`/`docs` work: typo/copy fix, README/proposal wording,
one-line CI/config fix, dependency bump with no code change, or a rename with no
behaviour change.

If the change needs a new endpoint, migration, security rule, or page, it is not
tiny; estimate it.

## Consistency rules

- Never map Size to Estimate (`XS` is not always 1).
- Do not assign 4, 6, or 7 points.
- An `XL` Size or an 8-point Estimate is a split warning.
- Do not deflate because "it is just code"; include tests, migrations, docs, and
  generated-contract updates.
- Missing Size or Estimate never blocks starting or shipping.

## Commands

```bash
gh project item-edit 7 --owner svIndicium --url <issue-url> --field "Estimate" --number 3
gh project item-edit 7 --owner svIndicium --url <issue-url> --field "Size" --value "M"
```

Estimate is a NUMBER field (`--number`). Size is single-select (`--value`). One
field per call. Only run these after the user confirms the proposal.
