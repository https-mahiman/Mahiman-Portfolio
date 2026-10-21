import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Home, Terminal } from "lucide-react";
import NotFoundAnimation from "@/components/NotFoundAnimation";
import ThemeToggle from "@/components/ThemeToggle";

export default function NotFound() {
  return (
    <NotFoundAnimation>
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-5 py-20 text-slate-900 dark:bg-[#0b0f1a] dark:text-white">
        <div className="absolute right-5 top-5 z-20">
          <ThemeToggle />
        </div>
        <div className="pointer-events-none absolute inset-0">
          <div className="notfound-glow-blue absolute left-1/2 top-1/2 h-105 w-105 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[120px]" />

          <div className="notfound-glow-violet absolute left-0 top-0 h-72 w-72 rounded-full bg-violet-600/10 blur-[100px]" />

          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(148,163,184,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,.3) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
        </div>

        <section className="relative z-10 mx-auto w-full max-w-3xl text-center">
          <div className="notfound-pill mx-auto mb-8 flex w-fit items-center gap-2 rounded-full border border-slate-300 bg-white/80 px-4 py-2 text-sm text-slate-700 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
            <Terminal size={16} className="text-blue-300" />
            <span>404 · Page not found</span>
          </div>

          <h1
            className="notfound-number select-none text-[clamp(8rem,25vw,16rem)] font-black leading-[0.8] tracking-tighter"
            style={{ perspective: "800px" }}
          >
            <span className="bg-linear-to-br from-cyan-300 via-blue-400 to-violet-500 bg-clip-text text-transparent">
              404
            </span>
          </h1>

          <h2 className="notfound-heading mt-10 text-3xl font-semibold tracking-tight sm:text-4xl">
            Looks like you took a wrong turn.
          </h2>

          <p className="notfound-description mx-auto mt-5 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-400 sm:text-lg">
            The page you are looking for doesn&apos;t exist, has been moved, or
            the URL might be incorrect. Let&apos;s get you back on track.
          </p>

          <div className="notfound-actions mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 rounded-xl bg-blue-500 px-6 py-3 font-medium text-white transition duration-300 hover:-translate-y-1 hover:bg-blue-400 hover:shadow-lg hover:shadow-blue-500/20"
            >
              <Home size={18} />
              Back to Home
            </Link>

            <Link
              href="/#contact"
              className="group inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 font-medium text-slate-800 transition duration-300 hover:-translate-y-1 hover:border-blue-400/50 hover:bg-blue-50 dark:border-white/15 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
            >
              Contact Me
              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>
          </div>

          <div className="notfound-footer mt-12 flex flex-col items-center gap-2 text-sm text-slate-600 dark:text-slate-500">
            <div className="flex items-center gap-2">
              <ArrowLeft size={14} />
              <span>Even good developers get lost sometimes.</span>
            </div>

            <p className="mt-5 text-xs tracking-widest text-slate-500 dark:text-slate-600">
              MAHIMAN BHATT · DEVELOPER PORTFOLIO
            </p>
          </div>
        </section>
      </main>
    </NotFoundAnimation>
  );
}
