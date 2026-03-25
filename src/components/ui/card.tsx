/* eslint-disable func-style, no-use-before-define, unicorn/consistent-function-scoping */
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const cardVariants = cva("relative w-full", {
  defaultVariants: {
    variant: "default",
  },
  variants: {
    variant: {
      corners: [
        "rounded-md border-2",
        "border-zinc-100 dark:border-zinc-700",
        "relative",
      ],
      default: [
        "rounded-lg border",
        "border-zinc-200 dark:border-zinc-800",
        "bg-white dark:bg-zinc-950",
      ],
      dots: [
        "relative mx-auto w-full",
        "rounded-lg border border-dashed",
        "border-zinc-300 dark:border-zinc-800",
        "px-4 sm:px-6 md:px-8",
      ],
      gradient: ["relative mx-auto w-full", "px-4 sm:px-6 md:px-8"],
      inner: [
        "rounded-sm border-[0.5px] p-2",
        "border-zinc-300 dark:border-zinc-800",
      ],
      lifted: [
        "rounded-xl border",
        "border-zinc-400 dark:border-zinc-700",
        "relative",
        "shadow-[0px_5px_0px_0px_rgba(0,0,0,0.7)]",
        "dark:shadow-[0px_4px_0px_0px_rgba(255,255,255,0.5)]",
        "bg-zinc-50 dark:bg-zinc-900/50",
      ],
      neubrutalism: [
        "border-[0.5px]",
        "border-zinc-400 dark:border-white/70",
        "relative",
        "shadow-[4px_4px_0px_0px_rgba(0,0,0)]",
        "dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.7)]",
      ],
      plus: [
        "border border-dashed",
        "border-zinc-400 dark:border-zinc-700",
        "relative",
      ],
    },
  },
});

export interface CardProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  title?: string;
  description?: string;
}

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div className={cn("p-6", className)} ref={ref} {...props}>
    {props.children}
  </div>
));
CardContent.displayName = "CardContent";

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, title, description, children, ...props }, ref) => {
    const DotsPattern = () => {
      const sharedClasses =
        "rounded-full outline outline-8 dark:outline-gray-950 sm:my-6 md:my-8 size-1 my-4 outline-gray-50 bg-green-400";

      return (
        <>
          <div className="-z-0 absolute top-4 left-0 h-px w-full bg-zinc-400 sm:top-6 md:top-8 dark:bg-zinc-700" />
          <div className="absolute bottom-4 left-0 z-0 h-px w-full bg-zinc-400 sm:bottom-6 md:bottom-8 dark:bg-zinc-700" />

          <div className="relative w-full border-zinc-400 border-x dark:border-zinc-700">
            <div className="absolute z-0 grid h-full w-full items-center">
              <section className="absolute z-0 grid h-full w-full grid-cols-2 place-content-between">
                <div className={`${sharedClasses} -translate-x-[2.5px]`} />
                <div
                  className={`${sharedClasses} translate-x-[2.5px] place-self-end`}
                />
                <div className={`${sharedClasses} -translate-x-[2.5px]`} />
                <div
                  className={`${sharedClasses} translate-x-[2.5px] place-self-end`}
                />
              </section>
            </div>

            <div className="relative z-20 mx-auto py-8">
              <CardContent>
                {title && (
                  <h3 className="mb-1 font-bold text-gray-900 text-lg dark:text-gray-100">
                    {title}
                  </h3>
                )}
                {description && (
                  <p className="text-gray-700 dark:text-gray-300">
                    {description}
                  </p>
                )}
                {children}
              </CardContent>
            </div>
          </div>
        </>
      );
    };

    const GradientLines = () => (
      <>
        <div className="-z-0 absolute top-4 left-0 h-px w-full bg-gradient-to-l from-zinc-200 via-zinc-400 to-zinc-600 sm:top-6 md:top-8 dark:from-zinc-900 dark:via-zinc-700 dark:to-zinc-500" />
        <div className="absolute bottom-4 left-0 z-0 h-px w-full bg-gradient-to-r from-zinc-200 via-zinc-400 to-zinc-600 sm:bottom-6 md:bottom-8 dark:from-zinc-900 dark:via-zinc-700 dark:to-zinc-500" />
        <div className="relative w-full border-gradient-x border-x">
          <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-t from-zinc-200 via-zinc-400 to-zinc-600 dark:from-zinc-900 dark:via-zinc-700 dark:to-zinc-500" />
          <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-t from-zinc-200 via-zinc-400 to-zinc-600 dark:from-zinc-900 dark:via-zinc-700 dark:to-zinc-500" />
          <div className="relative z-20 mx-auto py-8">{content}</div>
        </div>
      </>
    );

    const PlusIcons = () => (
      <>
        <svg
          className="-top-3 -left-3 absolute size-6 text-white dark:text-white"
          fill="none"
          height={24}
          stroke="currentColor"
          strokeWidth="1"
          viewBox="0 0 24 24"
          width={24}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 6v12m6-6H6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <svg
          className="-top-3 -right-3 absolute size-6 text-white dark:text-white"
          fill="none"
          height={24}
          stroke="currentColor"
          strokeWidth="1"
          viewBox="0 0 24 24"
          width={24}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 6v12m6-6H6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <svg
          className="-bottom-3 -left-3 absolute size-6 text-white dark:text-white"
          fill="none"
          height={24}
          stroke="currentColor"
          strokeWidth="1"
          viewBox="0 0 24 24"
          width={24}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 6v12m6-6H6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <svg
          className="-bottom-3 -right-3 absolute size-6 text-white dark:text-white"
          fill="none"
          height={24}
          stroke="currentColor"
          strokeWidth="1"
          viewBox="0 0 24 24"
          width={24}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 6v12m6-6H6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </>
    );

    const CornerBorders = () => (
      <>
        <div className="-top-0.5 -left-0.5 absolute size-6 rounded-tl-md border-zinc-700 border-t-2 border-l-2 dark:border-zinc-200" />
        <div className="-top-0.5 -right-0.5 absolute size-6 rounded-tr-md border-zinc-700 border-t-2 border-r-2 dark:border-zinc-200" />
        <div className="-bottom-0.5 -left-0.5 absolute size-6 rounded-bl-md border-zinc-700 border-b-2 border-l-2 dark:border-zinc-200" />
        <div className="-bottom-0.5 -right-0.5 absolute size-6 rounded-br-md border-zinc-700 border-r-2 border-b-2 dark:border-zinc-200" />
      </>
    );

    const InnerContent = () => {
      if (variant === "dots") {
        return <DotsPattern />;
      }
      if (variant === "gradient") {
        return <GradientLines />;
      }
      if (variant === "plus") {
        return <PlusIcons />;
      }
      if (variant === "corners") {
        return <CornerBorders />;
      }
      return null;
    };

    const content = (
      <CardContent>
        {title && (
          <h3 className="mb-1 font-bold text-gray-900 text-lg dark:text-gray-100">
            {title}
          </h3>
        )}
        {description && (
          <p className="text-gray-700 dark:text-gray-300">{description}</p>
        )}
        {children}
      </CardContent>
    );

    if (variant === "dots") {
      return (
        <div
          className={cn(cardVariants({ className, variant }))}
          ref={ref}
          {...props}
        >
          <div className="-z-0 absolute top-4 left-0 h-px w-full bg-zinc-400 sm:top-6 md:top-8 dark:bg-zinc-700" />
          <div className="absolute bottom-4 left-0 z-0 h-px w-full bg-zinc-400 sm:bottom-6 md:bottom-8 dark:bg-zinc-700" />
          <div className="relative w-full border-zinc-400 border-x dark:border-zinc-700">
            <div className="absolute z-0 grid h-full w-full items-center">
              <section className="absolute z-0 grid h-full w-full grid-cols-2 place-content-between">
                <div className="-translate-x-[2.5px] my-4 size-1 rounded-full bg-green-400 outline outline-8 outline-gray-50 sm:my-6 md:my-8 dark:outline-gray-950" />
                <div className="my-4 size-1 translate-x-[2.5px] place-self-end rounded-full bg-green-400 outline outline-8 outline-gray-50 sm:my-6 md:my-8 dark:outline-gray-950" />
                <div className="-translate-x-[2.5px] my-4 size-1 rounded-full bg-green-400 outline outline-8 outline-gray-50 sm:my-6 md:my-8 dark:outline-gray-950" />
                <div className="my-4 size-1 translate-x-[2.5px] place-self-end rounded-full bg-green-400 outline outline-8 outline-gray-50 sm:my-6 md:my-8 dark:outline-gray-950" />
              </section>
            </div>
            <div className="relative z-20 mx-auto py-8">{content}</div>
          </div>
        </div>
      );
    }

    if (variant === "inner") {
      return (
        <div
          className={cn(cardVariants({ className, variant }))}
          ref={ref}
          {...props}
        >
          <div className="rounded-sm border border-zinc-300 bg-gradient-to-br from-white to-zinc-200/60 shadow-[2px_0_8px_rgba(0,_0,_0,_0.15)] dark:border-zinc-900/50 dark:from-zinc-950 dark:to-zinc-900/60 dark:shadow-inner">
            {content}
          </div>
        </div>
      );
    }

    if (variant === "gradient") {
      return (
        <div
          className={cn(cardVariants({ className, variant }))}
          ref={ref}
          {...props}
        >
          <GradientLines />
        </div>
      );
    }

    return (
      <div
        className={cn(cardVariants({ className, variant }))}
        ref={ref}
        {...props}
      >
        <InnerContent />
        {content}
      </div>
    );
  }
);
Card.displayName = "Card";

export { Card, CardContent, cardVariants };
