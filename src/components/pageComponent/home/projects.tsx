"use client";

import { ExternalLink, Download } from "lucide-react";

import { GithubIcon } from "@/components/ui/icons/github";

interface Project {
  title: string;
  description: string;
  previewTitle: string;
  github?: string;
  live?: string;
  install?: string;
  IsSOON?: boolean;
  isOSS?: boolean;
  hasDownloads?: boolean;
}

const projects: Project[] = [
  {
    description:
      "Simple reflective tool that helps you see your life laid out in weeks. It translates the abstract idea of a lifetime into a tangible visual",
    github: "https://github.com/Bilal-AKAG/MEMENTO-MORI",
    isOSS: true,
    live: "https://you-think-you-have-time-huh.vercel.app",
    previewTitle: "AuraStream",
    title: "Memento Mori",
  },
  {
    description:
      "Mobile application designed to help users track and improve their emotional well-being.",
    github: "https://github.com/Bilal-AKAG/moodizer-app",
    isOSS: true,
    previewTitle: "Moodizer",
    title: "Moodizer",
  },
  {
    description: 'Sercali is a "Gilded Void" aesthetic theme for the Zed IDE.',
    github: "https://github.com/Bilal-AKAG/Zed-sercali-Theme",
    hasDownloads: true,
    install: "https://zed.dev/extensions/sercali",
    previewTitle: "Sercali-Theme",
    title: "Sercali-Theme",
  },
  {
    description:
      "Terminal-based UI for quickly creating and managing .gitignore files.",
    github: "https://github.com/Bilal-AKAG/Autogitignore",
    install: "https://crates.io/crates/autogitignore",
    previewTitle: "autogitignore",
    title: "Autogitignore",
  },
];

const ProjectCard = ({ project }: { project: Project }) => (
  <div className="group relative -m-4 p-4 transition-all duration-300">
    {/* Unified Hover Border */}
    <div className="absolute inset-0 border border-transparent transition-all duration-300 group-hover:border-border-primary group-hover:border-dashed" />

    {/* L-Shaped Corners */}
    <div className="absolute top-0 left-0 h-4 w-4 border-t-2 border-l-2 border-border-tertiary opacity-30 dark:opacity-10 transition-opacity duration-300 group-hover:opacity-100" />
    <div className="absolute top-0 right-0 h-4 w-4 border-t-2 border-r-2 border-border-tertiary opacity-30 dark:opacity-10 transition-opacity duration-300 group-hover:opacity-100" />
    <div className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-border-tertiary opacity-30 dark:opacity-10 transition-opacity duration-300 group-hover:opacity-100" />
    <div className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-border-tertiary opacity-30 dark:opacity-10 transition-opacity duration-300 group-hover:opacity-100" />

    <div className="relative flex flex-col gap-4">
      {/* Preview Area - Website Placeholder */}
      <div className="relative aspect-video overflow-hidden border border-border-primary border-dashed dark:bg-bg-panel/50 p-4 transition-all duration-500 group-hover:bg-muted/50 dark:group-hover:bg-zinc-900/40">
        {/* Website Mockup Placeholder */}
        <div className="flex h-full w-full flex-col overflow-hidden rounded-sm border border-border-primary/50 bg-bg-base/80  transition-transform duration-500 group-hover:scale-[1.02]">
          {/* Browser Header */}
          <div className="flex items-center gap-1.5 border-b border-border-primary/50 bg-muted px-3 py-2 dark:bg-zinc-900/50">
            <div className="flex gap-1">
              <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50 dark:bg-zinc-700" />
              <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50 dark:bg-zinc-700" />
              <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50 dark:bg-zinc-700" />
            </div>
            <div className="ml-2 h-3 w-32 rounded-full bg-muted-foreground/30 dark:bg-zinc-800/50" />
          </div>
          {/* Hero Content Mock */}
          <div className="flex flex-1 flex-col gap-3 p-4">
            <div className="h-4 w-3/4 rounded-sm bg-muted-foreground/20 dark:bg-zinc-800/40" />
            <div className="flex gap-2">
              <div className="h-20 flex-1 rounded-sm bg-muted-foreground/10 dark:bg-zinc-800/20" />
              <div className="h-20 w-24 rounded-sm bg-muted-foreground/15 dark:bg-zinc-800/30" />
            </div>
          </div>
        </div>
      </div>

      {/* Info Area */}
      <div className="px-2 pb-2">
        <div className="relative flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-medium text-foreground dark:text-white/90 group-hover:text-foreground dark:group-hover:text-white transition-colors">
              {project.title}
            </h3>
            {project.isOSS && (
              <span className="text-[10px] font-mono border border-border-tertiary px-1.5 py-0.5 text-muted-foreground uppercase tracking-tighter">
                Open Source
              </span>
            )}
            {project.hasDownloads && (
              <span className="text-[10px] font-mono border border-border-tertiary px-1.5 py-0.5 text-muted-foreground uppercase tracking-tighter">
                8K+ downloads
              </span>
            )}
            {project.IsSOON && (
              <span className="text-[10px] font-mono border border-border-tertiary px-1.5 py-0.5 text-muted-foreground uppercase tracking-tighter">
                soon..
              </span>
            )}
          </div>
          <p className="text-[13px] leading-relaxed text-muted-foreground font-mono">
            {project.description}
          </p>

          {/* Links */}
          <div className="mt-1 flex items-center gap-4">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground dark:hover:text-white transition-colors"
              >
                <GithubIcon size={14} />
                <span>GitHub</span>
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground dark:hover:text-white transition-colors"
              >
                <ExternalLink size={14} />
                <span>Live</span>
              </a>
            )}
            {project.install && (
              <a
                href={project.install}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground dark:hover:text-white transition-colors"
              >
                <Download size={14} />
                <span>install</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Projects = () => (
  <section className="flex flex-col gap-8 py-4 p-6 mb-4">
    <div className="flex items-center gap-2 mb-4">
      <div className="size-2 bg-zinc-600" />
      <span className="font-mono text-sm font-medium text-zinc-200">
        Projects
      </span>
    </div>

    <div className="grid grid-cols-1 gap-x-12 gap-y-12 px-4 md:grid-cols-2">
      {projects.map((project, index) => (
        <ProjectCard key={index} project={project} />
      ))}
    </div>
  </section>
);

export default Projects;
