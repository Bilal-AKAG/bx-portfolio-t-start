import matter from "gray-matter";

interface PostMeta {
  title: string;
  tag: string;
  time: string;
  date: string;
  description: string;
  author?: string;
  [key: string]: unknown;
}

export interface Post {
  slug: string;
  meta: PostMeta;
  content: string;
}

const postFiles = import.meta.glob("../content/*.mdx", {
  eager: true,
  import: "default",
  query: "?raw",
}) as Record<string, string>;

const defaultMeta: PostMeta = {
  date: new Date().toISOString(),
  description: "",
  tag: "",
  time: "",
  title: "",
};

function parsePost(path: string, source: string): Post {
  const slug = path.replace("../content/", "").replace(".mdx", "");
  const { content, data } = matter(source);

  const meta = {
    ...defaultMeta,
    ...(typeof data === "object" && data ? data : {}),
  } as PostMeta;

  return {
    slug,
    meta,
    content,
  };
}

export function getPostSlugs(): string[] {
  return Object.keys(postFiles).map((path) =>
    path.replace("../content/", "").replace(".mdx", "")
  );
}

export function getPostBySlug(slug: string): Post | undefined {
  const fullPath = `../content/${slug}.mdx`;
  const source = postFiles[fullPath];

  if (!source) {
    return undefined;
  }

  return parsePost(fullPath, source);
}

export function getAllPosts(): Post[] {
  return Object.entries(postFiles)
    .map(([path, source]) => parsePost(path, source))
    .sort((post1, post2) => (post1.meta.date > post2.meta.date ? -1 : 1));
}
