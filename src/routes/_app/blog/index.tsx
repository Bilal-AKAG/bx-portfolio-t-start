import { createFileRoute, Link } from "@tanstack/react-router";

import { getPosts } from "@/lib/posts";
import {
  buildSeoHead,
  createWebsiteJsonLd,
  SITE_NAME,
} from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export const Route = createFileRoute("/_app/blog/")({
  loader: () => getPosts(),
  component: BlogPage,
  head: () =>
    buildSeoHead({
      canonicalPath: "/blog",
      description:
        "Articles by Bilal Ali on software engineering, building products, and lessons from day-to-day development.",
      imageAlt: `${SITE_NAME} blog social preview image.`,
      keywords: [
        "Bilal Ali blog",
        "software engineering articles",
        "web development blog",
        "TanStack Start blog",
        "developer notes",
      ],
      structuredData: [
        createWebsiteJsonLd(),
        {
          "@context": "https://schema.org",
          "@type": "Blog",
          description:
            "Articles by Bilal Ali on software engineering, building products, and lessons from day-to-day development.",
          name: `${SITE_NAME} Blog`,
          url: "https://bilal.works/blog",
        },
      ],
      title: "Writings",
      type: "website",
    }),
});

function BlogPage() {
  const posts = Route.useLoaderData();

  return (
    <div className="m-auto flex min-h-[calc(100dvh-100px)] w-full max-w-175 flex-col overflow-hidden border-x border-dashed border-border-primary bg-background px-4 py-8 font-mono md:px-6">
      <div className="mb-12 flex flex-col gap-4">
        <div className="flex items-baseline gap-4">
          <h1 className="px-5 text-2xl font-bold tracking-tight text-foreground">
            Articles
          </h1>
        </div>

        <div className="cursor-pointer border-l border-dashed border-border-primary bg-secondary/10 px-5 py-1 text-sm text-muted-foreground transition-colors duration-200">
          <p className="text-pretty">
            <span className="text-foreground underline">Disclaimer</span>: I
            write about the tech I build and my experiences in development. I am
            not a professional writer, so if I write something inaccurate,
            please feel free to{" "}
            <a
              href="mailto:bilal.ali.irp.dev@gmail.com"
              className="underline hover:text-foreground"
            >
              email me
            </a>
            .
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {posts.map((post, index) => {
          const isFirstPost = index === 0;
          const postDate = new Date(post.meta.date);
          const thirtyDaysAgo = new Date();

          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

          const isNew = isFirstPost && postDate > thirtyDaysAgo;

          return (
            <Link
              key={post.slug}
              to="/blog/$slug"
              params={{ slug: post.slug }}
              className="group relative block border-l border-dashed border-border-primary p-5 transition-colors duration-200 hover:bg-zinc-50 hover:dark:bg-zinc-950/10"
            >
              {isNew ? (
                <p className="absolute top-5 right-5 flex items-center justify-center gap-1 bg-primary px-2 py-0.5 font-mono text-xs font-medium text-primary-foreground">
                  New
                </p>
              ) : null}

              <div className="flex flex-col gap-2 sm:gap-1">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{formatDate(post.meta.date)}</span>
                </div>

                <h2 className="text-xl font-medium text-foreground transition-colors">
                  {post.meta.title}
                </h2>

                <p className="line-clamp-2 text-sm text-muted-foreground">
                  {post.meta.description}
                </p>
              </div>
            </Link>
          );
        })}

        {posts.length === 0 ? (
          <p className="text-muted-foreground">No posts found.</p>
        ) : null}
      </div>
    </div>
  );
}
