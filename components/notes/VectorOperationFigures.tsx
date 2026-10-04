import MathFormula, { SvgMath } from "./Math";
import type { ReactNode } from "react";
import { articleVectors } from "@/data/vector-operations";

const colours = ["var(--accent)", "#6a7f94", "#9c6850"];

function Diagram({
  id,
  label,
  caption,
  children,
}: {
  id: string;
  label: string;
  caption: string;
  children: ReactNode;
}) {
  return (
    <figure>
      <div
        className="overflow-x-auto"
        tabIndex={0}
        role="region"
        aria-label={`${label}; scroll horizontally on small screens`}
      >
        <svg
          viewBox="0 0 640 380"
          className="min-w-150 w-full"
          role="img"
          aria-label={label}
        >
          <defs>
            {colours.map((colour, index) => (
              <marker
                key={colour}
                id={`${id}-${index}`}
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill={colour} />
              </marker>
            ))}
          </defs>
          {children}
        </svg>
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

export function ArticleComparison({ arrows = false }: { arrows?: boolean }) {
  const id = arrows ? "article-arrows" : "article-points";
  return (
    <Diagram
      id={id}
      label={
        arrows
          ? "Article vectors showing similar and different directions"
          : "Article word counts on a coordinate plane"
      }
      caption={
        arrows
          ? "Figure 2-2. A and B point in almost the same direction, about 10° apart. A and C are about 45° apart. Direction distinguishes the topic from the article's length."
          : "Figure 2-1. Counts of ‘AI’ and ‘data’ form two-dimensional vectors. A is a long AI article, B is a short AI article, and C focuses on databases."
      }
    >
      {[0, 2, 4, 6, 8, 10].map((value) => (
        <g key={value}>
          <line
            x1={105 + value * 30}
            x2={105 + value * 30}
            y1="45"
            y2="305"
            stroke="#e5e5e5"
          />
          <text
            x={105 + value * 30}
            y="325"
            textAnchor="middle"
            fontSize="12"
            fill="#737373"
          >
            {value}
          </text>
        </g>
      ))}
      {[0, 2, 4, 6, 8].map((value) => (
        <g key={value}>
          <line
            x1="105"
            x2="405"
            y1={305 - value * 30}
            y2={305 - value * 30}
            stroke="#e5e5e5"
          />
          <text
            x="90"
            y={310 - value * 30}
            textAnchor="end"
            fontSize="12"
            fill="#737373"
          >
            {value}
          </text>
        </g>
      ))}
      <text x="405" y="355" textAnchor="end" fontSize="14" fill="#525252">
        Occurrences of ‘AI’ →
      </text>
      <text x="105" y="25" fontSize="14" fill="#525252">
        Occurrences of ‘data’ ↑
      </text>
      {!arrows && articleVectors.slice(1).map((article) => (
        <line
          key={`A-${article.name}`}
          x1={105 + articleVectors[0].ai * 30}
          y1={305 - articleVectors[0].data * 30}
          x2={105 + article.ai * 30}
          y2={305 - article.data * 30}
          stroke="#a3a3a3"
          strokeWidth="1.5"
          strokeDasharray="5 5"
        />
      ))}
      {articleVectors.map((article, index) => (
        <g key={article.name}>
          {arrows && (
            <line
              x1="105"
              y1="305"
              x2={105 + article.ai * 30}
              y2={305 - article.data * 30}
              stroke={colours[index]}
              strokeWidth="2"
              markerEnd={`url(#${id}-${index})`}
            />
          )}
          {!arrows && (
            <circle
              cx={105 + article.ai * 30}
              cy={305 - article.data * 30}
              r="5"
              fill={colours[index]}
            />
          )}
          <SvgMath x={115 + article.ai * 30} y={300 - article.data * 30} color={colours[index]} tex={`${article.name} (${article.ai}, ${article.data})`} />
        </g>
      ))}
    </Diagram>
  );
}

export function ProjectionFigure() {
  return (
    <Diagram
      id="projection"
      label="Vector b projected onto the direction of vector a"
      caption="Figure 2-3. Project b onto a. The dot product equals the length of a multiplied by the signed length of that projection."
    >
      <line
        x1="70"
        y1="280"
        x2="550"
        y2="280"
        stroke={colours[0]}
        strokeWidth="2"
        markerEnd="url(#projection-0)"
      />
      <line
        x1="70"
        y1="280"
        x2="365"
        y2="85"
        stroke={colours[1]}
        strokeWidth="2"
        markerEnd="url(#projection-1)"
      />
      <line
        x1="365"
        y1="85"
        x2="365"
        y2="280"
        stroke="#a3a3a3"
        strokeDasharray="5 5"
      />
      <path d="M365 264 H349 V280" fill="none" stroke="#a3a3a3" />
      <line
        x1="70"
        y1="292"
        x2="365"
        y2="292"
        stroke={colours[2]}
        strokeWidth="3"
      />
      <path d="M135 280 A65 65 0 0 0 124 244" fill="none" stroke="#a3a3a3" />
      <SvgMath x={147} y={262} size={16} anchor="start" width={100} color="#525252" tex={String.raw`\theta`} />
      <SvgMath x={560} y={285} size={16} anchor="start" width={100} color={colours[0]} tex={String.raw`\mathbf{a}`} />
      <SvgMath x={375} y={85} size={16} anchor="start" width={100} color={colours[1]} tex={String.raw`\mathbf{b}`} />
      <SvgMath x={220} y={320} size={14} anchor="middle" width={420} color={colours[2]} tex={String.raw`\lVert\mathbf{b}\rVert\cos\theta=\text{projection length}`} />
      <SvgMath x={320} y={360} size={16} anchor="middle" width={500} color="#262626" tex={String.raw`\mathbf{a}\cdot\mathbf{b}=\lVert\mathbf{a}\rVert\times\text{projection length}`} />
    </Diagram>
  );
}

export function DotProductSigns() {
  return (
    <figure>
      <div className="grid gap-6 border-y border-neutral-200 py-6 sm:grid-cols-3">
        {[
          { title: "Similar directions", end: [150, 42], value: String.raw`\mathbf{a}\cdot\mathbf{b}>0` },
          { title: "Perpendicular", end: [45, 25], value: String.raw`\mathbf{a}\cdot\mathbf{b}=0` },
          { title: "Opposing directions", end: [10, 60], value: String.raw`\mathbf{a}\cdot\mathbf{b}<0` },
        ].map((item, index) => (
          <div key={item.title}>
            <p className="text-sm font-medium text-neutral-900">{item.title}</p>
            <svg
              viewBox="0 0 200 130"
              role="img"
              aria-label={`${item.title}: ${item.value}`}
              className="w-full max-w-[200px]"
            >
              <defs>
                <marker
                  id={`sign-${index}`}
                  viewBox="0 0 10 10"
                  refX="9"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto"
                >
                  <path d="M0 0 L10 5 L0 10z" fill="var(--accent)" />
                </marker>
              </defs>
              <line
                x1="45"
                y1="100"
                x2="180"
                y2="100"
                stroke="#a3a3a3"
                strokeWidth="2"
              />
              <line
                x1="45"
                y1="100"
                x2={item.end[0]}
                y2={item.end[1]}
                stroke="var(--accent)"
                strokeWidth="2"
                markerEnd={`url(#sign-${index})`}
              />
              <SvgMath x={185} y={115} size={12} anchor="start" width={100} color="#737373" tex={String.raw`\mathbf{a}`} />
              <text
                x={item.end[0] + 8}
                y={item.end[1]}
                fontSize="12"
                fill="var(--accent)"
              >
                b
              </text>
            </svg>
            <p className="text-sm"><MathFormula tex={item.value} /></p>
          </div>
        ))}
      </div>
      <figcaption>
        Figure 2-4. The sign of the dot product reflects directional alignment:
        positive for alignment, zero for perpendicular vectors, and negative for
        opposing directions.
      </figcaption>
    </figure>
  );
}

export function CosineComparison() {
  return (
    <figure>
      <div className="grid gap-6 border-y border-neutral-200 py-6 sm:grid-cols-2">
        <div>
          <p className="font-medium text-neutral-900">A and B</p>
          <div className="mt-3 overflow-x-auto text-sm"><MathFormula tex={String.raw`\begin{aligned} A\cdot B&=8\times2+6\times1=22\\ \lVert A\rVert&=10,\quad\lVert B\rVert\approx2.24\\ \cos\theta&\approx\frac{22}{10\times2.24}\approx0.98\end{aligned}`} /></div>
          <p className="accent-text mt-3 text-sm">
            Closely aligned directions.
          </p>
        </div>
        <div>
          <p className="font-medium text-neutral-900">A and C</p>
          <div className="mt-3 overflow-x-auto text-sm"><MathFormula tex={String.raw`\begin{aligned} A\cdot C&=8\times1+6\times7=50\\ \lVert A\rVert&=10,\quad\lVert C\rVert\approx7.07\\ \cos\theta&\approx\frac{50}{70.7}\approx0.71\end{aligned}`} /></div>
          <p className="mt-3 text-sm">Noticeably different directions.</p>
        </div>
      </div>
      <figcaption>
        Figure 2-5. Cosine similarity identifies A and B as closely aligned
        (about 0.98), while A and C differ more (about 0.71). Article length no
        longer determines the comparison.
      </figcaption>
    </figure>
  );
}

export function SemanticArithmetic() {
  return (
    <Diagram
      id="meaning"
      label="Illustrative word vectors: the offset from man to woman also takes king to queen"
      caption="Figure 2-6. A simplified picture of two conceptual directions: gender and royalty. The same offset from man to woman takes king to queen. The axes illustrate the idea; learned embeddings do not have manually labelled dimensions."
    >
      <line x1="75" y1="300" x2="560" y2="300" stroke="#a3a3a3" />
      <line x1="75" y1="300" x2="75" y2="40" stroke="#a3a3a3" />
      <text x="560" y="330" textAnchor="end" fontSize="14" fill="#525252">
        ‘Gender’ direction →
      </text>
      <text x="75" y="25" fontSize="14" fill="#525252">
        ‘Royalty’ direction ↑
      </text>
      <line
        x1="160"
        y1="245"
        x2="450"
        y2="245"
        stroke={colours[0]}
        strokeWidth="2"
        markerEnd="url(#meaning-0)"
      />
      <line
        x1="160"
        y1="95"
        x2="450"
        y2="95"
        stroke={colours[0]}
        strokeWidth="2"
        markerEnd="url(#meaning-0)"
      />
      <line
        x1="160"
        y1="245"
        x2="160"
        y2="95"
        stroke={colours[1]}
        strokeWidth="2"
        strokeDasharray="5 5"
        markerEnd="url(#meaning-1)"
      />
      {[
        { name: "man", x: 160, y: 245 },
        { name: "woman", x: 450, y: 245 },
        { name: "king", x: 160, y: 95 },
        { name: "queen", x: 450, y: 95 },
      ].map((word) => (
        <g key={word.name}>
          <circle cx={word.x} cy={word.y} r="5" fill="#262626" />
          <text
            x={word.x}
            y={word.y - 15}
            textAnchor="middle"
            fontSize="14"
            fill="#262626"
          >
            {word.name}
          </text>
        </g>
      ))}
      <SvgMath x={305} y={120} size={13} anchor="middle" width={220} color={colours[0]} tex={String.raw`+\mathbf{v}_{\text{woman}}-\mathbf{v}_{\text{man}}`} />
      <SvgMath x={305} y={270} size={13} anchor="middle" width={220} color={colours[0]} tex={String.raw`+\mathbf{v}_{\text{woman}}-\mathbf{v}_{\text{man}}`} />
      <SvgMath x={180} y={175} size={13} anchor="start" width={100} color={colours[1]} tex={String.raw`+\text{royalty}`} />
      <SvgMath x={320} y={365} size={16} anchor="middle" width={520} color="#262626" tex={String.raw`\mathbf{v}_{\text{king}}-\mathbf{v}_{\text{man}}+\mathbf{v}_{\text{woman}}\approx\mathbf{v}_{\text{queen}}`} />
    </Diagram>
  );
}
