export type PFCalculationInput = {
  monthlyBasicDA: number;
  currentEPFBalance: number;
  annualRate: number;
  tenureYears: number;
};

export type PFCalculationResult = {
  startingEPFBalance: number;

  monthlyEmployeeContribution: number;
  monthlyEmployerContribution: number;
  monthlyEmployerEPSContribution: number;
  monthlyEmployerEPFContribution: number;
  monthlyEPFCredit: number;

  totalEmployeeContributions: number;
  totalEmployerEPFContributions: number;
  totalEmployerEPSContributions: number;
  totalContributions: number;

  interestEarned: number;
  maturityAmount: number;
};

const EPF_EMPLOYEE_RATE = 0.12;
const EPF_EMPLOYER_RATE = 0.12;
const EPS_RATE = 0.0833;

const EPF_WAGE_CEILING = 15_000;

const MONTHS_PER_YEAR = 12;

function roundToRupee(value: number): number {
  return Math.round(value);
}

export function calculatePF({
  monthlyBasicDA,
  currentEPFBalance,
  annualRate,
  tenureYears,
}: PFCalculationInput): PFCalculationResult | null {
  if (
    !Number.isFinite(monthlyBasicDA) ||
    !Number.isFinite(currentEPFBalance) ||
    !Number.isFinite(annualRate) ||
    !Number.isFinite(tenureYears) ||
    monthlyBasicDA <= 0 ||
    currentEPFBalance < 0 ||
    annualRate < 0 ||
    tenureYears <= 0 ||
    !Number.isInteger(tenureYears)
  ) {
    return null;
  }

  const years = tenureYears;

  /*
   * Standard EPF calculation model:
   *
   * EPF wages are capped at ₹15,000 for the standard case.
   */
  const eligibleWage = Math.min(
    monthlyBasicDA,
    EPF_WAGE_CEILING,
  );

  /*
   * Employee contribution:
   * 12% of applicable EPF wages.
   */
  const monthlyEmployeeContribution =
    roundToRupee(
      eligibleWage * EPF_EMPLOYEE_RATE,
    );

  /*
   * Standard employer contribution:
   * 12% of applicable EPF wages.
   *
   * The employer's contribution is split between
   * EPS and EPF.
   */
  const monthlyEmployerContribution =
    roundToRupee(
      eligibleWage * EPF_EMPLOYER_RATE,
    );

  /*
   * EPS contribution:
   * 8.33% of eligible EPF wages.
   *
   * EPS is paid from the employer's contribution and
   * does not enter the member's EPF balance.
   */
  const monthlyEmployerEPSContribution =
    roundToRupee(
      eligibleWage * EPS_RATE,
    );

  /*
   * The remainder of the employer's statutory contribution
   * goes to the member's EPF account.
   */
  const monthlyEmployerEPFContribution =
    monthlyEmployerContribution -
    monthlyEmployerEPSContribution;

  /*
   * The member's EPF account receives:
   *
   * employee EPF contribution
   * +
   * employer EPF contribution
   */
  const monthlyEPFCredit =
    monthlyEmployeeContribution +
    monthlyEmployerEPFContribution;

  const totalMonths =
    years * MONTHS_PER_YEAR;

  const totalEmployeeContributions =
    monthlyEmployeeContribution *
    totalMonths;

  const totalEmployerEPFContributions =
    monthlyEmployerEPFContribution *
    totalMonths;

  const totalEmployerEPSContributions =
    monthlyEmployerEPSContribution *
    totalMonths;

  /*
   * Total EPF contributions represent only money
   * actually credited to the member's EPF account.
   *
   * Employer EPS is tracked separately because it
   * does not form part of the EPF balance.
   */
  const totalContributions =
    totalEmployeeContributions +
    totalEmployerEPFContributions;

  const monthlyRate =
    annualRate /
    MONTHS_PER_YEAR /
    100;

  /*
   * EPF interest is calculated on monthly running balances.
   *
   * The monthly contribution is added after the current
   * month's interest calculation, so a contribution made
   * during a month begins earning interest from the
   * following month.
   *
   * Interest is accumulated during the financial year
   * and credited to the EPF balance at year-end.
   */
  let balance = currentEPFBalance;
  let totalInterestEarned = 0;

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
      if (monthlyRate > 0) {
        yearlyInterest +=
          balance * monthlyRate;
      }

      balance += monthlyEPFCredit;
    }

    /*
     * EPFO interest is credited annually and the total
     * interest for the year is rounded to the nearest rupee.
     */
    const creditedInterest =
      roundToRupee(yearlyInterest);

    balance += creditedInterest;
    totalInterestEarned +=
      creditedInterest;
  }

  return {
    startingEPFBalance:
      currentEPFBalance,

    monthlyEmployeeContribution,
    monthlyEmployerContribution,
    monthlyEmployerEPSContribution,
    monthlyEmployerEPFContribution,
    monthlyEPFCredit,

    totalEmployeeContributions,
    totalEmployerEPFContributions,
    totalEmployerEPSContributions,
    totalContributions,

    interestEarned:
      totalInterestEarned,
    maturityAmount: balance,
  };
}