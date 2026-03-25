"use client";

import {
  ContributionGraph,
  ContributionGraphCalendar,
  ContributionGraphBlock,
  ContributionGraphFooter,
  ContributionGraphLegend,
  ContributionGraphTotalCount,
} from "@/components/kibo-ui/contribution-graph";
import type { Activity } from "@/components/kibo-ui/contribution-graph";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface GithubContributionClientProps {
  contributions: Activity[];
}

export default function GithubContributionClient({
  contributions,
}: GithubContributionClientProps) {
  return (
    <ContributionGraph data={contributions}>
      <ContributionGraphCalendar className="text-gray-500">
        {({ activity, dayIndex, weekIndex }) => (
          <Tooltip>
            <TooltipTrigger asChild>
              <g>
                <ContributionGraphBlock
                  activity={activity}
                  dayIndex={dayIndex}
                  weekIndex={weekIndex}
                  className="data-[level='0']:fill-contrib-0 data-[level='1']:fill-contrib-1 data-[level='2']:fill-contrib-2 data-[level='3']:fill-contrib-3 data-[level='4']:fill-contrib-4"
                />
              </g>
            </TooltipTrigger>
            <TooltipContent className="bg-popover text-popover-foreground rounded-none">
              <p className="font-semibold">{activity.date}</p>
              <p>{activity.count} contributions</p>
            </TooltipContent>
          </Tooltip>
        )}
      </ContributionGraphCalendar>
      <ContributionGraphFooter className="justify-between text-muted-foreground/60">
        <ContributionGraphTotalCount />
        <ContributionGraphLegend />
      </ContributionGraphFooter>
    </ContributionGraph>
  );
}
