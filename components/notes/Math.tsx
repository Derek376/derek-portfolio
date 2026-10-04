import katex from "katex";

// Expressions come from local course content. KaTeX runs only on the server.
export default function MathFormula({ tex, display = false }: { tex: string; display?: boolean }) {
  const html = katex.renderToString(tex, {
    displayMode: display,
    throwOnError: true,
    strict: "error",
    trust: false,
    output: "htmlAndMathml",
  });
  return <span className="math-expression" dangerouslySetInnerHTML={{ __html: html }} />;
}

// JSX attributes and data strings do not pass through the MDX math plugin.
export function MathText({ children }: { children: string }) {
  return <>{children.split(/(\$[^$]+\$)/g).map((part, index) =>
    part.startsWith("$") && part.endsWith("$")
      ? <MathFormula key={index} tex={part.slice(1, -1)} />
      : part
  )}</>;
}

export function SvgMath({ x, y, tex, width = 120, size = 14, anchor = "start", color = "#525252" }: {
  x: number; y: number; tex: string; width?: number; size?: number;
  anchor?: "start" | "middle" | "end"; color?: string;
}) {
  const left = anchor === "middle" ? x - width / 2 : anchor === "end" ? x - width : x;
  return <foreignObject x={left} y={y - size * 1.2} width={width} height={size * 2.5}>
    <div className="svg-math" style={{ fontSize: size, color, textAlign: anchor === "middle" ? "center" : anchor === "end" ? "right" : "left", whiteSpace: "nowrap" }}>
      <MathFormula tex={tex} />
    </div>
  </foreignObject>;
}
