---
description: Review the current issue branch and produce a validated review report
---

Load the `review-branch` skill (skill ID: `review-branch`) and follow it exactly.

Optional argument: the base ref to compare against. Use `$ARGUMENTS`; default to
`origin/main` when it is empty.

This command reviews only. Do not edit product code, commit, push, merge, or
close the issue. Scratch output goes to `tmp/<branch>/` and is never committed.
