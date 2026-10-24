"use client";

import { useEffect, useRef, useState } from "react";

type DeferredProjectDemoProps = {
  src: string;
  title: string;
  initials: string;
  color: string;
};

export default function DeferredProjectDemo({
  src,
  title,
  initials,
  color,
}: DeferredProjectDemoProps) {
  const previewRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const preview = previewRef.current;
    if (!preview) return;

    if (!("IntersectionObserver" in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: "200px 0px" },
    );

    observer.observe(preview);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={previewRef}
      className="absolute inset-0 overflow-hidden bg-slate-100 dark:bg-[#0b0f1a]"
    >
      {shouldLoad ? (
        <iframe
          src={src}
          title={title}
          className="absolute left-0 top-0 h-200 w-7xl origin-top-left scale-50 border-0"
          loading="eager"
        />
      ) : (
        <div
          aria-hidden="true"
          className={`flex h-full w-full items-center justify-center bg-linear-to-br ${color}`}
        >
          <span className="text-6xl font-semibold text-white">{initials}</span>
        </div>
      )}
    </div>
  );
}
