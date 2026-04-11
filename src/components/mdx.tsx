import defaultMdxComponents from "fumadocs-ui/mdx";
import { ArrowRight } from "lucide-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

type AnchorProps = ComponentPropsWithoutRef<"a">;

interface FinalLinkProps extends AnchorProps {
  children?: ReactNode;
}

function FinalLink({
  children,
  className,
  rel,
  target,
  ...props
}: FinalLinkProps) {
  const resolvedRel =
    target === "_blank"
      ? [rel, "noopener", "noreferrer"].filter(Boolean).join(" ")
      : rel;

  return (
    <a
      {...props}
      className={cn(
        "group flex w-fit items-center gap-1 font-mono text-sm text-foreground underline underline-offset-4 transition-all hover:text-foreground/80",
        className
      )}
      rel={resolvedRel}
      target={target}
    >
      <span>{children}</span>
      <ArrowRight
        size={10}
        className="inline-block -rotate-45 transform transition-transform duration-200 ease-out group-hover:translate-x-1 group-hover:-translate-y-0.5"
      />
    </a>
  );
}

export function getMDXComponents() {
  return {
    ...defaultMdxComponents,
    a: ({ className, rel, target, ...props }: AnchorProps) => {
      const resolvedRel =
        target === "_blank"
          ? [rel, "noopener", "noreferrer"].filter(Boolean).join(" ")
          : rel;

      return (
        <a
          {...props}
          className={cn(
            "font-medium underline underline-offset-4 decoration-muted-foreground/50 transition-all hover:text-foreground hover:decoration-solid",
            className
          )}
          rel={resolvedRel}
          target={target}
        />
      );
    },
    blockquote: ({
      className,
      ...props
    }: ComponentPropsWithoutRef<"blockquote">) => (
      <blockquote
        {...props}
        className={cn(
          "border-l-2 border-border-secondary pl-6 italic text-foreground/70",
          className
        )}
      />
    ),
    code: ({ className, ...props }: ComponentPropsWithoutRef<"code">) => (
      <code
        {...props}
        className={cn(
          "rounded-sm bg-secondary px-1.5 py-0.5 font-mono text-[0.9em] text-foreground",
          className
        )}
      />
    ),
    pre: ({ className, ...props }: ComponentPropsWithoutRef<"pre">) => (
      <pre
        {...props}
        className={cn(
          "my-7 overflow-x-auto rounded-md border border-border bg-secondary/50 p-4",
          className
        )}
      />
    ),
    p: ({ className, ...props }: ComponentPropsWithoutRef<"p">) => (
      <p
        {...props}
        className={cn(
          "text-pretty text-sm leading-7 text-muted-foreground",
          className
        )}
      />
    ),
    li: ({ className, ...props }: ComponentPropsWithoutRef<"li">) => (
      <li
        {...props}
        className={cn("text-sm leading-7 text-foreground/80", className)}
      />
    ),
    ul: ({ className, ...props }: ComponentPropsWithoutRef<"ul">) => (
      <ul
        {...props}
        className={cn("ml-6 list-disc text-foreground/80", className)}
      />
    ),
    strong: ({ className, ...props }: ComponentPropsWithoutRef<"strong">) => (
      <strong
        {...props}
        className={cn("font-bold text-foreground", className)}
      />
    ),
    h1: ({ className, ...props }: ComponentPropsWithoutRef<"h1">) => (
      <h1
        {...props}
        className={cn(
          "mt-10 scroll-m-20 font-doto text-3xl font-extrabold tracking-tight text-foreground lg:text-4xl",
          className
        )}
      />
    ),
    h2: ({ className, ...props }: ComponentPropsWithoutRef<"h2">) => (
      <h2
        {...props}
        className={cn(
          "mt-10 scroll-m-20 border-b border-border pb-2  text-xl font-bold tracking-tight text-foreground first:mt-0",
          className
        )}
      />
    ),
    h3: ({ className, ...props }: ComponentPropsWithoutRef<"h3">) => (
      <h3
        {...props}
        className={cn(
          "mt-10 scroll-m-20 font-doto text-xl font-semibold tracking-tight text-foreground",
          className
        )}
      />
    ),
    FinalLink,
  };
}

export { FinalLink };
