import { lineSamples, sigmoid } from "./neuron-lesson";

export const trainingSamples = lineSamples.map(sample => ({ x: sample.x, y: sample.apple ? 1 : 0 }));
export const maxTrainingSteps = 100;
export type TrainingRecord = { step: number; w: number; b: number; loss: number };

export function trainingLoss(w: number, b: number) {
  return trainingSamples.reduce((sum, { x, y }) => {
    const z = w * x + b;
    // Stable binary cross-entropy from logits: softplus(z) - y*z.
    return sum + Math.max(z, 0) - y * z + Math.log1p(Math.exp(-Math.abs(z)));
  }, 0) / trainingSamples.length;
}

export function trainingGradients(w: number, b: number) {
  let dw = 0, db = 0;
  for (const { x, y } of trainingSamples) {
    const error = sigmoid(w * x + b) - y;
    dw += error * x;
    db += error;
  }
  return { dw: dw / trainingSamples.length, db: db / trainingSamples.length };
}

export function initialTraining(): TrainingRecord[] {
  return [{ step: 0, w: 0, b: 0, loss: trainingLoss(0, 0) }];
}

export function advanceTraining(history: TrainingRecord[], rate: number): TrainingRecord[] {
  const current = history[history.length - 1];
  if (current.step >= maxTrainingSteps) return history;
  const { dw, db } = trainingGradients(current.w, current.b);
  const w = current.w - rate * dw, b = current.b - rate * db;
  return [...history, { step: current.step + 1, w, b, loss: trainingLoss(w, b) }];
}

export const optimiserQuiz = [
  {
    question: "What does the learning rate control in gradient descent?",
    options: ["The gradient's direction.", "The scale of each parameter update.", "The total number of training steps.", "The depth of the loss valley."],
    answer: 1,
    explanation: "The gradient gives local sensitivity; the learning rate scales the update in $\\theta\\leftarrow\\theta-\\alpha\\nabla L$. Too large a step can overshoot even when its initial direction is downhill.",
  },
  {
    question: "What is the main advantage of mini-batch training over a full-dataset gradient for every update?",
    options: ["Every gradient is guaranteed to be more accurate.", "Each update estimates the gradient from fewer examples, allowing more frequent updates at lower per-step cost.", "Gradients are no longer needed.", "The learning rate is no longer needed."],
    answer: 1,
    explanation: "A mini-batch trades some gradient accuracy for a smaller update cost and practical parallelism. Sampling introduces noise; it can affect optimisation and generalisation, but does not guarantee escape from local minima or a better solution.",
  },
];
