import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between py-8">
      <Link href="/" className="text-base font-semibold tracking-tight">
        Derek
      </Link>

      <nav className="flex gap-6 text-sm text-neutral-500">
        <Link
          href="/#projects"
          className="transition-colors hover:text-neutral-900"
        >
          Projects
        </Link>

        <Link
          href="/notes"
          className="transition-colors hover:text-neutral-900"
        >
          Notes
        </Link>

        <Link
          href="/#about"
          className="transition-colors hover:text-neutral-900"
        >
          About
        </Link>
      </nav>
    </header>
  );
}
