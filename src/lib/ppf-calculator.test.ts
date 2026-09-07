import { describe, expect, it } from "vitest";
import { calculatePPF } from "./ppf-calculator";

describe("calculatePPF", () => {
  it("calculates a valid yearly PPF estimate", () => {
    const result = calculatePPF({
      contributionAmount: 150_000,
      annualRate: 7.1,
      tenureYears: 15,
      contributionFrequency: "yearly",
      contributionTiming: "before5th",
    });

    expect(result).not.toBeNull();
    expect(result?.tenureYears).toBe(15);
    expect(result?.annualRate).toBe(7.1);
    expect(
      result?.contributionFrequency,
    ).toBe("yearly");
    expect(
      result?.contributionTiming,
    ).toBe("before5th");

    expect(
      result?.totalContributions,
    ).toBe(2_250_000);

    expect(
      result?.maturityAmount,
    ).toBeGreaterThan(
      result?.totalContributions ?? 0,
    );

    expect(
      result?.interestEarned,
    ).toBeGreaterThan(0);
  });

  it("supports monthly contributions", () => {
    const result = calculatePPF({
      contributionAmount: 12_500,
      annualRate: 7.1,
      tenureYears: 15,
      contributionFrequency: "monthly",
      contributionTiming: "before5th",
    });

    expect(result).not.toBeNull();

    expect(
      result?.totalContributions,
    ).toBe(2_250_000);

    expect(
      result?.maturityAmount,
    ).toBeGreaterThan(
      result?.totalContributions ?? 0,
    );
  });

  it("allows a yearly contribution after the 5th", () => {
    const result = calculatePPF({
      contributionAmount: 150_000,
      annualRate: 7.1,
      tenureYears: 15,
      contributionFrequency: "yearly",
      contributionTiming: "after5th",
    });

    expect(result).not.toBeNull();

    expect(
      result?.maturityAmount,
    ).toBeGreaterThan(
      result?.totalContributions ?? 0,
    );
  });

  it("earlier yearly contributions produce at least as much growth as later contributions", () => {
    const beforeFifth = calculatePPF({
      contributionAmount: 150_000,
      annualRate: 7.1,
      tenureYears: 15,
      contributionFrequency: "yearly",
      contributionTiming: "before5th",
    });

    const afterFifth = calculatePPF({
      contributionAmount: 150_000,
      annualRate: 7.1,
      tenureYears: 15,
      contributionFrequency: "yearly",
      contributionTiming: "after5th",
    });

    expect(beforeFifth).not.toBeNull();
    expect(afterFifth).not.toBeNull();

    expect(
      beforeFifth?.maturityAmount,
    ).toBeGreaterThanOrEqual(
      afterFifth?.maturityAmount ?? 0,
    );
  });

  it("rejects contributions below the annual minimum", () => {
    const result = calculatePPF({
      contributionAmount: 400,
      annualRate: 7.1,
      tenureYears: 15,
      contributionFrequency: "yearly",
      contributionTiming: "before5th",
    });

    expect(result).toBeNull();
  });

  it("rejects annual contributions above the maximum", () => {
    const result = calculatePPF({
      contributionAmount: 150_050,
      annualRate: 7.1,
      tenureYears: 15,
      contributionFrequency: "yearly",
      contributionTiming: "before5th",
    });

    expect(result).toBeNull();
  });

  it("accepts the minimum yearly contribution", () => {
    const result = calculatePPF({
      contributionAmount: 500,
      annualRate: 7.1,
      tenureYears: 15,
      contributionFrequency: "yearly",
      contributionTiming: "before5th",
    });

    expect(result).not.toBeNull();

    expect(
      result?.totalContributions,
    ).toBe(7_500);
  });

  it("accepts the maximum yearly contribution", () => {
    const result = calculatePPF({
      contributionAmount: 150_000,
      annualRate: 7.1,
      tenureYears: 15,
      contributionFrequency: "yearly",
      contributionTiming: "before5th",
    });

    expect(result).not.toBeNull();

    expect(
      result?.totalContributions,
    ).toBe(2_250_000);
  });

  it("rejects a monthly contribution that exceeds the annual limit", () => {
    const result = calculatePPF({
      contributionAmount: 12_550,
      annualRate: 7.1,
      tenureYears: 15,
      contributionFrequency: "monthly",
      contributionTiming: "before5th",
    });

    expect(result).toBeNull();
  });

  it("rejects a monthly contribution that is not a multiple of 50", () => {
    const result = calculatePPF({
      contributionAmount: 10_025,
      annualRate: 7.1,
      tenureYears: 15,
      contributionFrequency: "monthly",
      contributionTiming: "before5th",
    });

    expect(result).toBeNull();
  });

  it("rejects a negative interest rate", () => {
    const result = calculatePPF({
      contributionAmount: 150_000,
      annualRate: -1,
      tenureYears: 15,
      contributionFrequency: "yearly",
      contributionTiming: "before5th",
    });

    expect(result).toBeNull();
  });

  it("rejects zero or negative tenure", () => {
    expect(
      calculatePPF({
        contributionAmount: 150_000,
        annualRate: 7.1,
        tenureYears: 0,
        contributionFrequency: "yearly",
        contributionTiming: "before5th",
      }),
    ).toBeNull();

    expect(
      calculatePPF({
        contributionAmount: 150_000,
        annualRate: 7.1,
        tenureYears: -5,
        contributionFrequency: "yearly",
        contributionTiming: "before5th",
      }),
    ).toBeNull();
  });

  it("handles zero interest correctly", () => {
    const result = calculatePPF({
      contributionAmount: 150_000,
      annualRate: 0,
      tenureYears: 15,
      contributionFrequency: "yearly",
      contributionTiming: "before5th",
    });

    expect(result).not.toBeNull();
    expect(
      result?.totalContributions,
    ).toBe(2_250_000);
    expect(
      result?.maturityAmount,
    ).toBe(2_250_000);
    expect(
      result?.interestEarned,
    ).toBe(0);
  });

  it("keeps interest equal to maturity minus contributions", () => {
    const result = calculatePPF({
      contributionAmount: 150_000,
      annualRate: 7.1,
      tenureYears: 15,
      contributionFrequency: "yearly",
      contributionTiming: "before5th",
    });

    expect(result).not.toBeNull();

    expect(
      result?.interestEarned,
    ).toBeCloseTo(
      (result?.maturityAmount ?? 0) -
        (result?.totalContributions ?? 0),
      10,
    );
  });

  it("rejects non-finite values", () => {
    expect(
      calculatePPF({
        contributionAmount: Number.NaN,
        annualRate: 7.1,
        tenureYears: 15,
      }),
    ).toBeNull();

    expect(
      calculatePPF({
        contributionAmount: 150_000,
        annualRate: Number.POSITIVE_INFINITY,
        tenureYears: 15,
      }),
    ).toBeNull();

    expect(
      calculatePPF({
        contributionAmount: 150_000,
        annualRate: 7.1,
        tenureYears: Number.NaN,
      }),
    ).toBeNull();
  });
});