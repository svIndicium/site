import type { MaybeRefOrGetter } from 'vue';

/** A string, ref, or getter so content-driven values stay reactive. */
type SeoText = MaybeRefOrGetter<string | undefined>;

interface PageSeoOptions {
  /** Value for `<meta name="description">`. */
  description?: SeoText;
  /** Value for `og:description`; falls back to `description` when unset. */
  ogDescription?: SeoText;
}

/**
 * Set a page's title, description, and OpenGraph equivalents.
 *
 * `og:title` mirrors the page title without the global `Indicium - %s` title
 * template, so social previews show e.g. "Contact" instead of
 * "Indicium - Contact". `og:description` falls back to `description`, so pages
 * with only one description do not need to pass it twice.
 */
export const usePageSeo = (title: SeoText, options: PageSeoOptions = {}) => {
  const hasDescription = options.description !== undefined || options.ogDescription !== undefined;

  useSeoMeta({
    title,
    ogTitle: title,
    ...(options.description !== undefined && { description: options.description }),
    ...(hasDescription && {
      ogDescription: () => toValue(options.ogDescription) || toValue(options.description),
    }),
  });
};
