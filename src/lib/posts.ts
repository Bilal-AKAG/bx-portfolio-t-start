import { createSource } from "fumadocs-core/source";
import { defineConfig } from "fumadocs-mdx/config";
import type { PostMeta } from "./types"; // create this or inline

const source = createSource({
  baseUrl: "/blog",
  contentDir: "/content",           // your existing folder
  source: defineConfig({}),        // uses source.config.ts
});

export type Post = {
  slug: string;
  meta: PostMeta;
  content: React.ComponentType;   // the compiled MDX component
};

export async function getAllPosts(): Promise<Post[]> {
  const posts = await source.getPages();
  return posts
    .map((page) => ({
      slug: page.slugs.join("/"),
      meta: page.data as PostMeta,
      content: page.data.body,
    }))
    .sort((a, b) => (b.meta.date > a.meta.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const page = await source.getPage([slug]);
  if (!page) return null;

  return {
    slug,
    meta: page.data as PostMeta,
    content: page.data.body,
  };
}