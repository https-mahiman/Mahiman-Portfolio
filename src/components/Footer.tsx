import { ArrowUpRight } from "lucide-react";
import { Suspense } from "react";
import { connection } from "next/server";

async function CopyrightYear() {
  await connection();

  return <>© {new Date().getFullYear()}</>;
}

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#080b14]">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between">
        <a href="#home" className="text-lg font-bold text-white">
          Mahiman<span className="text-blue-400">.</span>
        </a>

        <p className="text-sm text-slate-500">
          <Suspense fallback={<>© 2027</>}>
            <CopyrightYear />
          </Suspense>{" "}
          Mahiman Bhatt. Built with care.
        </p>

        <div className="flex items-center gap-5 text-slate-400">
          <a
            href="https://github.com/https-mahiman"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="hover:text-white"
          >
            {/* Add <Github size={19} /> here if you want the icon. */}
          </a>

          <a
            href="https://www.linkedin.com/in/mahiman-bhatt/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="hover:text-white"
          >
            {/* Add <Linkedin size={19} /> here if you want the icon. */}
          </a>

          <a
            href="mailto:work.mahiman@gmail.com"
            className="flex items-center gap-1 text-sm hover:text-white"
          >
            Email <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}
