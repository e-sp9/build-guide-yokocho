import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const guides = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/guides" }),
  schema: z.object({
    name: z.string().min(1),
    designer: z.string().min(1),
    description: z.string().min(1).max(280),
    descriptionEn: z.string().min(1).max(280).optional(),
    url: z.string().url(),
    tags: z.array(z.string().min(1)).min(1),
    tagsEn: z.array(z.string().min(1)).min(1).optional(),
    shopLinks: z
      .array(
        z.object({
          name: z.string().min(1),
          url: z.string().url(),
        })
      )
      .default([]),
    addedAt: z.coerce.date(),
  }),
});

export const collections = { guides };
