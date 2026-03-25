"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export const FlipSentences = ({
  className,
  sentences,
}: {
  className?: string;
  sentences: string[];
}) => {
  const [currentSentence, setCurrentSentence] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAnimation = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setCurrentSentence((prev) => (prev + 1) % sentences.length);
    }, 2500);
  }, [sentences]);

  useEffect(() => {
    startAnimation();

    const abortController = new AbortController();
    const { signal } = abortController;

    document.addEventListener(
      "visibilitychange",
      () => {
        if (document.visibilityState !== "visible" && intervalRef.current) {
          clearInterval(intervalRef.current);
          // Clear the interval when the tab is not visible
          intervalRef.current = null;
        } else if (document.visibilityState === "visible") {
          setCurrentSentence((prev) => (prev + 1) % sentences.length);
          // Show the next sentence immediately
          startAnimation();
          // Restart the interval when the tab becomes visible
        }
      },
      { signal }
    );

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      abortController.abort();
    };
  }, [sentences, startAnimation]);

  return (
    <div className="h-[24px] overflow-hidden">
      <AnimatePresence initial={false} mode="wait">
        <motion.p
          animate={{
            opacity: 1,
            y: 0,
          }}
          className={cn(
            "select-none text-balance font-medium font-mono text-sm",
            className
          )}
          exit={{
            opacity: 0,
            y: -8,
          }}
          initial={{
            opacity: 0,
            y: 8,
          }}
          key={`current-sentence-${currentSentence}`}
          transition={{
            duration: 0.5,
            ease: "linear",
          }}
        >
          {sentences[currentSentence]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};
