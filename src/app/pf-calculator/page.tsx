import type { Metadata } from "next";
import CalculatorPage from "@/components/calculators/CalculatorPage";
import PFCalculator from "@/components/calculators/PFCalculator";

export const metadata: Metadata = {
  title: "EPF Calculator — India",
  description:
    "Estimate your EPF balance using monthly basic + DA, the standard EPF contribution structure, current balance, interest rate, and tenure.",
  alternates: {
    canonical: "/pf-calculator",
  },
};

export default function PFCalculatorPage() {
  return (
    <CalculatorPage
      eyebrow="India • Employees' Provident Fund"
      title="EPF Calculator"
      description="Estimate your EPF balance using monthly basic + DA, your current EPF balance, interest rate, and tenure."
      infoTitle="How the EPF calculation works"
      infoContent={
        <>
          <p>
            This calculator uses a standard EPF contribution model based on
            monthly Basic + DA, the ₹15,000 wage ceiling used in this estimate,
            and the standard employee and employer contribution structure.
          </p>

          <p className="mt-4">
            EPF interest is estimated using monthly running balances and the
            annual rate you enter. New monthly contributions are treated as
            earning interest from the following month.
          </p>

          <p className="mt-4">
            This is a standard-case estimate. Higher-wage contributions and
            other special EPF arrangements, exceptions, withdrawals, and
            account-specific changes are not modeled.
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