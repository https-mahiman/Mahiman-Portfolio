"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    // A large blurred glow has no useful target on touchscreens. Avoid the
    // pointer listener and its animation loop unless a real cursor is present.
    const hasFinePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;

    if (!hasFinePointer) return;

    const handleMouseMove = (event: MouseEvent) => {
      glow.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate3d(-50%, -50%, 0)`;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      //   className="pointer-events-none fixed left-0 top-0 z-9999
      //     h-40 w-40 rounded-full
      //     bg-linear-to-r from-blue-300 via-blue-400 to-violet-400
      //     blur-[100px]"
      className="cursor-glow pointer-events-none fixed left-0 top-0 z-1 h-28 w-28 rounded-full bg-linear-to-r from-blue-300 via-blue-400/50 to-violet-400/20 blur-[80px]"
      style={{ transform: "translate3d(-50%, -50%, 0)" }}
    />
  );
}
