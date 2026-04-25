import { MDXContent } from "@content-collections/mdx/react";
import {
  Link,
  createFileRoute,
  notFound,
  rootRouteId,
} from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { formatDate } from "#/lib/utils";
import { getMDXComponents } from "@/components/mdx";
import { getPostPage } from "@/lib/posts";
import {
  buildArticleSeoHead,
  createArticleJsonLd,
  getCanonicalPath,
  SITE_NAME,
} from "@/lib/seo";

export const Route = createFileRoute("/_app/blog/$slug")({
  loader: async ({ params }) => {
    const page = await getPostPage({
      data: { slug: params.slug },
    });

    if (!page) {
      throw notFound({ routeId: rootRouteId });
    }

    return page;
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {};
    }

    const canonicalPath = getCanonicalPath(`/blog/${loaderData.slug}`);

    return buildArticleSeoHead({
      author: loaderData.meta.author,
      canonicalPath,
      description: loaderData.meta.description,
      imageAlt:
        loaderData.meta.imageAlt ??
        `${loaderData.meta.title} article preview from ${SITE_NAME}.`,
      imagePath: loaderData.meta.image,
      keywords: loaderData.meta.keywords,
      modifiedTime: loaderData.meta.modifiedTime ?? loaderData.meta.date,
      publishedTime: loaderData.meta.publishedTime ?? loaderData.meta.date,
      section: loaderData.meta.tag,
      structuredData: createArticleJsonLd({
        authorName: loaderData.meta.author,
        canonicalPath,
        dateModified: loaderData.meta.modifiedTime ?? loaderData.meta.date,
        datePublished: loaderData.meta.publishedTime ?? loaderData.meta.date,
        description: loaderData.meta.description,
        imagePath: loaderData.meta.image,
        title: loaderData.meta.title,
      }),
      tags: loaderData.meta.tag
        ? [loaderData.meta.tag]
        : loaderData.meta.keywords,
      title: loaderData.meta.title,
    });
  },
  component: BlogPostPage,
});

function BlogPostPage() {
  const page = Route.useLoaderData();

  return (
    <article className="m-auto flex min-h-[calc(100dvh-100px)] w-full max-w-175 flex-col border-x border-dashed border-border-primary bg-background px-6 py-6">
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
          {page.meta.title}
        </h1>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span className="font-mono">{formatDate(page.meta.date)}</span>
        </div>
      </div>

      <div className="w-full max-w-none pb-10 font-mono antialiased">
        <MDXContent code={page.mdx} components={getMDXComponents()} />
      </div>
    </article>
  );
}
