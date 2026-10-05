export const exampleLogits = [2.1, -0.5, 1.8];
export const exampleClasses = ["Apple", "Banana", "Watermelon"];
export const softmaxQuiz = [
  {
    question: "Which two steps turn logits into a probability distribution with Softmax?",
    options: ["Take absolute values, then divide by the number of classes.", "Exponentiate each score, then divide by the sum of all exponentials.", "Sort the scores, then keep the largest.", "Subtract the mean, then round the scores."],
    answer: 1,
    explanation: "Exponentials are positive, including for negative scores. Dividing each exponential by their sum makes the probabilities add to one. Subtracting the largest score first gives an equivalent, more numerically stable calculation.",
  },
  {
    question: "What does a positive temperature T do when Softmax is applied to z/T?",
    options: ["Higher temperature makes the distribution sharper.", "Lower temperature makes unequal scores produce a sharper distribution; higher temperature makes it flatter.", "Temperature only changes calculation speed.", "Temperature must always equal one."],
    answer: 1,
    explanation: "For fixed logits, lowering a positive temperature increases the scaled gaps. Raising it reduces the gaps. The highest-scoring class stays the same; sampling from the distribution becomes less or more varied. Equal logits remain equally probable at every positive temperature.",
  },
];
