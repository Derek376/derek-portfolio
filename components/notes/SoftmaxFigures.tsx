import MathFormula, { SvgMath } from "./Math";
import { FruitClassifier } from "./NeuronExplorers";
import SoftmaxExplorer from "./SoftmaxExplorer";
import { softmax } from "@/data/neuron-lesson";
import { exampleClasses, exampleLogits } from "@/data/softmax-lesson";

export function ExponentialCurve() {
  const px = (x: number) => 70 + (x + 3) * 96;
  const py = (y: number) => 285 - y * 30;
  const curve = Array.from({ length: 201 }, (_, i) => { const x = -3 + i * 5 / 200; return `${i === 0 ? "M" : "L"}${px(x).toFixed(2)} ${py(Math.exp(x)).toFixed(2)}`; }).join(" ");
  return <figure><div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Exponential curve; scroll horizontally on small screens">
    <svg viewBox="0 0 640 350" className="min-w-[560px] w-full" role="img" aria-label="Exponential function is positive and increasing for all finite real inputs">
      <path d={`M70 285 H570 M${px(0)} 35 V295`} fill="none" stroke="#a3a3a3" />
      {[-3, -2, -1, 0, 1, 2].map(x => <text key={x} x={px(x)} y="310" textAnchor="middle" fontSize="13" fill="#737373">{x}</text>)}
      {[1, 2, 4, 6, 8].map(y => <g key={y}><line x1={px(0)-4} x2={px(0)} y1={py(y)} y2={py(y)} stroke="#a3a3a3" /><text x={px(0)-10} y={py(y)+4} textAnchor="end" fontSize="13" fill="#737373">{y}</text></g>)}
      <path d={curve} fill="none" stroke="var(--accent)" strokeWidth="2.5" />
      <circle cx={px(0)} cy={py(1)} r="4" fill="var(--accent)" />
      <SvgMath x={155} y={75} width={180} tex={String.raw`y=e^x>0`} color="var(--accent)" />
      <text x="580" y="290" fontSize="14" fill="#737373">x</text>
    </svg>
  </div><figcaption>Figure 11-1. Exponentiation makes negative scores positive while preserving their ordering. The curve approaches zero towards the left, but never reaches it for a finite real input in exact arithmetic.</figcaption></figure>;
}

export function SoftmaxCalculation() {
  const total = exampleLogits.reduce((s, z) => s + Math.exp(z), 0);
  const probabilities = softmax(exampleLogits);
  return <figure><div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Softmax calculation table; scroll horizontally on small screens">
    <table className="min-w-[500px] w-full text-left text-sm [&_th]:px-3 [&_th]:py-3 [&_th]:font-medium [&_td]:px-3 [&_td]:py-3 [&_tr]:border-b [&_tr]:border-neutral-200">
      <thead><tr><th scope="col">Class</th><th scope="col">Logit</th><th scope="col"><MathFormula tex="e^{z_i}" /></th><th scope="col">Probability</th></tr></thead>
      <tbody>{exampleClasses.map((name, i) => <tr key={name}><th scope="row">{name}</th><td>{exampleLogits[i].toFixed(1)}</td><td>{Math.exp(exampleLogits[i]).toFixed(3)}</td><td>{probabilities[i].toFixed(3)}</td></tr>)}</tbody>
      <tfoot><tr><th scope="row">Sum</th><td>3.4</td><td>{total.toFixed(3)}</td><td>{probabilities.reduce((s,p) => s+p,0).toFixed(3)}</td></tr></tfoot>
    </table>
  </div><figcaption>Figure 11-2. From raw scores to exponentials to normalised probabilities. Calculations use full precision; displayed values are rounded.</figcaption></figure>;
}

export function SoftmaxFruitExperiment() {
  return <figure><FruitClassifier formula={<MathFormula display tex={String.raw`p_i=\frac{e^{z_i}}{\sum_j e^{z_j}},\qquad\sum_i p_i=1`} />} />
    <figcaption>Experiment 11-A. Four scoring units, one probability distribution. Increase size and water content to favour watermelon. The classifier uses illustrative, fixed parameters; changing features changes predictions without training the model.</figcaption></figure>;
}

export function TemperatureComparison() {
  return <figure><div className="grid gap-7 border-y border-neutral-200 py-6 sm:grid-cols-3">
    {[0.5, 1, 2].map(t => { const probabilities = softmax(exampleLogits.map(z => z/t)); return <div key={t}>
      <p className="mb-4 text-sm font-medium">Temperature {t}</p>
      <div className="space-y-4">{exampleClasses.map((name, i) => <div key={name}>
        <div className="mb-2 flex justify-between gap-2 text-xs"><span>{name}</span><span>{(probabilities[i]*100).toFixed(1)}%</span></div>
        <div className="h-2 bg-neutral-100"><div className="h-full bg-[var(--accent)]" style={{ width: `${probabilities[i]*100}%` }} /></div>
      </div>)}</div>
    </div>; })}
  </div><figcaption>Figure 11-3. The same scores at three temperatures. Lower temperature sharpens the distribution; higher temperature flattens it. Temperature does not change which class has the largest score.</figcaption></figure>;
}

export function TemperatureExperiment() {
  return <figure><SoftmaxExplorer formula={<MathFormula display tex={String.raw`p_i(T)=\frac{e^{z_i/T}}{\sum_j e^{z_j/T}},\qquad T>0`} />} />
    <figcaption>Experiment 11-B. Adjust scores and temperature independently. Try giving all three classes the same score: the distribution stays uniform at every positive temperature.</figcaption></figure>;
}
