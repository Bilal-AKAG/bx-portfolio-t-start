import { Image } from "@unpic/react";

import { MailCheckIcon } from "@/components/ui/mail-check";
import { Telegram } from "@/components/ui/svgs/telegram";
import { cn } from "@/lib/utils";

const CornerBracket = ({
  position,
}: {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}) => {
  const positioning = {
    "bottom-left": "bottom-0 left-0 border-b border-l",
    "bottom-right": "bottom-0 right-0 border-b border-r",
    "top-left": "top-0 left-0 border-t border-l",
    "top-right": "top-0 right-0 border-t border-r",
  };

  return (
    <div
      className={cn(
        "absolute h-2 w-2 border-zinc-300 dark:border-zinc-600 opacity-60 dark:opacity-40 transition-opacity",
        positioning[position]
      )}
    />
  );
};

const AboutBio = () => {
  const birthDate = new Date(2005, 11, 18);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1;
  }

  const isBirthday =
    today.getMonth() === birthDate.getMonth() &&
    today.getDate() === birthDate.getDate();

  return (
    <section className="flex flex-col gap-10 px-6 py-10">
      {/* Top Section: Photo + Identity */}
      <div className="flex flex-col md:flex-row gap-12 items-center">
        {/* Left: Schematic Photo Frame */}
        <div className="relative shrink-0 group/frame">
          <div className="absolute -inset-3 transition-all duration-500 group-hover:border-zinc-400 dark:group-hover:border-zinc-400 group-hover/frame:scale-105">
            <CornerBracket position="top-left" />
            <CornerBracket position="top-right" />
            <CornerBracket position="bottom-left" />
            <CornerBracket position="bottom-right" />
          </div>

          <div className="relative size-[180px] overflow-hidden transition-all duration-700 border border-zinc-200 dark:border-zinc-900 group-hover/frame:border-zinc-400 dark:group-hover/frame:border-zinc-800">
            <Image
              src="/dithered-image.png"
							alt="Bilal"
							width={180}
							height={180}
              priority
              className="object-contain"
            />
          </div>

          <div className="absolute -bottom-8 left-0 w-full text-center">
            <span className="text-[9px] font-mono text-zinc-400 dark:text-zinc-600 uppercase tracking-[0.2em] group-hover/frame:text-zinc-600 dark:group-hover/frame:text-zinc-400 transition-colors">
              Fig.01 // Identity
            </span>
          </div>
        </div>

        {/* Right: Identity Data Panel */}
        <div className="flex-1 w-full">
          <div className="group/panel relative border border-zinc-200 dark:border-zinc-900 border-dashed bg-zinc-50 dark:bg-black/10 overflow-hidden transition-all hover:border-zinc-300 dark:hover:border-zinc-800">
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-zinc-300 dark:border-zinc-600 transition-colors group-hover/panel:border-zinc-500 dark:group-hover/panel:border-zinc-400" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-zinc-300 dark:border-zinc-600 transition-colors group-hover/panel:border-zinc-500 dark:group-hover/panel:border-zinc-400" />
            {/* Panel Header */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-zinc-200 dark:border-zinc-900 bg-zinc-100 dark:bg-zinc-900/30">
              <div className="flex gap-1">
                <div className="w-1.5 h-0.5 bg-zinc-300 dark:bg-zinc-700" />
                <div className="w-1.5 h-0.5 bg-zinc-300 dark:bg-zinc-700" />
                <div className="w-1.5 h-0.5 bg-zinc-400 dark:bg-zinc-800" />
              </div>
            </div>

            {/* Data Rows */}
            <div className="flex flex-col">
              {[
                { idx: "00", label: "Name", value: "Bilal Ali" },
                {
                  idx: "01",
                  label: "Age",
                  value: (
                    <div className="flex items-center gap-2">
                      <span>{age}</span>
                      {isBirthday && (
                        <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 animate-pulse px-1.5 py-0.5 border border-zinc-300 dark:border-zinc-400/30 bg-zinc-100 dark:bg-zinc-400/5 ">
                          BIRTHDAY BOY
                        </span>
                      )}
                    </div>
                  ),
                },
                { idx: "02", label: "Location", value: "Adama, ET" },
                { idx: "03", label: "Role", value: "Full-Stack Dev" },
              ].map((item) => (
                <div
                  key={item.idx}
                  className="group flex items-center py-2.5 px-3 border-b border-zinc-100 dark:border-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-white/[0.02] transition-colors relative"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-zinc-500 dark:bg-white/50 opacity-0 dark:opacity-0 group-hover:opacity-100 transition-opacity" />

                  <span className="font-mono text-[8px] text-zinc-400 dark:text-zinc-700 group-hover:text-zinc-600 dark:group-hover:text-zinc-500 mr-3 transition-colors">
                    {item.idx}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-600 uppercase tracking-widest min-w-[70px] shrink-0 group-hover:text-zinc-700 dark:group-hover:text-zinc-400 transition-colors">
                    {item.label}
                  </span>
                  <div className="h-px flex-1 bg-zinc-100 dark:bg-zinc-900 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-800 transition-colors mx-3" />
                  <span className="font-mono text-sm text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-800 dark:group-hover:text-white transition-colors">
                    {item.value}
                  </span>
                </div>
              ))}

              {/* Status Row - Special */}
              <div className="group flex items-center py-2.5 px-3 hover:bg-zinc-100 dark:hover:bg-white/[0.02] transition-colors relative">
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-zinc-500 dark:bg-white/50 opacity-0 dark:opacity-0 group-hover:opacity-100 transition-opacity" />

                <span className="font-mono text-[8px] text-zinc-400 dark:text-zinc-700 group-hover:text-zinc-600 dark:group-hover:text-zinc-500 mr-3 transition-colors">
                  04
                </span>
                <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-600 uppercase tracking-widest min-w-[70px] shrink-0 group-hover:text-zinc-700 dark:group-hover:text-zinc-400 transition-colors">
                  Status
                </span>
                <div className="h-px flex-1 bg-zinc-100 dark:bg-zinc-900 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-800 transition-colors mx-3" />
                <span className="font-mono text-sm text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-800 dark:group-hover:text-white flex items-center gap-2 transition-colors">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-400 dark:bg-zinc-500 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-zinc-500 dark:bg-zinc-400" />
                  </span>
                  Open to Work
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Biography Text */}
      <div className="flex flex-col gap-6 w-full max-w-2xl">
        <div className="group relative border border-zinc-200 dark:border-zinc-900 border-dashed bg-zinc-50 dark:bg-black/10 p-6 transition-all hover:border-zinc-300 dark:hover:border-zinc-800 overflow-hidden">
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-zinc-300 dark:border-zinc-600 transition-colors group-hover:border-zinc-500 dark:group-hover:border-zinc-400" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-zinc-300 dark:border-zinc-600 transition-colors group-hover:border-zinc-500 dark:group-hover:border-zinc-400" />
          {/* Technical Bits - Right */}
          <div className="absolute top-3 right-3 flex flex-col gap-0.5 opacity-40 group-hover:opacity-70 transition-opacity">
            <div className="w-1.5 h-0.5 bg-zinc-300 dark:bg-zinc-600 group-hover:bg-zinc-500 dark:group-hover:bg-zinc-400 transition-colors" />
            <div className="w-1.5 h-0.5 bg-zinc-300 dark:bg-zinc-600 group-hover:bg-zinc-500 dark:group-hover:bg-zinc-400 transition-colors" />
            <div className="w-1.5 h-0.5 bg-zinc-400 dark:bg-zinc-800" />
          </div>

          <h2 className="text-xl font-mono font-medium text-zinc-600 dark:text-zinc-400 tracking-tight flex items-center gap-3 transition-colors">
            <span className="w-2 h-2 bg-zinc-400 dark:bg-zinc-600 animate-pulse transition-colors" />
            I love what I do.
          </h2>
          <p className="text-zinc-500 dark:text-zinc-500 font-mono text-sm leading-relaxed mt-4 pl-5 border-l border-zinc-200 dark:border-zinc-800 group-hover:border-zinc-300 dark:group-hover:border-zinc-700 transition-colors">
            Simple as that. I enjoy building things that look good and work even
            better. If you vibe with my work or just want to chat about tech,
            I'm always open.
          </p>
        </div>

        {/* Quick Contact */}
        <div className="mt-3">
          <span className="font-mono text-[10px] text-zinc-400 dark:text-zinc-600 uppercase tracking-widest mb-2 block">
            Quick reach out
          </span>
          <div className="flex flex-wrap gap-2">
            <a
              href="mailto:bilal.ali.irp.dev@gmail.com"
              className="group relative flex items-center gap-2 px-3 py-1.5 border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-black/10 hover:bg-zinc-100 dark:hover:bg-white/[0.03] hover:border-zinc-400 dark:hover:border-zinc-600 transition-all overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-zinc-300 dark:border-zinc-700 opacity-40 dark:opacity-40 group-hover:opacity-100 group-hover:border-zinc-500 dark:group-hover:border-white/50 transition-all" />
              <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-zinc-300 dark:border-zinc-700 opacity-40 dark:opacity-40 group-hover:opacity-100 group-hover:border-zinc-500 dark:group-hover:border-white/50 transition-all" />
              <MailCheckIcon
                size={14}
                className="text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-700 dark:group-hover:text-white transition-colors"
              />
              <span className="font-mono text-xs text-zinc-500 dark:text-zinc-500 group-hover:text-zinc-700 dark:group-hover:text-white transition-colors">
                Email
              </span>
            </a>

            <a
              href="https://t.me/Bilal_AKAG"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-2 px-3 py-1.5 border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-black/10 hover:bg-zinc-100 dark:hover:bg-white/[0.03] hover:border-zinc-400 dark:hover:border-zinc-600 transition-all overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-zinc-300 dark:border-zinc-700 opacity-40 dark:opacity-40 group-hover:opacity-100 group-hover:border-zinc-500 dark:group-hover:border-white/50 transition-all" />
              <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-zinc-300 dark:border-zinc-700 opacity-40 dark:opacity-40 group-hover:opacity-100 group-hover:border-zinc-500 dark:group-hover:border-white/50 transition-all" />
              <Telegram className="w-[14px] h-[14px] text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-700 dark:group-hover:text-white transition-colors" />
              <span className="font-mono text-xs text-zinc-500 dark:text-zinc-500 group-hover:text-zinc-700 dark:group-hover:text-white transition-colors">
                DM me
              </span>
            </a>
          </div>
        </div>

        {/* Content Cards - Channel + Cal.com */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-0">
          {/* Cal.com */}
          <a
            href="https://cal.com/bilal-bx/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="relative block p-3 border border-zinc-200 dark:border-zinc-900 bg-zinc-50 dark:bg-black/10 hover:bg-zinc-100 dark:hover:bg-zinc-900/50 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all group overflow-hidden"
          >
            <div className="absolute bottom-0 left-0 w-8 h-8 pointer-events-none">
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-zinc-300 dark:border-zinc-600 transition-colors group-hover:border-zinc-500 dark:group-hover:border-white" />
            </div>

            <div className="flex flex-col h-full justify-between gap-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors">
                  [ 02 ]
                </span>
                <svg
                  className="w-5 h-5 text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-700 dark:group-hover:text-white transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>

              <div>
                <span className="font-mono text-base text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors block">
                  Book a Call
                </span>
                <span className="font-mono text-xs text-zinc-500 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-400">
                  My dedicated time for discussing potential work collaborations
                </span>
              </div>
            </div>
          </a>

          {/* Rust sccript  */}

          <a
            href="https://t.me/rust_script"
            target="_blank"
            rel="noopener noreferrer"
            className="relative block p-3 border border-zinc-200 dark:border-zinc-900 bg-zinc-50 dark:bg-black/10 hover:bg-zinc-100 dark:hover:bg-zinc-900/50 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all group overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none">
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-zinc-300 dark:border-zinc-600 transition-colors group-hover:border-zinc-500 dark:group-hover:border-white" />
            </div>

            <div className="flex flex-col h-full justify-between gap-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors">
                  [ 01 ]
                </span>
                <Telegram className="size-5 text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-700 dark:group-hover:text-white transition-colors" />
              </div>

              <div>
                <span className="font-mono text-base text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors block">
                  Rustscript
                </span>
                <span className="font-mono text-xs text-zinc-500 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-400">
                  My public saved messages about Rust and TypeScript
                </span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutBio;
