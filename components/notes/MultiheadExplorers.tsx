"use client";

import { useState, type ReactNode } from "react";
import {
  headDimensions,
  multiheadCalculation,
  multiheadTokens,
} from "@/data/multihead-lesson";

export function MultiheadCalculationExplorer({
  formula,
}: {
  formula: ReactNode;
}) {
  const [queryIndex, setQueryIndex] = useState(1);
  const [causal, setCausal] = useState(false);
  const result = multiheadCalculation(queryIndex, causal);
  return (
    <div className="space-y-5 border-y border-neutral-200 py-6">
      <label className="block text-sm">
        <span className="mb-2 block">Query token</span>
        <select
          value={queryIndex}
          onChange={(event) => setQueryIndex(Number(event.target.value))}
          className="border border-neutral-300 bg-white px-3 py-2"
        >
          {multiheadTokens.map((token, index) => (
            <option key={token} value={index}>
              {token}
            </option>
          ))}
        </select>
      </label>
      <label className="flex items-start gap-3 text-sm">
        <input
          type="checkbox"
          checked={causal}
          onChange={(event) => setCausal(event.target.checked)}
          className="mt-1 accent-[var(--accent)]"
        />
        <span>Apply a causal mask: exclude tokens after the query</span>
      </label>
      {formula}
      <div className="space-y-6 text-sm" aria-live="polite" aria-atomic="true">
        {result.heads.map((head) => (
          <div key={head.name} className="space-y-3">
            <p className="font-medium">
              {head.name} · Query [
              {head.query.map((x) => x.toFixed(2)).join(", ")}]
            </p>
            {multiheadTokens.map((token, index) => (
              <div key={token} className="space-y-1">
                <p>
                  {token}: score {head.scores[index].toFixed(3)} · weight{" "}
                  {(head.weights[index] * 100).toFixed(2)}%
                  {causal && index > queryIndex ? " · masked" : ""}
                </p>
                <div className="h-2 bg-neutral-100">
                  <div
                    className="h-full bg-[var(--accent)]"
                    style={{
                      width: `${Number((head.weights[index] * 100).toFixed(3))}%`,
                    }}
                  />
                </div>
              </div>
            ))}
            <p>
              Head output: [{head.output.map((x) => x.toFixed(4)).join(", ")}]
            </p>
          </div>
        ))}
        <p className="break-words">
          Concatenated: [
          {result.concatenated.map((x) => x.toFixed(4)).join(", ")}]
        </p>
        <p className="break-words">
          After output projection: [
          {result.output.map((x) => x.toFixed(4)).join(", ")}]
        </p>
      </div>
      <p className="text-sm text-neutral-500">
        Actual matrix arithmetic with fixed teaching inputs and projections.
        These heads were designed to show different patterns; they did not learn
        grammar from a corpus.
      </p>
    </div>
  );
}

export function HeadWidthExplorer() {
  const [heads, setHeads] = useState(8);
  const dimensions = headDimensions(512, heads);
  return (
    <div className="space-y-4 border-y border-neutral-200 py-6 text-sm">
      <label className="block">
        <span className="mb-2 block">Head count at fixed model width 512</span>
        <select
          value={heads}
          onChange={(event) => setHeads(Number(event.target.value))}
          className="border border-neutral-300 bg-white px-3 py-2"
        >
          {[1, 2, 4, 8, 16].map((count) => (
            <option key={count} value={count}>
              {count}
            </option>
          ))}
        </select>
      </label>
      <div className="space-y-2" aria-live="polite" aria-atomic="true">
        <p>Query/key/value width per head: {dimensions.headWidth}</p>
        <p>Concatenated width: {dimensions.concatenatedWidth}</p>
        <p>
          Q/K/V/output projection weights, excluding biases:{" "}
          {dimensions.projectionParameters.toLocaleString("en-IE")}
        </p>
        <p>
          Attention weight entries across heads for a 16-token sequence:{" "}
          {dimensions.scoreEntries.toLocaleString("en-IE")}
        </p>
      </div>
      <p className="text-neutral-500">
        This uses equal head widths and full multi-head Q/K/V projections.
        Projection parameter count stays fixed; the number of weight-table
        entries grows with head count. Actual memory and runtime depend on the
        implementation.
      </p>
    </div>
  );
}
