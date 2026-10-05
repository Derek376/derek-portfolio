import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CourseFrame from "@/components/notes/CourseFrame";
import VectorLesson from "@/content/notes/llm/math-01-vector.mdx";
import OperationsLesson from "@/content/notes/llm/math-02-ops.mdx";
import MatrixLesson from "@/content/notes/llm/math-03-matrix.mdx";
import TransformationLesson from "@/content/notes/llm/math-04-transform.mdx";
import LossLesson from "@/content/notes/llm/nn-03-loss.mdx";
import NetworkLesson from "@/content/notes/llm/nn-03-network.mdx";
import ActivationLesson from "@/content/notes/llm/nn-02-activation.mdx";
import NeuronLesson from "@/content/notes/llm/nn-01-neuron.mdx";
import ProbabilityLesson from "@/content/notes/llm/math-06-prob.mdx";
import GradientLesson from "@/content/notes/llm/math-05-gradient.mdx";
import { courseChapters, courseLessons } from "@/data/llm-course";

const lessonContent = {
  "nn-03-loss": LossLesson,
  "math-01-vector": VectorLesson,
  "math-02-ops": OperationsLesson,
  "math-03-matrix": MatrixLesson,
  "math-04-transform": TransformationLesson,
  "math-05-gradient": GradientLesson,
  "math-06-prob": ProbabilityLesson,
  "nn-01-neuron": NeuronLesson,
  "nn-02-activation": ActivationLesson,
  "nn-03-network": NetworkLesson,
};
type Props = { params: Promise<{ lesson: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(lessonContent).map((lesson) => ({ lesson }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lesson: slug } = await params;
  const lesson = courseLessons.find((item) => item.slug === slug && item.available);
  return { title: lesson ? `${lesson.title} | Derek's Notes` : "Lesson not found", description: lesson?.description };
}

export default async function LessonPage({ params }: Props) {
  const { lesson: slug } = await params;
  const lesson = courseLessons.find((item) => item.slug === slug && item.available);
  const Content = lessonContent[slug as keyof typeof lessonContent];
  if (!lesson || !Content) notFound();
  const chapter = courseChapters.find((item) => item.lessons.some((entry) => entry.slug === slug));
  const index = courseLessons.indexOf(lesson);
  const previousLesson = courseLessons[index - 1];
  const nextLesson = courseLessons[index + 1];

  return (
    <CourseFrame currentSlug={slug} sections={lesson.sections}>
      <header>
        <p className="accent-label text-xs font-medium uppercase tracking-widest">Lesson {lesson.number} · {chapter?.title}</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">{lesson.title}</h1>
        <p className="mt-6 border-l-2 border-neutral-300 pl-5 text-lg leading-8 text-neutral-600">{lesson.description}</p>
      </header>
      <article className="lesson-prose"><Content /></article>
      <footer className="mt-16 border-t border-neutral-200 pt-8 text-sm leading-7">
        {previousLesson?.available && <Link href={`/notes/llm/${previousLesson.slug}`} className="mb-4 block text-neutral-500">← Previous lesson: {previousLesson.title}</Link>}
        {nextLesson && (nextLesson.available ? (
          <Link href={`/notes/llm/${nextLesson.slug}`} className="font-medium">Next lesson: {nextLesson.title} →</Link>
        ) : (
          <div><p className="font-medium">Next lesson: {nextLesson.title}</p><p className="mt-2 text-neutral-500">Not available yet.</p></div>
        ))}
        <Link href="/notes/llm" className="mt-6 inline-block text-neutral-500 hover:text-neutral-900">← Course overview</Link>
      </footer>
    </CourseFrame>
  );
}
