# Board start

Project 7, owner `svIndicium`. This reference covers the board steps of
`/start-issue`; field definitions and label details live in
[`../../scrum-estimation/references/board.md`](../../scrum-estimation/references/board.md).

## Verify the item

```bash
gh project item-list 7 --owner svIndicium --limit 200 --format json \
  --jq '.items[] | select(.content.number == <number>) | {id, status, priority, size, estimate}'
```

If there is no output, add the issue:

```bash
gh project item-add 7 --owner svIndicium --url <issue-url>
```

## Status gate

- `Backlog` and `Ready` are both valid starting points; set Status to
  `In progress`.
- `In review` or `Done`: stop; work is already finished or in review.
- `In progress`: another worker may own it; ask before continuing.

## Labels and assignee

```bash
gh issue edit <number> --add-label agent:ready
gh issue edit <number> --remove-label needs-refinement
gh issue edit <number> --add-assignee @me
```

- `agent:ready` is the start hand-off. Add it when starting if it is missing; it
  is not limited to the Ready column.
- Remove `needs-refinement` only when the DoR essentials are met. Removing an
  absent label is harmless.
- Do not comment on the issue unless the user asks.

## Status

```bash
gh project item-edit 7 --owner svIndicium --url "<issue-url>" --field "Status" --value "In progress"
```

If the update is rejected, read the field options with
`gh project field-list 7 --owner svIndicium`; never invent a value.

## One field per call

`gh project item-edit` updates exactly one field per call. Run separate commands
and verify with `item-list`; do not batch fields into one invocation.

## Field fallback

If `item-list` omits a field, or a value looks stale, read the item again or use
`gh project field-list 7 --owner svIndicium` to get the exact option names. Do
not guess a Status, Priority, Size, or Estimate value, and do not overwrite a field this
start step did not set.
