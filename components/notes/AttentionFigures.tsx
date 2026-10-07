import MathFormula from "./Math";
import { AttentionCalculation, SentenceAttentionExplorer } from "./AttentionExplorers";
import { attentionRow, attentionWords } from "@/data/attention-lesson";

const tableClasses = "min-w-[520px] w-full text-left text-sm [&_th]:px-3 [&_th]:py-3 [&_th]:font-medium [&_td]:px-3 [&_td]:py-3 [&_tr]:border-b [&_tr]:border-neutral-200";

export function RecurrentBottleneck() {
  return <figure><div className="flex flex-wrap items-center gap-3 border-y border-neutral-200 py-6 text-sm">{["Earlier tokens", "Recurrent updates", "Current fixed-size state"].map((label, index) => <div key={label} className="flex items-center gap-3">{index > 0 && <span aria-hidden="true">→</span>}<span className="border border-neutral-200 px-3 py-3">{label}</span></div>)}</div><figcaption>Figure 19-1. A recurrent prediction carries history through a fixed-size state. Attention can additionally access stored representations at separate positions.</figcaption></figure>;
}

export function IllustrativeAttentionWeights() {
  const rows = [{word:"kitten",weight:.62},{word:"road",weight:.09},{word:"tired",weight:.13},{word:"other positions combined",weight:.16}];
  return <figure><div className="space-y-4 border-y border-neutral-200 py-6">{rows.map(row => <div key={row.word} className="space-y-2 text-sm"><div className="flex justify-between gap-3"><span>{row.word}</span><span>{Math.round(row.weight*100)}%</span></div><div className="h-2 bg-neutral-100"><div className="h-full bg-[var(--accent)]" style={{width:`${row.weight*100}%`}} /></div></div>)}</div><figcaption>Figure 19-2. An invented bidirectional weight row for “it”, summing to one. Larger weights select more value content; they do not establish a linguistic interpretation by themselves.</figcaption></figure>;
}

export function QueryKeyValueRoles() {
  const rows = [{role:"Query",tex:String.raw`Q=XW_Q`,detail:"The matching request"},{role:"Key",tex:String.raw`K=XW_K`,detail:"The representation used for matching"},{role:"Value",tex:String.raw`V=XW_V`,detail:"The content to combine"}];
  return <figure><div className="grid gap-5 border-y border-neutral-200 py-6 sm:grid-cols-3">{rows.map(row => <div key={row.role}><p className="text-sm font-medium">{row.role}</p><div className="my-3"><MathFormula tex={row.tex} /></div><p className="text-sm text-neutral-500">{row.detail}</p></div>)}</div><figcaption>Figure 19-3. Three learned projections from the same input representations. Keys determine matching scores; values supply the content used by the output.</figcaption></figure>;
}

export function AttentionPipeline() {
  return <figure><div className="border-y border-neutral-200 py-6"><p className="mb-4 text-sm font-medium">Score → scale → normalise each row → mix values</p><MathFormula display tex={String.raw`\operatorname{Attention}(Q,K,V)=\operatorname{softmax}_{\mathrm{row}}\!\left(\frac{QK^{\mathsf T}}{\sqrt{d_k}}\right)V`} /></div><figcaption>Figure 19-4. Scaled dot-product attention. An optional mask is added to the scaled scores before Softmax.</figcaption></figure>;
}

export function AttentionWeightMatrix() {
  return <figure><div className="overflow-x-auto" role="region" tabIndex={0} aria-label="Three by three calculated attention weight matrix; scroll horizontally on small screens"><table className={tableClasses}><thead><tr><th scope="col">Query ↓ / Key →</th>{attentionWords.map(entry=><th key={entry.word} scope="col">{entry.word}</th>)}</tr></thead><tbody>{attentionWords.map((entry,index)=><tr key={entry.word}><th scope="row">{entry.word}</th>{attentionRow(index).rows.map(row=><td key={row.word} className={index===2 ? "bg-[var(--accent-soft)]" : ""}>{(row.weight*100).toFixed(2)}%</td>)}</tr>)}</tbody></table></div><figcaption>Figure 19-5. The actual normalised weight matrix for the three-vector example, with “it” highlighted. This is the Softmax result, not the raw score matrix; rounded rows may not total exactly 100%.</figcaption></figure>;
}

export function QueryKeyGeometry() {
  const arrows=[{label:"q(it)",x:2,y:.2,dx:0,dy:-12},{label:"k(kitten)",x:1.2,y:0,dx:0,dy:25},{label:"k(tired)",x:0,y:1,dx:10,dy:0},{label:"k(it)",x:.1,y:0,dx:10,dy:-15}];
  return <figure><div className="overflow-x-auto" role="region" tabIndex={0} aria-label="Query and key vectors in a two-dimensional plane; scroll horizontally on small screens"><svg viewBox="0 0 620 310" className="min-w-[550px] w-full" role="img" aria-label="The query for it points mostly along the kitten key direction"><defs><marker id="attention-vector-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10Z" fill="var(--accent)" /></marker></defs><path d="M80 35V240H565" stroke="#a3a3a3" fill="none" />{arrows.map(a=><g key={a.label}><path d={`M80 240L${80+a.x*210} ${240-a.y*175}`} stroke="var(--accent)" strokeWidth={1.5} markerEnd="url(#attention-vector-arrow)" /><text x={80+a.x*210+a.dx} y={240-a.y*175+a.dy} fontSize={14}>{a.label}</text></g>)}<text x={300} y={295} textAnchor="middle" fontSize={13} fill="#737373">The dot product depends on both direction and length.</text></svg></div><figcaption>Figure 19-6. Hand-chosen two-dimensional Q/K vectors. The kitten and “it” keys are both parallel to the first axis; the longer kitten key produces the larger dot product.</figcaption></figure>;
}

export function ValueMixingFlow() {
  return <figure><div className="flex flex-wrap items-center gap-3 border-y border-neutral-200 py-6 text-sm"><span className="border border-neutral-200 px-3 py-3">Input representation</span><span aria-hidden="true">→</span><span className="border border-[var(--accent-border)] bg-[var(--accent-soft)] px-3 py-3">Weighted value mixture</span><span aria-hidden="true">→</span><span className="border border-neutral-200 px-3 py-3">Output projection + later layers</span></div><figcaption>Figure 19-7. The attention output carries selected value content. A full Transformer also uses residual connections and other operations; it does not simply discard every original representation.</figcaption></figure>;
}

export function AttentionArithmeticExperiment() {
  return <figure><AttentionCalculation formula={<MathFormula display tex={String.raw`\alpha_{ij}=\frac{e^{s_{ij}}}{\sum_\ell e^{s_{i\ell}}},\qquad \mathbf o_i=\sum_j\alpha_{ij}\mathbf v_j`} />} /><figcaption>Experiment 19-A. Recalculate scores, weights and the value mixture for any of the three query positions. Compare scaled scores and causal masking.</figcaption></figure>;
}

export function AttentionSentenceExperiment() {
  return <figure><SentenceAttentionExplorer /><figcaption>Experiment 19-B. Inspect manually chosen contextual rows and compare two sentence scenarios. The weights are calculated from preset scores, not learned from text.</figcaption></figure>;
}
