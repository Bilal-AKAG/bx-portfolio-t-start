import React from "react";

interface SkillSectionProps {
  title: string;
  children: React.ReactNode;
}

const SkillSection = ({ title, children }: SkillSectionProps) => (
  <section className="flex flex-col gap-6 px-6 py-8">
    <div className="flex items-center gap-2 mb-2">
      <div className="size-1.5 bg-zinc-600" />
      <span className="font-mono text-[11px] font-bold tracking-[0.3em] uppercase text-zinc-300 flex items-center gap-2">
        {title}
      </span>
    </div>

    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
      {children}
    </div>
  </section>
);

export default SkillSection;
