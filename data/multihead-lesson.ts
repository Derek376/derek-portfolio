import { softmax } from "./neuron-lesson";

// Three four-dimensional inputs and two hand-picked projection sets.
export const multiheadTokens = ["he", "likes", "painting"];
export const multiheadInputs = [
  [1, 0, 1, 0],
  [0, 1, 1, 1],
  [0, 0, 0, 1],
];
export const teachingHeads = [
  {
    name: "Head A",
    q: [
      [0.2, 0],
      [2, 0],
      [0, 0.1],
      [0, 0],
    ],
    k: [
      [1, 0],
      [0, 0.2],
      [0, 0],
      [0, 0.1],
    ],
    v: [
      [1, 0],
      [0, 1],
      [0.5, 0.5],
      [0, 0.5],
    ],
  },
  {
    name: "Head B",
    q: [
      [0.2, 0],
      [2, 0],
      [0, 0.1],
      [0, 0],
    ],
    k: [
      [0, 0],
      [-1, 0.2],
      [0, 0],
      [1, 0],
    ],
    v: [
      [0.5, 0],
      [0, 0.5],
      [0, 0.5],
      [1, 0],
    ],
  },
];
export const teachingOutputProjection = [
  [1, 0, 0, 0],
  [0, 1, 0, 0],
  [0.5, 0, 1, 0],
  [0, 0.5, 0, 1],
];

export function projectRow(row: number[], matrix: number[][]) {
  return matrix[0].map((_, column) =>
    row.reduce((sum, value, index) => sum + value * matrix[index][column], 0),
  );
}

export function multiheadCalculation(queryIndex: number, causal = false) {
  const heads = teachingHeads.map((head) => {
    const queries = multiheadInputs.map((row) => projectRow(row, head.q));
    const keys = multiheadInputs.map((row) => projectRow(row, head.k));
    const values = multiheadInputs.map((row) => projectRow(row, head.v));
    const query = queries[queryIndex];
    const scores = keys.map(
      (key) =>
        query.reduce((sum, value, index) => sum + value * key[index], 0) /
        Math.sqrt(query.length),
    );
    const weights = softmax(
      scores.map((score, index) =>
        causal && index > queryIndex ? -Infinity : score,
      ),
    );
    const output = values[0].map((_, column) =>
      values.reduce(
        (sum, value, index) => sum + weights[index] * value[column],
        0,
      ),
    );
    return { name: head.name, query, keys, values, scores, weights, output };
  });
  const concatenated = heads.flatMap((head) => head.output);
  return {
    heads,
    concatenated,
    output: projectRow(concatenated, teachingOutputProjection),
  };
}

export function headDimensions(modelWidth: number, heads: number) {
  return {
    headWidth: modelWidth / heads,
    concatenatedWidth: modelWidth,
    projectionParameters: 4 * modelWidth * modelWidth,
    scoreEntries: heads * 16 * 16,
  };
}

export const multiheadQuiz = [
  {
    question: "What does multi-head attention add to one attention head?",
    options: [
      "A guarantee that each head learns exactly one named grammatical relation.",
      "Several learned projection sets and value mixtures that can represent different patterns before being combined.",
      "A requirement to split the sentence into unrelated pieces.",
      "A larger learning rate.",
    ],
    answer: 1,
    explanation:
      "Each head computes its own queries, keys, weights and values. Multiple mixtures offer different representation subspaces, but heads can be redundant or support several relationships rather than neatly named specialisms.",
  },
  {
    question: "How are standard multi-head outputs combined?",
    options: [
      "Run each head only after the previous head has completed.",
      "Compute the heads in parallel, concatenate their outputs, then apply an output projection.",
      "Discard all outputs except the last head.",
      "Average the raw scores and skip value mixing.",
    ],
    answer: 1,
    explanation:
      "Concatenation preserves separate coordinate blocks before the learned output matrix combines them. Standard heads do not exchange their intermediate attention results within that operation, while training and later layers couple their effects.",
  },
];
