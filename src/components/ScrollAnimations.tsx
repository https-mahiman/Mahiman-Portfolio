"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ScrollAnimations() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Keep the page accessible for users who prefer reduced motion.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      // Navbar entrance.
      gsap.fromTo(
        "header",
        { y: -24, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          ease: "power3.out",
        },
      );

      // Reusable scroll reveal helper.
      const reveal = (
        selector: string,
        trigger: string,
        options: {
          y?: number;
          x?: number;
          stagger?: number;
          duration?: number;
        } = {},
      ) => {
        const elements = gsap.utils.toArray<HTMLElement>(selector);

        if (!elements.length) return;

        gsap.fromTo(
          elements,
          {
            autoAlpha: 0,
            y: options.y ?? 30,
            x: options.x ?? 0,
          },
          {
            autoAlpha: 1,
            y: 0,
            x: 0,
            duration: options.duration ?? 0.75,
            stagger: options.stagger ?? 0.12,
            ease: "power3.out",
            clearProps: "transform",
            scrollTrigger: {
              trigger,
              start: "top 82%",
              once: true,
            },
          },
        );
      };

      // About section.
      reveal("#about h2", "#about", { x: -25 });
      reveal("#about > div > div > div", "#about", { x: 25 });
      reveal("#about article", "#about article", { y: 35, stagger: 0.16 });

      // Skills section.
      reveal("#skills h2, #skills > div > p", "#skills", {
        y: 25,
        stagger: 0.1,
      });
      reveal("#skills article", "#skills", { y: 35, stagger: 0.15 });

      // Project cards.
      reveal("#projects article", "#projects", {
        y: 45,
        stagger: 0.16,
        duration: 0.85,
      });

      // Experience timeline.
      reveal("#experience article", "#experience", {
        x: -25,
        stagger: 0.18,
      });

      // Contact details and form.
      reveal("#contact > div > div:first-child", "#contact", {
        x: -25,
      });
      reveal("#contact form", "#contact", {
        x: 25,
        duration: 0.85,
      });

      // Footer entrance.
      //   reveal("footer > div > *", "footer", {
      //     y: 18,
      //     stagger: 0.1,
      //     duration: 0.6,
      //   });
      // Footer entrance.
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return null;
}
