import type { ReactNode } from "react";
import MathFormula, { SvgMath } from "./Math";
import LossExplorer from "./LossExplorer";

function Diagram({ label, caption, children, height = 320 }: { label: string; caption: string; children: ReactNode; height?: number }) {
  return <figure><div className="overflow-x-auto" tabIndex={0} role="region" aria-label={`${label}; scroll horizontally on small screens`}>
    <svg viewBox={`0 0 640 ${height}`} className="min-w-[560px] w-full" role="img" aria-label={label}>{children}</svg>
  </div><figcaption>{caption}</figcaption></figure>;
}

export function GuessingFeedback() {
  return <Diagram label="Guessing a hidden number: 50 is too low and 88 is too high" height={240} caption="Figure 10-1. A guessing game gives a direction: increase a guess that is too low, decrease one that is too high. A loss and its derivatives provide numerical feedback for learning.">
    <path d="M55 145 H585" stroke="#a3a3a3" />
    {[{ n: 1, x: 55 }, { n: 50, x: 317 }, { n: 73, x: 440 }, { n: 88, x: 520 }, { n: 100, x: 585 }].map(({ n, x }) => <g key={n}><line x1={x} x2={x} y1="140" y2="150" stroke="#a3a3a3" /><text x={x} y="175" textAnchor="middle" fontSize="14" fill="#737373">{n === 73 ? "?" : n}</text></g>)}
    <circle cx="440" cy="145" r="6" fill="var(--accent)" />
    <text x="320" y="35" textAnchor="middle" fontSize="15" fill="#262626">The target is hidden from the player</text>
    <path d="M317 85 H420 M420 85 L412 80 M420 85 L412 90 M520 115 H460 M460 115 L468 110 M460 115 L468 120" fill="none" stroke="var(--accent)" strokeWidth="2" />
    <text x="305" y="70" fontSize="14" fill="#525252">50: too low</text><text x="470" y="100" fontSize="14" fill="#525252">88: too high</text>
    <text x="320" y="215" textAnchor="middle" fontSize="13" fill="#737373">Feedback narrows the search instead of leaving each guess blind.</text>
  </Diagram>;
}

export function SquaredResiduals() {
  const points = [{ x: 100, y: 210 }, { x: 200, y: 150 }, { x: 300, y: 165 }, { x: 400, y: 75 }, { x: 500, y: 130 }];
  return <Diagram label="Observed points, a prediction line and squared residual areas" caption="Figure 10-2. Each vertical residual is the difference between an observed value and the line's prediction. A square with that residual as its side illustrates the squared error; larger errors contribute more to MSE.">
    <path d="M55 35 V270 H590" fill="none" stroke="#a3a3a3" />
    <text x="40" y="40" fontSize="14" fill="#737373">y</text><text x="595" y="275" fontSize="14" fill="#737373">x</text>
    <path d="M75 235 L555 91" fill="none" stroke="var(--accent)" strokeWidth="2" />
    {points.map(({ x, y }) => { const predictedY = 257.5 - 0.3 * x; const residual = Math.abs(y - predictedY); return <g key={x}>
      <rect x={x} y={Math.min(y, predictedY)} width={residual} height={residual} fill="#b45309" fillOpacity="0.08" stroke="#b45309" strokeOpacity="0.4" />
      <line x1={x} x2={x} y1={y} y2={predictedY} stroke="#b45309" strokeWidth="2" /><circle cx={x} cy={y} r="4" fill="#262626" />
    </g>; })}
    <text x="395" y="55" fontSize="14" fill="var(--accent)">Prediction line</text>
    <text x="320" y="310" textAnchor="middle" fontSize="13" fill="#737373">Squares illustrate error magnitude, not extra observations.</text>
  </Diagram>;
}

export function LossComparison() {
  const path = (f: (p: number) => number) => Array.from({ length: 240 }, (_, i) => { const p = 0.01 + i * 0.99 / 239; return `${i === 0 ? "M" : "L"}${(65 + p * 510).toFixed(2)} ${(270 - f(p) * 45).toFixed(2)}`; }).join(" ");
  return <Diagram label="Cross-entropy and squared error against probability of the correct class" height={360} caption="Figure 10-3. For a true label of one, squared error approaches one as the predicted probability approaches zero; negative log probability grows without bound. The graph starts at 0.01 because the logarithm is undefined at zero.">
    <path d="M65 35 V270 H585" fill="none" stroke="#a3a3a3" />
    {[0, 1, 2, 3, 4, 5].map(v => <g key={v}><text x="52" y={274 - v * 45} textAnchor="end" fontSize="13" fill="#737373">{v}</text><line x1="61" x2="65" y1={270 - v * 45} y2={270 - v * 45} stroke="#a3a3a3" /></g>)}
    <text x="70" y="24" fontSize="14" fill="#525252">Loss</text>
    <path d={path(p => -Math.log(p))} fill="none" stroke="var(--accent)" strokeWidth="2.5" />
    <path d={path(p => (1 - p) ** 2)} fill="none" stroke="#737373" strokeWidth="2" strokeDasharray="6 4" />
    <SvgMath x={380} y={80} width={200} tex={String.raw`L_{\mathrm{CE}}=-\ln p`} color="var(--accent)" />
    <SvgMath x={380} y={112} width={200} tex={String.raw`L_{\mathrm{MSE}}=(p-1)^2`} />
    {[0, 0.25, 0.5, 0.75, 1].map(p => <text key={p} x={65 + p * 510} y="290" textAnchor="middle" fontSize="13" fill="#737373">{p}</text>)}
    <text x="320" y="330" textAnchor="middle" fontSize="14" fill="#525252">Probability assigned to the correct class</text>
  </Diagram>;
}

export function CrossEntropyExperiment() {
  return <figure><LossExplorer formula={<MathFormula display tex={String.raw`p_c=\begin{cases}p&y=1\\1-p&y=0\end{cases},\qquad L=-\ln p_c`} />} />
    <figcaption>Experiment 10-A. Choose the true label and change the four input features. The dot follows negative log probability: confident correct predictions have low loss, confident wrong predictions have high loss. The toy classifier&apos;s weights stay fixed; this is a loss experiment, not an automatic training run.</figcaption></figure>;
}
