import type { ReactNode } from "react";
import MathFormula, { SvgMath } from "./Math";
import TrainingExplorer from "./TrainingExplorer";

function Diagram({ label, caption, height = 350, children }: { label: string; caption: string; height?: number; children: ReactNode }) {
  return <figure><div className="overflow-x-auto" tabIndex={0} role="region" aria-label={`${label}; scroll horizontally on small screens`}><svg viewBox={`0 0 640 ${height}`} className="min-w-[560px] w-full" role="img" aria-label={label}>{children}</svg></div><figcaption>{caption}</figcaption></figure>;
}

export function OvershootFigure() {
  const px = (w: number) => 65 + w*39;
  const py = (l: number) => 280-l*2.3;
  const curve = Array.from({ length: 141 }, (_,i) => { const w=i/10;return `${i ? "L" : "M"}${px(w).toFixed(2)} ${py(1.5*(w-4.5)**2).toFixed(2)}`; }).join(" ");
  return <Diagram label="A gradient step overshoots the minimum and increases the loss" caption="Figure 12-1. With learning rate one, the weight jumps from 0.5 to 12.5. The initial direction is downhill, but the step passes the minimum and raises the loss from 24 to 96.">
    <defs><clipPath id="optimiser-valley-clip"><rect x="65" y="30" width="550" height="250" /></clipPath><marker id="optimiser-step-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10z" fill="#737373" /></marker></defs>
    <path d="M65 30 V280 H615" fill="none" stroke="#a3a3a3" /><path d={curve} clipPath="url(#optimiser-valley-clip)" fill="none" stroke="var(--accent)" strokeWidth="2.5" />
    {[{w:0.5,l:24},{w:4.5,l:0},{w:12.5,l:96}].map(({w,l}) => <g key={w}><circle cx={px(w)} cy={py(l)} r="4" fill="var(--accent)" /><text x={px(w)} y="305" textAnchor="middle" fontSize="13" fill="#525252">{w}</text></g>)}
    <path d={`M${px(.5)+5} ${py(24)-10} L${px(12.5)-5} ${py(96)+10}`} fill="none" stroke="#737373" strokeDasharray="5 4" markerEnd="url(#optimiser-step-arrow)" />
    <text x="95" y="210" fontSize="14" fill="#525252">Start: loss 24</text><text x="400" y="20" fontSize="14" fill="#525252">After update: loss 96</text>
    <text x="70" y="20" fontSize="14" fill="#525252">Loss</text>
    <SvgMath x={245} y={85} width={220} tex={String.raw`L(w)=1.5(w-4.5)^2`} />
    <text x="320" y="335" textAnchor="middle" fontSize="14" fill="#525252">Weight</text>
  </Diagram>;
}

export function LearningRateFigure() {
  return <Diagram label="Three learning rates on the same quadratic loss" height={300} caption="Figure 12-2. The same quadratic and starting point: 0.03 improves slowly, 0.3 converges quickly, and 2/3 repeatedly overshoots with unchanged loss. This illustration uses a fixed loss scale in all three panels.">
    {[{a:.03,label:"Small: 0.03"},{a:.3,label:"Suitable here: 0.3"},{a:2/3,label:"Too large: 2/3"}].map(({a,label},i)=>{
      const left=45+i*200;
      const points=Array.from({length:21},(_,step)=>{const loss=24*(1-3*a)**(2*step);return `${left+step*7.5},${230-loss*6}`;}).join(" ");
      return <g key={i}><text x={left+75} y="40" textAnchor="middle" fontSize="14" fill="#525252">{label}</text><path d={`M${left} 65 V230 H${left+155}`} fill="none" stroke="#a3a3a3"/><polyline points={points} fill="none" stroke="var(--accent)" strokeWidth="2"/><text x={left-7} y="91" textAnchor="end" fontSize="12" fill="#737373">24</text><text x={left} y="250" fontSize="12" fill="#737373">0</text><text x={left+150} y="250" textAnchor="end" fontSize="12" fill="#737373">20</text></g>;
    })}
    <text x="320" y="285" textAnchor="middle" fontSize="13" fill="#737373">Loss against update number · oscillating weights can have constant loss</text>
  </Diagram>;
}

export function BatchPathsFigure() {
  function trajectory(noisy: boolean) {
    let x=-1.7,y=1.7;
    const points=[[x,y]];
    for(let i=0;i<25;i++) { x-=.12*(12*x+(noisy ? .9*Math.sin(i*2.1):0)); y-=.12*(y+(noisy ? .9*Math.cos(i*1.7):0));points.push([x,y]); }
    return points;
  }
  const project=([x,y]:number[])=>`${320+x*140},${190-y*80}`;
  return <Diagram label="Exact-gradient and perturbed-gradient trajectories in a narrow quadratic valley" height={360} caption="Figure 12-3. On a narrow quadratic valley, exact gradients give a repeatable path. Adding a fixed illustrative perturbation makes the path fluctuate. The dashed path demonstrates noise; it is not a sampled dataset run or evidence that noise finds a better minimum.">
    {[.25,.6,1,1.4,1.8].map(r=><ellipse key={r} cx="320" cy="190" rx={r*140/Math.sqrt(12)} ry={r*80} fill="none" stroke="#e5e5e5" />)}
    <polyline points={trajectory(false).map(project).join(" ")} fill="none" stroke="var(--accent)" strokeWidth="2" />
    <polyline points={trajectory(true).map(project).join(" ")} fill="none" stroke="#737373" strokeWidth="2" strokeDasharray="5 4" />
    <circle cx="320" cy="190" r="4" fill="#262626"/><text x="335" y="207" fontSize="13" fill="#525252">Minimum</text>
    <text x="55" y="28" fontSize="14" fill="var(--accent)">Solid: exact gradient</text><text x="335" y="28" fontSize="14" fill="#737373">Dashed: perturbed gradient</text>
    <SvgMath x={320} y={340} anchor="middle" width={300} tex={String.raw`L(u,v)=\tfrac12(12u^2+v^2)`} />
  </Diagram>;
}

export function FruitTrainingExperiment() {
  return <figure><TrainingExplorer formula={<MathFormula display tex={String.raw`z=wx+b,\quad p=\sigma(z)=\operatorname{softmax}([z,0])_1`} />} />
    <figcaption>Experiment 12-A. Train a binary classifier using colour alone and eight labelled examples. Each step calculates both gradients on all eight examples, then updates weight and bias together. This small experiment uses full-batch gradient descent, not mini-batch sampling; automatic training pauses at 100 updates.</figcaption></figure>;
}
