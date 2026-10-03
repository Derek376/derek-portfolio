export const articleVectors = [
  { name: "A", ai: 8, data: 6 },
  { name: "B", ai: 2, data: 1 },
  { name: "C", ai: 1, data: 7 },
];

export const operationsQuiz = [
  {
    question: "Which operation measures how closely two vectors align in direction, without being affected by their lengths?",
    options: ["Vector addition.", "Cosine similarity.", "Subtracting corresponding components.", "Finding a vector's length."],
    answer: 1,
    explanation: "Cosine similarity measures the angle between two non-zero vectors. It ranges from −1 to 1 and does not depend on their lengths. A smaller angle, with a cosine closer to 1, means their directions are more closely aligned. This makes it more reliable than the raw dot product when length is irrelevant.",
  },
  {
    question: "What does the dot product of two vectors produce, and what does its value describe?",
    options: ["A new vector pointing in the direction of their sum.", "A number (a scalar) reflecting their directional alignment multiplied by their lengths.", "A matrix representing a rotation.", "A probability that is always positive."],
    answer: 1,
    explanation: "The dot product multiplies corresponding components and adds them, producing a scalar. It depends on both angle and length: greater alignment and greater lengths give a larger positive dot product, while opposing directions give a negative one. Dividing by both lengths removes their influence and gives cosine similarity.",
  },
];
