import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense, lazy } from "react";

import Experience from "@/components/pageComponent/home/experience";
import Profile from "@/components/pageComponent/home/profile";
import Projects from "@/components/pageComponent/home/projects";
import Separator from "@/components/pageComponent/separator";
import { getGithubData } from "@/data/github-data";
import {
  SITE_DESCRIPTION,
  buildSeoHead,
  createPersonJsonLd,
  createProfilePageJsonLd,
  createWebsiteJsonLd,
} from "@/lib/seo";
interface GithubContributionProps {
  total: {
    lastYear: number;
  };
  contributions: [{ date: string; count: number; level: number }];
}
const gitHubData = queryOptions<GithubContributionProps>({
  queryKey: ["githubData"],
  queryFn: () => getGithubData(),
  staleTime: 24 * 60 * 60 * 1000,
  gcTime: 24 * 60 * 60 * 1000,
  refetchOnWindowFocus: false,
});

// Below-the-fold contribution graph (date-fns + SVG calendar) loads on demand
// so it stays out of the initial home chunk.
const GithubContribution = lazy(
  () => import("@/components/pageComponent/home/github-contribution")
);

export const Route = createFileRoute("/_app/")({
  component: HomePage,
  loader: ({ context }) => context.queryClient.ensureQueryData(gitHubData),
  head: () =>
    buildSeoHead({
      canonicalPath: "/",
      description: SITE_DESCRIPTION,
      imageAlt:
        "Bilal Ali portfolio preview with dark retro interface styling.",
      keywords: [
        "Bilal Ali",
        "software engineer",
        "full-stack developer",
        "TanStack Start portfolio",
        "web developer Ethiopia",
        "React developer",
      ],
      structuredData: [
        createWebsiteJsonLd(),
        createPersonJsonLd(),
        createProfilePageJsonLd(),
      ],
      title: "Software Engineer & Product Builder",
      type: "profile",
    }),
});

function HomePage() {
  const { data: GithubData } = useSuspenseQuery(gitHubData);

  return (
    <div className="m-auto flex max-w-175 w-full flex-col overflow-hidden border-x border-dashed border-border-primary bg-background pt-4">
      <Profile />
      <Separator />
      <Suspense fallback={<div>Loading contributions&hellip;</div>}>
        <GithubContribution data={GithubData} />
      </Suspense>

      <Separator />
      <Experience />
      <Separator />
      <Projects />
    </div>
  );
}
