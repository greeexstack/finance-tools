import { describe, expect, it } from "vitest";
import { calculatePF } from "./pf-calculator";

describe("calculatePF", () => {
  it("calculates standard EPF contributions using the ₹15,000 wage ceiling", () => {
    const result = calculatePF({
      monthlyBasicDA: 15_000,
      currentEPFBalance: 0,
      annualRate: 0,
      tenureYears: 1,
    });

    expect(result).not.toBeNull();

    expect(result?.monthlyEmployeeContribution).toBe(1_800);
    expect(result?.monthlyEmployerContribution).toBe(1_800);

    // Employer contribution is split between EPS and EPF.
    expect(result?.monthlyEmployerEPSContribution).toBe(1_250);
    expect(result?.monthlyEmployerEPFContribution).toBe(550);

    // Only employee EPF + employer EPF enter the EPF balance.
    expect(result?.monthlyEPFCredit).toBe(2_350);

    expect(result?.totalEmployeeContributions).toBe(21_600);
    expect(result?.totalEmployerEPFContributions).toBe(6_600);
    expect(result?.totalEmployerEPSContributions).toBe(15_000);

    expect(result?.totalContributions).toBe(28_200);
    expect(result?.interestEarned).toBe(0);
    expect(result?.maturityAmount).toBe(28_200);
  });

  it("caps standard EPF wages at ₹15,000 when basic plus DA is higher", () => {
    const result = calculatePF({
      monthlyBasicDA: 30_000,
      currentEPFBalance: 0,
      annualRate: 0,
      tenureYears: 1,
    });

    expect(result).not.toBeNull();

    expect(result?.monthlyEmployeeContribution).toBe(1_800);
    expect(result?.monthlyEmployerContribution).toBe(1_800);
    expect(result?.monthlyEmployerEPSContribution).toBe(1_250);
    expect(result?.monthlyEmployerEPFContribution).toBe(550);
    expect(result?.monthlyEPFCredit).toBe(2_350);

    expect(result?.totalContributions).toBe(28_200);
    expect(result?.maturityAmount).toBe(28_200);
  });

  it("calculates the employer EPF and EPS split below the wage ceiling", () => {
    const result = calculatePF({
      monthlyBasicDA: 10_000,
      currentEPFBalance: 0,
      annualRate: 0,
      tenureYears: 1,
    });

    expect(result).not.toBeNull();

    expect(result?.monthlyEmployeeContribution).toBe(1_200);
    expect(result?.monthlyEmployerContribution).toBe(1_200);

    expect(result?.monthlyEmployerEPSContribution).toBe(833);
    expect(result?.monthlyEmployerEPFContribution).toBe(367);

    expect(result?.monthlyEPFCredit).toBe(1_567);

    expect(result?.totalEmployeeContributions).toBe(14_400);
    expect(result?.totalEmployerEPFContributions).toBe(4_404);
    expect(result?.totalEmployerEPSContributions).toBe(9_996);

    expect(result?.totalContributions).toBe(18_804);
    expect(result?.maturityAmount).toBe(18_804);
    expect(result?.interestEarned).toBe(0);
  });

  it("calculates interest using monthly running balances and credits it annually", () => {
    const result = calculatePF({
      monthlyBasicDA: 15_000,
      currentEPFBalance: 0,
      annualRate: 12,
      tenureYears: 1,
    });

    expect(result).not.toBeNull();

    /*
     * Monthly EPF credit:
     * ₹1,800 employee + ₹550 employer EPF = ₹2,350.
     *
     * A contribution starts earning interest from the
     * month after it is credited.
     *
     * At 12% annual interest:
     * 1% monthly × (11 + 10 + ... + 1 + 0) months
     *
     * ₹2,350 × 66 × 1% = ₹1,551 interest.
     */
    expect(result?.monthlyEPFCredit).toBe(2_350);
    expect(result?.totalContributions).toBe(28_200);
    expect(result?.interestEarned).toBe(1_551);
    expect(result?.maturityAmount).toBe(29_751);
  });

  it("includes an existing EPF balance in the interest calculation", () => {
    const result = calculatePF({
      monthlyBasicDA: 15_000,
      currentEPFBalance: 10_000,
      annualRate: 12,
      tenureYears: 1,
    });

    expect(result).not.toBeNull();

    /*
     * Existing balance earns the full 12 months:
     * ₹10,000 × 12% = ₹1,200.
     *
     * New monthly contributions earn the same
     * ₹1,551 calculated above.
     */
    expect(result?.totalContributions).toBe(28_200);
    expect(result?.interestEarned).toBe(2_751);
    expect(result?.maturityAmount).toBe(40_951);
  });

  it("supports zero interest without changing contribution totals", () => {
    const result = calculatePF({
      monthlyBasicDA: 15_000,
      currentEPFBalance: 25_000,
      annualRate: 0,
      tenureYears: 2,
    });

    expect(result).not.toBeNull();

    expect(result?.totalEmployeeContributions).toBe(43_200);
    expect(result?.totalEmployerEPFContributions).toBe(13_200);
    expect(result?.totalContributions).toBe(56_400);

    expect(result?.interestEarned).toBe(0);
    expect(result?.maturityAmount).toBe(81_400);
  });

  it("returns null for invalid input", () => {
    expect(
      calculatePF({
        monthlyBasicDA: 0,
        currentEPFBalance: 0,
        annualRate: 8.25,
        tenureYears: 20,
      }),
    ).toBeNull();

    expect(
      calculatePF({
        monthlyBasicDA: 15_000,
        currentEPFBalance: -1,
        annualRate: 8.25,
        tenureYears: 20,
      }),
    ).toBeNull();

    expect(
      calculatePF({
        monthlyBasicDA: 15_000,
        currentEPFBalance: 0,
        annualRate: -1,
        tenureYears: 20,
      }),
    ).toBeNull();

    expect(
      calculatePF({
        monthlyBasicDA: 15_000,
        currentEPFBalance: 0,
        annualRate: 8.25,
        tenureYears: 0,
      }),
    ).toBeNull();
  });
});