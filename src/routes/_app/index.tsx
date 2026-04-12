import {
  QueryClient,
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";

import AnouncmentSection from "@/components/pageComponent/home/anouncment";
import Experience from "@/components/pageComponent/home/experience";
import GithubContribution from "@/components/pageComponent/home/github-contribution";
import Profile from "@/components/pageComponent/home/profile";
import Projects from "@/components/pageComponent/home/projects";
import Separator from "@/components/pageComponent/separator";
import { getGithubData } from "@/data/github-data";
interface GithubContributionProps {
  total: {
    lastYear: number;
  };
  contributions: [{ date: string; count: number; level: number }];
}
const gitHubData = queryOptions<GithubContributionProps>({
  queryKey: ["githubData"],
  queryFn: () => getGithubData(),
});

export const Route = createFileRoute("/_app/")({
  component: HomePage,
  loader: ({ context }) => context.queryClient.ensureQueryData(gitHubData),
});

function HomePage() {
  const { data: GithubData } = useSuspenseQuery(gitHubData);

  return (
    <div className="m-auto flex max-w-[700px] w-full flex-col overflow-hidden border-x border-dashed border-border-primary bg-background pt-4">
      <AnouncmentSection />
      <Profile />
      <Separator />
      <Suspense fallback={<div>Loading contributions...</div>}>
        <GithubContribution data={GithubData} />
      </Suspense>

      <Separator />
      <Experience />
      <Separator />
      <Projects />
    </div>
  );
}
