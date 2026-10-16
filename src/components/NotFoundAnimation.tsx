"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function NotFoundAnimation({
  children,
}: {
  children: React.ReactNode;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reducedMotion) return;

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.from(".notfound-pill", {
        y: -20,
        autoAlpha: 0,
        duration: 0.6,
      })
        .from(
          ".notfound-number",
          {
            y: 100,
            scale: 0.75,
            rotateX: -35,
            autoAlpha: 0,
            duration: 1,
            ease: "back.out(1.4)",
          },
          "-=0.2",
        )
        .from(
          ".notfound-heading, .notfound-description",
          {
            y: 24,
            autoAlpha: 0,
            duration: 0.7,
            stagger: 0.15,
          },
          "-=0.45",
        )
        .from(
          ".notfound-actions > *",
          {
            y: 20,
            scale: 0.96,
            autoAlpha: 0,
            duration: 0.5,
            stagger: 0.12,
            clearProps: "all",
          },
          "-=0.3",
        )
        .from(
          ".notfound-footer",
          {
            y: 12,
            autoAlpha: 0,
            duration: 0.5,
          },
          "-=0.2",
        );

      gsap.to(".notfound-glow-blue", {
        x: 35,
        y: -25,
        scale: 1.12,
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(".notfound-glow-violet", {
        x: -25,
        y: 30,
        scale: 1.15,
        duration: 5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(".notfound-number", {
        y: -6,
        duration: 2.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 1.2,
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return <div ref={rootRef}>{children}</div>;
}
