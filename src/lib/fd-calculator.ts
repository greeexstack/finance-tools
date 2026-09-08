export type FDCalculationInput = {
  principal: number;
  annualRate: number;
  tenureYears: number;
  compoundingFrequency: number;
};

export type FDCalculationResult = {
  principal: number;
  interest: number;
  maturity: number;
};

export function calculateFD({
  principal,
  annualRate,
  tenureYears,
  compoundingFrequency,
}: FDCalculationInput): FDCalculationResult | null {
  if (
    !Number.isFinite(principal) ||
    !Number.isFinite(annualRate) ||
    !Number.isFinite(tenureYears) ||
    !Number.isFinite(compoundingFrequency) ||
    principal <= 0 ||
    annualRate < 0 ||
    tenureYears <= 0 ||
    compoundingFrequency <= 0 ||
    !Number.isInteger(compoundingFrequency)
  ) {
    return null;
  }

  const rate = annualRate / 100;

  const maturity =
    principal *
    Math.pow(
      1 + rate / compoundingFrequency,
      compoundingFrequency * tenureYears,
    );

  return {
    principal,
    interest: maturity - principal,
    maturity,
  };
}