import { useQuery } from "@tanstack/react-query";

import GithubContributionClient from "./github-contribution-client";

const getData = async () => {
  try {
    const res = await fetch(
      "https://github-contributions-api.jogruber.de/v4/Bilal-AKAG?y=last"
    );

    if (!res.ok) {
      console.error("Failed to fetch contribution data:");
      return null;
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching contribution data:", error);
    return null;
  }
};

const GithubContribution = () => {
  const { data } = useQuery({
    queryFn: () => getData(),
    queryKey: ["github-contribution"],
		staleTime: 50 * 60 * 1000,
		gcTime: 1000 * 60 * 60,
  });

  if (!data || !data.contributions) {
    return null;
  }

  return (
    <div className="px-4 mt-5 mb-3 min-h-[160px] flex flex-col justify-center">
      <GithubContributionClient contributions={data.contributions} />
    </div>
  );
};

export default GithubContribution;
