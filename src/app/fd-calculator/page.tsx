import type { Metadata } from "next";
import FDCalculator from "@/components/calculators/FDCalculator";
import ExpandableSection from "@/components/seo/ExpandableSection";

export const metadata: Metadata = {
  title: "Fixed Deposit Calculator — FD Interest & Maturity",
  description:
    "Calculate your fixed deposit maturity amount and interest earned using deposit amount, annual interest rate, tenure, and compounding frequency.",
  alternates: {
    canonical: "/fd-calculator",
  },
};

export default function FDCalculatorPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-900">
      <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 sm:text-sm">
            Finance Tools
          </p>

          <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
            Fixed Deposit Calculator
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:mt-5 sm:text-lg sm:leading-8">
            Calculate your estimated FD maturity amount and interest earned
            using your deposit, interest rate, tenure, and compounding
            frequency.
          </p>
        </header>

        <section className="mx-auto mt-8 w-full max-w-4xl sm:mt-10">
          <FDCalculator />
        </section>

        <section className="mx-auto mt-8 w-full max-w-4xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:mt-10">
          <div className="px-5 py-5 sm:px-6 sm:py-6">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              About Fixed Deposit Calculators
            </h2>
          </div>

          <div className="px-5 sm:px-6">
            <ExpandableSection title="What is a fixed deposit calculator?">
              <p>
                A fixed deposit calculator estimates how much your deposit may
                be worth when the FD matures and how much interest you may earn
                during the tenure. It uses the deposit amount, annual interest
                rate, tenure, and compounding frequency to calculate an
                estimated maturity value.
              </p>
            </ExpandableSection>

            <ExpandableSection title="How is FD interest calculated?">
              <p>
                FD interest is generally calculated using compound interest,
                where the interest earned can itself earn interest when it is
                added to the deposit according to the selected compounding
                frequency. The calculator uses the deposit amount, annual rate,
                tenure, and compounding frequency to estimate the maturity
                amount.
              </p>

              <div className="mt-4 overflow-x-auto rounded-xl bg-slate-50 p-4 font-mono text-sm text-slate-700">
                A = P × (1 + r/n)^(nt)
              </div>

              <p className="mt-4">
                Here, <strong>A</strong> is the estimated maturity amount,{" "}
                <strong>P</strong> is the principal deposit, <strong>r</strong>{" "}
                is the annual interest rate expressed as a decimal,{" "}
                <strong>n</strong> is the number of compounding periods per
                year, and <strong>t</strong> is the tenure in years.
              </p>
            </ExpandableSection>

            <ExpandableSection title="What affects FD maturity amount?">
              <p>
                The maturity amount depends mainly on the initial deposit,
                interest rate, tenure, and compounding frequency. A higher
                deposit, higher interest rate, or longer tenure can increase
                the estimated maturity value, while the compounding frequency
                affects how often interest is added to the balance.
              </p>
            </ExpandableSection>

            <ExpandableSection title="Why can my FD result differ from a bank's quote?">
              <p>
                A bank's actual maturity calculation may use product-specific
                rules, rounding conventions, interest-crediting methods,
                applicable rates, and other terms. Banks may also apply
                different rules for specific deposit products or customer
                categories.
              </p>

              <p className="mt-3">
                This calculator is therefore intended as a transparent estimate
                rather than a guaranteed bank quote.
              </p>
            </ExpandableSection>

            <ExpandableSection title="What compounding frequency should I select?">
              <p>
                Select the compounding frequency that matches the FD product
                you are estimating. Common options include quarterly,
                monthly, half-yearly, and yearly compounding. The selected
                frequency affects how often interest is added to the deposit
                for the calculation.
              </p>
            </ExpandableSection>

            <ExpandableSection title="Important assumptions">
              <p>
                The calculator provides an estimate based on the values entered
                by the user. It does not account for every possible bank
                product rule, tax treatment, penalty, premature withdrawal
                condition, special interest rate, or other account-specific
                term.
              </p>

              <p className="mt-3">
                Always compare the calculated result with the terms and
                maturity information provided by the relevant bank or financial
                institution before making a financial decision.
              </p>
            </ExpandableSection>
          </div>
        </section>
      </div>
    </main>
  );
}