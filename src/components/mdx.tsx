import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type AnchorProps = ComponentPropsWithoutRef<"a">;

function MarkdownLink({ className, rel, target, ...props }: AnchorProps) {
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
}

export function getMarkdownComponents() {
  return {
    a: MarkdownLink,
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
    ol: ({ className, ...props }: ComponentPropsWithoutRef<"ol">) => (
      <ol
        {...props}
        className={cn("ml-6 list-decimal text-foreground/80", className)}
      />
    ),
    strong: ({ className, ...props }: ComponentPropsWithoutRef<"strong">) => (
      <strong
        {...props}
        className={cn("font-bold text-foreground", className)}
      />
    ),
    em: ({ className, ...props }: ComponentPropsWithoutRef<"em">) => (
      <em {...props} className={cn("text-foreground/90", className)} />
    ),
    hr: ({ className, ...props }: ComponentPropsWithoutRef<"hr">) => (
      <hr {...props} className={cn("my-8 border-border", className)} />
    ),
    img: ({ className, ...props }: ComponentPropsWithoutRef<"img">) => (
      <img
        loading="lazy"
        decoding="async"
        {...props}
        className={cn("rounded-md", className)}
      />
    ),
    h1: ({ className, children, ...props }: ComponentPropsWithoutRef<"h1">) => (
      <h1
        {...props}
        className={cn(
          "mt-10 scroll-m-20 font-doto text-3xl font-extrabold tracking-tight text-foreground lg:text-4xl",
          className
        )}
      >
        {children}
      </h1>
    ),
    h2: ({ className, children, ...props }: ComponentPropsWithoutRef<"h2">) => (
      <h2
        {...props}
        className={cn(
          "mt-10 scroll-m-20 border-b border-border pb-2 text-xl font-bold tracking-tight text-foreground first:mt-0",
          className
        )}
      >
        {children}
      </h2>
    ),
    h3: ({ className, children, ...props }: ComponentPropsWithoutRef<"h3">) => (
      <h3
        {...props}
        className={cn(
          "mt-10 scroll-m-20 font-doto text-xl font-semibold tracking-tight text-foreground",
          className
        )}
      >
        {children}
      </h3>
    ),
    h4: ({ className, children, ...props }: ComponentPropsWithoutRef<"h4">) => (
      <h4
        {...props}
        className={cn(
          "mt-8 scroll-m-20 text-lg font-semibold tracking-tight text-foreground",
          className
        )}
      >
        {children}
      </h4>
    ),
  };
}

/** @deprecated Use `getMarkdownComponents` instead. Kept for backwards compat. */
export const getMDXComponents = getMarkdownComponents;
