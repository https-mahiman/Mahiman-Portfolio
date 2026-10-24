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
  const homeRef = useRef<HTMLDivElement>(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const name = nameRef.current;
    const loader = loaderRef.current;

    if (!name || !loader) return;

    // Respect accessibility preferences.
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Detect smaller screens.
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const dispatchComplete = () => {
      window.dispatchEvent(new Event("portfolio-loader-complete"));
    };

    // Skip animations for reduced-motion users.
    if (prefersReducedMotion) {
      setProgress(100);
      setIsLoaded(true);
      dispatchComplete();
      return;
    }

    const counter = { value: 0 };

    // Calculate only the zoom required to fill the screen.
    const calculateZoom = () => {
      const nameWidth = name.offsetWidth;
      const nameHeight = name.offsetHeight;

      if (!nameWidth || !nameHeight) return 1;

      const scaleX = window.innerWidth / nameWidth;
      const scaleY = window.innerHeight / nameHeight;

      // Small extra coverage avoids visible edges.
      return Math.max(scaleX, scaleY) * 1.15;
    };

    // Shorter animations on mobile.
    const counterDuration = isMobile ? 0.9 : 1.4;
    const zoomDuration = isMobile ? 0.65 : 1.0;

    const animationContext = gsap.context(() => {
      const timeline = gsap.timeline({
        onComplete: () => {
          setIsLoaded(true);
          dispatchComplete();
        },
      });

      timeline.to(counter, {
        value: 100,
        duration: counterDuration,
        ease: "power1.out",

        onUpdate: () => {
          setProgress(Math.round(counter.value));
        },
      });

      timeline.to(name, {
        scale: calculateZoom(),
        duration: zoomDuration,
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
      {!isLoaded && (
        <div
          ref={loaderRef}
          className="
            fixed inset-0 z-9999
            flex flex-col items-center justify-center
            overflow-hidden
            bg-transparent text-white
          "
        >
          {/* Animated Name */}
          <div
            ref={nameRef}
            className="
              max-w-[95vw]
              text-center
              text-[clamp(2.5rem,9vw,9rem)]
              font-bold
              leading-[0.95]
              tracking-tight
              wrap-break-word
              transform-gpu
            "
            style={{
              willChange: "transform",
            }}
          >
            Mahiman
            <span className="text-blue-600 dark:text-blue-400"> Bhatt.</span>
          </div>

          {/* Percentage */}
          <div
            className="
              absolute
              bottom-[max(2rem,env(safe-area-inset-bottom))]
              text-2xl sm:text-3xl md:text-4xl
              font-bold tabular-nums
            "
          >
            {progress}%
          </div>
        </div>
      )}

      {/* Homepage */}
      <div
        ref={homeRef}
        className={`
          transition-opacity duration-500
          ${isLoaded ? "opacity-100" : "opacity-0"}
        `}
      >
        {children}
      </div>
    </>
  );
}
