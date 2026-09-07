"use client";

import { useMemo, useState } from "react";
import { calculateFD } from "@/lib/fd-calculator";
import { formatINR } from "@/lib/format-currency";

const COMPOUNDING_OPTIONS = [
  { label: "Monthly", value: 12 },
  { label: "Quarterly", value: 4 },
  { label: "Half-yearly", value: 2 },
  { label: "Yearly", value: 1 },
];

export default function FDCalculator() {
  const [principal, setPrincipal] = useState("100000");
  const [rate, setRate] = useState("7");
  const [tenure, setTenure] = useState("5");
  const [compounding, setCompounding] = useState("4");

  const result = useMemo(() => {
    return calculateFD({
      principal: Number(principal),
      annualRate: Number(rate),
      tenureYears: Number(tenure),
      compoundingFrequency: Number(compounding),
    });
  }, [principal, rate, tenure, compounding]);

  const resetCalculator = () => {
    setPrincipal("100000");
    setRate("7");
    setTenure("5");
    setCompounding("4");
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Enter your FD details</h2>

        <div className="mt-6 space-y-5">
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
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              placeholder="100000"
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
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              placeholder="7"
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
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              placeholder="5"
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
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            >
              {COMPOUNDING_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
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

      <div className="rounded-2xl bg-slate-900 p-6 text-white shadow-sm">
        <h2 className="text-xl font-semibold">Your FD result</h2>

        {result ? (
          <div className="mt-6 space-y-4">
            <div className="rounded-xl bg-white/10 p-5">
              <p className="text-sm text-slate-300">Maturity Amount</p>

              <p className="mt-2 text-3xl font-bold">
                {formatINR(result.maturity)}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-sm text-slate-300">
                  Principal Invested
                </p>

                <p className="mt-1 text-lg font-semibold">
                  {formatINR(result.principal)}
                </p>
              </div>

              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-sm text-slate-300">
                  Interest Earned
                </p>

                <p className="mt-1 text-lg font-semibold">
                  {formatINR(result.interest)}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-6 rounded-xl bg-white/10 p-5 text-slate-300">
            Enter valid values to calculate your maturity amount.
          </div>
        )}
      </div>
    </div>
  );
}