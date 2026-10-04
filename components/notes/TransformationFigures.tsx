import MathFormula, { MathText, SvgMath } from "./Math";
import type { ReactNode } from "react";
import { exampleMatrix, identityMatrix, transformations, transformPoint, type Matrix2, type Point2 } from "@/data/linear-transformation";

const square: Point2[] = [[0, 0], [1, 0], [1, 1], [0, 1]];
const px = (point: Point2): Point2 => [170 + point[0] * 45, 225 - point[1] * 45];
const pointList = (points: Point2[]) => points.map((point) => px(point).join(",")).join(" ");

function Plot({ id, matrix = identityMatrix, bias = [0, 0], shape = false, basis = false, point, children }: {
  id: string;
  matrix?: Matrix2;
  bias?: Point2;
  shape?: boolean;
  basis?: boolean;
  point?: Point2;
  children?: ReactNode;
}) {
  const start = px(bias);
  const e1 = px(transformPoint(matrix, [1, 0], bias));
  const e2 = px(transformPoint(matrix, [0, 1], bias));
  return (
    <div className="min-w-0 max-w-full overflow-x-auto" tabIndex={0} role="region" aria-label={`${id}; scroll horizontally on small screens`}>
      <svg viewBox="0 0 420 350" className="min-w-[380px] w-full" role="img" aria-label={id}>
        <defs>
          <clipPath id={`${id}-clip`}><rect x="15" y="15" width="390" height="315" /></clipPath>
          <marker id={`${id}-arrow`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10z" fill="var(--accent)" /></marker>
          <marker id={`${id}-blue`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10z" fill="#6a7f94" /></marker>
        </defs>
        <g clipPath={`url(#${id}-clip)`}>
          {[-3, -2, -1, 0, 1, 2, 3].map((value) => {
            const verticalStart = px(transformPoint(matrix, [value, -4], bias));
            const verticalEnd = px(transformPoint(matrix, [value, 4], bias));
            const horizontalStart = px(transformPoint(matrix, [-4, value], bias));
            const horizontalEnd = px(transformPoint(matrix, [4, value], bias));
            return <g key={value}><line x1={verticalStart[0]} y1={verticalStart[1]} x2={verticalEnd[0]} y2={verticalEnd[1]} stroke={value === 0 ? "#a3a3a3" : "#e5e5e5"} /><line x1={horizontalStart[0]} y1={horizontalStart[1]} x2={horizontalEnd[0]} y2={horizontalEnd[1]} stroke={value === 0 ? "#a3a3a3" : "#e5e5e5"} /></g>;
          })}
          {shape && <><polygon points={pointList(square)} fill="none" stroke="#a3a3a3" strokeDasharray="5 5" /><polygon points={pointList(square.map((point) => transformPoint(matrix, point, bias)))} fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="2" /></>}
          {basis && <><line x1={start[0]} y1={start[1]} x2={e1[0]} y2={e1[1]} stroke="var(--accent)" strokeWidth="2" markerEnd={`url(#${id}-arrow)`} /><line x1={start[0]} y1={start[1]} x2={e2[0]} y2={e2[1]} stroke="#6a7f94" strokeWidth="2" markerEnd={`url(#${id}-blue)`} /><SvgMath x={e1[0] + 8} y={e1[1] + 16} size={13} width={150} color="var(--accent)" tex={String.raw`\hat{\mathbf{i}}\prime=[${matrix[0]},${matrix[2]}]`} /><SvgMath x={e2[0] + 8} y={e2[1] - 8} size={13} width={150} color="#6a7f94" tex={String.raw`\hat{\mathbf{j}}\prime=[${matrix[1]},${matrix[3]}]`} /></>}
          {point && <><circle cx={px(transformPoint(matrix, point, bias))[0]} cy={px(transformPoint(matrix, point, bias))[1]} r="5" fill="var(--accent)" /><SvgMath x={px(transformPoint(matrix, point, bias))[0] + 10} y={px(transformPoint(matrix, point, bias))[1] - 10} size={13} width={40} color="var(--accent)" tex={matrix === identityMatrix ? "P" : String.raw`P\prime`} /></>}
          <circle cx={start[0]} cy={start[1]} r="3" fill="#262626" />
          <SvgMath x={start[0] - 14} y={start[1] + 20} size={12} width={30} tex={bias[0] || bias[1] ? String.raw`\mathbf{b}` : "O"} />
          {children}
        </g>
      </svg>
    </div>
  );
}

function Comparison({ caption, leftTitle, rightTitle, left, right }: {
  caption: string; leftTitle: string; rightTitle: string; left: ReactNode; right: ReactNode;
}) {
  return <figure><div className="grid gap-6 border-y border-neutral-200 py-6 sm:grid-cols-2"><div className="min-w-0"><p className="text-sm font-medium text-neutral-900"><MathText>{leftTitle}</MathText></p>{left}</div><div className="min-w-0"><p className="text-sm font-medium text-neutral-900"><MathText>{rightTitle}</MathText></p>{right}</div></div><figcaption><MathText>{caption}</MathText></figcaption></figure>;
}

export function PointMovement() {
  const from = px([1, 1]);
  const to = px([3, 3]);
  return <figure><Plot id="point-movement"><line x1={from[0]} y1={from[1]} x2={to[0]} y2={to[1]} stroke="var(--accent)" strokeDasharray="5 5" markerEnd="url(#point-movement-arrow)" /><circle cx={from[0]} cy={from[1]} r="5" fill="#6a7f94" /><circle cx={to[0]} cy={to[1]} r="5" fill="var(--accent)" /><SvgMath x={from[0] + 10} y={from[1] + 18} color="#6a7f94" tex="P=[1,1]" /><SvgMath x={to[0] - 10} y={to[1] - 15} color="var(--accent)" tex={String.raw`P\prime=[3,3]`} /><SvgMath x={255} y={145} tex={String.raw`\times W`} /></Plot><figcaption><MathText>{"Figure 4-1. $W$ moves $P=[1,1]$ to $P\\prime=[3,3]$. Both the input and output are points: matrix multiplication assigns a new position."}</MathText></figcaption></figure>;
}

export function SquareTransformation() {
  return <Comparison leftTitle="Before · square, area 1" rightTitle="After · parallelogram, area 3" left={<Plot id="original-square" shape />} right={<Plot id="transformed-square" matrix={exampleMatrix} shape />} caption="Figure 4-2. The four corners move to $[0,0]$, $[2,1]$, $[3,3]$ and $[1,2]$. Straight edges stay straight and opposite sides stay parallel. The origin stays fixed, while the area changes from 1 to 3." />;
}

export function WholeSpaceTransformation() {
  return <Comparison leftTitle="Before · original grid" rightTitle="After · transformed grid" left={<Plot id="original-space" point={[1, 1]} />} right={<Plot id="transformed-space" matrix={exampleMatrix} point={[1, 1]} />} caption="Figure 4-3. The same $W$ transforms every point, including $P$. The grid changes shape, but each family of lines remains straight, parallel and evenly spaced." />;
}

export function BasisVectors() {
  return <figure><Plot id="transformed-basis" matrix={exampleMatrix} basis /><div className="border-y border-neutral-200 py-4 text-sm"><p><MathFormula tex={String.raw`W=\begin{bmatrix}2&1\\1&2\end{bmatrix}`} /></p><p className="mt-2"><span className="accent-text"><MathFormula tex={String.raw`\text{First column: }\hat{\mathbf{i}}\prime=[2,1]`} /></span><br /><span className="text-[#6a7f94]"><MathFormula tex={String.raw`\text{Second column: }\hat{\mathbf{j}}\prime=[1,2]`} /></span></p></div><figcaption><MathText>{"Figure 4-4. Each column of $W$ gives the transformed position of a basis vector. Together, the columns specify the transformation of the whole plane."}</MathText></figcaption></figure>;
}

export function TransformationGallery() {
  return <figure><div className="grid gap-8 border-y border-neutral-200 py-6 sm:grid-cols-2">{transformations.map((item, index) => <div key={item.title} className="min-w-0"><p className="font-medium text-neutral-900">{item.title}</p><p className="mt-1 text-sm"><MathText>{item.description}</MathText></p><Plot id={`transformation-${index}`} matrix={item.matrix} shape /><div className="text-sm"><MathFormula tex={String.raw`W=\begin{bmatrix}${item.matrix.slice(0, 2).map((value) => Number(value.toFixed(2))).join(" & ")}\\${item.matrix.slice(2).map((value) => Number(value.toFixed(2))).join(" & ")}\end{bmatrix}`} /></div></div>)}</div><figcaption><MathText>{"Figure 4-5. Scaling, rotation, shear and reflection, with their matrices. The dashed outline is the original square. The rotation matrix is displayed to two decimal places; the diagram uses the exact $30^\\circ$ values."}</MathText></figcaption></figure>;
}

export function AffineTranslation() {
  return <Comparison leftTitle="$W\mathbf{x}$ · origin stays fixed" rightTitle="$W\mathbf{x}+\mathbf{b}$ · translate by $\mathbf{b}=[1,1]$" left={<Plot id="linear-grid" matrix={[1, 0.5, 0, 1]} shape />} right={<Plot id="affine-grid" matrix={[1, 0.5, 0, 1]} bias={[1, 1]} shape />} caption="Figure 4-6. $W$ reshapes the space; $\mathbf{b}$ shifts the result. With a non-zero bias, the origin moves to $\mathbf{b}$, so $W\mathbf{x}+\mathbf{b}$ is an affine transformation." />;
}
