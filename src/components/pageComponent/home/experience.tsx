interface ExperienceEntry {
  company: string;
  period?: string;
  role: string;
  tagline?: string;
}

interface ExperienceSection {
  title: string;
  items: ExperienceEntry[];
}

const experienceSections: ExperienceSection[] = [
  {
    items: [
      {
        company: "Freelance",
        period: "MAR, 2025 — PRESENT",
        role: "Product Engineer",
        tagline: "Partnering with founders to ship web and mobile MVPs.",
      },
      {
        company: "Golden Age Technology",
        period: "JUN-AUGUST, 2025",
        role: "Backend Engineer",
        tagline: "AI-powered PowerPoint generator for rapid pitch creation.",
      },
      {
        company: "ASTU",
        role: "Bachelor's in Software Engineering",
        tagline: "Focused on software design and architecture.",
      },
    ],
    title: "Careers",
  },
];

const Experience = () => (
  <div className="flex w-full flex-col px-4 py-4">
    {experienceSections.map((section) => (
      <div key={section.title} className="mb-10">
        <div className="mb-4 flex items-center gap-2">
          <h2 className="font-mono text-sm font-medium  text-muted-foreground">
            {section.title}
          </h2>
        </div>
        <div className="relative space-y-8">
          <div className="absolute left-3 top-3 h-full w-px bg-border" />
          {section.items.map((item) => (
            <div
              key={item.company}
              className="group relative flex flex-col gap-4"
            >
              <div className="absolute left-0 top-2">
                <div className="flex size-6 items-center justify-center rounded-full bg-background">
                  <div className="size-2 rounded-full bg-primary" />
                </div>
              </div>
              <div className="ml-12">
                <p className="mb-1 text-xs text-muted-foreground">
                  {item.period}
                </p>
                <span className="inline-flex items-center gap-2 font-mono text-sm font-medium text-foreground">
                  {item.company}
                </span>
                <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                  {item.role}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.tagline}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

export default Experience;
