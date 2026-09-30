import Link from "next/link";

export default function SecurityBlog() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-20 sm:px-8">
      <Link
        href="/blogs"
        className="text-sm text-neutral-500 transition-colors hover:text-neutral-900"
      >
        ← Back
      </Link>

      <header className="mt-16">
        <p className="text-sm text-neutral-500">Information Security · Sep 2026</p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          Why Information Security Is More Than Passwords
        </h1>
      </header>

      <div className="mt-12 space-y-6 text-[17px] leading-8 text-neutral-700">
        <p>
          Before studying information security, I mostly associated security
          with strong passwords, encryption, and preventing hackers from
          accessing a system.
        </p>

        <p>I now see it as a much broader part of software engineering.</p>

        <p>One useful concept is the CIA triad:</p>

        <p>
          <strong className="font-semibold text-neutral-900">Confidentiality</strong>{" "}
          means information should only be accessible to authorised users.
        </p>

        <p>
          <strong className="font-semibold text-neutral-900">Integrity</strong>{" "}
          means information should not be changed incorrectly or without
          permission.
        </p>

        <p>
          <strong className="font-semibold text-neutral-900">Availability</strong>{" "}
          means legitimate users should be able to access the system when they
          need it.
        </p>

        <p>
          This means a system can have a security problem even if no data is
          stolen. For example, an attacker could modify important information or
          make a service unavailable.
        </p>

        <p>Security also affects everyday development decisions.</p>

        <p>
          Developers need to think about input validation, authentication,
          authorisation, password storage, API access, logging, and protecting
          sensitive data.
        </p>

        <p>
          The biggest change in my thinking is that security should not be
          something added after an application is finished.
        </p>

        <p>When building software, I now try to think about two questions:</p>

        <p>
          <strong className="font-semibold text-neutral-900">Does it work?</strong>
        </p>

        <p>and</p>

        <p>
          <strong className="font-semibold text-neutral-900">
            What could go wrong?
          </strong>
        </p>

        <p>
          That second question is becoming an important part of how I think
          about software development.
        </p>
      </div>
    </article>
  );
}
