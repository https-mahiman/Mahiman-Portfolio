"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import gsap from "gsap";

type InitialLoaderProps = {
  children: ReactNode;
};

export default function InitialLoader({ children }: InitialLoaderProps) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const name = nameRef.current;
    const loader = loaderRef.current;

    const dispatchComplete = () => {
      window.dispatchEvent(new Event("portfolio-loader-complete"));
    };

    if (!name || !loader) {
      setIsLoaded(true);
      dispatchComplete();
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    // Skip the loader on mobile and for reduced motion.
    if (prefersReducedMotion || isMobile) {
      setProgress(100);
      setIsLoaded(true);
      dispatchComplete();
      return;
    }

    const counter = { value: 0 };

    const calculateZoom = () => {
      const nameWidth = name.offsetWidth;
      const nameHeight = name.offsetHeight;

      if (!nameWidth || !nameHeight) return 1;

      const scaleX = window.innerWidth / nameWidth;
      const scaleY = window.innerHeight / nameHeight;

      return Math.max(scaleX, scaleY) * 1.15;
    };

    const animationContext = gsap.context(() => {
      const timeline = gsap.timeline({
        onComplete: () => {
          setProgress(100);
          setIsLoaded(true);
          dispatchComplete();
        },
      });

      timeline.to(counter, {
        value: 100,
        duration: 1.1,
        ease: "power1.out",
        onUpdate: () => {
          setProgress(Math.round(counter.value));
        },
      });

      timeline.to(name, {
        scale: calculateZoom(),
        duration: 0.7,
        ease: "power3.in",
        transformOrigin: "center center",
      });
    }, loader);

    return () => {
      animationContext.revert();
    };
  }, []);

  return (
    <>
      {/* Homepage: visible immediately */}
      <div>{children}</div>

      {/* Decorative loader: does not hide homepage */}
      {!isLoaded && (
        <div
          ref={loaderRef}
          aria-hidden="true"
          className="
            pointer-events-none fixed inset-0 z-9999
            flex flex-col items-center justify-center
            overflow-hidden bg-[#0b0f1a] text-white
          "
        >
          <div
            ref={nameRef}
            className="
              max-w-[95vw] text-center
              text-[clamp(2.5rem,9vw,9rem)]
              font-bold leading-[0.95] tracking-tight
              wrap-break-word transform-gpu
            "
            style={{ willChange: "transform" }}
          >
            Mahiman
            <span className="text-blue-600 dark:text-blue-400"> Bhatt.</span>
          </div>

          <div
            className="
              absolute
              bottom-[max(2rem,env(safe-area-inset-bottom))]
              text-2xl font-bold tabular-nums
              sm:text-3xl md:text-4xl
            "
          >
            {progress}%
          </div>
        </div>
      )}
    </>
  );
}
