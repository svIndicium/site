# Collection: `locations`

- **Source:** `content/agenda-locations.yml` · **Type:** `data` · **Schema:** yes
- **Used by:** the agenda calendar (short labels + Google Maps links for event locations).

## Fields

`locations[]`: `{ match, short, query? }` — `match` keys the calendar event
location string, `short` is the displayed label, `query` overrides the Maps
search string (defaults to `short ?? location`).

## Query

```ts
const { data } = await useAsyncData('agenda-locations', () => queryCollection('locations').first());
const entries = data.value?.locations; // TOP level — never `.meta?.locations`
```

## Notes

- Single source of truth: no TS fallback — a missing/empty collection drives
  the agenda component's `locationsMissing` error state instead of rendering
  degraded links. The runtime error UI is deliberate: it no longer throws in
  setup, so a missing/empty file does not fail `pnpm generate`.
- Tests mock this collection.
