"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 0);

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });

    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        isScrolled
          ? "border-white/30 bg-white/60 shadow-sm backdrop-blur-xl backdrop-saturate-150"
          : "border-transparent bg-white/80"
      }`}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-8 sm:px-8">
        <Link href="/" className="text-base font-semibold tracking-tight">
          Derek
          <span className="brand-dot" aria-hidden="true" />
        </Link>

        <nav className="flex gap-4 text-sm text-neutral-500 sm:gap-6">
          <Link
            href="/projects"
            className="transition-colors hover:text-neutral-900"
          >
            Projects
          </Link>

          <Link
            href="/blogs"
            className="transition-colors hover:text-neutral-900"
          >
            Blogs
          </Link>

          <Link
            href="/notes"
            className="transition-colors hover:text-neutral-900"
          >
            Notes
          </Link>

          <Link
            href="/about"
            className="transition-colors hover:text-neutral-900"
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
