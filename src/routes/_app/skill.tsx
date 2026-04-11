import { createFileRoute } from "@tanstack/react-router";

import Separator from "@/components/pageComponent/separator";
import SkillCard from "@/components/pageComponent/skill-card";
import SkillSection from "@/components/pageComponent/skill-section";
import { Bun } from "@/components/ui/svgs/bun";
import { Cloudflare } from "@/components/ui/svgs/cloudflare";
import { Css } from "@/components/ui/svgs/css";
import { Docker } from "@/components/ui/svgs/docker";
import { DrizzleORM } from "@/components/ui/svgs/drizzle";
import { Elysiajs } from "@/components/ui/svgs/elysiajs";
import { Expo } from "@/components/ui/svgs/expo";
import { Expressjs } from "@/components/ui/svgs/expressjs";
import { Git } from "@/components/ui/svgs/git";
import { GithubDark } from "@/components/ui/svgs/github-dark";
import { Hono } from "@/components/ui/svgs/hono";
import { Html5 } from "@/components/ui/svgs/html5";
import { Javascript } from "@/components/ui/svgs/javascript";
import { MongodbIconDark } from "@/components/ui/svgs/mongodb-icon-dark";
import { Nextjs } from "@/components/ui/svgs/nextjs";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { PostgreSQL } from "@/components/ui/svgs/postgresql";
import { Prisma } from "@/components/ui/svgs/prisma";
import { React as ReactIcon } from "@/components/ui/svgs/react";
import { ReactRouter } from "@/components/ui/svgs/react-router";
import { Redis } from "@/components/ui/svgs/redis";
import { Rust } from "@/components/ui/svgs/rust";
import { Tanstack } from "@/components/ui/svgs/tanstack";
import { Typescript } from "@/components/ui/svgs/typescript";
import { VercelDark } from "@/components/ui/svgs/vercel-dark";
import { Zed } from "@/components/ui/svgs/zed";

export const Route = createFileRoute("/_app/skill")({
  component: SkillPage,
});

function SkillPage() {
  return (
    <div className="relative m-auto flex min-h-screen w-full max-w-[700px] flex-col overflow-hidden border-x border-dashed border-border-primary pb-0 pt-4 md:mb-0">
      <div className="relative z-10">
        <div className="space-y-4 px-6 py-8">
          <h1 className="font-mono text-3xl font-medium tracking-tight text-foreground dark:text-white">
            Tools of the Trade
          </h1>
          <p className="border-l border-dashed border-zinc-200 bg-zinc-50 py-1 pl-4 font-mono text-[10px] leading-relaxed text-muted-foreground sm:py-2 dark:border-zinc-800 dark:bg-black/10 dark:text-zinc-400">
            <span className="mr-2 font-medium text-foreground underline dark:text-zinc-300">
              INFO
            </span>
            : A list of tech I use to build stuff. Mostly spending my time in
            the{" "}
            <span className="italic text-foreground dark:text-white">
              React ecosystem
            </span>{" "}
            making sure things work the way they should. I am comfortable with
            any React-based framework btw.
          </p>
        </div>

        <Separator className="border-y" />

        <SkillSection title="CORE LANGUAGES">
          <SkillCard label="HTML5" icon={<Html5 className="size-full" />} />
          <SkillCard label="CSS3" icon={<Css className="size-full" />} />
          <SkillCard
            label="JavaScript"
            icon={<Javascript className="size-full" />}
          />
          <SkillCard
            label="TypeScript"
            icon={<Typescript className="size-full" />}
          />
          <SkillCard
            label="Rust"
            tag="newbie"
            icon={<Rust className="size-full" />}
          />
        </SkillSection>

        <Separator className="border-y" />

        <SkillSection title="FRONTEND STACK">
          <SkillCard label="Next.js" icon={<Nextjs className="size-full" />} />
          <SkillCard label="React" icon={<ReactIcon className="size-full" />} />
          <SkillCard
            label="React Router v7"
            icon={<ReactRouter className="size-full" />}
          />
          <SkillCard label="Expo" icon={<Expo className="size-full" />} />
          <SkillCard
            label="TanStack Start"
            icon={<Tanstack className="size-full" />}
          />
        </SkillSection>

        <Separator className="border-y" />

        <SkillSection title="BACKEND STACK">
          <SkillCard label="Node.js" icon={<Nodejs className="size-full" />} />
          <SkillCard label="Bun" icon={<Bun className="size-full" />} />
          <SkillCard
            label="Express"
            icon={<Expressjs className="size-full" />}
          />
          <SkillCard label="Hono" icon={<Hono className="size-full" />} />
          <SkillCard
            label="ElysiaJS"
            icon={<Elysiajs className="size-full" />}
          />
        </SkillSection>

        <Separator className="border-y" />

        <SkillSection title="DATABASE & ACCESS">
          <SkillCard
            label="PostgreSQL"
            icon={<PostgreSQL className="size-full" />}
          />
          <SkillCard
            label="MongoDB"
            icon={<MongodbIconDark className="size-full" />}
          />
          <SkillCard label="Redis" icon={<Redis className="size-full" />} />
          <SkillCard label="Prisma" icon={<Prisma className="size-full" />} />
          <SkillCard
            label="Drizzle"
            icon={<DrizzleORM className="size-full" />}
          />
        </SkillSection>

        <Separator className="border-y" />

        <SkillSection title="INFRA & TOOLS">
          <SkillCard label="Docker" icon={<Docker className="size-full" />} />
          <SkillCard
            label="Cloudflare"
            icon={<Cloudflare className="size-full" />}
          />
          <SkillCard
            label="Vercel"
            icon={<VercelDark className="size-full" />}
          />
          <SkillCard label="Git" icon={<Git className="size-full" />} />
          <SkillCard
            label="GitHub"
            icon={<GithubDark className="size-full" />}
          />
          <SkillCard label="Zed" icon={<Zed className="size-full" />} />
        </SkillSection>
      </div>
    </div>
  );
}
