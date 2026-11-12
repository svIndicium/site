# Team discussions

GitHub Discussions is the team's lightweight Confluence: a living place for
plans, proposals, guides, research and cross-repo knowledge. Issues are for work
that will be implemented; pull requests are for code.

## Category model

| Category          | Use it for                                                          |
| ----------------- | ------------------------------------------------------------------- |
| Announcements     | Maintainer updates and news                                         |
| General           | Team-wide conversation that does not fit another category           |
| Ideas & proposals | Pre-issue ideas, RFCs and design proposals                          |
| Guides & how-tos  | Living guides, onboarding notes, runbooks and how-tos               |
| Q&A               | Questions with a best answer                                        |
| Decisions         | Settled decisions, linked to the durable `ai-docs/` or issue record |
| Research          | Spikes, vendor comparisons, experiments and findings                |
| Show and tell     | Demos, experiments and things worth sharing                         |
| Polls             | Time-boxed team votes; record the outcome in Decisions              |

If a category is missing, post in General and ask a maintainer to add it.

## Issue vs discussion

Choose a discussion when the item is:

- exploratory, uncertain or needs opinions before it becomes work
- cross-repo or organisational knowledge
- a guide, runbook, onboarding note or evaluation
- a decision record that is not yet durable enough for `ai-docs/`

Choose an issue when the item has a clear outcome, acceptance criteria,
out-of-scope and verification, and someone will implement it on project 7.

It is fine to start with a discussion and create an issue later. Link the
discussion from the issue's `Context`; link the issue back from the discussion.

## Rules

- Search before creating. Add to an existing discussion instead of duplicating.
- One topic per discussion; use a statement or question as the title.
- Treat the first post as the living page. Edit it to keep the current answer,
  decisions and links at the top. Comments are for alternatives and evidence.
- Link issues (`#123`), pull requests, commits, docs and external sources.
- When the topic settles, record the outcome in the first post and move durable
  content to `ai-docs/` or the issue. Discussions is the working surface, not the
  system of record.
- Never post credentials, tokens, member data or other personal data.
- Agents may read discussions. Create or update one only when the user asks.
- Contribution status is never stored, displayed or gated on.

## Agents

Before creating an issue, search Discussions for related plans and decisions.
When an issue comes from a discussion, include the discussion link in `Context`.
Do not post to Discussions during review, finish or PR creation.
