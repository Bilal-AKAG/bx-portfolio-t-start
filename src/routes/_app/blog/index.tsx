import { createFileRoute } from "@tanstack/react-router";

import { buildSeoHead, createWebsiteJsonLd, SITE_NAME } from "@/lib/seo";

export const Route = createFileRoute("/_app/blog/")({
  component: BlogPage,
  head: () =>
    buildSeoHead({
      canonicalPath: "/blog",
      description:
        "Notes by Bilal Ali. Old drafts cleared out — new writing soon.",
      imageAlt: `${SITE_NAME} blog social preview image.`,
      keywords: ["Bilal Ali blog", "developer notes"],
      structuredData: [
        createWebsiteJsonLd(),
        {
          "@context": "https://schema.org",
          "@type": "Blog",
          description: "Notes by Bilal Ali. New writing soon.",
          name: `${SITE_NAME} Blog`,
          url: "https://bilal.works/blog",
        },
      ],
      title: "writings",
      type: "website",
    }),
});

function BlogPage() {
  return (
    <div className="m-auto flex min-h-[calc(100dvh-100px)] w-full max-w-175 flex-col overflow-hidden border-x border-dashed border-border-primary bg-background px-4 py-8 font-mono md:px-6">
      <div className="flex items-baseline justify-between px-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Blogs
        </h1>
      </div>

      <div className="flex flex-1 items-center justify-center py-20">
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="font-doto text-4xl font-medium tracking-tight text-foreground">
            soon.
          </p>
          <p className="max-w-[32ch] text-sm leading-relaxed text-muted-foreground">
            cleared out old drafts. new notes when ready.
          </p>
        </div>
      </div>
    </div>
  );
}
