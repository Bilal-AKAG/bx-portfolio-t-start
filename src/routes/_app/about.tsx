import { createFileRoute } from "@tanstack/react-router";

import AboutBio from "@/components/pageComponent/about/about-bio";
import AboutExtra from "@/components/pageComponent/about/about-extra";
import AboutFAQ from "@/components/pageComponent/about/about-faq";
import Separator from "@/components/pageComponent/separator";

export const Route = createFileRoute("/_app/about")({
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="m-auto flex min-h-screen max-w-[700px] flex-col border-x border-dashed border-border-primary pb-0 pt-4 md:mb-0">
      <AboutBio />
      <Separator />
      <AboutExtra />
      <Separator />
      <AboutFAQ />
      <Separator className="h-px" />
    </div>
  );
}
