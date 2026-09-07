import type { Metadata } from "next";
import CalculatorPage from "@/components/calculators/CalculatorPage";
import PFCalculator from "@/components/calculators/PFCalculator";

export const metadata: Metadata = {
  title: "EPF Calculator — India",
  description:
    "Estimate your Employees' Provident Fund (EPF) value, total contributions, and interest earned using monthly employee and employer contributions, annual interest rate, and tenure.",
  alternates: {
    canonical: "/pf-calculator",
  },
};

export default function PFCalculatorPage() {
  return (
    <CalculatorPage
      eyebrow="India • Employees' Provident Fund"
      title="EPF Calculator"
      description="Estimate your EPF value based on your monthly employee and employer contributions, annual interest rate, and tenure."
      infoTitle="How the EPF calculation works"
      infoContent={
        <>
          <p>
            This calculator provides an estimate based on the monthly
            employee and employer contributions, the entered annual interest
            rate, and the selected tenure.
          </p>

          <p className="mt-4">
            Actual EPF results can differ because applicable contribution
            rules, interest-crediting methods, eligible components, and
            account-specific factors may affect the final amount.
          </p>

          <p className="mt-4 text-sm text-slate-500">
            This is an estimate for planning purposes, not an official EPFO
            account statement or financial advice.
          </p>
        </>
      }
    >
      <PFCalculator />
    </CalculatorPage>
  );
}