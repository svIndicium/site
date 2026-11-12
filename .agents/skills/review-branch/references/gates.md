# Gates

Local review is proportional to the change; CI still runs the full suite. Run
every applicable gate even when one fails, and log every gate — including skips.

## Gate configuration

Read `.opencode/scrum.json` and use its `checks` array:

```jsonc
"checks": [
  { "name": "lint", "command": "task lint", "when": "always" },
  { "name": "test", "command": "pnpm test", "when": "always" },
  { "name": "backend", "command": "cd backend; .\\gradlew.bat check", "when": "backend/**" }
]
```

- `when: "always"` runs on every change.
- Any other value is a glob matched against changed paths; run the gate when at
  least one path matches.
- Run each command exactly as configured. Use the platform's native shell and
  exit code; never pipe away the exit code.

If `.opencode/scrum.json` has no `checks`, infer commands from `AGENTS.md`,
`Taskfile.yml`, `package.json`, or the repository README. If no reliable command
is known, mark the gate `skipped` with a reason and make the verdict `blocked`;
do not invent a passing result.

For a skipped gate, keep the real command and mark `status: skipped` with a
reason such as `not applicable: no backend changes`.

## checks.log

Append one block per gate with the name, exact command, status, start time, exit
code, duration, reason when skipped, and full output:

```text
=== lint ===
command: task lint
status: pass
reason: null
started_at: 2026-01-01T12:00:00Z
exit_code: 0
duration_seconds: 12
```

Use `null` for a skipped gate's timestamps and exit code.

## Codegen / generated files

If the configured checks include a codegen or generated-file freshness command,
run it as configured. A rewrite caused by branch code is a **major** finding:
record the diff in `checks.log` and report it.

Review is read-only. Do not restore generated files and do not fix the source.
The author stages the regenerated files (or commits them) and reruns
`/review-branch`.

## Failure semantics

- A required gate that fails because of branch code is a `major` finding.
- A gate that cannot run for environmental reasons (missing tool, network, CI
  outage) is `skipped` with the reason; treat affected criteria as `unverified`,
  and the verdict is `blocked` unless another failure already dictates
  `changes_requested`.
- Do not overrule a failed gate with prose.
