import { HelpCircle } from "lucide-react";
import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    answer:
      "Sharp edges remind me of game UIs That's the style I enjoy building with.",
    question:
      "Why your site always use sharp edges instead of rounded corners?",
  },
  {
    answer:
      "I'm primarily focused on the TypeScript ecosystem. I use React and Next.js for web projects, and React Native (Expo) for mobile apps. On the backend, I prefer Hono and elysia with Bun.",
    question: "What's your primary tech stack?",
  },
  {
    answer:
      "Yes, I am always open to discussing interesting new projects. Whether it's a small task or a large-scale application, feel free to reach out!",
    question: "Are you available for freelance work?",
  },
];

const AboutFAQ = () => (
  <section className="flex flex-col px-4 py-4">
    {/* Header - Matching Experience style */}
    <div className="mb-4 flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
      <div className="size-2 bg-zinc-400 dark:bg-zinc-600" />
      <span className="font-mono text-sm font-medium text-zinc-700 dark:text-zinc-200">
        Frequently Asked Questions
      </span>
    </div>

    <Accordion type="multiple" className="w-full">
      {faqs.map((faq, index) => (
        <AccordionItem
          key={index}
          value={`faq-${index}`}
          className="border-b-0 mb-2 last:mb-0 relative"
        >
          <div className="border border-transparent transition-colors dark:hover:bg-zinc-900/50">
            <AccordionTrigger className="px-2 py-3 hover:no-underline [&[data-state=open]>div>div>span]:text-zinc-500 cursor-pointer rounded-none border border-dashed border-zinc-200 dark:border-transparent hover:border-zinc-300 dark:hover:border-border-primary transition-colors duration-200 bg-zinc-50 dark:bg-black/10">
              <div className="flex w-full items-center justify-between gap-4 text-left">
                <div className="flex items-center gap-3">
                  <div className="flex size-8 shrink-0 items-center justify-center border border-zinc-200 dark:border-zinc-800 border-dashed bg-white dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400">
                    <HelpCircle className="size-4" />
                  </div>
                  <span className="font-medium text-zinc-600 dark:text-zinc-500 font-mono text-[13px]">
                    {faq.question}
                  </span>
                </div>
              </div>
            </AccordionTrigger>

            <AccordionContent className="px-2 pb-4 pt-0">
              <div className="ml-11 mt-2">
                <p className="font-mono text-[12px] text-zinc-500 dark:text-zinc-600 border-l  border-zinc-200 dark:border-zinc-600  p-2 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </AccordionContent>
          </div>
        </AccordionItem>
      ))}
    </Accordion>
  </section>
);

export default AboutFAQ;
