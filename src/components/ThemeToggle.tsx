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

  // Resolve the actual theme only after mounting.
  const isDark = mounted && theme === "dark";

  const handleThemeChange = () => {
    if (!buttonRef.current || animatingRef.current || !mounted) return;

    const nextTheme = theme === "dark" ? "light" : "dark";

    // Respect reduced-motion preferences.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTheme(nextTheme);
      return;
    }

    animatingRef.current = true;

    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();

    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const maxX = Math.max(x, window.innerWidth - x);
    const maxY = Math.max(y, window.innerHeight - y);
    const radius = Math.hypot(maxX, maxY);

    const overlay = document.createElement("div");

    overlay.style.cssText = `
      position: fixed;
      inset: 0;
      z-index: 99999;
      pointer-events: none;
      background: ${nextTheme === "dark" ? "#080b14" : "#ffffff"};
      clip-path: circle(0px at ${x}px ${y}px);
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
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
      height: min(80vw, 500px);
      border-radius: 50%;
      border: 2px solid transparent;
      background:
        linear-gradient(
          ${nextTheme === "dark" ? "#080b14" : "#ffffff"},
          ${nextTheme === "dark" ? "#080b14" : "#ffffff"}
        ) padding-box,
        linear-gradient(135deg, #22d3ee, #3b82f6, #8b5cf6) border-box;
      box-shadow: 0 0 45px rgba(59, 130, 246, 0.25);
      opacity: 0;
      transform: scale(0.5);
    `;

    const logo = document.createElement("img");

    logo.src = "/images/MB.png";
    logo.alt = "Mahiman Bhatt";

    logo.style.cssText = `
      display: block;
      width: 350px;
      height: 350px;
      object-fit: contain;
      opacity: 0;
      position: relative;
      z-index: 1;
    `;

    const label = document.createElement("div");

    label.textContent = nextTheme === "dark" ? "DARK MODE" : "LIGHT MODE";

    label.style.cssText = `
      margin-top: 12px;
      font-family: sans-serif;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 5px;
      color: ${nextTheme === "dark" ? "#cbd5e1" : "#475569"};
      opacity: 0;
      white-space: nowrap;
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
        duration: 0.7,
        ease: "power3.inOut",
      },
      0,
    );

    timeline.fromTo(
      logo,
      {
        y: -window.innerHeight,
        opacity: 0,
        scale: 0.7,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.75,
        ease: "back.out(1.4)",
      },
      0.2,
    );

    timeline.to(
      ring,
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "back.out(1.4)",
      },
      0.65,
    );

    timeline.call(() => setTheme(nextTheme), [], 0.7);

    timeline.to(
      label,
      {
        opacity: 1,
        y: -5,
        duration: 0.35,
        ease: "power2.out",
      },
      0.85,
    );

    timeline.to(
      ring,
      {
        scale: 5.5,
        opacity: 0,
        duration: 0.65,
        ease: "power2.in",
      },
      1.4,
    );

    timeline.to(
      logo,
      {
        y: window.innerHeight,
        opacity: 0,
        duration: 0.55,
        ease: "power3.in",
      },
      1.4,
    );

    timeline.to(
      label,
      {
        opacity: 0,
        duration: 0.2,
      },
      1.4,
    );

    timeline.to(
      overlay,
      {
        opacity: 0,
        duration: 0.4,
        ease: "power2.out",
      },
      1.65,
    );
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={handleThemeChange}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="relative flex h-12 w-24 items-center rounded-full border border-gray-300 bg-linear-to-r from-cyan-100 via-sky-100 to-indigo-100 p-1 shadow-inner transition-colors dark:border-gray-700 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950"
    >
      {/* Decorative background icons */}
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

      {/* Single sliding sun / moon circle */}
      <span
        className={`absolute left-1 top-1 z-10 flex h-10 w-10 items-center justify-center rounded-full shadow-md transition-transform duration-500 ease-in-out ${
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
