"use client";

const hobbies = [
  {
    desc: "Exploring the latest in hardware innovation and gadgets.",
    name: "Tech Gadgets",
  },
  {
    desc: "Constantly staying ahead of the curve with emerging technology.",
    name: "Learning New Tech",
  },
  {
    desc: "Contributing to tools and frameworks that power the web.",
    name: "Open Source",
  },
  {
    desc: "A passionate fan of the beautiful game, both on and off the pitch.",
    name: "Football",
  },
];

const AboutExtra = () => (
  <section className="px-6 py-8">
    {/* Hobbies Section */}
    <div className="max-w-2xl border border-zinc-200 dark:border-zinc-900 border-dashed bg-zinc-50 dark:bg-black/10 overflow-hidden">
      {/* Header - Schematic Style */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-dashed border-zinc-200 dark:border-zinc-900">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-zinc-500 dark:text-zinc-500">
            Hobbies & Interests
          </span>
        </div>
      </div>

      {/* Content List */}
      <div className="divide-y divide-zinc-200 dark:divide-zinc-900/50">
        {hobbies.map((hobby, index) => (
          <div
            key={hobby.name}
            className="group px-4 py-3 hover:bg-zinc-100 dark:hover:bg-white/[0.02] transition-colors relative"
          >
            {/* Left Hover Indicator */}
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-zinc-400 dark:bg-white/40 opacity-0 dark:opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="flex items-start gap-4">
              <span className="font-mono text-[9px] text-zinc-400 dark:text-zinc-700 mt-0.5 shrink-0">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex-1">
                <h4 className="font-mono text-sm text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-800 dark:group-hover:text-white transition-colors">
                  {hobby.name}
                </h4>
                <p className="font-mono text-[11px] text-zinc-500 dark:text-zinc-600 group-hover:text-zinc-600 dark:group-hover:text-zinc-500 mt-0.5 leading-relaxed transition-colors">
                  {hobby.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default AboutExtra;
