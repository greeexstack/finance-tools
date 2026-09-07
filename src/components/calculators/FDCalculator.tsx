"use client";

import { useMemo, useState } from "react";
import { calculateFD } from "@/lib/fd-calculator";
import { getCurrency } from "@/lib/currencies";
import CurrencySelector from "@/components/calculators/CurrencySelector";

const COMPOUNDING_OPTIONS = [
  { label: "Monthly", value: 12 },
  { label: "Quarterly", value: 4 },
  { label: "Half-yearly", value: 2 },
  { label: "Yearly", value: 1 },
];

function formatCurrency(
  amount: number,
  currencyCode: string,
): string {
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: currencyCode,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    const currency = getCurrency(currencyCode);

    return `${currency.symbol}${amount.toLocaleString(undefined, {
      maximumFractionDigits: 2,
    })}`;
  }
}

function hasValidValues(
  principal: string,
  rate: string,
  tenure: string,
): boolean {
  return (
    Number(principal) > 0 &&
    Number(rate) >= 0 &&
    Number(tenure) > 0
  );
}

export default function FDCalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [compounding, setCompounding] = useState("4");
  const [currency, setCurrency] = useState<string | null>(null);

  const isValid = hasValidValues(principal, rate, tenure);

  const result = useMemo(() => {
    if (!isValid) {
      return null;
    }

    return calculateFD({
      principal: Number(principal),
      annualRate: Number(rate),
      tenureYears: Number(tenure),
      compoundingFrequency: Number(compounding),
    });
  }, [principal, rate, tenure, compounding, isValid]);

  const resetCalculator = () => {
    setPrincipal("");
    setRate("");
    setTenure("");
    setCompounding("4");
  };

  const activeCurrency = currency ?? "INR";

  return (
    <div className="grid min-w-0 gap-6 lg:grid-cols-2">
      <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-xl font-semibold">
          Enter your FD details
        </h2>

        <div className="mt-6 space-y-5">
          <CurrencySelector
            value={currency}
            onChange={setCurrency}
          />

          <div>
            <label
              htmlFor="fd-principal"
              className="mb-2 block text-sm font-medium"
            >
              Principal Amount
            </label>

            <input
              id="fd-principal"
              type="number"
              min="1"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              className="w-full min-w-0 rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              placeholder="Enter amount"
            />
          </div>

          <div>
            <label
              htmlFor="fd-rate"
              className="mb-2 block text-sm font-medium"
            >
              Annual Interest Rate (%)
            </label>

            <input
              id="fd-rate"
              type="number"
              min="0"
              step="0.01"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="w-full min-w-0 rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              placeholder="Enter rate"
            />
          </div>

          <div>
            <label
              htmlFor="fd-tenure"
              className="mb-2 block text-sm font-medium"
            >
              Tenure (Years)
            </label>

            <input
              id="fd-tenure"
              type="number"
              min="0.01"
              step="0.01"
              value={tenure}
              onChange={(e) => setTenure(e.target.value)}
              className="w-full min-w-0 rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              placeholder="Enter years"
            />
          </div>

          <div>
            <label
              htmlFor="fd-compounding"
              className="mb-2 block text-sm font-medium"
            >
              Compounding Frequency
            </label>

            <select
              id="fd-compounding"
              value={compounding}
              onChange={(e) => setCompounding(e.target.value)}
              className="w-full min-w-0 rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            >
              {COMPOUNDING_OPTIONS.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={resetCalculator}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 font-medium transition hover:bg-slate-50"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="min-w-0 rounded-2xl bg-slate-900 p-5 text-white shadow-sm sm:p-6">
        <h2 className="text-xl font-semibold">
          Your FD result
        </h2>

        {result ? (
          <div className="mt-6 space-y-4">
            <div className="rounded-xl bg-white/10 p-5">
              <p className="text-sm text-slate-300">
                Maturity Amount
              </p>

              <p className="mt-2 break-words text-3xl font-bold">
                {formatCurrency(
                  result.maturity,
                  activeCurrency,
                )}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-sm text-slate-300">
                  Principal Invested
                </p>

                <p className="mt-1 break-words text-lg font-semibold">
                  {formatCurrency(
                    result.principal,
                    activeCurrency,
                  )}
                </p>
              </div>

              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-sm text-slate-300">
                  Interest Earned
                </p>

                <p className="mt-1 break-words text-lg font-semibold">
                  {formatCurrency(
                    result.interest,
                    activeCurrency,
                  )}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-6 rounded-xl bg-white/10 p-5 text-slate-300">
            Enter your FD details to see your estimated maturity
            amount.
          </div>
        )}
      </div>
    </div>
  );
}