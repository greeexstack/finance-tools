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
    <footer className="mt-12 border-t border-slate-200 bg-white sm:mt-16">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.7fr_1fr] lg:gap-12">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="inline-block text-lg font-bold tracking-tight text-slate-900"
            >
              Finance Tools
            </Link>

            <p className="mt-3 max-w-sm text-sm leading-6 text-slate-500">
              Simple calculators for savings, investments, deposits,
              withdrawals, and everyday financial planning.
            </p>
          </div>

          {/* Calculators */}
          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              Calculators
            </h2>

            <nav
              aria-label="Calculator links"
              className="mt-3 grid grid-cols-1 gap-y-1.5"
            >
              {calculatorLinks.map((calculator) => (
                <Link
                  key={calculator.href}
                  href={calculator.href}
                  className="w-fit py-0.5 text-sm text-slate-600 transition hover:text-slate-900"
                >
                  {calculator.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* About */}
          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              Finance Tools
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              These tools provide quick estimates based on the information
              entered by the user. Actual results may differ depending on
              product terms, applicable rules, and calculation methods.
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-100 pt-6 sm:mt-10 sm:flex sm:items-center sm:justify-between">
          <p className="text-xs leading-5 text-slate-400">
            Estimates only. Not financial advice.
          </p>

          <p className="mt-2 text-xs leading-5 text-slate-400 sm:mt-0">
            © {new Date().getFullYear()} Finance Tools
          </p>
        </div>
      </div>
    </footer>
  );
}