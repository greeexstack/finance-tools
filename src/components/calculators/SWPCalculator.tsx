"use client";

import { useMemo, useState } from "react";
import { calculateSWP } from "@/lib/swp-calculator";
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

export default function SWPCalculator() {
  const [initialInvestment, setInitialInvestment] =
    useState("1000000");
  const [monthlyWithdrawal, setMonthlyWithdrawal] =
    useState("10000");
  const [rate, setRate] = useState("10");
  const [tenure, setTenure] = useState("10");
  const [currency, setCurrency] = useState<string | null>(null);

  const result = useMemo(() => {
    return calculateSWP({
      initialInvestment: Number(initialInvestment),
      monthlyWithdrawal: Number(monthlyWithdrawal),
      annualRate: Number(rate),
      tenureYears: Number(tenure),
    });
  }, [
    initialInvestment,
    monthlyWithdrawal,
    rate,
    tenure,
  ]);

  const resetCalculator = () => {
    setInitialInvestment("1000000");
    setMonthlyWithdrawal("10000");
    setRate("10");
    setTenure("10");
  };

  return (
    <div className="grid min-w-0 gap-6 lg:grid-cols-2">
      <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-xl font-semibold">
          Enter your SWP details
        </h2>

        <div className="mt-6 space-y-5">
          <CurrencySelector
            value={currency}
            onChange={setCurrency}
          />

          <div>
            <label
              htmlFor="swp-investment"
              className="mb-2 block text-sm font-medium"
            >
              Initial Investment
            </label>

            <input
              id="swp-investment"
              type="number"
              min="1"
              value={initialInvestment}
              onChange={(e) =>
                setInitialInvestment(e.target.value)
              }
              className="w-full min-w-0 rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              placeholder="1000000"
            />
          </div>

          <div>
            <label
              htmlFor="swp-withdrawal"
              className="mb-2 block text-sm font-medium"
            >
              Monthly Withdrawal
            </label>

            <input
              id="swp-withdrawal"
              type="number"
              min="0"
              value={monthlyWithdrawal}
              onChange={(e) =>
                setMonthlyWithdrawal(e.target.value)
              }
              className="w-full min-w-0 rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              placeholder="10000"
            />
          </div>

          <div>
            <label
              htmlFor="swp-rate"
              className="mb-2 block text-sm font-medium"
            >
              Expected Annual Return (%)
            </label>

            <input
              id="swp-rate"
              type="number"
              min="0"
              step="0.01"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="w-full min-w-0 rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              placeholder="10"
            />
          </div>

          <div>
            <label
              htmlFor="swp-tenure"
              className="mb-2 block text-sm font-medium"
            >
              Tenure (Years)
            </label>

            <input
              id="swp-tenure"
              type="number"
              min="0.01"
              step="0.01"
              value={tenure}
              onChange={(e) => setTenure(e.target.value)}
              className="w-full min-w-0 rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              placeholder="10"
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
          Your SWP result
        </h2>

        {result ? (
          <div className="mt-6 space-y-4">
            <div className="rounded-xl bg-white/10 p-5">
              <p className="text-sm text-slate-300">
                Remaining Value
              </p>

              <p className="mt-2 break-words text-3xl font-bold">
                {formatCurrency(
                  result.remainingValue,
                  currency ?? "INR",
                )}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-sm text-slate-300">
                  Total Withdrawn
                </p>

                <p className="mt-1 break-words text-lg font-semibold">
                  {formatCurrency(
                    result.totalWithdrawn,
                    currency ?? "INR",
                  )}
                </p>
              </div>

              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-sm text-slate-300">
                  Net Growth
                </p>

                <p className="mt-1 break-words text-lg font-semibold">
                  {formatCurrency(
                    result.totalGrowth,
                    currency ?? "INR",
                  )}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-6 rounded-xl bg-white/10 p-5 text-slate-300">
            Enter valid values to calculate your estimated SWP result.
          </div>
        )}
      </div>
    </div>
  );
}