import Link from "next/link";

const calculatorLinks = [
  {
    name: "FD Calculator",
    href: "/fd-calculator",
  },
  {
    name: "RD Calculator",
    href: "/rd-calculator",
  },
  {
    name: "PF Calculator",
    href: "/pf-calculator",
  },
  {
    name: "SWP Calculator",
    href: "/swp-calculator",
  },
];

export default function SiteFooter() {
  return (
    <footer className="mt-12 bg-slate-950 text-white sm:mt-16">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.7fr_1fr] lg:gap-16">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="group inline-flex items-center gap-3"
            >
              <span
                aria-hidden="true"
                className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white"
              >
                <span className="absolute h-4 w-4 rounded-full bg-indigo-500" />
                <span className="absolute h-2 w-2 rounded-full bg-slate-950" />
              </span>

              <span className="text-lg font-bold tracking-tight text-white">
                Finance Tools
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">
              Simple calculators for savings, investments, deposits,
              withdrawals, and everyday financial planning.
            </p>

            <div className="mt-5 h-1 w-12 rounded-full bg-indigo-500" />
          </div>

          {/* Calculators */}
          <div>
            <h2 className="text-sm font-semibold text-white">
              Calculators
            </h2>

            <nav
              aria-label="Calculator links"
              className="mt-4 flex flex-col gap-2"
            >
              {calculatorLinks.map((calculator) => (
                <Link
                  key={calculator.href}
                  href={calculator.href}
                  className="w-fit text-sm text-slate-400 transition hover:translate-x-0.5 hover:text-white"
                >
                  {calculator.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* About */}
          <div>
            <h2 className="text-sm font-semibold text-white">
              About these tools
            </h2>

            <p className="mt-4 text-sm leading-6 text-slate-400">
              These calculators provide quick estimates based on the
              information entered by the user. Actual results may differ
              depending on product terms, applicable rules, and calculation
              methods.
            </p>

            <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs leading-5 text-slate-400">
                Use these tools for estimation and planning. They are not a
                substitute for professional financial advice.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 sm:mt-12 sm:flex sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">
            Estimates only. Not financial advice.
          </p>

          <p className="mt-2 text-xs text-slate-500 sm:mt-0">
            © {new Date().getFullYear()} Finance Tools
          </p>
        </div>
      </div>
    </footer>
  );
}