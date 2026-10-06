import MathFormula, { SvgMath } from "./Math";
import FeedforwardLmExplorer from "./FeedforwardLmExplorer";
import { astronomyWords, feedforwardPrediction } from "@/data/feedforward-lm-lesson";

export function FeedforwardLmArchitecture() {
  return (
    <figure>
      <div className="overflow-x-auto" role="region" tabIndex={0} aria-label="Embedding lookup, concatenation, hidden layer and Softmax; scroll horizontally on small screens">
        <svg viewBox="0 0 720 330" className="min-w-[640px] w-full" role="img" aria-label="A three-token feedforward language-model architecture">
          <defs><marker id="ffnn-lm-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#737373" /></marker></defs>
          <text x={90} y={30} textAnchor="middle" fontSize={14}>Recent tokens</text>
          <text x={260} y={30} textAnchor="middle" fontSize={14}>Embedding lookup</text>
          {["around", "black hole", "orbiting"].map((word, index) => (
            <g key={word}>
              <rect x={25} y={60 + index * 65} width={130} height={42} fill="#fafafa" stroke="#d4d4d4" />
              <text x={90} y={86 + index * 65} textAnchor="middle" fontSize={14}>{word}</text>
              <path d={`M160 ${81 + index * 65}H195`} stroke="#737373" markerEnd="url(#ffnn-lm-arrow)" />
              <rect x={200} y={60 + index * 65} width={120} height={42} fill="var(--accent-soft)" stroke="var(--accent-border)" />
              <SvgMath x={260} y={85 + index * 65} tex={`\\mathbf e_${index + 1}`} anchor="middle" width={80} />
              <path d={`M325 ${81 + index * 65}H350V146H375`} fill="none" stroke="#737373" />
            </g>
          ))}
          <rect x={380} y={105} width={100} height={82} fill="#fafafa" stroke="#d4d4d4" />
          <text x={430} y={133} textAnchor="middle" fontSize={13}>Concatenate</text>
          <SvgMath x={430} y={163} tex={String.raw`x\in\mathbb R^{3d}`} anchor="middle" width={95} size={12} />
          <path d="M485 146H515" stroke="#737373" markerEnd="url(#ffnn-lm-arrow)" />
          <rect x={520} y={105} width={160} height={82} fill="var(--accent-soft)" stroke="var(--accent-border)" />
          <text x={600} y={133} textAnchor="middle" fontSize={13}>Hidden layer</text>
          <SvgMath x={600} y={163} tex={String.raw`h=\tanh(Wx+b)`} anchor="middle" width={155} size={12} />
          <path d="M600 192V220" stroke="#737373" markerEnd="url(#ffnn-lm-arrow)" />
          <rect x={520} y={225} width={160} height={68} fill="#fafafa" stroke="#d4d4d4" />
          <text x={600} y={249} textAnchor="middle" fontSize={13}>Output scores + Softmax</text>
          <text x={600} y={277} textAnchor="middle" fontSize={12}>One probability per word</text>
          <text x={25} y={285} fontSize={13} fill="#737373">Fixed context window; shared embedding table and network.</text>
        </svg>
      </div>
      <figcaption>Figure 16-1. Look up the vectors, concatenate them in order, then predict a vocabulary distribution. This sketch uses three context tokens; the numerical experiment below uses two.</figcaption>
    </figure>
  );
}

export function FeedforwardLmExperiment() {
  return (
    <figure>
      <FeedforwardLmExplorer formula={<MathFormula display tex={String.raw`h=\tanh(1.5x_3-0.8),\qquad P(\mathrm{planet})=\frac{e^{2.5h}}{e^{2.5h}+1}`} />} />
      <figcaption>Experiment 16-A. Switch the second token to recompute every stage of the same tiny network. Values are calculated at full precision before being rounded for display.</figcaption>
    </figure>
  );
}

const tableClasses = "min-w-[540px] w-full text-left text-sm [&_th]:px-3 [&_th]:py-3 [&_th]:font-medium [&_td]:px-3 [&_td]:py-3 [&_tr]:border-b [&_tr]:border-neutral-200";

export function FeedforwardLmComparison() {
  return (
    <figure>
      <div className="overflow-x-auto" role="region" tabIndex={0} aria-label="Predictions for star, black hole and banana; scroll horizontally on small screens">
        <table className={tableClasses}>
          <thead><tr><th scope="col">Second token</th><th scope="col">First coordinate</th><th scope="col">Hidden value</th><th scope="col">Planet probability</th></tr></thead>
          <tbody>{astronomyWords.filter(entry => entry.word !== "rocket").map(entry => {
            const result = feedforwardPrediction(entry.vector);
            return <tr key={entry.word}><th scope="row">{entry.word}</th><td>{entry.vector[0].toFixed(2)}</td><td>{result.hidden.toFixed(4)}</td><td>{(result.planetProbability * 100).toFixed(1)}%</td></tr>;
          })}</tbody>
        </table>
      </div>
      <figcaption>Figure 16-2. Changing one embedding changes the prediction. “Star” and “black hole” produce similar probabilities in this hand-built network; the table and experiment use the same calculation.</figcaption>
    </figure>
  );
}

export function CountAndNeuralModels() {
  const rows = [
    ["Representation", "Separate token identifiers and counts", "Dense embeddings + shared parameters"],
    ["Unseen context", "Smoothing, backoff or interpolation", "Apply the same network to a new input"],
    ["Storage", "Observed N-grams and statistics", "Embedding table and network weights"],
    ["Training", "Count token windows; estimate probabilities", "Optimise a prediction loss with gradients"],
    ["Context", "N−1 preceding tokens", "K preceding tokens"],
  ];
  return (
    <figure>
      <div className="overflow-x-auto" role="region" tabIndex={0} aria-label="Comparison of count-based and feedforward language models; scroll horizontally on small screens">
        <table className={tableClasses}>
          <thead><tr><th scope="col">Property</th><th scope="col">N-gram model</th><th scope="col">Feedforward model</th></tr></thead>
          <tbody>{rows.map(([property, count, neural]) => <tr key={property}><th scope="row">{property}</th><td>{count}</td><td>{neural}</td></tr>)}</tbody>
        </table>
      </div>
      <figcaption>Figure 16-3. Both models use a fixed recent context. Neural parameter sharing helps address sparse combinations, but does not guarantee better accuracy or lower storage for every configuration.</figcaption>
    </figure>
  );
}
