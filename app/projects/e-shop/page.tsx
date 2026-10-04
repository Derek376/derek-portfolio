import Link from "next/link";
import EShopArchitecture from "@/components/projects/EShopArchitecture";
import { eShopProject } from "@/data/projects";

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
          A React storefront backed by a Spring Boot API for customer, seller,
          and administrator workflows.
        </p>

        <p className="mt-5 text-sm text-neutral-500">
          {eShopProject.technologies}
        </p>

        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <a
            href={eShopProject.liveDemo}
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-neutral-300 pb-1 transition-colors hover:border-neutral-900"
          >
            Live demo ↗
          </a>
          {eShopProject.repositories.map((repository) => (
            <a
              key={repository.href}
              href={repository.href}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-neutral-300 pb-1 transition-colors hover:border-neutral-900"
            >
              {repository.label} repository ↗
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
            The frontend covers product discovery, cart and checkout, order
            history, and separate seller and administrator dashboards. The API
            manages authentication, catalogue data, orders, and payments.
          </p>
        </section>

        <section id="architecture" className="scroll-mt-32">
          <h2 className="mb-4 text-2xl font-semibold tracking-tight text-neutral-900">
            Architecture
          </h2>
          <p>
            The React storefront communicates with a Spring Boot REST API.
            Authentication uses an HTTP-only JWT cookie, with a CSRF token for
            state-changing requests.
          </p>
          <EShopArchitecture />
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold tracking-tight text-neutral-900">
            Engineering decisions
          </h2>

          <p>
            Authentication uses an HTTP-only cookie and CSRF protection. The
            server calculates checkout totals from the cart, verifies Stripe
            payments before creating orders, and locks product rows while
            updating stock. Dashboard sorting and pagination live in the URL
            so the view survives navigation and refreshes.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold tracking-tight text-neutral-900">
            Testing and delivery
          </h2>

          <p>
            The repositories include frontend and backend test suites and
            GitHub Actions checks. The React app is deployed on Vercel, while
            the API runs as a Docker service on Northflank with PostgreSQL on
            Neon.
          </p>
        </section>
      </div>
    </main>
  );
}
