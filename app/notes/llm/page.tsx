import type { Metadata } from "next";
import Link from "next/link";
import CourseFrame from "@/components/notes/CourseFrame";
import { courseChapters } from "@/data/llm-course";

export const metadata: Metadata = {
  title: "From vectors to Transformers | Derek",
  description: "A step-by-step introduction to the ideas behind large language models, from vectors to Transformers.",
};

export default function CoursePage() {
  return (
    <CourseFrame sections={[]}>
      <header>
        <p className="text-sm text-neutral-500">Notes / AI & large language models</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">From vectors to Transformers</h1>
        <p className="mt-6 text-lg leading-8 text-neutral-600">A step-by-step introduction to the ideas behind large language models.</p>
        <p className="mt-6 text-sm leading-7 text-neutral-500">Lesson 01 is available. The remaining lessons are listed below and are not available yet.</p>
        <Link href="/notes/llm/math-01-vector" className="mt-6 inline-block text-sm font-medium underline underline-offset-4 hover:text-neutral-500">Start with What is a vector? →</Link>
      </header>
      <div className="mt-12 space-y-12">
        {courseChapters.map((chapter) => (
          <section key={chapter.id}>
            <h2 className="mb-4 text-lg font-medium"><span className="mr-3 font-mono text-sm text-neutral-400">{chapter.number}</span>{chapter.title}</h2>
            <ul className="border-t border-neutral-200">
              {chapter.lessons.map((lesson) => (
                <li key={lesson.slug} className="flex items-start gap-3 border-b border-neutral-200 py-4 text-sm leading-6">
                  <span className="w-6 shrink-0 font-mono text-neutral-400">{lesson.number}</span>
                  <div>
                    {lesson.available ? <Link href={`/notes/llm/${lesson.slug}`} className="font-medium hover:text-neutral-500">{lesson.title} →</Link> : <span className="text-neutral-500">{lesson.title}</span>}
                    {!lesson.available && <p className="text-xs text-neutral-400">Not available yet</p>}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </CourseFrame>
  );
}
