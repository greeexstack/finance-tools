export type SWPCalculationInput = {
  initialInvestment: number;
  monthlyWithdrawal: number;
  annualRate: number;
  tenureYears: number;
};

export type SWPCalculationResult = {
  totalWithdrawn: number;
  remainingValue: number;
  totalGrowth: number;
};

export function calculateSWP({
  initialInvestment,
  monthlyWithdrawal,
  annualRate,
  tenureYears,
}: SWPCalculationInput): SWPCalculationResult | null {
  if (
    !Number.isFinite(initialInvestment) ||
    !Number.isFinite(monthlyWithdrawal) ||
    !Number.isFinite(annualRate) ||
    !Number.isFinite(tenureYears) ||
    initialInvestment <= 0 ||
    monthlyWithdrawal < 0 ||
    annualRate < 0 ||
    tenureYears <= 0
  ) {
    return null;
  }

  /*
   * The calculation works month by month.
   *
   * Fractional years are supported only when they represent
   * a whole number of months. This prevents the calculator
   * from silently changing the user's requested tenure.
   */
  const exactMonths = tenureYears * 12;
  const months = Math.round(exactMonths);

  if (
    Math.abs(exactMonths - months) >
    Number.EPSILON * Math.max(1, Math.abs(exactMonths))
  ) {
    return null;
  }

  const monthlyRate =
    annualRate / 12 / 100;

  let balance = initialInvestment;
  let totalWithdrawn = 0;

  /*
   * Simplified SWP estimate:
   *
   * 1. Apply the expected monthly return.
   * 2. Make the monthly withdrawal.
   * 3. Continue until the selected number of months
   *    has elapsed or the balance reaches zero.
   *
   * Actual investment returns are variable and may differ
   * from the entered expected annual rate.
   */
  for (
    let month = 0;
    month < months;
    month += 1
  ) {
    balance *= 1 + monthlyRate;

    const withdrawal = Math.min(
      monthlyWithdrawal,
      balance,
    );

    balance -= withdrawal;
    totalWithdrawn += withdrawal;

    if (balance <= 0) {
      balance = 0;
      break;
    }
  }

  /*
   * Net growth is the amount remaining after withdrawals
   * plus the amount already withdrawn, minus the original
   * investment.
   */
  const totalGrowth =
    totalWithdrawn +
    balance -
    initialInvestment;

  return {
    totalWithdrawn,
    remainingValue: balance,
    totalGrowth,
  };
}