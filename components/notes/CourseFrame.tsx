import Link from "next/link";
import type { ReactNode } from "react";
import type { LessonSection } from "@/data/llm-course";
import CourseNavigation from "./CourseNavigation";
import LessonContents from "./LessonContents";

export default function CourseFrame({
  children,
  currentSlug,
  sections,
}: {
  children: ReactNode;
  currentSlug?: string;
  sections: LessonSection[];
}) {
  return (
    <main className="mx-auto max-w-360 px-6 pb-20 pt-10 sm:px-8">
      <Link
        href="/notes"
        className="text-sm text-neutral-500 hover:text-neutral-900"
      >
        ← All notes
      </Link>
      <div className="mt-8 grid items-start gap-10 lg:grid-cols-[230px_minmax(0,1fr)] xl:grid-cols-[230px_minmax(0,1fr)_210px] xl:gap-12">
        <aside className="hidden max-h-[calc(100vh-9rem)] overflow-y-auto border-r border-neutral-200 pr-6 lg:sticky lg:top-32 lg:block">
          <div className="pr-2">
            <CourseNavigation currentSlug={currentSlug} />
          </div>
        </aside>
        <div className="min-w-0">
          <details className="mb-5 border-y border-neutral-200 py-4 lg:hidden">
            <summary className="cursor-pointer text-sm font-medium">
              Course chapters
            </summary>
            <div className="mt-6">
              <CourseNavigation currentSlug={currentSlug} />
            </div>
          </details>
          {sections.length > 0 && (
            <LessonContents sections={sections} variant="mobile" />
          )}
          {children}
        </div>
        {sections.length > 0 && (
          <div className="hidden xl:sticky xl:top-32 xl:block">
            <LessonContents sections={sections} variant="desktop" />
          </div>
        )}
      </div>
    </main>
  );
}
