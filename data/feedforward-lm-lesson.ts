// Fixed teaching parameters, not embeddings or weights learned from a corpus.
export const aroundVector = [0.10, 0.20] as const;
export const astronomyWords = [
  { word: "star", vector: [0.90, 0.15] as const },
  { word: "black hole", vector: [0.85, 0.20] as const },
  { word: "rocket", vector: [0.75, 0.25] as const },
  { word: "banana", vector: [0.10, 0.80] as const },
];

export function feedforwardPrediction(vector: readonly [number, number]) {
  const input = [...aroundVector, ...vector];
  // W = [0, 0, 1.5, 0]: this toy neuron uses only the third input.
  const preactivation = 1.5 * input[2] - 0.8;
  const hidden = Math.tanh(preactivation);
  const planetScore = 2.5 * hidden;
  // Two-class Softmax with the umbrella score fixed at zero.
  const planetProbability = 1 / (1 + Math.exp(-planetScore));
  return { input, preactivation, hidden, planetScore, planetProbability, umbrellaProbability: 1 - planetProbability };
}

export const feedforwardLmQuiz = [
  {
    question: "How can a feedforward neural language model share evidence across related contexts?",
    options: ["Store a separate larger count table for every phrase.", "Use dense embeddings and shared network parameters to produce predictions for new combinations.", "Ignore all context words.", "Give every candidate equal probability."],
    answer: 1,
    explanation: "Related vectors can yield related inputs to the same learned function. This provides a mechanism for generalisation beyond exact count matches, but useful predictions still depend on the data, representation and training.",
  },
  {
    question: "What limits the context available to the fixed-window feedforward model in this lesson?",
    options: ["Only the most recent K tokens are supplied; earlier history is outside its input.", "It cannot be trained with gradients.", "It cannot use word embeddings.", "It can only perform translation."],
    answer: 0,
    explanation: "Concatenating K embeddings fixes the input size to Kd. Two histories with the same final K tokens give the same prediction in this model. Recurrent models introduce a state updated as the sequence is read, though that state does not preserve every detail perfectly.",
  },
];
