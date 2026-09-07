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

function hasValidValues(
  initialInvestment: string,
  monthlyWithdrawal: string,
  rate: string,
  tenure: string,
): boolean {
  return (
    Number(initialInvestment) > 0 &&
    Number(monthlyWithdrawal) >= 0 &&
    Number(rate) >= 0 &&
    Number(tenure) > 0
  );
}

type OutcomeKey =
  | "remaining"
  | "withdrawn"
  | "growth";

type OutcomeDetails = {
  label: string;
  amount: number;
  colorClass: string;
};

function OutcomeBar({
  initialInvestment,
  totalWithdrawn,
  remainingValue,
  totalGrowth,
  activeOutcome,
  onOutcomeChange,
  activeCurrency,
}: {
  initialInvestment: number;
  totalWithdrawn: number;
  remainingValue: number;
  totalGrowth: number;
  activeOutcome: OutcomeKey;
  onOutcomeChange: (outcome: OutcomeKey) => void;
  activeCurrency: string;
}) {
  const totalReference =
    initialInvestment +
    Math.max(totalGrowth, 0);

  const withdrawnShare =
    totalReference > 0
      ? Math.min(
          (totalWithdrawn / totalReference) * 100,
          100,
        )
      : 0;

  const remainingShare =
    totalReference > 0
      ? Math.min(
          (remainingValue / totalReference) * 100,
          100,
        )
      : 0;

  const details: Record<
    OutcomeKey,
    OutcomeDetails
  > = {
    remaining: {
      label: "Remaining Value",
      amount: remainingValue,
      colorClass: "text-indigo-300",
    },
    withdrawn: {
      label: "Total Withdrawn",
      amount: totalWithdrawn,
      colorClass: "text-amber-300",
    },
    growth: {
      label: "Net Growth",
      amount: totalGrowth,
      colorClass:
        totalGrowth >= 0
          ? "text-emerald-300"
          : "text-rose-300",
    },
  };

  const selected = details[activeOutcome];

  return (
    <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.07] p-5 backdrop-blur-sm sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-200">
            SWP outcome
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-400">
            See how your investment is distributed.
          </p>
        </div>

        <div
          className={`shrink-0 rounded-full bg-white/5 px-2.5 py-1 text-xs font-semibold ${selected.colorClass}`}
        >
          {selected.label}
        </div>
      </div>

      {/* Outcome bar */}
      <div className="mt-6">
        <div className="h-3 overflow-hidden rounded-full bg-white/5">
          <div className="flex h-full w-full">
            <div
              className="h-full bg-amber-400 transition-all duration-200"
              style={{
                width: `${withdrawnShare}%`,
              }}
            />

            <div
              className="h-full bg-indigo-300 transition-all duration-200"
              style={{
                width: `${remainingShare}%`,
              }}
            />
          </div>
        </div>

        <div className="mt-3 grid gap-2 text-xs text-slate-500 sm:grid-cols-2">
          <span className="break-words">
            {formatCurrency(
              totalWithdrawn,
              activeCurrency,
            )}{" "}
            withdrawn
          </span>

          <span className="break-words sm:text-right">
            {formatCurrency(
              remainingValue,
              activeCurrency,
            )}{" "}
            remaining
          </span>
        </div>
      </div>

      {/* Outcome selector */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() =>
            onOutcomeChange("remaining")
          }
          aria-pressed={
            activeOutcome === "remaining"
          }
          className={`min-h-12 min-w-0 rounded-xl border p-4 text-left transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-400/20 ${
            activeOutcome === "remaining"
              ? "border-indigo-300/30 bg-indigo-300/10"
              : "border-white/8 bg-black/10 hover:border-indigo-300/20 hover:bg-indigo-300/5"
          }`}
        >
          <div className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="h-2.5 w-2.5 shrink-0 rounded-full bg-indigo-300 shadow-[0_0_8px_rgba(165,180,252,0.45)]"
            />

            <span className="text-xs font-medium text-slate-400">
              Remaining Value
            </span>
          </div>

          <p className="mt-2 break-words text-base font-semibold text-white sm:text-lg">
            {formatCurrency(
              remainingValue,
              activeCurrency,
            )}
          </p>
        </button>

        <button
          type="button"
          onClick={() =>
            onOutcomeChange("withdrawn")
          }
          aria-pressed={
            activeOutcome === "withdrawn"
          }
          className={`min-h-12 min-w-0 rounded-xl border p-4 text-left transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-amber-400/20 ${
            activeOutcome === "withdrawn"
              ? "border-amber-300/30 bg-amber-300/10"
              : "border-white/8 bg-black/10 hover:border-amber-300/20 hover:bg-amber-300/5"
          }`}
        >
          <div className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="h-2.5 w-2.5 shrink-0 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.45)]"
            />

            <span className="text-xs font-medium text-slate-400">
              Total Withdrawn
            </span>
          </div>

          <p className="mt-2 break-words text-base font-semibold text-white sm:text-lg">
            {formatCurrency(
              totalWithdrawn,
              activeCurrency,
            )}
          </p>
        </button>

        <button
          type="button"
          onClick={() =>
            onOutcomeChange("growth")
          }
          aria-pressed={
            activeOutcome === "growth"
          }
          className={`min-h-12 min-w-0 rounded-xl border p-4 text-left transition-all duration-200 sm:col-span-2 focus:outline-none ${
            totalGrowth >= 0
              ? "focus:ring-4 focus:ring-emerald-400/20"
              : "focus:ring-4 focus:ring-rose-400/20"
          } ${
            activeOutcome === "growth"
              ? totalGrowth >= 0
                ? "border-emerald-300/30 bg-emerald-300/10"
                : "border-rose-300/30 bg-rose-300/10"
              : "border-white/8 bg-black/10 hover:border-emerald-300/20 hover:bg-emerald-300/5"
          }`}
        >
          <div className="flex items-center gap-2">
            <span
              className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                totalGrowth >= 0
                  ? "bg-emerald-400"
                  : "bg-rose-400"
              }`}
            />

            <span className="text-xs font-medium text-slate-400">
              Net Growth
            </span>
          </div>

          <div className="mt-2 flex flex-wrap items-baseline justify-between gap-2">
            <p
              className={`break-words text-base font-semibold sm:text-lg ${
                totalGrowth >= 0
                  ? "text-white"
                  : "text-rose-300"
              }`}
            >
              {formatCurrency(
                totalGrowth,
                activeCurrency,
              )}
            </p>

            <span
              className={`text-xs font-medium ${
                totalGrowth >= 0
                  ? "text-emerald-300"
                  : "text-rose-300"
              }`}
            >
              {totalGrowth >= 0
                ? "Positive growth"
                : "Capital shortfall"}
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}

export default function SWPCalculator() {
  const [initialInvestment, setInitialInvestment] =
    useState("");
  const [monthlyWithdrawal, setMonthlyWithdrawal] =
    useState("");
  const [rate, setRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [currency, setCurrency] = useState<
    string | null
  >(null);
  const [copied, setCopied] = useState(false);
  const [activeOutcome, setActiveOutcome] =
    useState<OutcomeKey>("remaining");

  const isValid = hasValidValues(
    initialInvestment,
    monthlyWithdrawal,
    rate,
    tenure,
  );

  const result = useMemo(() => {
    if (!isValid) {
      return null;
    }

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
    isValid,
  ]);

  const activeCurrency = currency ?? "INR";

  const resetCalculator = () => {
    setInitialInvestment("");
    setMonthlyWithdrawal("");
    setRate("");
    setTenure("");
    setCopied(false);
    setActiveOutcome("remaining");
  };

  const copyRemainingValue = async () => {
    if (!result) {
      return;
    }

    const formattedValue = formatCurrency(
      result.remainingValue,
      activeCurrency,
    );

    try {
      await navigator.clipboard.writeText(
        formattedValue,
      );

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="grid min-w-0 gap-6 lg:grid-cols-2 lg:items-start">
      {/* Input panel */}
      <div className="min-w-0 rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_12px_40px_rgba(15,23,42,0.06)] sm:p-7">
        <div className="flex items-start gap-3">
          <span
            aria-hidden="true"
            className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-indigo-500 shadow-[0_0_0_4px_rgba(99,102,241,0.10)]"
          />

          <div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-900">
              Enter your SWP details
            </h2>

            <p className="mt-1.5 text-sm leading-6 text-slate-500">
              Enter your investment, withdrawal, expected return,
              and tenure to estimate your result.
            </p>
          </div>
        </div>

        <div className="mt-7 space-y-5">
          <CurrencySelector
            value={currency}
            onChange={setCurrency}
          />

          <div>
            <label
              htmlFor="swp-investment"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Initial Investment
            </label>

            <input
              id="swp-investment"
              type="number"
              min="1"
              step="any"
              inputMode="decimal"
              value={initialInvestment}
              onChange={(e) =>
                setInitialInvestment(
                  e.target.value,
                )
              }
              placeholder="Enter amount"
              className="min-h-12 w-full min-w-0 rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
            />
          </div>

          <div>
            <label
              htmlFor="swp-withdrawal"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Monthly Withdrawal
            </label>

            <input
              id="swp-withdrawal"
              type="number"
              min="0"
              step="any"
              inputMode="decimal"
              value={monthlyWithdrawal}
              onChange={(e) =>
                setMonthlyWithdrawal(
                  e.target.value,
                )
              }
              placeholder="Enter amount"
              className="min-h-12 w-full min-w-0 rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
            />
          </div>

          <div>
            <label
              htmlFor="swp-rate"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Expected Annual Return (%)
            </label>

            <input
              id="swp-rate"
              type="number"
              min="0"
              step="0.01"
              inputMode="decimal"
              value={rate}
              onChange={(e) =>
                setRate(e.target.value)
              }
              placeholder="Enter rate"
              className="min-h-12 w-full min-w-0 rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
            />
          </div>

          <div>
            <label
              htmlFor="swp-tenure"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Tenure (Years)
            </label>

            <input
              id="swp-tenure"
              type="number"
              min="0.01"
              step="0.01"
              inputMode="decimal"
              value={tenure}
              onChange={(e) =>
                setTenure(e.target.value)
              }
              placeholder="Enter years"
              className="min-h-12 w-full min-w-0 rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
            />
          </div>

          <button
            type="button"
            onClick={resetCalculator}
            className="min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50 hover:shadow-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Result panel */}
      <div className="relative min-w-0 overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-5 text-white shadow-[0_18px_50px_rgba(15,23,42,0.18)] sm:p-7 lg:sticky lg:top-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-52 w-52 rounded-full bg-indigo-500/10 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-24 h-52 w-52 rounded-full bg-amber-400/5 blur-3xl"
        />

        <div className="relative">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-indigo-300">
                Result
              </p>

              <h2 className="mt-2 text-xl font-semibold tracking-tight text-white sm:text-2xl">
                Your SWP result
              </h2>

              <p className="mt-1.5 text-sm leading-6 text-slate-400">
                Estimated based on the values you entered.
              </p>
            </div>

            {result && (
              <button
                type="button"
                onClick={copyRemainingValue}
                aria-label="Copy remaining value"
                title="Copy remaining value"
                className="inline-flex min-h-12 min-w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.07] text-slate-200 backdrop-blur transition-all duration-200 hover:scale-[1.02] hover:border-white/20 hover:bg-white/[0.12] hover:text-white focus:outline-none focus:ring-4 focus:ring-indigo-400/20"
              >
                {copied ? (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path d="m5 12 4 4L19 6" />
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
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
                )}
              </button>
            )}
          </div>

          {result ? (
            <div className="relative mt-6 space-y-4">
              {/* Main value */}
              <div className="min-h-[176px] rounded-2xl border border-white/10 bg-white/[0.07] p-5 backdrop-blur-sm sm:p-6">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-medium text-slate-300">
                    Remaining Value
                  </p>

                  <span className="rounded-full border border-amber-400/15 bg-amber-400/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-amber-300">
                    Estimated
                  </span>
                </div>

                <p className="mt-4 break-words text-4xl font-bold tracking-tight text-white sm:text-5xl">
                  {formatCurrency(
                    result.remainingValue,
                    activeCurrency,
                  )}
                </p>

                {copied && (
                  <p className="mt-3 text-sm font-medium text-indigo-300">
                    Copied to clipboard
                  </p>
                )}
              </div>

              <OutcomeBar
                initialInvestment={Number(
                  initialInvestment,
                )}
                totalWithdrawn={
                  result.totalWithdrawn
                }
                remainingValue={
                  result.remainingValue
                }
                totalGrowth={result.totalGrowth}
                activeOutcome={activeOutcome}
                onOutcomeChange={
                  setActiveOutcome
                }
                activeCurrency={activeCurrency}
              />
            </div>
          ) : (
            <div className="relative mt-6 min-h-[384px] rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-sm">
              <div className="flex min-h-[344px] flex-col justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-indigo-300"
                    aria-hidden="true"
                  >
                    <path d="M4 19V5" />
                    <path d="M4 19h16" />
                    <path d="m8 15 3-4 3 2 4-6" />
                  </svg>
                </div>

                <p className="mt-5 text-base font-semibold text-slate-200">
                  Your result will appear here.
                </p>

                <p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">
                  Enter your initial investment, monthly withdrawal,
                  expected return, and tenure to see your estimated
                  remaining value.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}