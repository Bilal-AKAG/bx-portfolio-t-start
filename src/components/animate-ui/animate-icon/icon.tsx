"use client";

import type { SVGMotionProps, UseInViewOptions } from "motion/react";
import { useAnimation } from "motion/react";
import type { LegacyAnimationControls, Variants } from "motion/react";
import * as React from "react";

import { useIsInView } from "@/hooks/use-is-in-view";
import { cn } from "@/lib/utils";

const staticAnimations = {
  path: {
    animate: {
      opacity: [0, 1],
      pathLength: [0.05, 1],
      transition: {
        duration: 0.8,
        ease: "easeInOut",
        opacity: { duration: 0.01 },
      },
    },
    initial: { opacity: 1, pathLength: 1 },
  } as Variants,
  "path-loop": {
    animate: {
      opacity: [1, 0, 1],
      pathLength: [1, 0.05, 1],
      transition: {
        duration: 1.6,
        ease: "easeInOut",
        opacity: { duration: 0.01 },
      },
    },
    initial: { opacity: 1, pathLength: 1 },
  } as Variants,
} as const;

type StaticAnimations = keyof typeof staticAnimations;
type TriggerProp<T = string> = boolean | StaticAnimations | T;

interface AnimateIconContextValue {
  controls: LegacyAnimationControls | undefined;
  animation: StaticAnimations | string;
  loop: boolean;
  loopDelay: number;
}

interface DefaultIconProps<T = string> {
  animate?: TriggerProp<T>;
  onAnimateChange?: (
    value: boolean,
    animation: StaticAnimations | string
  ) => void;
  animateOnHover?: TriggerProp<T>;
  animateOnTap?: TriggerProp<T>;
  animateOnView?: TriggerProp<T>;
  animateOnViewMargin?: UseInViewOptions["margin"];
  animateOnViewOnce?: boolean;
  animation?: T | StaticAnimations;
  loop?: boolean;
  loopDelay?: number;
  onAnimateStart?: () => void;
  onAnimateEnd?: () => void;
  delay?: number;
}

interface AnimateIconProps<T = string> extends DefaultIconProps<T> {
  children: React.ReactNode;
  asChild?: boolean;
}

interface IconProps<T>
  extends
    DefaultIconProps<T>,
    Omit<
      SVGMotionProps<SVGSVGElement>,
      "animate" | "onAnimationStart" | "onAnimationEnd"
    > {
  size?: number;
}

interface IconWrapperProps<T> extends IconProps<T> {
  icon: React.ComponentType<IconProps<T>>;
}

const AnimateIconContext = React.createContext<AnimateIconContextValue | null>(
  null
);

function useAnimateIconContext() {
  const context = React.use(AnimateIconContext);
  if (!context) {
    return {
      animation: "default",
      controls: undefined,
      loop: false,
      loopDelay: 0,
    };
  }
  return context;
}

function composeEventHandlers<E extends React.SyntheticEvent<unknown>>(
  theirs?: (event: E) => void,
  ours?: (event: E) => void
) {
  return (event: E) => {
    theirs?.(event);
    ours?.(event);
  };
}

function mergeRefs<T>(...refs: (React.Ref<T> | undefined)[]) {
  return (value: T) => {
    for (const ref of refs) {
      if (!ref) {
        continue;
      }
      if (typeof ref === "function") {
        ref(value);
      } else {
        (ref as React.MutableRefObject<T | null>).current = value;
      }
    }
  };
}

//
type AnyProps = Record<string, any>;

type SlotProps<E extends Element = HTMLElement> = {
  children: React.ReactElement;
} & React.HTMLAttributes<E> &
  AnyProps;

function Slot<E extends Element = HTMLElement>({
  children,
  ...slotProps
}: SlotProps<E>) {
  if (!React.isValidElement(children)) {
    return children;
  }

  const {
    className: slotClassName,
    style: slotStyle,
    ref: slotRef,
    onMouseEnter: sOnMouseEnter,
    onMouseLeave: sOnMouseLeave,
    onPointerDown: sOnPointerDown,
    onPointerUp: sOnPointerUp,
    ...restSlot
  } = slotProps;

  const {
    className: childClassName,
    style: childStyle,
    ref: childRef,
    onMouseEnter: cOnMouseEnter,
    onMouseLeave: cOnMouseLeave,
    onPointerDown: cOnPointerDown,
    onPointerUp: cOnPointerUp,
    ...restChild
  } = (children.props ?? {}) as AnyProps;

  const mergedProps: AnyProps = {
    ...restChild,
    ...restSlot,
    className: cn(childClassName, slotClassName),
    onMouseEnter: composeEventHandlers(cOnMouseEnter, sOnMouseEnter),
    onMouseLeave: composeEventHandlers(cOnMouseLeave, sOnMouseLeave),
    onPointerDown: composeEventHandlers(cOnPointerDown, sOnPointerDown),
    onPointerUp: composeEventHandlers(cOnPointerUp, sOnPointerUp),
    ref: mergeRefs(childRef, slotRef),
    style: { ...childStyle, ...slotStyle },
  };

  return React.cloneElement(children, mergedProps);
}

function AnimateIcon({
  animate,
  onAnimateChange,
  asChild = true,
  animateOnHover,
  animateOnTap,
  animateOnView,
  animateOnViewMargin = "0px",
  animateOnViewOnce = true,
  animation = "default",
  loop = false,
  loopDelay = 0,
  onAnimateStart,
  onAnimateEnd,
  delay = 0,
  children,
}: AnimateIconProps) {
  const controls = useAnimation();

  const localAnimateRef = React.useRef<boolean>(
    animate === undefined || animate === false ? false : delay <= 0
  );

  const [currentAnimation, setCurrentAnimation] = React.useState<
    string | StaticAnimations
  >(typeof animate === "string" ? animate : animation);

  const delayRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const runAnimation = React.useCallback(
    (animState: boolean, animName: string | StaticAnimations) => {
      if (animState) {
        onAnimateStart?.();
      }
      controls.start(animState ? "animate" : "initial").then(() => {
        if (animState) {
          onAnimateEnd?.();
        }
      });
      onAnimateChange?.(animState, animName);
    },
    [controls, onAnimateChange, onAnimateEnd, onAnimateStart]
  );

  const startAnimation = React.useCallback(
    (trigger: TriggerProp) => {
      const next = typeof trigger === "string" ? trigger : animation;
      if (delayRef.current) {
        clearTimeout(delayRef.current);
        delayRef.current = null;
      }
      setCurrentAnimation(next);
      if (delay > 0) {
        localAnimateRef.current = false;
        delayRef.current = setTimeout(() => {
          localAnimateRef.current = true;
          runAnimation(true, next);
        }, delay);
      } else {
        localAnimateRef.current = true;
        runAnimation(true, next);
      }
    },
    [animation, delay, runAnimation]
  );

  const stopAnimation = React.useCallback(() => {
    if (delayRef.current) {
      clearTimeout(delayRef.current);
      delayRef.current = null;
    }
    localAnimateRef.current = false;
    runAnimation(false, currentAnimation);
  }, [currentAnimation, runAnimation]);

  React.useEffect(() => {
    if (animate === undefined) {
      return;
    }
    const next = typeof animate === "string" ? animate : animation;
    setCurrentAnimation(next);
    if (animate) {
      if (delay > 0) {
        localAnimateRef.current = false;
        const id = setTimeout(() => {
          localAnimateRef.current = true;
          runAnimation(true, next);
        }, delay);
        delayRef.current = id;
        return () => clearTimeout(id);
      }
      localAnimateRef.current = true;
      runAnimation(true, next);
    } else {
      localAnimateRef.current = false;
      runAnimation(false, next);
    }
  }, [animate, animation, delay, runAnimation]);

  React.useEffect(
    () => () => {
      if (delayRef.current) {
        clearTimeout(delayRef.current);
      }
    },
    []
  );

  const viewOuterRef = React.useRef<HTMLElement>(null);
  const { ref: inViewRef, isInView } = useIsInView(viewOuterRef, {
    inView: !!animateOnView,
    inViewMargin: animateOnViewMargin,
    inViewOnce: animateOnViewOnce,
  });

  React.useEffect(() => {
    if (!animateOnView) {
      return;
    }
    if (isInView) {
      startAnimation(animateOnView);
    } else {
      stopAnimation();
    }
  }, [isInView, animateOnView, startAnimation, stopAnimation]);

  const childProps = (
    React.isValidElement(children) ? (children as React.ReactElement).props : {}
  ) as AnyProps;

  const handleMouseEnter = composeEventHandlers<React.MouseEvent<HTMLElement>>(
    childProps.onMouseEnter,
    () => {
      if (animateOnHover) {
        startAnimation(animateOnHover);
      }
    }
  );

  const handleMouseLeave = composeEventHandlers<React.MouseEvent<HTMLElement>>(
    childProps.onMouseLeave,
    () => {
      if (animateOnHover || animateOnTap) {
        stopAnimation();
      }
    }
  );

  const handlePointerDown = composeEventHandlers<
    React.PointerEvent<HTMLElement>
  >(childProps.onPointerDown, () => {
    if (animateOnTap) {
      startAnimation(animateOnTap);
    }
  });

  const handlePointerUp = composeEventHandlers<React.PointerEvent<HTMLElement>>(
    childProps.onPointerUp,
    () => {
      if (animateOnTap) {
        stopAnimation();
      }
    }
  );

  const content = asChild ? (
    <Slot
      ref={inViewRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      {children as React.ReactElement}
    </Slot>
  ) : (
    <span
      ref={inViewRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      style={{ display: "contents" }}
    >
      {children}
    </span>
  );

  return (
    <AnimateIconContext.Provider
      value={{
        animation: currentAnimation,
        controls,
        loop,
        loopDelay,
      }}
    >
      {content}
    </AnimateIconContext.Provider>
  );
}

const pathClassName =
  "[&_[stroke-dasharray='1px_1px']]:![stroke-dasharray:1px_0px]";

function IconWrapper<T extends string>({
  size = 28,
  animation: animationProp,
  animate,
  onAnimateChange,
  animateOnHover = false,
  animateOnTap = false,
  animateOnView = false,
  animateOnViewMargin = "0px",
  animateOnViewOnce = true,
  icon: IconComponent,
  loop = false,
  loopDelay = 0,
  onAnimateStart,
  onAnimateEnd,
  delay = 0,
  className,
  ...props
}: IconWrapperProps<T>) {
  const context = React.use(AnimateIconContext);

  if (context) {
    const {
      controls,
      animation: parentAnimation,
      loop: parentLoop,
      loopDelay: parentLoopDelay,
    } = context;
    const animationToUse = animationProp ?? parentAnimation;
    const loopToUse = loop || parentLoop;
    const loopDelayToUse = loopDelay || parentLoopDelay;

    return (
      <AnimateIconContext.Provider
        value={{
          animation: animationToUse,
          controls,
          loop: loopToUse,
          loopDelay: loopDelayToUse,
        }}
      >
        <IconComponent
          size={size}
          className={cn(
            className,
            (animationToUse === "path" || animationToUse === "path-loop") &&
              pathClassName
          )}
          {...props}
        />
      </AnimateIconContext.Provider>
    );
  }

  if (
    animate !== undefined ||
    onAnimateChange !== undefined ||
    animateOnHover ||
    animateOnTap ||
    animateOnView ||
    animationProp
  ) {
    return (
      <AnimateIcon
        animate={animate}
        onAnimateChange={onAnimateChange}
        animateOnHover={animateOnHover}
        animateOnTap={animateOnTap}
        animateOnView={animateOnView}
        animateOnViewMargin={animateOnViewMargin}
        animateOnViewOnce={animateOnViewOnce}
        animation={animationProp}
        loop={loop}
        loopDelay={loopDelay}
        onAnimateStart={onAnimateStart}
        onAnimateEnd={onAnimateEnd}
        delay={delay}
        asChild
      >
        <IconComponent
          size={size}
          className={cn(
            className,
            (animationProp === "path" || animationProp === "path-loop") &&
              pathClassName
          )}
          {...props}
        />
      </AnimateIcon>
    );
  }

  return (
    <IconComponent
      size={size}
      className={cn(
        className,
        (animationProp === "path" || animationProp === "path-loop") &&
          pathClassName
      )}
      {...props}
    />
  );
}

function getVariants<
  V extends { default: T; [key: string]: T },
  T extends Record<string, Variants>,
>(animations: V, context?: AnimateIconContextValue): T {
  const { animation: animationType, loop, loopDelay } = context ?? {
    animation: "default" as StaticAnimations | string,
    controls: undefined,
    loop: false,
    loopDelay: 0,
  };

  let result: T;

  if (animationType in staticAnimations) {
    const variant = staticAnimations[animationType as StaticAnimations];
    result = {} as T;
    for (const key in animations.default) {
      if (
        (animationType === "path" || animationType === "path-loop") &&
        /group/.test(key)
      ) {
        continue;
      }
      result[key] = variant as T[Extract<keyof T, string>];
    }
  } else {
    result = (animations[animationType as keyof V] as T) ?? animations.default;
  }

  if (loop) {
    for (const key in result) {
      //
      const state = result[key] as any;
      const transition = state.animate?.transition;
      if (!transition) {
        continue;
      }

      const hasNestedKeys = Object.values(transition).some(
        (v) =>
          typeof v === "object" &&
          v !== null &&
          ("ease" in v || "duration" in v || "times" in v)
      );

      if (hasNestedKeys) {
        for (const prop in transition) {
          const subTrans = transition[prop];
          if (typeof subTrans === "object" && subTrans !== null) {
            transition[prop] = {
              ...subTrans,
              repeat: Infinity,
              repeatDelay: loopDelay,
              repeatType: "loop",
            };
          }
        }
      } else {
        state.animate.transition = {
          ...transition,
          repeat: Infinity,
          repeatDelay: loopDelay,
          repeatType: "loop",
        };
      }
    }
  }

  return result;
}

export {
  
  
  
  IconWrapper,
  useAnimateIconContext,
  getVariants,
  type IconProps,
  
  
  
};
