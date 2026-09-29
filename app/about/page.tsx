export default function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-20 sm:px-8">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
        About
      </h1>

      <div className="mt-16 grid gap-10 border-t border-neutral-200 pt-16 md:grid-cols-[1fr_2fr]">
        <h2 className="text-3xl font-semibold tracking-tight">
          A little about me
        </h2>

        <div className="max-w-2xl">
          <div className="space-y-5 text-lg leading-8 text-neutral-600">
            <p>
              I&apos;m currently completing an MSc in Computer Science at
              University College Dublin.
            </p>

            <p>
              Most of my work so far has focused on backend and full-stack
              development. I enjoy understanding how systems work underneath,
              from APIs and databases to distributed systems and messaging.
            </p>

            <p>
              I&apos;m also exploring practical AI engineering and looking for
              graduate software engineering opportunities where I can keep
              learning while working on real products.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-6 text-sm">
            <a
              href="https://github.com/Derek376"
              target="_blank"
              rel="noreferrer"
              className="border-b border-neutral-300 pb-1 transition-colors hover:border-neutral-900"
            >
              GitHub ↗
            </a>

            <a
              href="https://www.linkedin.com/in/yangliu123/"
              target="_blank"
              rel="noreferrer"
              className="border-b border-neutral-300 pb-1 transition-colors hover:border-neutral-900"
            >
              LinkedIn ↗
            </a>

            <a
              href="/cv.pdf"
              target="_blank"
              className="border-b border-neutral-300 pb-1 transition-colors hover:border-neutral-900"
            >
              CV ↗
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
