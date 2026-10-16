"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";

export default function Contact() {
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      subject: String(data.get("subject") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
      website: String(data.get("website") ?? "").trim(),
    };

    setSending(true);
    setStatus("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result: { message?: string } = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to send the message.");
      }

      setStatus("Message sent successfully. Thank you for reaching out!");
      form.reset();
    } catch (error) {
      setStatus(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please email me directly.",
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <section
      id="contact"
      className="relative z-0 w-full scroll-mt-24 bg-[#0b0f1a] py-24 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-300">
            Get in touch
          </p>

          <h2 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">
            Have an idea?
            <br />
            <span className="text-slate-400">Let&apos;s talk.</span>
          </h2>

          <p className="mt-6 max-w-lg leading-8 text-slate-400">
            Have a developer opportunity, a freelance project, or a question?
            Send me a message and I&apos;ll get back to you as soon as I can.
          </p>

          <a
            href="mailto:work.mahiman@gmail.com"
            className="mt-8 flex items-center gap-4 text-slate-300 hover:text-white"
          >
            <span className="rounded-xl border border-white/10 p-3 text-blue-300">
              <Mail size={20} />
            </span>
            <span>work.mahiman@gmail.com</span>
          </a>

          <div className="mt-5 flex items-center gap-4 text-slate-300">
            <span className="rounded-xl border border-white/10 p-3 text-blue-300">
              <MapPin size={20} />
            </span>
            Ahmedabad, India
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-white/10 bg-[#080b14] p-5 sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm text-slate-200"
              >
                Your name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                minLength={2}
                maxLength={100}
                required
                placeholder="John Doe"
                suppressHydrationWarning
                className="w-full rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-blue-400"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm text-slate-200"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                maxLength={254}
                required
                suppressHydrationWarning
                placeholder="john@example.com"
                className="w-full rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-blue-400"
              />
            </div>
          </div>

          <div className="mt-5">
            <label
              htmlFor="subject"
              className="mb-2 block text-sm text-slate-200"
            >
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              maxLength={150}
              required
              suppressHydrationWarning
              placeholder="Project inquiry or job opportunity"
              className="w-full rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-blue-400"
            />
          </div>

          <div className="mt-5">
            <label
              htmlFor="message"
              className="mb-2 block text-sm text-slate-200"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              minLength={10}
              maxLength={5000}
              required
              suppressHydrationWarning
              placeholder="Tell me about your project..."
              className="w-full resize-y rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-blue-400"
            />
          </div>

          {/* Honeypot: the backend must reject submissions with this field filled. */}
          <div className="absolute left-[-10000px]" aria-hidden="true">
            <label htmlFor="website">Leave this field empty</label>
            <input
              id="website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {status && (
            <p
              role="status"
              aria-live="polite"
              className="mt-5 text-sm text-slate-300"
            >
              {status}
            </p>
          )}

          <button
            type="submit"
            disabled={sending}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-blue-500 px-6 py-3.5 font-semibold text-white transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {sending ? "Sending..." : "Send message"}
            {!sending && <ArrowUpRight size={17} />}
          </button>
        </form>
      </div>
    </section>
  );
}
