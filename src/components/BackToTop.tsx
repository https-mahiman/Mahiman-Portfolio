"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

export default function BackToTop() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const visibleRef = useRef(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    // Initial hidden state
    gsap.set(button, {
      opacity: 0,
      y: 30,
      scale: 0.8,
      pointerEvents: "none",
    });

    const showButton = () => {
      if (visibleRef.current) return;

      visibleRef.current = true;
      setVisible(true);

      gsap.to(button, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.4,
        ease: "back.out(1.7)",
        pointerEvents: "auto",
      });
    };

    const hideButton = () => {
      if (!visibleRef.current) return;

      visibleRef.current = false;
      setVisible(false);

      gsap.to(button, {
        opacity: 0,
        y: 30,
        scale: 0.8,
        duration: 0.3,
        ease: "power2.in",
        pointerEvents: "none",
      });
    };

    const handleScroll = () => {
      if (window.scrollY > 400) {
        showButton();
      } else {
        hideButton();
      }
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    // Handle page refresh when already scrolled
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      gsap.killTweensOf(button);
    };
  }, []);

  const scrollToTop = () => {
    gsap.to(window, {
      scrollTo: {
        y: 0,
      },
      duration: 1.2,
      ease: "power3.inOut",
    });
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      title="Back to top"
      tabIndex={visible ? 0 : -1}
      className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-blue-400/40 bg-white text-blue-600 shadow-lg shadow-blue-500/10 transition-colors hover:bg-blue-50 dark:bg-[#080b14] dark:text-blue-400 dark:hover:bg-slate-900 sm:bottom-8 sm:right-8"
    >
      <ArrowUp size={22} />
    </button>
  );
}
