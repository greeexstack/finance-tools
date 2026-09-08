export type RDCalculationInput = {
  monthlyDeposit: number;
  annualRate: number;
  tenureMonths: number;
};

export type RDCalculationResult = {
  totalDeposited: number;
  interestEarned: number;
  maturityAmount: number;
};

export function calculateRD({
  monthlyDeposit,
  annualRate,
  tenureMonths,
}: RDCalculationInput): RDCalculationResult | null {
  if (
    !Number.isFinite(monthlyDeposit) ||
    !Number.isFinite(annualRate) ||
    !Number.isFinite(tenureMonths) ||
    monthlyDeposit <= 0 ||
    annualRate < 0 ||
    tenureMonths <= 0 ||
    !Number.isInteger(tenureMonths)
  ) {
    return null;
  }

  const monthlyRate =
    annualRate / 12 / 100;

  const totalDeposited =
    monthlyDeposit * tenureMonths;

  let maturityAmount: number;

  if (monthlyRate === 0) {
    maturityAmount = totalDeposited;
  } else {
    /*
     * Simplified RD estimate:
     *
     * Each monthly deposit is treated as part of an
     * annuity earning the entered annual rate with
     * monthly compounding.
     *
     * Actual bank RD maturity values can differ because
     * banks may use different interest-calculation
     * conventions and product terms.
     */
    maturityAmount =
      monthlyDeposit *
      (
        ((1 + monthlyRate) ** tenureMonths - 1) /
        monthlyRate
      );
  }

  const interestEarned =
    maturityAmount - totalDeposited;

  return {
    totalDeposited,
    interestEarned,
    maturityAmount,
  };
}