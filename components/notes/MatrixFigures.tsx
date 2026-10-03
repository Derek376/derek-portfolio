import { ingredients, ingredientPrices, recipes } from "@/data/matrix-lesson";

export function RecipeMatrix() {
  return (
    <figure>
      <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Recipe matrix; scroll horizontally on small screens">
        <table className="w-full min-w-[540px] border-collapse text-left text-sm" aria-label="Matrix W: three recipes and four ingredients, in portions">
          <caption className="mb-4 text-left font-medium text-neutral-900">W — portions per recipe</caption>
          <thead>
            <tr className="border-y border-neutral-200"><th scope="col" className="py-3 pr-4 font-medium">Recipe</th>{ingredients.map((ingredient) => <th key={ingredient} scope="col" className="px-3 py-3 text-center font-medium">{ingredient}</th>)}</tr>
          </thead>
          <tbody>
            {recipes.map((recipe) => <tr key={recipe.name} className="border-b border-neutral-200"><th scope="row" className="py-4 pr-4 font-normal">{recipe.name}</th>{recipe.amounts.map((amount, index) => <td key={ingredients[index]} className="px-3 py-4 text-center font-mono text-neutral-900">{amount}</td>)}</tr>)}
          </tbody>
        </table>
      </div>
      <figcaption>Figure 3-1. W is a 3 × 4 matrix: each row is a recipe, and each column is an ingredient. Read “3 × 4” as “three rows and four columns”.</figcaption>
    </figure>
  );
}

function NumberMatrix({ rows, label }: { rows: number[][]; label: string }) {
  return (
    <table aria-label={label} className="border-x-2 border-neutral-400 font-mono text-sm text-neutral-900">
      <tbody>{rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((number, columnIndex) => <td key={columnIndex} className="px-3 py-2 text-center">{number}</td>)}</tr>)}</tbody>
    </table>
  );
}

export function MatrixVectorProduct() {
  return (
    <figure className="border-y border-neutral-200 py-6">
      <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Matrix multiplication example; scroll horizontally on small screens">
        <div className="flex min-w-[580px] items-center justify-between gap-4 py-3">
          <div><p className="mb-3 text-center text-sm font-medium">W</p><NumberMatrix rows={recipes.map((recipe) => recipe.amounts)} label="W: rows 2, 1, 0, 3; 0, 4, 1, 2; 1, 0, 3, 1" /></div>
          <span aria-hidden="true">×</span>
          <div><p className="mb-3 text-center text-sm font-medium">x</p><NumberMatrix rows={ingredientPrices.map((price) => [price])} label="Input column vector x: 1, 2, 1, 0" /></div>
          <span aria-hidden="true">=</span>
          <div><p className="mb-3 text-center text-sm font-medium">y</p><NumberMatrix rows={recipes.map((recipe) => [recipe.amounts.reduce((total, amount, index) => total + amount * ingredientPrices[index], 0)])} label="Output column vector y: 4, 9, 4" /></div>
        </div>
      </div>
      <div className="mt-6 space-y-4 border-t border-neutral-200 pt-5">
        {recipes.map((recipe, index) => (
          <div key={recipe.name}>
            <p className="text-sm font-medium text-neutral-900">Row {index + 1} · {recipe.name}</p>
            <p className="mt-1 font-mono text-sm">{recipe.amounts.map((amount, ingredient) => `${amount} × ${ingredientPrices[ingredient]}`).join(" + ")} = <span className="accent-text font-semibold">{recipe.amounts.reduce((total, amount, ingredient) => total + amount * ingredientPrices[ingredient], 0)}</span></p>
          </div>
        ))}
      </div>
      <figcaption>Figure 3-2. Take the dot product of each row with x. The three results form the output column vector y = [4, 9, 4].</figcaption>
    </figure>
  );
}

export function MatrixDimensions() {
  return (
    <figure>
      <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Matrix dimension rule; scroll horizontally on small screens">
        <svg viewBox="0 0 640 260" className="min-w-[560px] w-full" role="img" aria-label="W has m rows and n columns. An n-dimensional input gives an m-dimensional output. The two inner dimensions n must match.">
          <rect x="55" y="40" width="160" height="140" fill="var(--accent-soft)" stroke="var(--accent-border)" />
          <text x="135" y="100" textAnchor="middle" fontSize="22" fill="var(--accent)">W</text>
          <text x="135" y="133" textAnchor="middle" fontSize="16" fill="#525252">m × n</text>
          <text x="35" y="117" textAnchor="middle" fontSize="16" fill="var(--accent)">m</text>
          <text x="135" y="202" textAnchor="middle" fontSize="16" fill="var(--accent)">n</text>
          <text x="260" y="115" textAnchor="middle" fontSize="22" fill="#737373">×</text>
          <rect x="305" y="40" width="65" height="140" fill="var(--accent-soft)" stroke="var(--accent-border)" />
          <text x="337" y="105" textAnchor="middle" fontSize="22" fill="var(--accent)">x</text>
          <text x="337" y="135" textAnchor="middle" fontSize="13" fill="#525252">n × 1</text>
          <text x="410" y="115" textAnchor="middle" fontSize="22" fill="#737373">=</text>
          <rect x="460" y="55" width="65" height="110" fill="#f5f5f5" stroke="#d4d4d4" />
          <text x="492" y="105" textAnchor="middle" fontSize="22" fill="#262626">y</text>
          <text x="492" y="135" textAnchor="middle" fontSize="13" fill="#525252">m × 1</text>
          <path d="M135 212 V230 H337 V190" fill="none" stroke="var(--accent)" strokeDasharray="4 4" />
          <text x="237" y="254" textAnchor="middle" fontSize="14" fill="var(--accent)">Inner dimensions must match: n</text>
          <text x="492" y="202" textAnchor="middle" fontSize="14" fill="#525252">m outputs</text>
        </svg>
      </div>
      <figcaption>Figure 3-3. The number of columns of W must match the input dimension. The number of rows determines the output dimension: (m × n) × (n × 1) = (m × 1).</figcaption>
    </figure>
  );
}
