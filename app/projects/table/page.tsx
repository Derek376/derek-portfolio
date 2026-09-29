import Link from "next/link";
import { tableProject } from "@/data/projects";

export default function TableProject() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20 sm:px-8">
      <Link
        href="/projects"
        className="text-sm text-neutral-500 transition-colors hover:text-neutral-900"
      >
        ← Back to projects
      </Link>

      <header className="mt-16">
        <p className="text-sm text-neutral-500">Backend team project</p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          Tablé
        </h1>

        <p className="mt-6 text-lg leading-8 text-neutral-600">
          A team-built platform for immediate dining reservations and private,
          time-limited offers.
        </p>

        <p className="mt-5 text-sm text-neutral-500">
          {tableProject.technologies}
        </p>

        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {tableProject.repositories.map((repository) => (
            <a
              key={repository.href}
              href={repository.href}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-neutral-300 pb-1 transition-colors hover:border-neutral-900"
            >
              {repository.label} ↗
            </a>
          ))}
        </div>
      </header>

      <div className="mt-16 space-y-14 text-[17px] leading-8 text-neutral-700">
        <section>
          <h2 className="mb-4 text-2xl font-semibold tracking-tight text-neutral-900">
            Overview
          </h2>

          <p>
            Diners can discover nearby restaurants with available tables and
            request a booking based on their travel time. Restaurant operators
            can manage availability and release a limited number of private
            offers. The web and mobile clients share an Express API backed by
            PostgreSQL.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold tracking-tight text-neutral-900">
            My backend work
          </h2>

          <p>
            I led the API gateway and database schema work, including
            authentication, restaurant and booking flows, offers, campaigns,
            and ETA endpoints. I also worked on booking lifecycle handling,
            rate limiting, and database backup and recovery planning.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold tracking-tight text-neutral-900">
            Booking flow
          </h2>

          <p>
            The API checks a diner&apos;s travel ETA against the restaurant&apos;s
            hold window before confirming an immediate booking. It can use a
            local distance estimate when external route data is unavailable.
            Booking and offer actions update the shared inventory and campaign
            state used by both clients.
          </p>
        </section>
      </div>
    </main>
  );
}
