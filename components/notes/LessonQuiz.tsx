"use client";

import { useId, useState } from "react";

type QuizQuestion = {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

export default function LessonQuiz({ questions }: { questions: QuizQuestion[] }) {
  const quizId = useId();
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState<Record<number, boolean>>({});

  return (
    <div className="space-y-8">
      {questions.map((question, index) => (
        <fieldset key={question.question} className="border-t border-neutral-200 pt-6">
          <legend className="pr-2 font-medium text-neutral-900">{index + 1}. {question.question}</legend>
          <div className="mt-4 space-y-3">
            {question.options.map((option, optionIndex) => (
              <label key={option} className="flex cursor-pointer items-start gap-3 text-sm leading-6">
                <input type="radio" name={`${quizId}-question-${index}`} value={optionIndex} checked={answers[index] === optionIndex} onChange={() => {
                  setAnswers({ ...answers, [index]: optionIndex });
                  setSubmitted({ ...submitted, [index]: false });
                }} className="mt-1.5 accent-neutral-900" />
                <span><span className="mr-2 font-mono text-neutral-500">{String.fromCharCode(65 + optionIndex)}</span>{option}</span>
              </label>
            ))}
          </div>
          <button type="button" disabled={answers[index] === undefined} onClick={() => setSubmitted({ ...submitted, [index]: true })} className="mt-5 border border-neutral-300 px-4 py-2 text-sm text-neutral-900 hover:border-neutral-900 disabled:cursor-not-allowed disabled:opacity-40">Submit answer</button>
          {submitted[index] && (
            <div role="status" className="mt-5 border-l-2 border-neutral-900 pl-4 text-sm leading-7">
              <p className="font-medium text-neutral-900">{answers[index] === question.answer ? "Correct." : `Not quite. The correct answer is ${String.fromCharCode(65 + question.answer)}.`}</p>
              <p className="mt-2">{question.explanation}</p>
            </div>
          )}
        </fieldset>
      ))}
    </div>
  );
}
