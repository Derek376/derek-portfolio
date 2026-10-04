# Learning series

Lesson text lives in `.mdx` files here. MDX lets a readable Markdown article include a React diagram or exercise.

To publish another lesson:

1. Translate the permitted source into a new `.mdx` file. Include stable `id` attributes on section headings.
2. Add its section IDs and titles in `data/llm-course.ts`, and mark that lesson available. These sections appear in the right-hand table of contents; the left-hand navigation lists lessons only.
3. Import its MDX file and register it in `lessonContent` in `app/notes/llm/[lesson]/page.tsx`.
4. Add its description and sections to `publishedLessons` in `data/llm-course.ts`. The availability count and previous/next links are derived from the course data.

Only registered lessons have local routes. Unavailable lessons remain plain text until their content is ready.

Static text and diagrams render on the server. The animal map, quiz and active table of contents use small Client Components. Content is stored locally.


## Mathematics

Use `$...$` for inline formulas and `$$` on separate lines for display equations:

```md
The dot product is $\mathbf{a}\cdot\mathbf{b}$.

$$
W=\begin{bmatrix}2&1\\1&2\end{bmatrix}
$$
```

The MDX pipeline uses `remark-math` and `rehype-katex`. KaTeX CSS and fonts are loaded locally by the course layout. Invalid formulas fail the build instead of silently displaying broken notation.

For JSX attributes (such as a `ThoughtExercise` question), write `$...$` inside the string; these use the server `MathText` component. In `.tsx` diagrams, use `MathFormula` with `String.raw` for TeX strings, or `SvgMath` for SVG labels. Ordinary axis tick values and data tables remain numbers. Formulas in quiz text are also rendered on the server and passed into the interactive quiz as React content.
