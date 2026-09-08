# Nuxt Studio integration

`nuxt-studio` 1.7.0 lets non-technical staff edit content visually (TipTap) or via generated forms, and commit changes to the repo. Key integration points are in `nuxt.config.ts` and `content.config.ts`.

## Why components must be globally registered
Studio's `/` slash-command only lists MDC components that are **globally registered** (MDC resolves block components by name). `components/content/` components are auto-global; root `components/` ones are not.

`nuxt.config.ts` registers the 9 homepage MDC components via `components:extend`:
```ts
hooks: {
  'components:extend': (components) => {
    const mdc: Record<string, true> = { HeroSection: true, HomeGrid: true, HomeMain: true,
      HomeAside: true, HomeImageCarousel: true, HomeTextBlock: true, HomePartners: true,
      ActivityCalendar: true, SocialSidebar: true };
    components.filter((c) => c.pascalName in mdc).forEach((c) => { c.global = true });
  },
},
```

## Editor component list (`studio.editor.components`)
```ts
studio: {
  editor: {
    components: {
      exclude: ['Prose*'], // hide @nuxt/content markdown renderers (ProseH1 etc.) — redundant with native heading commands
      groups: [{ label: 'Home', include: ['HeroSection','Home*','ActivityCalendar','SocialSidebar'] }],
      ungrouped: 'omit',
    },
  },
  repository: { provider: 'github', owner: 'svIndicium', repo: 'site', branch: 'main' },
},
```
- Patterns match `component.name` = **pascalName** (so `Home*` matches `HomeGrid` etc.). Use pascal-case/globs.
- `studio.repository` lets local `pnpm generate` build without CI env vars; otherwise nuxt-studio throws `Repository owner and repository name are required` (it only auto-detects repo from CI env).

## Form Editor (collection schemas)
Schemas in `content.config.ts` drive Studio's generated forms. Primitive zod → inputs (string→text, boolean→toggle, enum→select, array of strings→badges, date→picker).

### `.editor()` metadata — zod version matters
`@nuxt/content` 3.15.2 patches **zod v3's** `ZodType.prototype.editor`; the project uses **zod v4.4.3**, so:
- **WRONG with zod v4:** `z.string().editor({...})` → `TypeError: z.string(...).editor is not a function`.
- **CORRECT with zod v4:** wrap in `property()` from `@nuxt/content`:
```ts
import { defineCollection, property } from '@nuxt/content';
import { z } from 'zod';
description: property(z.string()).editor({ input: 'textarea', label: 'Description' }),
```
`property(...).editor(...)` works for zod v3, zod v4 (`zod/v4`), and valibot. Options: `input: 'media' | 'icon' | 'textarea'`, `label`, `description`, `tooltip`, `iconLibraries`.

## Verify without auth
`requireStudioAuth` returns early in dev. Start `nuxt dev`, then:
```
curl localhost:3000/__nuxt_studio/meta
```
`components.list` should be exactly the 9 homepage components; `groups` = Home; `ungrouped` = omit.

## Production auth / login gate (roadmap)
In production builds Studio requires authentication. Current plan: a **Cloudflare Worker** acting as the Studio login gate (SSO/OAuth) so Studio edits are restricted to authorized staff. Not yet implemented — see `architecture.md`. Until then, production Studio auth must be configured via `studio.auth` / env (`STUDIO_GITHUB_TOKEN` etc.).

## Official docs
- <https://nuxt.studio/content> — editors, form editor, component integration
- <https://content.nuxt.com/docs/collections/validators> — zod v3/v4, valibot, `property().editor()`
