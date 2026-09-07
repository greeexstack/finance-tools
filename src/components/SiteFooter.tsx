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
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <Link
              href="/"
              className="text-lg font-bold tracking-tight text-slate-900"
            >
              Finance Tools
            </Link>

            <p className="mt-3 max-w-sm text-sm leading-6 text-slate-500">
              Simple calculators for everyday savings, investments,
              deposits, and financial planning.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              Calculators
            </h2>

            <nav className="mt-3 flex flex-col gap-2 text-sm text-slate-600">
              {calculatorLinks.map((calculator) => (
                <Link
                  key={calculator.href}
                  href={calculator.href}
                  className="transition hover:text-slate-900"
                >
                  {calculator.name}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              Finance Tools
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Use these calculators to get quick estimates based on the
              values you enter. Results can vary depending on the
              assumptions and calculation methods used.
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-100 pt-6">
          <p className="text-xs leading-5 text-slate-400">
            Calculator results are estimates and should not be treated as
            financial advice.
          </p>
        </div>
      </div>
    </footer>
  );
}