import React from "react";

interface SkillCardProps {
  label: string;
  icon?: React.ReactNode;
  tag?: string;
}

const SkillCard = ({ label, icon, tag }: SkillCardProps) => (
  <div className="group relative flex flex-col items-center justify-center p-2 border border-zinc-900 border-dashed bg-black/10 transition-all hover:bg-white/[0.02] hover:border-zinc-800 aspect-square overflow-hidden">
    {/* Schematic Markings */}

    <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-zinc-600 opacity-50 group-hover:opacity-100 transition-all" />
    <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-zinc-600 opacity-50 group-hover:opacity-100 transition-all" />

    {/* Technical Metadata - Bits */}
    <div className="absolute top-2 right-2 flex flex-col gap-0.5 opacity-40">
      <div className="w-1.5 h-0.5 bg-zinc-600 group-hover:bg-zinc-400" />
      <div className="w-1.5 h-0.5 bg-zinc-600 group-hover:bg-zinc-400" />
      <div className="w-1.5 h-0.5 bg-zinc-800" />
    </div>

    {/* Icon Area - Shrunk for density */}
    <div className="relative z-10 flex items-center justify-center size-8 mb-4 text-zinc-500 group-hover:text-white group-hover:scale-110 transition-all duration-300 filter grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100">
      {icon || (
        <div className="size-6 border border-zinc-800 border-dashed rounded-none flex items-center justify-center">
          <span className="text-[6px] font-mono text-zinc-800">NOD</span>
        </div>
      )}
    </div>

    {/* Label (Schematic Style) - Improved Readability */}
    <div className="relative z-10 flex flex-col items-center gap-1 px-1">
      <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-zinc-400 group-hover:text-white transition-colors font-semibold text-center leading-tight">
        {label}
      </span>
      {tag && (
        <span className="font-mono text-[8px] uppercase tracking-widest text-zinc-500 italic text-center">
          {tag}
        </span>
      )}
    </div>

    {/* Background Grid (Very subtle) */}
    <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none" />
  </div>
);

export default SkillCard;
