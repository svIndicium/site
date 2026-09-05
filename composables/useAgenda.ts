// Agenda wiring (SSG-safe, client-side). Pure domain helpers live in
// `utils/agenda.ts`; this module re-exports them (backward compatible for
// existing `~/composables/useAgenda` imports) and adds only the Nuxt wiring.
// No server: static prerender + ClientOnly skeleton, fetch runs client-side
// at hydration with `timeMin = now` so pages never freeze build-time data.
export * from '../utils/agenda';
import { AGENDA_API_KEY } from '../utils/agenda';

/** Config ergonomics only: `runtimeConfig.public.agendaApiKey`
 * (`NUXT_PUBLIC_AGENDA_API_KEY`) overrides the placeholder below, but it is
 * still serialized into the client bundle (pure SSG, no server). The sole
 * real mitigation is a Google Cloud referrer restriction on the key itself
 * (user action in Cloud Console). */
export function getAgendaApiKey(): string {
  try {
    const key = useRuntimeConfig().public.agendaApiKey as string | undefined;
    return key || AGENDA_API_KEY;
  } catch {
    return AGENDA_API_KEY;
  }
}
