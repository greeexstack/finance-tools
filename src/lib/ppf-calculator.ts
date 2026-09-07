export type PPFContributionFrequency =
  | "yearly"
  | "monthly";

export type PPFContributionTiming =
  | "before5th"
  | "after5th";

export type PPFCalculationInput = {
  /**
   * For "yearly":
   *   contributionAmount = yearly contribution.
   *
   * For "monthly":
   *   contributionAmount = monthly contribution.
   */
  contributionAmount: number;

  annualRate: number;

  tenureYears?: number;

  contributionFrequency?: PPFContributionFrequency;

  /**
   * Whether contributions are made on/before the 5th
   * of the month or after the 5th.
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

/**
 * PPF calculator estimate.
 *
 * Official PPF interest mechanics:
 * - Interest is calculated for each month.
 * - The applicable balance is the lowest balance between
 *   the close of the 5th day and the end of that month.
 * - Interest is credited to the account at the end of the year.
 *
 * This calculator intentionally models an estimate rather
 * than an individual passbook. Actual results depend on
 * actual deposit dates, rate changes, withdrawals, etc.
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
    tenureYears <= 0
  ) {
    return null;
  }

  const years = Math.round(tenureYears);

  if (years <= 0) {
    return null;
  }

  /*
   * Determine the annual subscription implied by
   * the selected contribution frequency.
   */
  const annualContribution =
    contributionFrequency === "monthly"
      ? contributionAmount * 12
      : contributionAmount;

  /*
   * PPF annual contribution limits.
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
   * The annual subscription must be in multiples
   * of ₹50.
   */
  if (
    annualContribution %
      CONTRIBUTION_MULTIPLE !==
    0
  ) {
    return null;
  }

  /*
   * For monthly contributions, the monthly amount
   * itself should also be a valid ₹50 multiple.
   *
   * This prevents the calculator from silently creating
   * fractional rupee monthly subscriptions.
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
    annualRate / 12 / 100;

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
      month < 12;
      month += 1
    ) {
      /*
       * Determine whether a contribution is made
       * during this month.
       */
      let contributionThisMonth = 0;

      if (contributionFrequency === "yearly") {
        /*
         * The yearly contribution is made once,
         * in April for our financial-year model.
         */
        if (month === 0) {
          contributionThisMonth =
            contributionAmount;
        }
      } else {
        contributionThisMonth =
          contributionAmount;
      }

      if (contributionThisMonth > 0) {
        balance += contributionThisMonth;
        totalContributions +=
          contributionThisMonth;
      }

      /*
       * Under the PPF rule:
       *
       * - before/on the 5th:
       *   the new deposit participates in this month's
       *   eligible balance.
       *
       * - after the 5th:
       *   this month's eligible balance remains the
       *   balance that existed before the deposit.
       */
      const interestEligibleBalance =
        contributionThisMonth > 0 &&
        contributionTiming === "after5th"
          ? balance -
            contributionThisMonth
          : balance;

      yearlyInterest +=
        interestEligibleBalance *
        monthlyRate;
    }

    /*
     * PPF interest is credited at the end of the year.
     *
     * The scheme provides for the credited interest
     * amount to be rounded to the nearest rupee:
     * 50 paise or more rounds up; less than 50 paise
     * is ignored.
     */
    balance += Math.round(
      yearlyInterest,
    );
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