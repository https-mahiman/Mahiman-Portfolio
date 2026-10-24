import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import projects from "@/data/projects.json";
import DeferredProjectDemo from "@/components/DeferredProjectDemo";

export default function Projects() {
  return (
    <section
      id="projects"
      className="scroll-mt-24 bg-white py-24 dark:bg-[#0b0f1a] sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-700 dark:text-blue-300">
              Selected work
            </p>
            <h2 className="mt-4 max-w-2xl text-4xl font-semibold text-slate-900 dark:text-white sm:text-5xl">
              Projects built through curiosity.
            </h2>
          </div>

          <a
            href="https://github.com/https-mahiman"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
          >
            <FaGithub size={16} />
            More on GitHub <ArrowUpRight size={16} />
          </a>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.name}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 transition hover:-translate-y-1 hover:border-slate-300 dark:border-white/10 dark:bg-[#080b14] dark:hover:border-white/20"
            >
              <div
                className={`relative flex aspect-16/8 items-center justify-center overflow-hidden bg-linear-to-br ${project.color}`}
              >
                <div className="absolute h-44 w-44 rounded-full border border-white/15 transition duration-700 group-hover:scale-125" />
                <div className="absolute h-32 w-32 rounded-full border border-white/15" />

                {/* <span className="relative text-6xl font-semibold tracking-tight text-white">
                  {project.initials}
                </span> */}

                <div className="relative h-74 w-full overflow-hidden bg-slate-100 dark:bg-[#0b0f1a]">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={`${project.name} screenshot`}
                      width={1200}
                      height={675}
                      sizes="(max-width: 767px) 100vw, (max-width: 1280px) 50vw, 600px"
                      className="h-full w-full object-contain"
                      loading="lazy"
                    />
                  ) : project.demo ? (
                    <DeferredProjectDemo
                      src={project.demo}
                      title={`${project.name} website preview`}
                      initials={project.initials}
                      color={project.color}
                    />
                  ) : (
                    <div
                      className={`flex h-full w-full items-center justify-center bg-linear-to-br ${project.color}`}
                    >
                      <span className="text-6xl font-semibold text-white">
                        {project.initials}
                      </span>
                    </div>
                  )}
                </div>

                <span className="absolute left-5 top-5 rounded-full border border-white/15 bg-black/20 px-3 py-1.5 text-xs text-white">
                  {project.number}
                </span>
              </div>

              <div className="p-6 sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-700 dark:text-blue-300">
                  {project.type}
                </p>

                <h3 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
                  {project.name}
                </h3>

                <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">
                  {project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-full bg-slate-200 px-3 py-1.5 text-xs text-slate-700 dark:bg-white/6 dark:text-slate-300"
                    >
                      {technology}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-5">
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-slate-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-300"
                    >
                      <FaExternalLinkAlt size={16} />
                      Live demo <ArrowUpRight size={16} />
                    </a>
                  )}

                  <a
                    href={project.code}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                  >
                    <FaGithub size={16} />
                    Source code <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
