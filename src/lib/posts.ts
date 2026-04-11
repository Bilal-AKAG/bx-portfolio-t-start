import { createServerFn } from "@tanstack/react-start";

import { blogSource } from "@/lib/source";

export interface BlogPostMetaDto {
  title: string;
  tag: string;
  time: string;
  date: string;
  description: string;
  author?: string;
}

export interface BlogPostListItemDto {
  slug: string;
  path: string;
  url: string;
  meta: BlogPostMetaDto;
}

export interface BlogPostPageDto {
  slug: string;
  path: string;
  url: string;
  meta: BlogPostMetaDto;
}

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null;
}

function getStringValue(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function getDateValue(value: unknown): string {
  if (value instanceof Date) {
    return value.toISOString();
  }

  if (typeof value === "string" && value.length > 0) {
    return value;
  }

  return new Date().toISOString();
}

function normalizePostMeta(meta: unknown): BlogPostMetaDto {
  const record = isRecord(meta) ? meta : {};

  return {
    title: getStringValue(record.title),
    tag: getStringValue(record.tag),
    time: getStringValue(record.time),
    date: getDateValue(record.date),
    description: getStringValue(record.description),
    author: typeof record.author === "string" ? record.author : undefined,
  };
}

export const getPosts = createServerFn({ method: "GET" }).handler(async () => {
  const posts = blogSource
    .getPages()
    .map((page) => ({
      slug: page.slugs.join("/"),
      path: page.path,
      url: page.url,
      meta: normalizePostMeta(page.data),
    }))
    .sort((firstPost, secondPost) =>
      firstPost.meta.date < secondPost.meta.date ? 1 : -1
    );

  return posts satisfies BlogPostListItemDto[];
});

export const getPostPage = createServerFn({ method: "GET" })
  .inputValidator((input: { slug: string }) => input)
  .handler(async ({ data }) => {
    const page = blogSource.getPage([data.slug]);

    if (!page) {
      return null;
    }

    return {
      slug: page.slugs.join("/"),
      path: page.path,
      url: page.url,
      meta: normalizePostMeta(page.data),
    } satisfies BlogPostPageDto;
  });
