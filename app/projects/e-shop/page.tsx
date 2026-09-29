import Link from "next/link";

export default function EShopProject() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20 sm:px-8">
      <Link
        href="/projects"
        className="text-sm text-neutral-500 transition-colors hover:text-neutral-900"
      >
        ← Back to projects
      </Link>

      <header className="mt-16">
        <p className="text-sm text-neutral-500">Full-stack project</p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          E-Shop
        </h1>

        <p className="mt-6 text-lg leading-8 text-neutral-600">
          A full-stack e-commerce application built with Spring Boot, React, and
          PostgreSQL.
        </p>

        <p className="mt-5 text-sm text-neutral-500">
          Java · Spring Boot · React · PostgreSQL · Stripe
        </p>
      </header>

      <div className="mt-16 space-y-14 text-[17px] leading-8 text-neutral-700">
        <section>
          <h2 className="mb-4 text-2xl font-semibold tracking-tight text-neutral-900">
            Overview
          </h2>

          <p>
            E-Shop is a full-stack e-commerce application that I worked on
            during my studies. The project gave me experience connecting a
            frontend application to a Spring Boot backend and a relational
            database.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold tracking-tight text-neutral-900">
            What I worked on
          </h2>

          <p>
            The application includes user authentication, product and order
            workflows, Stripe payments, transactional operations, continuous
            integration, and automated testing.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold tracking-tight text-neutral-900">
            What I learned
          </h2>

          <p>
            This project helped me understand how different parts of a
            full-stack application fit together, especially the relationship
            between REST APIs, database operations, frontend state, testing, and
            external services.
          </p>
        </section>
      </div>
    </main>
  );
}
