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
      </div>
    </main>
  );
}
