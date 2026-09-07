import Link from "next/link";

const navigation = [
  { name: "Home", href: "/" },
  { name: "FD", href: "/fd-calculator" },
  { name: "RD", href: "/rd-calculator" },
  { name: "PF", href: "/pf-calculator" },
  { name: "SWP", href: "/swp-calculator" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto w-full max-w-6xl px-3 sm:px-6 lg:px-8">
        <div className="flex min-h-16 items-center justify-between gap-3">
          {/* Brand */}
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-2.5"
          >
            <span
              aria-hidden="true"
              className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-slate-900 shadow-sm"
            >
              <span className="absolute h-4 w-4 rounded-full bg-indigo-500" />
              <span className="absolute h-2 w-2 rounded-full bg-white" />
            </span>

            <span className="text-[15px] font-bold tracking-tight text-slate-900 sm:text-base">
              Finance Tools
            </span>
          </Link>

          {/* Navigation */}
          <nav
            aria-label="Main navigation"
            className="ml-auto flex min-w-0 items-center gap-1 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-1.5 sm:overflow-visible sm:pb-0"
          >
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="shrink-0 rounded-xl px-2.5 py-2 text-sm font-medium text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 sm:px-3"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}