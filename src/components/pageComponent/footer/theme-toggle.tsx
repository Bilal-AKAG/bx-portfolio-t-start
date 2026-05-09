import { useHotkey } from "@tanstack/react-hotkeys";
import { useTheme } from "better-themes";
import { Moon, Sun } from "lucide-react";
import { useHydrated } from "@tanstack/react-router";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "#/components/ui/tooltip";
import { useSound } from "@/hooks/use-sound";
import { switchOffSound } from "@/lib/switch-off";
import { cn } from "@/lib/utils";
import { Kbd } from "#/components/ui/kbd";

export const ButtonToggle = () => {
  const { theme, setTheme } = useTheme();
  const hydrated = useHydrated();
  const [play] = useSound(switchOffSound);


  useHotkey("T", () => {
    setTheme(theme === "light" ? "dark" : "light");
    play();
	});
  
  if (!hydrated) {
    return (
      <div className="flex items-center justify-between border border-border-tertiary border-dashed ">
        <button className="cursor-pointer flex justify-center items-center transition-all p-1 opacity-40">
          <Sun size={14} />
        </button>
        <button className="cursor-pointer flex justify-center items-center transition-all p-1 opacity-40">
          <Moon size={14} />
        </button>
      </div>
    );
  }

  const isLight = theme === "light";
  const isDark = theme === "dark";

  return (
    <Tooltip>
      <TooltipTrigger>
        <div className="flex items-center justify-between border border-border-tertiary border-dashed  ">
          <button
            className={cn(
              " cursor-pointer flex justify-center items-center transition-all p-1",
              isLight
                ? "bg-primary text-primary-foreground opacity-100"
                : "opacity-40 hover:opacity-70"
            )}
            onClick={() => {
							setTheme("light");
							theme === "dark" ? play() : null;
            }}
          >
            <Sun size={14} />
            <span className="sr-only">Switch to light theme</span>
          </button>
          <button
            className={cn(
              "cursor-pointer flex justify-center items-center transition-all p-1",
              isDark
                ? "bg-primary text-primary-foreground opacity-100"
                : "opacity-40 hover:opacity-70"
            )}
            onClick={() => {
              setTheme("dark");
              theme === "light" ? play() : null;
            }}
          >
            <Moon size={14} />
            <span className="sr-only">Switch to dark theme</span>
          </button>
        </div>
      </TooltipTrigger>
      <TooltipContent className="hidden sm:block">
        <span>
          Press <Kbd>T</Kbd> to toggle theme
        </span>
      </TooltipContent>
    </Tooltip>
  );
};
