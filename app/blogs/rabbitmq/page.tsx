import Link from "next/link";

export default function RabbitMQBlog() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-20 sm:px-8">
      <Link
        href="/blogs"
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

      </header>

      <div className="mt-12 space-y-6 text-[17px] leading-8 text-neutral-700">
        <p>
          When I first learned about distributed systems, one thing that
          confused me was why services sometimes communicate through message
          queues instead of calling each other directly.
        </p>

        <p>RabbitMQ helped make this idea much clearer.</p>

        <p>
          In a traditional synchronous request, one service sends a request to
          another service and waits for a response. This works well in many
          cases, but it also means the two services depend on each other being
          available at the same time.
        </p>

        <p>
          With asynchronous messaging, the producer sends a message to RabbitMQ
          instead. A consumer can then receive and process that message
          separately.
        </p>

        <p>A simple mental model is:</p>

        <pre className="overflow-x-auto border-y border-neutral-200 py-4 font-mono text-sm text-neutral-900">
          <code>Producer → RabbitMQ → Consumer</code>
        </pre>

        <p>
          This can be useful for tasks such as sending emails, processing files,
          handling background jobs, or communicating between microservices.
        </p>

        <p>
          What I find most interesting is that RabbitMQ is not just about
          creating a queue. It helps reduce direct dependencies between
          different parts of a system.
        </p>

        <p>
          Working with RabbitMQ also helped me better understand concepts such
          as producers, consumers, message acknowledgements, queues, and
          message brokers.
        </p>

        <p>
          It was one of the first technologies that made distributed systems
          feel less theoretical and more like something I could actually build.
        </p>
      </div>
    </article>
  );
}
