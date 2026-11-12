# Priority rubric

Priority is **triage only**: it answers "what should we look at first?", not
"when will this ship?". There are no sprints and no delivery commitments tied to
a priority. Leaving a Backlog item without a priority is fine.

## Scale

| Priority | Meaning             | Use when                                                                |
| -------- | ------------------- | ----------------------------------------------------------------------- |
| **P0**   | Drop everything     | Security breach, data loss/corruption, production outage, leaked secret |
| **P1**   | Next thing after P0 | Blocks the current focus, a release, or other in-progress work          |
| **P2**   | Normal backlog      | Planned feature, enhancement, or non-blocking bug with a workaround     |
| **P3**   | Nice-to-have        | Polish, refactor, docs, dev ergonomics, experiments                     |

## P0 examples for this repo

- Auth bypass, session fixation, a CSRF hole on a state-changing endpoint.
- A secret or provider credential exposed in git, logs, or an API response.
- PII visible to the wrong member, or a member can edit another member's data.
- Data loss or corruption, including a destructive or failed Flyway migration
  in production.
- The portal or API is down, or nobody can log in.
- A external sync bug that deactivates active members (the "never deactivate
  from a failed or partial read" rule is violated).

A P0 fix can still be 1 point. Fix it, then review properly; do not skip the
gates because it is urgent.

## P1 examples

- The thing the team agreed to work on now cannot proceed without this.
- A release blocker: CI red on `main`, the deploy pipeline broken, the Pages
  build failing.
- A core flow is broken with no reasonable workaround (login, profile view,
  passkey sign-in).
- Another issue in progress depends on this contract, migration, or config.
- A security weakness that is not exploitable today but must be closed before
  the current work ships.

## P2 examples

- Normal planned feature work: profile editing, passkey login, external sync.
- A bug with a workaround that affects some members.
- Refactors needed to keep delivery sane, when scheduled alongside feature work.
- Backlog items that are Ready and estimated but not currently being pulled.

## P3 examples

- Copy polish, spacing, icon changes, dark-mode niceties.
- Internal refactors with no user-visible effect and no current blocker.
- Developer ergonomics: Taskfile shortcuts, local scripts, editor config.
- Documentation improvements that are not required for a release.
- Spikes and experiments with no committed outcome.

## Tie-breakers

1. Security and data integrity beat availability.
2. Availability beats new delivery.
3. New delivery beats polish.
4. Prefer the smallest item that unblocks other people.
5. When two items are the same priority, pick the one with the nearer external
   deadline (DNS, provider access, a group meeting).

## When to set or change priority

- When an item is readied, started, or triaged.
- When a security report, incident, or production bug arrives.
- When the current focus changes, a dependency lands, or a workaround is found
  or lost.
- When the user explicitly asks.

Do not re-prioritize the whole board in one pass. Change the item in front of
you and explain why.

## Commands

```bash
gh project item-edit 7 --owner svIndicium --url <issue-url> --field "Priority" --value "P1"
```

Use the exact option names `P0`, `P1`, `P2`, `P3`. One field per call. Only run
after the user confirms.

A missing Priority is not a blocker for a Backlog item and not a reason to
refuse starting a `chore` or `docs` issue. If it matters, propose one and ask
once.
