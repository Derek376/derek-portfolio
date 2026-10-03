export const ingredients = ["Tea", "Milk", "Sugar", "Pearls"];
export const recipes = [
  { name: "Pearl milk tea", amounts: [2, 1, 0, 3] },
  { name: "Milk pudding", amounts: [0, 4, 1, 2] },
  { name: "Traditional sweet tea", amounts: [1, 0, 3, 1] },
];
export const ingredientPrices = [1, 2, 1, 0];

export const matrixQuiz = [
  {
    question: "A neural network layer turns one collection of numbers into another. Which mathematical object naturally represents this linear transformation?",
    options: ["A single number.", "A vector.", "A matrix.", "A written rule."],
    answer: 2,
    explanation: "A matrix represents a transformation from one vector to another. Each row determines one output component by combining the input components with weights. This is the matrix–vector operation Wx used within a neural network layer.",
  },
  {
    question: "When a 3 × 4 matrix multiplies a vector, how many components must the input have, and how many does the output have?",
    options: ["The input must have 4 components; the output has 3.", "The input must have 3 components; the output has 4.", "Both input and output must have 3 components.", "Any input dimension works; the result is unchanged."],
    answer: 0,
    explanation: "For a matrix–vector product, the number of columns must match the input dimension. The number of rows determines the output dimension. A 3 × 4 matrix therefore takes a four-dimensional input and produces a three-dimensional output. This is how matrices can increase or reduce the dimensionality of data.",
  },
];
