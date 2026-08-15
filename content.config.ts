import { defineContentConfig, defineCollection, property } from '@nuxt/content';
import { z } from 'zod';

export default defineContentConfig({
  collections: {
    // YAML configuration files
    navigation: defineCollection({
      source: 'navigation.yml',
      type: 'data',
    }),

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

    contact: defineCollection({
      source: 'contact.yml',
      type: 'data',
    }),

    footer: defineCollection({
      source: 'footer.yml',
      type: 'data',
    }),

    links: defineCollection({
      source: 'links.yml',
      type: 'data',
    }),

    // Markdown collections
    about: defineCollection({
      source: 'over-indicium.md',
      type: 'page',
    }),

    boards: defineCollection({
      source: 'boards/*.md',
      type: 'page',
      schema: z.object({
        year: z.string(),
        boardNumber: z.number(),
        isCurrent: z.boolean().optional(),
        isFoundingBoard: z.boolean().optional(),
        groupPhoto: z.string().optional(),
        members: z.array(
          z.object({
            name: z.string(),
            function: z.string(),
            photo: z.string().optional(),
            email: z.string().optional(),
            figcaption: z.string().optional(),
            responsibilities: z.array(z.string()).optional(),
            commissions: z.array(z.string()).optional(),
          }),
        ),
      }),
    }),

    partners: defineCollection({
      source: 'partners/**/*.md',
      type: 'page',
      schema: z.object({
        slug: z.string().optional(),
        title: z.string(),
        tier: z.enum(['main', 'premium', 'regular']).optional(),
        partnerSlug: z.string().optional(), // for job offers
        imgUrl: z.string().optional(),
        imgUrlDark: z.string().optional(),
        url: z.string().optional(),
        order: z.number().optional(),
        featured: z.boolean().optional(),
      }),
    }),

    commissies: defineCollection({
      source: 'commissies/*.md',
      type: 'page',
      schema: z.object({
        title: z.string(),
        imgUrl: z.string(),
        order: z.number(),
      }),
    }),

    vcp: defineCollection({
      source: 'vcp/*.md',
      type: 'page',
      schema: z.object({
        name: z.string(),
        phonenumber: z.string(),
        email: z.string(),
        status: z.string(),
        photo: z.string(),
        order: z.number(),
        funfacts: z.array(z.string()),
      }),
    }),

    dispuut: defineCollection({
      source: 'dispuut/*.md',
      type: 'page',
      schema: z.object({
        title: z.string(),
        abbreviation: z.string().optional(),
        imgUrl: z.string(),
        website: z.string().optional(),
        instagram: z.string().optional(),
      }),
    }),
  },
});
