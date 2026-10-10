import { BpeExplorer, TextUnitExplorer } from "./TokenizerExplorers";
import { encodeToyBpe, textUnits } from "@/data/tokenizer-lesson";

export function SpellingAndTokens() {
  return (
    <figure>
      <div className="space-y-5 border-y border-neutral-200 py-6 text-sm">
        <p className="font-medium">
          Spelling: s t r a w b e r r y · 10 letters · 3 r letters
        </p>
        <div className="flex flex-wrap gap-3">
          {["straw", "berry"].map((piece) => (
            <span key={piece} className="border border-neutral-200 px-4 py-2">
              {piece}
            </span>
          ))}
        </div>
        <p className="text-neutral-500">
          One illustrative split; another vocabulary can produce different
          boundaries.
        </p>
      </div>
      <figcaption>
        Figure 22-1. Token positions need not match letter positions. Grouping
        spelling into tokens does not necessarily erase that spelling.
      </figcaption>
    </figure>
  );
}

export function TokenGranularity() {
  const rows = [
    { label: "Whole word", pieces: ["internationalization"] },
    { label: "Characters", pieces: Array.from("internationalization") },
    {
      label: "Illustrative subwords",
      pieces: ["inter", "nation", "al", "ization"],
    },
  ];
  return (
    <figure>
      <div className="space-y-5 border-y border-neutral-200 py-6 text-sm">
        {rows.map((row) => (
          <div key={row.label}>
            <p className="mb-3 font-medium">
              {row.label} · {row.pieces.length} {row.pieces.length === 1 ? "unit" : "units"}
            </p>
            <div className="flex flex-wrap gap-2">
              {row.pieces.map((piece, i) => (
                <span key={i} className="border border-neutral-200 px-2 py-1">
                  {piece}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <figcaption>
        Figure 22-2. Three possible granularities. The four-piece split is a
        teaching example, not the output of a named tokenizer.
      </figcaption>
    </figure>
  );
}

export function BpeExperiment() {
  return (
    <figure>
      <BpeExplorer />
      <figcaption>
        Figure 22-3 / Experiment 22-A. Count adjacent pairs, learn two merges
        and apply their order to a new sentence.
      </figcaption>
    </figure>
  );
}

export function TokenInputPipeline() {
  const encoded = encodeToyBpe("苹果是水果", 2);
  const steps = [
    "Text: 苹果是水果",
    `Tokens: ${encoded.tokens.join(" / ")}`,
    `Toy token IDs: [${encoded.ids.join(", ")}]`,
    "Embedding lookup: one learned vector per ID",
    "Positional mechanism → Transformer blocks",
  ];
  return (
    <figure>
      <div className="space-y-3 border-y border-neutral-200 py-6 text-center text-sm">
        {steps.map((step, i) => (
          <div key={i}>
            <div className="border border-neutral-200 px-4 py-3">{step}</div>
            {i < steps.length - 1 && (
              <div className="mt-3 text-[var(--accent)]" aria-hidden="true">
                ↓
              </div>
            )}
          </div>
        ))}
      </div>
      <figcaption>
        Figure 22-4. Text becomes token IDs before embedding lookup. These IDs
        belong only to our tiny vocabulary; they are not IDs from a real
        language model.
      </figcaption>
    </figure>
  );
}

export function LanguageUnits() {
  return (
    <figure>
      <div className="space-y-4 border-y border-neutral-200 py-6 text-sm">
        {["The quick brown fox", "敏捷的棕色狐狸"].map((text) => {
          const units = textUnits(text);
          return (
            <div key={text}>
              <p className="font-medium">{text}</p>
              <p>
                {units.codePoints} code points · {units.bytes} UTF-8 bytes
              </p>
            </div>
          );
        })}
        <p className="text-neutral-500">
          Neither measurement tells us a production model&apos;s token count.
          That needs the model&apos;s exact tokenizer.
        </p>
      </div>
      <figcaption>
        Figure 22-5. English and Chinese text have different code-point and byte
        lengths. Token counts depend on the learned vocabulary and rules, rather
        than a fixed language-wide ratio.
      </figcaption>
    </figure>
  );
}

export function TextUnitsExperiment() {
  return (
    <figure>
      <TextUnitExplorer />
      <figcaption>
        Experiment 22-B. Compare code points, bytes and direct letter counting.
        Try Chinese text or an emoji as well as English.
      </figcaption>
    </figure>
  );
}
