"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Star, Sparkles, Cloud } from "lucide-react";
import gsap from "gsap";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const animatingRef = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && theme === "dark";

  const handleThemeChange = async () => {
    if (!buttonRef.current || animatingRef.current || !mounted) return;

    const nextTheme = theme === "dark" ? "light" : "dark";

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Use a direct theme change for reduced-motion users.
    if (prefersReducedMotion) {
      setTheme(nextTheme);
      return;
    }

    // Mobile: use a lightweight fade instead of a large
    // clip-path animation.
    const isMobile = window.matchMedia(
      "(max-width: 767px), (pointer: coarse)",
    ).matches;

    // Mobile: lightweight Orbit Reveal animation
    if (isMobile) {
      animatingRef.current = true;

      const background = nextTheme === "dark" ? "#080b14" : "#ffffff";
      const textColor = nextTheme === "dark" ? "#cbd5e1" : "#475569";

      const overlay = document.createElement("div");

      overlay.style.cssText = `
    position: fixed;
    inset: 0;
    z-index: 99999;
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${background};
    opacity: 0;
  `;

      const content = document.createElement("div");

      content.style.cssText = `
    position: relative;
    width: min(75vw, 300px);
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

      // Portrait
      const logo = document.createElement("img");

      logo.src = "/images/MB.webp";
      logo.alt = "";

      logo.style.cssText = `
    position: relative;
    z-index: 2;
    width: 65%;
    height: 65%;
    object-fit: contain;
    border-radius: 50%;
    opacity: 0;
    transform: scale(0.7);
  `;

      // Animated orbit ring
      const ring = document.createElement("div");

      ring.style.cssText = `
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 2px solid transparent;
    background:
      linear-gradient(${background}, ${background}) padding-box,
      linear-gradient(135deg, #22d3ee, #3b82f6, #8b5cf6) border-box;
    box-shadow: 0 0 25px rgba(59, 130, 246, 0.18);
    opacity: 0;
    transform: scale(0.6) rotate(-90deg);
  `;

      // Theme label
      const label = document.createElement("div");

      label.textContent = nextTheme === "dark" ? "DARK MODE" : "LIGHT MODE";

      label.style.cssText = `
    position: absolute;
    top: calc(100% + 22px);
    left: 0;
    width: 100%;
    text-align: center;
    font-family: sans-serif;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 4px;
    color: ${textColor};
    opacity: 0;
    transform: translateY(10px);
  `;

      content.appendChild(ring);
      content.appendChild(logo);

      content.appendChild(label);

      overlay.appendChild(content);
      document.body.appendChild(overlay);

      const timeline = gsap.timeline({
        onComplete: () => {
          overlay.remove();
          animatingRef.current = false;
        },
      });

      // Reveal background
      timeline.to(
        overlay,
        {
          opacity: 1,
          duration: 0.2,
          ease: "power1.out",
        },
        0,
      );

      // Reveal and rotate the ring
      timeline.to(
        ring,
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.45,
          ease: "power2.out",
        },
        0.05,
      );

      // Portrait pops into the center
      timeline.to(
        logo,
        {
          opacity: 1,
          scale: 1,
          duration: 0.45,
          ease: "back.out(1.5)",
        },
        0.15,
      );

      // Orbit dot appears

      // Change the theme once the animation has revealed the portrait
      timeline.call(() => setTheme(nextTheme), [], 0.45);

      // Orbiting movement
      timeline.to(
        ring,
        {
          rotation: 360,
          duration: 0.8,
          ease: "none",
        },
        0.45,
      );

      // Label reveals
      timeline.to(
        label,
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        },
        0.55,
      );

      // Fade the complete animation out
      timeline.to(
        overlay,
        {
          opacity: 0,
          duration: 0.3,
          ease: "power1.out",
        },
        1.25,
      );

      return;
    }

    // Desktop: retain the full animated transition.
    animatingRef.current = true;

    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();

    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const maxX = Math.max(x, window.innerWidth - x);
    const maxY = Math.max(y, window.innerHeight - y);
    const radius = Math.hypot(maxX, maxY);

    const background = nextTheme === "dark" ? "#080b14" : "#ffffff";

    const overlay = document.createElement("div");

    overlay.style.cssText = `
      position: fixed;
      inset: 0;
      z-index: 99999;
      pointer-events: none;
      background: ${background};
      clip-path: circle(0px at ${x}px ${y}px);
      overflow: hidden;
    `;

    const content = document.createElement("div");

    content.style.cssText = `
      position: absolute;
      left: 50%;
      top: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      transform: translate(-50%, -50%);
    `;

    const ring = document.createElement("div");

    ring.style.cssText = `
      position: absolute;
      width: min(80vw, 500px);
      aspect-ratio: 1;
      border-radius: 50%;
      border: 2px solid transparent;
      background:
        linear-gradient(${background}, ${background}) padding-box,
        linear-gradient(135deg, #22d3ee, #3b82f6, #8b5cf6) border-box;
      box-shadow: 0 0 30px rgba(59, 130, 246, 0.2);
      opacity: 0;
      transform: scale(0.5);
    `;

    const logo = document.createElement("img");

    logo.src = "/images/MB.webp";
    logo.alt = "";

    logo.style.cssText = `
      display: block;
      width: min(50vw, 280px);
      height: auto;
      max-height: 60vh;
      object-fit: contain;
      opacity: 0;
      position: relative;
      z-index: 1;
    `;

    const label = document.createElement("div");

    label.textContent = nextTheme === "dark" ? "DARK MODE" : "LIGHT MODE";

    label.style.cssText = `
      position: relative;
      z-index: 2;
      margin-top: 12px;
      font-family: sans-serif;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 4px;
      color: ${nextTheme === "dark" ? "#cbd5e1" : "#475569"};
      opacity: 0;
      white-space: nowrap;
      text-align: center;
    `;

    content.appendChild(ring);
    content.appendChild(logo);
    content.appendChild(label);

    overlay.appendChild(content);
    document.body.appendChild(overlay);

    const timeline = gsap.timeline({
      onComplete: () => {
        overlay.remove();
        animatingRef.current = false;
      },
    });

    timeline.to(
      overlay,
      {
        clipPath: `circle(${radius * 1.5}px at ${x}px ${y}px)`,
        duration: 0.5,
        ease: "power2.inOut",
      },
      0,
    );

    timeline.fromTo(
      logo,
      {
        y: -window.innerHeight,
        opacity: 0,
        scale: 0.8,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
      },
      0.15,
    );

    timeline.to(
      ring,
      {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      },
      0.4,
    );

    timeline.call(() => setTheme(nextTheme), [], 0.5);

    timeline.to(
      label,
      {
        opacity: 1,
        y: -4,
        duration: 0.25,
        ease: "power2.out",
      },
      0.65,
    );

    timeline.to(
      ring,
      {
        scale: 4,
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
      },
      1.1,
    );

    timeline.to(
      logo,
      {
        y: window.innerHeight * 0.5,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
      },
      1.1,
    );

    timeline.to(
      label,
      {
        opacity: 0,
        duration: 0.15,
      },
      1.1,
    );

    timeline.to(
      overlay,
      {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
      },
      1.45,
    );
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={handleThemeChange}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      suppressHydrationWarning
      className="relative flex h-12 w-24 items-center rounded-full border border-gray-300 bg-linear-to-r from-cyan-100 via-sky-100 to-indigo-100 p-1 shadow-inner transition-colors dark:border-gray-700 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950"
    >
      {mounted && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
        >
          {isDark ? (
            <>
              <Star size={8} className="absolute left-3 top-3 text-slate-400" />
              <Sparkles
                size={10}
                className="absolute left-7 bottom-3 text-slate-400"
              />
            </>
          ) : (
            <Cloud
              size={12}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sky-500"
            />
          )}
        </span>
      )}

      <span
        className={`absolute left-1 top-1 z-10 flex h-10 w-10 items-center justify-center rounded-full shadow-md transition-transform duration-300 ease-in-out ${
          isDark ? "translate-x-12 bg-slate-800" : "translate-x-0 bg-white"
        }`}
      >
        {mounted ? (
          isDark ? (
            <Moon size={22} className="text-blue-200" />
          ) : (
            <Sun size={22} className="text-amber-500" />
          )
        ) : (
          <span className="h-5 w-5" />
        )}
      </span>
    </button>
  );
}
