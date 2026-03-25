"use client";

import { Star, ExternalLink } from "lucide-react";

interface Project {
  title: string;
  description: string;
  tags: string[];
  github?: string;
  stars?: number;
}

const projects: Project[] = [
  {
    description:
      "Simple reflective tool that helps you see your life laid out in weeks. It translates the abstract idea of a lifetime into a tangible visual",
    github: "https://github.com/Bilal-AKAG/MEMENTO-MORI",
    stars: 120,
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    title: "Memento Mori",
  },
  {
    description:
      "Mobile application designed to help users track and improve their emotional well-being.",
    github: "https://github.com/Bilal-AKAG/moodizer-app",
    stars: 80,
    tags: ["React Native", "TypeScript", "Expo"],
    title: "Moodizer",
  },
  {
    description: 'Sercali is a "Gilded Void" aesthetic theme for the Zed IDE.',
    github: "https://github.com/Bilal-AKAG/Zed-sercali-Theme",
    stars: 50,
    tags: ["Zed", "Theme", "JSON"],
    title: "Sercali-Theme",
  },
  {
    description:
      "Terminal-based UI for quickly creating and managing .gitignore files.",
    github: "https://github.com/Bilal-AKAG/Autogitignore",
    stars: 30,
    tags: ["Rust", "CLI", "TUI"],
    title: "Autogitignore",
  },
];

const ProjectCard = ({ project }: { project: Project }) => (
  <article className="group relative border border-dashed border-border-primary/50 p-3 hover:border-primary/40 hover:shadow-sm transition-all duration-300 overflow-hidden bg-gradient-to-br from-transparent to-muted/5 hover:to-muted/10">
    <div className="absolute top-1 right-1 w-20 h-20 opacity-40 group-hover:opacity-70 transition-opacity duration-500 hidden md:block">
      <div className="flex items-center justify-center gap-0.5 text-muted-foreground group-hover:text-foreground transition-colors">
        <Star className="w-4 h-4 fill-current" />
        <span className="text-xs font-mono">{project.stars}</span>
      </div>
    </div>

    <header className="flex items-center justify-between gap-2 relative z-10">
      <a
        href={project.github ?? "#"}
        target={project.github ? "_blank" : undefined}
        rel={project.github ? "noreferrer" : undefined}
        className="text-xs font-medium underline underline-offset-4 decoration-dotted hover:decoration-solid group-hover:text-primary transition-colors inline-flex items-center gap-1"
      >
        {project.title}
        <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors" />
      </a>
    </header>

    {project.description && (
      <p className="mt-1.5 text-[11px] text-muted-foreground leading-relaxed relative z-10 pr-12">
        {project.description}
      </p>
    )}

    {project.tags?.length && (
      <div className="mt-2 flex flex-wrap items-center gap-1.5 relative z-10">
        {project.tags.map((tech, index) => (
          <span
            key={tech}
            className="border border-dashed border-border-secondary/60 px-2 py-[2px] text-[10px] text-muted-foreground group-hover:border-primary/30 group-hover:text-foreground/80 transition-colors"
            style={{ transitionDelay: `${index * 50}ms` }}
          >
            {tech}
          </span>
        ))}
      </div>
    )}
  </article>
);

const Projects = () => (
  <section className="px-4 py-4">
    <h2 className="text-sm font-medium tracking-tight mb-3">Projects</h2>
    <div className="flex flex-col gap-3">
      {projects.map((project, index) => (
        <ProjectCard key={index} project={project} />
      ))}
    </div>
  </section>
);

export default Projects;
