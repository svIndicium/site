# Scratch templates

Create `tmp/<branch>/`, keeping the slashes, for example
`tmp/feat/42-add-passkey-login/`. Never commit anything in `tmp/`.

## `issue.json`

```json
{
  "number": 42,
  "title": "Add passkey login",
  "url": "https://github.com/<owner>/<repo>/issues/42",
  "labels": ["enhancement"],
  "body": "<full issue body>",
  "acceptance_criteria": [
    { "text": "A member can register a passkey.", "checked": false }
  ],
  "estimate": {
    "points": 3,
    "size": "M",
    "priority": "P2",
    "status": "confirmed"
  }
}
```

`acceptance_criteria` is an array of `{text, checked}` objects. In `estimate`,
`size` is scope and `points` is effort; they are independent. The object is:

- Confirmed values:
  `{"points":3,"size":"M","priority":"P2","status":"confirmed"}`.
- Skipped values:
  `{"status":"skipped","reason":"tiny chore; no estimate needed"}`.

`points` and `size` may be `null` for a tiny chore while `priority` is still set.

## `plan.md`

```md
# Plan: #42 Add passkey login

## Approach

...

## Files likely touched

- `path/to/backend/...`
- `path/to/frontend/...`

## Test plan

- [ ] Backend: `cd backend; .\gradlew.bat check`
- [ ] Frontend: `pnpm --filter frontend typecheck`
- [ ] Frontend: `pnpm --filter frontend lint`
- [ ] Frontend: `pnpm --filter frontend test:coverage`
- [ ] Manual: ...

## Risks

- ...

## Open questions

- ...
```
