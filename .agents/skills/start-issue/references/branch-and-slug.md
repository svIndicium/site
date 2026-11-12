# Branch type and slug

## Issue type -> branch type

Prefer the issue's `issueType`:

| Issue type | Branch type |
| ---------- | ----------- |
| `Feature`  | `feat`      |
| `Bug`      | `fix`       |
| `Task`     | `chore`     |

When `issueType` is missing or unknown, use the first match:

1. Conventional prefix in the title: `feat:`, `fix:`, `chore:`, `docs:`,
   `refactor:`, `test:`, `perf:`, `ci:`, `build:`.
2. Legacy label: `type:bug`/`bug` -> `fix`, `type:feature`/`enhancement` ->
   `feat`, `type:chore` -> `chore`, `documentation` -> `docs`, `dependencies` ->
   `build`.
3. Title prefix: `[Bug]` -> `fix`, `[Feature]` -> `feat`, `[Chore]` -> `chore`.
4. Otherwise `feat` for new behaviour, `chore` for maintenance. If it is
   genuinely ambiguous between `feat` and `fix`, ask.

## Slug

Lowercase ASCII, words separated by `-`, no punctuation, at most about 50
characters. Drop filler words such as "the", "a", and "and". Derive it from the
issue title, not the whole body.

Branch format: `<type>/<issue>-<slug>`, for example
`feat/42-add-passkey-login`, matching the `branchPattern` in
`.opencode/scrum.json` when present.

## Existence checks

```bash
git ls-remote --heads origin "<branch>"
git branch --list "<branch>"
```

Both must be empty. If the branch exists, stop and ask whether to reuse, rename,
or abandon it. Never delete or force-update a branch.

## Create it

```bash
git switch --no-track -c "<branch>" origin/main
```

- Do **not** use `gh issue develop`: it publishes the branch to `origin`, and
  agents must not push. The branch name and the eventual `Closes #<n>` PR body
  link the work to the issue.
- Do not use git worktrees; work in the main checkout.
- Do not create the branch from a dirty tree or a stale `main`.
- If the switch fails, stop and report; never force or delete a branch.
