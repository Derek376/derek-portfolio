export type Matrix2 = [number, number, number, number];
export type Point2 = [number, number];

export const exampleMatrix: Matrix2 = [2, 1, 1, 2];
export const identityMatrix: Matrix2 = [1, 0, 0, 1];

export function transformPoint(matrix: Matrix2, point: Point2, bias: Point2 = [0, 0]): Point2 {
  const [a, b, c, d] = matrix;
  const [x, y] = point;
  return [a * x + b * y + bias[0], c * x + d * y + bias[1]];
}

export const transformations: { title: string; description: string; matrix: Matrix2 }[] = [
  { title: "Scaling", description: "Stretch horizontally; compress vertically.", matrix: [1.5, 0, 0, 0.5] },
  { title: "Rotation", description: "Rotate $30^\\circ$ anticlockwise.", matrix: [Math.cos(Math.PI / 6), -0.5, 0.5, Math.cos(Math.PI / 6)] },
  { title: "Shear", description: "Push the square into a parallelogram.", matrix: [1, 0.7, 0, 1] },
  { title: "Reflection", description: "Reflect across the horizontal axis.", matrix: [1, 0, 0, -1] },
];

export const transformationQuiz = [
  {
    question: "What happens geometrically when the same matrix multiplies every vector in a space?",
    options: ["A constant is added to each number.", "The whole space undergoes a linear transformation, such as rotation, stretching, compression or reflection.", "The vectors are randomly shuffled.", "Only the vectors' colours change, not their positions."],
    answer: 1,
    explanation: "Matrix multiplication applies one linear rule to the whole space. The origin stays fixed, and grid lines stay straight and evenly spaced, though some transformations can collapse dimensions. Each matrix column tells you where the corresponding basis vector goes.",
  },
  {
    question: "Which property must a linear transformation satisfy?",
    options: ["It moves the origin to a different point.", "It can turn straight lines into curves.", "It fixes the origin and preserves vector addition and scalar multiplication.", "It can enlarge a shape, but cannot shrink it."],
    answer: 2,
    explanation: "Linearity means $T(\\mathbf{a}+\\mathbf{b})=T(\\mathbf{a})+T(\\mathbf{b})$ and $T(k\\mathbf{a})=kT(\\mathbf{a})$. The origin remains fixed; lines map to lines or, when a dimension collapses, to points. Translation by a non-zero vector moves the origin, so $W\\mathbf{x}+\\mathbf{b}$ is affine rather than linear when $\\mathbf{b}$ is non-zero.",
  },
];
