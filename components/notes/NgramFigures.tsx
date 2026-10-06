import MathFormula from "./Math";
import NgramExplorer from "./NgramExplorer";
import { weatherCounts } from "@/data/ngram-lesson";

export function ContinuationCounts() {
  const examples=[{word:"is lovely",count:4120},{word:"is nice",count:3890},{word:"is changing",count:2540},{word:"is hot",count:1870},{word:"is terrible",count:980}];
  return <figure><div className="space-y-4 border-y border-neutral-200 py-6"><p className="text-sm font-medium">After the phrase “The weather…”</p>{examples.map(({word,count})=><div key={word} className="grid grid-cols-[6rem_1fr_3.5rem] items-center gap-3 text-sm"><span>{word}</span><div className="h-2 bg-neutral-100"><div className="h-full bg-[var(--accent)]" style={{width:`${(count/4120*100).toFixed(3)}%`}} /></div><span className="text-right">{count.toLocaleString("en-IE")}</span></div>)}</div><figcaption>Figure 14-1. Illustrative continuation counts, adapted into English. These teaching numbers are not measurements from a real messaging dataset. Frequent continuations can supply suggestions without consulting the weather.</figcaption></figure>;
}

export function ContextWindow() {
  const tokens="the shy kitten ventured outside for the first".split(" ");
  return <figure><div className="border-y border-neutral-200 py-6"><p className="mb-4 text-sm font-medium">Predict the next token with a trigram model</p><div className="flex flex-wrap items-center gap-2">{tokens.map((word,i)=><span key={i} className={`border px-3 py-2 text-sm ${i>=tokens.length-2 ? "border-[var(--accent-border)] bg-[var(--accent-soft)] text-[var(--accent)]" : "border-neutral-200 text-neutral-500"}`}>{word}</span>)}<span className="px-2 text-sm">→ ?</span></div><p className="mt-4 text-sm">N = 3: use “the first” → predict “time”. Earlier tokens are outside the window.</p></div><figcaption>Figure 14-2. A trigram consists of two context tokens and the next token. The highlighted tokens are the only context used by this model.</figcaption></figure>;
}

export function WeatherFrequencyTable() {
  const total=weatherCounts.reduce((sum,row)=>sum+row.count,0);
  return <figure><div className="overflow-x-auto" role="region" tabIndex={0} aria-label="Illustrative bigram frequency table; scroll horizontally on small screens"><table className="min-w-[500px] w-full text-left text-sm [&_th]:px-3 [&_th]:py-3 [&_th]:font-medium [&_td]:px-3 [&_td]:py-3 [&_tr]:border-b [&_tr]:border-neutral-200"><thead><tr><th scope="col">Next word</th><th scope="col">Count after “weather”</th><th scope="col">Probability</th></tr></thead><tbody>{weatherCounts.map(row=><tr key={row.word}><th scope="row">{row.word}</th><td>{row.count.toLocaleString("en-IE")}</td><td>{(row.count/total*100).toFixed(row.count<10 ? 2 : 1)}%</td></tr>)}</tbody><tfoot><tr><th scope="row">Total continuation events</th><td>{total.toLocaleString("en-IE")}</td><td>100%</td></tr></tfoot></table></div><figcaption>Figure 14-3. An illustrative bigram table for the token “weather”. Counts total 10,000. The rare “banana” continuation has probability 0.03%; displayed rounded entries may not sum to exactly 100%.</figcaption></figure>;
}

export function CountingExperiment() {
  return <figure><NgramExplorer formula={<MathFormula display tex={String.raw`P(w\mid c)=\frac{C(c,w)}{\sum_v C(c,v)},\qquad P_{+1}(w\mid c)=\frac{C(c,w)+1}{\sum_v C(c,v)+V}`} />} /><figcaption>Experiment 14-A. Calculate actual continuation counts from the ten displayed teaching sentences. Change the model order or prefix, compare “cat” with “kitten”, and test an unseen context with and without add-one smoothing.</figcaption></figure>;
}
