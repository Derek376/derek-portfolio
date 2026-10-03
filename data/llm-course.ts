export type LessonSection = { id: string; title: string };
export type CourseLesson = {
  number: string;
  slug: string;
  title: string;
  available: boolean;
  sections: LessonSection[];
};

export const vectorSections: LessonSection[] = [
  { id: "the-problem", title: "An awkward question" },
  { id: "one-number", title: "The simplest solution: one number" },
  { id: "the-limit", title: "When a dog resembles a crocodile" },
  { id: "two-dimensions", title: "From a number line to a plane" },
  { id: "more-dimensions", title: "Keep adding dimensions" },
  { id: "quiz", title: "Check your understanding" },
];

function lesson(number: string, slug: string, title: string): CourseLesson {
  return {
    number, slug, title,
    available: slug === "math-01-vector",
    sections: slug === "math-01-vector" ? vectorSections : [],
  };
}

export const courseChapters = [
  {
    id: "foundational-mathematics", number: "I", title: "Foundational mathematics",
    lessons: [
      lesson("01", "math-01-vector", "What is a vector?"),
      lesson("02", "math-02-ops", "Common vector operations"),
      lesson("03", "math-03-matrix", "What is a matrix?"),
      lesson("04", "math-03-transform", "What is a linear transformation?"),
      lesson("05", "math-04-gradient", "What is a gradient?"),
      lesson("06", "math-05-prob", "Probability and information"),
    ],
  },
  {
    id: "neural-networks", number: "II", title: "Neural networks",
    lessons: [
      lesson("07", "nn-01-neuron", "The structure of a neuron"),
      lesson("08", "nn-02-activation", "Activation functions"),
      lesson("09", "nn-03-network", "Neural networks and training"),
      lesson("10", "nn-03-loss", "Loss functions"),
      lesson("11", "nn-04-softmax", "Softmax"),
      lesson("12", "nn-05-sgd", "Gradient descent and optimisers"),
      lesson("13", "nn-06-backprop", "Backpropagation"),
    ],
  },
  {
    id: "natural-language-processing", number: "III", title: "Natural language processing",
    lessons: [
      lesson("14", "nlp-01-ngram", "The probability game of language: N-grams"),
      lesson("15", "nlp-02-word2vec", "Word vectors"),
      lesson("16", "nlp-03-ffnn-lm", "Feedforward neural language models"),
      lesson("17", "nlp-04-rnn", "Recurrent neural networks"),
      lesson("18", "nlp-05-lstm", "Long short-term memory"),
    ],
  },
  {
    id: "large-language-models", number: "IV", title: "Large language models",
    lessons: [
      lesson("19", "tf-01-attention", "Attention"),
      lesson("20", "tf-02-multihead", "Multi-head attention"),
      lesson("21", "tf-transformer", "The Transformer architecture"),
      lesson("22", "tf-03-tokenizer", "Tokenizers"),
      lesson("23", "tf-04-arch", "Encoders, decoders and large language models"),
      lesson("24", "tf-05-residual", "Residual connections and layer normalisation"),
      lesson("25", "tf-06-training", "Pretraining, supervised fine-tuning and reinforcement learning"),
      lesson("26", "tf-07-sparse", "KV caching, sparse attention and FlashAttention"),
      lesson("27", "tf-08-moe", "Mixture of experts"),
      lesson("28", "tf-09-distill", "Model distillation"),
      lesson("29", "tf-10-recap", "From N-grams to Transformers: a recap"),
      lesson("30", "tf-11-frontier", "Frontiers and the road ahead"),
    ],
  },
  {
    id: "appendices", number: "V", title: "Appendices",
    lessons: [
      lesson("A1", "appendix-transformer-3d", "A panoramic view of the Transformer"),
      lesson("A2", "appendix-attention-paper", "Attention Is All You Need: the original paper"),
    ],
  },
];

export const courseLessons = courseChapters.flatMap((chapter) => chapter.lessons);
