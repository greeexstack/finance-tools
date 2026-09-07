import { describe, expect, it } from "vitest";
import { calculateSWP } from "./swp-calculator";

describe("calculateSWP", () => {
  it("calculates an SWP with withdrawals and growth", () => {
    const result = calculateSWP({
      initialInvestment: 1000000,
      monthlyWithdrawal: 10000,
      annualRate: 10,
      tenureYears: 10,
    });

    expect(result).not.toBeNull();

    expect(result?.totalWithdrawn).toBe(1200000);
    expect(result?.remainingValue).toBeGreaterThanOrEqual(0);
    expect(result?.totalGrowth).toBeGreaterThan(0);
  });

  it("handles zero return", () => {
    const result = calculateSWP({
      initialInvestment: 1000000,
      monthlyWithdrawal: 10000,
      annualRate: 0,
      tenureYears: 5,
    });

    expect(result).not.toBeNull();

    expect(result?.totalWithdrawn).toBe(600000);
    expect(result?.remainingValue).toBe(400000);
    expect(result?.totalGrowth).toBe(0);
  });

  it("returns null for invalid initial investment", () => {
    const result = calculateSWP({
      initialInvestment: 0,
      monthlyWithdrawal: 10000,
      annualRate: 10,
      tenureYears: 10,
    });

    expect(result).toBeNull();
  });
});