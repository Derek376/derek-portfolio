// The original sinusoidal scheme, with coordinates arranged in sin/cos pairs.
export function positionEncoding(position: number, width: number) {
  return Array.from({ length: width }, (_, coordinate) => {
    const pair = Math.floor(coordinate / 2);
    const angle = position / Math.pow(10000, (2 * pair) / width);
    return coordinate % 2 === 0 ? Math.sin(angle) : Math.cos(angle);
  });
}

export const transformerQuiz = [
  {
    question: "Which components make up a standard Transformer block?",
    options: [
      "Convolution and pooling only.",
      "Multi-head attention and a position-wise feed-forward network, with residual connections and layer normalisation.",
      "One large linear layer without any other operations.",
      "A recurrent cell and memory gates.",
    ],
    answer: 1,
    explanation:
      "Attention exchanges information between positions; the FFN transforms each position using shared parameters. Residual connections and normalisation complete the standard block. The original decoder also has encoder-decoder cross-attention.",
  },
  {
    question: "What does removing recurrent state updates make possible?",
    options: [
      "Training without parameters.",
      "Computing the known sequence positions in parallel within a layer during training.",
      "Learning without data.",
      "Generating every future token independently in one step.",
    ],
    answer: 1,
    explanation:
      "A layer does not need to wait for a recurrent hidden state to advance through the sequence. Causal masking still prevents access to future tokens, layers remain sequential, and ordinary autoregressive generation still produces new tokens step by step.",
  },
];
