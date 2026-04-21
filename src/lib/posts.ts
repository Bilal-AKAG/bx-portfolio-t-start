import { createServerFn } from "@tanstack/react-start";
import { allPosts } from "content-collections";

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
  mdx: string;
}

type ContentCollectionPost = (typeof allPosts)[number];

function toPostMeta(post: ContentCollectionPost): BlogPostMetaDto {
  return {
    title: post.title,
    tag: post.tag,
    time: post.time,
    date: post.date,
    description: post.description,
    author: post.author,
    image: post.image,
    imageAlt: post.imageAlt,
    keywords: post.keywords,
    modifiedTime: post.modifiedTime,
    publishedTime: post.publishedTime,
  };
}

function toSlug(path: string): string {
  return path;
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

function getPost(slug: string): ContentCollectionPost | undefined {
  return allPosts.find((post) => toSlug(post._meta.path) === slug);
}

export const getPosts = createServerFn({ method: "GET" }).handler(async () => {
  const posts = allPosts
    .map((post) => {
      const slug = toSlug(post._meta.path);

      return {
        slug,
        path: post._meta.path,
        url: toPostUrl(slug),
        meta: toPostMeta(post),
      } satisfies BlogPostListItemDto;
    })
    .sort(comparePostsByDate);

  return posts;
});

export const getPostPage = createServerFn({ method: "GET" })
  .inputValidator((input: { slug: string }) => input)
  .handler(async ({ data }) => {
    const post = getPost(data.slug);

    if (!post) {
      return null;
    }

    const slug = toSlug(post._meta.path);

    return {
      slug,
      path: post._meta.path,
      url: toPostUrl(slug),
      meta: toPostMeta(post),
      mdx: post.mdx,
    } satisfies BlogPostPageDto;
  });
