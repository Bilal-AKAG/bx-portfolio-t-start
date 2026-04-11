import type { Root } from "hast";
import { toString } from "hast-util-to-string";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { visit } from "unist-util-visit";

export interface MarkdownHeading {
  id: string;
  text: string;
  level: number;
}

export interface MarkdownResult {
  headings: MarkdownHeading[];
  markup: string;
}

type HeadingNode = {
  type: "element";
  tagName: string;
  properties?: {
    id?: string;
    [key: string]: unknown;
  };
  children?: unknown[];
};

function isHeadingNode(node: unknown): node is HeadingNode {
  if (!node || typeof node !== "object") {
    return false;
  }

  const candidate = node as Partial<HeadingNode>;

  return (
    candidate.type === "element" &&
    typeof candidate.tagName === "string" &&
    /^h[1-6]$/.test(candidate.tagName)
  );
}

export async function renderMarkdown(content: string): Promise<MarkdownResult> {
  const headings: MarkdownHeading[] = [];

  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: "wrap",
      properties: { className: ["anchor"] },
    })
    .use(() => {
      return (tree) => {
        visit(tree, (node) => {
          if (!isHeadingNode(node)) {
            return;
          }

          const headingId =
            typeof node.properties?.id === "string" ? node.properties.id : "";

          headings.push({
            id: headingId,
            level: Number.parseInt(node.tagName.charAt(1), 10),
            text: toString(node as unknown as Root["children"][number]),
          });
        });
      };
    })
    .use(rehypeStringify)
    .process(content);

  return {
    headings,
    markup: String(result),
  };
}
