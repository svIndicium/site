
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T> = DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>> & T

type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }> & T


export const Calendar: typeof import("../components/Calendar.vue")['default']
export const ConscriboForm: typeof import("../components/ConscriboForm.vue")['default']
export const HelloWorld: typeof import("../components/HelloWorld.vue")['default']
export const Hero: typeof import("../components/Hero.vue")['default']
export const HeroBackground: typeof import("../components/HeroBackground.vue")['default']
export const JobOffers: typeof import("../components/JobOffers.vue")['default']
export const LinkCard: typeof import("../components/LinkCard.vue")['default']
export const Loading: typeof import("../components/Loading.vue")['default']
export const LogoElement: typeof import("../components/LogoElement.vue")['default']
export const Map: typeof import("../components/Map.vue")['default']
export const MenuItem: typeof import("../components/MenuItem.vue")['default']
export const NavLogo: typeof import("../components/NavLogo.vue")['default']
export const SvgoVideoGameControllerIconDesignedByMaicoAmorimModifiedForIndicium: typeof import("../assets/icons/Video_game_controller_icon_designed_by_Maico_Amorim_Modified_for_Indicium")['default']
export const SvgoAddCart: typeof import("../assets/icons/add-cart")['default']
export const SvgoCancelPayment: typeof import("../assets/icons/cancel-payment")['default']
export const SvgoDataNotFound: typeof import("../assets/icons/data-not-found")['default']
export const SvgoDeleteCart: typeof import("../assets/icons/delete-cart")['default']
export const SvgoForceUpdatePayments: typeof import("../assets/icons/force-update-payments")['default']
export const SvgoHero: typeof import("../assets/icons/hero")['default']
export const SvgoIndicium418: typeof import("../assets/icons/indicium_418")['default']
export const SvgoPaymentHistory: typeof import("../assets/icons/payment-history")['default']
export const SvgoSuccessfulPayment: typeof import("../assets/icons/successful-payment")['default']
export const SvgoUnderconstruction: typeof import("../assets/icons/underconstruction")['default']
export const NuxtWelcome: typeof import("../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/app/components/welcome.vue")['default']
export const NuxtLayout: typeof import("../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/app/components/nuxt-layout")['default']
export const NuxtErrorBoundary: typeof import("../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
export const ClientOnly: typeof import("../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/app/components/client-only")['default']
export const DevOnly: typeof import("../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/app/components/dev-only")['default']
export const ServerPlaceholder: typeof import("../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const NuxtLink: typeof import("../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/app/components/nuxt-link")['default']
export const NuxtLoadingIndicator: typeof import("../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
export const NuxtTime: typeof import("../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
export const NuxtImg: typeof import("../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
export const NuxtPicture: typeof import("../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
export const NuxtIcon: typeof import("../node_modules/.pnpm/nuxt-svgo@4.2.6_magicast@0._8d67ed0919ab49d1a9d86ace0c09305f/node_modules/nuxt-svgo/dist/runtime/components/nuxt-icon.vue")['default']
export const NuxtPage: typeof import("../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/pages/runtime/page")['default']
export const NoScript: typeof import("../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/head/runtime/components")['NoScript']
export const Link: typeof import("../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/head/runtime/components")['Link']
export const Base: typeof import("../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/head/runtime/components")['Base']
export const Title: typeof import("../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/head/runtime/components")['Title']
export const Meta: typeof import("../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/head/runtime/components")['Meta']
export const Style: typeof import("../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/head/runtime/components")['Style']
export const Head: typeof import("../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/head/runtime/components")['Head']
export const Html: typeof import("../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/head/runtime/components")['Html']
export const Body: typeof import("../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/head/runtime/components")['Body']
export const NuxtIsland: typeof import("../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/app/components/nuxt-island")['default']
export const LazyCalendar: LazyComponent<typeof import("../components/Calendar.vue")['default']>
export const LazyConscriboForm: LazyComponent<typeof import("../components/ConscriboForm.vue")['default']>
export const LazyHelloWorld: LazyComponent<typeof import("../components/HelloWorld.vue")['default']>
export const LazyHero: LazyComponent<typeof import("../components/Hero.vue")['default']>
export const LazyHeroBackground: LazyComponent<typeof import("../components/HeroBackground.vue")['default']>
export const LazyJobOffers: LazyComponent<typeof import("../components/JobOffers.vue")['default']>
export const LazyLinkCard: LazyComponent<typeof import("../components/LinkCard.vue")['default']>
export const LazyLoading: LazyComponent<typeof import("../components/Loading.vue")['default']>
export const LazyLogoElement: LazyComponent<typeof import("../components/LogoElement.vue")['default']>
export const LazyMap: LazyComponent<typeof import("../components/Map.vue")['default']>
export const LazyMenuItem: LazyComponent<typeof import("../components/MenuItem.vue")['default']>
export const LazyNavLogo: LazyComponent<typeof import("../components/NavLogo.vue")['default']>
export const LazySvgoVideoGameControllerIconDesignedByMaicoAmorimModifiedForIndicium: LazyComponent<typeof import("../assets/icons/Video_game_controller_icon_designed_by_Maico_Amorim_Modified_for_Indicium")['default']>
export const LazySvgoAddCart: LazyComponent<typeof import("../assets/icons/add-cart")['default']>
export const LazySvgoCancelPayment: LazyComponent<typeof import("../assets/icons/cancel-payment")['default']>
export const LazySvgoDataNotFound: LazyComponent<typeof import("../assets/icons/data-not-found")['default']>
export const LazySvgoDeleteCart: LazyComponent<typeof import("../assets/icons/delete-cart")['default']>
export const LazySvgoForceUpdatePayments: LazyComponent<typeof import("../assets/icons/force-update-payments")['default']>
export const LazySvgoHero: LazyComponent<typeof import("../assets/icons/hero")['default']>
export const LazySvgoIndicium418: LazyComponent<typeof import("../assets/icons/indicium_418")['default']>
export const LazySvgoPaymentHistory: LazyComponent<typeof import("../assets/icons/payment-history")['default']>
export const LazySvgoSuccessfulPayment: LazyComponent<typeof import("../assets/icons/successful-payment")['default']>
export const LazySvgoUnderconstruction: LazyComponent<typeof import("../assets/icons/underconstruction")['default']>
export const LazyNuxtWelcome: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/app/components/welcome.vue")['default']>
export const LazyNuxtLayout: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
export const LazyNuxtErrorBoundary: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
export const LazyClientOnly: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/app/components/client-only")['default']>
export const LazyDevOnly: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/app/components/dev-only")['default']>
export const LazyServerPlaceholder: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyNuxtLink: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/app/components/nuxt-link")['default']>
export const LazyNuxtLoadingIndicator: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
export const LazyNuxtTime: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
export const LazyNuxtImg: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
export const LazyNuxtPicture: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
export const LazyNuxtIcon: LazyComponent<typeof import("../node_modules/.pnpm/nuxt-svgo@4.2.6_magicast@0._8d67ed0919ab49d1a9d86ace0c09305f/node_modules/nuxt-svgo/dist/runtime/components/nuxt-icon.vue")['default']>
export const LazyNuxtPage: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/pages/runtime/page")['default']>
export const LazyNoScript: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/head/runtime/components")['NoScript']>
export const LazyLink: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/head/runtime/components")['Link']>
export const LazyBase: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/head/runtime/components")['Base']>
export const LazyTitle: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/head/runtime/components")['Title']>
export const LazyMeta: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/head/runtime/components")['Meta']>
export const LazyStyle: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/head/runtime/components")['Style']>
export const LazyHead: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/head/runtime/components")['Head']>
export const LazyHtml: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/head/runtime/components")['Html']>
export const LazyBody: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/head/runtime/components")['Body']>
export const LazyNuxtIsland: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/app/components/nuxt-island")['default']>

export const componentNames: string[]
