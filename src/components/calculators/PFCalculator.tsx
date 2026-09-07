"use client";

import { useMemo, useState } from "react";
import { calculatePF } from "@/lib/pf-calculator";
import { formatINR } from "@/lib/format-currency";

export default function PFCalculator() {
  const [employeeContribution, setEmployeeContribution] = useState("1800");
  const [employerContribution, setEmployerContribution] = useState("1800");
  const [rate, setRate] = useState("8.25");
  const [tenure, setTenure] = useState("20");

  const result = useMemo(() => {
    return calculatePF({
      monthlyEmployeeContribution: Number(employeeContribution),
      monthlyEmployerContribution: Number(employerContribution),
      annualRate: Number(rate),
      tenureYears: Number(tenure),
    });
  }, [
    employeeContribution,
    employerContribution,
    rate,
    tenure,
  ]);

  const resetCalculator = () => {
    setEmployeeContribution("1800");
    setEmployerContribution("1800");
    setRate("8.25");
    setTenure("20");
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">
          Enter your PF details
        </h2>

        <div className="mt-6 space-y-5">
          <div>
            <label
              htmlFor="pf-employee"
              className="mb-2 block text-sm font-medium"
            >
              Monthly Employee Contribution
            </label>

            <input
              id="pf-employee"
              type="number"
              min="0"
              value={employeeContribution}
              onChange={(e) =>
                setEmployeeContribution(e.target.value)
              }
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              placeholder="1800"
            />
          </div>

          <div>
            <label
              htmlFor="pf-employer"
              className="mb-2 block text-sm font-medium"
            >
              Monthly Employer Contribution
            </label>

            <input
              id="pf-employer"
              type="number"
              min="0"
              value={employerContribution}
              onChange={(e) =>
                setEmployerContribution(e.target.value)
              }
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              placeholder="1800"
            />
          </div>

          <div>
            <label
              htmlFor="pf-rate"
              className="mb-2 block text-sm font-medium"
            >
              Annual Interest Rate (%)
            </label>

            <input
              id="pf-rate"
              type="number"
              min="0"
              step="0.01"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              placeholder="8.25"
            />
          </div>

          <div>
            <label
              htmlFor="pf-tenure"
              className="mb-2 block text-sm font-medium"
            >
              Tenure (Years)
            </label>

            <input
              id="pf-tenure"
              type="number"
              min="0.01"
              step="0.01"
              value={tenure}
              onChange={(e) => setTenure(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              placeholder="20"
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
          Your PF result
        </h2>

        {result ? (
          <div className="mt-6 space-y-4">
            <div className="rounded-xl bg-white/10 p-5">
              <p className="text-sm text-slate-300">
                Estimated PF Value
              </p>

              <p className="mt-2 text-3xl font-bold">
                {formatINR(result.maturityAmount)}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-sm text-slate-300">
                  Total Contributions
                </p>

                <p className="mt-1 text-lg font-semibold">
                  {formatINR(result.totalContributions)}
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
            Enter valid values to calculate your estimated PF value.
          </div>
        )}
      </div>
    </div>
  );
}