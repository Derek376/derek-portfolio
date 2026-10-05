export const lossQuiz = [
  {
    question: "What does a loss function do during training?",
    options: ["Choose the number of layers.", "Turn prediction errors into a numerical objective that can be compared and optimised.", "Load the dataset into memory.", "Choose the activation function."],
    answer: 1,
    explanation: "A loss measures how predictions compare with targets. Gradients of that objective then guide parameter updates; the loss does not choose the architecture.",
  },
  {
    question: "What should mainly guide the choice of loss function?",
    options: ["The shortest name.", "The task, target representation and model output: MSE is a common regression loss, and cross-entropy is common for class probabilities.", "All losses behave identically.", "The number of model parameters."],
    answer: 1,
    explanation: "The objective should fit what the model predicts and what errors matter. MSE and cross-entropy are common choices, not universal rules for every task.",
  },
];

export function correctClassLoss(probability: number) {
  return -Math.log(probability);
}
