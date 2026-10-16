import { Code2, Smartphone, Layers3, ArrowUpRight } from "lucide-react";

const highlights = [
  {
    icon: Code2,
    title: "Web development",
    description: "Responsive interfaces and full-stack web applications.",
  },
  {
    icon: Smartphone,
    title: "Mobile development",
    description: "Cross-platform mobile experiences with Flutter and Dart.",
  },
  {
    icon: Layers3,
    title: "Product thinking",
    description: "Maintainable code, thoughtful design, and useful features.",
  },
];

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 bg-[#0b0f1a] py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-300">
              About me
            </p>
            <h2 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">
              Curious by nature.
              <br />
              <span className="text-slate-400">Developer by choice.</span>
            </h2>
          </div>

          <div>
            <p className="text-lg leading-8 text-slate-300">
              I&apos;m Mahiman Bhatt, a developer based in Ahmedabad, India. I
              enjoy turning ideas into digital products, from web applications
              to mobile app experiences.
            </p>

            <p className="mt-5 leading-8 text-slate-400">
              I&apos;m interested in full-stack web development and Flutter
              development opportunities. I continue to improve through practical
              projects, experimentation, and hands-on learning.
            </p>

            <a
              href="#contact"
              className="mt-6 inline-flex items-center gap-2 font-medium text-blue-300 hover:text-blue-200"
            >
              Let&apos;s work together <ArrowUpRight size={17} />
            </a>
          </div>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {highlights.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="rounded-2xl border border-white/10 bg-white/2.5 p-6 transition hover:-translate-y-1 hover:border-blue-300/30"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-blue-400/10 text-blue-300">
                <Icon size={22} />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-white">{title}</h3>
              <p className="mt-3 leading-7 text-slate-400">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
