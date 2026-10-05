import { sigmoid } from "./neuron-lesson";

export type ActivationKind = "Step" | "Sigmoid" | "tanh" | "ReLU";
export const activationKinds: ActivationKind[] = ["Step", "Sigmoid", "tanh", "ReLU"];
export const step = (z: number) => z >= 0 ? 1 : 0;
export const relu = (z: number) => Math.max(0, z);
export const leakyRelu = (z: number) => z >= 0 ? z : 0.1 * z;
// The tanh approximation is also shown explicitly in the lesson.
export const geluApprox = (z: number) => 0.5 * z * (1 + Math.tanh(Math.sqrt(2 / Math.PI) * (z + 0.044715 * z ** 3)));
export function activate(kind: ActivationKind, z: number): number {
  switch (kind) {
    case "Step": return step(z);
    case "Sigmoid": return sigmoid(z);
    case "tanh": return Math.tanh(z);
    case "ReLU": return relu(z);
  }
}
export function activationSlope(kind: ActivationKind, z: number): number | null {
  switch (kind) {
    case "Step": return z === 0 ? null : 0;
    case "Sigmoid": { const s = sigmoid(z); return s * (1 - s); }
    case "tanh": return 1 - Math.tanh(z) ** 2;
    case "ReLU": return z === 0 ? null : z > 0 ? 1 : 0;
  }
}
export const activationNotes: Record<ActivationKind, string> = {
  Step: "A hard switch. The derivative is zero away from the jump and undefined at zero, so ordinary backpropagation cannot use it effectively.",
  Sigmoid: "A smooth binary-probability output. Its slope becomes small near either tail: saturation makes small changes hard to transmit.",
  tanh: "A smooth output between minus one and one. Positive and negative values are possible, but both tails still saturate.",
  ReLU: "Positive scores pass through with slope one; negative scores become zero with slope zero. The output is an activation, not a probability.",
};
export function intervalOutputs(x: number) {
  const h1 = step(x - 0.4), h2 = step(x - 0.7);
  return { z1: x - 0.4, z2: x - 0.7, h1, h2, y: h1 - h2 };
}
export const activationQuiz = [
  {
    question: "What happens if many affine layers are stacked with no nonlinear activation between them?",
    options: ["The network can represent any function.", "The whole stack is still equivalent to one affine transformation.", "The network cannot calculate an output.", "The network can only process images."],
    answer: 1,
    explanation: "Substitution gives $W_2(W_1\\mathbf{x}+\\mathbf{b}_1)+\\mathbf{b}_2=(W_2W_1)\\mathbf{x}+(W_2\\mathbf{b}_1+\\mathbf{b}_2)$. Repeating this leaves a single effective matrix and bias. Depth alone does not add nonlinear expressiveness.",
  },
  {
    question: "Which statement correctly describes ReLU?",
    options: ["It compresses every input to between zero and one.", "It outputs zero for negative inputs and leaves positive inputs unchanged, introducing nonlinearity.", "It turns every negative number positive.", "It is identical to using no activation."],
    answer: 1,
    explanation: "ReLU is $f(z)=\\max(0,z)$. Its derivative is zero for $z<0$ and one for $z>0$, but the classical derivative is undefined at zero. It is not bounded above and is not a probability output.",
  },
];
