import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import { z } from "zod";

const posts = defineCollection({
  name: "posts",
  directory: "src/content",
  include: "**/*.mdx",
  schema: z.object({
    author: z.string().optional(),
    content: z.string(),
    date: z.string(),
    description: z.string(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    keywords: z.array(z.string()).optional(),
    modifiedTime: z.string().optional(),
    publishedTime: z.string().optional(),
    tag: z.string(),
    time: z.string(),
    title: z.string(),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document);

    return {
      ...document,
      mdx,
      slug: document._meta.path,
      url: `/blog/${document._meta.path}`,
    };
  },
});

export default defineConfig({
  content: [posts],
});
