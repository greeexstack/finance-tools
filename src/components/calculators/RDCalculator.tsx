"use client";

import { useMemo, useState } from "react";
import { calculateRD } from "@/lib/rd-calculator";
import { formatINR } from "@/lib/format-currency";

export default function RDCalculator() {
  const [monthlyDeposit, setMonthlyDeposit] = useState("5000");
  const [rate, setRate] = useState("7");
  const [tenure, setTenure] = useState("60");

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
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">
          Enter your RD details
        </h2>

        <div className="mt-6 space-y-5">
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
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
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
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
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
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
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

      <div className="rounded-2xl bg-slate-900 p-6 text-white shadow-sm">
        <h2 className="text-xl font-semibold">
          Your RD result
        </h2>

        {result ? (
          <div className="mt-6 space-y-4">
            <div className="rounded-xl bg-white/10 p-5">
              <p className="text-sm text-slate-300">
                Maturity Amount
              </p>

              <p className="mt-2 text-3xl font-bold">
                {formatINR(result.maturityAmount)}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-sm text-slate-300">
                  Total Deposited
                </p>

                <p className="mt-1 text-lg font-semibold">
                  {formatINR(result.totalDeposited)}
                </p>
              </div>

              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-sm text-slate-300">
                  Interest Earned
                </p>

                <p className="mt-1 text-lg font-semibold">
                  {formatINR(result.interestEarned)}
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