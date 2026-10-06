"use client";

import { useState, type ReactNode } from "react";
import { exampleCorpus, ngramDistribution, ngramVocabulary, type NgramOrder } from "@/data/ngram-lesson";

export default function NgramExplorer({ formula }: { formula: ReactNode }) {
  const [order, setOrder] = useState<NgramOrder>(2);
  const [text, setText] = useState("the weather");
  const [smoothing, setSmoothing] = useState(false);
  const result = ngramDistribution(order, text, smoothing);
  const canSuggest = result.sufficientContext && result.denominator > 0;
  return <div className="border-y border-neutral-200 py-6">
    <div className="grid gap-5 sm:grid-cols-[12rem_1fr]">
      <label className="block text-sm">Model order<select aria-label="N-gram order" value={order} onChange={e=>setOrder(Number(e.target.value) as NgramOrder)} className="mt-2 block w-full border border-neutral-300 bg-white px-3 py-2"><option value="1">Unigram (N=1)</option><option value="2">Bigram (N=2)</option><option value="3">Trigram (N=3)</option></select></label>
      <label className="block text-sm">Prefix<input aria-label="Prefix" type="text" disabled={order===1} value={text} onChange={e=>setText(e.target.value)} className="mt-2 block w-full border border-neutral-300 bg-white px-3 py-2 disabled:bg-neutral-50" /></label>
    </div>
    <p className="mt-4 text-sm leading-7">Used context: <output>{order===1 ? "None — unigram ignores the prefix" : result.context.join(" ") || "Empty"}</output>. Earlier tokens are discarded.</p>
    <label className="mt-4 flex items-center gap-2 text-sm"><input type="checkbox" checked={smoothing} onChange={e=>setSmoothing(e.target.checked)} className="accent-[var(--accent)]" />Add-one smoothing over the fixed vocabulary</label>
    <div className="my-5 overflow-x-auto">{formula}</div>
    <div role="status" className="border-l-2 border-[var(--accent)] pl-4 text-sm leading-7">
      {!result.sufficientContext ? <p>Enter at least {order-1} tokens for this model order.</p> : <>
        <p>Observed continuation events: <output>{result.total}</output> · Vocabulary size: {ngramVocabulary.length}</p>
        {!canSuggest ? <p>No continuation was observed for this context. The unsmoothed estimate is undefined, not a valid all-zero distribution.</p> : <p>Probability sum: <output>{result.rows.reduce((sum,row)=>sum+row.probability!,0).toFixed(6)}</output>{result.total===0 && " · This uniform distribution comes from smoothing alone; there is no observed evidence for the context."}</p>}
      </>}
    </div>
    <div className="my-5 flex flex-wrap gap-2">{["the weather", "the cat", "the kitten", "purple dragon"].map(prefix=><button key={prefix} type="button" onClick={()=>setText(prefix)} className="border border-neutral-300 px-3 py-2 text-sm hover:border-[var(--accent)] focus-visible:outline-2 focus-visible:outline-[var(--accent)]">{prefix}</button>)}</div>
    <div className="overflow-x-auto" role="region" tabIndex={0} aria-label="Next-word counts and probabilities; scroll horizontally on small screens">
      <table className="min-w-[480px] w-full text-left text-sm [&_th]:px-3 [&_th]:py-3 [&_th]:font-medium [&_td]:px-3 [&_td]:py-3 [&_tr]:border-b [&_tr]:border-neutral-200">
        <thead><tr><th scope="col">Next word</th><th scope="col">Count</th><th scope="col">Probability</th></tr></thead>
        <tbody>{result.rows.map(row=><tr key={row.word}><th scope="row">{row.word}</th><td>{row.count}</td><td><div className="flex items-center gap-3"><span className="min-w-16"><output>{row.probability===null ? "No estimate" : `${(row.probability*100).toFixed(1)}%`}</output></span>{row.probability!==null && <div className="h-2 w-24 bg-neutral-100"><div className="h-full bg-[var(--accent)]" style={{width:`${Number((row.probability*100).toFixed(3))}%`}} /></div>}</div></td></tr>)}</tbody>
      </table>
    </div>
    <button type="button" disabled={!canSuggest} onClick={()=>setText(old=>`${old.trim()} ${result.rows[0].word}`.trim())} className="mt-5 border border-neutral-300 px-3 py-2 text-sm hover:border-[var(--accent)] focus-visible:outline-2 focus-visible:outline-[var(--accent)] disabled:opacity-40">Append the highest-probability word</button>
    <p className="mt-3 text-sm text-neutral-500">Ties use alphabetical order. This selects the maximum; it does not sample randomly.</p>
    <details className="mt-5"><summary>Inspect the complete teaching corpus</summary><ol className="mt-3 list-decimal space-y-2 pl-5 text-sm">{exampleCorpus.map((sentence,i)=><li key={i}>{sentence}</li>)}</ol></details>
    <p className="mt-4 text-sm leading-7 text-neutral-500">Words are lowercased and extracted from English letter sequences. Sentences are counted separately, with no start/end markers. This deliberately small tokenizer and corpus are educational examples.</p>
    <button type="button" onClick={()=>{setOrder(2);setText("the weather");setSmoothing(false);}} className="mt-5 border border-neutral-300 px-3 py-2 text-sm hover:border-[var(--accent)] focus-visible:outline-2 focus-visible:outline-[var(--accent)]">Reset counting experiment</button>
  </div>;
}
