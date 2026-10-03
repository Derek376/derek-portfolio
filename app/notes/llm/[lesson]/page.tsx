import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CourseFrame from "@/components/notes/CourseFrame";
import VectorLesson from "@/content/notes/llm/math-01-vector.mdx";
import { courseLessons } from "@/data/llm-course";

const lessonContent = { "math-01-vector": VectorLesson };
type Props = { params: Promise<{ lesson: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(lessonContent).map((lesson) => ({ lesson }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lesson: slug } = await params;
  const lesson = courseLessons.find((item) => item.slug === slug && item.available);
  return { title: lesson ? `${lesson.title} | Derek's Notes` : "Lesson not found" };
}

export default async function LessonPage({ params }: Props) {
  const { lesson: slug } = await params;
  const lesson = courseLessons.find((item) => item.slug === slug && item.available);
  const Content = lessonContent[slug as keyof typeof lessonContent];
  if (!lesson || !Content) notFound();

  return (
    <CourseFrame currentSlug={slug} sections={lesson.sections}>
      <header>
        <p className="text-xs font-medium uppercase tracking-widest text-neutral-500">Lesson {lesson.number} · Foundational mathematics</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">{lesson.title}</h1>
        <p className="mt-6 border-l-2 border-neutral-300 pl-5 text-lg leading-8 text-neutral-600">Computers only understand numbers. How can they tell that a cat and a tiger are more alike than a cat and a goldfish?</p>
      </header>
      <article className="lesson-prose"><Content /></article>
      <footer className="mt-16 border-t border-neutral-200 pt-8 text-sm leading-7">
        <p className="font-medium">Next lesson: Common vector operations</p>
        <p className="mt-2 text-neutral-500">Not available yet.</p>
        <Link href="/notes/llm" className="mt-6 inline-block text-neutral-500 hover:text-neutral-900">← Course overview</Link>
      </footer>
    </CourseFrame>
  );
}
