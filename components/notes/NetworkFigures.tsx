import type { ReactNode } from "react";
import MathFormula, { MathText, SvgMath } from "./Math";
import { FruitClassifier } from "./NeuronExplorers";
import { networkParameterCounts, networkWidths } from "@/data/network-lesson";

function Diagram({ label, caption, height, children }: { label: string; caption: string; height: number; children: ReactNode }) {
  return <figure><div className="overflow-x-auto" tabIndex={0} role="region" aria-label={`${label}; scroll horizontally on small screens`}>
    <svg viewBox={`0 0 640 ${height}`} className="min-w-[560px] w-full" role="img" aria-label={label}>{children}</svg>
  </div><figcaption><MathText>{caption}</MathText></figcaption></figure>;
}

export function NetworkFruitExperiment() {
  return <figure><FruitClassifier formula={<MathFormula display tex={String.raw`\mathbf{z}=W\mathbf{x}+\mathbf{b},\quad\mathbf{p}=\operatorname{softmax}(\mathbf{z})`} />} />
    <figcaption>Experiment 9-A. Revisit one scoring layer: four fruit scores become a probability distribution through Softmax. Increase size and water content to favour watermelon. These illustrative parameters are fixed by hand; moving the inputs is inference, not training.</figcaption></figure>;
}

export function FullyConnectedNetwork() {
  const layers = networkWidths.map((width, i) => ({ x: 75 + i * 163, ys: Array.from({ length: width }, (_, j) => 90 + j * 58 + (5 - width) * 29) }));
  return <Diagram label="Fully connected network with widths four, five, five and four" height={460} caption="Figure 9-1. A fully connected classifier: four inputs, two hidden layers of five neurons each, and four class scores followed by Softmax. Connections represent weights; each non-input neuron also has a bias, omitted from the wiring for clarity.">
    {layers.slice(0, -1).flatMap((layer, i) => layer.ys.flatMap((y, j) => layers[i + 1].ys.map((nextY, k) => <line key={`${i}-${j}-${k}`} x1={layer.x + 17} y1={y} x2={layers[i + 1].x - 17} y2={nextY} stroke="#d4d4d4" />)))}
    {layers.map((layer, i) => <g key={i}>
      <text x={layer.x} y="30" textAnchor="middle" fontSize="13" fill="#525252">{["Input features", "Hidden layer", "Hidden layer", "Class scores"][i]}</text>
      <text x={layer.x} y="52" textAnchor="middle" fontSize="13" fill="#737373">{networkWidths[i]} units</text>
      {layer.ys.map((y, j) => <g key={j}>
        <circle cx={layer.x} cy={y} r="17" fill="white" stroke={i === 1 || i === 2 ? "var(--accent)" : "#a3a3a3"} strokeWidth="1.5" />
        <SvgMath x={layer.x} y={y + 5} anchor="middle" width={50} size={12} tex={i === 0 ? `x_${j + 1}` : i === 3 ? `z_${j + 1}` : "f"} />
      </g>)}
    </g>)}
    <SvgMath x={320} y={380} anchor="middle" width={380} tex={String.raw`\text{Hidden layers: }\mathbf{h}^{(l)}=f_l(W_l\mathbf{h}^{(l-1)}+\mathbf{b}_l)`} />
    <SvgMath x={320} y={425} anchor="middle" width={330} tex={String.raw`\text{Output: }\mathbf{p}=\operatorname{softmax}(\mathbf{z})`} />
  </Diagram>;
}

export function ParameterCount() {
  const total = networkParameterCounts.reduce((sum, layer) => sum + layer.weights + layer.biases, 0);
  return <div className="my-6 border-y border-neutral-200 py-5">
    <p className="mb-4 text-sm font-medium text-neutral-800">Count the learnable parameters</p>
    <div className="space-y-4">{networkParameterCounts.map((layer, i) => <div key={i} className="flex flex-wrap justify-between gap-2 text-sm">
      <span>Layer {i + 1}: {layer.inputs} inputs → {layer.outputs} outputs</span>
      <MathFormula tex={`${layer.outputs}\\times${layer.inputs}+${layer.biases}=${layer.weights + layer.biases}`} />
    </div>)}</div>
    <p className="mt-5 text-sm font-medium text-neutral-800">Total: {total} learnable parameters</p>
  </div>;
}

export function TrainingCycle() {
  const steps = [
    { x: 45, y: 85, title: "1 · Forward pass", detail: "Calculate predictions", tex: String.raw`\hat{\mathbf{y}}=F(\mathbf{x};\theta)` },
    { x: 365, y: 85, title: "2 · Loss", detail: "Measure prediction error", tex: String.raw`L(\hat{\mathbf{y}},\mathbf{y})` },
    { x: 365, y: 275, title: "3 · Gradients", detail: "Backpropagate the loss", tex: String.raw`\nabla_\theta L` },
    { x: 45, y: 275, title: "4 · Update", detail: "Take an optimiser step", tex: String.raw`\theta\leftarrow\theta-\eta\nabla_\theta L` },
  ];
  return <Diagram label="Forward pass, loss, gradients and parameter update in a repeating loop" height={460} caption="Figure 9-2. One gradient-based training iteration: use a batch to make predictions, calculate the loss, compute parameter gradients and update the parameters. Repeat with more batches. A suitable update may reduce the objective, but every individual batch loss need not decrease.">
    <defs><marker id="network-training-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10z" fill="var(--accent)" /></marker></defs>
    <text x="320" y="30" textAnchor="middle" fontSize="14" fill="#525252">A batch of examples with target labels</text>
    <path d="M145 45 V82" stroke="#a3a3a3" fill="none" />
    {['M275 140 H360', 'M480 195 V270', 'M365 330 H280', 'M160 275 V200'].map((d) => <path key={d} d={d} fill="none" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#network-training-arrow)" />)}
    {steps.map((step) => <g key={step.title}>
      <rect x={step.x} y={step.y} width="230" height="110" fill="white" stroke="#a3a3a3" />
      <text x={step.x + 115} y={step.y + 25} textAnchor="middle" fontSize="14" fill="#262626">{step.title}</text>
      <text x={step.x + 115} y={step.y + 50} textAnchor="middle" fontSize="12" fill="#737373">{step.detail}</text>
      <SvgMath x={step.x + 115} y={step.y + 86} anchor="middle" width={220} tex={step.tex} size={14} />
    </g>)}
    <text x="320" y="435" textAnchor="middle" fontSize="13" fill="#737373">Repeat · monitor training and held-out performance</text>
  </Diagram>;
}
