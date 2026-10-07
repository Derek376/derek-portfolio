import { softmax } from "./neuron-lesson";

// Hand-chosen projected vectors, not the output of a trained model.
export const attentionWords = [
  { word: "kitten", q: [0.3, 0.3], k: [1.2, 0], v: [1, 0] },
  { word: "tired", q: [0.2, 1.5], k: [0, 1], v: [0, 1] },
  { word: "it", q: [2, 0.2], k: [0.1, 0], v: [0.5, 0.5] },
];

export function attentionRow(queryIndex: number, scaled = true, causal = false) {
  const query = attentionWords[queryIndex].q;
  const divisor = scaled ? Math.sqrt(query.length) : 1;
  const rows = attentionWords.map((entry, index) => {
    const score = query.reduce((sum, value, coordinate) => sum + value * entry.k[coordinate], 0);
    return { word: entry.word, value: entry.v, score, scaledScore: score / divisor, masked: causal && index > queryIndex };
  });
  const weights = softmax(rows.map(row => row.masked ? -Infinity : row.scaledScore));
  const output = [0, 1].map(coordinate => rows.reduce((sum, row, index) => sum + weights[index] * row.value[coordinate], 0));
  return { rows: rows.map((row, index) => ({ ...row, weight: weights[index] })), output };
}

export type AttentionScenario = "tired" | "congested";
export function sentenceAttention(scenario: AttentionScenario, queryIndex: number) {
  const tokens = ["kitten", "didn't", "cross", "road", "because", "it", "was", "too", scenario];
  // Preset contextual scores only: this panel does not learn Q/K/V from the sentence.
  const scores: number[] = tokens.map((_, index) => index === queryIndex ? 1.5 : Math.abs(index - queryIndex) === 1 ? 0.8 : 0);
  if (queryIndex === 5) {
    scores.fill(0);
    scores[scenario === "tired" ? 0 : 3] = 3;
    scores[scenario === "tired" ? 3 : 0] = 1;
    scores[8] = 1.5;
    scores[5] = 0.25;
  }
  return { tokens, scores, weights: softmax(scores) };
}

export const attentionQuiz = [
  {
    question: "What does attention do with the available context?",
    options: ["Always take the same fixed number of nearest words.", "Compute query-dependent weights over allowed positions and combine their value vectors.", "Add every input vector with identical weight.", "Read only the first word."],
    answer: 1,
    explanation: "Scores between queries and keys become row-wise weights. The output is the weighted sum of values. Which positions are allowed depends on masking and the attention configuration; causal attention cannot use future tokens.",
  },
  {
    question: "What are the roles of Query, Key and Value?",
    options: ["A query is matched against keys; the resulting weights determine how values are combined.", "They are always identical vectors with different names.", "Query sets the layer count, Key sets the learning rate, and Value sets the loss.", "They are fixed constants in every real model."],
    answer: 0,
    explanation: "Learned projections create Q, K and V. Queries and keys control matching scores; values supply the content used in the output. The library analogy is useful, but individual coordinates need not have human-readable labels.",
  },
];
