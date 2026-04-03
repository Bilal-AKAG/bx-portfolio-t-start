import {Image} from "@unpic/react";
import {Link} from "@tanstack/react-router";

export default function NotFoundPage() {
  return (
    <div className="mb-24 flex min-h-screen w-full flex-col md:mb-0">
      <section className="relative flex flex-1 flex-col items-center justify-center gap-6 px-6 py-14 text-center">
        <Image
          aria-hidden
          src="/gradient-dither-5120x2880(1).png"
          alt=""
					priority
					width={5120}
					height={2880}
					layout="constrained"
          className="pointer-events-none absolute inset-0 object-cover opacity-45"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-background/80"
        />
        <div className="relative flex flex-col items-center gap-4">
          <div className="inline-flex w-fit items-center gap-2 border border-dashed border-border-tertiary bg-secondary/50 px-2 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
            <div className="size-1.5 bg-muted-foreground/60" />
            Error 404
          </div>
          <h1 className="font-figtree text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            Page Not Found
          </h1>
          <p className="max-w-[58ch] font-mono text-sm leading-relaxed text-muted-foreground">
            The route you requested does not exist or may have been moved. Use
            the links below to get back into the portfolio.
          </p>
        </div>

        <div className="relative mt-2 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center border border-dashed border-border-primary bg-card px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] text-foreground transition-colors hover:bg-secondary"
          >
            Go Home
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center border border-dashed border-border-secondary bg-secondary/50 px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
          >
            About
          </Link>
          <Link
            to="/blog"
            className="inline-flex items-center border border-dashed border-border-secondary bg-secondary/50 px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
          >
            Blog
          </Link>
        </div>
      </section>
    </div>
  );
}
