"use client";

import { useMemo, useState } from "react";
import { calculateRD } from "@/lib/rd-calculator";
import CurrencySelector from "@/components/calculators/CurrencySelector";
import ResultAmount from "@/components/calculators/ResultAmount";
import {
  formatCompactCurrency,
  formatCurrency,
} from "@/lib/format-currency";

const SVG_SIZE = 160;
const SVG_CENTER = SVG_SIZE / 2;
const SVG_RADIUS = 58;
const SVG_STROKE_WIDTH = 24;

type DonutSegment = "deposited" | "interest";

type SegmentDetails = {
  label: "Total Deposited" | "Interest";
  amount: number;
  percentage: number;
  colorClass: string;
};

function hasValidValues(
  monthlyDeposit: string,
  rate: string,
  tenure: string,
): boolean {
  return (
    Number(monthlyDeposit) > 0 &&
    Number(rate) >= 0 &&
    Number(tenure) > 0
  );
}

function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number,
) {
  const angleInRadians =
    ((angleInDegrees - 90) * Math.PI) / 180;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

function describeArc(
  startAngle: number,
  endAngle: number,
) {
  const start = polarToCartesian(
    SVG_CENTER,
    SVG_CENTER,
    SVG_RADIUS,
    endAngle,
  );

  const end = polarToCartesian(
    SVG_CENTER,
    SVG_CENTER,
    SVG_RADIUS,
    startAngle,
  );

  const largeArcFlag =
    endAngle - startAngle <= 180 ? "0" : "1";

  return [
    `M ${start.x} ${start.y}`,
    `A ${SVG_RADIUS} ${SVG_RADIUS} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`,
  ].join(" ");
}

function InteractiveDonut({
  depositedPercentage,
  interestPercentage,
  depositedAmount,
  interestAmount,
  activeCurrency,
  activeSegment,
  onSegmentChange,
}: {
  depositedPercentage: number;
  interestPercentage: number;
  depositedAmount: number;
  interestAmount: number;
  activeCurrency: string;
  activeSegment: DonutSegment;
  onSegmentChange: (segment: DonutSegment) => void;
}) {
  const depositedEndAngle =
    depositedPercentage * 3.6;

  const selectedSegment: SegmentDetails =
    activeSegment === "interest"
      ? {
          label: "Interest",
          amount: interestAmount,
          percentage: interestPercentage,
          colorClass: "text-amber-300",
        }
      : {
          label: "Total Deposited",
          amount: depositedAmount,
          percentage: depositedPercentage,
          colorClass: "text-indigo-300",
        };

  return (
    <div className="relative mx-auto mt-7 flex h-44 w-44 items-center justify-center">
      <div
        aria-hidden="true"
        className="absolute inset-3 rounded-full bg-indigo-400/10 blur-xl"
      />

      <svg
        viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
        className="relative h-40 w-40 overflow-visible"
        aria-hidden="true"
      >
        <circle
          cx={SVG_CENTER}
          cy={SVG_CENTER}
          r={SVG_RADIUS}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={SVG_STROKE_WIDTH}
        />

        {depositedPercentage > 0 && (
          <path
            d={describeArc(
              0,
              depositedEndAngle,
            )}
            fill="none"
            stroke="#a5b4fc"
            strokeWidth={SVG_STROKE_WIDTH}
            strokeLinecap="round"
            className="cursor-pointer transition-all duration-200"
            style={{
              opacity:
                activeSegment === "deposited"
                  ? 1
                  : 0.5,
              filter:
                activeSegment === "deposited"
                  ? "drop-shadow(0 0 7px rgba(165,180,252,0.45))"
                  : undefined,
            }}
            onMouseEnter={() =>
              onSegmentChange(
                "deposited",
              )
            }
          />
        )}

        {interestPercentage > 0 && (
          <path
            d={describeArc(
              depositedEndAngle,
              360,
            )}
            fill="none"
            stroke="#fbbf24"
            strokeWidth={SVG_STROKE_WIDTH}
            strokeLinecap="round"
            className="cursor-pointer transition-all duration-200"
            style={{
              opacity:
                activeSegment === "interest"
                  ? 1
                  : 0.5,
              filter:
                activeSegment === "interest"
                  ? "drop-shadow(0 0 7px rgba(251,191,36,0.45))"
                  : undefined,
            }}
            onMouseEnter={() =>
              onSegmentChange("interest")
            }
          />
        )}
      </svg>

      <div className="pointer-events-none absolute flex h-[102px] w-[102px] flex-col items-center justify-center rounded-full border border-white/10 bg-slate-950/95 px-2 text-center shadow-inner">
        <span
          className={`text-[10px] font-semibold uppercase tracking-[0.12em] ${selectedSegment.colorClass}`}
        >
          {selectedSegment.label}
        </span>

        <span className="mt-1 max-w-full break-words text-base font-bold leading-tight tracking-tight text-white">
          {formatCompactCurrency(
            selectedSegment.amount,
            activeCurrency,
          )}
        </span>

        <span className="mt-1 text-[10px] font-medium text-slate-500">
          {selectedSegment.percentage.toFixed(1)}%
        </span>
      </div>
    </div>
  );
}

export default function RDCalculator() {
  const [monthlyDeposit, setMonthlyDeposit] =
    useState("");
  const [rate, setRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [currency, setCurrency] = useState<
    string | null
  >(null);
  const [copied, setCopied] = useState(false);

  const [activeSegment, setActiveSegment] =
    useState<DonutSegment>("deposited");

  const isValid = hasValidValues(
    monthlyDeposit,
    rate,
    tenure,
  );

  const result = useMemo(() => {
    if (!isValid) {
      return null;
    }

    return calculateRD({
      monthlyDeposit: Number(monthlyDeposit),
      annualRate: Number(rate),
      tenureMonths: Number(tenure),
    });
  }, [
    monthlyDeposit,
    rate,
    tenure,
    isValid,
  ]);

  const activeCurrency = currency ?? "INR";

  const depositedPercentage =
    result && result.maturityAmount > 0
      ? (result.totalDeposited /
          result.maturityAmount) *
        100
      : 0;

  const interestPercentage =
    result && result.maturityAmount > 0
      ? (result.interestEarned /
          result.maturityAmount) *
        100
      : 0;

  const resetCalculator = () => {
    setMonthlyDeposit("");
    setRate("");
    setTenure("");
    setCopied(false);
    setActiveSegment("deposited");
  };

  const copyMaturityAmount = async () => {
    if (!result) {
      return;
    }

    const formattedValue = formatCurrency(
      result.maturityAmount,
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
              Enter your RD details
            </h2>

            <p className="mt-1.5 text-sm leading-6 text-slate-500">
              Enter the details below to see your estimated maturity amount.
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
              htmlFor="rd-monthly-deposit"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Monthly Deposit
            </label>

            <input
              id="rd-monthly-deposit"
              type="number"
              min="1"
              step="any"
              inputMode="decimal"
              value={monthlyDeposit}
              onChange={(e) =>
                setMonthlyDeposit(
                  e.target.value,
                )
              }
              placeholder="Enter amount"
              className="min-h-12 w-full min-w-0 rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
            />
          </div>

          <div>
            <label
              htmlFor="rd-rate"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Annual Interest Rate (%)
            </label>

            <input
              id="rd-rate"
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
              htmlFor="rd-tenure"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Tenure (Months)
            </label>

            <input
              id="rd-tenure"
              type="number"
              min="1"
              step="1"
              inputMode="numeric"
              value={tenure}
              onChange={(e) =>
                setTenure(e.target.value)
              }
              placeholder="Enter months"
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
                Your RD result
              </h2>

              <p className="mt-1.5 text-sm leading-6 text-slate-400">
                Estimated based on the values you entered.
              </p>
            </div>

            {result && (
              <button
                type="button"
                onClick={copyMaturityAmount}
                aria-label="Copy maturity amount"
                title="Copy maturity amount"
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
                    Maturity Amount
                  </p>

                  <span className="rounded-full border border-amber-400/15 bg-amber-400/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-amber-300">
                    Estimated
                  </span>
                </div>

                <div className="mt-4 min-w-0">
                  <ResultAmount
                    value={
                      result.maturityAmount
                    }
                    currencyCode={
                      activeCurrency
                    }
                    size="hero"
                    className="text-white"
                  />
                </div>

                {copied && (
                  <p className="mt-3 text-sm font-medium text-indigo-300">
                    Copied to clipboard
                  </p>
                )}
              </div>

              {/* Breakdown */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-5 backdrop-blur-sm sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-200">
                      Investment breakdown
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      Select a segment to inspect its share
                    </p>
                  </div>

                  <span className="shrink-0 rounded-full bg-amber-400/10 px-2.5 py-1 text-xs font-semibold text-amber-300">
                    {interestPercentage.toFixed(1)}% interest
                  </span>
                </div>

                <InteractiveDonut
                  depositedPercentage={
                    depositedPercentage
                  }
                  interestPercentage={
                    interestPercentage
                  }
                  depositedAmount={
                    result.totalDeposited
                  }
                  interestAmount={
                    result.interestEarned
                  }
                  activeCurrency={
                    activeCurrency
                  }
                  activeSegment={
                    activeSegment
                  }
                  onSegmentChange={
                    setActiveSegment
                  }
                />

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveSegment(
                        "deposited",
                      )
                    }
                    className={`min-h-12 min-w-0 rounded-xl border p-4 text-left transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-400/20 ${
                      activeSegment ===
                      "deposited"
                        ? "border-indigo-300/30 bg-indigo-300/10"
                        : "border-white/8 bg-black/10 hover:border-indigo-300/20 hover:bg-indigo-300/5"
                    }`}
                    aria-pressed={
                      activeSegment ===
                      "deposited"
                    }
                  >
                    <div className="flex items-center gap-2">
                      <span
                        aria-hidden="true"
                        className="h-2.5 w-2.5 shrink-0 rounded-full bg-indigo-300 shadow-[0_0_8px_rgba(165,180,252,0.45)]"
                      />

                      <p className="text-xs font-medium text-slate-400">
                        Total Deposited
                      </p>
                    </div>

                    <div className="mt-2 min-w-0">
                      <ResultAmount
                        value={
                          result.totalDeposited
                        }
                        currencyCode={
                          activeCurrency
                        }
                        size="card"
                        className="text-white"
                      />
                    </div>

                    <p className="mt-1 text-xs text-slate-500">
                      {depositedPercentage.toFixed(
                        1,
                      )}
                      % of total
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setActiveSegment(
                        "interest",
                      )
                    }
                    className={`min-h-12 min-w-0 rounded-xl border p-4 text-left transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-amber-400/20 ${
                      activeSegment === "interest"
                        ? "border-amber-300/30 bg-amber-300/10"
                        : "border-white/8 bg-black/10 hover:border-amber-300/20 hover:bg-amber-300/5"
                    }`}
                    aria-pressed={
                      activeSegment === "interest"
                    }
                  >
                    <div className="flex items-center gap-2">
                      <span
                        aria-hidden="true"
                        className="h-2.5 w-2.5 shrink-0 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.45)]"
                      />

                      <p className="text-xs font-medium text-slate-400">
                        Interest
                      </p>
                    </div>

                    <div className="mt-2 min-w-0">
                      <ResultAmount
                        value={
                          result.interestEarned
                        }
                        currencyCode={
                          activeCurrency
                        }
                        size="card"
                        className="text-white"
                      />
                    </div>

                    <p className="mt-1 text-xs text-slate-500">
                      {interestPercentage.toFixed(
                        1,
                      )}
                      % of total
                    </p>
                  </button>
                </div>
              </div>
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
                  Enter your monthly deposit, interest rate, and tenure to
                  see your estimated maturity amount and interest earned.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}