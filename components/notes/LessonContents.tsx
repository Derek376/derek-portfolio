"use client";

import { useEffect, useState } from "react";
import type { LessonSection } from "@/data/llm-course";

export default function LessonContents({ sections, variant }: { sections: LessonSection[]; variant: "mobile" | "desktop" }) {
  const [activeId, setActiveId] = useState(sections[0]?.id);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1280px)");
    let frame = 0;
    const update = () => {
      const current = sections.filter((section) => {
        const element = document.getElementById(section.id);
        return element && element.getBoundingClientRect().top <= 150;
      }).at(-1);
      setActiveId(current?.id ?? sections[0]?.id);
    };
    const onScroll = () => {
      if (media.matches !== (variant === "desktop")) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sections, variant]);

  const links = (
    <nav aria-label="On this page">
      <ul className="space-y-3 border-l border-neutral-200">
        {sections.map((section, index) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              aria-current={activeId === section.id ? "location" : undefined}
              className={`-ml-px block border-l-2 px-4 text-sm leading-6 ${activeId === section.id ? "border-neutral-900 font-medium text-neutral-900" : "border-transparent text-neutral-500 hover:text-neutral-900"}`}
            >
              <span className="mr-2 font-mono text-xs">{index + 1}</span>
              {section.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );

  return variant === "mobile" ? (
      <details className="mb-8 border-y border-neutral-200 py-4 xl:hidden">
        <summary className="cursor-pointer text-sm font-medium">On this page</summary>
        <div className="mt-4">{links}</div>
      </details>
  ) : (
      <aside className="hidden max-h-[calc(100vh-9rem)] overflow-y-auto xl:block">
        <div>
          <p className="mb-5 text-xs font-medium uppercase tracking-widest text-neutral-500">On this page</p>
          {links}
        </div>
      </aside>
  );
}
