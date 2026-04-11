"use client";

import { useNavigate } from "@tanstack/react-router";
import { ArrowUpRightIcon } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { useRef } from "react";

import {
  Announcement,
  AnnouncementTag,
  AnnouncementTitle,
} from "@/components/ui/announcement";
import { PartyPopper } from "@/components/ui/icons/party-popper";
import { ThanosSnapEffect } from "@/components/ui/thanos-snap-effect";
const AnouncmentSection = () => {
  const navigate = useNavigate();
  const thanosRef = useRef<{ handleClick: () => Promise<void> }>(null);

  const handleAnnouncementClick = async () => {
    if (thanosRef.current) {
      // Start navigation immediately when snap animation begins
      navigate({ to: "/blog" });
      // Trigger the snap effect
      await thanosRef.current.handleClick();
    }
  };

  return (
    <AnimatePresence mode="wait">
      <ThanosSnapEffect ref={thanosRef}>
        <div className="mb-3 flex justify-center">
          <Announcement
            className="cursor-pointer border border-border-tertiary border-dashed rounded-none group bg-background font-mono text-foreground shadow-white/5 shadow-xl transition-all duration-200 hover:shadow-none"
            onClick={handleAnnouncementClick}
            themed
          >
            <AnnouncementTag className="flex items-center justify-center gap-[1px] bg-primary font-mono text-primary-foreground">
              New
              <PartyPopper animateOnHover height={16} width={16} />
            </AnnouncementTag>
            <AnnouncementTitle>
              <div className="flex gap-1">
                Checkout my Article
                <ArrowUpRightIcon
                  className="shrink-0 group-hover:translate-x-0.5 transition-transform group-hover:-translate-y-0.5"
                  size={16}
                />
              </div>
            </AnnouncementTitle>
          </Announcement>
        </div>
      </ThanosSnapEffect>
    </AnimatePresence>
  );
};

export default AnouncmentSection;
