import Link from "next/link";
import ContactEmail from "@/components/ContactEmail";

const calculatorLinks = [
  { name: "FD Calculator", href: "/fd-calculator" },
  { name: "RD Calculator", href: "/rd-calculator" },
  {
    name: "SWP Calculator",
    href: "/swp-calculator",
  },
  {
    name: "EPF Calculator — India",
    href: "/pf-calculator",
  },
  {
    name: "PPF Calculator — India",
    href: "/ppf-calculator",
  },
  {
    name: "Currency Converter",
    href: "/currency-converter",
  },
];

export default function SiteFooter() {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1fr_0.8fr_0.9fr_1fr]">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2.5"
            >
              <span
                aria-hidden="true"
                className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-white shadow-sm"
              >
                <span className="absolute h-4 w-4 rounded-full bg-indigo-500" />
                <span className="absolute h-2 w-2 rounded-full bg-slate-950" />
              </span>

              <span className="text-base font-bold tracking-tight text-white">
                Finance Tools
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">
              Simple, fast, and practical tools for everyday financial
              calculations and planning.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h2 className="text-sm font-semibold text-white">
              Tools
            </h2>

            <nav
              aria-label="Footer calculator links"
              className="mt-4"
            >
              <div className="grid grid-cols-1 gap-2.5">
                {calculatorLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-sm transition hover:text-white ${
                      item.name.includes("India")
                        ? "text-slate-500"
                        : "text-slate-400"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </nav>
          </div>

          {/* Feedback */}
          <div>
            <h2 className="text-sm font-semibold text-white">
              Feedback
            </h2>

            <p className="mt-4 text-sm leading-6 text-slate-400">
              Found an issue, have a suggestion, or want to share an idea?
              Your feedback helps improve these tools.
            </p>

            <div className="mt-4">
              <ContactEmail variant="text" />
            </div>
          </div>

          {/* About */}
          <div>
            <h2 className="text-sm font-semibold text-white">
              About these tools
            </h2>

            <p className="mt-4 text-sm leading-6 text-slate-400">
              These calculators are designed to make common financial
              calculations easier to understand and use.
            </p>

            <div className="mt-5 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
              <p className="text-xs leading-5 text-slate-500">
                <span className="font-semibold text-slate-400">
                  Disclaimer:
                </span>{" "}
                Results are estimates for informational purposes only. They
                should not be considered financial advice or a guarantee of
                actual returns.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-800 pt-6">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Finance Tools. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}