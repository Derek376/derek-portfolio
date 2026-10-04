import MathFormula, { MathText, SvgMath } from "./Math";
import { ingredients, ingredientPrices, recipes } from "@/data/matrix-lesson";

export function RecipeMatrix() {
  return (
    <figure>
      <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Recipe matrix; scroll horizontally on small screens">
        <table className="w-full min-w-[540px] border-collapse text-left text-sm" aria-label="Matrix W: three recipes and four ingredients, in portions">
          <caption className="mb-4 text-left font-medium text-neutral-900"><MathFormula tex="W" /> — portions per recipe</caption>
          <thead>
            <tr className="border-y border-neutral-200"><th scope="col" className="py-3 pr-4 font-medium">Recipe</th>{ingredients.map((ingredient) => <th key={ingredient} scope="col" className="px-3 py-3 text-center font-medium">{ingredient}</th>)}</tr>
          </thead>
          <tbody>
            {recipes.map((recipe) => <tr key={recipe.name} className="border-b border-neutral-200"><th scope="row" className="py-4 pr-4 font-normal">{recipe.name}</th>{recipe.amounts.map((amount, index) => <td key={ingredients[index]} className="px-3 py-4 text-center font-mono text-neutral-900">{amount}</td>)}</tr>)}
          </tbody>
        </table>
      </div>
      <figcaption><MathText>{"Figure 3-1. $W$ is a $3\\times4$ matrix: each row is a recipe, and each column is an ingredient. Read “3 × 4” as “three rows and four columns”."}</MathText></figcaption>
    </figure>
  );
}

function NumberMatrix({ rows, label }: { rows: number[][]; label: string }) {
  const tex = String.raw`\begin{bmatrix}${rows.map((row) => row.join(" & ")).join(String.raw` \\ `)}\end{bmatrix}`;
  return <span aria-label={label}><MathFormula tex={tex} /></span>;
}

export function MatrixVectorProduct() {
  return (
    <figure className="border-y border-neutral-200 py-6">
      <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Matrix multiplication example; scroll horizontally on small screens">
        <div className="mx-auto flex w-max items-center gap-5 py-3">
          <div><p className="mb-3 text-center text-sm font-medium"><MathFormula tex="W" /></p><NumberMatrix rows={recipes.map((recipe) => recipe.amounts)} label="W: rows 2, 1, 0, 3; 0, 4, 1, 2; 1, 0, 3, 1" /></div>
          <span aria-hidden="true"><MathFormula tex={String.raw`\times`} /></span>
          <div><p className="mb-3 text-center text-sm font-medium"><MathFormula tex={String.raw`\mathbf{x}`} /></p><NumberMatrix rows={ingredientPrices.map((price) => [price])} label="Input column vector x: 1, 2, 1, 0" /></div>
          <span aria-hidden="true"><MathFormula tex="=" /></span>
          <div><p className="mb-3 text-center text-sm font-medium"><MathFormula tex={String.raw`\mathbf{y}`} /></p><NumberMatrix rows={recipes.map((recipe) => [recipe.amounts.reduce((total, amount, index) => total + amount * ingredientPrices[index], 0)])} label="Output column vector y: 4, 9, 4" /></div>
        </div>
      </div>
      <div className="mt-6 space-y-4 border-t border-neutral-200 pt-5">
        {recipes.map((recipe, index) => (
          <div key={recipe.name}>
            <p className="text-sm font-medium text-neutral-900">Row {index + 1} · {recipe.name}</p>
            <p className="mt-1 overflow-x-auto text-sm"><MathFormula tex={`${recipe.amounts.map((amount, ingredient) => `${amount} \\times ${ingredientPrices[ingredient]}`).join(" + ")} = ${recipe.amounts.reduce((total, amount, ingredient) => total + amount * ingredientPrices[ingredient], 0)}`} /></p>
          </div>
        ))}
      </div>
      <figcaption><MathText>{"Figure 3-2. Take the dot product of each row with x. The three results form the output column vector $\\mathbf{y}=[4,9,4]$."}</MathText></figcaption>
    </figure>
  );
}

export function MatrixDimensions() {
  return (
    <figure>
      <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Matrix dimension rule; scroll horizontally on small screens">
        <svg viewBox="0 0 640 260" className="min-w-[560px] w-full" role="img" aria-label="W has m rows and n columns. An n-dimensional input gives an m-dimensional output. The two inner dimensions n must match.">
          <rect x="55" y="40" width="160" height="140" fill="var(--accent-soft)" stroke="var(--accent-border)" />
          <SvgMath x={135} y={100} size={22} anchor="middle" width={100} color="var(--accent)" tex={String.raw`W`} />
          <SvgMath x={135} y={133} size={16} anchor="middle" width={100} color="#525252" tex={String.raw`m \times n`} />
          <SvgMath x={35} y={117} size={16} anchor="middle" width={100} color="var(--accent)" tex={String.raw`m`} />
          <SvgMath x={135} y={202} size={16} anchor="middle" width={100} color="var(--accent)" tex={String.raw`n`} />
          <SvgMath x={260} y={115} size={22} anchor="middle" width={100} color="#737373" tex={String.raw`\times`} />
          <rect x="305" y="30" width="65" height="160" fill="var(--accent-soft)" stroke="var(--accent-border)" />
          <SvgMath x={337} y={105} size={22} anchor="middle" width={100} color="var(--accent)" tex={String.raw`\mathbf{x}`} />
          <SvgMath x={337} y={135} size={13} anchor="middle" width={100} color="#525252" tex={String.raw`n \times 1`} />
          <SvgMath x={410} y={115} size={22} anchor="middle" width={100} color="#737373" tex={String.raw`=`} />
          <rect x="460" y="40" width="65" height="140" fill="#f5f5f5" stroke="#d4d4d4" />
          <SvgMath x={492} y={105} size={22} anchor="middle" width={100} color="#262626" tex={String.raw`\mathbf{y}`} />
          <SvgMath x={492} y={135} size={13} anchor="middle" width={100} color="#525252" tex={String.raw`m \times 1`} />
          <path d="M135 212 V230 H337 V200" fill="none" stroke="var(--accent)" strokeDasharray="4 4" />
          <SvgMath x={237} y={254} size={14} anchor="middle" width={320} color="var(--accent)" tex={String.raw`\text{Inner dimensions must match: } n`} />
          <SvgMath x={492} y={202} size={14} anchor="middle" width={100} color="#525252" tex={String.raw`m\text{ outputs}`} />
        </svg>
      </div>
      <figcaption><MathText>{"Figure 3-3. The number of columns of W must match the input dimension. The number of rows determines the output dimension: $(m\\times n)\\times(n\\times1)=(m\\times1)$."}</MathText></figcaption>
    </figure>
  );
}
