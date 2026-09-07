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

  const months = Math.round(tenureYears * 12);
  const monthlyRate = annualRate / 12 / 100;

  let balance = initialInvestment;
  let totalWithdrawn = 0;

  for (let month = 0; month < months; month += 1) {
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

  const totalGrowth =
    totalWithdrawn + balance - initialInvestment;

  return {
    totalWithdrawn,
    remainingValue: balance,
    totalGrowth,
  };
}