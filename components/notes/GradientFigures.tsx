import type { ReactNode } from "react";
import MathFormula, { MathText, SvgMath } from "./Math";
import { descentPath, minimumPoint, startPoint, type GroundPoint } from "@/data/gradient-lesson";

function Diagram({ label, caption, children }: { label: string; caption: string; children: ReactNode }) {
  return <figure>
    <div className="overflow-x-auto" tabIndex={0} role="region" aria-label={`${label}; scroll horizontally on small screens`}>
      <svg viewBox="0 0 640 430" className="min-w-[560px] w-full" role="img" aria-label={label}>{children}</svg>
    </div>
    <figcaption><MathText>{caption}</MathText></figcaption>
  </figure>;
}

function Marker({ id }: { id: string }) {
  return <defs><marker id={id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10z" fill="var(--accent)" /></marker></defs>;
}

export function BlindDescent() {
  return <Diagram label="Small downhill steps towards a valley" caption="Figure 5-1. Feel the local downhill direction, take a small step, and repeat. Local information can guide descent without showing the whole landscape.">
    <path d="M55 95 C125 85 155 165 205 215 S285 325 350 325 S435 290 490 180 S555 80 590 100" fill="none" stroke="#a3a3a3" strokeWidth="2" />
    <Marker id="blind-descent-arrow" />
    <path d="M95 104 Q150 125 175 183 M192 204 Q232 252 256 283 M278 305 Q310 322 338 325" fill="none" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#blind-descent-arrow)" />
    <circle cx="95" cy="104" r="5" fill="var(--accent)" />
    <circle cx="350" cy="325" r="5" fill="#262626" />
    <text x="80" y="78" fontSize="14" fill="#525252">Start here</text>
    <text x="350" y="355" textAnchor="middle" fontSize="14" fill="#525252">Valley</text>
    <text x="320" y="395" textAnchor="middle" fontSize="14" fill="var(--accent)">Sense → step → repeat</text>
  </Diagram>;
}

export function MountainProfile() {
  return <Diagram label="A schematic mountain profile as a function of position" caption="Figure 5-2. From outside the mountain, you can see the whole curve. Someone standing on it must infer a direction from the local rise or fall. This is a schematic profile, not the quadratic used below.">
    <path d="M55 335 H595 M55 335 V45" fill="none" stroke="#a3a3a3" />
    <path d="M60 275 C110 120 165 65 225 140 S300 330 385 300 S480 170 590 60" fill="none" stroke="var(--accent)" strokeWidth="2.5" />
    <circle cx="225" cy="140" r="5" fill="var(--accent)" />
    <text x="235" y="118" fontSize="14" fill="#525252">Current position</text>
    <SvgMath x={585} y={375} anchor="end" width={150} tex={String.raw`\text{Position }x`} />
    <SvgMath x={55} y={32} width={180} tex={String.raw`\text{Height }h(x)`} />
    <text x="320" y="410" textAnchor="middle" fontSize="14" fill="#737373">A local slope gives a direction, not a map of every valley.</text>
  </Diagram>;
}

export function TangentSlope() {
  const px = (x: number) => 55 + x * 65;
  const py = (h: number) => 350 - h * 17;
  const curve = Array.from({ length: 161 }, (_, i) => `${i ? "L" : "M"}${px(i / 20)},${py((i / 20 - 4) ** 2)}`).join(" ");
  return <Diagram label="Parabola with tangent slope minus six at x equals one" caption="Figure 5-4. For $h(x)=(x-4)^2$, the tangent at $x=1$ has slope $h'(1)=-6$. Moving right is locally downhill; the bottom is at $x=4$.">
    <path d="M55 350 H590 M55 350 V50" fill="none" stroke="#a3a3a3" />
    <path d={curve} fill="none" stroke="var(--accent)" strokeWidth="2.5" />
    <path d={`M${px(0)},${py(15)} L${px(2.5)},${py(0)}`} fill="none" stroke="#6a7f94" strokeWidth="2" strokeDasharray="5 5" />
    <circle cx={px(1)} cy={py(9)} r="5" fill="var(--accent)" />
    <circle cx={px(4)} cy={py(0)} r="5" fill="#262626" />
    <SvgMath x={px(1) + 12} y={py(9) - 15} width={120} tex="(1,9)" />
    <SvgMath x={px(4)} y={385} anchor="middle" width={160} tex={String.raw`\text{Minimum }x=4`} />
    <SvgMath x={425} y={85} width={190} tex={String.raw`h(x)=(x-4)^2`} />
    <SvgMath x={90} y={115} width={150} color="#6a7f94" tex={String.raw`h'(1)=-6`} />
  </Diagram>;
}

const groundPixel = ([x, y]: GroundPoint): GroundPoint => [130 + 45 * x, 335 - 45 * y];

function Contours({ id, children }: { id: string; children?: ReactNode }) {
  const [cx, cy] = groundPixel(minimumPoint);
  const [sx, sy] = groundPixel(startPoint);
  return <>
    <defs><clipPath id={`${id}-clip`}><rect x="55" y="30" width="540" height="350" /></clipPath></defs>
    <g clipPath={`url(#${id}-clip)`}>
      {[1, 2, 3, 4, 5, 6].map((r) => <circle key={r} cx={cx} cy={cy} r={45 * r} fill="none" stroke="#d4d4d4" />)}
      {children}
    </g>
    <circle cx={cx} cy={cy} r="4" fill="#262626" />
    <circle cx={sx} cy={sy} r="5" fill="var(--accent)" />
    <SvgMath x={sx - 12} y={sy - 14} anchor="end" width={110} tex="(1,5)" />
    <SvgMath x={cx + 10} y={cy + 20} width={100} tex="(4,2)" />
    <SvgMath x={560} y={410} width={30} tex="x" />
    <SvgMath x={60} y={25} width={30} tex="y" />
    <text x="320" y="410" textAnchor="middle" fontSize="13" fill="#737373">Equal height along each contour · lower towards the centre</text>
  </>;
}

export function PartialSlopes() {
  const [sx, sy] = groundPixel(startPoint);
  return <Diagram label="Partial derivatives on a contour map" caption="Figure 5-6. At $(1,5)$, increasing $x$ and decreasing $y$ both lower the height. Partial derivatives measure these axis directions separately: $h_x=-6$, $h_y=6$.">
    <Marker id="partial-arrow" />
    <Contours id="partial"><path d={`M${sx} ${sy} H${sx + 100} M${sx} ${sy} V${sy + 100}`} fill="none" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#partial-arrow)" /></Contours>
    <SvgMath x={285} y={sy + 5} width={180} color="var(--accent)" tex={String.raw`\frac{\partial h}{\partial x}=-6`} />
    <SvgMath x={sx - 10} y={sy + 115} anchor="end" width={145} color="var(--accent)" tex={String.raw`\frac{\partial h}{\partial y}=6`} />
  </Diagram>;
}

export function DirectionalSlopes() {
  const [sx, sy] = groundPixel(startPoint);
  return <div>
    <Diagram label="Several directions from the same point on a contour map" caption="Figure 5-7. East and south both have directional derivative $-6$. The southeast unit direction gives $-6\sqrt{2}\approx-8.49$, the steepest descent here.">
      <Marker id="direction-arrow" />
      <Contours id="directions">
        {[[80, 0], [0, 80], [60, 60], [-60, -60]].map(([dx, dy], i) => <line key={i} x1={sx} y1={sy} x2={sx + dx} y2={sy + dy} stroke={i === 3 ? "#6a7f94" : "var(--accent)"} strokeWidth="2" markerEnd="url(#direction-arrow)" />)}
      </Contours>
      <text x={sx + 90} y={sy} fontSize="13" fill="#525252">East</text>
      <text x={sx - 10} y={sy + 95} textAnchor="end" fontSize="13" fill="#525252">South</text>
      <text x={sx + 70} y={sy + 72} fontSize="13" fill="var(--accent)">Southeast</text>
      <text x={sx - 60} y={sy - 75} fontSize="13" fill="#6a7f94">Northwest</text>
    </Diagram>
    <div className="overflow-x-auto">
      <table className="w-full min-w-[440px] text-left text-sm">
        <thead><tr className="border-y border-neutral-200"><th className="py-3 font-medium">Direction</th><th className="font-medium">Unit vector</th><th className="font-medium">Slope</th></tr></thead>
        <tbody>{[
          ["East", "(1,0)", "-6"], ["South", "(0,-1)", "-6"],
          ["Southeast", String.raw`(\tfrac{1}{\sqrt2},-\tfrac{1}{\sqrt2})`, String.raw`-6\sqrt2\approx-8.49`],
          ["Northwest", String.raw`(-\tfrac{1}{\sqrt2},\tfrac{1}{\sqrt2})`, String.raw`6\sqrt2\approx8.49`],
        ].map(([name, direction, slope]) => <tr key={name} className="border-b border-neutral-200"><th scope="row" className="py-3 font-normal">{name}</th><td><MathFormula tex={direction} /></td><td><MathFormula tex={slope} /></td></tr>)}</tbody>
      </table>
    </div>
  </div>;
}

export function GradientDescentPath() {
  const points = descentPath();
  const path = points.map((point) => groundPixel(point).join(",")).join(" ");
  const [sx, sy] = groundPixel(startPoint);
  return <Diagram label="Computed gradient descent trajectory towards the bowl minimum" caption="Figure 5-8. These points are computed using $\mathbf{x}_{k+1}=\mathbf{x}_k-0.2\nabla h(\mathbf{x}_k)$. The negative gradient crosses the contours towards the minimum. For this bowl the path is straight; general landscapes need not behave this way.">
    <Marker id="gradient-path-arrow" />
    <Contours id="descent">
      <polyline points={path} fill="none" stroke="var(--accent)" strokeWidth="2" />
      {points.slice(1).map((point, i) => { const [x, y] = groundPixel(point); return <circle key={i} cx={x} cy={y} r="3" fill="var(--accent)" />; })}
      <path d={`M${sx} ${sy} l-60 -60 M${sx} ${sy} l60 60`} fill="none" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#gradient-path-arrow)" />
    </Contours>
    <SvgMath x={sx - 65} y={sy - 80} width={130} tex={String.raw`\nabla h=(-6,6)`} />
    <SvgMath x={sx + 65} y={sy + 85} width={150} color="var(--accent)" tex={String.raw`-\nabla h=(6,-6)`} />
  </Diagram>;
}
