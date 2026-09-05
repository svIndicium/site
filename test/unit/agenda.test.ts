import { describe, expect, it } from 'vitest';
import {
  AGENDA_MAX_RESULTS,
  AGENDA_PAGE_SIZE,
  addAgendaMonths,
  agendaEndYear,
  buildAgendaUrl,
  chunkEvents,
  dedupeConsecutiveEvents,
  formatAgendaTime,
  getAgendaLocationLink,
  matchAgendaShortName,
  normalizeLocationKey,
  normalizeSummaryKey,
  paginateEvents,
  parseAgendaEvents,
  sanitizeAgendaPageSize,
  totalAgendaPages,
  type AgendaEvent,
  type AgendaLocationEntry,
  type AgendaRawEvent,
} from '../../composables/useAgenda';

const NOW = new Date('2026-09-05T12:00:00+02:00').getTime();

function raw(overrides: Partial<AgendaRawEvent> & { id: string }): AgendaRawEvent {
  return {
    status: 'confirmed',
    summary: 'Verenigingsavond',
    start: { dateTime: '2026-09-10T19:30:00+02:00' },
    end: { dateTime: '2026-09-10T23:00:00+02:00' },
    ...overrides,
  };
}

function parsed(overrides: Partial<AgendaEvent> = {}): AgendaEvent {
  return {
    id: 'x',
    summary: 'Verenigingsavond',
    location: '',
    start: new Date('2026-09-10T19:30:00+02:00'),
    end: new Date('2026-09-10T23:00:00+02:00'),
    isAllDay: false,
    ...overrides,
  };
}

describe('normalizeSummaryKey', () => {
  it('collapses case and whitespace', () => {
    expect(normalizeSummaryKey('  VerenigingsAvond  ')).toBe('verenigingsavond');
    expect(normalizeSummaryKey('Spelletjes  avond')).toBe('spelletjes avond');
  });
});

describe('normalizeLocationKey', () => {
  it('flattens accents, whitespace and symbols, keeping delimiters', () => {
    expect(normalizeLocationKey('Science Café Hideout')).toBe('sciencecafehideout');
    expect(normalizeLocationKey('Poolcafé Hart Van Utrecht 🎱, Ganzenmarkt 16B')).toBe(
      'poolcafehartvanutrecht,ganzenmarkt16b',
    );
  });
});

describe('parseAgendaEvents', () => {
  it('keeps confirmed future events, sorted by start', () => {
    const items = [
      raw({ id: 'b', start: { dateTime: '2026-09-12T19:30:00+02:00' }, end: { dateTime: '2026-09-12T23:00:00+02:00' } }),
      raw({ id: 'a', start: { dateTime: '2026-09-10T19:30:00+02:00' }, end: { dateTime: '2026-09-10T23:00:00+02:00' } }),
    ];
    const result = parseAgendaEvents(items, NOW);
    expect(result.map((e) => e.id)).toEqual(['a', 'b']);
  });

  it('drops cancelled, dateless, invalid and past events', () => {
    const items = [
      raw({ id: 'cancelled', status: 'cancelled' }),
      raw({ id: 'past', start: { dateTime: '2026-09-01T19:30:00+02:00' }, end: { dateTime: '2026-09-01T23:00:00+02:00' } }),
      raw({ id: 'nodates', start: undefined, end: undefined }),
      raw({ id: 'baddate', start: { dateTime: 'not-a-date' }, end: { dateTime: 'not-a-date' } }),
    ];
    expect(parseAgendaEvents(items, NOW)).toEqual([]);
  });

  it('badges only true multi-day all-day events', () => {
    const [overnight] = parseAgendaEvents(
      [raw({ id: 'late', start: { dateTime: '2026-09-05T22:00:00+02:00' }, end: { dateTime: '2026-09-06T03:00:00+02:00' } })],
      NOW,
    );
    expect(overnight?.multiday_end).toBeUndefined();

    const [single] = parseAgendaEvents(
      [raw({ id: 's', start: { date: '2026-09-10' }, end: { date: '2026-09-11' } })],
      NOW,
    );
    expect(single?.multiday_end).toBeUndefined();

    const [weekend] = parseAgendaEvents(
      [raw({ id: 'w', start: { date: '2026-09-05' }, end: { date: '2026-09-08' } })],
      NOW,
    );
    expect(weekend?.isAllDay).toBe(true);
    expect(weekend?.multiday_end?.toISOString().slice(0, 10)).toBe('2026-09-07');
    expect(weekend?.multimonth_end).toBe(false);

    const [crossMonth] = parseAgendaEvents(
      [raw({ id: 'm', start: { date: '2026-09-30' }, end: { date: '2026-10-03' } })],
      NOW,
    );
    expect(crossMonth?.multiday_end?.toISOString().slice(0, 10)).toBe('2026-10-02');
    expect(crossMonth?.multimonth_end).toBe(true);
  });

  it('defaults missing titles', () => {
    const [ongoing] = parseAgendaEvents(
      [
        raw({
          id: 'o',
          summary: undefined,
          start: { dateTime: '2026-09-05T10:00:00+02:00' },
          end: { dateTime: '2026-09-05T14:00:00+02:00' },
        }),
      ],
      NOW,
    );
    expect(ongoing?.summary).toBe('(geen titel)');
  });

  it('skips nulls, synthesizes ids', () => {
    const [event] = parseAgendaEvents(
      [null as unknown as AgendaRawEvent, raw({ id: undefined as unknown as string })],
      NOW,
    );
    expect(event?.id).toBe('agenda-1');
  });
});

describe('dedupeConsecutiveEvents', () => {
  it('caps consecutive repeats at the given max', () => {
    const events = Array.from({ length: 5 }, (_, i) => parsed({ id: String(i) }));
    expect(dedupeConsecutiveEvents(events, 3)).toHaveLength(3);
  });

  it('caps runs, resetting on distinct titles, ignoring case and accents', () => {
    const events = [
      parsed({ id: '1', summary: 'Caféavond' }),
      parsed({ id: '2', summary: 'cafeavond' }),
      parsed({ id: '3', summary: 'Spelletjesavond' }),
      parsed({ id: '4', summary: 'CAFEAVOND' }),
      parsed({ id: '5', summary: 'Caféavond' }),
      parsed({ id: '6', summary: 'caféavond' }),
      parsed({ id: '7', summary: 'Caféavond' }),
    ];
    expect(dedupeConsecutiveEvents(events, 3).map((e) => e.id)).toEqual(['1', '2', '3', '4', '5', '6']);
  });
});

describe('pagination', () => {
  it('chunks into pages for stacked rendering', () => {
    const events = Array.from({ length: 5 }, (_, i) => parsed({ id: `e${i + 1}` }));
    const chunks = chunkEvents(events, 2);
    expect(chunks.map((c) => c.map((e) => e.id))).toEqual([
      ['e1', 'e2'],
      ['e3', 'e4'],
      ['e5'],
    ]);
  });

  it('slices 1-based pages, never zero', () => {
    const events = Array.from({ length: 12 }, (_, i) => parsed({ id: `e${i + 1}` }));
    expect(totalAgendaPages(0)).toBe(1);
    expect(totalAgendaPages(events.length, 5)).toBe(3);
    expect(paginateEvents(events, 2, 5).map((e) => e.id)).toEqual(['e6', 'e7', 'e8', 'e9', 'e10']);
    expect(paginateEvents(events, 3, 5)).toHaveLength(2);
  });

  it('sanitizes bad sizes and pages', () => {
    const events = Array.from({ length: 5 }, (_, i) => parsed({ id: `e${i + 1}` }));
    expect(sanitizeAgendaPageSize(0)).toBe(1);
    expect(sanitizeAgendaPageSize(NaN)).toBe(AGENDA_PAGE_SIZE);
    expect(chunkEvents(events, 0).map((c) => c.length)).toEqual([1, 1, 1, 1, 1]);
    expect(paginateEvents(events, NaN, 2).map((e) => e.id)).toEqual(['e1', 'e2']);
    expect(totalAgendaPages(NaN, 2)).toBe(1);
  });
});

describe('locations', () => {
  const entries: AgendaLocationEntry[] = [
    { match: 'Science Café HideOut', short: 'HideOut' },
    { match: 'HideOut', short: 'HideOut' },
    { match: 'Poolcafé Hart Van Utrecht', short: 'Poolcafé' },
  ];

  it('shortens pasted raw names on delimiter boundaries', () => {
    expect(matchAgendaShortName('Science Cafe HideOut', entries)).toBe('HideOut');
    expect(matchAgendaShortName('Science Café Hideout', entries)).toBe('HideOut');
    expect(
      matchAgendaShortName('Science Café HideOut, Heidelberglaan 15, 3584 CS Utrecht, Nederland', entries),
    ).toBe('HideOut');
    expect(matchAgendaShortName('Hideout Pizza Tiensestraat', entries)).toBe('Hideout Pizza Tiensestraat');
    expect(matchAgendaShortName('HL15.0.12', entries)).toBe('HL15.0.12');
  });

  it('shortens the pool venue to its nickname', () => {
    expect(matchAgendaShortName('Poolcafé Hart Van Utrecht 🎱, Ganzenmarkt 16B', entries)).toBe('Poolcafé');
  });

  it('links known rooms, queries the rest', () => {
    expect(getAgendaLocationLink('HideOut')).toContain('maps.google.com');
    expect(getAgendaLocationLink('HL15.0.12')).toContain('HL15');
    expect(getAgendaLocationLink('PL101, some address')).toContain('PL101');
    expect(getAgendaLocationLink('Somewhere Else')).toBe('https://maps.google.com/?q=Somewhere%20Else');
    expect(getAgendaLocationLink('toString')).toBe('https://maps.google.com/?q=toString');
  });
});

describe('buildAgendaUrl', () => {
  it('windows six months with bounded results', () => {
    const url = new URL(buildAgendaUrl(new Date('2026-09-05T12:00:00.000Z')));
    expect(url.searchParams.get('maxResults')).toBe(String(AGENDA_MAX_RESULTS));
    expect(url.searchParams.get('timeMin')).toBe('2026-09-05T12:00:00.000Z');
    // Six calendar months ahead; the wall-clock hour may shift on DST.
    const timeMax = new Date(url.searchParams.get('timeMax') ?? '');
    expect([timeMax.getFullYear(), timeMax.getMonth(), timeMax.getDate()]).toEqual([2027, 2, 5]);
  });

  it('clamps month overflow (Aug 31 + 6 → Feb 28)', () => {
    const max = addAgendaMonths(new Date('2026-08-31T12:00:00.000Z'), 6);
    expect([max.getFullYear(), max.getMonth(), max.getDate()]).toEqual([2027, 1, 28]);
  });
});

describe('formatting', () => {
  it('pins times to Europe/Brussels', () => {
    expect(formatAgendaTime(new Date('2026-09-05T19:30:00+02:00'))).toBe('19:30');
  });

  it('surfaces the end year only across years', () => {
    expect(
      agendaEndYear(new Date('2026-12-31T10:00:00+01:00'), new Date('2027-01-02T10:00:00+01:00')),
    ).toBe('2027');
    expect(
      agendaEndYear(new Date('2026-09-05T10:00:00+02:00'), new Date('2026-09-07T10:00:00+02:00')),
    ).toBeNull();
  });
});
