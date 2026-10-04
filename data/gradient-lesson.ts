export type GroundPoint = [number, number];

export const startPoint: GroundPoint = [1, 5];
export const minimumPoint: GroundPoint = [4, 2];
export const height = (x: number, y: number) => (x - 4) ** 2 + (y - 2) ** 2;
export const gradient = (x: number, y: number): GroundPoint => [2 * (x - 4), 2 * (y - 2)];

export function descentPath(rate = 0.2, steps = 8): GroundPoint[] {
  const points: GroundPoint[] = [startPoint];
  for (let step = 0; step < steps; step++) {
    const [x, y] = points[points.length - 1];
    const [dx, dy] = gradient(x, y);
    points.push([x - rate * dx, y - rate * dy]);
  }
  return points;
}

export const gradientQuiz = [
  {
    question: "You are blindfolded on a hillside and want to reach a valley. What does the gradient represent?",
    options: [
      "The direction of steepest ascent, so you should descend in the opposite direction.",
      "A vector that always points directly to the lowest point in the valley.",
      "Your current altitude.",
      "The number of steps you have already taken.",
    ],
    answer: 0,
    explanation: "The gradient describes the local direction of fastest increase. To decrease the height or loss, move against it. It does not reveal the global terrain or guarantee that the lowest point lies directly along that direction.",
  },
  {
    question: "What does a zero, or nearly zero, gradient usually tell you?",
    options: [
      "The function is increasing as fast as possible.",
      "The first-order slope is zero, or small: this may be near a minimum, a maximum, or a saddle point.",
      "The calculation must be wrong.",
      "The learning rate must be too large.",
    ],
    answer: 1,
    explanation: "For a differentiable function, $\\nabla h=\\mathbf{0}$ identifies a stationary point. It can be a minimum, a maximum or a saddle point; a small gradient alone does not prove any of these. This is one reason optimisation can stall, and why later lessons discuss more capable optimisers.",
  },
];
