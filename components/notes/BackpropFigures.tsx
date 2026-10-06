import MathFormula, { SvgMath } from "./Math";
import { NeuronBackpropExplorer, TinyBackpropExplorer } from "./BackpropExplorers";

export function ComputationGraph() {
  const labels=["x",String.raw`z=wx+b`,String.raw`a=\operatorname{ReLU}(z)`,String.raw`L=(a-y)^2`];
  return <figure><div className="overflow-x-auto" role="region" tabIndex={0} aria-label="Forward and backward computation graph; scroll horizontally on small screens"><svg viewBox="0 0 640 270" className="min-w-[560px] w-full" role="img" aria-label="Forward pass computes x to z to a to loss; backward pass carries gradients in reverse">
    <defs><marker id="backprop-forward-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10z" fill="var(--accent)"/></marker><marker id="backprop-reverse-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10z" fill="#737373"/></marker></defs>
    {labels.map((tex,i)=><g key={tex}><rect x={35+i*150} y="80" width="120" height="65" fill="white" stroke="#a3a3a3"/><SvgMath x={95+i*150} y={120} anchor="middle" width={118} size={12} tex={tex}/></g>)}
    {[0,1,2].map(i=><g key={i}><path d={`M${157+i*150} 110 H${181+i*150}`} stroke="var(--accent)" markerEnd="url(#backprop-forward-arrow)"/><path d={`M${245+i*150} 170 H${95+i*150}`} stroke="#737373" markerEnd="url(#backprop-reverse-arrow)"/></g>)}
    <text x="320" y="40" textAnchor="middle" fontSize="14" fill="var(--accent)">Forward: compute and retain intermediate values →</text><text x="320" y="210" textAnchor="middle" fontSize="14" fill="#525252">← Backward: apply local derivatives, accumulate gradients</text>
  </svg></div><figcaption>Figure 13-1. The same computation graph is traversed forwards to calculate the loss, then backwards to calculate gradients. Saving intermediate values lets each operation reuse the inputs it needs.</figcaption></figure>;
}

export function WorkedBackprop() {
  return <figure><div className="space-y-5 border-y border-neutral-200 py-6">
    {[String.raw`x=2,\;w=1.5\;\Rightarrow\;z=wx=3\;\Rightarrow\;a=z^2=9\;\Rightarrow\;L=(a-6)^2=9`,String.raw`\frac{\partial L}{\partial a}=6,\quad\frac{\partial a}{\partial z}=6,\quad\frac{\partial z}{\partial w}=2`,String.raw`\frac{\partial L}{\partial w}=6\cdot6\cdot2=72`,String.raw`w_{\mathrm{new}}=1.5-0.001\cdot72=1.428,\quad L_{\mathrm{new}}\approx4.6515`].map(tex=><div key={tex} className="overflow-x-auto"><MathFormula display tex={tex}/></div>)}
  </div><figcaption>Figure 13-2. A numerical forward pass, the three local derivatives, their product, and one parameter update. The square activation is chosen for simple arithmetic, not as a recommendation for hidden layers.</figcaption></figure>;
}

export function NeuronGradientExperiment() {
  return <figure><NeuronBackpropExplorer formula={<MathFormula display tex={String.raw`\frac{\partial L}{\partial z}=\frac{\partial L}{\partial p}\frac{\partial p}{\partial z}=p-y,\quad\frac{\partial L}{\partial w}=(p-y)x,\quad\frac{\partial L}{\partial b}=p-y`}/>} />
    <figcaption>Experiment 13-A. Change the colour or true label and follow the loss through Sigmoid to the weight and bias gradients. These are the per-example contributions averaged by Lesson 12&apos;s training experiment.</figcaption></figure>;
}

function TinyNetworkStructure() {
  return <div className="my-5 overflow-x-auto" role="region" tabIndex={0} aria-label="Two-input one-hidden-unit two-output network; scroll horizontally on small screens"><svg viewBox="0 0 640 280" className="min-w-[560px] w-full" role="img" aria-label="Colour and size connect to one Sigmoid hidden unit and then two class scores">
    <path d="M117 70 L285 140 M117 210 L285 140 M335 140 L503 70 M335 140 L503 210" fill="none" stroke="#a3a3a3" strokeWidth="1.5"/>
    {[{x:100,y:70,tex:"x_1"},{x:100,y:210,tex:"x_2"},{x:310,y:140,tex:"h"},{x:520,y:70,tex:"o_1"},{x:520,y:210,tex:"o_2"}].map(node=><g key={node.tex}><circle cx={node.x} cy={node.y} r="24" fill="white" stroke="var(--accent)"/><SvgMath x={node.x} y={node.y+5} anchor="middle" width={45} tex={node.tex}/></g>)}
    {[{x:200,y:78,tex:"w_1"},{x:200,y:210,tex:"w_2"},{x:425,y:78,tex:"v_1"},{x:425,y:210,tex:"v_2"}].map(label=><SvgMath key={label.tex} x={label.x} y={label.y} width={40} tex={label.tex}/>)}
    <text x="100" y="30" textAnchor="middle" fontSize="13" fill="#525252">Colour</text><text x="100" y="260" textAnchor="middle" fontSize="13" fill="#525252">Size</text><text x="310" y="190" textAnchor="middle" fontSize="13" fill="#525252">Sigmoid</text><text x="520" y="30" textAnchor="middle" fontSize="13" fill="#525252">Watermelon score</text><text x="520" y="260" textAnchor="middle" fontSize="13" fill="#525252">Not watermelon score</text>
  </svg></div>;
}

export function FullBackpropExperiment() {
  const formulas=[String.raw`[x_1,x_2]\longrightarrow h\longrightarrow[o_1,o_2]\longrightarrow\mathbf p\longrightarrow L`,String.raw`z=w_1x_1+w_2x_2,\quad h=\sigma(z),\quad o_i=v_i h`,String.raw`p_i=\frac{e^{o_i}}{e^{o_1}+e^{o_2}},\quad L=-\ln p_c`,String.raw`\delta_i=p_i-y_i,\quad g_h=\sum_i v_i\delta_i,\quad g_z=g_hh(1-h)`,String.raw`w_j\leftarrow w_j-\alpha g_zx_j,\quad v_i\leftarrow v_i-\alpha\delta_i h`,String.raw`\text{Repeat: forward}\to\text{loss}\to\text{backward}\to\text{update}`];
  return <figure><TinyBackpropExplorer formulas={formulas.map(tex=><MathFormula key={tex} display tex={tex}/>)} structure={<TinyNetworkStructure/>}/><figcaption>Experiment 13-B. Six stages expose the forward values, Softmax loss, both output branches, all four weight gradients and simultaneous updates. Training repeats one selected example; it does not demonstrate a general-purpose fruit classifier.</figcaption></figure>;
}
