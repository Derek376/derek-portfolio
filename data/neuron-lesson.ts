export const fruitFeatures = [
  { name: "Size", low: "Small", high: "Large" },
  { name: "Colour", low: "Less red", high: "More red" },
  { name: "Sweetness", low: "Sour", high: "Sweet" },
  { name: "Water content", low: "Dry", high: "Juicy" },
];
export const appleWeights = [0.4, 2.8, 1.6, 0.4];
export const appleBias = -2.4;
export const sigmoid = (score: number) => 1 / (1 + Math.exp(-score));
export const appleScore = (inputs: number[]) => inputs.reduce((sum, x, i) => sum + x * appleWeights[i], appleBias);

// Hand-picked prototypes reproduce the illustrative source model; these are not trained weights.
export const fruitModels = [
  { name: "Apple", prototype: [0.5, 0.9, 0.65, 0.55] },
  { name: "Banana", prototype: [0.55, 0.1, 0.8, 0.35] },
  { name: "Watermelon", prototype: [0.95, 0.2, 0.7, 0.95] },
  { name: "Lemon", prototype: [0.35, 0.15, 0.1, 0.6] },
];
export function fruitScores(inputs: number[]) {
  return fruitModels.map(({ prototype }) => 3 * (
    2 * prototype.reduce((sum, p, i) => sum + p * inputs[i], 0)
    - prototype.reduce((sum, p) => sum + p * p, 0)
  ));
}
export function softmax(scores: number[]) {
  const max = Math.max(...scores);
  const values = scores.map((score) => Math.exp(score - max));
  const total = values.reduce((sum, value) => sum + value, 0);
  return values.map((value) => value / total);
}
export const lineSamples = [
  { x: 0.12, apple: false }, { x: 0.24, apple: false },
  { x: 0.3, apple: false }, { x: 0.42, apple: false },
  { x: 0.72, apple: true }, { x: 0.8, apple: true },
  { x: 0.86, apple: true }, { x: 0.92, apple: true },
];
export const planeSamples = [
  { x: 0.78, y: 0.72, apple: true }, { x: 0.9, y: 0.86, apple: true },
  { x: 0.68, y: 0.92, apple: true }, { x: 0.85, y: 0.6, apple: true },
  { x: 0.22, y: 0.32, apple: false }, { x: 0.34, y: 0.16, apple: false },
  { x: 0.16, y: 0.44, apple: false }, { x: 0.4, y: 0.24, apple: false },
];
export const neuronQuiz = [
  {
    question: "What calculation does a basic artificial neuron perform?",
    options: ["Add all inputs directly.", "Take a weighted sum, add a bias, then apply an activation function.", "Take the largest input.", "Randomly discard half the inputs."],
    answer: 1,
    explanation: "A neuron computes $z=\\mathbf{w}\\cdot\\mathbf{x}+b$, then $y=f(z)$. Weights control the contribution of each input, bias shifts the score, and the activation determines how the score becomes an output.",
  },
  {
    question: "What does the bias do?",
    options: ["Determine each input's importance.", "Shift the activation threshold, making activation easier or harder.", "Restrict the output to between zero and one.", "Nothing; it can always be removed."],
    answer: 1,
    explanation: "Bias adds a learnable offset to the weighted sum. For a sigmoid classifier with threshold $0.5$, the boundary is $\\mathbf{w}\\cdot\\mathbf{x}+b=0$. Weights determine its orientation; bias shifts its position. The activation function controls the output range.",
  },
];
