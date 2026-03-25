"use client";

import { useQuery } from "@tanstack/react-query";
import GithubContributionClient from "./github-contribution-client";

const getData = async () => {
  const res = await fetch(
    "https://github-contributions-api.jogruber.de/v4/Bilal-AKAG?y=last"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch contribution data");
  }

  return res.json();
};

const GithubContribution = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["github-contributions"],
    queryFn: getData,
    staleTime: 3600 * 1000, // 1 hour
  });

  if (isLoading || error || !data || !data.contributions) {
    return (
      <div className="px-4 mt-5 mb-3 min-h-[160px] flex flex-col justify-center animate-pulse bg-muted/20" />
    );
  }

  return (
    <div className="px-4 mt-5 mb-3 min-h-[160px] flex flex-col justify-center">
      <GithubContributionClient contributions={data.contributions} />
    </div>
  );
};

export default GithubContribution;
