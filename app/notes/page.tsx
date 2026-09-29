import Link from "next/link";

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

export default function NotesPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-20 sm:px-8">
      <div className="max-w-2xl">
        <p className="text-sm text-neutral-500">Writing</p>

        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          Notes
        </h1>

        <p className="mt-6 text-lg leading-8 text-neutral-600">
          Notes about software engineering, distributed systems, algorithms, and
          things I learn while building projects.
        </p>
      </div>

      <div className="mt-16 border-t border-neutral-200">
        {notes.map((note) => (
          <article
            key={note.title}
            className="grid gap-3 border-b border-neutral-200 py-8 md:grid-cols-[2fr_1fr]"
          >
            <div>
              <h2 className="text-lg font-medium">
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
              </h2>

              <p className="mt-2 text-sm text-neutral-500">{note.category}</p>
            </div>

            <p className="text-sm text-neutral-500 md:text-right">
              {note.date}
            </p>
          </article>
        ))}
      </div>
    </main>
  );
}
