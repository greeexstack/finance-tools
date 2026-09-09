import type { Metadata } from "next";
import CurrencyConverter from "@/components/currency/CurrencyConverter";

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
    <main className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-900">
      <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 sm:text-sm">
            Currency Tools
          </p>

          <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
            Currency Converter
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:mt-5 sm:text-lg sm:leading-8">
            Convert amounts between currencies using the latest available
            exchange rates.
          </p>
        </header>

        <section className="mx-auto mt-8 w-full max-w-4xl sm:mt-10">
          <CurrencyConverter />
        </section>

        <section className="mx-auto mt-8 w-full max-w-4xl rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:mt-10 sm:p-6">
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            About this currency converter
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
            <p>
              A currency converter calculates the equivalent value of an amount
              in one currency using the exchange rate between two currencies.
              Enter the amount you want to convert, select the currency you are
              converting from, and choose the currency you want to convert to.
              The converter then calculates the estimated equivalent amount.
            </p>

            <p>
              You can use this currency exchange calculator for everyday
              currency conversions, travel planning, international price
              comparisons, overseas purchases, invoices, and other situations
              where you need to estimate the value of one currency in another.
            </p>

            <h3 className="pt-3 text-lg font-semibold text-slate-900">
              How to use the currency converter
            </h3>

            <ol className="list-decimal space-y-2 pl-5">
              <li>
                Enter the amount you want to convert.
              </li>
              <li>
                Select the currency you are converting from.
              </li>
              <li>
                Select the currency you want to convert to.
              </li>
              <li>
                Review the converted amount and the displayed exchange rate.
              </li>
            </ol>

            <p>
              You can also use the swap button to reverse the conversion
              direction. For example, you can switch between USD to INR and INR
              to USD without selecting both currencies again.
            </p>

            <h3 className="pt-3 text-lg font-semibold text-slate-900">
              How currency conversion works
            </h3>

            <p>
              Currency conversion is based on the exchange rate between the
              selected currencies. In a simple conversion, the amount in the
              source currency is multiplied by the applicable exchange rate to
              estimate the equivalent amount in the target currency.
            </p>

            <div className="overflow-x-auto rounded-xl bg-slate-50 p-4 font-mono text-sm text-slate-700">
              Converted amount = Amount × Exchange rate
            </div>

            <p>
              For example, if an exchange rate indicates that 1 unit of the
              source currency equals 80 units of the target currency, 10 units
              of the source currency would correspond to approximately 800 units
              of the target currency before any fees, spreads, or other
              transaction costs.
            </p>

            <h3 className="pt-3 text-lg font-semibold text-slate-900">
              What is an exchange rate?
            </h3>

            <p>
              An exchange rate tells you how much one currency is worth in terms
              of another currency. Exchange rates can change over time because
              currency markets respond to factors such as interest rates,
              inflation, economic conditions, market demand, and other financial
              and economic developments.
            </p>

            <p>
              Because exchange rates change, a conversion calculated at one time
              may produce a different result later. This calculator therefore
              uses the latest available exchange-rate information returned by
              its rate provider rather than treating an exchange rate as a
              permanent value.
            </p>

            <h3 className="pt-3 text-lg font-semibold text-slate-900">
              Why can my bank or card show a different exchange rate?
            </h3>

            <p>
              The exchange rate shown by a currency converter may differ from
              the rate you receive when you actually exchange, spend, withdraw,
              or transfer money. Banks, card networks, currency exchanges, and
              money-transfer providers can apply their own exchange-rate
              spreads, fees, commissions, or other charges.
            </p>

            <p>
              As a result, the amount shown by this calculator should be treated
              as an estimate based on the displayed reference rate. It should
              not be interpreted as a guaranteed rate for a bank transaction,
              card purchase, cash exchange, international transfer, or other
              financial settlement.
            </p>

            <h3 className="pt-3 text-lg font-semibold text-slate-900">
              Popular currency conversions
            </h3>

            <p>
              Currency conversion searches often focus on frequently used
              currency pairs. Examples include USD to INR, INR to USD, EUR to
              INR, GBP to INR, AED to INR, USD to EUR, USD to GBP, and EUR to
              USD.
            </p>

            <p>
              The same converter can be used for other supported currency pairs
              by selecting the source and target currencies from the currency
              selectors above.
            </p>

            <h3 className="pt-3 text-lg font-semibold text-slate-900">
              Current exchange rates and rate dates
            </h3>

            <p>
              Exchange rates are time-sensitive. The converter displays the
              latest available rate returned by the exchange-rate provider and,
              when available, shows the date associated with that rate.
            </p>

            <p>
              Checking the rate date is useful when comparing a conversion with
              another website, bank, card statement, or financial service.
              Different providers can update their rates at different times and
              can use different rate sources or calculation conventions.
            </p>

            <h3 className="pt-3 text-lg font-semibold text-slate-900">
              Currency converter FAQs
            </h3>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-slate-900">
                  What is a currency converter?
                </h4>

                <p className="mt-1">
                  A currency converter calculates the estimated equivalent value
                  of an amount in one currency using an exchange rate for a
                  selected currency pair.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900">
                  How do I convert USD to INR?
                </h4>

                <p className="mt-1">
                  Enter the amount in the converter, select USD as the source
                  currency, and select INR as the target currency. The converter
                  will calculate the estimated INR value using the available
                  exchange rate.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900">
                  How do I convert INR to USD?
                </h4>

                <p className="mt-1">
                  Select INR as the source currency and USD as the target
                  currency. You can also use the swap button to reverse an
                  existing conversion.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900">
                  Why does the exchange rate change?
                </h4>

                <p className="mt-1">
                  Currency exchange rates change over time as financial markets
                  respond to changing economic conditions, interest rates,
                  inflation, demand, market expectations, and other factors.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900">
                  Is the currency converter rate the same as my bank's rate?
                </h4>

                <p className="mt-1">
                  Not necessarily. Banks, card providers, exchange services,
                  and transfer companies may apply their own spreads and fees,
                  so the final transaction amount can differ from the reference
                  conversion shown here.
                </p>
              </div>
            </div>

            <p className="pt-3 text-sm text-slate-500">
              This currency converter is intended for estimates and everyday
              reference. Exchange rates can change, and actual transaction
              rates may differ depending on the provider, fees, spreads,
              timing, and other applicable charges.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}