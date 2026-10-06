"use client";

import { useState, type ReactNode } from "react";
import { sigmoid } from "@/data/neuron-lesson";
import { advanceBackprop, backpropStages, backpropStepLimit, initialBackpropRun, initialBackpropWeights, tinyNetwork } from "@/data/backprop-lesson";

const buttonClass = "border border-neutral-300 px-3 py-2 text-sm hover:border-[var(--accent)] focus-visible:outline-2 focus-visible:outline-[var(--accent)] disabled:opacity-40";
const weightNames = ["Input weight 1", "Input weight 2", "Output weight 1", "Output weight 2"];
const tableClass = "min-w-[440px] w-full text-left text-sm [&_th]:px-3 [&_th]:py-2 [&_th]:font-medium [&_td]:px-3 [&_td]:py-2 [&_tr]:border-b [&_tr]:border-neutral-200";

function Readout({ values }: { values: { label: string; value: number; digits?: number }[] }) {
  return <div className="my-5 grid gap-3 text-sm sm:grid-cols-2" aria-live="polite">{values.map(({ label, value, digits = 4 }) => <p key={label}>{label}: <output>{value.toFixed(digits)}</output></p>)}</div>;
}

export function NeuronBackpropExplorer({ formula }: { formula: ReactNode }) {
  const [colour, setColour] = useState(0.7);
  const [apple, setApple] = useState(true);
  const z = 4 * colour - 2, p = sigmoid(z), y = apple ? 1 : 0;
  const loss = Math.max(z, 0) - y*z + Math.log1p(Math.exp(-Math.abs(z)));
  const dp = -y/p+(1-y)/(1-p), dz = p-y;
  return <div className="border-y border-neutral-200 py-6">
    <fieldset className="flex flex-wrap gap-5 text-sm"><legend className="mb-3 font-medium">True label</legend>{[{ name: "Apple", value: true }, { name: "Not apple", value: false }].map(item => <label key={item.name} className="flex items-center gap-2"><input type="radio" name="backprop-apple-label" checked={apple===item.value} onChange={()=>setApple(item.value)} className="accent-[var(--accent)]" />{item.name}</label>)}</fieldset>
    <label htmlFor="backprop-colour" className="mt-5 flex justify-between gap-3 text-sm">Colour <output>{colour.toFixed(2)}</output></label>
    <input id="backprop-colour" type="range" min="0" max="1" step="0.01" value={colour} onChange={e=>setColour(Number(e.target.value))} className="my-3 block w-full accent-[var(--accent)]" />
    <p className="text-sm">Fixed weight 4, fixed bias −2. This experiment calculates gradients without updating parameters.</p>
    <Readout values={[{label:"Forward score",value:z},{label:"Apple probability",value:p},{label:"Loss",value:loss},{label:"Loss derivative with respect to probability",value:dp},{label:"Sigmoid derivative",value:p*(1-p)},{label:"Score gradient",value:dz},{label:"Weight gradient",value:dz*colour},{label:"Bias gradient",value:dz}]} />
    <div className="overflow-x-auto">{formula}</div>
    <button type="button" onClick={()=>{setColour(.7);setApple(true);}} className={`${buttonClass} mt-5`}>Reset neuron example</button>
  </div>;
}

export function TinyBackpropExplorer({ formulas, structure }: { formulas: ReactNode[]; structure: ReactNode }) {
  const [stage, setStage] = useState(0);
  const [inputs, setInputs] = useState([.9,.8]);
  const [target, setTarget] = useState(0);
  const [rate, setRate] = useState(.1);
  const [history, setHistory] = useState(()=>initialBackpropRun(initialBackpropWeights, [.9,.8], 0));
  const current = history[history.length-1];
  const result = tinyNetwork(current.weights, inputs, target);
  const proposed = current.weights.map((w,i)=>w-rate*result.gradients[i]);
  const proposedLoss = tinyNetwork(proposed,inputs,target).loss;
  function changeInputs(index: number, value: number) {
    const next = inputs.map((x,i)=>index===i?value:x);
    setInputs(next);setHistory(initialBackpropRun(current.weights,next,target));
  }
  function changeTarget(value: number) {setTarget(value);setHistory(initialBackpropRun(current.weights,inputs,value));}
  function changeWeight(index: number, value: number) {
    const weights = current.weights.map((w,i)=>index===i?value:w);
    setHistory(initialBackpropRun(weights,inputs,target));
  }
  const lossScale = Math.max(.8,...history.map(row=>row.loss));
  const path = history.map(row=>`${row.step ? "L":"M"}${(60+row.step*5.1).toFixed(2)} ${(255-row.loss/lossScale*200).toFixed(2)}`).join(" ");
  return <div className="border-y border-neutral-200 py-6">
    <div className="flex flex-wrap gap-2" role="group" aria-label="Case study stages">{backpropStages.map((label,i)=><button key={label} type="button" aria-pressed={stage===i} onClick={()=>setStage(i)} className={`${buttonClass} ${stage===i?"border-[var(--accent)] text-[var(--accent)]":""}`}>{i+1}. {label}</button>)}</div>
    <fieldset className="mt-5 flex flex-wrap gap-5 text-sm"><legend className="mb-3 font-medium">True class</legend>{["Watermelon","Not watermelon"].map((name,i)=><label key={name} className="flex items-center gap-2"><input type="radio" name="tiny-backprop-label" checked={target===i} onChange={()=>changeTarget(i)} className="accent-[var(--accent)]" />{name}</label>)}</fieldset>
    <div className="mt-5 grid gap-5 sm:grid-cols-2">{["Colour depth", "Size"].map((label,i)=><div key={label}><label htmlFor={`tiny-input-${i}`} className="flex justify-between gap-2 text-sm">{label}<output>{inputs[i].toFixed(2)}</output></label><input id={`tiny-input-${i}`} type="range" min="0" max="1" step="0.01" value={inputs[i]} onChange={e=>changeInputs(i,Number(e.target.value))} className="mt-3 block w-full accent-[var(--accent)]" /></div>)}</div>
    <details className="mt-5"><summary>Adjust the four weights manually</summary><div className="mt-4 grid gap-5 sm:grid-cols-2">{weightNames.map((label,i)=><div key={label}><label htmlFor={`tiny-weight-${i}`} className="flex justify-between gap-2 text-sm">{label}<output>{current.weights[i].toFixed(4)}</output></label><input id={`tiny-weight-${i}`} type="range" min={Math.min(-4,current.weights[i])} max={Math.max(4,current.weights[i])} step="any" value={current.weights[i]} onChange={e=>changeWeight(i,Number(e.target.value))} className="mt-3 block w-full accent-[var(--accent)]" /></div>)}</div></details>
    <section aria-label={backpropStages[stage]} className="mt-6">
      <h3 className="text-lg font-medium text-neutral-800">{stage+1}. {backpropStages[stage]}</h3>
      <div className="my-5 overflow-x-auto">{formulas[stage]}</div>
      {stage===0 && <><p className="text-sm leading-7">Two input features feed one Sigmoid hidden unit, which feeds two class scores. There are four weights and no biases. This is a computation demonstration for one selected example.</p>{structure}</>}
      {stage===1 && <Readout values={[{label:"Hidden score",value:result.z},{label:"Hidden activation",value:result.h},{label:"Watermelon logit",value:result.logits[0]},{label:"Not watermelon logit",value:result.logits[1]}]} />}
      {stage===2 && <Readout values={[{label:"Watermelon probability",value:result.probabilities[0]},{label:"Not watermelon probability",value:result.probabilities[1]},{label:"Probability sum",value:result.probabilities[0]+result.probabilities[1]},{label:"Cross-entropy loss",value:result.loss}]} />}
      {stage===3 && <><Readout values={[{label:"A · Watermelon score gradient",value:result.outputGradients[0]},{label:"A · Not watermelon score gradient",value:result.outputGradients[1]},{label:"B · Hidden gradient (sum of both paths)",value:result.hiddenGradient},{label:"C · Sigmoid local derivative",value:result.sigmoidDerivative},{label:"D · Hidden score gradient",value:result.hiddenScoreGradient}]} /><div className="overflow-x-auto"><table className={tableClass}><thead><tr><th scope="col">E · Parameter</th><th scope="col">Gradient</th></tr></thead><tbody>{weightNames.map((name,i)=><tr key={name}><th scope="row">{name}</th><td>{result.gradients[i].toFixed(6)}</td></tr>)}</tbody></table></div></>}
      {(stage===4 || stage===5) && <>
        <label htmlFor="backprop-learning-rate" className="mt-4 flex justify-between gap-3 text-sm">Learning rate <output>{rate.toFixed(3)}</output></label><input id="backprop-learning-rate" type="range" min="0.001" max="0.5" step="0.001" value={rate} onChange={e=>setRate(Number(e.target.value))} className="my-3 block w-full accent-[var(--accent)]" />
        <Readout values={[{label:"Current loss",value:result.loss},{label:"Proposed next loss",value:proposedLoss},{label:"Completed updates",value:current.step,digits:0}]} />
        {stage===4 && <div className="overflow-x-auto"><table className={tableClass}><thead><tr><th scope="col">Parameter</th><th scope="col">Current</th><th scope="col">Proposed</th></tr></thead><tbody>{weightNames.map((name,i)=><tr key={name}><th scope="row">{name}</th><td>{current.weights[i].toFixed(4)}</td><td>{proposed[i].toFixed(4)}</td></tr>)}</tbody></table></div>}
        <div className="mt-5 flex flex-wrap gap-2"><button type="button" disabled={current.step>=backpropStepLimit} onClick={()=>setHistory(old=>advanceBackprop(old,inputs,target,rate))} className={buttonClass}>Apply one update</button>{stage===5 && <button type="button" disabled={current.step>=backpropStepLimit} onClick={()=>setHistory(old=>advanceBackprop(old,inputs,target,rate,10))} className={buttonClass}>Train 10 steps</button>}</div>
        {stage===5 && <div className="mt-5 overflow-x-auto" role="region" tabIndex={0} aria-label="Selected example loss history; scroll horizontally on small screens"><svg viewBox="0 0 640 320" className="min-w-[560px] w-full" role="img" aria-label="Loss history for repeated updates on the selected example"><path d="M60 40 V255 H580" fill="none" stroke="#a3a3a3"/><path d={path} fill="none" stroke="var(--accent)" strokeWidth="2.5"/><circle cx={60+current.step*5.1} cy={255-current.loss/lossScale*200} r="4" fill="var(--accent)"/>{[0,.5,1].map(f=><text key={f} x="50" y={259-f*200} textAnchor="end" fontSize="13" fill="#737373">{(f*lossScale).toFixed(2)}</text>)}{[0,25,50,75,100].map(s=><text key={s} x={60+s*5.1} y="280" textAnchor="middle" fontSize="13" fill="#737373">{s}</text>)}<text x="65" y="25" fontSize="14" fill="#525252">Selected-example loss</text><text x="320" y="310" textAnchor="middle" fontSize="14" fill="#525252">Parameter updates</text></svg></div>}
        {current.step>=backpropStepLimit && <p role="status" className="mt-4 text-sm">Reached 100 updates. Reset to try another run.</p>}
      </>}
    </section>
    <p className="mt-5 text-sm text-neutral-500">Editing an input, label or weight starts a new loss history at the current weights. All updates train only the selected example.</p>
    <button type="button" onClick={()=>{setInputs([.9,.8]);setTarget(0);setRate(.1);setHistory(initialBackpropRun(initialBackpropWeights,[.9,.8],0));}} className={`${buttonClass} mt-5`}>Reset network example</button>
  </div>;
}
