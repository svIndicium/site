
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

interface _GlobalComponents {
  'Calendar': typeof import("../../components/Calendar.vue")['default']
  'ConscriboForm': typeof import("../../components/ConscriboForm.vue")['default']
  'HelloWorld': typeof import("../../components/HelloWorld.vue")['default']
  'Hero': typeof import("../../components/Hero.vue")['default']
  'HeroBackground': typeof import("../../components/HeroBackground.vue")['default']
  'JobOffers': typeof import("../../components/JobOffers.vue")['default']
  'LinkCard': typeof import("../../components/LinkCard.vue")['default']
  'Loading': typeof import("../../components/Loading.vue")['default']
  'LogoElement': typeof import("../../components/LogoElement.vue")['default']
  'Map': typeof import("../../components/Map.vue")['default']
  'MenuItem': typeof import("../../components/MenuItem.vue")['default']
  'NavLogo': typeof import("../../components/NavLogo.vue")['default']
  'SvgoVideoGameControllerIconDesignedByMaicoAmorimModifiedForIndicium': typeof import("../../assets/icons/Video_game_controller_icon_designed_by_Maico_Amorim_Modified_for_Indicium")['default']
  'SvgoAddCart': typeof import("../../assets/icons/add-cart")['default']
  'SvgoCancelPayment': typeof import("../../assets/icons/cancel-payment")['default']
  'SvgoDataNotFound': typeof import("../../assets/icons/data-not-found")['default']
  'SvgoDeleteCart': typeof import("../../assets/icons/delete-cart")['default']
  'SvgoForceUpdatePayments': typeof import("../../assets/icons/force-update-payments")['default']
  'SvgoHero': typeof import("../../assets/icons/hero")['default']
  'SvgoIndicium418': typeof import("../../assets/icons/indicium_418")['default']
  'SvgoPaymentHistory': typeof import("../../assets/icons/payment-history")['default']
  'SvgoSuccessfulPayment': typeof import("../../assets/icons/successful-payment")['default']
  'SvgoUnderconstruction': typeof import("../../assets/icons/underconstruction")['default']
  'NuxtWelcome': typeof import("../../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/app/components/welcome.vue")['default']
  'NuxtLayout': typeof import("../../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/app/components/nuxt-layout")['default']
  'NuxtErrorBoundary': typeof import("../../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
  'ClientOnly': typeof import("../../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/app/components/client-only")['default']
  'DevOnly': typeof import("../../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/app/components/dev-only")['default']
  'ServerPlaceholder': typeof import("../../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/app/components/server-placeholder")['default']
  'NuxtLink': typeof import("../../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/app/components/nuxt-link")['default']
  'NuxtLoadingIndicator': typeof import("../../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
  'NuxtTime': typeof import("../../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
  'NuxtRouteAnnouncer': typeof import("../../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
  'NuxtImg': typeof import("../../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
  'NuxtPicture': typeof import("../../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
  'NuxtIcon': typeof import("../../node_modules/.pnpm/nuxt-svgo@4.2.6_magicast@0._8d67ed0919ab49d1a9d86ace0c09305f/node_modules/nuxt-svgo/dist/runtime/components/nuxt-icon.vue")['default']
  'NuxtPage': typeof import("../../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/pages/runtime/page")['default']
  'NoScript': typeof import("../../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/head/runtime/components")['NoScript']
  'Link': typeof import("../../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/head/runtime/components")['Link']
  'Base': typeof import("../../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/head/runtime/components")['Base']
  'Title': typeof import("../../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/head/runtime/components")['Title']
  'Meta': typeof import("../../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/head/runtime/components")['Meta']
  'Style': typeof import("../../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/head/runtime/components")['Style']
  'Head': typeof import("../../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/head/runtime/components")['Head']
  'Html': typeof import("../../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/head/runtime/components")['Html']
  'Body': typeof import("../../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/head/runtime/components")['Body']
  'NuxtIsland': typeof import("../../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/app/components/nuxt-island")['default']
  'LazyCalendar': LazyComponent<typeof import("../../components/Calendar.vue")['default']>
  'LazyConscriboForm': LazyComponent<typeof import("../../components/ConscriboForm.vue")['default']>
  'LazyHelloWorld': LazyComponent<typeof import("../../components/HelloWorld.vue")['default']>
  'LazyHero': LazyComponent<typeof import("../../components/Hero.vue")['default']>
  'LazyHeroBackground': LazyComponent<typeof import("../../components/HeroBackground.vue")['default']>
  'LazyJobOffers': LazyComponent<typeof import("../../components/JobOffers.vue")['default']>
  'LazyLinkCard': LazyComponent<typeof import("../../components/LinkCard.vue")['default']>
  'LazyLoading': LazyComponent<typeof import("../../components/Loading.vue")['default']>
  'LazyLogoElement': LazyComponent<typeof import("../../components/LogoElement.vue")['default']>
  'LazyMap': LazyComponent<typeof import("../../components/Map.vue")['default']>
  'LazyMenuItem': LazyComponent<typeof import("../../components/MenuItem.vue")['default']>
  'LazyNavLogo': LazyComponent<typeof import("../../components/NavLogo.vue")['default']>
  'LazySvgoVideoGameControllerIconDesignedByMaicoAmorimModifiedForIndicium': LazyComponent<typeof import("../../assets/icons/Video_game_controller_icon_designed_by_Maico_Amorim_Modified_for_Indicium")['default']>
  'LazySvgoAddCart': LazyComponent<typeof import("../../assets/icons/add-cart")['default']>
  'LazySvgoCancelPayment': LazyComponent<typeof import("../../assets/icons/cancel-payment")['default']>
  'LazySvgoDataNotFound': LazyComponent<typeof import("../../assets/icons/data-not-found")['default']>
  'LazySvgoDeleteCart': LazyComponent<typeof import("../../assets/icons/delete-cart")['default']>
  'LazySvgoForceUpdatePayments': LazyComponent<typeof import("../../assets/icons/force-update-payments")['default']>
  'LazySvgoHero': LazyComponent<typeof import("../../assets/icons/hero")['default']>
  'LazySvgoIndicium418': LazyComponent<typeof import("../../assets/icons/indicium_418")['default']>
  'LazySvgoPaymentHistory': LazyComponent<typeof import("../../assets/icons/payment-history")['default']>
  'LazySvgoSuccessfulPayment': LazyComponent<typeof import("../../assets/icons/successful-payment")['default']>
  'LazySvgoUnderconstruction': LazyComponent<typeof import("../../assets/icons/underconstruction")['default']>
  'LazyNuxtWelcome': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/app/components/welcome.vue")['default']>
  'LazyNuxtLayout': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
  'LazyNuxtErrorBoundary': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
  'LazyClientOnly': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/app/components/client-only")['default']>
  'LazyDevOnly': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/app/components/dev-only")['default']>
  'LazyServerPlaceholder': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/app/components/server-placeholder")['default']>
  'LazyNuxtLink': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/app/components/nuxt-link")['default']>
  'LazyNuxtLoadingIndicator': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
  'LazyNuxtTime': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
  'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
  'LazyNuxtImg': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
  'LazyNuxtPicture': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
  'LazyNuxtIcon': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt-svgo@4.2.6_magicast@0._8d67ed0919ab49d1a9d86ace0c09305f/node_modules/nuxt-svgo/dist/runtime/components/nuxt-icon.vue")['default']>
  'LazyNuxtPage': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/pages/runtime/page")['default']>
  'LazyNoScript': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/head/runtime/components")['NoScript']>
  'LazyLink': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/head/runtime/components")['Link']>
  'LazyBase': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/head/runtime/components")['Base']>
  'LazyTitle': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/head/runtime/components")['Title']>
  'LazyMeta': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/head/runtime/components")['Meta']>
  'LazyStyle': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/head/runtime/components")['Style']>
  'LazyHead': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/head/runtime/components")['Head']>
  'LazyHtml': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/head/runtime/components")['Html']>
  'LazyBody': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/head/runtime/components")['Body']>
  'LazyNuxtIsland': LazyComponent<typeof import("../../node_modules/.pnpm/nuxt@4.1.3_@electric-sql+pg_e6442f601a257188e9b7f3598ce4a271/node_modules/nuxt/dist/app/components/nuxt-island")['default']>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export {}
