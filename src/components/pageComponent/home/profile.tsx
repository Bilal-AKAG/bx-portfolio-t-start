import { FlipSentences } from "@/components/FlipSentence/flipsentence";
import Heart from "@/components/ui/icons/heart";
import { VerifiedIcon } from "@/components/ui/icons/verified";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import Social from "./social";
import { IconFlame } from "nucleo-glass";

const Profile = () => (
  <div className="flex w-full border-border-primary border-y border-dashed">
    <div className="flex w-full flex-col">
      {/* {hey it's me wrapper } */}
      <div className="flex items-center gap-2 px-4 ">
        <span className="flex gap-1">

					<span className=" border-x border-dashed border-border-tertiary  text-xs flex justify-center items-center text-foreground px-1 gap-0.5">
						Monochrome v1.0
						<IconFlame size={12}/>
					</span>

        </span>


      </div>
      {/* {name section with soical } */}
      <div className=" flex w-full items-center justify-between border-border-primary border-y border-dashed px-4">
        <div className="flex items-center gap-2">
          <h1
            className={cn("font-doto  font-medium text-3xl text-foreground")}
          >
            Bilal Ali
          </h1>
          <Tooltip>
            <TooltipTrigger>
              <VerifiedIcon
                className="text-foreground"
                height={20}
                width={20}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-medium font-mono">Varified 😁</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div>
          <Social />
        </div>
      </div>
      {/* {flip sentence wrapper} */}
      <div className="px-4 text-muted-foreground">
        <FlipSentences
          sentences={["Full Stack Developer ", "Based in Ethiopia"]}
        />
      </div>
    </div>
  </div>
);

export default Profile;
