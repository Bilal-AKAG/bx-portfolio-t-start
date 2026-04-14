import { loader } from "fumadocs-core/source";
import { toFumadocsSource } from "fumadocs-mdx/runtime/server";

import { blog } from "../../.source/server";

export interface BlogPostMeta {
  title: string;
  description?: string;
  date: string | Date;
  tag?: string;
  time?: string;
  author?: string;
  image?: string;
  imageAlt?: string;
  keywords?: string[];
  modifiedTime?: string;
  publishedTime?: string;
  [key: string]: unknown;
}

export const blogSource = loader({
  baseUrl: "/blog",
  source: toFumadocsSource(blog, []),
});

export type BlogPage = ReturnType<typeof blogSource.getPage>;
export type BlogPages = ReturnType<typeof blogSource.getPages>;
