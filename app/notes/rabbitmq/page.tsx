import Link from "next/link";

export default function RabbitMQNote() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-20 sm:px-8">
      <Link
        href="/"
        className="text-sm text-neutral-500 transition-colors hover:text-neutral-900"
      >
        ← Back
      </Link>

      <header className="mt-16">
        <p className="text-sm text-neutral-500">
          Distributed Systems · Sep 2026
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          Understanding Asynchronous Messaging with RabbitMQ
        </h1>

        <p className="mt-6 text-lg leading-8 text-neutral-600">
          Notes from learning asynchronous messaging and building a simple
          producer-consumer system with RabbitMQ.
        </p>
      </header>

      <div className="mt-16 space-y-12 text-[17px] leading-8 text-neutral-700">
        <section>
          <h2 className="mb-4 text-2xl font-semibold tracking-tight text-neutral-900">
            Why asynchronous messaging?
          </h2>

          <p>
            In a synchronous system, one service sends a request to another
            service and waits for a response. This is simple, but it also means
            the first service depends directly on the second service being
            available and responding quickly.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold tracking-tight text-neutral-900">
            Where RabbitMQ fits
          </h2>

          <p>
            RabbitMQ sits between the producer and the consumer. Instead of
            calling the consumer directly, the producer sends a message to a
            queue. The consumer can then process that message independently.
          </p>
        </section>
      </div>
    </article>
  );
}
