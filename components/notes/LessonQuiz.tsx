import LessonQuizClient from "./LessonQuizClient";
import { MathText } from "./Math";

type QuizQuestion = {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

export default function LessonQuiz({ questions }: { questions: QuizQuestion[] }) {
  return <LessonQuizClient questions={questions.map((question) => ({
    ...question,
    question: <MathText>{question.question}</MathText>,
    options: question.options.map((option) => <MathText key={option}>{option}</MathText>),
    explanation: <MathText>{question.explanation}</MathText>,
  }))} />;
}
