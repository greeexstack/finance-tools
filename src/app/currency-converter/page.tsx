import type { Metadata } from "next";

import CurrencyConverter from "@/components/currency/CurrencyConverter";
import ExpandableSection from "@/components/seo/ExpandableSection";

export const metadata: Metadata = {
  title: "Currency Converter — Exchange Rate Calculator",
  description:
    "Convert between currencies using the latest available exchange rates. Enter an amount, choose your currencies, and see the converted amount and exchange rate instantly.",
  alternates: {
    canonical: "/currency-converter",
  },
};

export default function CurrencyConverterPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <section className="mb-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Currency Converter
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              Convert an amount between currencies using the latest available
              exchange rates.
            </p>
          </div>

          <CurrencyConverter />
        </section>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="px-4 sm:px-6">
            <div className="border-b border-slate-200 py-5 sm:py-6">
              <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                About this currency converter
              </h2>
            </div>

            <ExpandableSection title="How to use the currency converter">
              <p>
                Enter the amount you want to convert, select the currency you
                are converting from, and select the currency you want to
                convert to. The converter will show the estimated converted
                amount and the exchange rate used for the calculation.
              </p>
            </ExpandableSection>

            <ExpandableSection title="How currency conversion works">
              <p>
                Currency conversion uses an exchange rate between two
                currencies. The amount you enter is multiplied by the exchange
                rate for the selected currency pair to estimate the value in
                the destination currency.
              </p>
            </ExpandableSection>

            <ExpandableSection title="What is an exchange rate?">
              <p>
                An exchange rate represents how much of one currency is needed
                to equal a unit of another currency. Exchange rates can move
                continuously as currency markets change.
              </p>
            </ExpandableSection>

            <ExpandableSection title="Why can my bank or card show a different exchange rate?">
              <p>
                Banks, card networks, payment providers, money changers, and
                other financial services may use their own exchange rates or
                add fees and spreads. As a result, the amount you actually
                receive or pay can differ from the estimate shown by this
                converter.
              </p>
            </ExpandableSection>

            <ExpandableSection title="Popular currency conversions">
              <p>
                Common currency conversions include USD to INR, EUR to INR,
                GBP to INR, USD to EUR, EUR to USD, GBP to USD, and many other
                currency pairs. You can use the converter above to select the
                currencies you need.
              </p>
            </ExpandableSection>

            <ExpandableSection title="Current exchange rates and rate dates">
              <p>
                Exchange rates change over time. The rate displayed by the
                converter represents the latest available rate returned by the
                exchange-rate source used by the tool. Always check the
                displayed rate and its timing when using the result for an
                actual transaction.
              </p>
            </ExpandableSection>

            <ExpandableSection title="Important assumptions">
              <p>
                This currency converter is intended for estimates and everyday
                reference. Exchange rates can change, and actual transaction
                rates may differ depending on the provider, fees, spreads,
                timing, and other applicable charges.
              </p>
            </ExpandableSection>
          </div>
        </section>
      </div>
    </main>
  );
}