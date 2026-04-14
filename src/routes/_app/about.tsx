import { createFileRoute } from "@tanstack/react-router";

import AboutBio from "@/components/pageComponent/about/about-bio";
import AboutExtra from "@/components/pageComponent/about/about-extra";
import AboutFAQ from "@/components/pageComponent/about/about-faq";
import Separator from "@/components/pageComponent/separator";
import { buildSeoHead, createPersonJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/_app/about")({
  component: AboutPage,
  head: () =>
    buildSeoHead({
      canonicalPath: "/about",
      description:
        "Learn more about Bilal Ali, a full-stack developer based in Ethiopia focused on building practical products, polished interfaces, and reliable user experiences.",
      imageAlt:
        "About page preview for Bilal Ali with profile details and contact options.",
      keywords: [
        "About Bilal Ali",
        "Bilal Ali portfolio",
        "full-stack developer Ethiopia",
        "software engineer Ethiopia",
        "React developer portfolio",
      ],
      structuredData: createPersonJsonLd(),
      title: "About Bilal Ali",
    }),
});

function AboutPage() {
  return (
    <div className="m-auto flex min-h-screen max-w-175 flex-col border-x border-dashed border-border-primary pb-0 pt-4 md:mb-0">
      <h1 className="sr-only">About Bilal Ali</h1>
      <AboutBio />
      <Separator />
      <AboutExtra />
      <Separator />
      <AboutFAQ />
      <Separator className="h-px" />
    </div>
  );
}
