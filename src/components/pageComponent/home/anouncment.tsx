import { useNavigate } from "@tanstack/react-router";
import { ArrowUpRightIcon } from "lucide-react";
import {
  Announcement,
  AnnouncementTag,
  AnnouncementTitle,
} from "@/components/ui/announcement";
import { PartyPopper } from "@/components/ui/icons/party-popper";

const AnouncmentSection = () => {
  const navigate = useNavigate();
  const handleAnnouncementClick = async () => {
      navigate({ to: "/blog" });
  };

  return (

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
  );
};

export default AnouncmentSection;
