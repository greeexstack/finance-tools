import { describe, expect, it } from "vitest";
import { calculatePF } from "./pf-calculator";

describe("calculatePF", () => {
  it("calculates PF growth from employee and employer contributions", () => {
    const result = calculatePF({
      monthlyEmployeeContribution: 1800,
      monthlyEmployerContribution: 1800,
      annualRate: 8.25,
      tenureYears: 20,
    });

    expect(result).not.toBeNull();

    expect(result?.totalContributions).toBe(864000);
    expect(result?.maturityAmount).toBeGreaterThan(
      result?.totalContributions ?? 0,
    );
    expect(result?.interestEarned).toBeGreaterThan(0);
  });

  it("handles zero interest", () => {
    const result = calculatePF({
      monthlyEmployeeContribution: 1800,
      monthlyEmployerContribution: 1800,
      annualRate: 0,
      tenureYears: 20,
    });

    expect(result).not.toBeNull();

    expect(result?.totalContributions).toBe(864000);
    expect(result?.maturityAmount).toBe(864000);
    expect(result?.interestEarned).toBe(0);
  });

  it("returns null when both contributions are zero", () => {
    const result = calculatePF({
      monthlyEmployeeContribution: 0,
      monthlyEmployerContribution: 0,
      annualRate: 8.25,
      tenureYears: 20,
    });

    expect(result).toBeNull();
  });
});