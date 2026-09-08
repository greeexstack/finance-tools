"use client";

import {
  type KeyboardEvent as ReactKeyboardEvent,
  useMemo,
  useState,
} from "react";
import {
  calculatePPF,
  type PPFContributionFrequency,
  type PPFContributionTiming,
} from "@/lib/ppf-calculator";

const SVG_SIZE = 160;
const SVG_CENTER = SVG_SIZE / 2;
const SVG_RADIUS = 58;
const SVG_STROKE_WIDTH = 24;

type DonutSegment =
  | "contributions"
  | "interest";

type SegmentDetails = {
  label:
    | "Total Contributions"
    | "Interest Earned";
  amount: number;
  percentage: number;
  colorClass: string;
};

function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);
}

function formatCompactINR(amount: number): string {
  let value = amount;
  let suffix = "";

  if (Math.abs(amount) >= 10_000_000) {
    value = amount / 10_000_000;
    suffix = "Cr";
  } else if (Math.abs(amount) >= 100_000) {
    value = amount / 100_000;
    suffix = "L";
  } else if (Math.abs(amount) >= 1_000) {
    value = amount / 1_000;
    suffix = "K";
  }

  const formattedValue = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits:
      value >= 100 ? 0 : value >= 10 ? 1 : 2,
  }).format(value);

  return `₹${formattedValue}${suffix}`;
}

function getResultValueClass(amount: number): string {
  if (amount >= 100_000_000) {
    return "text-2xl sm:text-3xl";
  }

  if (amount >= 10_000_000) {
    return "text-3xl sm:text-4xl";
  }

  if (amount >= 1_000_000) {
    return "text-4xl sm:text-[2.75rem]";
  }

  return "text-4xl sm:text-5xl";
}

function getAnnualContribution(
  contribution: string,
  frequency: PPFContributionFrequency,
): number {
  const value = Number(contribution);

  if (!Number.isFinite(value)) {
    return NaN;
  }

  return frequency === "monthly"
    ? value * 12
    : value;
}

function getValidationMessage(
  contribution: string,
  rate: string,
  tenure: string,
  frequency: PPFContributionFrequency,
): string | null {
  if (
    contribution === "" ||
    rate === "" ||
    tenure === ""
  ) {
    return null;
  }

  const contributionValue = Number(contribution);
  const rateValue = Number(rate);
  const tenureValue = Number(tenure);

  if (!Number.isFinite(contributionValue)) {
    return "Enter a valid contribution amount.";
  }

  if (contributionValue <= 0) {
    return "Enter a contribution greater than ₹0.";
  }

  if (contributionValue % 50 !== 0) {
    return "PPF contributions must be in multiples of ₹50.";
  }

  const annualContribution = getAnnualContribution(
    contribution,
    frequency,
  );

  if (annualContribution < 500) {
    return frequency === "monthly"
      ? "Your monthly contribution must total at least ₹500 per financial year."
      : "The minimum annual PPF contribution is ₹500.";
  }

  if (annualContribution > 150_000) {
    return frequency === "monthly"
      ? "Your monthly contribution would exceed the ₹1,50,000 annual PPF limit."
      : "The maximum annual PPF contribution is ₹1,50,000.";
  }

  if (!Number.isFinite(rateValue) || rateValue < 0) {
    return "Enter a valid interest rate.";
  }

  if (!Number.isFinite(tenureValue) || !Number.isInteger(tenureValue)) {
    return "Enter a whole number of years.";
  }

  if (tenureValue < 15) {
    return "Standard PPF maturity is 15 years.";
  }

  if ((tenureValue - 15) % 5 !== 0) {
    return "Use 15 years, or a 5-year extension block such as 20, 25, or 30 years.";
  }

  return null;
}

function hasValidValues(
  contribution: string,
  rate: string,
  tenure: string,
  frequency: PPFContributionFrequency,
): boolean {
  return (
    getValidationMessage(
      contribution,
      rate,
      tenure,
      frequency,
    ) === null &&
    contribution !== "" &&
    rate !== "" &&
    tenure !== ""
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
    x:
      centerX +
      radius * Math.cos(angleInRadians),
    y:
      centerY +
      radius * Math.sin(angleInRadians),
  };
}

function describeArc(
  startAngle: number,
  endAngle: number,
) {
  const safeEndAngle =
    endAngle >= 360 ? 359.999 : endAngle;

  const start = polarToCartesian(
    SVG_CENTER,
    SVG_CENTER,
    SVG_RADIUS,
    safeEndAngle,
  );

  const end = polarToCartesian(
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
  contributionsPercentage,
  interestPercentage,
  contributionsAmount,
  interestAmount,
  activeSegment,
  onSegmentChange,
}: {
  contributionsPercentage: number;
  interestPercentage: number;
  contributionsAmount: number;
  interestAmount: number;
  activeSegment: DonutSegment;
  onSegmentChange: (
    segment: DonutSegment,
  ) => void;
}) {
  const contributionsEndAngle =
    contributionsPercentage * 3.6;

  const selectedSegment: SegmentDetails =
    activeSegment === "interest"
      ? {
          label: "Interest Earned",
          amount: interestAmount,
          percentage: interestPercentage,
          colorClass: "text-amber-300",
        }
      : {
          label: "Total Contributions",
          amount: contributionsAmount,
          percentage: contributionsPercentage,
          colorClass: "text-indigo-300",
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
        aria-label="PPF investment breakdown"
      >
        <circle
          cx={SVG_CENTER}
          cy={SVG_CENTER}
          r={SVG_RADIUS}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={SVG_STROKE_WIDTH}
        />

        {contributionsPercentage > 0 && (
          <path
            d={describeArc(
              0,
              contributionsEndAngle,
            )}
            fill="none"
            stroke="#a5b4fc"
            strokeWidth={SVG_STROKE_WIDTH}
            strokeLinecap="round"
            className="cursor-pointer outline-none transition-all duration-200 focus-visible:opacity-100 focus-visible:[filter:drop-shadow(0_0_7px_rgba(165,180,252,0.7))]"
            style={{
              opacity:
                activeSegment === "contributions"
                  ? 1
                  : 0.5,
              filter:
                activeSegment === "contributions"
                  ? "drop-shadow(0 0 7px rgba(165,180,252,0.45))"
                  : undefined,
            }}
            role="button"
            tabIndex={0}
            aria-label={`Total Contributions: ${formatINR(
              contributionsAmount,
            )}, ${contributionsPercentage.toFixed(
              1,
            )}%`}
            aria-pressed={
              activeSegment === "contributions"
            }
            onMouseEnter={() =>
              onSegmentChange("contributions")
            }
            onFocus={() =>
              onSegmentChange("contributions")
            }
            onClick={() =>
              onSegmentChange("contributions")
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
            strokeWidth={SVG_STROKE_WIDTH}
            strokeLinecap="round"
            className="cursor-pointer outline-none transition-all duration-200 focus-visible:opacity-100 focus-visible:[filter:drop-shadow(0_0_7px_rgba(251,191,36,0.7))]"
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
            role="button"
            tabIndex={0}
            aria-label={`Interest Earned: ${formatINR(
              interestAmount,
            )}, ${interestPercentage.toFixed(
              1,
            )}%`}
            aria-pressed={
              activeSegment === "interest"
            }
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
          {formatCompactINR(
            selectedSegment.amount,
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

export default function PPFCalculator() {
  const [contribution, setContribution] =
    useState("");

  const [frequency, setFrequency] =
    useState<PPFContributionFrequency>(
      "yearly",
    );

  const [rate, setRate] =
    useState("7.1");

  const [tenure, setTenure] =
    useState("15");

  const [timing, setTiming] =
    useState<PPFContributionTiming>(
      "before5th",
    );

  const [copied, setCopied] =
    useState(false);

  const [
    activeSegment,
    setActiveSegment,
  ] = useState<DonutSegment>(
    "contributions",
  );

  const isValid = hasValidValues(
    contribution,
    rate,
    tenure,
    frequency,
  );

  const validationMessage =
    getValidationMessage(
      contribution,
      rate,
      tenure,
      frequency,
    );

  const result = useMemo(() => {
    if (!isValid) {
      return null;
    }

    return calculatePPF({
      contributionAmount:
        Number(contribution),
      annualRate: Number(rate),
      tenureYears: Number(tenure),
      contributionFrequency:
        frequency,
      contributionTiming: timing,
    });
  }, [
    contribution,
    rate,
    tenure,
    frequency,
    timing,
    isValid,
  ]);

  const annualContribution =
    getAnnualContribution(
      contribution,
      frequency,
    );

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
    setContribution("");
    setFrequency("yearly");
    setRate("7.1");
    setTenure("15");
    setTiming("before5th");
    setCopied(false);
    setActiveSegment("contributions");
  };

  const copyMaturityAmount = async () => {
    if (!result) {
      return;
    }

    const formattedValue = formatINR(
      result.maturityAmount,
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
              India • Public Provident Fund
            </p>

            <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900">
              Enter your PPF details
            </h2>

            <p className="mt-1.5 text-sm leading-6 text-slate-500">
              Enter your contribution,
              planning interest rate, tenure,
              and deposit timing to estimate
              your PPF value.
            </p>
          </div>
        </div>

        <div className="mt-7 space-y-5">
          <div>
            <label
              htmlFor="ppf-frequency"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Contribution Frequency
            </label>

            <select
              id="ppf-frequency"
              value={frequency}
              onChange={(event) =>
                setFrequency(
                  event.target
                    .value as PPFContributionFrequency,
                )
              }
              className="min-h-12 w-full min-w-0 rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition-all duration-200 hover:border-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
            >
              <option value="yearly">
                Yearly contribution
              </option>

              <option value="monthly">
                Monthly contribution
              </option>
            </select>
          </div>

          <div>
            <label
              htmlFor="ppf-contribution"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              {frequency === "monthly"
                ? "Monthly Contribution"
                : "Annual Contribution"}
            </label>

            <input
              id="ppf-contribution"
              type="number"
              min="50"
              max={
                frequency === "monthly"
                  ? "12500"
                  : "150000"
              }
              step="50"
              inputMode="numeric"
              value={contribution}
              onChange={(event) =>
                setContribution(
                  event.target.value,
                )
              }
              placeholder={
                frequency === "monthly"
                  ? "₹50 – ₹12,500"
                  : "₹500 – ₹1,50,000"
              }
              aria-invalid={Boolean(
                validationMessage,
              )}
              className="min-h-12 w-full min-w-0 rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
            />

            <p className="mt-1.5 text-xs leading-5 text-slate-500">
              {frequency === "monthly"
                ? "Must be in ₹50 multiples and stay within the ₹1,50,000 annual PPF limit."
                : "Minimum ₹500, maximum ₹1,50,000 per financial year, in ₹50 multiples."}
            </p>

            {validationMessage && (
              <p
                className="mt-2 text-xs font-medium leading-5 text-rose-600"
                role="alert"
              >
                {validationMessage}
              </p>
            )}

            {Number.isFinite(
              annualContribution,
            ) &&
              contribution !== "" &&
              frequency === "monthly" && (
                <p className="mt-2 text-xs text-slate-500">
                  Annual contribution:{" "}
                  {formatINR(
                    annualContribution,
                  )}
                </p>
              )}
          </div>

          <div>
            <label
              htmlFor="ppf-rate"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Planning Interest Rate (%)
            </label>

            <input
              id="ppf-rate"
              type="number"
              min="0"
              step="0.01"
              inputMode="decimal"
              value={rate}
              onChange={(event) =>
                setRate(
                  event.target.value,
                )
              }
              placeholder="7.1"
              className="min-h-12 w-full min-w-0 rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
            />

            <p className="mt-1.5 text-xs leading-5 text-slate-500">
              Planning assumption only.
              Government-notified PPF rates
              may change over time.
            </p>
          </div>

          <div>
            <label
              htmlFor="ppf-tenure"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Tenure (Years)
            </label>

            <input
              id="ppf-tenure"
              type="number"
              min="15"
              step="5"
              inputMode="numeric"
              value={tenure}
              onChange={(event) =>
                setTenure(
                  event.target.value,
                )
              }
              placeholder="15"
              className="min-h-12 w-full min-w-0 rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
            />

            <p className="mt-1.5 text-xs leading-5 text-slate-500">
              Standard maturity is 15 years.
              Additional projections use
              5-year blocks.
            </p>
          </div>

          <div>
            <label
              htmlFor="ppf-timing"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Deposit Timing
            </label>

            <select
              id="ppf-timing"
              value={timing}
              onChange={(event) =>
                setTiming(
                  event.target
                    .value as PPFContributionTiming,
                )
              }
              className="min-h-12 w-full min-w-0 rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition-all duration-200 hover:border-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
            >
              <option value="before5th">
                On or before the 5th
              </option>

              <option value="after5th">
                After the 5th
              </option>
            </select>

            <p className="mt-1.5 text-xs leading-5 text-slate-500">
              Timing affects whether a
              contribution is included in that
              month's interest-eligible balance.
            </p>
          </div>

          <div className="rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-indigo-700">
              PPF rules used
            </p>

            <p className="mt-1.5 text-xs leading-5 text-indigo-900/75">
              ₹500 minimum annual subscription,
              ₹1,50,000 maximum annual
              subscription, ₹50 multiples,
              15-year standard maturity, and
              monthly interest calculation using
              the eligible monthly balance.
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
              Your PPF result
            </h2>

            <p className="mt-1.5 text-sm leading-6 text-slate-400">
              Estimated based on the values you entered.
            </p>
          </div>

          {result ? (
            <div className="relative mt-6 min-w-0 space-y-4">
              {/* Main value */}
              <div className="relative min-w-0 min-h-[176px] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.07] p-5 pb-16 backdrop-blur-sm sm:p-6 sm:pb-16">
                <div className="flex min-w-0 items-center justify-between gap-4">
                  <p className="min-w-0 text-sm font-medium text-slate-300">
                    Estimated PPF Value
                  </p>

                  <span className="shrink-0 rounded-full border border-amber-400/15 bg-amber-400/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-amber-300">
                    Estimated
                  </span>
                </div>

                <div className="mt-4 min-w-0 w-full overflow-hidden">
                  <p
                    className={`whitespace-nowrap ${getResultValueClass(
                      result.maturityAmount,
                    )} font-bold tracking-tight text-white`}
                  >
                    {formatINR(
                      result.maturityAmount,
                    )}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={copyMaturityAmount}
                  aria-label="Copy estimated PPF value"
                  title="Copy estimated PPF value"
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

              <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-5 backdrop-blur-sm sm:p-6">
                <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-200">
                      Investment breakdown
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      Contributions versus
                      interest earned
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
                  contributionsPercentage={
                    contributionsPercentage
                  }
                  interestPercentage={
                    interestPercentage
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

                <div className="mt-6 grid min-w-0 gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveSegment(
                        "contributions",
                      )
                    }
                    className={`min-h-12 min-w-0 overflow-hidden rounded-xl border p-4 text-left transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-400/20 ${
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
                    <div className="flex min-w-0 items-start gap-2.5">
                      <span
                        aria-hidden="true"
                        className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-indigo-300 shadow-[0_0_8px_rgba(165,180,252,0.45)]"
                      />

                      <p className="min-w-0 break-words text-xs font-medium leading-4 text-slate-400 sm:text-sm">
                        Total Contributions
                      </p>
                    </div>

                    <p className="mt-2 min-w-0 whitespace-nowrap text-sm font-bold leading-tight tracking-tight text-white sm:text-[15px]">
                      {formatCompactINR(
                        result.totalContributions,
                      )}
                    </p>

                    <p className="mt-1 text-xs leading-4 text-slate-500">
                      {contributionsPercentage.toFixed(
                        1,
                      )}
                      % of value
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setActiveSegment(
                        "interest",
                      )
                    }
                    className={`min-h-12 min-w-0 overflow-hidden rounded-xl border p-4 text-left transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-amber-400/20 ${
                      activeSegment === "interest"
                        ? "border-amber-300/30 bg-amber-300/10"
                        : "border-white/8 bg-black/10 hover:border-amber-300/20 hover:bg-amber-300/5"
                    }`}
                    aria-pressed={
                      activeSegment ===
                      "interest"
                    }
                  >
                    <div className="flex min-w-0 items-start gap-2.5">
                      <span
                        aria-hidden="true"
                        className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.45)]"
                      />

                      <p className="min-w-0 break-words text-xs font-medium leading-4 text-slate-400 sm:text-sm">
                        Interest Earned
                      </p>
                    </div>

                    <p className="mt-2 min-w-0 whitespace-nowrap text-sm font-bold leading-tight tracking-tight text-white sm:text-[15px]">
                      {formatCompactINR(
                        result.interestEarned,
                      )}
                    </p>

                    <p className="mt-1 text-xs leading-4 text-slate-500">
                      {interestPercentage.toFixed(
                        1,
                      )}
                      % of value
                    </p>
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/10 p-5">
                <p className="text-sm font-semibold text-slate-200">
                  How this estimate works
                </p>

                <p className="mt-2 text-xs leading-5 text-slate-400">
                  Interest is estimated monthly
                  using the eligible balance based
                  on whether the contribution is
                  treated as being made on or before
                  the 5th or after the 5th. Interest
                  is then credited annually in this
                  model.
                </p>

                <p className="mt-3 text-xs leading-5 text-slate-500">
                  This is a planning estimate, not
                  an official PPF statement. Actual
                  results can differ because Government
                  notified rates, exact deposit dates,
                  withdrawals, and account activity
                  can affect the account.
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
                  Your PPF result will appear here.
                </p>

                <p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">
                  Enter your contribution,
                  planning interest rate, tenure,
                  and deposit timing to see your
                  estimated PPF value.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}