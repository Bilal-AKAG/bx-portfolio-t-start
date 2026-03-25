import { GithubIcon } from "@/components/ui/icons/github";
import { LinkedinIcon } from "@/components/ui/icons/linkedin";
import { TwitterIcon } from "@/components/ui/icons/x";

const Social = () => (
  <div className="relative p-2">
    <div className="flex items-center gap-3">
      <a
        aria-label="GitHub Profile"
        className="text-foreground opacity-100 transition-opacity duration-200 hover:opacity-80"
        href="https://github.com/Bilal-AKAG"
        rel="noopener noreferrer"
        target="_blank"
      >
        <GithubIcon />
      </a>
      <a
        aria-label="LinkedIn Profile"
        className="text-foreground opacity-100 transition-opacity duration-200 hover:opacity-80"
        href="https://www.linkedin.com/in/bilal-ali-588537338/"
        rel="noopener noreferrer"
        target="_blank"
      >
        <LinkedinIcon />
      </a>
      <a
        aria-label="X (Twitter) Profile"
        className="text-foreground opacity-100 transition-opacity duration-200 hover:opacity-80"
        href="https://x.com/bil0lali"
        rel="noopener noreferrer"
        target="_blank"
      >
        <TwitterIcon />
      </a>
    </div>
  </div>
);

export default Social;
