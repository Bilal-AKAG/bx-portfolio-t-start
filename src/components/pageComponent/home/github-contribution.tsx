import GithubContributionClient from "./github-contribution-client";

interface GithubContributionProps {
  total: {
    lastYear: number;
  };
  contributions: [{ date: string; count: number; level: number }];
}

const GithubContribution = ({ data }: { data: GithubContributionProps }) => {
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
