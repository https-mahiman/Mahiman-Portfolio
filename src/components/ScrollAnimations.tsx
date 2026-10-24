"use client";

import { useEffect } from "react";

type RevealOptions = {
  y?: number;
  x?: number;
  stagger?: number;
  duration?: number;
};

type RevealGroup = {
  selector: string;
  trigger: string;
  options?: RevealOptions;
};

const revealGroups: RevealGroup[] = [
  { selector: "#about h2", trigger: "#about", options: { x: -25 } },
  {
    selector: "#about > div > div > div",
    trigger: "#about",
    options: { x: 25 },
  },
  {
    selector: "#about article",
    trigger: "#about article",
    options: { y: 35, stagger: 160 },
  },
  {
    selector: "#skills h2, #skills > div > p",
    trigger: "#skills",
    options: { y: 25, stagger: 100 },
  },
  {
    selector: "#skills article",
    trigger: "#skills",
    options: { y: 35, stagger: 150 },
  },
  {
    selector: "#projects article",
    trigger: "#projects",
    options: { y: 45, stagger: 160, duration: 850 },
  },
  {
    selector: "#experience article",
    trigger: "#experience",
    options: { x: -25, stagger: 180 },
  },
  {
    selector: "#contact > div > div:first-child",
    trigger: "#contact",
    options: { x: -25 },
  },
  {
    selector: "#contact form",
    trigger: "#contact",
    options: { x: 25, duration: 850 },
  },
];

export default function ScrollAnimations() {
  useEffect(() => {
    if (
      window.matchMedia(
        "(prefers-reduced-motion: reduce), (max-width: 767px), (pointer: coarse)",
      ).matches
    ) {
      return;
    }
    if (!("IntersectionObserver" in window)) return;

    const observedTargets = new Set<HTMLElement>();
    const transitionEndHandlers = new Map<
      HTMLElement,
      (event: TransitionEvent) => void
    >();
    const animationFrames: number[] = [];
    const groupsByTrigger = new Map<
      Element,
      Array<{ targets: HTMLElement[]; options: RevealOptions }>
    >();

    const prepareReveal = (
      element: HTMLElement,
      options: RevealOptions,
      index = 0,
    ) => {
      const duration = options.duration ?? 750;

      element.style.opacity = "0";
      element.style.transform = `translate3d(${options.x ?? 0}px, ${options.y ?? 30}px, 0)`;
      element.style.transition = `opacity ${duration}ms ease, transform ${duration}ms ease`;
      element.style.transitionDelay = `${(options.stagger ?? 120) * index}ms`;
      observedTargets.add(element);
    };

    const reveal = (element: HTMLElement) => {
      const frame = window.requestAnimationFrame(() => {
        element.style.opacity = "1";
        element.style.transform = "translate3d(0, 0, 0)";

        const handleTransitionEnd = (event: TransitionEvent) => {
          if (event.target !== element || event.propertyName !== "opacity") {
            return;
          }

          element.style.removeProperty("opacity");
          element.style.removeProperty("transform");
          element.style.removeProperty("transition");
          element.style.removeProperty("transition-delay");
          element.removeEventListener("transitionend", handleTransitionEnd);
          transitionEndHandlers.delete(element);
        };

        transitionEndHandlers.set(element, handleTransitionEnd);
        element.addEventListener("transitionend", handleTransitionEnd);
      });

      animationFrames.push(frame);
    };

    const header = document.querySelector<HTMLElement>("header");
    if (header) {
      prepareReveal(header, { y: -24, duration: 700 });
      reveal(header);
    }

    for (const group of revealGroups) {
      const trigger = document.querySelector(group.trigger);
      const targets = Array.from(
        document.querySelectorAll<HTMLElement>(group.selector),
      );
      if (!trigger || targets.length === 0) continue;

      const options = group.options ?? {};
      targets.forEach((target, index) => prepareReveal(target, options, index));

      const triggerGroups = groupsByTrigger.get(trigger) ?? [];
      triggerGroups.push({ targets, options });
      groupsByTrigger.set(trigger, triggerGroups);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;

          const groups = groupsByTrigger.get(entry.target);
          if (!groups) continue;

          observer.unobserve(entry.target);
          for (const group of groups) {
            group.targets.forEach((target) => reveal(target));
          }
        }
      },
      { rootMargin: "0px 0px -15% 0px" },
    );

    for (const trigger of groupsByTrigger.keys()) {
      observer.observe(trigger);
    }

    return () => {
      observer.disconnect();
      animationFrames.forEach((frame) => window.cancelAnimationFrame(frame));

      for (const [element, handler] of transitionEndHandlers) {
        element.removeEventListener("transitionend", handler);
      }

      for (const element of observedTargets) {
        element.style.removeProperty("opacity");
        element.style.removeProperty("transform");
        element.style.removeProperty("transition");
        element.style.removeProperty("transition-delay");
      }
    };
  }, []);

  return null;
}
