import type { Metadata } from "next";
import CurrencyConverter from "@/components/currency/CurrencyConverter";

export const metadata: Metadata = {
  title: "Currency Converter",
  description:
    "Convert between currencies using current exchange rates with a simple, fast currency converter.",
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
            Convert amounts between currencies using current exchange rates.
          </p>
        </header>

        <section className="mx-auto mt-8 w-full max-w-4xl sm:mt-10">
          <CurrencyConverter />
        </section>

        <section className="mx-auto mt-8 w-full max-w-4xl rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:mt-10 sm:p-6">
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            About this converter
          </h2>

          <div className="mt-3 space-y-3 text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
            <p>
              Enter an amount, choose the currency you are converting from and
              the currency you want to convert to. The result updates using the
              latest available exchange rate returned by our exchange-rate
              provider.
            </p>

            <p>
              Exchange rates change over time. This calculator is intended for
              estimates and everyday reference, not for financial settlement or
              guaranteed transaction rates.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}