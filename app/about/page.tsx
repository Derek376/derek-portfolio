export default function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-20 sm:px-8">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
        About Me
      </h1>

      <div className="mt-16 grid gap-10 border-t border-neutral-200 pt-16 md:grid-cols-[1fr_2fr]">
        <h2 className="text-3xl font-semibold tracking-tight">
          Hi, I’m Derek (Yang) Liu.
        </h2>

        <div className="max-w-2xl">
          <div className="space-y-6 text-lg leading-8 text-neutral-600">
            <p>
              I’m currently studying for an MSc in Computer Science at
              University College Dublin, and I’m mainly interested in backend
              and full-stack software development.
            </p>

            <p>
              Most of my recent work has been around Java, Spring Boot, React,
              PostgreSQL and Docker. I enjoy building applications from end to
              end, but I’m especially interested in what happens behind the
              interface — how APIs are designed, how data is stored safely, how
              different services communicate, and how systems behave when
              something goes wrong.
            </p>

            <p>
              I usually learn best by building things. Instead of only following
              tutorials, I like turning what I learn into small projects and
              then gradually making them more realistic. Recently, I’ve been
              learning more about distributed systems, asynchronous messaging
              with RabbitMQ, microservices, API gateways and resilient backend
              design.
            </p>

            <p>
              Outside of coding, I enjoy gaming, music, reading, playing piano
              and learning about things that are not always related to
              technology. I also like writing notes about topics I’ve recently
              learned, because explaining something in simple words helps me
              understand it better.
            </p>

            <p>
              At the moment, I’m looking for graduate software engineering
              opportunities where I can keep improving as an engineer, work on
              real systems, and learn from experienced developers.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
