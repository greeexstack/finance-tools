export type PFCalculationInput = {
  monthlyEmployeeContribution: number;
  monthlyEmployerContribution: number;
  annualRate: number;
  tenureYears: number;
};

export type PFCalculationResult = {
  totalContributions: number;
  interestEarned: number;
  maturityAmount: number;
};

export function calculatePF({
  monthlyEmployeeContribution,
  monthlyEmployerContribution,
  annualRate,
  tenureYears,
}: PFCalculationInput): PFCalculationResult | null {
  if (
    !Number.isFinite(monthlyEmployeeContribution) ||
    !Number.isFinite(monthlyEmployerContribution) ||
    !Number.isFinite(annualRate) ||
    !Number.isFinite(tenureYears) ||
    monthlyEmployeeContribution < 0 ||
    monthlyEmployerContribution < 0 ||
    monthlyEmployeeContribution + monthlyEmployerContribution <= 0 ||
    annualRate < 0 ||
    tenureYears <= 0
  ) {
    return null;
  }

  const monthlyContribution =
    monthlyEmployeeContribution +
    monthlyEmployerContribution;

  const months = Math.round(tenureYears * 12);
  const monthlyRate = annualRate / 12 / 100;

  const totalContributions =
    monthlyContribution * months;

  let maturityAmount: number;

  if (monthlyRate === 0) {
    maturityAmount = totalContributions;
  } else {
    maturityAmount =
      monthlyContribution *
      (((1 + monthlyRate) ** months - 1) / monthlyRate);
  }

  const interestEarned =
    maturityAmount - totalContributions;

  return {
    totalContributions,
    interestEarned,
    maturityAmount,
  };
}