import MathFormula, { MathText } from "./Math";
import { BowlExplorer, SecantExplorer } from "./GradientExplorers";

export function SecantLimit() {
  return <figure>
    <SecantExplorer deltaLabel={<MathFormula tex={String.raw`\Delta x`} />} slopeLabel={<MathFormula tex={String.raw`\frac{\Delta h}{\Delta x}`} />} curveLabel={<MathFormula tex={String.raw`h(x)=(x-4)^2`} />} />
    <figcaption><MathText>{String.raw`Figure 5-3. Reduce $\Delta x$ to bring Q towards P. The teal secant approaches the dashed tangent, and its slope approaches $-6$. The slider illustrates the limit without setting $\Delta x=0$, where the difference quotient is undefined.`}</MathText></figcaption>
  </figure>;
}

export function BowlSurface() {
  return <figure>
    <BowlExplorer />
    <figcaption><MathText>{String.raw`Figure 5-5. The surface $h(x,y)=(x-4)^2+(y-2)^2$ is a bowl. The coloured point is $(1,5)$ and the dark point is the minimum $(4,2)$. Rotate the view to inspect the height above the ground plane.`}</MathText></figcaption>
  </figure>;
}
