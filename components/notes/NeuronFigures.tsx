import type { ReactNode } from "react";
import MathFormula, { MathText, SvgMath } from "./Math";
import { FruitClassifier, FruitGuess, LineBoundary, PlaneBoundary, SingleNeuron } from "./NeuronExplorers";

function Diagram({ label, caption, height = 330, children }: { label: string; caption: string; height?: number; children: ReactNode }) {
  return <figure><div className="overflow-x-auto" tabIndex={0} role="region" aria-label={`${label}; scroll horizontally on small screens`}>
    <svg viewBox={`0 0 640 ${height}`} className="min-w-[560px] w-full" role="img" aria-label={label}>{children}</svg>
  </div><figcaption><MathText>{caption}</MathText></figcaption></figure>;
}

export function GuessFruitExperiment() {
  return <figure><FruitGuess /><figcaption>Experiment 7-A. Match four simplified clues to a fruit. This intuition will become a weighted scoring machine.</figcaption></figure>;
}

export function NeuronStructure() {
  return <Diagram label="Four weighted fruit features feed a sum, bias and sigmoid" caption="Figure 7-1. Each input is multiplied by a weight. Add the products and bias to obtain $z$, then apply the sigmoid to get the illustrative apple probability $y$." height={340}>
    {[55, 125, 195, 265].map((y, i) => <g key={i}>
      <circle cx="75" cy={y} r="24" fill="white" stroke="#a3a3a3" />
      <SvgMath x={75} y={y + 6} anchor="middle" width={60} tex={`x_${i + 1}`} />
      <line x1="100" y1={y} x2="285" y2="160" stroke="var(--accent)" strokeWidth={[1, 3.5, 2.5, 1][i]} />
      <SvgMath x={135} y={i === 2 ? y + 22 : y - 10} width={125} tex={`w_${i + 1}=${[0.4, 2.8, 1.6, 0.4][i]}`} />
    </g>)}
    <circle cx="315" cy="160" r="32" fill="white" stroke="var(--accent)" strokeWidth="1.5" />
    <SvgMath x={315} y={166} anchor="middle" width={65} tex={String.raw`\sum`} size={22} />
    <line x1="347" y1="160" x2="425" y2="160" stroke="#a3a3a3" />
    <SvgMath x={385} y={137} width={60} anchor="middle" tex="z" />
    <rect x="425" y="130" width="90" height="60" fill="white" stroke="var(--accent)" />
    <SvgMath x={470} y={167} width={85} anchor="middle" tex={String.raw`\sigma(z)`} />
    <line x1="515" y1="160" x2="600" y2="160" stroke="#a3a3a3" />
    <SvgMath x={580} y={135} width={45} anchor="middle" tex="y" />
    <SvgMath x={315} y={250} width={130} anchor="middle" tex="b=-2.4" />
    <line x1="315" y1="220" x2="315" y2="194" stroke="#a3a3a3" />
    <text x="470" y="217" textAnchor="middle" fontSize="13" fill="#525252">Activation</text>
    <text x="580" y="190" textAnchor="middle" fontSize="13" fill="#525252">Apple</text>
    <text x="580" y="210" textAnchor="middle" fontSize="13" fill="#525252">probability</text>
    <text x="75" y="325" fontSize="13" fill="#737373">Inputs: size · colour · sweetness · water content</text>
  </Diagram>;
}

export function SingleNeuronExperiment() {
  return <figure><SingleNeuron
    formula={<MathFormula display tex={String.raw`z=0.4x_1+2.8x_2+1.6x_3+0.4x_4-2.4,\quad y=\sigma(z)`} />}
    scoreLabel={<MathFormula tex="z" />}
    weightLabels={[0.4, 2.8, 1.6, 0.4].map((w, i) => <MathFormula key={i} tex={`w_${i + 1}=${w}`} />)}
  /><figcaption>Experiment 7-B. Move the feature sliders to recalculate every contribution, the total score and the apple probability. These weights are hand-picked, not trained.</figcaption></figure>;
}

export function OneFeatureBoundary() {
  return <figure><LineBoundary formula={<MathFormula display tex="z=wx+b" />} weightLabel={<MathFormula tex="w=" />} biasLabel={<MathFormula tex="b=" />} xLabel={<MathFormula tex="x" />} zLabel={<MathFormula tex="z" />} />
    <figcaption><MathText>{"Figure 7-2. With one feature, $z=wx+b$ is a straight line. For non-zero $w$, it crosses zero at $x=-b/w$: one decision point. Change the weight and bias; a single threshold cannot select a bounded interval."}</MathText></figcaption></figure>;
}

export function TwoFeatureBoundary() {
  return <figure><PlaneBoundary formula={<MathFormula display tex="z=w_1x_1+w_2x_2+b" />} parameterLabels={["w_1=", "w_2=", "b="].map((tex) => <MathFormula key={tex} tex={tex} />)} />
    <figcaption><MathText>{"Figure 7-3. With two features, the score is a plane. The black line is its intersection with the zero-score plane: $w_1x_1+w_2x_2+b=0$. Change the weights or bias and rotate the view. The height scale adjusts to keep the surface visible. The surface stays flat and the boundary stays straight."}</MathText></figcaption></figure>;
}

export function MiddleInterval() {
  const px = (x: number) => 65 + 500 * x;
  const py = (z: number) => 210 - 140 * z;
  const curve = Array.from({ length: 101 }, (_, i) => {
    const x = i / 100;
    return `${i ? "L" : "M"}${px(x)},${py(0.8 - 8 * (x - 0.5) ** 2)}`;
  }).join(" ");
  return <Diagram label="A middle interval needs two decision points" height={360} caption="Figure 7-4. Good apples occupy a middle interval: neither too small nor too large. A straight score line has at most one zero crossing. The curved score shown here illustrates the two crossings needed; a single affine-score neuron cannot produce it.">
    <defs><clipPath id="middle-interval-clip"><rect x="65" y="40" width="500" height="265" /></clipPath></defs>
    <rect x={px(0.5 - Math.sqrt(0.1))} y="40" width={Math.sqrt(0.1) * 1000} height="265" fill="var(--accent)" fillOpacity="0.06" />
    <path d="M65 40 V305 M65 210 H575" fill="none" stroke="#a3a3a3" />
    <g clipPath="url(#middle-interval-clip)"><path d={curve} fill="none" stroke="var(--accent)" strokeWidth="2" strokeDasharray="6 4" /><line x1={px(0)} y1={py(-0.5)} x2={px(1)} y2={py(0.5)} stroke="#737373" strokeDasharray="4 4" /></g>
    {[0.08, 0.14, 0.4, 0.5, 0.6, 0.86, 0.94].map((x) => <circle key={x} cx={px(x)} cy="210" r="6" fill={x > 0.3 && x < 0.7 ? "var(--accent)" : "#737373"} />)}
    <text x="320" y="65" textAnchor="middle" fontSize="13" fill="#525252">Two crossings enclose the middle</text>
    <text x="115" y="330" textAnchor="middle" fontSize="13" fill="#737373">Too small</text>
    <text x="320" y="330" textAnchor="middle" fontSize="13" fill="var(--accent)">Suitable size</text>
    <text x="525" y="330" textAnchor="middle" fontSize="13" fill="#737373">Too large</text>
    <SvgMath x={580} y={198} anchor="end" width={70} tex="z=0" />
  </Diagram>;
}

export function XorProblem() {
  const samples = [{ x: 0, y: 0, yes: false }, { x: 1, y: 0, yes: true }, { x: 0, y: 1, yes: true }, { x: 1, y: 1, yes: false }];
  return <Diagram label="Opposite XOR corners cannot be separated by one line" height={400} caption="Figure 7-5. XOR is true when exactly one input is true. The two positive points lie on opposite corners. None of the example straight lines separates both positives from both negatives.">
    <path d="M155 50 V330 H510" fill="none" stroke="#a3a3a3" />
    <path d="M155 300 L495 65 M165 75 L495 300 M155 190 H505" fill="none" stroke="#a3a3a3" strokeDasharray="6 5" />
    {samples.map(({ x, y, yes }) => <g key={`${x}-${y}`}>
      <circle cx={185 + 280 * x} cy={300 - 220 * y} r="9" fill={yes ? "var(--accent)" : "#737373"} />
      <text x={185 + 280 * x} y={300 - 220 * y + (y ? -25 : 30)} textAnchor="middle" fontSize="14" fill="#525252">{yes ? "Yes" : "No"}</text>
      <SvgMath x={185 + 280 * x} y={300 - 220 * y + (y ? -45 : 53)} anchor="middle" width={90} tex={`(${x},${y})`} />
    </g>)}
    <SvgMath x={525} y={335} width={45} tex="x_1" /><SvgMath x={140} y={45} width={45} tex="x_2" />
  </Diagram>;
}

export function FruitLayerExperiment() {
  return <figure><FruitClassifier formula={<MathFormula display tex={String.raw`\mathbf{z}=W\mathbf{x}+\mathbf{b},\quad p_i=\frac{e^{z_i}}{\sum_j e^{z_j}}`} />} /><figcaption>Experiment 7-C. Four affine scores followed by Softmax give a fruit probability distribution. Increase size and water content to favour watermelon. This separate four-class example uses apple, banana, watermelon and lemon.</figcaption></figure>;
}

export function DenseNetwork() {
  const layers = [{ x: 105, ys: [90, 175, 260] }, { x: 320, ys: [65, 135, 205, 275] }, { x: 535, ys: [125, 225] }];
  return <Diagram label="Three inputs, four hidden neurons and two output neurons" height={360} caption="Figure 7-6. A fully connected network with three inputs, one hidden layer of four neurons and two output neurons. Connections represent weights. Hidden neurons apply $f(W\mathbf{x}+\mathbf{b})$; the output activation depends on the task.">
    {layers.slice(0, -1).flatMap((layer, i) => layer.ys.flatMap((y, j) => layers[i + 1].ys.map((ny, k) => <line key={`${i}-${j}-${k}`} x1={layer.x + 23} y1={y} x2={layers[i + 1].x - 23} y2={ny} stroke="#d4d4d4" />)))}
    {layers.map((layer, i) => <g key={i}>
      <text x={layer.x} y="25" textAnchor="middle" fontSize="14" fill="#525252">{["Inputs (3)", "Hidden layer (4)", "Outputs (2)"][i]}</text>
      {layer.ys.map((y, j) => <g key={j}>
        <circle cx={layer.x} cy={y} r="23" fill="white" stroke={i === 1 ? "var(--accent)" : "#a3a3a3"} strokeWidth="1.5" />
        <SvgMath x={layer.x} y={y + 7} width={60} anchor="middle" tex={i === 0 ? `x_${j + 1}` : i === 1 ? "f" : `y_${j + 1}`} />
      </g>)}
    </g>)}
    <SvgMath x={320} y={340} width={450} anchor="middle" tex={String.raw`\mathbf{h}=f(W_1\mathbf{x}+\mathbf{b}_1),\quad\mathbf{y}=g(W_2\mathbf{h}+\mathbf{b}_2)`} />
  </Diagram>;
}
