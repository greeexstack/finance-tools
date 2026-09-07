import type { Metadata } from "next";
import CalculatorPage from "@/components/calculators/CalculatorPage";
import PFCalculator from "@/components/calculators/PFCalculator";

export const metadata: Metadata = {
  title: "PF Calculator",
  description:
    "Estimate your provident fund value, total contributions, and interest earned using your monthly contributions, interest rate, and tenure.",
  alternates: {
    canonical: "/pf-calculator",
  },
};

export default function PFCalculatorPage() {
  return (
    <CalculatorPage
      eyebrow="Finance Calculator"
      title="PF Calculator"
      description="Estimate your provident fund value based on your monthly employee and employer contributions, annual interest rate, and tenure."
      infoTitle="How the PF calculation works"
      infoContent={
        <>
          <p>
            This calculator provides an estimate based on the monthly
            employee and employer contributions, the entered annual interest
            rate, and the selected tenure.
          </p>

          <p className="mt-4">
            Actual provident fund calculations can differ because of
            applicable rules, contribution limits, interest-crediting methods,
            and other factors.
          </p>

          <p className="mt-4 text-sm text-slate-500">
            Use the result as an estimate rather than financial advice.
          </p>
        </>
      }
    >
      <PFCalculator />
    </CalculatorPage>
  );
}