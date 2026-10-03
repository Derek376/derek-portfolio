import Link from "next/link";
import { availableLessonCount, courseChapters } from "@/data/llm-course";

export default function CourseNavigation({ currentSlug }: { currentSlug?: string }) {
  return (
    <nav aria-label="Course chapters" className="space-y-7 text-sm">
      <div>
        <Link href="/notes/llm" className="font-medium text-neutral-900 hover:underline">
          From vectors to Transformers
        </Link>
        <p className="mt-2 text-xs leading-5 text-neutral-500">
          {availableLessonCount} lessons are available. More lessons will follow.
        </p>
      </div>

      {courseChapters.map((chapter) => (
        <details key={chapter.id} open className="border-t border-neutral-200 pt-4">
          <summary className="cursor-pointer font-medium text-neutral-900">
            <span className="mr-2 font-mono text-xs text-neutral-500">{chapter.number}</span>
            {chapter.title}
          </summary>
          <ul className="mt-3 space-y-1">
            {chapter.lessons.map((lesson) => (
              <li key={lesson.slug}>
                {lesson.available ? (
                  <Link
                    href={`/notes/llm/${lesson.slug}`}
                    aria-current={currentSlug === lesson.slug ? "page" : undefined}
                    className={`flex gap-3 border-l-2 px-3 py-2 leading-5 ${currentSlug === lesson.slug ? "border-neutral-900 bg-neutral-50 font-medium text-neutral-900" : "border-transparent text-neutral-600 hover:text-neutral-900"}`}
                  >
                    <span className="font-mono text-xs">{lesson.number}</span>
                    {lesson.title}
                  </Link>
                ) : (
                  <span className="flex gap-3 px-3 py-2 leading-5 text-neutral-400">
                    <span className="font-mono text-xs">{lesson.number}</span>
                    {lesson.title}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </details>
      ))}
    </nav>
  );
}
