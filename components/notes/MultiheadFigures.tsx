import MathFormula from "./Math";
import {
  MultiheadCalculationExplorer,
  HeadWidthExplorer,
} from "./MultiheadExplorers";
import {
  multiheadCalculation,
  teachingHeads,
  teachingOutputProjection,
} from "@/data/multihead-lesson";

export function SingleMixture() {
  return (
    <figure>
      <div className="border-y border-neutral-200 py-6">
        <p className="mb-4 text-sm">A simple average of two value vectors</p>
        <MathFormula
          display
          tex={String.raw`\tfrac12[1,0]+\tfrac12[0,1]=[0.5,0.5]`}
        />
      </div>
      <figcaption>
        Figure 20-1. One mixture combines its inputs. Multiple input pairs can
        produce the same average, but a single head can still attend to several
        positions and encode more than one relationship.
      </figcaption>
    </figure>
  );
}

export function TwoHeadWeights() {
  const result = multiheadCalculation(1);
  return (
    <figure>
      <div className="grid gap-6 border-y border-neutral-200 py-6 sm:grid-cols-2">
        {result.heads.map((head) => (
          <div key={head.name} className="space-y-3">
            <p className="text-sm font-medium">{head.name} · query “likes”</p>
            {["he", "likes", "painting"].map((word, index) => (
              <div key={word} className="space-y-1 text-sm">
                <div className="flex justify-between gap-2">
                  <span>{word}</span>
                  <span>{(head.weights[index] * 100).toFixed(2)}%</span>
                </div>
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
          </div>
        ))}
      </div>
      <figcaption>
        Figure 20-2. The same query position produces two different weight rows
        using our hand-picked projections. These are calculated values, not
        measured heads from a trained model.
      </figcaption>
    </figure>
  );
}

export function FullInputProjections() {
  return (
    <figure>
      <div className="space-y-5 border-y border-neutral-200 py-6">
        <p className="text-sm font-medium">
          Every projection receives the complete input row
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {[1, 2].map((index) => (
            <div key={index} className="border border-neutral-200 p-4">
              <p className="mb-3 text-sm">Head {index}</p>
              <MathFormula tex={`Q_${index}=XW_Q^{(${index})}`} />
              <p className="mt-3 text-sm text-neutral-500">
                Full model width → a smaller learned subspace
              </p>
            </div>
          ))}
        </div>
        <MathFormula
          display
          tex={String.raw`\operatorname{Concat}(H_1,\ldots,H_m)\,W_O\quad\text{(concatenate along the feature axis)}`}
        />
      </div>
      <figcaption>
        Figure 20-3. Heads project the whole input into separate working spaces,
        then their outputs are concatenated. Equal total width is not a
        guarantee of lossless compression.
      </figcaption>
    </figure>
  );
}

export function AttentionPatternExamples() {
  const patterns = [
    { name: "Previous position", target: (i: number) => Math.max(0, i - 1) },
    { name: "Same position", target: (i: number) => i },
    {
      name: "Earlier matching item",
      target: (i: number) => (i >= 3 ? i - 3 : 0),
    },
    { name: "Special position", target: () => 0 },
  ];
  return (
    <figure>
      <div className="grid grid-cols-2 gap-5 border-y border-neutral-200 py-6 sm:grid-cols-4">
        {patterns.map((pattern) => (
          <div key={pattern.name}>
            <p className="mb-3 text-xs font-medium">{pattern.name}</p>
            <svg
              viewBox="0 0 120 120"
              className="w-full max-w-[140px]"
              role="img"
              aria-label={`Schematic ${pattern.name.toLowerCase()} attention pattern; rows query, columns key`}
            >
              {Array.from({ length: 6 }, (_, i) =>
                Array.from({ length: 6 }, (_, j) => (
                  <rect
                    key={`${i}-${j}`}
                    x={j * 20}
                    y={i * 20}
                    width={18}
                    height={18}
                    fill="var(--accent)"
                    opacity={j === pattern.target(i) ? 0.8 : 0.08}
                  />
                )),
              )}
            </svg>
          </div>
        ))}
      </div>
      <figcaption>
        Figure 20-4. Schematic patterns to help read heatmaps: rows are queries
        and columns are keys. These grids are illustrations, not normalised
        measurements or evidence about a specific model.
      </figcaption>
    </figure>
  );
}

export function MultiheadWorkedExample() {
  const matrixTex = (matrix: number[][]) =>
    String.raw`\begin{bmatrix}` +
    matrix.map((row) => row.join("&")).join("\\\\") +
    String.raw`\end{bmatrix}`;
  return (
    <figure>
      <div className="space-y-5 border-y border-neutral-200 py-6">
        <p className="text-sm font-medium">
          The complete projection matrices used by Experiment 20-A
        </p>
        {teachingHeads.map((head, index) => (
          <div key={head.name} className="overflow-x-auto">
            <MathFormula
              display
              tex={`W_Q^{(${index + 1})}=${matrixTex(head.q)},\qquad W_K^{(${index + 1})}=${matrixTex(head.k)},\qquad W_V^{(${index + 1})}=${matrixTex(head.v)}`}
            />
          </div>
        ))}
        <MathFormula
          display
          tex={`W_O=${matrixTex(teachingOutputProjection)}`}
        />
      </div>
      <figcaption>
        Teaching matrices. Both heads use four input coordinates and two
        projected coordinates. All numbers are fixed by hand.
      </figcaption>
    </figure>
  );
}

export function MultiheadArithmeticExperiment() {
  return (
    <figure>
      <MultiheadCalculationExplorer
        formula={
          <MathFormula
            display
            tex={String.raw`H_i=\operatorname{softmax}\!\left(\frac{Q_iK_i^{\mathsf T}}{\sqrt{d_k}}+M\right)V_i,\qquad O=\operatorname{Concat}(H_1,H_2)W_O`}
          />
        }
      />
      <figcaption>
        Experiment 20-A. Compute two projected attention heads, concatenate
        their outputs, and apply the displayed output matrix. Causal masking
        uses the sequence order “he, likes, painting”.
      </figcaption>
    </figure>
  );
}

export function HeadBudgetExperiment() {
  return (
    <figure>
      <HeadWidthExplorer />
      <figcaption>
        Experiment 20-B. Compare head width, projection parameter count and
        attention-table size while keeping model width fixed.
      </figcaption>
    </figure>
  );
}
