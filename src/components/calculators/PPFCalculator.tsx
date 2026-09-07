"use client";

import { useMemo, useState } from "react";
import { calculatePPF } from "@/lib/ppf-calculator";
import {
  formatCompactCurrency,
  formatCurrency,
} from "@/lib/format-currency";
import CurrencySelector from "@/components/calculators/CurrencySelector";
import ResultAmount from "@/components/calculators/ResultAmount";

const DEFAULT_RATE = 7.1;

type Frequency = "yearly" | "monthly";
type Timing = "before5th" | "after5th";

const TENURE_OPTIONS = [15, 20, 25, 30];

function getInitialAmount(frequency: Frequency) {
  return frequency === "yearly"
    ? 150_000
    : 12_500;
}

export default function PPFCalculator() {
  const [
    contributionFrequency,
    setContributionFrequency,
  ] = useState<Frequency>("yearly");

  const [
    contributionAmount,
    setContributionAmount,
  ] = useState("150000");

  const [
    contributionTiming,
    setContributionTiming,
  ] = useState<Timing>("before5th");

  const [annualRate, setAnnualRate] =
    useState(String(DEFAULT_RATE));

  const [tenureYears, setTenureYears] =
    useState("15");

  const [currencyCode, setCurrencyCode] =
    useState("INR");

  const result = useMemo(() => {
    return calculatePPF({
      contributionAmount:
        Number(contributionAmount),
      annualRate: Number(annualRate),
      tenureYears: Number(tenureYears),
      contributionFrequency,
      contributionTiming,
    });
  }, [
    contributionAmount,
    annualRate,
    tenureYears,
    contributionFrequency,
    contributionTiming,
  ]);

  const contributionLabel =
    contributionFrequency === "yearly"
      ? "Annual Contribution"
      : "Monthly Contribution";

  const contributionHelp =
    contributionFrequency === "yearly"
      ? "₹500 to ₹1,50,000 per financial year."
      : "Monthly deposits are modeled across the year.";

  const totalValue =
    result?.maturityAmount ?? 0;

  const contributions =
    result?.totalContributions ?? 0;

  const interest =
    result?.interestEarned ?? 0;

  const contributionsShare =
    totalValue > 0
      ? (contributions / totalValue) * 100
      : 0;

  const interestShare =
    totalValue > 0
      ? (interest / totalValue) * 100
      : 0;

  const circumference =
    2 * Math.PI * 44;

  const contributionDash =
    (contributionsShare / 100) *
    circumference;

  const interestDash =
    (interestShare / 100) *
    circumference;

  function handleFrequencyChange(
    nextFrequency: Frequency,
  ) {
    setContributionFrequency(
      nextFrequency,
    );

    setContributionAmount(
      String(
        getInitialAmount(nextFrequency),
      ),
    );
  }

  function handleReset() {
    setContributionFrequency("yearly");
    setContributionAmount("150000");
    setContributionTiming("before5th");
    setAnnualRate(String(DEFAULT_RATE));
    setTenureYears("15");
    setCurrencyCode("INR");
  }

  async function handleCopyResult() {
    if (!result) {
      return;
    }

    const text = [
      "PPF Estimate",
      `Estimated Value: ${formatCurrency(
        result.maturityAmount,
        currencyCode,
      )}`,
      `Total Contributions: ${formatCurrency(
        result.totalContributions,
        currencyCode,
      )}`,
      `Interest Earned: ${formatCurrency(
        result.interestEarned,
        currencyCode,
      )}`,
      `Planning Rate: ${result.annualRate}%`,
      `Tenure: ${result.tenureYears} years`,
    ].join("\n");

    try {
      await navigator.clipboard.writeText(
        text,
      );
    } catch {
      // Clipboard access may be unavailable.
    }
  }

  return (
    <div className="grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.9fr)]">
      {/* Input panel */}
      <section className="min-w-0 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-6">
          <p className="mb-2 text-sm font-semibold text-indigo-600">
            PPF Calculator
          </p>

          <h2 className="text-2xl font-bold tracking-tight text-slate-950">
            Plan your PPF maturity
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Estimate how your contributions could grow over
            the selected PPF tenure.
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <label
              htmlFor="ppf-frequency"
              className="mb-2 block text-sm font-semibold text-slate-800"
            >
              How often do you contribute?
            </label>

            <select
              id="ppf-frequency"
              value={contributionFrequency}
              onChange={(event) =>
                handleFrequencyChange(
                  event.target.value as Frequency,
                )
              }
              className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            >
              <option value="yearly">
                Yearly
              </option>

              <option value="monthly">
                Monthly
              </option>
            </select>
          </div>

          <div>
            <label
              htmlFor="ppf-contribution"
              className="mb-2 block text-sm font-semibold text-slate-800"
            >
              {contributionLabel}
            </label>

            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-500">
                ₹
              </span>

              <input
                id="ppf-contribution"
                type="number"
                inputMode="decimal"
                min="0"
                value={contributionAmount}
                onChange={(event) =>
                  setContributionAmount(
                    event.target.value,
                  )
                }
                className="h-12 w-full rounded-2xl border border-slate-200 bg-white pl-9 pr-4 text-base font-semibold text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                placeholder={
                  contributionFrequency ===
                  "yearly"
                    ? "150000"
                    : "12500"
                }
              />
            </div>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              {contributionHelp}
            </p>
          </div>

          <div>
            <label
              htmlFor="ppf-timing"
              className="mb-2 block text-sm font-semibold text-slate-800"
            >
              When do you usually deposit?
            </label>

            <select
              id="ppf-timing"
              value={contributionTiming}
              onChange={(event) =>
                setContributionTiming(
                  event.target.value as Timing,
                )
              }
              className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            >
              <option value="before5th">
                On or before the 5th
              </option>

              <option value="after5th">
                After the 5th
              </option>
            </select>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              The timing affects how that month is treated
              in this estimate.
            </p>
          </div>

          <div>
            <label
              htmlFor="ppf-rate"
              className="mb-2 block text-sm font-semibold text-slate-800"
            >
              PPF Interest Rate
            </label>

            <div className="relative">
              <input
                id="ppf-rate"
                type="number"
                inputMode="decimal"
                min="0"
                step="0.01"
                value={annualRate}
                onChange={(event) =>
                  setAnnualRate(
                    event.target.value,
                  )
                }
                className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 pr-10 text-base font-semibold text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />

              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-500">
                %
              </span>
            </div>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              Uses {DEFAULT_RATE}% as the planning default.
              PPF rates are government-notified and can change.
            </p>
          </div>

          <div>
            <label
              htmlFor="ppf-tenure"
              className="mb-2 block text-sm font-semibold text-slate-800"
            >
              Tenure
            </label>

            <select
              id="ppf-tenure"
              value={tenureYears}
              onChange={(event) =>
                setTenureYears(
                  event.target.value,
                )
              }
              className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            >
              {TENURE_OPTIONS.map(
                (years) => (
                  <option
                    key={years}
                    value={years}
                  >
                    {years} years
                  </option>
                ),
              )}
            </select>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              15 years is the base tenure; longer options
              model 5-year extension blocks.
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-800">
              Currency
            </label>

            <CurrencySelector
              value={currencyCode}
              onChange={setCurrencyCode}
            />
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 active:scale-[0.99]"
          >
            Reset
          </button>
        </div>
      </section>

      {/* Result panel */}
      <section className="min-w-0 overflow-hidden rounded-3xl bg-slate-950 shadow-sm">
        {!result ? (
          <div className="flex min-h-[520px] flex-col items-center justify-center px-6 py-10 text-center sm:px-10">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-2xl text-white">
              ₹
            </div>

            <h3 className="text-xl font-bold text-white">
              Your PPF estimate
            </h3>

            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">
              Enter a valid contribution amount and planning
              rate to see your estimated maturity value.
            </p>
          </div>
        ) : (
          <div className="min-w-0 p-5 sm:p-6">
            {/* Main result */}
            <div className="min-w-0 rounded-3xl border border-white/10 bg-white/[0.04] p-5 sm:p-6">
              <div className="flex min-w-0 items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-400">
                    Estimated PPF Value
                  </p>

                  <div className="mt-3 min-w-0 w-full">
                    <ResultAmount
                      value={result.maturityAmount}
                      currencyCode={currencyCode}
                      size="hero"
                      className="text-white"
                    />
                  </div>

                  <p className="mt-2 text-xs text-slate-400">
                    After {result.tenureYears} years at{" "}
                    {result.annualRate}%
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleCopyResult}
                  aria-label="Copy PPF estimate"
                  title="Copy PPF estimate"
                  className="hidden shrink-0 rounded-xl border border-white/10 bg-white/5 p-2.5 text-slate-300 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-4 focus:ring-indigo-400/20 sm:inline-flex"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                    aria-hidden="true"
                  >
                    <rect
                      x="9"
                      y="9"
                      width="10"
                      height="10"
                      rx="2"
                    />

                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                </button>
              </div>

              {/* Mobile copy button */}
              <div className="mt-4 flex justify-end sm:hidden">
                <button
                  type="button"
                  onClick={handleCopyResult}
                  aria-label="Copy PPF estimate"
                  title="Copy PPF estimate"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-4 focus:ring-indigo-400/20"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                    aria-hidden="true"
                  >
                    <rect
                      x="9"
                      y="9"
                      width="10"
                      height="10"
                      rx="2"
                    />

                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Visualization */}
            <div className="mt-5 min-w-0 rounded-3xl border border-white/10 bg-white/[0.04] p-5 sm:p-6">
              <div className="flex min-w-0 flex-col items-center gap-6 sm:flex-row sm:items-center">
                <div className="relative h-44 w-44 shrink-0">
                  <svg
                    viewBox="0 0 100 100"
                    className="h-full w-full -rotate-90"
                    aria-label="PPF contributions and interest breakdown"
                    role="img"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="44"
                      fill="none"
                      stroke="rgba(255,255,255,0.08)"
                      strokeWidth="10"
                    />

                    {contributionsShare >
                      0 && (
                      <circle
                        cx="50"
                        cy="50"
                        r="44"
                        fill="none"
                        stroke="rgb(99,102,241)"
                        strokeWidth="10"
                        strokeDasharray={`${contributionDash} ${circumference}`}
                        strokeLinecap="butt"
                      />
                    )}

                    {interestShare > 0 && (
                      <circle
                        cx="50"
                        cy="50"
                        r="44"
                        fill="none"
                        stroke="rgb(245,158,11)"
                        strokeWidth="10"
                        strokeDasharray={`${interestDash} ${circumference}`}
                        strokeDashoffset={`-${contributionDash}`}
                        strokeLinecap="butt"
                      />
                    )}
                  </svg>

                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-[11px] font-medium text-slate-400">
                      Total
                    </span>

                    <span className="mt-1 max-w-[115px] overflow-hidden text-center text-sm font-bold leading-tight text-white">
                      {formatCompactCurrency(
                        result.maturityAmount,
                        currencyCode,
                      )}
                    </span>
                  </div>
                </div>

                <div className="min-w-0 w-full space-y-4">
                  <div className="min-w-0">
                    <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                      <div className="min-w-0 flex items-start gap-2">
                        <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-indigo-500" />

                        <span className="min-w-0 text-sm font-medium leading-5 text-slate-300">
                          Total Contributions
                        </span>
                      </div>

                      <span className="shrink-0 whitespace-nowrap text-xs font-semibold text-slate-500">
                        {contributionsShare.toFixed(
                          1,
                        )}
                        %
                      </span>
                    </div>

                    <div className="mt-2 min-w-0">
                      <ResultAmount
                        value={
                          result.totalContributions
                        }
                        currencyCode={
                          currencyCode
                        }
                        size="card"
                        className="text-white"
                      />
                    </div>
                  </div>

                  <div className="min-w-0">
                    <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                      <div className="min-w-0 flex items-start gap-2">
                        <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-amber-500" />

                        <span className="min-w-0 text-sm font-medium leading-5 text-slate-300">
                          Interest Earned
                        </span>
                      </div>

                      <span className="shrink-0 whitespace-nowrap text-xs font-semibold text-slate-500">
                        {interestShare.toFixed(1)}
                        %
                      </span>
                    </div>

                    <div className="mt-2 min-w-0">
                      <ResultAmount
                        value={
                          result.interestEarned
                        }
                        currencyCode={
                          currencyCode
                        }
                        size="card"
                        className="text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary cards */}
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-xs font-medium text-slate-400">
                  Contribution Frequency
                </p>

                <p className="mt-2 text-sm font-bold capitalize text-white">
                  {result.contributionFrequency}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-xs font-medium text-slate-400">
                  Deposit Timing
                </p>

                <p className="mt-2 text-sm font-bold text-white">
                  {result.contributionTiming ===
                  "before5th"
                    ? "On or before 5th"
                    : "After 5th"}
                </p>
              </div>
            </div>

            {/* Estimate note */}
            <div className="mt-5 rounded-2xl border border-amber-400/20 bg-amber-400/5 p-4">
              <p className="text-xs font-semibold text-amber-300">
                Estimate, not an account statement
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-400">
                This calculator uses a simplified PPF model based on your
                contribution pattern, timing, planning rate, and tenure.
                Actual PPF returns can differ because government rates,
                deposit dates, withdrawals, and account history can affect
                the final amount.
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}