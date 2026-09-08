"use client";

import {
  useMemo,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { calculatePF } from "@/lib/pf-calculator";
import ResultAmount from "@/components/calculators/ResultAmount";
import {
  formatCompactCurrency,
  formatCurrency,
} from "@/lib/format-currency";

const DEFAULT_RATE = 8.25;

const SVG_SIZE = 160;
const SVG_CENTER = SVG_SIZE / 2;
const SVG_RADIUS = 52;
const SVG_STROKE_WIDTH = 18;

const CURRENCY_CODE = "INR";

type DonutSegment =
  | "startingBalance"
  | "contributions"
  | "interest";

type SegmentDetails = {
  label:
    | "Starting Balance"
    | "New EPF Contributions"
    | "Interest Earned";
  amount: number;
  percentage: number;
  colorClass: string;
};

function hasValidValues(
  monthlyBasicDA: string,
  currentEPFBalance: string,
  annualRate: string,
  tenure: string,
): boolean {
  const monthlyBasicDAValue =
    Number(monthlyBasicDA);

  const currentEPFBalanceValue =
    Number(currentEPFBalance);

  const annualRateValue =
    Number(annualRate);

  const tenureValue =
    Number(tenure);

  return (
    Number.isFinite(
      monthlyBasicDAValue,
    ) &&
    Number.isFinite(
      currentEPFBalanceValue,
    ) &&
    Number.isFinite(
      annualRateValue,
    ) &&
    Number.isFinite(tenureValue) &&
    monthlyBasicDAValue > 0 &&
    currentEPFBalanceValue >= 0 &&
    annualRateValue >= 0 &&
    Number.isInteger(tenureValue) &&
    tenureValue > 0
  );
}

function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number,
) {
  const angleInRadians =
    ((angleInDegrees - 90) * Math.PI) /
    180;

  return {
    x:
      centerX +
      radius *
        Math.cos(angleInRadians),
    y:
      centerY +
      radius *
        Math.sin(angleInRadians),
  };
}

function describeArc(
  startAngle: number,
  endAngle: number,
) {
  const safeEndAngle =
    endAngle >= 360
      ? 359.999
      : endAngle;

  const start =
    polarToCartesian(
      SVG_CENTER,
      SVG_CENTER,
      SVG_RADIUS,
      safeEndAngle,
    );

  const end =
    polarToCartesian(
      SVG_CENTER,
      SVG_CENTER,
      SVG_RADIUS,
      startAngle,
    );

  const largeArcFlag =
    safeEndAngle - startAngle <= 180
      ? "0"
      : "1";

  return [
    `M ${start.x} ${start.y}`,
    `A ${SVG_RADIUS} ${SVG_RADIUS} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`,
  ].join(" ");
}

function InteractiveDonut({
  startingBalancePercentage,
  contributionsPercentage,
  interestPercentage,
  startingBalanceAmount,
  contributionsAmount,
  interestAmount,
  activeSegment,
  onSegmentChange,
}: {
  startingBalancePercentage: number;
  contributionsPercentage: number;
  interestPercentage: number;
  startingBalanceAmount: number;
  contributionsAmount: number;
  interestAmount: number;
  activeSegment: DonutSegment;
  onSegmentChange: (
    segment: DonutSegment,
  ) => void;
}) {
  const startingBalanceEndAngle =
    startingBalancePercentage * 3.6;

  const contributionsEndAngle =
    (startingBalancePercentage +
      contributionsPercentage) *
    3.6;

  const selectedSegment: SegmentDetails =
    activeSegment ===
    "startingBalance"
      ? {
          label: "Starting Balance",
          amount: startingBalanceAmount,
          percentage:
            startingBalancePercentage,
          colorClass:
            "text-slate-300",
        }
      : activeSegment === "interest"
        ? {
            label: "Interest Earned",
            amount: interestAmount,
            percentage:
              interestPercentage,
            colorClass:
              "text-amber-300",
          }
        : {
            label:
              "New EPF Contributions",
            amount:
              contributionsAmount,
            percentage:
              contributionsPercentage,
            colorClass:
              "text-indigo-300",
          };

  function handleSegmentKeyDown(
    event: ReactKeyboardEvent<SVGPathElement>,
    segment: DonutSegment,
  ) {
    if (
      event.key === "Enter" ||
      event.key === " "
    ) {
      event.preventDefault();
      onSegmentChange(segment);
    }
  }

  return (
    <div className="relative mx-auto flex h-44 w-44 shrink-0 items-center justify-center">
      <div
        aria-hidden="true"
        className="absolute inset-3 rounded-full bg-indigo-400/10 blur-xl"
      />

      <svg
        viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
        className="relative h-40 w-40 overflow-visible"
        role="img"
        aria-label="EPF balance breakdown"
      >
        <circle
          cx={SVG_CENTER}
          cy={SVG_CENTER}
          r={SVG_RADIUS}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={
            SVG_STROKE_WIDTH
          }
        />

        {startingBalancePercentage >
          0 && (
          <path
            d={describeArc(
              0,
              startingBalanceEndAngle,
            )}
            fill="none"
            stroke="#94a3b8"
            strokeWidth={
              activeSegment ===
              "startingBalance"
                ? SVG_STROKE_WIDTH + 2
                : SVG_STROKE_WIDTH
            }
            strokeLinecap="round"
            className="cursor-pointer transition-all duration-200"
            style={{
              opacity:
                activeSegment ===
                "startingBalance"
                  ? 1
                  : 0.45,
              filter:
                activeSegment ===
                "startingBalance"
                  ? "drop-shadow(0 0 8px rgba(148,163,184,0.42))"
                  : undefined,
            }}
            tabIndex={0}
            role="button"
            aria-label={`Starting Balance: ${formatCurrency(
              startingBalanceAmount,
              CURRENCY_CODE,
            )}, ${startingBalancePercentage.toFixed(
              1,
            )}%`}
            onMouseEnter={() =>
              onSegmentChange(
                "startingBalance",
              )
            }
            onFocus={() =>
              onSegmentChange(
                "startingBalance",
              )
            }
            onClick={() =>
              onSegmentChange(
                "startingBalance",
              )
            }
            onKeyDown={(event) =>
              handleSegmentKeyDown(
                event,
                "startingBalance",
              )
            }
          />
        )}

        {contributionsPercentage >
          0 && (
          <path
            d={describeArc(
              startingBalanceEndAngle,
              contributionsEndAngle,
            )}
            fill="none"
            stroke="#a5b4fc"
            strokeWidth={
              activeSegment ===
              "contributions"
                ? SVG_STROKE_WIDTH + 2
                : SVG_STROKE_WIDTH
            }
            strokeLinecap="round"
            className="cursor-pointer transition-all duration-200"
            style={{
              opacity:
                activeSegment ===
                "contributions"
                  ? 1
                  : 0.45,
              filter:
                activeSegment ===
                "contributions"
                  ? "drop-shadow(0 0 8px rgba(165,180,252,0.45))"
                  : undefined,
            }}
            tabIndex={0}
            role="button"
            aria-label={`New EPF Contributions: ${formatCurrency(
              contributionsAmount,
              CURRENCY_CODE,
            )}, ${contributionsPercentage.toFixed(
              1,
            )}%`}
            onMouseEnter={() =>
              onSegmentChange(
                "contributions",
              )
            }
            onFocus={() =>
              onSegmentChange(
                "contributions",
              )
            }
            onClick={() =>
              onSegmentChange(
                "contributions",
              )
            }
            onKeyDown={(event) =>
              handleSegmentKeyDown(
                event,
                "contributions",
              )
            }
          />
        )}

        {interestPercentage > 0 && (
          <path
            d={describeArc(
              contributionsEndAngle,
              360,
            )}
            fill="none"
            stroke="#fbbf24"
            strokeWidth={
              activeSegment === "interest"
                ? SVG_STROKE_WIDTH + 2
                : SVG_STROKE_WIDTH
            }
            strokeLinecap="round"
            className="cursor-pointer transition-all duration-200"
            style={{
              opacity:
                activeSegment ===
                "interest"
                  ? 1
                  : 0.45,
              filter:
                activeSegment ===
                "interest"
                  ? "drop-shadow(0 0 8px rgba(251,191,36,0.45))"
                  : undefined,
            }}
            tabIndex={0}
            role="button"
            aria-label={`Interest Earned: ${formatCurrency(
              interestAmount,
              CURRENCY_CODE,
            )}, ${interestPercentage.toFixed(
              1,
            )}%`}
            onMouseEnter={() =>
              onSegmentChange("interest")
            }
            onFocus={() =>
              onSegmentChange("interest")
            }
            onClick={() =>
              onSegmentChange("interest")
            }
            onKeyDown={(event) =>
              handleSegmentKeyDown(
                event,
                "interest",
              )
            }
          />
        )}
      </svg>

      <div className="pointer-events-none absolute flex h-[102px] w-[102px] flex-col items-center justify-center rounded-full border border-white/10 bg-slate-950/95 px-2 text-center shadow-inner">
        <span
          className={`max-w-full text-[10px] font-semibold uppercase leading-tight tracking-[0.12em] ${selectedSegment.colorClass}`}
        >
          {selectedSegment.label}
        </span>

        <span className="mt-1 max-w-[88px] whitespace-nowrap text-center text-sm font-bold leading-tight tracking-tight text-white">
          {formatCompactCurrency(
            selectedSegment.amount,
            CURRENCY_CODE,
          )}
        </span>

        <span className="mt-1 text-[10px] font-medium text-slate-500">
          {selectedSegment.percentage.toFixed(
            1,
          )}
          %
        </span>
      </div>
    </div>
  );
}

export default function PFCalculator() {
  const [
    monthlyBasicDA,
    setMonthlyBasicDA,
  ] = useState("");

  const [
    currentEPFBalance,
    setCurrentEPFBalance,
  ] = useState("0");

  const [
    annualRate,
    setAnnualRate,
  ] = useState(
    String(DEFAULT_RATE),
  );

  const [tenure, setTenure] =
    useState("");

  const [copied, setCopied] =
    useState(false);

  const [
    activeSegment,
    setActiveSegment,
  ] = useState<DonutSegment>(
    "contributions",
  );

  const isValid = hasValidValues(
    monthlyBasicDA,
    currentEPFBalance,
    annualRate,
    tenure,
  );

  const result = useMemo(() => {
    if (!isValid) {
      return null;
    }

    return calculatePF({
      monthlyBasicDA:
        Number(monthlyBasicDA),
      currentEPFBalance:
        Number(currentEPFBalance),
      annualRate:
        Number(annualRate),
      tenureYears:
        Number(tenure),
    });
  }, [
    monthlyBasicDA,
    currentEPFBalance,
    annualRate,
    tenure,
    isValid,
  ]);

  const startingBalancePercentage =
    result &&
    result.maturityAmount > 0
      ? (result.startingEPFBalance /
          result.maturityAmount) *
        100
      : 0;

  const contributionsPercentage =
    result &&
    result.maturityAmount > 0
      ? (result.totalContributions /
          result.maturityAmount) *
        100
      : 0;

  const interestPercentage =
    result &&
    result.maturityAmount > 0
      ? (result.interestEarned /
          result.maturityAmount) *
        100
      : 0;

  const resetCalculator = () => {
    setMonthlyBasicDA("");
    setCurrentEPFBalance("0");
    setAnnualRate(
      String(DEFAULT_RATE),
    );
    setTenure("");
    setCopied(false);
    setActiveSegment(
      "contributions",
    );
  };

  const copyMaturityAmount =
    async () => {
      if (!result) {
        return;
      }

      const formattedValue =
        formatCurrency(
          result.maturityAmount,
          CURRENCY_CODE,
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

          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-indigo-600">
              India • Employees'
              Provident Fund
            </p>

            <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900">
              Enter your EPF details
            </h2>

            <p className="mt-1.5 text-sm leading-6 text-slate-500">
              Enter your monthly Basic + DA,
              current EPF balance, interest
              rate, and tenure.
            </p>
          </div>
        </div>

        <div className="mt-7 space-y-5">
          <div>
            <label
              htmlFor="pf-basic-da"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Monthly Basic + DA
            </label>

            <input
              id="pf-basic-da"
              type="number"
              min="0"
              step="any"
              inputMode="decimal"
              value={monthlyBasicDA}
              onChange={(e) =>
                setMonthlyBasicDA(
                  e.target.value,
                )
              }
              placeholder="Enter amount"
              className="min-h-12 w-full min-w-0 rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
            />

            <p className="mt-2 text-xs leading-5 text-slate-500">
              Standard EPF wages are capped at ₹15,000 in this estimate.
            </p>
          </div>

          <div>
            <label
              htmlFor="pf-current-balance"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Current EPF Balance
            </label>

            <input
              id="pf-current-balance"
              type="number"
              min="0"
              step="any"
              inputMode="decimal"
              value={currentEPFBalance}
              onChange={(e) =>
                setCurrentEPFBalance(
                  e.target.value,
                )
              }
              placeholder="Enter current balance"
              className="min-h-12 w-full min-w-0 rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
            />

            <p className="mt-2 text-xs leading-5 text-slate-500">
              Enter ₹0 when starting from no existing EPF balance.
            </p>
          </div>

          <div>
            <label
              htmlFor="pf-rate"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              EPF Interest Rate (%)
            </label>

            <input
              id="pf-rate"
              type="number"
              min="0"
              step="0.01"
              inputMode="decimal"
              value={annualRate}
              onChange={(e) =>
                setAnnualRate(
                  e.target.value,
                )
              }
              placeholder="Enter rate"
              className="min-h-12 w-full min-w-0 rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
            />

            <p className="mt-2 text-xs leading-5 text-slate-500">
              Uses {DEFAULT_RATE}% as the
              planning default. The applicable
              EPF interest rate can change.
            </p>
          </div>

          <div>
            <label
              htmlFor="pf-tenure"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Tenure (Years)
            </label>

            <input
              id="pf-tenure"
              type="number"
              min="1"
              step="1"
              inputMode="numeric"
              value={tenure}
              onChange={(e) =>
                setTenure(
                  e.target.value,
                )
              }
              placeholder="Enter whole years"
              className="min-h-12 w-full min-w-0 rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
            />

            <p className="mt-2 text-xs leading-5 text-slate-500">
              Enter a whole number of years.
            </p>
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

        <div className="relative min-w-0">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-indigo-300">
              Result
            </p>

            <h2 className="mt-2 text-xl font-semibold tracking-tight text-white sm:text-2xl">
              Your EPF result
            </h2>

            <p className="mt-1.5 text-sm leading-6 text-slate-400">
              Estimated based on the values you entered.
            </p>
          </div>

          {result ? (
            <div className="relative mt-6 min-w-0 space-y-4">
              {/* Main value */}
              <div className="relative min-w-0 min-h-[176px] rounded-2xl border border-white/10 bg-white/[0.07] p-5 pb-16 backdrop-blur-sm sm:p-6 sm:pb-16">
                <div className="flex min-w-0 items-center justify-between gap-4">
                  <p className="min-w-0 text-sm font-medium text-slate-300">
                    Estimated EPF Balance
                  </p>

                  <span className="shrink-0 rounded-full border border-amber-400/15 bg-amber-400/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-amber-300">
                    Estimated
                  </span>
                </div>

                <div className="mt-4 min-w-0 w-full overflow-hidden">
                  <ResultAmount
                    value={
                      result.maturityAmount
                    }
                    currencyCode={
                      CURRENCY_CODE
                    }
                    size="hero"
                    className="text-white"
                  />
                </div>

                <button
                  type="button"
                  onClick={
                    copyMaturityAmount
                  }
                  aria-label="Copy estimated EPF balance"
                  title="Copy estimated EPF balance"
                  className="absolute bottom-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.07] text-slate-300 backdrop-blur transition-all duration-200 hover:scale-[1.03] hover:border-white/20 hover:bg-white/[0.12] hover:text-white focus:outline-none focus:ring-4 focus:ring-indigo-400/20"
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

                {copied && (
                  <p className="absolute bottom-5 right-16 text-xs font-medium text-indigo-300">
                    Copied
                  </p>
                )}
              </div>

              {/* Contribution summary */}
              <div className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.07] p-5 backdrop-blur-sm sm:p-6">
                <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-200">
                      EPF balance breakdown
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      Starting balance, new EPF contributions, and interest
                    </p>
                  </div>

                  <span className="w-fit shrink-0 whitespace-nowrap rounded-full bg-amber-400/10 px-2.5 py-1 text-xs font-semibold text-amber-300">
                    {interestPercentage.toFixed(
                      1,
                    )}
                    % interest
                  </span>
                </div>

                <InteractiveDonut
                  startingBalancePercentage={
                    startingBalancePercentage
                  }
                  contributionsPercentage={
                    contributionsPercentage
                  }
                  interestPercentage={
                    interestPercentage
                  }
                  startingBalanceAmount={
                    result.startingEPFBalance
                  }
                  contributionsAmount={
                    result.totalContributions
                  }
                  interestAmount={
                    result.interestEarned
                  }
                  activeSegment={
                    activeSegment
                  }
                  onSegmentChange={
                    setActiveSegment
                  }
                />

                <div className="mt-6 grid min-w-0 gap-3 sm:grid-cols-3">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveSegment(
                        "startingBalance",
                      )
                    }
                    className={`min-w-0 rounded-xl border p-3 text-left transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-slate-400/20 sm:p-3.5 ${
                      activeSegment ===
                      "startingBalance"
                        ? "border-slate-300/30 bg-slate-300/10"
                        : "border-white/8 bg-black/10 hover:border-slate-300/20 hover:bg-slate-300/5"
                    }`}
                    aria-pressed={
                      activeSegment ===
                      "startingBalance"
                    }
                  >
                    <div className="flex min-w-0 items-start gap-2">
                      <span
                        aria-hidden="true"
                        className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-slate-400"
                      />

                      <p className="min-w-0 break-words text-xs font-medium leading-4 text-slate-400">
                        Starting Balance
                      </p>
                    </div>

                    <p
                      className="mt-2 min-w-0 break-words text-sm font-bold leading-tight tracking-tight text-white sm:text-[15px]"
                      title={formatCurrency(
                        result.startingEPFBalance,
                        CURRENCY_CODE,
                      )}
                    >
                      {formatCompactCurrency(
                        result.startingEPFBalance,
                        CURRENCY_CODE,
                      )}
                    </p>

                    <p className="mt-1 text-xs leading-4 text-slate-500">
                      {startingBalancePercentage.toFixed(
                        1,
                      )}
                      % of balance
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setActiveSegment(
                        "contributions",
                      )
                    }
                    className={`min-w-0 rounded-xl border p-3 text-left transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-400/20 sm:p-3.5 ${
                      activeSegment ===
                      "contributions"
                        ? "border-indigo-300/30 bg-indigo-300/10"
                        : "border-white/8 bg-black/10 hover:border-indigo-300/20 hover:bg-indigo-300/5"
                    }`}
                    aria-pressed={
                      activeSegment ===
                      "contributions"
                    }
                  >
                    <div className="flex min-w-0 items-start gap-2">
                      <span
                        aria-hidden="true"
                        className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-indigo-300 shadow-[0_0_8px_rgba(165,180,252,0.45)]"
                      />

                      <p className="min-w-0 break-words text-xs font-medium leading-4 text-slate-400">
                        New EPF Contributions
                      </p>
                    </div>

                    <p
                      className="mt-2 min-w-0 break-words text-sm font-bold leading-tight tracking-tight text-white sm:text-[15px]"
                      title={formatCurrency(
                        result.totalContributions,
                        CURRENCY_CODE,
                      )}
                    >
                      {formatCompactCurrency(
                        result.totalContributions,
                        CURRENCY_CODE,
                      )}
                    </p>

                    <p className="mt-1 text-xs leading-4 text-slate-500">
                      {contributionsPercentage.toFixed(
                        1,
                      )}
                      % of balance
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setActiveSegment(
                        "interest",
                      )
                    }
                    className={`min-w-0 rounded-xl border p-3 text-left transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-amber-400/20 sm:p-3.5 ${
                      activeSegment ===
                      "interest"
                        ? "border-amber-300/30 bg-amber-300/10"
                        : "border-white/8 bg-black/10 hover:border-amber-300/20 hover:bg-amber-300/5"
                    }`}
                    aria-pressed={
                      activeSegment ===
                      "interest"
                    }
                  >
                    <div className="flex min-w-0 items-start gap-2">
                      <span
                        aria-hidden="true"
                        className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.45)]"
                      />

                      <p className="min-w-0 break-words text-xs font-medium leading-4 text-slate-400">
                        Interest Earned
                      </p>
                    </div>

                    <p
                      className="mt-2 min-w-0 break-words text-sm font-bold leading-tight tracking-tight text-white sm:text-[15px]"
                      title={formatCurrency(
                        result.interestEarned,
                        CURRENCY_CODE,
                      )}
                    >
                      {formatCompactCurrency(
                        result.interestEarned,
                        CURRENCY_CODE,
                      )}
                    </p>

                    <p className="mt-1 text-xs leading-4 text-slate-500">
                      {interestPercentage.toFixed(
                        1,
                      )}
                      % of balance
                    </p>
                  </button>
                </div>

                <div className="mt-4 grid min-w-0 gap-3 sm:grid-cols-3">
                  <div className="min-w-0 rounded-xl border border-white/8 bg-black/10 p-3">
                    <p className="text-[11px] leading-4 text-slate-500">
                      Employee EPF
                    </p>

                    <p
                      className="mt-1 min-w-0 break-words text-sm font-bold leading-tight tracking-tight text-white"
                      title={formatCurrency(
                        result.totalEmployeeContributions,
                        CURRENCY_CODE,
                      )}
                    >
                      {formatCompactCurrency(
                        result.totalEmployeeContributions,
                        CURRENCY_CODE,
                      )}
                    </p>
                  </div>

                  <div className="min-w-0 rounded-xl border border-white/8 bg-black/10 p-3">
                    <p className="text-[11px] leading-4 text-slate-500">
                      Employer EPF
                    </p>

                    <p
                      className="mt-1 min-w-0 break-words text-sm font-bold leading-tight tracking-tight text-white"
                      title={formatCurrency(
                        result.totalEmployerEPFContributions,
                        CURRENCY_CODE,
                      )}
                    >
                      {formatCompactCurrency(
                        result.totalEmployerEPFContributions,
                        CURRENCY_CODE,
                      )}
                    </p>
                  </div>

                  <div className="min-w-0 rounded-xl border border-white/8 bg-black/10 p-3">
                    <p className="text-[11px] leading-4 text-slate-500">
                      Employer EPS
                    </p>

                    <p
                      className="mt-1 min-w-0 break-words text-sm font-bold leading-tight tracking-tight text-white"
                      title={formatCurrency(
                        result.totalEmployerEPSContributions,
                        CURRENCY_CODE,
                      )}
                    >
                      {formatCompactCurrency(
                        result.totalEmployerEPSContributions,
                        CURRENCY_CODE,
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Estimate note */}
              <div className="rounded-2xl border border-amber-400/20 bg-amber-400/5 p-4">
                <p className="text-xs font-semibold text-amber-300">
                  Standard EPF estimate
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-400">
                  This estimate uses the standard ₹15,000 EPF wage ceiling,
                  employee and employer contribution structure, and monthly
                  running-balance interest. Higher-wage and other special
                  EPF arrangements are not modeled.
                </p>
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
                  Your EPF result will appear here.
                </p>

                <p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">
                  Enter your monthly Basic + DA,
                  current EPF balance, interest
                  rate, and tenure to see your
                  estimated EPF balance.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}