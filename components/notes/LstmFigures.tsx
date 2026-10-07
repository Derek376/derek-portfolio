import MathFormula, { SvgMath } from "./Math";
import LstmExplorer from "./LstmExplorer";

export function LstmStatePaths() {
  return (
    <figure>
      <div className="overflow-x-auto" role="region" tabIndex={0} aria-label="Cell state and hidden state paths in an LSTM; scroll horizontally on small screens">
        <svg viewBox="0 0 720 340" className="min-w-[640px] w-full" role="img" aria-label="LSTM carries a cell state and computes a gated hidden state at each step">
          <defs><marker id="lstm-path-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10Z" fill="var(--accent)" /></marker></defs>
          <text x={30} y={28} fontSize={14}>Cell-state carry path</text>
          <text x={30} y={211} fontSize={14}>Hidden-state path</text>
          <SvgMath x={40} y={86} tex="C_{t-1}" width={70} anchor="middle" />
          <SvgMath x={40} y={257} tex="h_{t-1}" width={70} anchor="middle" />
          {["Keep old", "Write new", "Updated cell"].map((label, index) => {
            const x = 120 + index * 185;
            return <g key={label}>
              <rect x={x} y={52} width={150} height={80} fill="var(--accent-soft)" stroke="var(--accent-border)" />
              <text x={x + 75} y={78} textAnchor="middle" fontSize={13}>{label}</text>
              <SvgMath x={x + 75} y={110} width={140} size={12} anchor="middle" tex={[String.raw`f_t\odot C_{t-1}`, String.raw`+\ i_t\odot g_t`, String.raw`C_t`][index]} />
              {index < 2 && <path d={`M${x + 155} 92H${x + 180}`} stroke="var(--accent)" markerEnd="url(#lstm-path-arrow)" />}
            </g>;
          })}
          <path d="M75 92H115 M645 92H682" stroke="var(--accent)" markerEnd="url(#lstm-path-arrow)" />
          <SvgMath x={695} y={86} tex="C_t" width={45} anchor="middle" />
          <path d="M570 137V200" stroke="var(--accent)" markerEnd="url(#lstm-path-arrow)" />
          <rect x={480} y={207} width={180} height={75} fill="#fafafa" stroke="#d4d4d4" />
          <SvgMath x={570} y={244} width={175} anchor="middle" size={13} tex={String.raw`h_t=o_t\odot\tanh(C_t)`} />
          <path d="M665 245H682" stroke="var(--accent)" markerEnd="url(#lstm-path-arrow)" />
          <SvgMath x={695} y={244} tex="h_t" width={45} anchor="middle" />
          <text x={115} y={245} fontSize={13}>Current input + previous hidden state</text>
          <text x={115} y={269} fontSize={12} fill="#737373">compute the gates and candidate</text>
          <path d="M75 251H105" stroke="#a3a3a3" />
          <text x={360} y={321} textAnchor="middle" fontSize={13} fill="#737373">Schematic: gates regulate the update; both states are passed to the next step.</text>
        </svg>
      </div>
      <figcaption>Figure 18-1. Two state paths: the additive cell update carries information forward; the output gate exposes a transformed view as the hidden state. “Long-term” and “short-term” are useful analogies, not guaranteed storage durations.</figcaption>
    </figure>
  );
}

export function TeachingGateValues() {
  return (
    <figure>
      <div className="overflow-x-auto" role="region" tabIndex={0} aria-label="Illustrative LSTM gate settings; scroll horizontally on small screens">
        <table className="min-w-[540px] w-full text-left text-sm [&_th]:px-3 [&_th]:py-3 [&_th]:font-medium [&_td]:px-3 [&_td]:py-3 [&_tr]:border-b [&_tr]:border-neutral-200">
          <thead><tr><th scope="col">Teaching event</th><th scope="col">Forget gate</th><th scope="col">Input gate</th><th scope="col">Candidate</th><th scope="col">Output gate</th></tr></thead>
          <tbody><tr><th scope="row">Fear of darkness</th><td>0.90</td><td>0.90</td><td>0.95</td><td>0.80</td></tr><tr><th scope="row">Later event</th><td>0.99</td><td>0.04</td><td>0.20</td><td>0.80</td></tr><tr><th scope="row">Later event, writes disabled</th><td>0.99</td><td>0</td><td>0.20</td><td>0.80</td></tr></tbody>
        </table>
      </div>
      <figcaption>Figure 18-2. Fixed values used in the experiment. Real gates are learned vectors, not manual judgments of whether an event matters. A small input gate can still inject information repeatedly.</figcaption>
    </figure>
  );
}

export function LstmMemoryExperiment() {
  return <figure><LstmExplorer formula={<MathFormula display tex={String.raw`C_t=f_tC_{t-1}+i_tg_t,\qquad h_t=o_t\tanh(C_t)`} />} /><figcaption>Experiment 18-A. Follow cell state, original-signal contribution and a contrasting RNN state separately. Disable later writes to isolate retention through the forget gate.</figcaption></figure>;
}
