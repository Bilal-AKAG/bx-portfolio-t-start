"use client";
import { useTheme } from "better-themes";
import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { useHotkey } from '@tanstack/react-hotkeys'
import { cn } from "@/lib/utils";

export const ButtonToggle = () => {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  // keyboard shortcut for theme toggle
  useHotkey("Mod+T", ()=>{
		setTheme(theme === "light" ? "dark" : "light"), {
			conflictBehavior: 'replace',
		}
  })
  if (!mounted) {
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

  const resolvedTheme = theme === "system" ? systemTheme : theme;
  const isLight = resolvedTheme === "light";
  const isDark = resolvedTheme === "dark";

  return (
    <div className="flex items-center justify-between border border-border-tertiary border-dashed  ">
      <button
        className={cn(
          " cursor-pointer flex justify-center items-center transition-all p-1",
          isLight
            ? "bg-primary text-primary-foreground opacity-100"
            : "opacity-40 hover:opacity-70"
        )}
        onClick={() => setTheme("light")}
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
        onClick={() => setTheme("dark")}
      >
        <Moon size={14} />
        <span className="sr-only">Switch to dark theme</span>
      </button>
    </div>
  );
};
