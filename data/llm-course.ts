export type LessonSection = { id: string; title: string };
export type CourseLesson = {
  number: string;
  slug: string;
  title: string;
  description: string;
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

const operationsSections: LessonSection[] = [
  { id: "distance-problem", title: "When distance gets it wrong" },
  { id: "length-and-direction", title: "Why length interferes" },
  { id: "dot-product", title: "The geometry behind the dot product" },
  { id: "cosine-similarity", title: "Cosine similarity" },
  { id: "vector-addition", title: "Arithmetic with meaning" },
  { id: "summary", title: "What you have discovered" },
  { id: "quiz", title: "Check your understanding" },
];

const publishedLessons: Record<string, { description: string; sections: LessonSection[] }> = {
  "tf-03-transformer": {
    description: "Assemble attention, feed-forward networks and positional information into a Transformer. Follow a token through stacked blocks and distinguish parallel training from step-by-step generation.",
    sections: [
      { id: "beyond-attention", title: "What is still missing?" },
      { id: "attention-only", title: "Start with attention alone" },
      { id: "feedforward", title: "Add a feed-forward network" },
      { id: "stacking", title: "Stack blocks and predict" },
      { id: "positions", title: "Put order back into the input" },
      { id: "complete-backbone", title: "Assemble the complete backbone" },
      { id: "summary", title: "What you have discovered" },
      { id: "quiz", title: "Check your understanding" },
    ],
  },
  "tf-02-multihead": {
    description: "Why use several attention heads? Compute separate learned projections, combine their outputs, and explore the trade-off between head count, width and cost.",
    sections: [
      { id: "multiple-relations", title: "One token, several relationships" },
      { id: "parallel-heads", title: "Several heads in parallel" },
      { id: "projection-budget", title: "Full inputs, smaller working spaces" },
      { id: "head-patterns", title: "What do heads attend to?" },
      { id: "summary", title: "What you have discovered" },
      { id: "quiz", title: "Check your understanding" },
    ],
  },
  "tf-01-attention": {
    description: "How can a token select relevant context? Build scaled dot-product attention from queries, keys and values, then calculate a complete two-dimensional example.",
    sections: [
      { id: "pronoun-context", title: "Who does it refer to?" },
      { id: "recurrent-bottleneck", title: "Beyond a single recurrent state" },
      { id: "score-weight-mix", title: "Score, normalise, mix" },
      { id: "query-key-value", title: "Query, Key and Value" },
      { id: "matrix-attention", title: "Compute all queries together" },
      { id: "worked-attention", title: "A two-dimensional calculation" },
      { id: "context-experiment", title: "Inspect contextual weight rows" },
      { id: "summary", title: "What you have discovered" },
      { id: "quiz", title: "Check your understanding" },
    ],
  },
  "nlp-05-lstm": {
    description: "Give recurrent memory learned gates. Follow cell and hidden states, separate retention from new writes, and understand the remaining limits of sequential computation.",
    sections: [
      { id: "selective-memory", title: "Memory needs selective updates" },
      { id: "two-state-paths", title: "Cell state and hidden state" },
      { id: "gate-equations", title: "How the gates work" },
      { id: "worked-memory", title: "Follow a gated memory" },
      { id: "retention-limits", title: "Long-range retention and limits" },
      { id: "summary", title: "Chapter III is complete" },
      { id: "quiz", title: "Check your understanding" },
    ],
  },
  "nlp-04-rnn": {
    description: "Can a network carry history beyond a fixed window? Follow a recurrent hidden state token by token, then explore fading signals and gradients through time.",
    sections: [
      { id: "beyond-fixed-window", title: "Beyond a fixed context window" },
      { id: "recurrent-state", title: "Give the network a hidden state" },
      { id: "step-by-step", title: "Update the memory step by step" },
      { id: "long-range-limits", title: "Long gaps and gradient flow" },
      { id: "summary", title: "What you have discovered" },
      { id: "quiz", title: "Check your understanding" },
    ],
  },
  "nlp-03-ffnn-lm": {
    description: "Look up word vectors, concatenate them, and predict the next word. Follow a tiny network numerically and see how it shares evidence across related contexts.",
    sections: [
      { id: "unseen-contexts", title: "When a count table has no match" },
      { id: "lookup-concatenate-predict", title: "Look up, concatenate, predict" },
      { id: "worked-forward-pass", title: "Follow the numbers" },
      { id: "generalisation", title: "Replace star with black hole" },
      { id: "fixed-window", title: "Compare the models and their limits" },
      { id: "summary", title: "What you have discovered" },
      { id: "quiz", title: "Check your understanding" },
    ],
  },
  "nlp-02-word2vec": {
    description: "How can words become coordinates? Learn from surrounding text, compare word vectors, and explore what vector analogies can and cannot tell us.",
    sections: [
      { id: "separate-symbols", title: "Why symbols do not share meaning" },
      { id: "semantic-coordinates", title: "Turn words into coordinates" },
      { id: "learning-from-context", title: "Learn the numbers from context" },
      { id: "vector-analogies", title: "Arithmetic with word vectors" },
      { id: "summary", title: "What you have discovered" },
      { id: "quiz", title: "Check your understanding" },
    ],
  },
  "nlp-01-ngram": {
    description: "Can counting predict the next word? Build a conditional frequency table, explore context windows and see why unseen combinations cause trouble.",
    sections: [
      { id: "predicting-next-word", title: "Guessing the next word" },
      { id: "ngram-definition", title: "N-grams and conditional counts" },
      { id: "sparsity-context", title: "Short memory and sparse data" },
      { id: "uses-limits", title: "Uses and limitations" },
      { id: "summary", title: "What you have discovered" },
      { id: "quiz", title: "Check your understanding" },
    ],
  },
  "nn-07-backprop": {
    description: "How does an early weight affect the final loss? Follow the chain rule backwards, inspect every gradient, and update a tiny network.",
    sections: [
      { id: "gradient-cost", title: "The cost of calculating gradients" },
      { id: "chain-rule", title: "The chain rule and computation graphs" },
      { id: "worked-example", title: "Follow the numbers" },
      { id: "complete-network", title: "A complete hidden-layer case" },
      { id: "gradient-stability", title: "Vanishing and exploding gradients" },
      { id: "summary", title: "Chapter II is complete" },
      { id: "quiz", title: "Check your understanding" },
    ],
  },
  "nn-06-sgd": {
    description: "A downhill direction is not enough. Explore learning rates, train a tiny classifier, and understand mini-batch gradients, momentum and Adam.",
    sections: [
      { id: "overshooting", title: "A step that raises the loss" },
      { id: "learning-rate", title: "Learning rate and live training" },
      { id: "gradient-data", title: "Which data determines the gradient?" },
      { id: "mini-batch", title: "Mini-batch SGD" },
      { id: "momentum-adam", title: "Momentum and Adam" },
      { id: "summary", title: "What you have discovered" },
      { id: "quiz", title: "Check your understanding" },
    ],
  },
  "nn-05-softmax": {
    description: "How do arbitrary class scores become probabilities? Derive Softmax, explore temperature and keep the calculation numerically stable.",
    sections: [
      { id: "raw-scores", title: "Raw scores are not probabilities" },
      { id: "shifting-scores", title: "Why shifting is not enough" },
      { id: "exponentiate-normalise", title: "Exponentiate, then normalise" },
      { id: "temperature", title: "Temperature and stability" },
      { id: "summary", title: "What you have discovered" },
      { id: "quiz", title: "Check your understanding" },
    ],
  },
  "nn-04-loss": {
    description: "How can prediction errors become one number? Explore squared error, cross-entropy and the gradients that guide learning.",
    sections: [
      { id: "measuring-errors", title: "How wrong is a prediction?" },
      { id: "mean-squared-error", title: "Mean squared error" },
      { id: "classification-gradients", title: "A weak classification signal" },
      { id: "cross-entropy", title: "Cross-entropy" },
      { id: "summary", title: "What you have discovered" },
      { id: "quiz", title: "Check your understanding" },
    ],
  },
  "math-01-vector": {
    description: "Computers only understand numbers. How can they tell that a cat and a tiger are more alike than a cat and a goldfish?",
    sections: vectorSections,
  },
  "math-02-ops": {
    description: "Can similarity be calculated? An introduction to vector addition, the dot product and cosine similarity.",
    sections: operationsSections,
  },
  "math-03-matrix": {
    description: "Each layer of a neural network turns one collection of numbers into another. How can we represent that transformation?",
    sections: [
      { id: "recipe-table", title: "Many rules, one table" },
      { id: "matrix-vector-product", title: "One dot product per row" },
      { id: "dimensions", title: "From n dimensions to m dimensions" },
      { id: "summary", title: "What you have discovered" },
      { id: "quiz", title: "Check your understanding" },
    ],
  },
  "math-04-transform": {
    description: "What does matrix multiplication do geometrically? Transform the whole space through rotation, scaling, shear and reflection.",
    sections: [
      { id: "geometric-view", title: "The same Wx, a different view" },
      { id: "basis-vectors", title: "Watch the basis vectors" },
      { id: "transformation-types", title: "Rotation, scaling, shear and reflection" },
      { id: "bias-translation", title: "To translate the space, add b" },
      { id: "stacking-layers", title: "Many layers can still be one" },
      { id: "quiz", title: "Check your understanding" },
    ],
  },
  "math-05-gradient": {
    description: "How can you walk downhill blindfolded? From local slopes and derivatives to the gradient that guides neural network training.",
    sections: [
      { id: "blindfolded-descent", title: "Walking downhill blindfolded" },
      { id: "derivative", title: "The derivative: slope at one point" },
      { id: "partial-derivatives", title: "Partial derivatives: two dimensions" },
      { id: "directional-derivative", title: "Slope in any direction" },
      { id: "gradient", title: "The gradient: steepest ascent" },
      { id: "neural-network-training", title: "From hillsides to neural networks" },
      { id: "quiz", title: "Check your understanding" },
    ],
  },
  "math-06-prob": {
    description: "Why do classifiers output probabilities? From long-run frequency and surprising events to entropy and cross-entropy loss.",
    sections: [
      { id: "probability-distributions", title: "What does a 70% chance of rain mean?" },
      { id: "information", title: "Information: the value of surprise" },
      { id: "entropy", title: "Entropy: average uncertainty" },
      { id: "cross-entropy", title: "Cross-entropy: an imperfect map" },
      { id: "summary", title: "What you have discovered" },
      { id: "quiz", title: "Check your understanding" },
    ],
  },
  "nn-01-neuron": {
    description: "Build a fruit-guessing machine: from weighted clues and bias to artificial neurons, decision boundaries and multilayer networks.",
    sections: [
      { id: "guessing-fruit", title: "How do you guess a fruit?" },
      { id: "neuron-structure", title: "Draw the neuron precisely" },
      { id: "linear-boundaries", title: "The limit: flat boundaries" },
      { id: "layers-and-networks", title: "Connect neurons into a network" },
      { id: "summary", title: "What you have discovered" },
      { id: "quiz", title: "Check your understanding" },
    ],
  },
  "nn-02-activation": {
    description: "Why do a hundred affine layers still collapse into one? Explore the nonlinear bends that give neural networks more expressive power.",
    sections: [
      { id: "stacking-affine-layers", title: "Does stacking more layers help?" },
      { id: "why-nonlinearity", title: "Why the boundary stays flat" },
      { id: "step-sigmoid-tanh", title: "Step, sigmoid and tanh" },
      { id: "relu-and-variants", title: "ReLU and its alternatives" },
      { id: "building-a-middle-interval", title: "Build a middle interval" },
      { id: "summary", title: "What you have discovered" },
      { id: "quiz", title: "Check your understanding" },
    ],
  },
  "nn-03-network": {
    description: "Connect neurons into a network, count its parameters, and understand the loop that turns labelled examples into learned weights.",
    sections: [
      { id: "connecting-neurons", title: "Connect a network" },
      { id: "network-parameters", title: "One function with parameters" },
      { id: "training-loop", title: "Training: let data set the parameters" },
      { id: "summary", title: "What you have discovered" },
      { id: "quiz", title: "Check your understanding" },
    ],
  },
};

function lesson(number: string, slug: string, title: string): CourseLesson {
  return {
    number, slug, title,
    description: publishedLessons[slug]?.description ?? "",
    available: Boolean(publishedLessons[slug]),
    sections: publishedLessons[slug]?.sections ?? [],
  };
}

export const courseChapters = [
  {
    id: "foundational-mathematics", number: "I", title: "Foundational mathematics",
    lessons: [
      lesson("01", "math-01-vector", "What is a vector?"),
      lesson("02", "math-02-ops", "Common vector operations"),
      lesson("03", "math-03-matrix", "What is a matrix?"),
      lesson("04", "math-04-transform", "What is a linear transformation?"),
      lesson("05", "math-05-gradient", "What is a gradient?"),
      lesson("06", "math-06-prob", "Probability and information"),
    ],
  },
  {
    id: "neural-networks", number: "II", title: "Neural networks",
    lessons: [
      lesson("07", "nn-01-neuron", "The structure of a neuron"),
      lesson("08", "nn-02-activation", "Activation functions"),
      lesson("09", "nn-03-network", "Neural networks and training"),
      lesson("10", "nn-04-loss", "Loss functions"),
      lesson("11", "nn-05-softmax", "Softmax"),
      lesson("12", "nn-06-sgd", "Gradient descent and optimisers"),
      lesson("13", "nn-07-backprop", "Backpropagation"),
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
      lesson("21", "tf-03-transformer", "The Transformer architecture"),
      lesson("22", "tf-04-tokenizer", "Tokenizers"),
      lesson("23", "tf-05-arch", "Encoders, decoders and large language models"),
      lesson("24", "tf-06-residual", "Residual connections and layer normalisation"),
      lesson("25", "tf-07-training", "Pretraining, supervised fine-tuning and reinforcement learning"),
      lesson("26", "tf-08-sparse", "KV caching, sparse attention and FlashAttention"),
      lesson("27", "tf-09-moe", "Mixture of experts"),
      lesson("28", "tf-10-distill", "Model distillation"),
      lesson("29", "tf-11-recap", "From N-grams to Transformers: a recap"),
      lesson("30", "tf-12-frontier", "Frontiers and the road ahead"),
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

// Fail during development/build rather than publish duplicate course identifiers.
const lessonNumbers = new Set<string>();
const lessonSlugs = new Set<string>();
for (const chapter of courseChapters) {
  chapter.lessons.forEach((entry, index) => {
    if (lessonNumbers.has(entry.number) || lessonSlugs.has(entry.slug)) {
      throw new Error(`Duplicate course lesson number or slug: ${entry.number} / ${entry.slug}`);
    }
    lessonNumbers.add(entry.number);
    lessonSlugs.add(entry.slug);
    const slugPrefix = chapter.id === "neural-networks" ? "nn"
      : chapter.id === "large-language-models" ? "tf" : undefined;
    if (slugPrefix) {
      const expectedPrefix = `${slugPrefix}-${String(index + 1).padStart(2, "0")}-`;
      if (!entry.slug.startsWith(expectedPrefix)) {
        throw new Error(`${chapter.title} lesson ${entry.number} must use ${expectedPrefix}, received ${entry.slug}`);
      }
    }
  });
}

export const courseLessons = courseChapters.flatMap((chapter) => chapter.lessons);
export const availableLessonCount = courseLessons.filter((lesson) => lesson.available).length;
