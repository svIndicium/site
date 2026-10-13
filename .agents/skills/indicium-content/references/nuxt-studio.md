# Nuxt Studio integration

`nuxt-studio` (a preview pin — see `package.json`) lets non-technical staff edit content visually (TipTap) or via generated forms, and commit changes to the repo. Key integration points are in `nuxt.config.ts` and `content.config.ts`.

## Why components must be globally registered
Studio's `/` slash-command only lists MDC components that are **globally registered** (MDC resolves block components by name). `components/content/` components are auto-global; root `components/` ones are not.

Register every component you use in Markdown via `components:extend` in `nuxt.config.ts`. The list must track the MDC block tags actually used in `content/`, so read it there rather than reproducing it:
```ts
hooks: {
  'components:extend': (components) => {
    // Names of components used as MDC block tags in content/**.
    const mdc: Record<string, true> = { /* MySection: true, MyChild: true, … */ };
    components.filter((c) => c.pascalName in mdc).forEach((c) => { c.global = true });
  },
},
```

## Editor component list (`studio.editor.components`)
Group components by label so the picker stays navigable; exclude the `Prose*` markdown renderers (redundant with native heading commands) and omit ungrouped ones. Keep the `include` patterns in sync with the registrations above — `nuxt.config.ts` is the source of truth:
```ts
studio: {
  editor: {
    components: {
      exclude: ['Prose*'],
      groups: [{ label: 'MyGroup', include: ['MySection', 'My*'] }],
      ungrouped: 'omit',
    },
  },
  repository: { provider: 'github', owner: '…', repo: '…', branch: '…' },
},
```
- Patterns match `component.name` = **pascalName**, so use pascal-case names or globs.
- `studio.repository` lets local `pnpm generate` build without CI env vars; otherwise nuxt-studio throws `Repository owner and repository name are required` (it only auto-detects the repo from CI env).

## Form Editor (collection schemas)
Schemas in `content.config.ts` drive Studio's generated forms. Primitive zod → inputs (string→text, boolean→toggle, enum→select, array of strings→badges, date→picker).

### `.editor()` metadata — zod version matters
`@nuxt/content` 3.x patches **zod v3's** `ZodType.prototype.editor`; the project uses **zod v4**, so:
- **WRONG with zod v4:** `z.string().editor({...})` → `TypeError: z.string(...).editor is not a function`.
- **CORRECT with zod v4:** wrap in `property()` from `@nuxt/content`:
```ts
import { defineCollection, property } from '@nuxt/content';
import { z } from 'zod';
description: property(z.string()).editor({ input: 'textarea', label: 'Description' }),
```
`property(...).editor(...)` works for zod v3, zod v4 (`zod/v4`), and valibot. Options: `input: 'media' | 'icon' | 'textarea'`, `label`, `description`, `tooltip`, `iconLibraries`.

**Chain `.editor()` onto the finished schema.** `property()` proxies zod methods and returns the
*raw* result, so `property(z.string().optional()).editor({…})` works and
`property(z.string()).optional().editor({…})` silently does nothing.

### What the form actually renders (read from the pinned build, not docs)
The widget is chosen as `editor.input ?? inferred type`; the value vocabulary is
`string | textarea | icon | media | date | datetime | number | boolean | array | object`.

| Behaviour | Detail |
|---|---|
| `tooltip` | ⚠️ **replaces** the label (`label: formItem.tooltip ? undefined : label`) — use `label` + `description`, not both tooltip and label |
| auto-detection | field id/key/title containing `icon` → Iconify picker; `photo|logo|src|cover|thumbnail|avatar|banner` → media picker. Set `input` explicitly to be independent of it |
| `enum` | renders a dropdown; an *optional* enum is hard to clear back to empty — prefer a string field with a documented vocabulary when "unset" matters |
| arrays | add / delete / **move up-down** in the UI; each row is labelled `1: <value>` from the item's `title`, `label` or `name` (else its first string) — name that field accordingly |
| `editor.hidden` | drops the field from the form entirely |
| colour | **no colour widget exists** in this build (no `InputColor`, no colour i18n strings) — text field or enum dropdown is the ceiling |

### Verify the schema the editor receives
```bash
curl localhost:3000/__nuxt_studio/meta          # component list + groups
grep -A6 '"<field>"' .nuxt/content/preview.mjs  # per-field $content.editor metadata
```

## Linking a URL to a collection (`data-content-id`)
Studio resolves the document to edit by scanning the DOM for **`[data-content-id]`** (host
`detectActives()` + a dblclick handler that walks up to the nearest marker), then maps that id
to a file with `generateFsPathFromId`.

- `@nuxt/content`'s `ContentRenderer` emits it — **dev/preview only** (`debug ? value.id : undefined`)
  — and for a **body-less document (a data collection)** it passes the marker as a *slot prop*,
  so a page that queries the collection itself gets nothing (the "Edit this page" affordance has no document).
- Fix: tag the element that represents that document with the queried doc's own id:
```vue
const contentId = import.meta.dev ? myDocument.value?.id : undefined;
```
```html
<div id="my-document" :data-content-id="contentId">…</div>
```
- The id is the collection name + source path (e.g. `<collection>/<source>`). One marker per document.
- Explicit affordance instead: `useNuxtApp().callHook('studio:document:edit', fsPath)`.
- If Studio is ever enabled outside dev, widen the gate to `import.meta.dev || import.meta.preview`.

## Locking what editors can insert
`studio.editor.iconLibraries` must list the **installed** `@iconify-json/*` collections
(keep it identical to the `@iconify-json/*` deps in `package.json`). Unset ⇒ the picker searches the whole Iconify catalogue (~150 collections)
and a picked icon from an uninstalled collection renders **empty** with only a server warning
(`[Icon] failed to load icon …`). Icons are configured in `nuxt.config.ts` as
`mode: 'svg'`, `provider: 'server'`, `fallbackToApi: false`,
`clientBundle.scan: true` (scan reads `content/**/*.yml|md`, so no manual icon list is needed).

## Verify without auth
`requireStudioAuth` returns early in dev. Start `nuxt dev`, then:
```
curl localhost:3000/__nuxt_studio/meta
```
`components.list` should list the components registered in `nuxt.config.ts`. The raw JSON also contains framework globals such as `Icon` from `@nuxt/icon`; `ungrouped: 'omit'` keeps those out of the editor UI.

## Production auth / login gate (roadmap)
In production builds Studio requires authentication. Current plan: a **Cloudflare Worker** acting as the Studio login gate (SSO/OAuth) so Studio edits are restricted to authorized staff. Not yet implemented — see `architecture.md`. Until then, production Studio auth must be configured via `studio.auth` / env (`STUDIO_GITHUB_TOKEN` etc.).

## Studio upgrade checklist (the pin is unreleased — see TD-057)
`package.json` pins Studio to a `main`-branch preview build, so a bump is not a normal dependency update. After any `nuxt-studio` / `@nuxt/content` change, re-verify:

1. `grep -A6 '"<field>"' .nuxt/content/preview.mjs` — `$content.editor` metadata (input/label/description) still lands on the schema nodes.
2. Form widgets: `InputWrapper`'s map and the `tooltip`-replaces-label behaviour (see the widget table above) — read `dist/app/main.js`.
3. `[data-content-id]` markers still emitted in dev/preview by `ContentRenderer`, and any page that hand-sets its own marker (see the `data-content-id` section) still opens its collection.
4. Nested drag handles inside component slots (upstream PR #490).
5. Icon handling: collections discovered, `clientBundle.scan` still reading `content/*.yml`, `mode: 'svg'` still inlining at prerender.
6. `/__nuxt_studio/meta` component list + groups still match `nuxt.config.ts`.

## Official docs
- <https://nuxt.studio/content> — editors, form editor, component integration
- <https://content.nuxt.com/docs/collections/validators> — zod v3/v4, valibot, `property().editor()`
