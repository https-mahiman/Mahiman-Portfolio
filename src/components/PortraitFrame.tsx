"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function PortraitFrame() {
  const portraitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = portraitRef.current;
    if (!frame) return;

    const ctx = gsap.context(() => {
      const image = frame.querySelector(".portrait-image");
      const caption = frame.querySelector(".portrait-caption");
      const badge = frame.querySelector(".portrait-badge");

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) return;

      gsap.fromTo(
        frame,
        { autoAlpha: 0, y: 40, scale: 0.96 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: frame,
            start: "top 85%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        caption,
        { autoAlpha: 0, y: 18 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: frame,
            start: "top 85%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        badge,
        { autoAlpha: 0, x: -15 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.6,
          delay: 0.45,
          ease: "power2.out",
          scrollTrigger: {
            trigger: frame,
            start: "top 85%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        image,
        {
          clipPath: "inset(0 0 0 100%)",
        },
        {
          clipPath: "inset(0 0 0 0%)",
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: frame,
            start: "top 85%",
            once: true,
          },
        },
      );

      const zoomIn = () => {
        gsap.to(image, {
          scale: 1.1,
          duration: 0.65,
          ease: "power3.out",
          overwrite: "auto",
        });

        gsap.to(frame, {
          boxShadow: "0 20px 70px rgba(59, 130, 246, 0.2)",
          duration: 0.5,
          overwrite: "auto",
        });

        gsap.to(caption, {
          y: -8,
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      const zoomOut = () => {
        gsap.to(image, {
          scale: 1,
          duration: 0.65,
          ease: "power3.out",
          overwrite: "auto",
        });

        gsap.to(frame, {
          boxShadow: "0 25px 50px rgba(23, 37, 84, 0.3)",
          duration: 0.5,
          overwrite: "auto",
        });

        gsap.to(caption, {
          y: 0,
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      frame.addEventListener("mouseenter", zoomIn);
      frame.addEventListener("mouseleave", zoomOut);

      return () => {
        frame.removeEventListener("mouseenter", zoomIn);
        frame.removeEventListener("mouseleave", zoomOut);
      };
    }, frame);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={portraitRef}
      className="portrait-frame relative z-10 rounded-3xl border border-blue-200 bg-linear-to-br from-blue-500/20 to-violet-500/20 p-3 shadow-2xl shadow-blue-950/15 dark:border-white/10 dark:shadow-blue-950/30"
    >
      <div className="relative aspect-4/5 overflow-hidden rounded-2xl bg-linear-to-br from-slate-800 to-blue-950">
        <img
          src="/images/mahiman.jpg"
          alt="Portrait of Mahiman Bhatt"
          className="portrait-image h-full w-full object-cover object-center"
        />

        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#080b14]/80 via-transparent to-transparent" />

        <div className="portrait-caption absolute bottom-6 left-6">
          <p className="text-sm text-blue-200">Developer portfolio</p>
          <p className="mt-1 text-2xl font-semibold text-white">
            Ideas into interfaces.
          </p>
        </div>

        <span className="portrait-badge absolute left-4 top-4 rounded-full border border-white/20 bg-black/30 px-3 py-2 text-xs text-white backdrop-blur">
          React · Next.js · Flutter
        </span>
      </div>
    </div>
  );
}
