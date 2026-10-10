export const bpeCorpus = [
  "我爱吃苹果，苹果很甜。",
  "红苹果和绿苹果都是水果。",
  "水果店卖水果。",
];
export type MergePair = [string, string];

export function countPairs(rows: string[][]) {
  const counts = new Map<string, { pair: MergePair; count: number }>();
  for (const row of rows) {
    for (let i = 0; i < row.length - 1; i++) {
      const pair: MergePair = [row[i], row[i + 1]];
      const key = JSON.stringify(pair);
      const entry = counts.get(key);
      if (entry) entry.count++;
      else counts.set(key, { pair, count: 1 });
    }
  }
  // Stable ties retain first appearance in the corpus.
  return [...counts.values()].sort((a, b) => b.count - a.count);
}

export function mergePair(tokens: string[], pair: MergePair) {
  const result: string[] = [];
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i] === pair[0] && tokens[i + 1] === pair[1]) {
      result.push(tokens[i] + tokens[i + 1]);
      i++;
    } else result.push(tokens[i]);
  }
  return result;
}

export function trainToyBpe(rounds: number) {
  let rows = bpeCorpus.map((text) => Array.from(text));
  const vocabulary = [...new Set(rows.flat())];
  const merges: { pair: MergePair; count: number }[] = [];
  for (let round = 0; round < rounds; round++) {
    const next = countPairs(rows)[0];
    if (!next) break;
    merges.push(next);
    vocabulary.push(next.pair.join(""));
    rows = rows.map((row) => mergePair(row, next.pair));
  }
  return { rows, vocabulary, merges, pairs: countPairs(rows) };
}

export function encodeToyBpe(text: string, rounds: number) {
  const trained = trainToyBpe(rounds);
  let tokens = Array.from(text);
  for (const merge of trained.merges) tokens = mergePair(tokens, merge.pair);
  return {
    tokens,
    ids: tokens.map((token) => trained.vocabulary.indexOf(token)),
  };
}

export function textUnits(text: string) {
  return {
    codePoints: Array.from(text).length,
    bytes: new TextEncoder().encode(text).length,
  };
}

export const tokenizerQuiz = [
  {
    question: "What kinds of units can a subword tokenizer produce?",
    options: [
      "Only complete words.",
      "Whole words, word fragments and smaller units, depending on its vocabulary and rules.",
      "Random fragments unrelated to learned rules.",
      "Only one letter per token.",
    ],
    answer: 1,
    explanation:
      "A token can contain a whole word or part of one; byte-level schemes can also represent units smaller than a Unicode character. The exact boundaries depend on the tokenizer.",
  },
  {
    question:
      "Why can tokenization make counting letters in strawberry harder?",
    options: [
      "The model must always answer incorrectly.",
      "The input units need not align with individual letters, so the task requires recovering and manipulating spelling rather than counting token positions.",
      "The letter r is a special token.",
      "Tokenization necessarily destroys the original spelling.",
    ],
    answer: 1,
    explanation:
      "There are three r letters. A token-based representation does not make counting impossible: many tokenizers are reversible, and models can learn spelling or use tools. Token boundaries alone do not fully explain every counting error.",
  },
];
