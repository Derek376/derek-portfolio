<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Course lesson numbering

When adding or renaming a course lesson, verify the existing chapter order first.
Every lesson must have a unique global lesson number and full slug. Neural network
chapter slugs must use consecutive local prefixes `nn-01-` through `nn-07-` in
chapter order. Large language model slugs must likewise use `tf-01-` through
`tf-12-` in chapter order: Transformer is `tf-03-transformer`, followed by
`tf-04-tokenizer`. Source website slugs may omit or misnumber a lesson; use the
local syllabus order for route names and verify the source lesson by its title. Do not copy incorrect numbering from the source website. Keep MDX
filenames, imports, course data and route registry consistent; preserve published
old URLs with redirects when renaming. Run the course validation through the build.
