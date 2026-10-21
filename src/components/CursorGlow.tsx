"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CursorGlow() {
  const glowRef = useRef(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    const moveX = gsap.quickTo(glow, "x", {
      duration: 0.5,
      ease: "power3",
    });

    const moveY = gsap.quickTo(glow, "y", {
      duration: 0.5,
      ease: "power3",
    });

    const handleMouseMove = (e: { clientX: number; clientY: number }) => {
      moveX(e.clientX);
      moveY(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      gsap.killTweensOf(glow);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      //   className="pointer-events-none fixed left-0 top-0 z-9999
      //     h-40 w-40 rounded-full
      //     bg-linear-to-r from-blue-300 via-blue-400 to-violet-400
      //     blur-[100px]"
      className="pointer-events-none fixed left-0 top-0 z-1 h-28 w-28 rounded-full bg-linear-to-r from-blue-300 via-blue-400/50 to-violet-400/20 blur-[80px]"
      style={{
        x: "-50%",
        y: "-50%",
      }}
    />
  );
}
