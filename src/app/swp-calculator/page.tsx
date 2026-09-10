import type { Metadata } from "next";
import SWPCalculator from "@/components/calculators/SWPCalculator";
import ExpandableSection from "@/components/seo/ExpandableSection";

export const metadata: Metadata = {
  title: "SWP Calculator — Systematic Withdrawal Plan Calculator India",
  description:
    "Calculate your estimated SWP withdrawals, remaining investment value, and total growth using your initial investment, monthly withdrawal, expected return, and tenure.",
  alternates: {
    canonical: "/swp-calculator",
  },
};

export default function SWPCalculatorPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-900">
      <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 sm:text-sm">
            Finance Tools
          </p>

          <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
            SWP Calculator
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:mt-5 sm:text-lg sm:leading-8">
            Calculate your estimated systematic withdrawals, remaining
            investment value, and total growth using your investment,
            withdrawal amount, expected return, and tenure.
          </p>
        </header>

        <section className="mx-auto mt-8 w-full max-w-4xl sm:mt-10">
          <SWPCalculator />
        </section>

        <section className="mx-auto mt-8 w-full max-w-4xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:mt-10">
          <div className="px-5 py-5 sm:px-6 sm:py-6">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              About Systematic Withdrawal Plans
            </h2>
          </div>

          <div className="px-5 sm:px-6">
            <ExpandableSection title="What is a Systematic Withdrawal Plan?">
              <p>
                A Systematic Withdrawal Plan (SWP) allows an investor to
                withdraw a predetermined amount from an investment at regular
                intervals, commonly every month. The remaining investment
                continues to be exposed to the expected return of the
                underlying investment.
              </p>

              <p className="mt-3">
                SWPs are commonly used to create a regular cash flow from an
                investment corpus while keeping the remaining amount invested.
              </p>
            </ExpandableSection>

            <ExpandableSection title="How does an SWP calculator work?">
              <p>
                An SWP calculator estimates how an investment corpus may change
                over time after regular withdrawals. It considers the initial
                investment, monthly withdrawal, expected annual return, and
                investment tenure.
              </p>

              <p className="mt-3">
                For each period, the investment is assumed to grow according
                to the selected return rate before the scheduled withdrawal is
                deducted.
              </p>

              <div className="mt-4 overflow-x-auto rounded-xl bg-slate-50 p-4 font-mono text-sm text-slate-700">
                Monthly return = Annual return ÷ 12
              </div>

              <p className="mt-4">
                The calculation is a simplified estimate and actual investment
                returns can vary over time.
              </p>
            </ExpandableSection>

            <ExpandableSection title="How is SWP calculated?">
              <p>
                The calculator starts with the initial investment and applies
                the estimated monthly return before deducting the monthly
                withdrawal. This process is repeated for the selected tenure.
              </p>

              <p className="mt-3">
                The result shows the total amount withdrawn, the estimated
                remaining investment value, and the overall growth or decline
                relative to the original investment.
              </p>
            </ExpandableSection>

            <ExpandableSection title="What affects SWP results?">
              <p>
                The main factors affecting an SWP calculation are the starting
                investment, withdrawal amount, expected rate of return, and
                withdrawal period.
              </p>

              <p className="mt-3">
                A larger withdrawal generally reduces the remaining corpus
                faster, while a higher assumed return can increase the amount
                that remains invested. A longer withdrawal period can also have
                a significant effect on the final balance.
              </p>
            </ExpandableSection>

            <ExpandableSection title="Can an SWP exhaust the investment?">
              <p>
                Yes. If withdrawals are sufficiently large compared with the
                investment's growth, the available corpus can eventually be
                exhausted.
              </p>

              <p className="mt-3">
                This calculator stops withdrawals when the remaining balance
                reaches zero. It should therefore be used to understand the
                relationship between withdrawal amounts, expected returns, and
                the investment period rather than as a guarantee that a corpus
                will last for a specific period.
              </p>
            </ExpandableSection>

            <ExpandableSection title="Why can actual SWP results differ?">
              <p>
                Actual investment returns are not fixed and can change from
                period to period. Market movements, fees, taxes, the timing of
                withdrawals, and the specific investment product can all cause
                actual results to differ from a calculator estimate.
              </p>

              <p className="mt-3">
                The calculator uses a simplified constant-return model to make
                the relationship between the inputs easier to understand.
              </p>
            </ExpandableSection>

            <ExpandableSection title="SWP and taxes">
              <p>
                The tax treatment of withdrawals depends on the underlying
                investment, the type of gains involved, applicable tax rules,
                and the investor's circumstances.
              </p>

              <p className="mt-3">
                This calculator does not calculate individual tax liability or
                adjust the estimated result for taxes.
              </p>
            </ExpandableSection>

            <ExpandableSection title="Important assumptions">
              <p>
                This calculator provides an estimate using a constant expected
                annual return converted into a monthly rate. It assumes the
                specified withdrawal is made regularly and does not model
                actual market fluctuations.
              </p>

              <p className="mt-3">
                The result should not be treated as a guaranteed investment
                return or financial advice. Actual results may differ
                substantially from the estimate.
              </p>
            </ExpandableSection>
          </div>
        </section>
      </div>
    </main>
  );
}