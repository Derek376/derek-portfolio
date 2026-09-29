import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { blogs } from "@/data/blogs";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <Header />
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        <section className="flex min-h-[70vh] items-center">
          <div className="max-w-3xl">
            <p className="mb-5 text-sm text-neutral-500">
              MSc Student · University College Dublin
            </p>

            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
              Hi, I&apos;m Derek.
            </h1>

            <div className="mt-7 max-w-2xl space-y-4 text-lg leading-8 text-neutral-600 sm:text-xl">
              <p>
                I&apos;m an MSc student at University College Dublin interested
                in backend and full-stack software development.
              </p>

              <p>
                I enjoy building practical applications, exploring how modern
                systems work, and continuously learning new technologies —
                currently with a growing focus on AI.
              </p>
            </div>

            <div className="-ml-2 mt-6 flex items-center gap-2 text-neutral-500">
              <a
                href="https://github.com/Derek376"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-10 w-10 items-center justify-center transition-colors hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
              >
                <svg viewBox="0 0 16 16" className="h-5 w-5 fill-current" aria-hidden="true">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.65 7.65 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
                </svg>
              </a>

              <a
                href="https://www.linkedin.com/in/yangliu123/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center transition-colors hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
              >
                <svg viewBox="0 0 16 16" className="h-5 w-5 fill-current" aria-hidden="true">
                  <path d="M0 1.15C0 .52.53 0 1.18 0h13.64C15.47 0 16 .52 16 1.15v13.7c0 .63-.53 1.15-1.18 1.15H1.18C.53 16 0 15.48 0 14.85V1.15ZM4.75 13.4V6.17H2.34v7.23h2.41ZM3.55 5.18a1.4 1.4 0 1 0 0-2.8 1.4 1.4 0 0 0 0 2.8ZM13.4 13.4V9.43c0-2.13-1.14-3.12-2.66-3.12a2.3 2.3 0 0 0-2.07 1.14V6.17H6.27c.03.85 0 7.23 0 7.23h2.4V9.36c0-.22.02-.43.08-.59.17-.43.54-.88 1.18-.88.83 0 1.16.63 1.16 1.56v3.95h2.31Z" />
                </svg>
              </a>

              <a
                href="mailto:yang.liu.jobs@outlook.com"
                aria-label="Email yang.liu.jobs@outlook.com"
                className="flex h-10 w-10 items-center justify-center transition-colors hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 fill-none stroke-current stroke-[1.75]"
                  aria-hidden="true"
                >
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3.5 6 8.5 7 8.5-7" />
                </svg>
              </a>
            </div>

            <Link
              href="/about"
              className="mt-6 inline-block border-b border-neutral-300 pb-1 text-sm transition-colors hover:border-neutral-900"
            >
              Learn more about me →
            </Link>
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
                  <h3 className="text-lg font-medium">
                    {project.detailHref ? (
                      <Link
                        href={project.detailHref}
                        className="group inline-flex items-center gap-2 transition-colors hover:text-neutral-500"
                      >
                        {project.title}

                        <span className="text-neutral-400 transition-transform group-hover:translate-x-1">
                          →
                        </span>
                      </Link>
                    ) : (
                      project.title
                    )}
                  </h3>

                  <p className="mt-2 text-sm text-neutral-500">
                    {project.technologies}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
                    {project.repositories.map((repository) => (
                      <a
                        key={repository.href}
                        href={repository.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-600 underline decoration-neutral-300 underline-offset-4 transition-colors hover:text-neutral-900"
                      >
                        {repository.label} ↗
                      </a>
                    ))}
                  </div>
                </div>

                <p className="max-w-xl leading-7 text-neutral-600">
                  {project.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section id="blogs" className="py-24">
          <div className="mb-12">
            <p className="mb-3 text-sm text-neutral-500">
              Short reads
            </p>

            <h2 className="text-3xl font-semibold tracking-tight">Blogs</h2>
          </div>

          <div className="border-t border-neutral-200">
            {blogs.map((blog) => (
              <article
                key={blog.title}
                className="grid gap-3 border-b border-neutral-200 py-7 md:grid-cols-[2fr_1fr]"
              >
                <div>
                  <h3 className="text-lg font-medium">
                    {blog.href ? (
                      <Link
                        href={blog.href}
                        className="group inline-flex items-center gap-2 transition-colors hover:text-neutral-500"
                      >
                        {blog.title}

                        <span className="text-neutral-400 transition-transform group-hover:translate-x-1">
                          →
                        </span>
                      </Link>
                    ) : (
                      blog.title
                    )}
                  </h3>

                  <p className="mt-2 text-sm text-neutral-500">
                    {blog.category}
                  </p>
                </div>

                <p className="text-sm text-neutral-500 md:text-right">
                  {blog.date}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section id="notes" className="py-24">
          <div className="grid gap-10 border-t border-neutral-200 pt-16 md:grid-cols-[1fr_2fr]">
            <h2 className="text-3xl font-semibold tracking-tight">Notes</h2>

            <div className="max-w-2xl">
              <p className="text-lg leading-8 text-neutral-600">
                Longer learning records where I work through topics in more
                detail.
              </p>

              <Link
                href="/notes"
                className="mt-8 inline-block border-b border-neutral-300 pb-1 text-sm transition-colors hover:border-neutral-900"
              >
                View notes →
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
