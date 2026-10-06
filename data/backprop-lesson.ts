import { sigmoid, softmax } from "./neuron-lesson";

export const initialBackpropWeights = [0.5, -0.3, 0.4, -0.2];
export const backpropStepLimit = 100;
export const backpropStages = ["Network structure", "Forward pass", "Softmax and loss", "Backward pass", "Parameter update", "Training simulation"];

// One selected teaching example, with no bias terms, matching the source graph.
export function tinyNetwork(weights: number[], inputs: number[], target: number) {
  const [w1, w2, v1, v2] = weights;
  const [x1, x2] = inputs;
  const z = w1 * x1 + w2 * x2;
  const h = sigmoid(z);
  const logits = [v1 * h, v2 * h];
  const probabilities = softmax(logits);
  const max = Math.max(...logits);
  const loss = max + Math.log(logits.reduce((sum, o) => sum + Math.exp(o - max), 0)) - logits[target];
  const outputGradients = probabilities.map((p, i) => p - (i === target ? 1 : 0));
  const hiddenGradient = outputGradients[0] * v1 + outputGradients[1] * v2;
  const sigmoidDerivative = h * (1 - h);
  const hiddenScoreGradient = hiddenGradient * sigmoidDerivative;
  const gradients = [hiddenScoreGradient * x1, hiddenScoreGradient * x2, outputGradients[0] * h, outputGradients[1] * h];
  return { z, h, logits, probabilities, loss, outputGradients, hiddenGradient, sigmoidDerivative, hiddenScoreGradient, gradients };
}

export type BackpropRecord = { step: number; weights: number[]; loss: number };
export function initialBackpropRun(weights: number[], inputs: number[], target: number): BackpropRecord[] {
  return [{ step: 0, weights: [...weights], loss: tinyNetwork(weights, inputs, target).loss }];
}
export function advanceBackprop(history: BackpropRecord[], inputs: number[], target: number, rate: number, count = 1): BackpropRecord[] {
  const next = [...history];
  for (let i = 0; i < count && next[next.length - 1].step < backpropStepLimit; i++) {
    const current = next[next.length - 1];
    const result = tinyNetwork(current.weights, inputs, target);
    // All gradients use the same pre-update weights.
    const weights = current.weights.map((w, j) => w - rate * result.gradients[j]);
    next.push({ step: current.step + 1, weights, loss: tinyNetwork(weights, inputs, target).loss });
  }
  return next;
}

export const backpropQuiz = [
  {
    question: "What problem does backpropagation solve?",
    options: ["Choose the network's number of layers.", "Efficiently compute the loss gradient with respect to each parameter.", "Only calculate predictions from input to output.", "Randomly initialise the weights."],
    answer: 1,
    explanation: "Backpropagation traverses the computation graph backwards, reusing saved forward values and local derivatives. An optimiser subsequently uses those gradients to update parameters; the two operations are distinct.",
  },
  {
    question: "Which mathematical rule lets gradients pass through successive operations?",
    options: ["The distributive law alone.", "The chain rule from calculus.", "Pythagoras' theorem.", "The law of large numbers."],
    answer: 1,
    explanation: "Multiply an incoming gradient by the local derivative, then continue backwards. If a value influences the loss through multiple branches, add the contributions from all those paths.",
  },
];
