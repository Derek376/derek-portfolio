import MathFormula, { SvgMath } from "./Math";
import { RnnGapExplorer, RnnStepExplorer } from "./RnnExplorer";
import { memoryAfterGap, rnnTokens } from "@/data/rnn-lesson";

export function UnrolledRnn() {
  return (
    <figure>
      <div className="overflow-x-auto" role="region" tabIndex={0} aria-label="RNN unrolled across five context tokens; scroll horizontally on small screens">
        <svg viewBox="0 0 760 290" className="min-w-[680px] w-full" role="img" aria-label="Shared recurrent cells pass hidden states forward before predicting the next token">
          <defs><marker id="rnn-state-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10Z" fill="var(--accent)" /></marker></defs>
          <SvgMath x={25} y={135} tex="h_0" width={40} anchor="middle" />
          <path d="M42 130H64" stroke="var(--accent)" markerEnd="url(#rnn-state-arrow)" />
          {rnnTokens.map((token, index) => {
            const x = 70 + index * 120;
            return <g key={token}>
              <text x={x + 40} y={42} textAnchor="middle" fontSize={13}>{token}</text>
              <path d={`M${x + 40} 54V91`} stroke="#a3a3a3" />
              <rect x={x} y={95} width={80} height={70} fill="var(--accent-soft)" stroke="var(--accent-border)" />
              <text x={x + 40} y={123} textAnchor="middle" fontSize={12}>Same cell</text>
              <SvgMath x={x + 40} y={146} tex={`h_${index + 1}`} width={50} anchor="middle" size={13} />
              <path d={`M${x + 85} 130H${x + 115}`} stroke="var(--accent)" markerEnd="url(#rnn-state-arrow)" />
            </g>;
          })}
          <rect x={670} y={95} width={75} height={70} fill="#fafafa" stroke="#d4d4d4" />
          <text x={708} y={120} textAnchor="middle" fontSize={12}>Output</text><text x={708} y={143} textAnchor="middle" fontSize={12}>Softmax</text>
          <text x={708} y={191} textAnchor="middle" fontSize={12}>Next token?</text>
          <text x={380} y={240} textAnchor="middle" fontSize={13} fill="#737373">The same weights are reused at every time step.</text>
          <text x={380} y={265} textAnchor="middle" fontSize={13} fill="#737373">Earlier information can flow through the state; it is not guaranteed to survive.</text>
        </svg>
      </div>
      <figcaption>Figure 17-1. Unroll the recurrent operation over time. After reading “because”, use the current state to predict the next token; the target “it” is not part of that input.</figcaption>
    </figure>
  );
}

export function RnnMemoryExperiment() {
  return (
    <figure>
      <RnnStepExplorer formula={<MathFormula display tex={String.raw`h_t=\tanh(0.6h_{t-1}+x_t),\qquad h_0=0`} />} />
      <figcaption>Experiment 17-A. Each click applies one recurrence. Only “kitten” supplies a nonzero input signal; previous and reset controls let you inspect the same deterministic sequence again.</figcaption>
    </figure>
  );
}

export function MemoryDecay() {
  return (
    <figure>
      <div className="overflow-x-auto" role="region" tabIndex={0} aria-label="Hidden state and gradient sensitivity over longer gaps; scroll horizontally on small screens">
        <table className="min-w-[560px] w-full text-left text-sm [&_th]:px-3 [&_th]:py-3 [&_th]:font-medium [&_td]:px-3 [&_td]:py-3 [&_tr]:border-b [&_tr]:border-neutral-200">
          <thead><tr><th scope="col">Zero-signal tokens</th><th scope="col">Hidden state</th><th scope="col">State fraction</th><th scope="col">Sensitivity</th></tr></thead>
          <tbody>{[0, 4, 5, 10, 20].map(gap => {
            const result = memoryAfterGap(gap);
            return <tr key={gap}><th scope="row">{gap}</th><td>{result.hidden.toPrecision(4)}</td><td>{(result.retained * 100).toPrecision(4)}%</td><td>{result.sensitivity.toPrecision(4)}</td></tr>;
          })}</tbody>
        </table>
      </div>
      <figcaption>Figure 17-2. State decay and derivative decay in this scalar example. The gap counts tokens after the initial “kitten”, not total tokens read. Neither quantity is universally determined by distance alone in a real RNN.</figcaption>
    </figure>
  );
}

export function RnnLongGapExperiment() {
  return (
    <figure>
      <RnnGapExplorer formula={<MathFormula display tex={String.raw`\frac{\partial h_{1+g}}{\partial h_1}=\prod_{j=2}^{1+g}0.6(1-h_j^2)\leq0.6^g`} />} />
      <figcaption>Experiment 17-B. Increase the gap and compare the forward state with its sensitivity to the initial state. At zero gap the empty derivative product is one.</figcaption>
    </figure>
  );
}
