import { defineContentConfig, defineCollection, property } from '@nuxt/content';
import { z } from 'zod';

// Collection schemas validate frontmatter, type query results, and drive Nuxt Studio's Form Editor.
//
// Two collection kinds:
//  - type: 'data'  (YAML, no Markdown body) -> fields live at the TOP level of the query result,
//    NOT under `.meta` (with a schema `meta` is `{}`). Consume as `item.items`, `item.address`, ...
//  - type: 'page'  (Markdown + body) -> gets native `title` / `description` automatically, so those
//    need no schema entry; schemas cover custom frontmatter only.
export default defineContentConfig({
  collections: {
    // Top navigation menu (NavDesktop.vue / NavMobile.vue).
    navigation: defineCollection({
      source: 'navigation.yml',
      type: 'data',
      schema: z.object({
        items: z.array(
          z.object({
            title: z.string(), // menu label
            url: z.string(), // internal route
            children: z // dropdown submenu (optional; absent for leaf items like "Lid worden")
              .array(z.object({ title: z.string(), url: z.string() }))
              .optional(),
          }),
        ),
      }),
    }),

    // Homepage (`/`) frontmatter: title + SEO description (pages/index.vue).
    home: defineCollection({
      source: 'index.md',
      type: 'page',
      schema: z.object({
        title: z.string(),
        description: property(z.string()).editor({
          input: 'textarea',
          label: 'Description',
          description: 'Shown in search results and social shares',
        }),
      }),
    }),

    // Contact page (`/contact`) details (pages/Contact.vue).
    contact: defineCollection({
      source: 'contact.yml',
      type: 'data',
      schema: z.object({
        address: z.string(), // full address
        mapsUrl: z.string(), // Google Maps link to the address
        room: z.string(), // room number, e.g. 'HL15-4.092'
        kvk: z.string(), // Chamber of Commerce (KvK) number
      }),
    }),

    // Site footer (AppFooter.vue).
    footer: defineCollection({
      source: 'footer.yml',
      type: 'data',
      schema: z.object({
        items: z.array(z.object({ title: z.string(), url: z.string() })), // "Pagina's" column
        contactItems: z.object({
          address: z.string(),
          postcode: z.string(),
          lokaal: z.string(), // room, e.g. 'HL15-4.092'
          email: z.string(),
        }),
        socialMediaItems: z.array( // "Social media" column
          z.object({ title: z.string(), url: z.string() }),
        ),
      }),
    }),

    // Links page (`/links`, minimal layout) cards (pages/Links.vue).
    links: defineCollection({
      source: 'links.yml',
      type: 'data',
      schema: z.object({
        links: z.array(
          z.object({
            name: z.string(),
            url: z.string(),
            icon: z.string().optional(), // emoji or asset path; missing on the first ("Website") link
          }),
        ),
      }),
    }),

    // --- Page collections ---

    // "Over Indicium" page. NOTE: source `over-indicium.md` has no matching file and the page
    // (pages/over-indicium.vue) renders hardcoded content, so this collection is unused.
    about: defineCollection({
      source: 'over-indicium.md',
      type: 'page',
    }),

    // Board years (pages/Bestuur.vue = current, pages/besturen.vue = timeline).
    boards: defineCollection({
      source: 'boards/*.md',
      type: 'page',
      schema: z.object({
        year: z.string(), // e.g. '2024-2025'
        boardNumber: z.number(), // 1 = founding board, max = current board
        groupPhoto: z.string().optional(),
        members: z.array(
          z.object({
            name: z.string(),
            function: z.string(), // board role, e.g. 'Voorzitter'
            photo: z.string().optional(),
            email: z.string().optional(),
            figcaption: z.string().optional(), // photo credit
            responsibilities: z.array(z.string()).optional(),
            commissions: z.array(z.string()).optional(),
          }),
        ),
      }),
    }),

    // Partners + their job offers (pages/partners/index.vue, pages/partners/[partner].vue).
    // Partner index files carry `slug` + `tier` + logos; job-offer files carry `partnerSlug` + `url`.
    partners: defineCollection({
      source: 'partners/**/*.md',
      type: 'page',
      schema: z.object({
        slug: z.string().optional(), // partner page slug (index files only)
        title: z.string(),
        tier: z.enum(['main', 'premium', 'regular']).optional(), // partner tier
        partnerSlug: z.string().optional(), // job offer: links the offer to its partner slug
        imgUrl: z.string().optional(), // partner logo (light theme)
        imgUrlDark: z.string().optional(), // partner logo (dark theme)
        url: z.string().optional(), // external partner site / vacancy URL
        order: z.number().optional(), // sort order
        featured: z.boolean().optional(),
      }),
    }),

    // Commissies (committees), on /commissies (pages/Commissies.vue).
    commissies: defineCollection({
      source: 'commissies/*.md',
      type: 'page',
      schema: z.object({
        title: z.string(),
        imgUrl: z.string(),
        order: z.number(), // sort order
      }),
    }),

    // VCP (VertrouwensContactPersoon) members, on /vcp (pages/Vcp.vue).
    vcp: defineCollection({
      source: 'vcp/*.md',
      type: 'page',
      schema: z.object({
        name: z.string(),
        phonenumber: z.string(),
        email: z.string(),
        status: z.string(), // e.g. 'VCP Extern'
        photo: z.string(),
        order: z.number(), // sort order
        funfacts: z.array(z.string()),
      }),
    }),

    // Disputen (fraternities), on /dispuut (pages/Dispuut.vue).
    dispuut: defineCollection({
      source: 'dispuut/*.md',
      type: 'page',
      schema: z.object({
        title: z.string(),
        abbreviation: z.string().optional(), // e.g. 'DEV'
        imgUrl: z.string(),
        website: z.string().optional(),
        instagram: z.string().optional(),
      }),
    }),
  },
});
