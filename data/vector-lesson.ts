// Values and quiz answers translated from the authorised source lesson.
export const animals = [
  { name: "Goldfish", size: 0.02, ferocity: 0.02 },
  { name: "Cat", size: 0.25, ferocity: 0.30 },
  { name: "Dog", size: 0.45, ferocity: 0.20 },
  { name: "Crocodile", size: 0.50, ferocity: 0.90 },
  { name: "Wolf", size: 0.55, ferocity: 0.75 },
  { name: "Tiger", size: 0.90, ferocity: 0.85 },
];

export const vectorQuiz = [
  {
    question: "Computers work with numbers. What is the fundamental purpose of using vectors to represent things such as cats and tigers?",
    options: [
      "Represent things as numbers so that mathematics can measure how similar they are.",
      "Make things take up less storage space.",
      "Translate Chinese into English.",
      "Sort things by their Chinese pronunciation.",
    ],
    answer: 0,
    explanation: "The central value of vectors is computable meaning. Once cats, tigers and goldfish are mapped to coordinates, similar things can be placed near each other. A computer can then use distance or angle to compare them, instead of relying on hand-written rules.",
  },
  {
    question: "Which statement about a vector as a point in space, or an arrow, is correct?",
    options: [
      "Vectors can only have two or three dimensions; more dimensions have no meaning.",
      "Each component records a value for one dimension or feature.",
      "Two vectors with the same length must represent the same thing.",
      "Every number in a vector must be an integer.",
    ],
    answer: 1,
    explanation: "Each component corresponds to a feature dimension, such as size or whether an animal is domesticated. Its value describes the thing along that dimension. Vectors can have hundreds or thousands of dimensions. Equal lengths can still have very different directions and represent different things.",
  },
];
