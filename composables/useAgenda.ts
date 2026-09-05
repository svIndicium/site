// Agenda calendar wiring + pure, unit-testable helpers.
// Calendar wiring; rotate IDs here.
export const AGENDA_CALENDAR_ID =
  'c_cb2b2ab9761bec69a9d24fd452f2d970d31755cf1c382272560d81fddca0e5e5@group.calendar.google.com';
export const AGENDA_API_KEY = 'AIzaSyBo4AYTvUouRsZbG4KiopyeIng_1UOdNyc';
export const AGENDA_ICS_URL = `https://calendar.google.com/calendar/ical/${encodeURIComponent(AGENDA_CALENDAR_ID)}/public/basic.ics`;
export const AGENDA_EMBED_URL = `https://calendar.google.com/calendar/embed?src=${encodeURIComponent(AGENDA_CALENDAR_ID)}&ctz=Europe%2FBrussels`;

export const AGENDA_PAGE_SIZE = 5;
export const AGENDA_MAX_CONSECUTIVE_SAME = 10;
// Bounds the fetch window.
export const AGENDA_WINDOW_MONTHS = 6;
export const AGENDA_MAX_RESULTS = 50;
export const AGENDA_TIME_ZONE = 'Europe/Brussels';

// Add months without overflowing short months.
export function addAgendaMonths(date: Date, months: number): Date {
  const result = new Date(date);
  const day = result.getDate();
  result.setMonth(result.getMonth() + months);
  if (result.getDate() < day) result.setDate(0);
  return result;
}

// Windowed events URL (timeMin..timeMax).
export function buildAgendaUrl(timeMin: Date, maxResults = AGENDA_MAX_RESULTS): string {
  const count = Number.isFinite(maxResults) ? Math.max(1, Math.floor(maxResults)) : AGENDA_MAX_RESULTS;
  const timeMax = addAgendaMonths(timeMin, AGENDA_WINDOW_MONTHS);
  const params = new URLSearchParams({
    key: AGENDA_API_KEY,
    orderBy: 'startTime',
    singleEvents: 'true',
    maxResults: String(count),
    timeMin: timeMin.toISOString(),
    timeMax: timeMax.toISOString(),
  });
  return `https://www.googleapis.com/calendar/v3/calendars/${AGENDA_CALENDAR_ID}/events?${params}`;
}

export interface AgendaRawEvent {
  id?: string;
  status: string;
  summary?: string;
  location?: string;
  start?: { date?: string; dateTime?: string };
  end?: { date?: string; dateTime?: string };
}

export interface AgendaEvent {
  id: string;
  summary: string;
  location: string;
  start: Date;
  end: Date;
  // True for all-day (date) events, false for timed (dateTime) ones.
  isAllDay: boolean;
  multiday_end?: Date;
  multimonth_end?: boolean;
}

// Flattened form both calendar values and mapping entries share: lowercase,
// no accents/whitespace/symbols, delimiters kept for boundary matching.
export function normalizeLocationKey(location: string): string {
  return location
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replaceAll(/[\s]+/g, '')
    .replace(/[^\p{L}\p{N},\-./()]/gu, '');
}

export function normalizeSummaryKey(summary: string): string {
  return summary
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .trim()
    .replaceAll(/\s+/g, ' ');
}

// Parse + filter raw items (confirmed, valid, unended).
export function parseAgendaEvents(items: AgendaRawEvent[], now = Date.now()): AgendaEvent[] {
  const parsed: AgendaEvent[] = [];
  items.forEach((event, index) => {
    if (!event || event.status !== 'confirmed' || !event.start || !event.end) return;
    const isAllDay = 'date' in event.start && event.start.date !== undefined;
    const rawStart = 'date' in event.start ? event.start.date : event.start.dateTime;
    const rawEnd = 'date' in event.end ? event.end.date : event.end.dateTime;
    if (!rawStart || !rawEnd) return;
    const start = new Date(rawStart);
    const end = new Date(rawEnd);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return;
    if (end.getTime() < now) return;
    const parsedEvent: AgendaEvent = {
      id: event.id ?? `agenda-${index}`,
      summary: event.summary ?? '(geen titel)',
      location: event.location ?? '',
      start,
      end,
      isAllDay,
    };
    if (isAllDay) {
      // All-day ends are exclusive: subtract one calendar day (DST-safe, UTC).
      const lastDay = new Date(end.getTime() - 86400000);
      const sameDay =
        start.getUTCFullYear() === lastDay.getUTCFullYear() &&
        start.getUTCMonth() === lastDay.getUTCMonth() &&
        start.getUTCDate() === lastDay.getUTCDate();
      if (lastDay > start && !sameDay) {
        parsedEvent.multiday_end = lastDay;
        parsedEvent.multimonth_end = start.getUTCMonth() !== lastDay.getUTCMonth();
      }
    }
    // Timed events always show their start day only, even past midnight.
    parsed.push(parsedEvent);
  });
  return parsed.sort((a, b) => a.start.getTime() - b.start.getTime());
}

// Cap consecutive runs of the same title; interleaved titles reset the run.
export function dedupeConsecutiveEvents(
  events: AgendaEvent[],
  maxConsecutive = AGENDA_MAX_CONSECUTIVE_SAME,
): AgendaEvent[] {
  const kept: AgendaEvent[] = [];
  let runKey: string | null = null;
  let runLength = 0;
  for (const event of events) {
    const key = normalizeSummaryKey(event.summary);
    if (key === runKey) {
      runLength += 1;
    } else {
      runKey = key;
      runLength = 1;
    }
    if (runLength <= maxConsecutive) kept.push(event);
  }
  return kept;
}

// Floor to a usable size; garbage falls back.
export function sanitizeAgendaPageSize(value: number, fallback = AGENDA_PAGE_SIZE): number {
  return Number.isFinite(value) ? Math.max(1, Math.floor(value)) : fallback;
}

// 1-based page slice.
export function paginateEvents<T>(events: T[], page: number, pageSize = AGENDA_PAGE_SIZE): T[] {
  const safePage = Number.isFinite(page) ? Math.max(1, Math.floor(page)) : 1;
  const size = sanitizeAgendaPageSize(pageSize);
  return events.slice((safePage - 1) * size, safePage * size);
}

// Split into pages for stacked rendering.
export function chunkEvents<T>(events: T[], pageSize = AGENDA_PAGE_SIZE): T[][] {
  const size = sanitizeAgendaPageSize(pageSize);
  const chunks: T[][] = [];
  for (let i = 0; i < events.length; i += size) chunks.push(events.slice(i, i + size));
  return chunks;
}

export function totalAgendaPages(length: number, pageSize = AGENDA_PAGE_SIZE): number {
  const safeLength = Number.isFinite(length) ? Math.max(0, Math.floor(length)) : 0;
  return Math.max(1, Math.ceil(safeLength / sanitizeAgendaPageSize(pageSize)));
}

export interface AgendaLocationEntry {
  /** Human-readable; flattened before comparing, so paste raw names. */
  match: string;
  short: string;
}

// Fallback when the content collection is unreachable (tests, previews).
// Canonical mapping lives in content/agenda-locations.yml and wins.
export const AGENDA_DEFAULT_LOCATION_ENTRIES: AgendaLocationEntry[] = [
  { match: 'Science Café HideOut', short: 'HideOut' },
  { match: 'HideOut', short: 'HideOut' },
];

const LOCATION_DELIMITERS = [',', '-', '.', '/', '('];

// Longest delimiter-bound prefix match; shared by labels and links.
export function matchAgendaPrefix(key: string, prefixes: string[]): string | undefined {
  return prefixes
    .slice()
    .sort((a, b) => b.length - a.length)
    .find(
      (prefix) =>
        key === prefix || (key.startsWith(prefix) && LOCATION_DELIMITERS.includes(key[prefix.length] ?? '')),
    );
}

export function matchAgendaEntry(
  location: string,
  entries: AgendaLocationEntry[],
): AgendaLocationEntry | undefined {
  const key = normalizeLocationKey(location);
  const flat = entries.map((entry) => ({ entry, flat: normalizeLocationKey(entry.match) }));
  const match = matchAgendaPrefix(
    key,
    flat.map((item) => item.flat),
  );
  return flat.find((item) => item.flat === match)?.entry;
}

export function matchAgendaShortName(location: string, entries: AgendaLocationEntry[]): string {
  return matchAgendaEntry(location, entries)?.short ?? location;
}

const locationQueries: Record<string, string> = {
  hideout: 'Science Cafe Hideout',
  hl15: 'HL15 Leuven',
  pl101: 'PL101 Leuven',
  pl99: 'PL99 Leuven',
  ucs: 'UCS Leuven',
};

const locationQueryKeys = Object.keys(locationQueries);

export function getAgendaLocationLink(location: string): string {
  const key = normalizeLocationKey(location);
  const match = matchAgendaPrefix(key, locationQueryKeys);
  const query = (match !== undefined && Object.hasOwn(locationQueries, match)
    ? locationQueries[match]
    : undefined) ?? location;
  return `https://maps.google.com/?q=${encodeURIComponent(query)}`;
}

const dayFormatter = new Intl.DateTimeFormat('nl', { day: 'numeric', timeZone: AGENDA_TIME_ZONE });
const monthFormatter = new Intl.DateTimeFormat('nl', { month: 'short', timeZone: AGENDA_TIME_ZONE });
const yearFormatter = new Intl.DateTimeFormat('nl', { year: 'numeric', timeZone: AGENDA_TIME_ZONE });
const timeFormatter = new Intl.DateTimeFormat('nl-BE', {
  hour: '2-digit',
  minute: '2-digit',
  timeZone: AGENDA_TIME_ZONE,
});

export function formatAgendaDay(date: Date): string {
  return dayFormatter.format(date);
}

export function formatAgendaMonth(date: Date): string {
  return monthFormatter.format(date);
}

export function formatAgendaYear(date: Date): string {
  return yearFormatter.format(date);
}

export function formatAgendaTime(date: Date): string {
  return timeFormatter.format(date);
}

// Year only when the end year differs from the start year.
export function agendaEndYear(start: Date, end: Date): string | null {
  return formatAgendaYear(start) === formatAgendaYear(end) ? null : formatAgendaYear(end);
}
