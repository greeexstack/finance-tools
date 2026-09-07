import CalculatorCard from "@/components/calculators/CalculatorCard";

const tools = [
  {
    name: "Fixed Deposit Calculator",
    shortName: "FD",
    description:
      "Estimate maturity amount and interest earned on a fixed deposit.",
    href: "/fd-calculator",
  },
  {
    name: "Recurring Deposit Calculator",
    shortName: "RD",
    description:
      "Calculate how regular monthly deposits can grow over time.",
    href: "/rd-calculator",
  },
  {
    name: "Systematic Withdrawal Plan Calculator",
    shortName: "SWP",
    description:
      "Estimate withdrawals, remaining balance, and portfolio growth over time.",
    href: "/swp-calculator",
  },
  {
    name: "EPF Calculator — India",
    shortName: "EPF",
    description:
      "Estimate your employee provident fund growth using employee and employer contributions.",
    href: "/pf-calculator",
  },
  {
    name: "PPF Calculator — India",
    shortName: "PPF",
    description:
      "Estimate PPF maturity value using your contribution, deposit timing, and planning rate.",
    href: "/ppf-calculator",
  },
  {
    name: "Currency Converter",
    shortName: "FX",
    description:
      "Convert between currencies using the latest available exchange rates.",
    href: "/currency-converter",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Hero */}
      <section className="border-b border-slate-200/80 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-indigo-700">
              Simple financial tools
            </div>

            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Finance calculations,
              <span className="block text-indigo-600">
                without the complexity.
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              Simple, fast, and practical calculators for savings,
              investments, withdrawals, and everyday financial planning.
            </p>
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Explore the tools
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Choose a calculator
            </h2>
          </div>

          <p className="max-w-md text-sm leading-6 text-slate-500 sm:text-right">
            Pick a tool below and enter only the numbers that matter to you.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <CalculatorCard
              key={tool.href}
              name={tool.name}
              shortName={tool.shortName}
              description={tool.description}
              href={tool.href}
            />
          ))}
        </div>
      </section>

      {/* Why section */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Why Finance Tools
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                Built to be useful first.
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-base font-semibold text-slate-900">
                  Simple inputs
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Enter the information you already know. No complicated
                  setup or unnecessary steps.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-base font-semibold text-slate-900">
                  Instant results
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Calculations update automatically so you can compare
                  different scenarios quickly.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-base font-semibold text-slate-900">
                  Built for mobile
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Use the same tools comfortably on a phone, tablet, or
                  desktop.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-base font-semibold text-slate-900">
                  Practical by design
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Focused on common financial calculations instead of
                  overwhelming you with unnecessary features.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            Important
          </p>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            These calculators provide estimates for informational and
            planning purposes only. Results may differ from actual financial
            products or transactions and should not be considered financial
            advice.
          </p>
        </div>
      </section>
    </main>
  );
}