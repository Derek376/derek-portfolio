import type { ReactNode } from "react";
import MathFormula, { MathText, SvgMath } from "./Math";
import { ActivationExplorer, IntervalExplorer } from "./ActivationExplorers";
import { geluApprox, leakyRelu, relu } from "@/data/activation-lesson";
import { sigmoid } from "@/data/neuron-lesson";

function Figure({ label, caption, children, height = 390 }: { label: string; caption: string; children: ReactNode; height?: number }) {
  return <figure><div className="overflow-x-auto" tabIndex={0} role="region" aria-label={`${label}; scroll horizontally on small screens`}>
    <svg viewBox={`0 0 640 ${height}`} className="min-w-[560px] w-full" role="img" aria-label={label}>{children}</svg>
  </div><figcaption><MathText>{caption}</MathText></figcaption></figure>;
}

export function AffineStack() {
  return <Figure label="Two affine layers without a nonlinear activation" height={220} caption="Figure 8-1. The first affine layer produces $\mathbf{h}$, and the second produces $\mathbf{y}$. Without a nonlinear activation between them, the two operations combine into one effective matrix and bias.">
    <SvgMath x={35} y={107} width={45} tex={String.raw`\mathbf{x}`} />
    <path d="M75 95 H110 M270 95 H365 M525 95 H585" stroke="#a3a3a3" fill="none" />
    <rect x="110" y="50" width="160" height="90" fill="white" stroke="var(--accent)" />
    <text x="190" y="75" textAnchor="middle" fontSize="13" fill="#525252">Layer one</text>
    <SvgMath x={190} y={112} width={155} anchor="middle" tex={String.raw`W_1\mathbf{x}+\mathbf{b}_1`} />
    <SvgMath x={320} y={75} width={45} anchor="middle" tex={String.raw`\mathbf{h}`} />
    <rect x="365" y="50" width="160" height="90" fill="white" stroke="var(--accent)" />
    <text x="445" y="75" textAnchor="middle" fontSize="13" fill="#525252">Layer two</text>
    <SvgMath x={445} y={112} width={155} anchor="middle" tex={String.raw`W_2\mathbf{h}+\mathbf{b}_2`} />
    <SvgMath x={595} y={107} width={45} anchor="middle" tex={String.raw`\mathbf{y}`} />
    <text x="320" y="190" textAnchor="middle" fontSize="13" fill="#737373">No nonlinear activation between the layers</text>
  </Figure>;
}

type Curve = { name: string; fn: (z: number) => number; color: string; dashed?: boolean };
function CurveFigure({ label, caption, curves, yMin = -0.2, yMax = 1.2, stepCurve = false }: {
  label: string; caption: string; curves: Curve[]; yMin?: number; yMax?: number; stepCurve?: boolean;
}) {
  const px = (z: number) => 65 + (z + 6) / 12 * 510;
  const py = (y: number) => 300 - (y - yMin) / (yMax - yMin) * 245;
  return <Figure label={label} caption={caption}>
    <defs><clipPath id={`${label.replaceAll(" ", "-")}-clip`}><rect x="65" y="45" width="510" height="255" /></clipPath></defs>
    <path d={`M65 ${py(0)} H585 M${px(0)} 45 V300`} stroke="#a3a3a3" fill="none" />
    {[-6, -3, 0, 3, 6].map((z) => <text key={z} x={px(z)} y="324" textAnchor="middle" fontSize="13" fill="#737373">{z}</text>)}
    {[0, 1, ...(yMin <= -1 ? [-1] : []), ...(yMax >= 4 ? [3, 6] : [])].filter((y) => y <= yMax).map((y) => <g key={y}><line x1="65" y1={py(y)} x2="575" y2={py(y)} stroke="#e5e5e5" /><text x="50" y={py(y) + 4} textAnchor="end" fontSize="13" fill="#737373">{y}</text></g>)}
    <g clipPath={`url(#${label.replaceAll(" ", "-")}-clip)`}>{curves.map((curve) => {
      const path = Array.from({ length: 241 }, (_, i) => { const z = -6 + i / 20; return `${i ? "L" : "M"}${px(z)},${py(curve.fn(z))}`; }).join(" ");
      return <path key={curve.name} d={path} fill="none" stroke={curve.color} strokeWidth="2.5" strokeDasharray={curve.dashed ? "6 5" : undefined} />;
    })}</g>
    {stepCurve && <><path d={`M${px(-6)} ${py(0)} H${px(0)} M${px(0)} ${py(1)} H${px(6)}`} fill="none" stroke="#737373" strokeWidth="2" strokeDasharray="6 5" /><circle cx={px(0)} cy={py(0)} r="4" fill="white" stroke="#737373" /><circle cx={px(0)} cy={py(1)} r="4" fill="#737373" /></>}
    <SvgMath x={590} y={326} width={40} tex="z" /><SvgMath x={65} y={28} width={110} tex="f(z)" />
    <g>{curves.map((curve, i) => <g key={curve.name}><line x1={75 + i * 170} y1="365" x2={105 + i * 170} y2="365" stroke={curve.color} strokeWidth="2" strokeDasharray={curve.dashed ? "6 5" : undefined} /><text x={115 + i * 170} y="369" fontSize="13" fill="#525252">{curve.name}</text></g>)}{stepCurve && <text x="450" y="369" fontSize="13" fill="#737373">Dashed: step</text>}</g>
  </Figure>;
}

export function StepCurve() {
  return <CurveFigure label="Step activation" caption="Figure 8-2. The step is flat on each side and jumps at zero. Its derivative is zero away from the jump and undefined at the jump. The filled endpoint implements $s(0)=1$." curves={[]} stepCurve />;
}
export function SigmoidCurve() {
  return <CurveFigure label="Sigmoid compared with a hard step" caption="Figure 8-3. Sigmoid is a smooth alternative to a hard step. Its output lies strictly between zero and one for finite inputs. Both tails become almost flat: the saturation regions." curves={[{ name: "Sigmoid", fn: sigmoid, color: "var(--accent)" }]} stepCurve />;
}
export function TanhCurve() {
  return <CurveFigure label="Tanh compared with sigmoid" caption="Figure 8-4. $\tanh(z)$ ranges between minus one and one and passes through the origin. Sigmoid ranges between zero and one. Both saturate in their tails." yMin={-1.2} curves={[{ name: "tanh", fn: Math.tanh, color: "var(--accent)" }, { name: "Sigmoid", fn: sigmoid, color: "#6a7f94", dashed: true }]} />;
}
export function ReluCurve() {
  return <Figure label="ReLU and its derivative away from zero" caption="Figure 8-5. ReLU passes positive inputs through and sets negative inputs to zero. The dashed derivative is one on the positive side and zero on the negative side. ReLU is not classically differentiable at zero.">
    <path d="M65 290 H585 M320 45 V300" fill="none" stroke="#a3a3a3" />
    {[0, 1, 3, 6].map((y) => <g key={y}><line x1="65" y1={290 - y * 38} x2="575" y2={290 - y * 38} stroke="#e5e5e5" /><text x="50" y={294 - y * 38} textAnchor="end" fontSize="13" fill="#737373">{y}</text></g>)}
    <path d="M65 290 H320 L575 62" fill="none" stroke="var(--accent)" strokeWidth="2.5" />
    <path d="M65 290 H320 M320 252 H575" fill="none" stroke="#6a7f94" strokeWidth="2" strokeDasharray="6 5" />
    <circle cx="320" cy="290" r="4" fill="white" stroke="#6a7f94" /><circle cx="320" cy="252" r="4" fill="white" stroke="#6a7f94" /><circle cx="320" cy="290" r="2" fill="var(--accent)" />
    {[-6, -3, 0, 3, 6].map((z) => <text key={z} x={65 + (z + 6) * 42.5} y="325" textAnchor="middle" fontSize="13" fill="#737373">{z}</text>)}
    <SvgMath x={65} y={28} width={120} tex={String.raw`\operatorname{ReLU}(z)`} /><SvgMath x={590} y={325} width={35} tex="z" />
    <text x="95" y="368" fontSize="13" fill="var(--accent)">Solid: ReLU</text><text x="320" y="368" fontSize="13" fill="#6a7f94">Dashed: derivative (except at zero)</text>
  </Figure>;
}
export function ReluVariants() {
  return <CurveFigure label="Leaky ReLU and GELU compared with ReLU" caption="Figure 8-6. Leaky ReLU keeps a negative-side slope, here $0.1$. GELU uses a smooth weighting around zero. The plotted GELU uses the tanh approximation shown in the text; ReLU is the dashed reference." yMin={-1} yMax={6.5} curves={[{ name: "Leaky ReLU", fn: leakyRelu, color: "#6a7f94" }, { name: "GELU (approx.)", fn: geluApprox, color: "var(--accent)" }, { name: "ReLU", fn: relu, color: "#a3a3a3", dashed: true }]} />;
}

export function ActivationExperiment() {
  return <figure><ActivationExplorer scoreLabel={<MathFormula tex="z" />} outputLabel={<MathFormula tex="f(z)" />} slopeLabel={<MathFormula tex="f'(z)" />} formulas={{
    Step: <MathFormula display tex={String.raw`s(z)=\begin{cases}0&z<0\\1&z\geq0\end{cases}`} />,
    Sigmoid: <MathFormula display tex={String.raw`\sigma(z)=\frac{1}{1+e^{-z}}`} />,
    tanh: <MathFormula display tex={String.raw`\tanh(z)=\frac{e^z-e^{-z}}{e^z+e^{-z}}`} />,
    ReLU: <MathFormula display tex={String.raw`\operatorname{ReLU}(z)=\max(0,z)`} />,
  }} /><figcaption>Experiment 8-A. Keep the same hand-picked apple weights, change the input features, and switch the activation. The dark point shows the current output; the readout shows its local derivative. Only the sigmoid output is interpreted as an estimated probability.</figcaption></figure>;
}
export function IntervalExperiment() {
  return <figure><IntervalExplorer sizeLabel={<MathFormula tex="x" />} labels={["h_1", "h_2", "y"].map((tex) => <MathFormula key={tex} tex={tex} />)} formula={<MathFormula display tex={String.raw`h_1=s(x-0.4),\quad h_2=s(x-0.7),\quad y=h_1-h_2`} />} /><figcaption><MathText>{String.raw`Experiment 8-B. Two hidden step units select a middle interval. With $s(0)=1$, the output is one for $0.4\leq x<0.7$, including the left endpoint and excluding the right endpoint.`}</MathText></figcaption></figure>;
}
