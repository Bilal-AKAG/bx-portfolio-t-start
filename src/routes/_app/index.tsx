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

// Fixed-height skeleton matching the contribution graph's real box
// (130px calendar + gap + footer ≈ 160px). Without it, the lazy chunk
// swapping in pushes Experience/Projects down — a layout shift.
const ContributionFallback = () => (
  <div
    aria-hidden="true"
    className="px-4 mt-5 mb-3 min-h-[160px] flex flex-col justify-center"
  >
    <div className="flex flex-col gap-2 animate-pulse">
      <div className="h-[130px] rounded-sm bg-muted/60 dark:bg-zinc-900/60" />
      <div className="flex items-center justify-between">
        <div className="h-4 w-36 rounded-sm bg-muted/60 dark:bg-zinc-900/60" />
        <div className="h-4 w-24 rounded-sm bg-muted/60 dark:bg-zinc-900/60" />
      </div>
    </div>
  </div>
);

function HomePage() {
  const { data: GithubData } = useSuspenseQuery(gitHubData);

  return (
    <div className="m-auto flex max-w-175 w-full flex-col overflow-hidden border-x border-dashed border-border-primary bg-background pt-4">
      <Profile />
      <Separator />
      <Suspense fallback={<ContributionFallback />}>
        <GithubContribution data={GithubData} />
      </Suspense>

      <Separator />
      <Experience />
      <Separator />
      <Projects />
    </div>
  );
}
