"use client";

import { Link, useLocation } from "@tanstack/react-router";
import {
  IconHouse,
  IconCircleQuestion,
  IconSparkle,
  IconSquareFeather,
} from "nucleo-glass";

import { CircleHelpIcon } from "@/components/ui/icons/circle-help";
import { HomeIcon } from "@/components/ui/icons/home";
import { SparklesIcon } from "@/components/ui/icons/sparkle";
import { SquarePenIcon } from "@/components/ui/icons/square-pen";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", icon: <IconHouse size={18} />, label: "Home" },
  {
    href: "/about",
    icon: <IconCircleQuestion size={18} />,
    label: "About",
  },
  {
    href: "/skill",
    icon: <IconSparkle size={18} />,
    label: "Skill",
  },
  {
    href: "/blog",
    icon: <IconSquareFeather size={18} />,
    label: "Blog",
  },
];

const isActive = (currentPath: string, targetHref: string) => {
  if (targetHref === "/blog") {
    return currentPath.startsWith("/blog");
  }
  return currentPath === targetHref;
};

const CornerBracket = ({
  position,
  colorClass,
}: {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  colorClass: string;
}) => {
  const positioning = {
    "bottom-left": "bottom-0 left-0",
    "bottom-right": "bottom-0 right-0",
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0",
  };

  const borderStyles = {
    "bottom-left": "border-b-2 border-l-2 rounded-bl-[1px]",
    "bottom-right": "border-b-2 border-r-2 rounded-br-[1px]",
    "top-left": "border-t-2 border-l-2 rounded-tl-[1px]",
    "top-right": "border-t-2 border-r-2 rounded-tr-[1px]",
  };

  return (
    <div
      className={cn(
        "absolute h-2 w-2",
        colorClass,
        positioning[position],
        borderStyles[position]
      )}
    />
  );
};

const Navigations = () => {
  const pathname = useLocation({ select: (s) => s.pathname });
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex h-fit flex-col p-0.75 sm:p-0.5 border border-dashed  dark:border-border-secondary justify-center items-center backdrop-blur-xl">
      <div className="border-border-secondary bg-white dark:bg-black">
        <div className="flex flex-row p-2 gap-7">
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Tooltip key={item.label}>
                <TooltipTrigger asChild>
                  <Link
                    className="group relative flex h-8 w-8 flex-col items-center justify-center outline-none transition-all duration-300"
                    to={item.href}
                  >
                    {/* Active State Corners */}
                    {active ? (
                      <>
                        <CornerBracket
                          position="top-left"
                          colorClass="border-foreground"
                        />
                        <CornerBracket
                          position="top-right"
                          colorClass="border-foreground"
                        />
                        <CornerBracket
                          position="bottom-left"
                          colorClass="border-foreground"
                        />
                        <CornerBracket
                          position="bottom-right"
                          colorClass="border-foreground"
                        />
                      </>
                    ) : (
                      <div className="absolute inset-0 rounded-[1px] border border-muted-foreground/10 dark:border-border-secondary transition-colors group-hover:border-border" />
                    )}

                    <span
                      className={cn(
                        "relative z-10 transition-all duration-300",
                        active
                          ? "scale-110 text-foreground drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                          : "text-muted-foreground group-hover:text-foreground"
                      )}
                    >
                      {item.icon}
                    </span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Navigations;
