import { mockNuxtImport } from '@nuxt/test-utils/runtime';
// Locations are required (no fallback): provide the collection in tests.
mockNuxtImport('queryCollection', () => {
  return () => ({
    first: async () => ({
      locations: [
        { match: 'Science Café HideOut', short: 'HideOut', query: 'Science Cafe Hideout' },
        { match: 'HideOut', short: 'HideOut', query: 'Science Cafe Hideout' },
      ],
    }),
  });
});

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { clearNuxtData } from '#app';
import ActivityCalendar from '~/components/ActivityCalendar.vue';

function item(id: string, summary: string, dayOffset: number, location = '') {
  const start = new Date(Date.now() + dayOffset * 86400000);
  start.setHours(19, 30, 0, 0);
  const end = new Date(start.getTime() + 3.5 * 3600000);
  return {
    id,
    status: 'confirmed',
    summary,
    location,
    start: { dateTime: start.toISOString() },
    end: { dateTime: end.toISOString() },
  };
}

function mockFetch(items: unknown[] | null, ok = true) {
  vi.stubGlobal(
    'fetch',
    vi.fn(async () => ({
      ok,
      status: ok ? 200 : 500,
      json: async () => ({ items }),
    })),
  );
}

beforeEach(() => {
  vi.unstubAllGlobals();
  return clearNuxtData('activity-calendar');
});

describe('ActivityCalendar', () => {
  it('renders titles with short location labels and paginates', async () => {
    mockFetch([
      item('1', 'Verenigingsavond', 1),
      item('2', 'Verenigingsavond', 8),
      item('3', 'Verenigingsavond', 15),
      item('4', 'Verenigingsavond', 22),
      item('5', 'Spelletjesavond', 2, 'Science Cafe HideOut'),
      item('6', 'Filmavond', 3),
      item('7', 'Quizavond', 4),
    ]);
    const wrapper = await mountSuspended(ActivityCalendar);

    // Repeater capped: 4 same-titled + 3 distinct = 7 events over ≥2 pages.
    expect(wrapper.text()).toContain('Verenigingsavond');
    expect(wrapper.text()).toContain('@HideOut');
    expect(wrapper.text()).not.toContain('@Science Cafe HideOut');

    const status = wrapper.find('.pagination-status');
    expect(status.exists()).toBe(true);
    const fraction = status.text().match(/(\d+)\/(\d+)\s*$/) ?? [];
    expect(Number(fraction[2])).toBeGreaterThan(1);
    expect(fraction[1]).toBe('1');

    const before = wrapper.findAll('.events-page--active .event:not(.event--placeholder)').map((e) => e.text());
    await wrapper.find('button[aria-label="Volgende agenda-pagina"]').trigger('click');
    expect(wrapper.find('.pagination-status').text()).toMatch(/2\/\d+\s*$/);
    const after = wrapper.findAll('.events-page--active .event:not(.event--placeholder)').map((e) => e.text());
    expect(after.length).toBeGreaterThan(0);
    expect(after).not.toEqual(before);
  });

  it('shows an error on fetch failure', async () => {
    mockFetch(null, false);
    const wrapper = await mountSuspended(ActivityCalendar);
    expect(wrapper.text()).toContain('kon niet geladen worden');
  });

  it('distinguishes empty agendas from failures', async () => {
    mockFetch([]);
    const wrapper = await mountSuspended(ActivityCalendar);
    expect(wrapper.text()).toContain('geen activiteiten');
    expect(wrapper.text()).not.toContain('kon niet geladen worden');
  });

  it('caps visible pages through the max-pages prop', async () => {
    mockFetch([
      item('1', 'Verenigingsavond', 1),
      item('2', 'Spelletjesavond', 2),
      item('3', 'Filmavond', 3),
      item('4', 'Quizavond', 4),
      item('5', 'Borrel', 5),
      item('6', 'LAN-party', 6),
    ]);
    const wrapper = await mountSuspended(ActivityCalendar, { props: { pageSize: 2, maxPages: 1 } });
    expect(wrapper.find('.pagination-status').exists()).toBe(false);
    expect(
      wrapper.findAll('.events-page--active .event:not(.event--placeholder)'),
    ).toHaveLength(2);
  });
});
