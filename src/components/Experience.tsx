import { BriefcaseBusiness, GraduationCap, BookOpen } from "lucide-react";

const timeline = [
  {
    icon: BriefcaseBusiness,
    period: "September 2025 – March 2026",
    title: "Full-Stack Web Development Intern",
    organization: "Unified Mentor Pvt. Ltd.",
    description:
      "Gained practical experience with web development tasks, application workflows, frontend interfaces, and backend concepts.",
  },
  {
    icon: BookOpen,
    period: "Currently learning",
    title: "Flutter & Dart Training",
    organization: "TOPS Technologies",
    description:
      "Learning Flutter widgets, layouts, state management, navigation, asynchronous programming, and mobile UI development.",
  },
  {
    icon: GraduationCap,
    period: "2025",
    title: "Bachelor of Computer Applications",
    organization: "Lokmanya College of Computer Application",
    description:
      "Completed a BCA degree, building a foundation in computer applications and software development.",
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="scroll-mt-24 bg-slate-100 py-24 dark:bg-[#080b14] sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-700 dark:text-blue-300">
          My journey
        </p>

        <h2 className="mt-4 text-4xl font-semibold text-slate-900 dark:text-white sm:text-5xl">
          Experience & education.
        </h2>

        <div className="mt-12 max-w-4xl space-y-5">
          {timeline.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/2.5 sm:grid-cols-[52px_1fr] sm:gap-6 sm:p-7"
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl border border-blue-300/30 bg-blue-100 text-blue-700 dark:border-blue-300/20 dark:bg-blue-400/10 dark:text-blue-300">
                  <Icon size={21} />
                </div>

                <div>
                  <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                    {item.period}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-slate-700 dark:text-slate-300">{item.organization}</p>
                  <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">
                    {item.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
