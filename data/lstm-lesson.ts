// Fixed scalar teaching gates, not outputs from a trained LSTM.
export const lstmEvents = ["fear of darkness", "the character", "ate", "breakfast", "left", "the room", "went downstairs", "entered", "the basement"];
export type LstmState = { cell: number; hidden: number; originalContribution: number; rnn: number; forget: number; input: number; candidate: number; output: number };

export function lstmTrace(disableLaterWrites = false): LstmState[] {
  const states: LstmState[] = [{ cell: 0, hidden: 0, originalContribution: 0, rnn: 0, forget: 0, input: 0, candidate: 0, output: 0 }];
  lstmEvents.forEach((_, index) => {
    const previous = states[states.length - 1];
    const forget = index === 0 ? 0.9 : 0.99;
    const input = index === 0 ? 0.9 : disableLaterWrites ? 0 : 0.04;
    const candidate = index === 0 ? 0.95 : 0.2;
    const output = 0.8;
    const cell = forget * previous.cell + input * candidate;
    states.push({
      cell, hidden: output * Math.tanh(cell),
      originalContribution: index === 0 ? cell : forget * previous.originalContribution,
      rnn: Math.tanh(0.6 * previous.rnn + (index === 0 ? 1.5 : 0)),
      forget, input, candidate, output,
    });
  });
  return states;
}

export const lstmQuiz = [
  {
    question: "What mechanism lets an LSTM regulate information flow?",
    options: ["Always use a larger learning rate.", "Learned forget, input and output gates control retention, writing and exposure of the cell state.", "Give every word a manually labelled meaning.", "Remove the hidden state entirely."],
    answer: 1,
    explanation: "The gates are vectors computed from the current input and previous hidden state. Sigmoid values scale information element by element. Our fixed scalar values illustrate the equations rather than demonstrate learned gate behaviour.",
  },
  {
    question: "Why can the cell-state path help with vanishing gradients?",
    options: ["The cell state must be completely replaced at every step.", "Its additive update provides a direct carry path whose multiplier can stay near one.", "It guarantees perfect memory for an unlimited number of tokens.", "All LSTM derivatives are always exactly one."],
    answer: 1,
    explanation: "Along the direct cell carry path, holding gate values fixed, the multiplier is the forget gate. Products of values near one can preserve more gradient than strongly contracting recurrent updates. The full gradient also includes other paths through the gates and hidden state.",
  },
];
