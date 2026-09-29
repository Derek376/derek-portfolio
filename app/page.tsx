import Link from "next/link";

const projects = [
  {
    title: "E-Shop",
    description:
      "A full-stack e-commerce application with authentication, Stripe payments, transactional operations, continuous integration, and automated testing.",
    technologies: "Java · Spring Boot · React · PostgreSQL",
  },
  {
    title: "Tablé",
    description:
      "A team project where I focused on backend development, API design, external service integrations, and rate limiting.",
    technologies: "Express · PostgreSQL · REST APIs",
  },
  {
    title: "Dublin Bikes",
    description:
      "A web application built around Dublin Bikes data, with external API integration, mapping, predictive features, and automated testing.",
    technologies: "Python · Flask · MySQL",
  },
];

const notes = [
  {
    title: "Understanding Asynchronous Messaging with RabbitMQ",
    category: "Distributed Systems",
    date: "Sep 2026",
    href: "/notes/rabbitmq",
  },
  {
    title: "Proxy vs Reverse Proxy: A Simple Mental Model",
    category: "Computer Networks",
    date: "Sep 2026",
  },
  {
    title: "How I Think About BFS",
    category: "Algorithms",
    date: "Sep 2026",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        <header className="flex items-center justify-between py-8">
          <a href="/" className="text-base font-semibold tracking-tight">
            Derek
          </a>

          <nav className="flex gap-6 text-sm text-neutral-500">
            <a
              href="#projects"
              className="transition-colors hover:text-neutral-900"
            >
              Projects
            </a>

            <a
              href="#notes"
              className="transition-colors hover:text-neutral-900"
            >
              Notes
            </a>

            <a
              href="#about"
              className="transition-colors hover:text-neutral-900"
            >
              About
            </a>
          </nav>
        </header>

        <section className="flex min-h-[70vh] items-center">
          <div className="max-w-3xl">
            <p className="mb-5 text-sm text-neutral-500">
              MSc Student · University College Dublin
            </p>

            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
              Hi, I&apos;m Derek.
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-neutral-600 sm:text-xl">
              I&apos;m interested in building reliable software, especially
              backend systems, distributed applications, and practical AI
              projects.
            </p>
          </div>
        </section>

        <section id="projects" className="py-24">
          <div className="mb-12">
            <p className="mb-3 text-sm text-neutral-500">Selected work</p>

            <h2 className="text-3xl font-semibold tracking-tight">Projects</h2>
          </div>

          <div className="border-t border-neutral-200">
            {projects.map((project) => (
              <article
                key={project.title}
                className="grid gap-4 border-b border-neutral-200 py-8 md:grid-cols-[1fr_2fr]"
              >
                <div>
                  <h3 className="text-lg font-medium">{project.title}</h3>

                  <p className="mt-2 text-sm text-neutral-500">
                    {project.technologies}
                  </p>
                </div>

                <p className="max-w-xl leading-7 text-neutral-600">
                  {project.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section id="notes" className="py-24">
          <div className="mb-12">
            <p className="mb-3 text-sm text-neutral-500">
              Things I&apos;m learning
            </p>

            <h2 className="text-3xl font-semibold tracking-tight">Notes</h2>
          </div>

          <div className="border-t border-neutral-200">
            {notes.map((note) => (
              <article
                key={note.title}
                className="grid gap-3 border-b border-neutral-200 py-7 md:grid-cols-[2fr_1fr]"
              >
                <div>
                  <h3 className="text-lg font-medium">
                    {note.href ? (
                      <Link
                        href={note.href}
                        className="group inline-flex items-center gap-2 transition-colors hover:text-neutral-500"
                      >
                        {note.title}

                        <span className="text-neutral-400 transition-transform group-hover:translate-x-1">
                          →
                        </span>
                      </Link>
                    ) : (
                      note.title
                    )}
                  </h3>

                  <p className="mt-2 text-sm text-neutral-500">
                    {note.category}
                  </p>
                </div>

                <p className="text-sm text-neutral-500 md:text-right">
                  {note.date}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section id="about" className="py-24">
          <div className="grid gap-10 border-t border-neutral-200 pt-16 md:grid-cols-[1fr_2fr]">
            <div>
              <p className="text-sm text-neutral-500">About</p>
            </div>

            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight">
                A little about me
              </h2>

              <div className="mt-7 space-y-5 text-lg leading-8 text-neutral-600">
                <p>
                  I&apos;m currently completing an MSc in Computer Science at
                  University College Dublin.
                </p>

                <p>
                  Most of my work so far has focused on backend and full-stack
                  development. I enjoy understanding how systems work
                  underneath, from APIs and databases to distributed systems and
                  messaging.
                </p>

                <p>
                  I&apos;m also exploring practical AI engineering and looking
                  for graduate software engineering opportunities where I can
                  keep learning while working on real products.
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
        </section>

        <footer className="border-t border-neutral-200 py-10">
          <div className="flex flex-col gap-3 text-sm text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 Derek</p>

            <p>Built with Next.js and TypeScript.</p>
          </div>
        </footer>
      </div>
    </main>
  );
}
