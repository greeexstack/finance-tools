export type PPFContributionFrequency =
  | "yearly"
  | "monthly";

export type PPFContributionTiming =
  | "before5th"
  | "after5th";

export type PPFCalculationInput = {
  /**
   * For "yearly":
   *   contributionAmount = annual contribution.
   *
   * For "monthly":
   *   contributionAmount = monthly contribution.
   */
  contributionAmount: number;

  annualRate: number;

  /**
   * PPF maturity is 15 years.
   * Further projections should use 5-year extension blocks.
   */
  tenureYears?: number;

  contributionFrequency?: PPFContributionFrequency;

  /**
   * Whether deposits are treated as being made
   * on/before the 5th or after the 5th of the month.
   *
   * For yearly contributions, the calculator models
   * the annual contribution as an April deposit.
   */
  contributionTiming?: PPFContributionTiming;
};

export type PPFCalculationResult = {
  totalContributions: number;
  interestEarned: number;
  maturityAmount: number;
  tenureYears: number;
  annualRate: number;
  contributionFrequency: PPFContributionFrequency;
  contributionTiming: PPFContributionTiming;
};

const DEFAULT_TENURE_YEARS = 15;

const MIN_ANNUAL_CONTRIBUTION = 500;
const MAX_ANNUAL_CONTRIBUTION = 150_000;

const CONTRIBUTION_MULTIPLE = 50;

const MONTHS_PER_YEAR = 12;

const VALID_FREQUENCIES: PPFContributionFrequency[] = [
  "yearly",
  "monthly",
];

const VALID_TIMINGS: PPFContributionTiming[] = [
  "before5th",
  "after5th",
];

/**
 * PPF calculator estimate.
 *
 * Calculation model:
 * - Interest is calculated for each calendar month.
 * - The applicable balance is the lowest balance between
 *   the close of the 5th day and the end of that month.
 * - Interest is credited at the end of the financial year.
 * - The financial year is modeled as April through March.
 *
 * Calculator assumptions:
 * - Yearly contributions are modeled as an April deposit.
 * - Monthly contributions are modeled as one equal deposit
 *   in each month.
 * - The selected contribution timing is applied to deposits.
 * - The supplied annual rate is treated as a constant planning
 *   rate for the entire projection.
 *
 * This is an estimate, not an official PPF account statement.
 * Actual results depend on Government-notified rates, actual
 * deposit dates, withdrawals, and other account activity.
 */
export function calculatePPF({
  contributionAmount,
  annualRate,
  tenureYears = DEFAULT_TENURE_YEARS,
  contributionFrequency = "yearly",
  contributionTiming = "before5th",
}: PPFCalculationInput): PPFCalculationResult | null {
  if (
    !Number.isFinite(contributionAmount) ||
    !Number.isFinite(annualRate) ||
    !Number.isFinite(tenureYears)
  ) {
    return null;
  }

  if (
    contributionAmount <= 0 ||
    annualRate < 0 ||
    tenureYears <= 0 ||
    !Number.isInteger(tenureYears)
  ) {
    return null;
  }

  if (
    !VALID_FREQUENCIES.includes(
      contributionFrequency,
    )
  ) {
    return null;
  }

  if (
    !VALID_TIMINGS.includes(
      contributionTiming,
    )
  ) {
    return null;
  }

  /*
   * PPF maturity is 15 years.
   *
   * A longer projection should follow 5-year extension blocks.
   */
  if (
    tenureYears < 15 ||
    (tenureYears - 15) % 5 !== 0
  ) {
    return null;
  }

  const years = tenureYears;

  const annualContribution =
    contributionFrequency === "monthly"
      ? contributionAmount * MONTHS_PER_YEAR
      : contributionAmount;

  /*
   * PPF annual subscription limits:
   * minimum ₹500
   * maximum ₹1,50,000
   */
  if (
    annualContribution <
      MIN_ANNUAL_CONTRIBUTION ||
    annualContribution >
      MAX_ANNUAL_CONTRIBUTION
  ) {
    return null;
  }

  /*
   * Contributions must be in multiples of ₹50.
   */
  if (
    annualContribution %
      CONTRIBUTION_MULTIPLE !==
    0
  ) {
    return null;
  }

  /*
   * For monthly mode, the monthly contribution itself
   * is also required to be a multiple of ₹50.
   */
  if (
    contributionFrequency === "monthly" &&
    contributionAmount %
      CONTRIBUTION_MULTIPLE !==
    0
  ) {
    return null;
  }

  const monthlyRate =
    annualRate /
    MONTHS_PER_YEAR /
    100;

  let balance = 0;
  let totalContributions = 0;

  for (
    let year = 0;
    year < years;
    year += 1
  ) {
    let yearlyInterest = 0;

    for (
      let month = 0;
      month < MONTHS_PER_YEAR;
      month += 1
    ) {
      let contributionThisMonth = 0;

      if (
        contributionFrequency ===
        "yearly"
      ) {
        /*
         * PPF financial year:
         * April is represented by month 0.
         *
         * The full annual contribution is modeled
         * as being deposited in April.
         */
        if (month === 0) {
          contributionThisMonth =
            contributionAmount;
        }
      } else {
        /*
         * Monthly mode:
         * one equal deposit is modeled every month.
         */
        contributionThisMonth =
          contributionAmount;
      }

      const balanceBeforeContribution =
        balance;

      if (contributionThisMonth > 0) {
        balance += contributionThisMonth;

        totalContributions +=
          contributionThisMonth;
      }

      /*
       * Interest basis:
       *
       * Deposit on/before the 5th:
       * included in that month's eligible balance.
       *
       * Deposit after the 5th:
       * excluded from that month's eligible balance.
       *
       * For a yearly contribution, the deposit is assumed
       * to occur in April.
       */
      const interestEligibleBalance =
        contributionThisMonth > 0 &&
        contributionTiming ===
          "after5th"
          ? balanceBeforeContribution
          : balance;

      yearlyInterest +=
        interestEligibleBalance *
        monthlyRate;
    }

    /*
     * Interest is credited at the end of the year.
     * We round the annual credited interest to the nearest rupee.
     */
    const creditedInterest =
      Math.round(yearlyInterest);

    balance += creditedInterest;
  }

  const interestEarned =
    balance - totalContributions;

  return {
    totalContributions,
    interestEarned,
    maturityAmount: balance,
    tenureYears: years,
    annualRate,
    contributionFrequency,
    contributionTiming,
  };
}