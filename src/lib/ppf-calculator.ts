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

  tenureYears?: number;

  contributionFrequency?: PPFContributionFrequency;

  /**
   * Whether monthly contributions are treated as being
   * deposited on/before the 5th or after the 5th.
   *
   * For yearly contributions, the calculator assumes the
   * annual deposit is made in April.
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

/**
 * PPF calculator estimate.
 *
 * Official PPF interest mechanics:
 * - Interest is calculated for each calendar month.
 * - The applicable balance is the lowest balance between
 *   the close of the 5th day and the end of that month.
 * - Interest is credited to the account at the end of the year.
 *
 * Simplified calculator assumptions:
 * - The financial year is modeled as April through March.
 * - Yearly contributions are deposited in April.
 * - Monthly mode models one equal deposit per month.
 * - The selected timing applies to each monthly deposit.
 *
 * Actual account results can differ because actual deposit dates,
 * interest-rate changes, withdrawals, and other account activity
 * can affect the balance.
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

  const years = tenureYears;

  const annualContribution =
    contributionFrequency === "monthly"
      ? contributionAmount * MONTHS_PER_YEAR
      : contributionAmount;

  /*
   * PPF annual subscription limits:
   * minimum ₹500, maximum ₹1,50,000.
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
   * PPF deposits must be in multiples of ₹50.
   */
  if (
    annualContribution %
      CONTRIBUTION_MULTIPLE !==
    0
  ) {
    return null;
  }

  /*
   * In monthly mode, validate the selected monthly
   * contribution itself as a ₹50 multiple.
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
    annualRate / MONTHS_PER_YEAR / 100;

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

      if (contributionFrequency === "yearly") {
        /*
         * Financial-year model:
         * annual contribution is assumed to be deposited
         * in April, represented by month 0.
         */
        if (month === 0) {
          contributionThisMonth =
            contributionAmount;
        }
      } else {
        /*
         * Monthly mode:
         * one equal contribution is modeled each month.
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
       * PPF interest is based on the lowest balance between
       * the close of the 5th day and the end of the month.
       *
       * A deposit made on/before the 5th participates in the
       * month's eligible balance.
       *
       * A deposit made after the 5th does not participate in
       * that month's eligible balance.
       *
       * For yearly contributions, this timing represents the
       * assumed April deposit timing as well.
       */
      const interestEligibleBalance =
        contributionThisMonth > 0 &&
        contributionTiming === "after5th"
          ? balanceBeforeContribution
          : balance;

      yearlyInterest +=
        interestEligibleBalance *
        monthlyRate;
    }

    /*
     * Interest is credited at the end of the year.
     * Fractional rupees are rounded to the nearest rupee.
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