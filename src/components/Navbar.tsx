"use client";

import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#080b14]/90 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#home" className="text-xl font-bold text-white">
          Mahiman<span className="text-blue-400">Bhatt.</span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-sm text-slate-300 transition hover:text-white"
            >
              {label}
            </a>
          ))}
          <a
            href="#contact"
            className="flex items-center gap-2 rounded-full border border-blue-400/40 px-4 py-2 text-sm text-blue-200 hover:bg-blue-400/10"
          >
            Let&apos;s talk <ArrowUpRight size={16} />
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="text-white md:hidden"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-[#080b14] p-4 md:hidden">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-3 text-slate-300 hover:bg-white/5 hover:text-white"
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
