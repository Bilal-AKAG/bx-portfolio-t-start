import type React from "react";

export interface Post {
  slug: string;
  meta: {
    title: string;
    tag: string;
    time: string;
    date: string;
    description: string;
    author?: string;
    [key: string]: any;
  };
  Content: React.ComponentType<any>;
}

// glob imports provide the default export (the component) and frontmatter 
// when configured with remark-mdx-frontmatter
export const postModules = import.meta.glob('../content/*.mdx', { eager: true }) as Record<string, { default: React.ComponentType<any>, frontmatter: any }>;

export function getPostSlugs() {
  return Object.keys(postModules).map((path) => {
    return path.replace('../content/', '').replace('.mdx', '');
  });
}

export function getPostBySlug(slug: string): Post | undefined {
  const fullPath = `../content/${slug}.mdx`;
  const module = postModules[fullPath];
  if (!module) return undefined;

  const meta = {
    title: "",
    tag: "",
    time: "",
    date: new Date().toISOString(),
    description: "",
    ...(module.frontmatter || {})
  };

  return {
    slug,
    meta,
    Content: module.default,
  };
}

export function getAllPosts(): Post[] {
  return Object.entries(postModules)
    .map(([path, module]) => {
      const slug = path.replace('../content/', '').replace('.mdx', '');
      const meta = {
        title: "",
        tag: "",
        time: "",
        date: new Date().toISOString(),
        description: "",
        ...(module.frontmatter || {})
      };

      return {
        slug,
        meta,
        Content: module.default,
      } as Post;
    })
    .sort((post1, post2) => (new Date(post1.meta.date) > new Date(post2.meta.date) ? -1 : 1));
}
