"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function PortraitFrame() {
  const portraitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = portraitRef.current;
    if (!frame) return;

    const image = frame.querySelector(".portrait-image");
    const caption = frame.querySelector(".portrait-caption");
    const badge = frame.querySelector(".portrait-badge");

    if (!image || !caption || !badge) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      gsap.set([frame, image, caption, badge], {
        clearProps: "all",
      });
      return;
    }

    let ctx: gsap.Context | undefined;

    const startAnimation = () => {
      // Prevent the animation from starting more than once
      if (ctx) return;

      ctx = gsap.context(() => {
        const timeline = gsap.timeline({
          defaults: {
            ease: "power3.out",
          },
        });

        // Set initial states
        gsap.set(frame, {
          autoAlpha: 0,
          y: 35,
          scale: 0.96,
        });

        gsap.set(image, {
          clipPath: "inset(0 0 0 100%)",
          scale: 1.08,
        });

        gsap.set(caption, {
          autoAlpha: 0,
          y: 18,
        });

        gsap.set(badge, {
          autoAlpha: 0,
          x: -15,
        });

        // Entrance animation
        timeline
          .to(frame, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
          })
          .to(
            image,
            {
              clipPath: "inset(0 0 0 0%)",
              scale: 1,
              duration: 1,
              ease: "power3.inOut",
            },
            "-=0.35",
          )
          .to(
            badge,
            {
              autoAlpha: 1,
              x: 0,
              duration: 0.5,
            },
            "-=0.6",
          )
          .to(
            caption,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.6,
            },
            "-=0.35",
          );

        // Floating / hover animation starts after entrance
        timeline.call(() => {
          gsap.to(image, {
            scale: 1.025,
            duration: 3,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        });
      }, frame);
    };

    // Wait until InitialLoader finishes
    window.addEventListener("portfolio-loader-complete", startAnimation);

    return () => {
      window.removeEventListener("portfolio-loader-complete", startAnimation);

      ctx?.revert();
    };
  }, []);

  return (
    <div
      ref={portraitRef}
      className="portrait-frame relative z-10 rounded-3xl border border-blue-200 bg-linear-to-br from-blue-500/20 to-violet-500/20 p-3 shadow-2xl shadow-blue-950/15 dark:border-white/10 dark:shadow-blue-950/30"
    >
      <div className="relative aspect-4/5 overflow-hidden rounded-2xl bg-linear-to-br from-slate-800 to-blue-950">
        <Image
          src="/images/mahiman-v2.webp"
          alt="Portrait of Mahiman Bhatt"
          width={600}
          height={750}
          priority
          sizes="(max-width: 768px) 90vw, 600px"
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
