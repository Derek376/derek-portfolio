import Link from "next/link";
import { dublinBikesProject } from "@/data/projects";

export default function DublinBikesProject() {
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
          Dublin Bikes
        </h1>

        <p className="mt-6 text-lg leading-8 text-neutral-600">
          A web app for exploring bike station availability, weather, historical
          trends, and predicted occupancy.
        </p>

        <p className="mt-5 text-sm text-neutral-500">
          {dublinBikesProject.technologies}
        </p>

        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {dublinBikesProject.repositories.map((repository) => (
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
            This team project combines a Flask application, MySQL data storage,
            external station and weather APIs, and an interactive map. Visitors
            can check station availability and explore historical occupancy
            alongside current weather information.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold tracking-tight text-neutral-900">
            My backend work
          </h2>

          <p>
            I spent most of my time on the backend. The project collects
            station data from JCDecaux and weather data from OpenWeather, stores
            records in MySQL, and serves the data through Flask routes for the
            web interface.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold tracking-tight text-neutral-900">
            Prediction work
          </h2>

          <p>
            I also contributed to a smaller part of the prediction work. The
            application uses a scikit-learn model trained on historical bike
            occupancy and weather-related features to estimate availability.
            The Flask backend exposes those predictions to the interface.
          </p>
        </section>
      </div>
    </main>
  );
}
