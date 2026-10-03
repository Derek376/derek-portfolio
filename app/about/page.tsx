export default function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-20 sm:px-8">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
        About Me
      </h1>

      <div className="mt-16 grid gap-10 border-t border-neutral-200 pt-16 md:grid-cols-[1fr_2fr]">
        <h2 className="text-3xl font-semibold tracking-tight">
          Hi, I&apos;m Derek.
        </h2>

        <div className="max-w-2xl">
          <div className="space-y-6 text-lg leading-8 text-neutral-600">
            <p>
              This is my personal website, where I share things I find
              interesting, random thoughts, and probably some stuff that nobody
              asked for — but that's fine.
            </p>

            <p>
              I'm the kind of person who genuinely enjoys learning new things.
              It's one of the few things that can make me feel real excitement
              and satisfaction. I find joy in the process of discovery and
              understanding. There's a quote I really like: “Education is what
              remains after you have forgotten what you learned in school.” I
              think that describes quite well how I see learning.
            </p>

            <p>
              I have a few things I truly enjoy — coding, gaming, reading, and
              having deep conversations. They might seem quite different, but to
              me they all have something in common: they give me a chance to
              step away from the repetitive and practical side of everyday life,
              even just for a while.
            </p>

            <p>
              I sometimes feel it's quite impressive that we humans can live our
              lives knowing that one day, inevitably, they will come to an end —
              and still manage to care, create, learn, love, and find things
              worth doing.
            </p>

            <p>
              So I guess my philosophy is pretty simple: don't spend too much of
              your life worrying about trivial things. Focus on what truly
              matters to you and pursue it with passion. Find something you
              genuinely enjoy, keep doing it, and see where it takes you.
            </p>

            <p>Good luck, my friend.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
