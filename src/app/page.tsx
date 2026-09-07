import CalculatorCard from "@/components/calculators/CalculatorCard";
import { calculators } from "@/lib/calculators";

const categories = Array.from(
  new Set(calculators.map((calculator) => calculator.category)),
);

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 sm:text-sm">
            Finance Tools
          </p>

          <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
            Simple finance calculators that just work
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:mt-5 sm:text-lg sm:leading-8">
            Calculate savings, deposits, investments, withdrawals, and
            everyday financial numbers with simple, easy-to-use tools.
          </p>
        </header>

        <section className="mx-auto mt-10 w-full max-w-5xl sm:mt-14">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl font-semibold tracking-tight">
              Explore all calculators
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              Choose the calculator that matches what you are trying to
              estimate.
            </p>
          </div>

          <div className="space-y-8 sm:space-y-10">
            {categories.map((category) => {
              const categoryCalculators = calculators.filter(
                (calculator) => calculator.category === category,
              );

              return (
                <div key={category}>
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold">
                      {category}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {categoryCalculators.map((calculator) => (
                      <CalculatorCard
                        key={calculator.href}
                        name={calculator.name}
                        shortName={calculator.shortName}
                        description={calculator.description}
                        href={calculator.href}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mx-auto mt-10 w-full max-w-4xl rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:mt-14 sm:p-7">
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            Why use these calculators?
          </h2>

          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div>
              <h3 className="font-semibold">Simple</h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Enter a few numbers and get an easy-to-understand result.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">Fast</h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Results update immediately as you change your inputs.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">Focused</h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Every calculator has its own dedicated page and purpose.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-6 w-full max-w-4xl rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:mt-10 sm:p-7">
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            Important note
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
            These calculators provide estimates based on the values and
            assumptions entered by the user. Actual results may vary because
            financial institutions, investment products, and applicable rules
            can use different calculation methods. These tools should not be
            treated as financial advice.
          </p>
        </section>
      </div>
    </main>
  );
}