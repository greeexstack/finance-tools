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
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <Link
          href="/"
          className="shrink-0 text-lg font-bold tracking-tight text-slate-900"
        >
          Finance Tools
        </Link>

        <nav
          aria-label="Main navigation"
          className="flex w-full min-w-0 items-center gap-2 overflow-x-auto pb-1 sm:w-auto sm:gap-5 sm:overflow-visible sm:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}