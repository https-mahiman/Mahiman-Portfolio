"use client";

import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { FaComments } from "react-icons/fa";

const links = [
  ["About", "#about"],
  ["Skills", "#skills"],
  ["Projects", "#projects"],
  ["Experience", "#experience"],
  ["Contact", "#contact"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl transition-colors duration-300 dark:border-white/10 dark:bg-[#080b14]/90">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        {/* Logo */}
        <a
          href="#home"
          className="text-3xl font-bold text-slate-900 dark:text-white"
        >
          Mahiman
          <span className="text-blue-600 dark:text-blue-400">Bhatt.</span>
        </a>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-7 md:flex">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-lg text-slate-600 transition hover:text-blue-600 dark:text-slate-300 dark:hover:text-white"
            >
              {label}
            </a>
          ))}

          <ThemeToggle />

          <a
            href="#contact"
            className="flex items-center gap-2 rounded-full border border-blue-500/40 px-4 py-2 text-sm text-blue-700 transition hover:bg-blue-500/10 dark:text-blue-200"
          >
            <FaComments size={16} />
            Let's talk <ArrowUpRight size={16} />
          </a>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            suppressHydrationWarning
            className="text-slate-900 dark:text-white"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-[#080b14] md:hidden">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-3 text-slate-600 transition hover:bg-slate-100 hover:text-blue-600 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white"
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
