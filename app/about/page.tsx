export default function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-20 sm:px-8">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
        About Me
      </h1>

      <div className="mt-16 grid gap-10 border-t border-neutral-200 pt-16 md:grid-cols-[1fr_2fr]">
        <h2 className="text-3xl font-semibold tracking-tight">
          Hi, I&apos;m Derek.
        </h2>

        <div className="max-w-2xl">
          <div className="space-y-6 text-lg leading-8 text-neutral-600">
            <p>
              I&apos;m currently pursuing an MSc at University College Dublin,
              where I&apos;m continuing to develop my knowledge of software
              engineering, distributed systems, information security, and modern
              application development.
            </p>

            <p>
              My main interest is software engineering, especially backend and
              full-stack development. I enjoy understanding how different parts
              of a system work together — from APIs and databases to frontend
              interfaces and distributed services.
            </p>

            <p>
              Most of my experience so far comes from university and personal
              projects. Through these projects, I&apos;ve worked with
              technologies such as Java, Python, JavaScript/TypeScript, Flask,
              databases, REST APIs, and modern web development tools. I
              particularly enjoy the process of taking an idea, breaking it
              into smaller technical problems, and gradually turning it into a
              working application.
            </p>

            <p>
              Recently, I&apos;ve also become increasingly interested in AI and
              how it can be integrated into real software products. I&apos;m
              currently expanding my knowledge in this area and working towards
              building AI-related projects alongside my existing software
              engineering experience.
            </p>

            <p>
              Outside of individual technologies, I care about becoming a better
              problem solver. I regularly practise data structures and
              algorithms, explore new tools, and try to understand not only how
              to use a technology, but also why it works the way it does.
            </p>

            <p>
              I&apos;m currently preparing for graduate and junior software
              engineering opportunities, particularly roles involving backend,
              full-stack, or general software development.
            </p>

            <p>
              I&apos;m always interested in learning, building, and working on
              problems that help me become a better engineer.
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
