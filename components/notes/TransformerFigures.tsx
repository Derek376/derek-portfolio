import type { ReactNode } from "react";
import MathFormula from "./Math";
import PositionExplorer from "./PositionExplorer";
import { positionEncoding } from "@/data/transformer-lesson";

function Flow({ steps }: { steps: string[] }) {
  return (
    <ol className="m-0 list-none space-y-3 p-0 text-sm">
      {steps.map((step, index) => (
        <li key={`${index}-${step}`} className="list-none">
          <div className="border border-neutral-200 px-4 py-3 text-center">
            {step}
          </div>
          {index < steps.length - 1 && (
            <div
              className="mt-3 text-center text-[var(--accent)]"
              aria-hidden="true"
            >
              ↓
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}

function Diagram({
  children,
  caption,
}: {
  children: ReactNode;
  caption: string;
}) {
  return (
    <figure>
      <div className="border-y border-neutral-200 py-6">{children}</div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

export function ValueMixture() {
  return (
    <Diagram caption="Figure 21-1. A single head's weighted sum lies in the convex hull of its value vectors. This geometric statement does not apply unchanged after output projections and residual additions.">
      <svg
        viewBox="0 0 360 220"
        className="mx-auto w-full max-w-[420px]"
        role="img"
        aria-label="Three value vectors form a triangle; their weighted mixture is a point inside it"
      >
        <path
          d="M55 175 L295 175 L175 35 Z"
          fill="var(--accent)"
          fillOpacity="0.06"
          stroke="#a3a3a3"
        />
        {[
          [55, 175, "A"],
          [295, 175, "B"],
          [175, 35, "C"],
        ].map(([x, y, label]) => (
          <g key={label}>
            <circle cx={x} cy={y} r={4} fill="#525252" />
            <text
              x={Number(x) + 8}
              y={Number(y) - 8}
              fontSize={13}
              fill="#525252"
            >
              {label}
            </text>
          </g>
        ))}
        <circle cx={151} cy={147} r={5} fill="var(--accent)" />
        <text x={159} y={140} fontSize={12} fill="var(--accent)">
          0.5A + 0.3B + 0.2C
        </text>
      </svg>
      <MathFormula
        display
        tex={String.raw`\mathbf h=0.5\mathbf v_A+0.3\mathbf v_B+0.2\mathbf v_C`}
      />
    </Diagram>
  );
}

export function CommunicationAndProcessing() {
  return (
    <Diagram caption="Figure 21-2. Attention mixes information across allowed positions. The same FFN then transforms each contextual row separately; its parameters are shared across positions.">
      <p className="mb-4 text-center text-sm font-medium">
        Attention · exchange information across positions
      </p>
      <div className="grid grid-cols-3 gap-3 text-center text-sm">
        {["cat", "chases", "dog"].map((token) => (
          <div key={token} className="space-y-3">
            <div className="border-b border-[var(--accent)] py-3">{token}</div>
            <div aria-hidden="true">↓</div>
            <div className="border border-neutral-200 p-3">Shared FFN</div>
            <div aria-hidden="true">↓</div>
            <div>Updated row</div>
          </div>
        ))}
      </div>
    </Diagram>
  );
}

export function FeedforwardExpansion() {
  return (
    <Diagram caption="Figure 21-3. The original model expands each row from 512 to 2048 coordinates, applies ReLU, and projects back to 512. Fourfold expansion is a model choice, not a requirement.">
      <Flow
        steps={[
          "Contextual input · 512 coordinates",
          "First linear map · 2048 coordinates",
          "ReLU · coordinate-wise nonlinearity",
          "Second linear map · 512 coordinates",
        ]}
      />
    </Diagram>
  );
}

export function StackedBackbone() {
  return (
    <Diagram caption="Figure 21-4. A simplified causal language-model backbone. Each attention + FFN stage keeps the sequence shape. Residual connections and normalisation are omitted here and shown in Figure 21-6.">
      <Flow
        steps={[
          "Token embeddings + positional information · n × d",
          "Block 1 · masked attention → FFN · n × d",
          "Block 2 · masked attention → FFN · n × d",
          "Block 3 · masked attention → FFN · n × d",
          "Last position → vocabulary logits → Softmax",
        ]}
      />
      <p className="mt-4 text-sm text-neutral-500">
        Three blocks illustrate stacking. This is not a specification of a
        particular trained model.
      </p>
    </Diagram>
  );
}

export function PositionHeatmap() {
  return (
    <Diagram caption="Figure 21-5. Computed sinusoidal encodings for eight positions and eight coordinates. Shade maps values from −1 (pale) to +1 (dark); it is not an attention probability.">
      <svg
        viewBox="0 0 330 265"
        className="mx-auto w-full max-w-[430px]"
        role="img"
        aria-label="Eight by eight grid of sinusoidal position coordinates with alternating sine and cosine frequencies"
      >
        <text x={175} y={18} textAnchor="middle" fontSize={12} fill="#525252">
          Coordinate →
        </text>
        {Array.from({ length: 8 }, (_, column) => (
          <text
            key={column}
            x={73 + column * 30}
            y={39}
            textAnchor="middle"
            fontSize={11}
            fill="#737373"
          >
            {column}
          </text>
        ))}
        {Array.from({ length: 8 }, (_, position) => (
          <g key={position}>
            <text
              x={46}
              y={67 + position * 24}
              textAnchor="end"
              fontSize={11}
              fill="#737373"
            >
              pos {position}
            </text>
            {positionEncoding(position, 8).map((value, column) => (
              <rect
                key={column}
                x={59 + column * 30}
                y={51 + position * 24}
                width={27}
                height={21}
                fill="var(--accent)"
                opacity={Number((0.08 + (0.82 * (value + 1)) / 2).toFixed(3))}
              />
            ))}
          </g>
        ))}
        <text x={175} y={258} textAnchor="middle" fontSize={11} fill="#737373">
          sin / cos pairs · different frequencies
        </text>
      </svg>
    </Diagram>
  );
}

export function TransformerOverview() {
  return (
    <Diagram caption="Figure 21-6. A causal decoder-only overview using the original post-normalisation ordering for illustration. The original encoder-decoder Transformer also includes encoder output and cross-attention in its decoder.">
      <Flow
        steps={[
          "Token IDs → embedding lookup + position encoding",
          "Masked multi-head self-attention",
          "Residual addition + LayerNorm",
          "Position-wise FFN",
          "Residual addition + LayerNorm",
          "Repeat blocks → final position representation",
          "Vocabulary projection → Softmax → select next token",
          "Append selected token → next generation step",
        ]}
      />
      <p className="mt-4 text-sm text-neutral-500">
        Residual branches add each sublayer&apos;s input to its output. Many later
        models place normalisation before sublayers; this diagram uses post-norm
        to keep the historical example explicit.
      </p>
    </Diagram>
  );
}

export function PositionExperiment() {
  return (
    <figure>
      <PositionExplorer />
      <figcaption>
        Experiment 21-A. Swap the subject and object and compare input vectors
        with and without positional information.
      </figcaption>
    </figure>
  );
}
