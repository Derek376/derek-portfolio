// A scalar teaching recurrence; these inputs and weights were chosen by hand.
export const rnnTokens = ["kitten", "avoided", "traffic", "today", "because"];
export const recurrentWeight = 0.6;
export const kittenSignal = 1.5;

export function rnnStep(previous: number, input: number) {
  return Math.tanh(recurrentWeight * previous + input);
}

export const rnnSteps = rnnTokens.map((token, index) => ({ token, input: index === 0 ? kittenSignal : 0 }));
export const rnnStates = [0];
for (const step of rnnSteps) {
  rnnStates.push(rnnStep(rnnStates[rnnStates.length - 1], step.input));
}

// Follow the state and its sensitivity to the state immediately after "kitten".
export function memoryAfterGap(gap: number) {
  const initial = rnnStates[1];
  let hidden = initial;
  let sensitivity = 1;
  for (let i = 0; i < gap; i++) {
    hidden = rnnStep(hidden, 0);
    sensitivity *= recurrentWeight * (1 - hidden * hidden);
  }
  return { hidden, retained: hidden / initial, sensitivity, upperBound: recurrentWeight ** gap };
}

export const rnnQuiz = [
  {
    question: "What changes when a recurrent model replaces a fixed-window feedforward model?",
    options: ["Every token needs its own unrelated set of weights.", "A hidden state is passed forward and updated, allowing earlier inputs to influence later predictions.", "Training is no longer necessary.", "The network must store the full sentence unchanged."],
    answer: 1,
    explanation: "The same recurrent operation updates the hidden state at each step. It can carry information from beyond a fixed recent window, but it is a finite representation and does not guarantee perfect memory.",
  },
  {
    question: "What often makes long-range dependencies difficult to learn in a vanilla RNN?",
    options: ["The network cannot process words.", "Gradients propagated through many time steps can vanish or explode.", "The model has no trainable parameters.", "Backpropagation is impossible for recurrent models."],
    answer: 1,
    explanation: "Backpropagation through time multiplies successive recurrent Jacobians. Their product can shrink or grow, making credit assignment across many steps difficult. There is no universal maximum of five or ten tokens.",
  },
];
