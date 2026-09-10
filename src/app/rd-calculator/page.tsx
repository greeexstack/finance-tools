import type { Metadata } from "next";
import RDCalculator from "@/components/calculators/RDCalculator";
import ExpandableSection from "@/components/seo/ExpandableSection";

export const metadata: Metadata = {
  title: "RD Calculator — Recurring Deposit Calculator India",
  description:
    "Calculate your recurring deposit maturity amount and interest earned using monthly deposit, annual interest rate, and tenure.",
  alternates: {
    canonical: "/rd-calculator",
  },
};

export default function RDCalculatorPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-900">
      <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 sm:text-sm">
            Finance Tools
          </p>

          <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
            RD Calculator
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:mt-5 sm:text-lg sm:leading-8">
            Calculate your estimated recurring deposit maturity amount and
            interest earned using your monthly deposit, interest rate, and
            tenure.
          </p>
        </header>

        <section className="mx-auto mt-8 w-full max-w-4xl sm:mt-10">
          <RDCalculator />
        </section>

        <section className="mx-auto mt-8 w-full max-w-4xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:mt-10">
          <div className="px-5 py-5 sm:px-6 sm:py-6">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              About Recurring Deposits
            </h2>
          </div>

          <div className="px-5 sm:px-6">
            <ExpandableSection title="What is a recurring deposit?">
              <p>
                A recurring deposit (RD) allows you to deposit a fixed amount
                regularly, usually every month, for a predetermined tenure.
                The deposited amount earns interest according to the applicable
                RD interest rate and account terms.
              </p>
            </ExpandableSection>

            <ExpandableSection title="How is RD interest calculated?">
              <p>
                RD maturity depends on the amount deposited each month, the
                interest rate, and the duration of the deposit. RD products
                commonly use quarterly compounding, although the exact
                calculation convention can vary between banks and financial
                institutions.
              </p>

              <p className="mt-3">
                This calculator uses a monthly growth model to estimate the
                maturity amount based on the values entered. Because different
                RD calculators and financial institutions may use different
                installment-timing and compounding conventions, the result
                should be treated as an estimate.
              </p>
            </ExpandableSection>

            <ExpandableSection title="How does the RD calculator work?">
              <p>
                Enter your monthly deposit, annual interest rate, and tenure.
                The calculator estimates the total amount deposited over the
                selected period and calculates the estimated interest earned
                and maturity amount.
              </p>

              <div className="mt-4 overflow-x-auto rounded-xl bg-slate-50 p-4 font-mono text-sm text-slate-700">
                Total deposited = Monthly deposit × Number of months
              </div>

              <p className="mt-4">
                The estimated interest is the difference between the maturity
                amount and the total amount deposited.
              </p>
            </ExpandableSection>

            <ExpandableSection title="What affects RD maturity amount?">
              <p>
                The main factors affecting RD maturity are the monthly deposit,
                interest rate, and tenure. Increasing the monthly deposit or
                extending the tenure generally increases the total amount
                deposited and can increase the interest earned. The applicable
                interest rate and calculation convention also affect the final
                maturity value.
              </p>
            </ExpandableSection>

            <ExpandableSection title="Why can my RD result differ from a bank's quote?">
              <p>
                Banks may use specific RD calculation rules, quarterly
                compounding conventions, installment timing, rounding methods,
                and product-specific terms. These details can produce a
                different maturity amount from a simplified calculator model.
              </p>

              <p className="mt-3">
                Use this calculator as an estimate and compare the result with
                the official maturity information provided by your bank or
                financial institution.
              </p>
            </ExpandableSection>

            <ExpandableSection title="Does the RD calculator account for missed installments?">
              <p>
                This calculator assumes that the stated monthly deposit is made
                regularly for the full selected tenure. It does not model
                missed installments, delayed payments, penalties, or
                account-specific charges.
              </p>
            </ExpandableSection>

            <ExpandableSection title="What about RD tax and senior-citizen rates?">
              <p>
                The actual interest rate offered by a bank can depend on the
                customer and the specific RD product. Senior citizens may
                receive different rates depending on the institution and
                applicable terms.
              </p>

              <p className="mt-3">
                Tax treatment can also affect the amount you ultimately keep.
                This calculator focuses on estimating the deposit maturity and
                interest and does not calculate individual tax liability.
              </p>
            </ExpandableSection>

            <ExpandableSection title="Important assumptions">
              <p>
                This calculator provides an estimate based on the monthly
                deposit, annual interest rate, and tenure entered by the user.
                It does not account for every bank-specific RD rule,
                installment timing convention, penalty, tax treatment, special
                interest rate, or other account-specific condition.
              </p>

              <p className="mt-3">
                For an exact maturity value, refer to the terms and maturity
                calculation provided by the relevant bank or financial
                institution.
              </p>
            </ExpandableSection>
          </div>
        </section>
      </div>
    </main>
  );
}