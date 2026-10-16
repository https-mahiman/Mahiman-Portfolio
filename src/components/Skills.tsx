const skillGroups = [
  {
    title: "Frontend",
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
    ],
  },
  {
    title: "Backend & data",
    skills: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "MongoDB",
      "Firebase",
      "SQL",
    ],
  },
  {
    title: "Mobile & tools",
    skills: [
      "Flutter",
      "Dart",
      "Git",
      "GitHub",
      "VS Code",
      "AI development tools",
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 bg-[#080b14] py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-300">
          Toolkit
        </p>

        <h2 className="mt-4 max-w-2xl text-4xl font-semibold text-white sm:text-5xl">
          Tools I use to bring ideas to life.
        </h2>

        <p className="mt-5 max-w-2xl leading-8 text-slate-400">
          A growing toolkit across frontend, backend, and mobile development,
          strengthened through projects and practical learning.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {skillGroups.map((group) => (
            <article
              key={group.title}
              className="rounded-2xl border border-white/10 bg-white/2.5 p-6"
            >
              <h3 className="text-xl font-semibold text-white">
                {group.title}
              </h3>

              <div className="mt-5 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-white/10 bg-white/4 px-3 py-2 text-sm text-slate-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
