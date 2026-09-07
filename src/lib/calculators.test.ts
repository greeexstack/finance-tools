import { describe, expect, it } from "vitest";
import { calculators } from "./calculators";

describe("calculators registry", () => {
  it("contains all current calculators", () => {
    expect(calculators).toHaveLength(4);

    expect(calculators.map((calculator) => calculator.name)).toEqual([
      "FD Calculator",
      "RD Calculator",
      "PF Calculator",
      "SWP Calculator",
    ]);
  });

  it("has unique routes", () => {
    const routes = calculators.map((calculator) => calculator.href);
    const uniqueRoutes = new Set(routes);

    expect(uniqueRoutes.size).toBe(routes.length);
  });

  it("marks every current calculator as live", () => {
    expect(
      calculators.every((calculator) => calculator.status === "Live"),
    ).toBe(true);
  });
});