import type { ReactNode } from "react";
import { MathText } from "./Math";

export default function ThoughtExercise({ question, children }: {
  question: string;
  children: ReactNode;
}) {
  return (
    <fieldset className="thought-exercise">
      <legend>Pause and think</legend>
      <p className="thought-question"><MathText>{question}</MathText></p>
      <details>
        <summary>
          <span className="show-answer">I&apos;ve thought about it — show the answer</span>
          <span className="hide-answer">Hide answer</span>
        </summary>
        <div className="thought-answer">{children}</div>
      </details>
    </fieldset>
  );
}
