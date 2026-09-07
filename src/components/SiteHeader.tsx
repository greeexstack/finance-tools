import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-slate-900"
        >
          Finance Tools
        </Link>

        <nav className="flex items-center gap-5 text-sm font-medium text-slate-600">
          <Link
            href="/"
            className="transition hover:text-slate-900"
          >
            Home
          </Link>

          <Link
            href="/fd-calculator"
            className="transition hover:text-slate-900"
          >
            FD
          </Link>

          <Link
            href="/rd-calculator"
            className="transition hover:text-slate-900"
          >
            RD
          </Link>

          <Link
            href="/pf-calculator"
            className="transition hover:text-slate-900"
          >
            PF
          </Link>

          <Link
            href="/swp-calculator"
            className="transition hover:text-slate-900"
          >
            SWP
          </Link>
        </nav>
      </div>
    </header>
  );
}