export const exampleCorpus = [
  "the weather is good",
  "the weather is good",
  "the weather is nice",
  "the weather is cold",
  "the weather forecast is good",
  "the cat is quiet",
  "the kitten is quiet",
  "the cat likes milk",
  "the kitten likes milk",
  "the forecast is cold",
];
export const tokenizeExample = (text: string) => text.toLowerCase().match(/[a-z]+(?:'[a-z]+)?/g) ?? [];
const sentences = exampleCorpus.map(tokenizeExample);
export const ngramVocabulary = [...new Set(sentences.flat())].sort();
export type NgramOrder = 1 | 2 | 3;

export function ngramDistribution(order: NgramOrder, text: string, smoothing: boolean) {
  const tokens = tokenizeExample(text);
  const contextSize = order - 1;
  const context = contextSize ? tokens.slice(-contextSize) : [];
  const sufficientContext = tokens.length >= contextSize;
  const counts = new Map(ngramVocabulary.map(word => [word, 0]));
  if (sufficientContext) {
    for (const sentence of sentences) {
      for (let i = contextSize; i < sentence.length; i++) {
        if (context.every((word, j) => sentence[i - contextSize + j] === word)) {
          counts.set(sentence[i], counts.get(sentence[i])! + 1);
        }
      }
    }
  }
  const total = [...counts.values()].reduce((sum, count) => sum + count, 0);
  const denominator = total + (smoothing ? ngramVocabulary.length : 0);
  const rows = ngramVocabulary.map(word => ({
    word, count: counts.get(word)!,
    probability: sufficientContext && denominator > 0 ? (counts.get(word)! + (smoothing ? 1 : 0)) / denominator : null,
  })).sort((a, b) => b.count - a.count || (a.word < b.word ? -1 : a.word > b.word ? 1 : 0));
  return { context, sufficientContext, total, denominator, rows };
}

export const weatherCounts = [
  { word: "lovely", count: 2300 }, { word: "nice", count: 2100 },
  { word: "forecast", count: 1800 }, { word: "changing", count: 1500 },
  { word: "hot", count: 1000 }, { word: "banana", count: 3 },
  { word: "Other words combined", count: 1297 },
];

export const ngramQuiz = [
  {
    question: "How does an N-gram language model estimate the next-word probability?",
    options: ["Understand the grammar and meaning of the entire sentence.", "Use counts of continuations after the preceding N−1 tokens.", "Guess a uniformly random word in every context.", "Look up dictionary definitions."],
    answer: 1,
    explanation: "An N-gram includes the predicted token. A bigram uses one preceding token and a trigram uses two. Basic maximum-likelihood estimates divide a continuation count by the total observed continuations for that context.",
  },
  {
    question: "What does data sparsity mean for an unsmoothed N-gram model?",
    options: ["The screen cannot display the whole model.", "Many plausible combinations were never observed, so their estimated probability is zero or the context has no estimate.", "The model must train a neural network first.", "The word-vector dimension is too small."],
    answer: 1,
    explanation: "Exact token combinations become rarer as the context grows. A seen context can have unseen continuations with zero probability; an entirely unseen context has no frequency estimate. Smoothing and backoff address these cases, but do not recover arbitrary long-range context.",
  },
];
