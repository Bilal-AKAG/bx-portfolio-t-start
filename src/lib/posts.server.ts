import { createServerFn } from "@tanstack/react-start";

import { renderMarkdown } from "@/lib/markdown";
import { getAllPosts, getPostBySlug } from "@/lib/mdx";

export interface BlogPostMetaDto {
  title: string;
  tag: string;
  time: string;
  date: string;
  description: string;
  author?: string;
}

export interface BlogPostDto {
  slug: string;
  meta: BlogPostMetaDto;
  content: string;
}

export interface RenderedPostDto {
  post: BlogPostDto;
  rendered: {
    headings: Array<{
      id: string;
      text: string;
      level: number;
    }>;
    markup: string;
  };
}

function toBlogPostDto(
  post: ReturnType<typeof getPostBySlug>
): BlogPostDto | null {
  if (!post) {
    return null;
  }

  return {
    slug: post.slug,
    meta: {
      title: String(post.meta.title),
      tag: String(post.meta.tag),
      time: String(post.meta.time),
      date: String(post.meta.date),
      description: String(post.meta.description),
      author:
        typeof post.meta.author === "string" ? post.meta.author : undefined,
    },
    content: post.content,
  };
}

export const getPosts = createServerFn({ method: "GET" }).handler(async () => {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
    meta: {
      title: String(post.meta.title),
      tag: String(post.meta.tag),
      time: String(post.meta.time),
      date: String(post.meta.date),
      description: String(post.meta.description),
      author:
        typeof post.meta.author === "string" ? post.meta.author : undefined,
    },
    content: post.content,
  })) satisfies BlogPostDto[];
});

export const getRenderedPost = createServerFn({ method: "GET" })
  .inputValidator((input: { slug: string }) => input)
  .handler(async ({ data }) => {
    const post = toBlogPostDto(getPostBySlug(data.slug));

    if (!post) {
      return null;
    }

    const rendered = await renderMarkdown(post.content);

    return {
      post,
      rendered: {
        headings: rendered.headings.map((heading) => ({
          id: heading.id,
          text: heading.text,
          level: heading.level,
        })),
        markup: rendered.markup,
      },
    } satisfies RenderedPostDto;
  });
