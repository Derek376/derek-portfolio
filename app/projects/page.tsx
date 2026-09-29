import Link from "next/link";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-20 sm:px-8">
      <div className="max-w-2xl">
        <p className="text-sm text-neutral-500">Selected work</p>

        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          Projects
        </h1>

        <p className="mt-6 text-lg leading-8 text-neutral-600">
          A collection of software projects I have built while learning backend
          development, full-stack engineering, and distributed systems.
        </p>
      </div>

      <div className="mt-16 border-t border-neutral-200">
        {projects.map((project) => (
          <article
            key={project.slug}
            className="grid gap-4 border-b border-neutral-200 py-8 md:grid-cols-[1fr_2fr]"
          >
            <div>
              <h2 className="text-lg font-medium">
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
              </h2>

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
    </main>
  );
}
