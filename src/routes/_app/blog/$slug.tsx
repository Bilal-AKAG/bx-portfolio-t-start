import {
  Link,
  createFileRoute,
  notFound,
  rootRouteId,
} from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import Markdown from "@/components/Markdown";
import { getRenderedPost } from "@/lib/posts.server";

export const Route = createFileRoute("/_app/blog/$slug")({
  loader: async ({ params }) => {
    const result = await getRenderedPost({
      data: { slug: params.slug },
    });

    if (!result) {
      throw notFound({ routeId: rootRouteId });
    }

    return result;
  },
  component: BlogPostPage,
});

function BlogPostPage() {
  const { post, rendered } = Route.useLoaderData();

  return (
    <article className="m-auto flex min-h-[calc(100dvh-100px)] w-full max-w-[700px] flex-col border-x border-dashed border-border-primary bg-background px-6 py-6">
      <Link
        to="/blog"
        className="group mb-8 mt-2 flex w-fit items-center gap-1 font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft
          size={10}
          className="inline-block rotate-45 transform transition-transform duration-200 ease-out group-hover:-translate-x-1"
        />
        <span>[Back]</span>
      </Link>

      <div className="mb-4 border-b border-dashed border-border-primary pb-6 font-doto font-medium">
        <h1 className="mb-3 text-3xl tracking-tight text-foreground sm:text-4xl">
          {post.meta.title}
        </h1>
      </div>

      <Markdown
        content={rendered.markup}
        className="prose prose-neutral dark:prose-invert w-full max-w-none pb-10 font-mono antialiased prose-headings:font-doto prose-headings:tracking-tight prose-p:my-4 prose-p:text-[0.98rem] prose-p:leading-[1.85] prose-ul:my-5 prose-ul:text-[0.98rem] prose-li:my-1 prose-li:leading-[1.8] prose-blockquote:my-7 prose-blockquote:text-[0.98rem] prose-blockquote:leading-[1.8] prose-a:text-foreground prose-a:decoration-muted-foreground/50 prose-strong:text-foreground"
      />
    </article>
  );
}
