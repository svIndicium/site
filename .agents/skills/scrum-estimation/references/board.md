# Project 7 board

The planboard is **https://github.com/orgs/svIndicium/projects/7/**, owner
`svIndicium`, project number `7`. The issue is the board item; pull requests are
not added to the board.

## Fields

| Field    | Type          | Values                                                 |
| -------- | ------------- | ------------------------------------------------------ |
| Status   | single select | `Backlog`, `Ready`, `In progress`, `In review`, `Done` |
| Priority | single select | `P0`, `P1`, `P2`, `P3`                                 |
| Size     | single select | `XS`, `S`, `M`, `L`, `XL`                              |
| Estimate | number        | `1`, `2`, `3`, `5`, `8`                                |

Only five Status values exist. There is no refinement or blocked column.

`Size` is **scope** (how much product surface). `Estimate` is **effort**
(relative work, complexity, and uncertainty). They are independent and may
diverge: a one-file security-sensitive change can be `S`/5, while a mechanical
rename across many screens can be `L`/2. Neither is required for tiny
`chore`/`docs` items, and missing values never block a Backlog item.

## Status flow

| Status        | Meaning                                                  |
| ------------- | -------------------------------------------------------- |
| `Backlog`     | Captured; startable when the DoR essentials are met      |
| `Ready`       | Four DoR essentials present; may be picked up            |
| `In progress` | Branch exists, issue assigned, work underway             |
| `In review`   | PR open, waiting for review/merge                        |
| `Done`        | Issue closed or PR merged; automation normally sets this |

Transitions:

- Backlog -> Ready when outcome, acceptance criteria, out-of-scope, and
  verification are present. Remove `needs-refinement` in the same action.
- Backlog or Ready -> In progress when `/start-issue` runs.
- In progress -> In review when a human opens the PR after `/finish-issue`.
- In review -> Done when the PR merges or the issue closes.

Agents never commit or push. They stage with `git add`; the human commits and
pushes the handoff printed by `/finish-issue`. `/create-pr` may then open or
update the PR and move the item to `In review`.

Do not park work in `In progress` for days without a comment. Do not move an
item to `Done` by hand unless the automation is unavailable.

## Labels used by refinement

| Label              | Purpose                                                   |
| ------------------ | --------------------------------------------------------- |
| `needs-refinement` | Backlog item with unmet DoR; remove when Ready            |
| `agent:ready`      | Explicit hand-off that an agent may start the item        |
| `blocked`          | Waiting on a dependency or decision; never a Status value |
| `type:bug`         | Defect; usually a `fix` branch                            |
| `type:feature`     | New behaviour; usually a `feat` branch                    |
| `type:chore`       | Refactor, dependency, or maintenance; usually `chore`     |
| `area:frontend`    | Nuxt frontend                                             |
| `area:backend`     | Spring Boot backend                                       |
| `area:both`        | Frontend and backend                                      |

The default `bug`, `enhancement`, and `documentation` labels remain valid on old
issues; new issues use the `type:*` labels from the issue forms. Issue forms
record Area in the body, so add the matching `area:*` label during triage.

Create a label only if it is missing:

```bash
gh label list --search needs-refinement
gh label create needs-refinement --description "Backlog item with unmet Definition of Ready" --color "fbca04"
gh label create agent:ready --description "Hand-off for an agent to start" --color "0e8a16"
gh label create blocked --description "Waiting on a dependency or decision" --color "d73a4a"
```

Add or remove a label:

```bash
gh issue edit 42 --add-label needs-refinement
gh issue edit 42 --remove-label needs-refinement
gh issue edit 42 --add-label agent:ready
gh issue edit 42 --add-label blocked
gh issue edit 42 --remove-label blocked
```

When using `blocked`, add a comment that names the dependency or decision. Do
not change Status to communicate blocking.

## Commands

```bash
gh project view 7 --owner svIndicium
gh project field-list 7 --owner svIndicium
gh project item-list 7 --owner svIndicium --limit 200 --format json \
  --jq '.items[] | select(.content.number == 42) | {id, status, priority, size, estimate}'
gh project item-list 7 --owner svIndicium --query "label:needs-refinement -status:Done"
```

Add an issue that is not on the board:

```bash
gh project item-add 7 --owner svIndicium --url https://github.com/<owner>/<repo>/issues/42
```

Set one field per invocation:

```bash
gh project item-edit 7 --owner svIndicium --url <issue-url> --field "Status" --value "Ready"
gh project item-edit 7 --owner svIndicium --url <issue-url> --field "Status" --value "In progress"
gh project item-edit 7 --owner svIndicium --url <issue-url> --field "Status" --value "In review"
gh project item-edit 7 --owner svIndicium --url <issue-url> --field "Estimate" --number 3
gh project item-edit 7 --owner svIndicium --url <issue-url> --field "Size" --value "M"
gh project item-edit 7 --owner svIndicium --url <issue-url> --field "Priority" --value "P2"
```

`gh project item-edit` updates exactly one field per call. Run separate commands
and verify with `item-list`; do not try to batch fields into one invocation.

## Automation

GitHub Projects has a built-in workflow that sets `Done` when an item is closed.
Verify it at **Project 7 -> Settings -> Workflows -> Item closed -> Done**. If it
is enabled, merging a PR with `Closes #N` or closing the issue moves the item.
If it is disabled, ask the user to enable it or move the item manually; agents
must not merge or close.

## Scope reminder

Contribution status is deliberately out of scope. Never add it as a field,
label, column, filter, comment, or test assertion.
