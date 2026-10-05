export const networkWidths = [4, 5, 5, 4];
export const networkParameterCounts = networkWidths.slice(1).map((outputs, i) => ({
  inputs: networkWidths[i], outputs,
  weights: networkWidths[i] * outputs,
  biases: outputs,
}));
export const networkQuiz = [
  {
    question: "What does training a neural network mean in this supervised-learning example?",
    options: ["Keep adding more layers.", "Repeatedly adjust weights and biases using prediction errors to improve the objective.", "Memorise all examples as a lookup table.", "Manually set a rule for every neuron."],
    answer: 1,
    explanation: "Training optimises the parameters using a loss computed from examples. It usually keeps the architecture fixed while changing weights and biases. Lower training loss alone does not guarantee good predictions on unseen data, so separate evaluation matters.",
  },
  {
    question: "What is the correct order of a standard gradient-based training iteration?",
    options: ["Update weights, then forward pass, then loss.", "Forward pass, calculate loss, compute gradients by backpropagation, then update parameters.", "Calculate loss, update weights, then forward pass.", "Backpropagation, then forward pass, then loss."],
    answer: 1,
    explanation: "The forward pass produces predictions; the loss measures their error; backpropagation computes derivatives of that loss with respect to the parameters; the optimiser then uses those derivatives to update the parameters. Repeat with further batches.",
  },
];
