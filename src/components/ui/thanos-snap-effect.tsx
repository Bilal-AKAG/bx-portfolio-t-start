import {
  m,
  useAnimate,
  useMotionValue,
  useMotionValueEvent,
} from "motion/react";
import { forwardRef, useImperativeHandle, useRef } from "react";
import type { PropsWithChildren } from "react";

const DURATION_SECONDS = 1.2;
const MAX_DISPLACEMENT = 300;
const OPACITY_CHANGE_START = 0.5;
const transition = {
  duration: DURATION_SECONDS,
  ease: (time: number) => 1 - (1 - time) ** 3,
};

export const ThanosSnapEffect = forwardRef<
  { handleClick: () => Promise<void> },
  PropsWithChildren
>(({ children }, ref) => {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const displacementMapRef = useRef<SVGFEDisplacementMapElement>(null);
  const dissolveTargetRef = useRef<HTMLDivElement>(null);
  const displacement = useMotionValue(0);

  useMotionValueEvent(displacement, "change", (latest) => {
    displacementMapRef.current?.setAttribute("scale", latest.toString());
  });

  const handleClick = async () => {
    if (scope.current.dataset.isAnimating === "true") {
      return;
    }
    scope.current.dataset.isAnimating = "true";

    await Promise.all([
      animate(
        dissolveTargetRef.current,
        { opacity: [1, 1, 0], scale: 1.2 },
        { ...transition, times: [0, OPACITY_CHANGE_START, 1] }
      ),
      animate(displacement, MAX_DISPLACEMENT, transition),
    ]);

    setTimeout(() => {
      animate(
        dissolveTargetRef.current,
        { opacity: 1, scale: 1 },
        { duration: 0 }
      );
      displacement.set(0);
      scope.current.dataset.isAnimating = "false";
    }, 500);
  };

  useImperativeHandle(ref, () => ({
    handleClick,
  }));

  return (
    <div ref={scope}>
      <m.div
        className="filter-[url(#dissolve-filter)] cursor-pointer"
        onClick={handleClick}
        ref={dissolveTargetRef}
      >
        {children}
      </m.div>

      <svg className="-z-1 absolute" height="0" width="0">
        <defs>
          <filter
            colorInterpolationFilters="sRGB"
            height="600%"
            id="dissolve-filter"
            width="600%"
            x="-300%"
            y="-300%"
          >
            <feTurbulence
              baseFrequency="0.015"
              numOctaves="1"
              result="bigNoise"
              type="fractalNoise"
            />
            <feComponentTransfer in="bigNoise" result="bigNoiseAdjusted">
              <feFuncR intercept="-0.2" slope="0.5" type="linear" />
              <feFuncG intercept="-0.6" slope="3" type="linear" />
            </feComponentTransfer>
            <feTurbulence
              baseFrequency="1"
              numOctaves="2"
              result="fineNoise"
              type="fractalNoise"
            />
            <feMerge result="combinedNoise">
              <feMergeNode in="bigNoiseAdjusted" />
              <feMergeNode in="fineNoise" />
            </feMerge>
            <feDisplacementMap
              in="SourceGraphic"
              in2="combinedNoise"
              ref={displacementMapRef}
              scale="0"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
});
