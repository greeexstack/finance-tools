import { describe, expect, it } from "vitest";
import { calculateFD } from "./fd-calculator";

describe("calculateFD", () => {
  it("calculates a 5-year FD correctly", () => {
    const result = calculateFD({
      principal: 100000,
      annualRate: 7,
      tenureYears: 5,
      compoundingFrequency: 4,
    });

    expect(result).not.toBeNull();

    expect(result?.principal).toBe(100000);
    expect(result?.maturity).toBeCloseTo(141478, 0);
    expect(result?.interest).toBeCloseTo(41478, 0);
  });

  it("returns null for invalid principal", () => {
    const result = calculateFD({
      principal: 0,
      annualRate: 7,
      tenureYears: 5,
      compoundingFrequency: 4,
    });

    expect(result).toBeNull();
  });

  it("returns null for invalid tenure", () => {
    const result = calculateFD({
      principal: 100000,
      annualRate: 7,
      tenureYears: 0,
      compoundingFrequency: 4,
    });

    expect(result).toBeNull();
  });
});