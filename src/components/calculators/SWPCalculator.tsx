"use client";

import { useMemo, useState } from "react";
import { calculateSWP } from "@/lib/swp-calculator";
import { formatINR } from "@/lib/format-currency";

export default function SWPCalculator() {
  const [initialInvestment, setInitialInvestment] =
    useState("1000000");
  const [monthlyWithdrawal, setMonthlyWithdrawal] =
    useState("10000");
  const [rate, setRate] = useState("10");
  const [tenure, setTenure] = useState("10");

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
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">
          Enter your SWP details
        </h2>

        <div className="mt-6 space-y-5">
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
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
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
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
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
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
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
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
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

      <div className="rounded-2xl bg-slate-900 p-6 text-white shadow-sm">
        <h2 className="text-xl font-semibold">
          Your SWP result
        </h2>

        {result ? (
          <div className="mt-6 space-y-4">
            <div className="rounded-xl bg-white/10 p-5">
              <p className="text-sm text-slate-300">
                Remaining Value
              </p>

              <p className="mt-2 text-3xl font-bold">
                {formatINR(result.remainingValue)}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-sm text-slate-300">
                  Total Withdrawn
                </p>

                <p className="mt-1 text-lg font-semibold">
                  {formatINR(result.totalWithdrawn)}
                </p>
              </div>

              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-sm text-slate-300">
                  Net Growth
                </p>

                <p className="mt-1 text-lg font-semibold">
                  {formatINR(result.totalGrowth)}
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