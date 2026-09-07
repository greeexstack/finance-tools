"use client";

import { useMemo, useState } from "react";
import { calculatePF } from "@/lib/pf-calculator";
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

function hasValidValues(
  employeeContribution: string,
  employerContribution: string,
  rate: string,
  tenure: string,
): boolean {
  return (
    Number(employeeContribution) >= 0 &&
    Number(employerContribution) >= 0 &&
    Number(rate) >= 0 &&
    Number(tenure) > 0
  );
}

export default function PFCalculator() {
  const [employeeContribution, setEmployeeContribution] =
    useState("");
  const [employerContribution, setEmployerContribution] =
    useState("");
  const [rate, setRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [currency, setCurrency] = useState<string | null>(null);

  const isValid = hasValidValues(
    employeeContribution,
    employerContribution,
    rate,
    tenure,
  );

  const result = useMemo(() => {
    if (!isValid) {
      return null;
    }

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
    isValid,
  ]);

  const resetCalculator = () => {
    setEmployeeContribution("");
    setEmployerContribution("");
    setRate("");
    setTenure("");
  };

  const activeCurrency = currency ?? "INR";

  return (
    <div className="grid min-w-0 gap-6 lg:grid-cols-2">
      <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-xl font-semibold">
          Enter your PF details
        </h2>

        <div className="mt-6 space-y-5">
          <CurrencySelector
            value={currency}
            onChange={setCurrency}
          />

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
              className="w-full min-w-0 rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              placeholder="Enter amount"
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
              className="w-full min-w-0 rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              placeholder="Enter amount"
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
              className="w-full min-w-0 rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              placeholder="Enter rate"
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
              className="w-full min-w-0 rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              placeholder="Enter years"
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
          Your PF result
        </h2>

        {result ? (
          <div className="mt-6 space-y-4">
            <div className="rounded-xl bg-white/10 p-5">
              <p className="text-sm text-slate-300">
                Estimated PF Value
              </p>

              <p className="mt-2 break-words text-3xl font-bold">
                {formatCurrency(
                  result.maturityAmount,
                  activeCurrency,
                )}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-sm text-slate-300">
                  Total Contributions
                </p>

                <p className="mt-1 break-words text-lg font-semibold">
                  {formatCurrency(
                    result.totalContributions,
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
                    result.interestEarned,
                    activeCurrency,
                  )}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-6 rounded-xl bg-white/10 p-5 text-slate-300">
            Enter your PF details to see your estimated value.
          </div>
        )}
      </div>
    </div>
  );
}