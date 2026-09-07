"use client";

import { useMemo, useState } from "react";
import { calculateRD } from "@/lib/rd-calculator";
import { getCurrency } from "@/lib/currencies";
import CurrencySelector from "@/components/calculators/CurrencySelector";

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

export default function RDCalculator() {
  const [monthlyDeposit, setMonthlyDeposit] = useState("5000");
  const [rate, setRate] = useState("7");
  const [tenure, setTenure] = useState("60");
  const [currency, setCurrency] = useState<string | null>(null);

  const result = useMemo(() => {
    return calculateRD({
      monthlyDeposit: Number(monthlyDeposit),
      annualRate: Number(rate),
      tenureMonths: Number(tenure),
    });
  }, [monthlyDeposit, rate, tenure]);

  const resetCalculator = () => {
    setMonthlyDeposit("5000");
    setRate("7");
    setTenure("60");
  };

  return (
    <div className="grid min-w-0 gap-6 lg:grid-cols-2">
      <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-xl font-semibold">
          Enter your RD details
        </h2>

        <div className="mt-6 space-y-5">
          <CurrencySelector
            value={currency}
            onChange={setCurrency}
          />

          <div>
            <label
              htmlFor="rd-monthly-deposit"
              className="mb-2 block text-sm font-medium"
            >
              Monthly Deposit
            </label>

            <input
              id="rd-monthly-deposit"
              type="number"
              min="1"
              value={monthlyDeposit}
              onChange={(e) =>
                setMonthlyDeposit(e.target.value)
              }
              className="w-full min-w-0 rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              placeholder="5000"
            />
          </div>

          <div>
            <label
              htmlFor="rd-rate"
              className="mb-2 block text-sm font-medium"
            >
              Annual Interest Rate (%)
            </label>

            <input
              id="rd-rate"
              type="number"
              min="0"
              step="0.01"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="w-full min-w-0 rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              placeholder="7"
            />
          </div>

          <div>
            <label
              htmlFor="rd-tenure"
              className="mb-2 block text-sm font-medium"
            >
              Tenure (Months)
            </label>

            <input
              id="rd-tenure"
              type="number"
              min="1"
              step="1"
              value={tenure}
              onChange={(e) => setTenure(e.target.value)}
              className="w-full min-w-0 rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              placeholder="60"
            />
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
          Your RD result
        </h2>

        {result ? (
          <div className="mt-6 space-y-4">
            <div className="rounded-xl bg-white/10 p-5">
              <p className="text-sm text-slate-300">
                Maturity Amount
              </p>

              <p className="mt-2 break-words text-3xl font-bold">
                {formatCurrency(
                  result.maturityAmount,
                  currency ?? "INR",
                )}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-sm text-slate-300">
                  Total Deposited
                </p>

                <p className="mt-1 break-words text-lg font-semibold">
                  {formatCurrency(
                    result.totalDeposited,
                    currency ?? "INR",
                  )}
                </p>
              </div>

              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-sm text-slate-300">
                  Interest Earned
                </p>

                <p className="mt-1 break-words text-lg font-semibold">
                  {formatCurrency(
                    result.interestEarned,
                    currency ?? "INR",
                  )}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-6 rounded-xl bg-white/10 p-5 text-slate-300">
            Enter valid values to calculate your RD maturity amount.
          </div>
        )}
      </div>
    </div>
  );
}