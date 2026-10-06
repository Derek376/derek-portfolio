// Hand-chosen coordinates for teaching, not trained Word2Vec embeddings.
export const teachingWords = [
  { word: "cat", vector: [0.86, 0.27] as const },
  { word: "kitten", vector: [0.90, 0.13] as const },
  { word: "dog", vector: [0.80, 0.32] as const },
  { word: "tiger", vector: [0.95, 0.80] as const },
  { word: "apple", vector: [0.05, 0.12] as const },
  { word: "airplane", vector: [0.03, 0.95] as const },
];

export function compareWordVectors(a: readonly [number, number], b: readonly [number, number]) {
  const dot = a[0] * b[0] + a[1] * b[1];
  const lengths = Math.hypot(...a) * Math.hypot(...b);
  return {
    distance: Math.hypot(a[0] - b[0], a[1] - b[1]),
    cosine: lengths === 0 ? null : Math.max(-1, Math.min(1, dot / lengths)),
  };
}

export const wordVectorQuiz = [
  {
    question: "Why can a trained embedding sometimes support an analogy such as king − man + woman ≈ queen?",
    options: ["Every coordinate is manually labelled by a human.", "Some relationships can be represented by similar vector displacements learned from text.", "Vector addition always produces an exact dictionary definition.", "Word2Vec stores a separate hard-coded rule for every analogy."],
    answer: 1,
    explanation: "Training can produce approximately aligned relational directions. This is an empirical pattern, not an exact law: the result depends on the data, objective and similarity measure, and many analogies fail.",
  },
  {
    question: "What idea motivates learning word vectors from surrounding text?",
    options: ["Words with the same spelling always have the same meaning in every context.", "Words occurring in similar contexts tend to have related meanings or uses.", "Every embedding dimension must name a visible physical property.", "Words occurring far apart must have opposite meanings."],
    answer: 1,
    explanation: "The distributional hypothesis connects usage patterns with meaning. Predicting nearby words provides a training signal for embeddings. Related contexts can also bring antonyms together, so proximity is not the same as synonymy.",
  },
];
