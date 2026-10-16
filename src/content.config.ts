import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// One Markdown file per case study; the file name is the URL slug and must match a project id.
const caseStudies = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/case-studies" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      description: z.string().max(160),
      facts: z.array(z.object({ label: z.string(), value: z.string() })),
      stack: z.array(z.string()),
      links: z.array(z.object({ label: z.string(), href: z.url() })).default([]),
      inShort: z.array(z.string()).min(1).max(4),
      hero: z.object({ src: image(), alt: z.string() }),
      screens: z.array(z.object({ src: image(), alt: z.string(), caption: z.string() })).max(4).default([]),
    }),
});

export const collections = { "case-studies": caseStudies };
