import Link from "next/link";
import { blogs } from "@/data/blogs";

export default function BlogsPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-20 sm:px-8">
      <div className="max-w-2xl">
        <p className="text-sm text-neutral-500">Short reads</p>

        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          Blogs
        </h1>

        <p className="mt-6 text-lg leading-8 text-neutral-600">
          Short posts about software engineering, distributed systems,
          algorithms, and things I learn while building projects.
        </p>
      </div>

      <div className="mt-16 border-t border-neutral-200">
        {blogs.map((blog) => (
          <article
            key={blog.title}
            className="grid gap-3 border-b border-neutral-200 py-8 md:grid-cols-[2fr_1fr]"
          >
            <div>
              <h2 className="text-lg font-medium">
                {blog.href ? (
                  <Link
                    href={blog.href}
                    className="group inline-flex items-center gap-2 transition-colors hover:text-neutral-500"
                  >
                    {blog.title}

                    <span className="text-neutral-400 transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                ) : (
                  blog.title
                )}
              </h2>

              <p className="mt-2 text-sm text-neutral-500">{blog.category}</p>
            </div>

            <p className="text-sm text-neutral-500 md:text-right">
              {blog.date}
            </p>
          </article>
        ))}
      </div>
    </main>
  );
}
