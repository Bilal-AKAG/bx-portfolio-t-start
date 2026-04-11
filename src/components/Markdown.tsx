import parse, {
  domToReact,
  type DOMNode,
  type Element as HtmlElement,
  type HTMLReactParserOptions,
} from "html-react-parser";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

interface MarkdownProps {
  content: string;
  className?: string;
}

function isHtmlElement(node: DOMNode): node is HtmlElement {
  return node.type === "tag";
}

export default function Markdown({ content, className }: MarkdownProps) {
  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (!isHtmlElement(domNode)) {
        return undefined;
      }

      const parserOptions: HTMLReactParserOptions = options;
      const children = domToReact(domNode.children as DOMNode[], parserOptions);

      if (domNode.name === "a") {
        const href = domNode.attribs.href;

        return (
          <a
            {...domNode.attribs}
            href={href}
            className={cn(
              "font-medium underline underline-offset-4 decoration-muted-foreground/50 transition-all hover:text-foreground hover:decoration-solid",
              domNode.attribs.class,
              domNode.attribs.className
            )}
            rel={
              domNode.attribs.target === "_blank"
                ? "noopener noreferrer"
                : domNode.attribs.rel
            }
          >
            {children}
          </a>
        );
      }

      if (domNode.name === "finallink") {
        const href = domNode.attribs.href;

        return (
          <a
            {...domNode.attribs}
            href={href}
            className={cn(
              "group flex w-fit items-center gap-1 font-mono text-sm text-foreground underline",
              domNode.attribs.class,
              domNode.attribs.className
            )}
            rel={
              domNode.attribs.target === "_blank"
                ? "noopener noreferrer"
                : domNode.attribs.rel
            }
          >
            <span>{children}</span>
            <ArrowRight
              size={10}
              className="inline-block -rotate-45 transform transition-transform duration-200 ease-out group-hover:translate-x-1 group-hover:-translate-y-0.5"
            />
          </a>
        );
      }

      if (domNode.name === "blockquote") {
        return (
          <blockquote
            {...domNode.attribs}
            className={cn(
              "border-l-2 border-border-secondary pl-6 italic text-foreground/70",
              domNode.attribs.class,
              domNode.attribs.className
            )}
          >
            {children}
          </blockquote>
        );
      }

      if (domNode.name === "code") {
        return (
          <code
            {...domNode.attribs}
            className={cn(
              "rounded-sm bg-secondary px-1.5 py-0.5 font-mono text-[0.9em] text-foreground",
              domNode.attribs.class,
              domNode.attribs.className
            )}
          >
            {children}
          </code>
        );
      }

      if (domNode.name === "pre") {
        return (
          <pre
            {...domNode.attribs}
            className={cn(
              "my-7 overflow-x-auto rounded-md border border-border bg-secondary/50 p-4",
              domNode.attribs.class,
              domNode.attribs.className
            )}
          >
            {children}
          </pre>
        );
      }

      if (domNode.name === "p") {
        return (
          <p
            {...domNode.attribs}
            className={cn(
              "text-pretty text-sm leading-7 text-muted-foreground",
              domNode.attribs.class,
              domNode.attribs.className
            )}
          >
            {children}
          </p>
        );
      }

      if (domNode.name === "li") {
        return (
          <li
            {...domNode.attribs}
            className={cn(
              "text-sm leading-7 text-foreground/80",
              domNode.attribs.class,
              domNode.attribs.className
            )}
          >
            {children}
          </li>
        );
      }

      if (domNode.name === "ul") {
        return (
          <ul
            {...domNode.attribs}
            className={cn(
              "ml-6 list-disc text-foreground/80",
              domNode.attribs.class,
              domNode.attribs.className
            )}
          >
            {children}
          </ul>
        );
      }

      if (domNode.name === "strong") {
        return (
          <strong
            {...domNode.attribs}
            className={cn(
              "font-bold text-foreground",
              domNode.attribs.class,
              domNode.attribs.className
            )}
          >
            {children}
          </strong>
        );
      }

      if (domNode.name === "h1") {
        return (
          <h1
            {...domNode.attribs}
            className={cn(
              "mt-10 scroll-m-20 font-doto text-3xl font-extrabold tracking-tight text-foreground lg:text-4xl",
              domNode.attribs.class,
              domNode.attribs.className
            )}
          >
            {children}
          </h1>
        );
      }

      if (domNode.name === "h2") {
        return (
          <h2
            {...domNode.attribs}
            className={cn(
              "mt-10 scroll-m-20 border-b border-border pb-2 font-doto text-xl font-bold tracking-tight text-foreground first:mt-0",
              domNode.attribs.class,
              domNode.attribs.className
            )}
          >
            {children}
          </h2>
        );
      }

      if (domNode.name === "h3") {
        return (
          <h3
            {...domNode.attribs}
            className={cn(
              "mt-10 scroll-m-20 font-doto text-xl font-semibold tracking-tight text-foreground",
              domNode.attribs.class,
              domNode.attribs.className
            )}
          >
            {children}
          </h3>
        );
      }

      return undefined;
    },
  };

  return <div className={className}>{parse(content, options)}</div>;
}
