export const nextWordProbabilities = [
  { label: "nice", probability: 0.34 },
  { label: "cold", probability: 0.21 },
  { label: "hot", probability: 0.18 },
  { label: "pleasant", probability: 0.12 },
  { label: "awful", probability: 0.08 },
  { label: "other", probability: 0.07 },
];

export const probabilityQuiz = [
  {
    question: "A classifier outputs non-negative numbers that sum to one. Why can we interpret them as probabilities?",
    options: [
      "Because the numbers are small.",
      "Because they satisfy the requirements for a discrete probability distribution.",
      "Because they are integers.",
      "Because every number is greater than 0.5.",
    ],
    answer: 1,
    explanation: "Each number represents an outcome's estimated probability, and the total covers all possible outcomes. These conditions define a probability distribution, although they do not guarantee that the model's estimates are accurate or well calibrated.",
  },
  {
    question: "What does cross-entropy measure, and when is it smallest?",
    options: [
      "The average surprise under the model's predictions; it is smallest when the predictions match the true distribution.",
      "The number of parameters; fewer parameters make it smaller.",
      "The amount of training data; more data makes it smaller.",
      "The length of the output vector; shorter vectors make it smaller.",
    ],
    answer: 0,
    explanation: "Cross-entropy averages $-\\log q(x)$ using the true probabilities $p(x)$. Its minimum is $H(p)$ when $q=p$. For a one-hot target, it reduces to $-\\log q(y)$, approaching zero as the predicted probability of the correct answer approaches one.",
  },
];
