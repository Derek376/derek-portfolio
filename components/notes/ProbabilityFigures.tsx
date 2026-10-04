import type { ReactNode } from "react";
import { MathText, SvgMath } from "./Math";
import { nextWordProbabilities } from "@/data/probability-lesson";

function Diagram({ label, caption, height, children }: {
  label: string; caption: string; height: number; children: ReactNode;
}) {
  return <figure>
    <div className="overflow-x-auto" tabIndex={0} role="region" aria-label={`${label}; scroll horizontally on small screens`}>
      <svg viewBox={`0 0 640 ${height}`} className="min-w-[560px] w-full" role="img" aria-label={label}>{children}</svg>
    </div>
    <figcaption><MathText>{caption}</MathText></figcaption>
  </figure>;
}

export function NextWordDistribution() {
  return <Diagram label="Illustrative next-word probability distribution" height={330} caption="Figure 6-1. An illustrative distribution after ‘The weather today is …’. Each candidate has a non-negative probability, and the probabilities sum to one. ‘Other’ groups the remaining candidates.">
    {[0, 0.1, 0.2, 0.3, 0.4].map((p) => <g key={p}>
      <line x1="65" y1={265 - p * 500} x2="615" y2={265 - p * 500} stroke="#e5e5e5" />
      <text x="52" y={270 - p * 500} textAnchor="end" fontSize="12" fill="#737373">{Math.round(p * 100)}%</text>
    </g>)}
    <SvgMath x={65} y={28} width={220} tex={String.raw`P(\text{next word}\mid\text{context})`} />
    {nextWordProbabilities.map(({ label, probability }, i) => {
      const x = 80 + i * 88;
      return <g key={label}>
        <title>{`${label}: ${Math.round(probability * 100)}%`}</title>
        <rect x={x} y={265 - probability * 500} width="52" height={probability * 500} fill={label === "other" ? "#a3a3a3" : "var(--accent)"} fillOpacity="0.75" />
        <text x={x + 26} y={255 - probability * 500} textAnchor="middle" fontSize="13" fill="#525252">{Math.round(probability * 100)}%</text>
        <text x={x + 26} y="290" textAnchor="middle" fontSize="13" fill="#525252">{label}</text>
      </g>;
    })}
  </Diagram>;
}

export function InformationCurve() {
  const px = (p: number) => 65 + p * 510;
  const py = (bits: number) => 290 - bits * 38;
  // Stop at 1/64: zero probability has no finite information value.
  const curve = Array.from({ length: 201 }, (_, i) => {
    const p = 1 / 64 + (1 - 1 / 64) * i / 200;
    return `${i ? "L" : "M"}${px(p)},${py(-Math.log2(p))}`;
  }).join(" ");
  return <Diagram label="Information decreases as probability increases" height={365} caption="Figure 6-2. $I(x)=-\log_2 p(x)$, measured in bits. A certain event carries zero information; rarer events carry more. The curve continues upwards without bound as the probability approaches zero.">
    {[0, 1, 2, 3, 4, 5, 6].map((bits) => <g key={bits}>
      <line x1="65" y1={py(bits)} x2="575" y2={py(bits)} stroke="#e5e5e5" />
      <text x="50" y={py(bits) + 4} textAnchor="end" fontSize="12" fill="#737373">{bits}</text>
    </g>)}
    <path d="M65 52 V290 H585" fill="none" stroke="#a3a3a3" />
    {[0, 0.25, 0.5, 0.75, 1].map((p) => <text key={p} x={px(p)} y="313" textAnchor="middle" fontSize="12" fill="#737373">{p}</text>)}
    <path d={curve} fill="none" stroke="var(--accent)" strokeWidth="2.5" />
    <circle cx={px(0.5)} cy={py(1)} r="4" fill="var(--accent)" />
    <circle cx={px(1)} cy={py(0)} r="4" fill="var(--accent)" />
    <SvgMath x={px(0.5)} y={py(1) - 18} width={180} anchor="middle" tex={String.raw`p=0.5\;\to\;1\text{ bit}`} />
    <SvgMath x={565} y={255} width={125} anchor="end" tex={String.raw`p=1\;\to\;0`} />
    <SvgMath x={65} y={28} width={170} tex={String.raw`I(x)\;\text{(bits)}`} />
    <SvgMath x={330} y={350} width={200} anchor="middle" tex={String.raw`\text{Probability }p(x)`} />
    <text x="195" y="85" fontSize="13" fill="#525252">Rare means surprising</text>
  </Diagram>;
}

function CoinBars({ x, title, headProbability }: { x: number; title: string; headProbability: number }) {
  const probabilities = [headProbability, 1 - headProbability];
  const entropy = -probabilities.reduce((sum, p) => sum + p * Math.log2(p), 0);
  return <g>
    <text x={x + 120} y="30" textAnchor="middle" fontSize="15" fill="#262626">{title}</text>
    <line x1={x + 25} y1="220" x2={x + 215} y2="220" stroke="#a3a3a3" />
    {probabilities.map((p, i) => <g key={i}>
      <rect x={x + 55 + i * 75} y={220 - p * 165} width="48" height={p * 165} fill="var(--accent)" fillOpacity={i ? 0.45 : 0.8} />
      <text x={x + 79 + i * 75} y={210 - p * 165} textAnchor="middle" fontSize="13" fill="#525252">{p.toFixed(1)}</text>
      <text x={x + 79 + i * 75} y="244" textAnchor="middle" fontSize="13" fill="#525252">{i ? "Tails" : "Heads"}</text>
    </g>)}
    <SvgMath x={x + 120} y={285} width={230} anchor="middle" tex={`H=${entropy.toFixed(2)}\\;\\text{bits}`} />
  </g>;
}

export function CoinEntropy() {
  return <Diagram label="Entropy of a fair coin and a biased coin" height={315} caption="Figure 6-3. A fair coin has entropy $1$ bit. A coin with probabilities $0.9$ and $0.1$ has entropy about $0.47$ bits. For the same set of possible outcomes, a uniform distribution has the greatest entropy.">
    <line x1="320" y1="20" x2="320" y2="290" stroke="#e5e5e5" strokeDasharray="4 4" />
    <CoinBars x={40} title="Fair coin" headProbability={0.5} />
    <CoinBars x={360} title="Biased coin" headProbability={0.9} />
  </Diagram>;
}

export function OneHotCrossEntropy() {
  const labels = ["Cat", "Dog", "Bird"];
  return <Diagram label="One-hot target and model prediction for cross-entropy" height={360} caption="Figure 6-4. The target is one-hot: only the cat term has a non-zero weight. Cross-entropy therefore reduces to $-\ln q(\text{cat})=-\ln 0.7\approx0.36$ nats.">
    <line x1="320" y1="20" x2="320" y2="270" stroke="#e5e5e5" strokeDasharray="4 4" />
    {[{ x: 40, title: "Target (one-hot)", values: [1, 0, 0] }, { x: 360, title: "Model prediction", values: [0.7, 0.2, 0.1] }].map(({ x, title, values }) => <g key={title}>
      <text x={x + 120} y="30" textAnchor="middle" fontSize="15" fill="#262626">{title}</text>
      <line x1={x + 10} y1="220" x2={x + 230} y2="220" stroke="#a3a3a3" />
      {values.map((p, i) => <g key={labels[i]}>
        <rect x={x + 25 + i * 70} y={220 - p * 160} width="45" height={p * 160} fill="var(--accent)" fillOpacity={i ? 0.35 : 0.8} />
        <text x={x + 47.5 + i * 70} y={210 - p * 160} textAnchor="middle" fontSize="13" fill="#525252">{p.toFixed(1)}</text>
        <text x={x + 47.5 + i * 70} y="244" textAnchor="middle" fontSize="13" fill="#525252">{labels[i]}</text>
      </g>)}
    </g>)}
    <text x="480" y="280" textAnchor="middle" fontSize="13" fill="var(--accent)">Only the cat term contributes</text>
    <SvgMath x={320} y={330} width={420} anchor="middle" tex={String.raw`H(p,q)=-\ln q(\text{cat})\approx0.36\;\text{nats}`} />
  </Diagram>;
}
