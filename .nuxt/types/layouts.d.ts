import type { ComputedRef, MaybeRef } from 'vue'
export type LayoutKey = "content-container" | "footer" | "nav" | "nav-mobile" | "default"
declare module 'nuxt/app' {
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>
  }
}