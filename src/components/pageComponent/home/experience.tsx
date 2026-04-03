import { Box, Briefcase, GraduationCap } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

const experiences = [
  {
    category: "Experiance",
    items: [
      {
        date: "4-month",
        description: [
          "Spearheaded backend development for an AI-powered PowerPoint generator.",
          "Designed and implemented the product's landing page.",
          "Handled extensive JSON processing and transformation to convert AI-generated content from LLMs into structured slide objects",
        ],
        icon: <Briefcase className="size-4" />,
        role: "Golden Age Technology",
        stack: ["TypeScript", "Next.js", "Hono", "Bun"],
        type: "",
      },
      {
        date: "2025—Present",
        description: [
          "Building web and Mobile applications for clients.",
          "Delivering custom solutions for various business needs.",
        ],
        icon: <Box className="size-4" />,
        role: "Freelance",
        stack: [
          "React",
          "Next.js",
          "TypeScript",
          "Node.js",
          "ReactNative",
          "Expo",
          "Postgresql",
          "Mongodb",
        ],
        type: "",
      },
    ],
  },
  {
    category: "Education",
    items: [
      {
        date: "2022—2027",
        description: [
          "Pursuing a Bachelor's degree in Software Engineering",
          "Focusing on software engineering and also pen testing.",
        ],
        icon: <GraduationCap className="size-4" />,
        role: "Software Engineering",
        stack: [
          "Data Structures",
          "Algorithms",
          "Web Development",
          "Database Management",
          "Computer Security",
        ],
        type: "",
      },
    ],
  },
];

type ExperienceItem = (typeof experiences)[0]["items"][0];

const renderTrigger = (item: ExperienceItem) => (
  <div className="px-2 py-3 rounded-none border border-dashed border-transparent hover:border-border-primary transition-colors duration-200 bg-muted/30 dark:bg-black/10 cursor-pointer">
    <div className="flex w-full items-center justify-between gap-4 text-left">
      <div className="flex items-center gap-3">
        <div className="flex size-8 shrink-0 items-center justify-center border border-border-primary border-dashed bg-muted dark:bg-zinc-900 text-muted-foreground dark:text-zinc-400">
          {item.icon}
        </div>
        <span className="font-medium text-muted-foreground">{item.role}</span>
      </div>
      <div className="flex shrink-0 items-center justify-end gap-3 font-mono text-xs text-muted-foreground sm:gap-40">
        <span>{item.type}</span>
        <span>{item.date}</span>
      </div>
    </div>
  </div>
);

const Experience = () => {
  const experienceDefaultValues =
    experiences
      .find((s) => s.category === "Experiance")
      ?.items.map((_, itemIndex) => `Experiance-${itemIndex}`) ?? [];

  return (
    <div className="flex w-full flex-col px-4 py-4">
      {experiences.map((section) => (
        <div key={Math.random()} className="mb-6 last:mb-0">
          <div className="mb-4 flex items-center gap-2 text-muted-foreground">
            <div className="size-2 bg-muted-foreground" />
            <span className="font-mono text-sm font-medium text-foreground">
              {section.category}
            </span>
          </div>
          {section.category === "Education" ? (
            <div className="mb-2 last:mb-0 relative">
              {section.items.map((item) => (
                <div
                  key={Math.random()}
                  className="border border-transparent transition-colors hover:bg-muted/30 dark:hover:bg-zinc-900/50"
                >
                  {renderTrigger(item)}
                </div>
              ))}
            </div>
          ) : (
            <Accordion
              type="multiple"
              defaultValue={experienceDefaultValues}
              className="w-full"
            >
              {section.items.map((item, itemIndex) => (
                <AccordionItem
                  key={Math.random()}
                  value={`${section.category}-${itemIndex}`}
                  className="border-b-0 mb-2 last:mb-0 relative"
                >
                  {section.items.length > 1 &&
                    itemIndex < section.items.length - 1 && (
                      <div
                        className="absolute left-[25px] top-[58px] w-[1px] bg-border-primary z-0 "
                        style={{ height: "calc(100% - 49px)" }}
                      />
                    )}
                  <div className="border border-transparent transition-colors hover:bg-muted/30 dark:hover:bg-zinc-900/50">
                    <AccordionTrigger className="px-2 py-3 hover:no-underline [&[data-state=open]>div>div>span]:text-muted-foreground cursor-pointer border rounded-none border-dashed border-border-primary transition-colors duration-200 bg-muted/30 dark:bg-black/10">
                      <div className="flex w-full items-center justify-between gap-4 text-left">
                        <div className="flex items-center gap-3">
                          <div className="flex size-8 shrink-0 items-center justify-center border border-border-primary border-dashed bg-muted dark:bg-zinc-900 text-muted-foreground dark:text-zinc-400">
                            {item.icon}
                          </div>
                          <span className="font-medium text-muted-foreground">
                            {item.role}
                          </span>
                        </div>
                        <div className="flex shrink-0 items-center justify-end gap-3 font-mono text-xs text-muted-foreground sm:gap-40">
                          <span>{item.type}</span>
                          <span>{item.date}</span>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-2 pb-4 pt-0">
                      <div className="ml-11 mt-2">
                        <ul className="mb-4 list-[square] space-y-2 pl-4 sm:text-ellipsis text-sm text-muted-foreground">
                          {item.description.map((desc) => (
                            <li key={Math.random()}>{desc}</li>
                          ))}
                        </ul>
                        <div className="flex flex-wrap gap-2">
                          {item.stack.map((tech) => (
                            <Badge
                              key={Math.random()}
                              variant="secondary"
                              className="border rounded-none border-border-primary bg-muted dark:bg-zinc-900/50 px-2 py-0.5 font-mono text-[10px] font-normal text-muted-foreground dark:text-zinc-400 hover:bg-muted-foreground/20 dark:hover:text-zinc-200"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </AccordionContent>
                  </div>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      ))}
    </div>
  );
};

export default Experience;
