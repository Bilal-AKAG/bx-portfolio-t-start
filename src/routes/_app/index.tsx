import { createFileRoute } from "@tanstack/react-router";

import AnouncmentSection from "@/components/pageComponent/home/anouncment";
import Experience from "@/components/pageComponent/home/experience";
import GithubContribution from "@/components/pageComponent/home/github-contribution";
import Profile from "@/components/pageComponent/home/profile";
import Projects from "@/components/pageComponent/home/projects";
import Separator from "@/components/pageComponent/separator";

export const Route = createFileRoute("/_app/")({
  component: HomePage,
});

function HomePage() {
  return (
    <div className="m-auto flex max-w-[700px] w-full flex-col overflow-hidden border-x border-dashed border-border-primary bg-background pt-4">
      <AnouncmentSection />
      <Profile />
      <Separator />
      <GithubContribution />
      <Separator />
      <Experience />
      <Separator />
      <Projects />
    </div>
  );
}
