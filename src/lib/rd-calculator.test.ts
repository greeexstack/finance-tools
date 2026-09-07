import { describe, expect, it } from "vitest";
import { calculateRD } from "./rd-calculator";

describe("calculateRD", () => {
  it("calculates an RD with monthly contributions", () => {
    const result = calculateRD({
      monthlyDeposit: 5000,
      annualRate: 7,
      tenureMonths: 60,
    });

    expect(result).not.toBeNull();

    expect(result?.totalDeposited).toBe(300000);
    expect(result?.maturityAmount).toBeGreaterThan(
      result?.totalDeposited ?? 0,
    );
    expect(result?.interestEarned).toBeGreaterThan(0);
  });

  it("handles zero interest", () => {
    const result = calculateRD({
      monthlyDeposit: 5000,
      annualRate: 0,
      tenureMonths: 60,
    });

    expect(result).not.toBeNull();

    expect(result?.totalDeposited).toBe(300000);
    expect(result?.maturityAmount).toBe(300000);
    expect(result?.interestEarned).toBe(0);
  });

  it("returns null for invalid monthly deposit", () => {
    const result = calculateRD({
      monthlyDeposit: 0,
      annualRate: 7,
      tenureMonths: 60,
    });

    expect(result).toBeNull();
  });
});