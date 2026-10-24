"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import PortraitFrame from "./PortraitFrame";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
  FaArrowRight,
  FaDownload,
} from "react-icons/fa";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  const scrollIndicatorRef = useRef<HTMLSpanElement>(null);

  const dotRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    const animation = gsap.to(dot, {
      scale: 1.25,
      opacity: 1,
      boxShadow: "0 0 18px #55e5ad",
      duration: 1.2,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    return () => {
      animation.kill();
    };
  }, []);

  useEffect(() => {
    const indicator = scrollIndicatorRef.current;
    if (!indicator) return;

    const ctx = gsap.context(() => {
      gsap.to(indicator, {
        y: 5,
        opacity: 0.65,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, indicator);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const section = heroRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) return;

    let ctx: gsap.Context | undefined;

    const startHeroAnimation = () => {
      // Prevent the animation from starting more than once
      if (ctx) return;

      ctx = gsap.context(() => {
        const timeline = gsap.timeline({
          defaults: { ease: "power3.out" },
        });

        // Hero entrance animation
        timeline
          .from(".hero-eyebrow", {
            y: 16,
            opacity: 0,
            duration: 0.5,
          })
          .from(
            ".hero-title-line",
            {
              y: 32,
              opacity: 0,
              stagger: 0.12,
              duration: 0.65,
            },
            "-=0.2",
          )
          .from(
            ".hero-description, .hero-actions, .hero-social",
            {
              y: 18,
              opacity: 0,
              stagger: 0.12,
              duration: 0.5,
            },
            "-=0.25",
          )
          .from(
            ".hero-orbit, .hero-blob, .hero-monogram",
            {
              scale: 0.88,
              opacity: 0,
              stagger: 0.1,
              duration: 0.75,
            },
            "-=0.6",
          )
          .from(
            ".hero-floating",
            {
              y: 12,
              opacity: 0,
              stagger: 0.1,
              duration: 0.4,
            },
            "-=0.35",
          );

        // Continuous animations
        gsap.to(".hero-blob", {
          rotate: 8,
          scale: 1.035,
          duration: 4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });

        gsap.to(".hero-code-card", {
          y: -8,
          duration: 2.6,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });

        gsap.to(".hero-tag-bottom", {
          y: 7,
          duration: 3.1,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });

        gsap.to(".hero-orbit-one", {
          rotate: 335,
          duration: 30,
          ease: "none",
          repeat: -1,
        });

        gsap.to(".hero-orbit-two", {
          rotate: 405,
          duration: 36,
          ease: "none",
          repeat: -1,
        });
      }, section);
    };

    // Wait until InitialLoader finishes
    window.addEventListener("portfolio-loader-complete", startHeroAnimation);

    return () => {
      window.removeEventListener(
        "portfolio-loader-complete",
        startHeroAnimation,
      );

      ctx?.revert();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      aria-labelledby="hero-heading"
      className="relative isolate mx-auto grid min-h-180 max-w-full grid-cols-1 items-center gap-12 overflow-hidden bg-slate-50 px-5 pb-24 pt-28 dark:bg-[#0b0f1a] sm:px-8 md:min-h-170 md:grid-cols-2 md:gap-8 md:px-12 lg:px-16"
    >
      {/* Background glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-0 -z-10 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-1/3 -z-10 h-96 w-96 rounded-full bg-violet-600/10 blur-[120px]"
      />

      {/* Hero introduction */}
      <div className="relative z-10">
        <div className="hero-eyebrow mb-6 flex flex-wrap items-center gap-3 font-mono text-[10px] tracking-[1.5px] text-slate-600 dark:text-slate-400 sm:text-[11px]">
          <span
            ref={dotRef}
            className="inline-block h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_#55e5ad]"
          />
          <span>FULL-STACK DEVELOPER</span>
          <span className="text-blue-300">/</span>
          <span>AHMEDABAD, INDIA</span>
        </div>

        <h1
          id="hero-heading"
          className="mb-6 text-4xl font-extrabold leading-[1.08] tracking-[-2px] text-slate-900 dark:text-white sm:text-5xl sm:tracking-[-3px] lg:text-7xl"
        >
          <span className="hero-title-line block">I turn ideas into</span>

          <span className="hero-title-line block">
            interactive{" "}
            <span className="bg-linear-to-r from-blue-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              digital
            </span>
          </span>

          <span className="hero-title-line block bg-linear-to-r from-blue-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
            experiences.
          </span>
        </h1>

        <p className="hero-description max-w-xl text-sm leading-8 text-slate-600 dark:text-slate-400 sm:text-base">
          I&apos;m Mahiman Bhatt, a developer working with React, Next.js and
          Node.js, currently expanding into Flutter and cross-platform mobile
          development.
        </p>

        {/* Call-to-action buttons */}
        <div className="hero-actions mt-8 flex flex-wrap gap-3">
          <a
            href="#projects"
            className="inline-flex min-h-12 items-center gap-3 rounded-xl bg-linear-to-r from-blue-500 to-violet-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-950/30 transition duration-300 hover:-translate-y-1 hover:shadow-blue-500/20"
          >
            Explore my work <FaArrowRight size={16} />
          </a>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-12 items-center gap-3 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-900 transition duration-300 hover:-translate-y-1 hover:border-blue-300/30 hover:bg-blue-50 dark:border-white/10 dark:bg-white/2.5 dark:text-white dark:hover:bg-white/5"
          >
            <FaDownload size={16} /> Download resume
          </a>
        </div>

        {/* Social links */}
        <div className="hero-social mt-8 flex flex-wrap items-center gap-3">
          {/* GitHub */}
          <a
            href="https://github.com/https-mahiman"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="group grid h-10 w-10 place-items-center rounded-full border border-slate-300 bg-white text-slate-700 transition-all duration-300 hover:-translate-y-1 hover:border-[#24292e] hover:bg-[#24292e] hover:text-white dark:border-white/10 dark:bg-[#080b14] dark:text-slate-200 dark:hover:border-[#24292e]"
          >
            <FaGithub size={24} />
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/mahiman-bhatt/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="group grid h-10 w-10 place-items-center rounded-full border border-slate-300 bg-white text-slate-700 transition-all duration-300 hover:-translate-y-1 hover:border-[#0A66C2] hover:bg-[#0A66C2] hover:text-white dark:border-white/10 dark:bg-[#080b14] dark:text-slate-200 dark:hover:border-[#0A66C2]"
          >
            <FaLinkedin size={24} />
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/404mahiman/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="group grid h-10 w-10 place-items-center rounded-full border border-slate-300 bg-white text-slate-700 transition-all duration-300 hover:-translate-y-1 hover:border-[#E1306C] hover:bg-[#E1306C] hover:text-white dark:border-white/10 dark:bg-[#080b14] dark:text-slate-200 dark:hover:border-[#E1306C]"
          >
            <FaInstagram size={24} />
          </a>

          {/* Email */}
          <a
            href="mailto:work.mahiman@gmail.com"
            aria-label="Email"
            className="group grid h-10 w-10 place-items-center rounded-full border border-slate-300 bg-white text-slate-700 transition-all duration-300 hover:-translate-y-1 hover:border-[#EA4335] hover:bg-[#EA4335] hover:text-white dark:border-white/10 dark:bg-[#080b14] dark:text-slate-200 dark:hover:border-[#EA4335]"
          >
            <FaEnvelope size={24} />
          </a>

          <span className="ml-1 text-xs text-slate-600 dark:text-slate-500">
            Open to suitable roles &amp; projects
          </span>
        </div>
      </div>

      {/* Abstract developer artwork */}
      <div
        className="relative mx-auto aspect-square w-full max-w-135"
        role="img"
        aria-label="Abstract developer artwork with an M monogram, orbit rings and floating code"
      >
        {/* Orbit rings */}
        <div
          aria-hidden="true"
          className="hero-orbit hero-orbit-one absolute left-1/2 top-1/2 z-0 aspect-square w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-400/30"
        />

        <div
          aria-hidden="true"
          className="hero-orbit hero-orbit-two absolute left-1/2 top-1/2 z-0 h-[58%] w-[86%] -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[50%] border border-violet-400/25"
        />

        {/* Blue-violet central glow */}
        <div
          aria-hidden="true"
          className="hero-blob absolute left-1/2 top-1/2 z-1 aspect-square w-[61%] -translate-x-1/2 -translate-y-1/2 -rotate-12 rounded-[46%_54%_60%_40%/45%_40%_60%_55%] bg-linear-to-br from-blue-500 via-indigo-600 to-violet-600 shadow-[0_0_65px_rgba(75,92,255,0.25)] after:absolute after:inset-1.75 after:rounded-[inherit] after:bg-linear-to-br after:from-slate-950/20 after:to-slate-950/70"
        />

        {/* Portrait */}
        <PortraitFrame />

        {/* Floating code card */}
        <div className="hero-floating hero-code-card absolute -left-2 top-[13%] z-10 rounded-xl border border-blue-300/20 bg-white/95 px-4 py-3 font-mono text-[9px] leading-[1.9] text-slate-700 shadow-xl shadow-black/10 backdrop-blur-xl dark:bg-[#080b14]/95 dark:text-slate-200 dark:shadow-black/30 sm:-left-4 sm:text-[10px] lg:-left-8">
          <div className="mb-2 tracking-[3px] text-slate-500">● ● ●</div>

          <code>
            <span className="text-blue-300">const</span> developer = {"{"}
            <br />
            &nbsp; name:{" "}
            <span className="text-violet-300">&quot;Mahiman&quot;</span>,
            <br />
            &nbsp; focus:{" "}
            <span className="text-violet-300">&quot;Building&quot;</span>,
            <br />
            &nbsp; goal:{" "}
            <span className="text-violet-300">&quot;Impact&quot;</span>
            <br />
            {"};"}
          </code>
        </div>

        {/* Technology tags */}
        <div className="hero-floating absolute right-0 top-[25%] z-10 rounded-xl border border-blue-300/20 bg-white/95 px-3 py-2.5 font-mono text-[9px] font-semibold text-slate-700 shadow-xl backdrop-blur-xl dark:bg-[#080b14]/95 dark:text-slate-200 sm:text-[10px]">
          React / Next.js
        </div>

        <div className="hero-floating hero-tag-bottom absolute bottom-[14%] right-0 z-10 max-w-43.75 rounded-xl border border-blue-300/20 bg-white/95 px-3 py-2.5 text-center font-mono text-[9px] font-semibold text-slate-700 shadow-xl backdrop-blur-xl dark:bg-[#080b14]/95 dark:text-slate-200 sm:max-w-none sm:text-[10px]">
          Frontend · Backend · Mobile
        </div>

        {/* Decorative stars */}
        <span
          aria-hidden="true"
          className="hero-floating absolute right-[17%] top-[8%] text-2xl text-blue-400"
        >
          ✳
        </span>

        <span
          aria-hidden="true"
          className="hero-floating absolute bottom-[10%] left-[11%] text-xl text-violet-400"
        >
          ✦
        </span>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-3 font-mono text-[15px] tracking-[1.5px] text-slate-600 transition hover:text-blue-700 dark:text-slate-500 dark:hover:text-blue-300 md:flex"
      >
        <span
          ref={scrollIndicatorRef}
          aria-hidden="true"
          className="relative h-6 w-4 rounded-full border border-slate-500 before:absolute before:left-1/2 before:top-1 before:h-1 before:w-0.5 before:-translate-x-1/2 before:rounded-full before:bg-blue-300"
        />
        SCROLL TO EXPLORE
      </a>
    </section>
  );
}
