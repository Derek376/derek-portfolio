import Link from "next/link";

export default function ProxyBlog() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-20 sm:px-8">
      <Link
        href="/blogs"
        className="text-sm text-neutral-500 transition-colors hover:text-neutral-900"
      >
        ← Back
      </Link>

      <header className="mt-16">
        <p className="text-sm text-neutral-500">Computer Networks · Nov 2025</p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          Proxy vs Reverse Proxy: A Simple Mental Model
        </h1>
      </header>

      <div className="mt-12 space-y-6 text-[17px] leading-8 text-neutral-700">
        <p>
          Proxy and reverse proxy were two networking concepts that I found
          surprisingly confusing at first.
        </p>

        <p>The easiest way I now remember the difference is:</p>

        <pre className="overflow-x-auto border-y border-neutral-200 py-4 font-mono text-sm text-neutral-900">
          <code>{"Proxy → hides the client\nReverse Proxy → hides the server"}</code>
        </pre>

        <p>A forward proxy sits between a client and the internet.</p>

        <pre className="overflow-x-auto border-y border-neutral-200 py-4 font-mono text-sm text-neutral-900">
          <code>Client → Proxy → Server</code>
        </pre>

        <p>
          The server communicates with the proxy instead of directly seeing the
          original client.
        </p>

        <p>A reverse proxy works from the other direction.</p>

        <pre className="overflow-x-auto border-y border-neutral-200 py-4 font-mono text-sm text-neutral-900">
          <code>Client → Reverse Proxy → Backend Server</code>
        </pre>

        <p>
          The client communicates with the reverse proxy without necessarily
          knowing which backend server handles the request.
        </p>

        <p>
          Reverse proxies are commonly used for things like load balancing, HTTPS
          termination, routing requests, and protecting backend services.
        </p>

        <p>
          For example, a website might have several backend servers, but users
          only connect to one public address. A reverse proxy such as Nginx can
          decide which backend should receive each request.
        </p>

        <p>
          Learning this distinction also helped me understand modern web
          architectures better, especially how frontend applications, APIs,
          gateways, and backend services communicate.
        </p>
      </div>
    </article>
  );
}
