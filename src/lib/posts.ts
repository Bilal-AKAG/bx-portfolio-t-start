import { parseMarkdown } from "@tanstack/markdown/parser";
import type { MarkdownDocument } from "@tanstack/markdown";
import { createServerFn } from "@tanstack/react-start";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

interface BlogPostMetaDto {
  title: string;
  tag: string;
  time: string;
  date: string;
  description: string;
  author?: string;
  image?: string;
  imageAlt?: string;
  keywords?: string[];
  modifiedTime?: string;
  publishedTime?: string;
}

interface BlogPostListItemDto {
  slug: string;
  path: string;
  url: string;
  meta: BlogPostMetaDto;
}

interface BlogPostPageDto {
  slug: string;
  path: string;
  url: string;
  meta: BlogPostMetaDto;
  markdown: string;
  document: MarkdownDocument;
}

interface RawFrontmatter {
  title?: string;
  tag?: string;
  time?: string;
  date?: string;
  description?: string;
  author?: string;
  image?: string;
  imageAlt?: string;
  keywords?: string[];
  modifiedTime?: string;
  publishedTime?: string;
}

const CONTENT_DIR = path.join(process.cwd(), "src/content");
const SUPPORTED_EXTENSIONS = new Set([".md", ".mdx"]);
const isProduction = process.env.NODE_ENV === "production";

// Module-level caches: content only changes on redeploy in production.
// Bypassed in dev so content edits show up without a server restart.
let listCache: Promise<BlogPostListItemDto[]> | null = null;
const pageCache = new Map<string, Promise<BlogPostPageDto | null>>();

function stripSurroundingQuotes(value: string): string {
  const trimmed = value.trim();

  if (trimmed.length >= 2) {
    const first = trimmed[0];
    const last = trimmed[trimmed.length - 1];

    if (
      (first === '"' && last === '"') ||
      (first === "'" && last === "'")
    ) {
      return trimmed.slice(1, -1);
    }
  }

  return trimmed;
}

function parseFrontmatterBlock(block: string): RawFrontmatter {
  const data: RawFrontmatter = {};
  const lines = block.split("\n");
  let currentKey: keyof RawFrontmatter | null = null;

  for (const line of lines) {
    const listItemMatch = line.match(/^\s*-\s*(.+)$/);

    if (listItemMatch?.[1] && currentKey) {
      const item = stripSurroundingQuotes(listItemMatch[1]);

      if (currentKey === "keywords") {
        data.keywords = [...(data.keywords ?? []), item];
      }

      continue;
    }

    const fieldMatch = line.match(/^([A-Za-z]+):\s*(.*)$/);

    if (!fieldMatch) {
      currentKey = null;
      continue;
    }

    const key = fieldMatch[1] as keyof RawFrontmatter;
    const rawValue = fieldMatch[2]?.trim() ?? "";

    if (rawValue === "") {
      currentKey = key;

      if (key === "keywords") {
        data.keywords = [];
      }

      continue;
    }

    currentKey = null;
    const value = stripSurroundingQuotes(rawValue);

    if (key === "keywords") {
      data.keywords = [value];
    } else {
      data[key] = value as string;
    }
  }

  return data;
}

function splitFrontmatter(raw: string): { data: RawFrontmatter; body: string } {
  const lines = raw.split("\n");

  if (lines[0]?.trim() !== "---") {
    throw new Error("Post is missing frontmatter (expected leading ---).");
  }

  const endIndex = lines.findIndex(
    (line, index) => index > 0 && line.trim() === "---"
  );

  if (endIndex < 0) {
    throw new Error("Post frontmatter is missing its closing ---.");
  }

  const data = parseFrontmatterBlock(lines.slice(1, endIndex).join("\n"));
  const body = lines.slice(endIndex + 1).join("\n").trimStart();

  return { body, data };
}

function toPostMeta(data: RawFrontmatter, fileName: string): BlogPostMetaDto {
  if (!data.title || !data.tag || !data.time || !data.date || !data.description) {
    throw new Error(
      `Post "${fileName}" is missing required frontmatter (title, tag, time, date, description).`
    );
  }

  return {
    title: data.title,
    tag: data.tag,
    time: data.time,
    date: data.date,
    description: data.description,
    author: data.author,
    image: data.image,
    imageAlt: data.imageAlt,
    keywords: data.keywords,
    modifiedTime: data.modifiedTime,
    publishedTime: data.publishedTime,
  };
}

/**
 * Minimal MDX interop: TanStack Markdown renders Markdown, not MDX.
 * Legacy `<FinalLink href="...">text</FinalLink>` blocks become standard links
 * so old `.mdx` files keep working without an MDX compiler.
 */
function normalizeLegacyMdx(body: string): string {
  return body.replace(
    /<FinalLink\s+href="([^"]+)"\s*>\s*([\s\S]*?)\s*<\/FinalLink>/g,
    (_match, href: string, text: string) => {
      const label = text.replace(/\s+/g, " ").trim() || href;
      return `[${label}](${href})`;
    }
  );
}

function toSlug(fileName: string): string {
  return fileName.replace(/\.(md|mdx)$/, "");
}

function toPostUrl(slug: string): string {
  return `/blog/${slug}`;
}

function comparePostsByDate(
  firstPost: BlogPostListItemDto,
  secondPost: BlogPostListItemDto
): number {
  if (firstPost.meta.date === secondPost.meta.date) {
    return 0;
  }

  return firstPost.meta.date < secondPost.meta.date ? 1 : -1;
}

async function readPostFile(
  fileName: string
): Promise<{ meta: BlogPostMetaDto; markdown: string; slug: string }> {
  const raw = await readFile(path.join(CONTENT_DIR, fileName), "utf8");
  const { body, data } = splitFrontmatter(raw);
  const markdown = normalizeLegacyMdx(body);

  return {
    markdown,
    meta: toPostMeta(data, fileName),
    slug: toSlug(fileName),
  };
}

async function readPostMeta(
  fileName: string
): Promise<{ meta: BlogPostMetaDto; slug: string }> {
  const raw = await readFile(path.join(CONTENT_DIR, fileName), "utf8");
  // List view only needs frontmatter: skip body normalization entirely.
  const { data } = splitFrontmatter(raw);

  return {
    meta: toPostMeta(data, fileName),
    slug: toSlug(fileName),
  };
}

async function readAllPosts(): Promise<BlogPostListItemDto[]> {
  const fileNames = (await readdir(CONTENT_DIR)).filter((fileName) =>
    SUPPORTED_EXTENSIONS.has(path.extname(fileName))
  );
  const posts = await Promise.all(
    fileNames.map(async (fileName) => {
      const { meta, slug } = await readPostMeta(fileName);

      return {
        slug,
        path: slug,
        url: toPostUrl(slug),
        meta,
      } satisfies BlogPostListItemDto;
    })
  );

  return posts.sort(comparePostsByDate);
}

function getCachedPosts(): Promise<BlogPostListItemDto[]> {
  if (!isProduction) {
    return readAllPosts();
  }

  if (!listCache) {
    listCache = readAllPosts();
  }

  return listCache;
}

export const getPosts = createServerFn({ method: "GET" }).handler(async () => {
  return getCachedPosts();
});

async function readPostPage(slug: string): Promise<BlogPostPageDto | null> {
  const fileNames = await readdir(CONTENT_DIR);
  const match = fileNames.find((fileName) => toSlug(fileName) === slug);

  if (!match) {
    return null;
  }

  const { markdown, meta, slug: postSlug } = await readPostFile(match);
  // Parse once on the server; the client reuses the AST without re-parsing.
  const document = parseMarkdown(markdown);

  return {
    slug: postSlug,
    path: postSlug,
    url: toPostUrl(postSlug),
    meta,
    markdown,
    document,
  };
}

function getCachedPostPage(slug: string): Promise<BlogPostPageDto | null> {
  if (!isProduction) {
    return readPostPage(slug);
  }

  const cached = pageCache.get(slug);

  if (cached) {
    return cached;
  }

  const pending = readPostPage(slug);
  pageCache.set(slug, pending);
  return pending;
}

export const getPostPage = createServerFn({ method: "GET" })
  .validator((input: { slug: string }) => input)
  .handler(async ({ data }): Promise<BlogPostPageDto | null> => {
    return getCachedPostPage(data.slug);
  });
