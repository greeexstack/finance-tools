import type { Metadata } from "next";
import CalculatorPage from "@/components/calculators/CalculatorPage";
import RDCalculator from "@/components/calculators/RDCalculator";

export const metadata: Metadata = {
  title: "RD Calculator",
  description:
    "Calculate your recurring deposit maturity amount and interest earned using your monthly deposit, interest rate, and tenure.",
  alternates: {
    canonical: "/rd-calculator",
  },
};

export default function RDCalculatorPage() {
  return (
    <CalculatorPage
      eyebrow="Finance Calculator"
      title="RD Calculator"
      description="Calculate your recurring deposit maturity amount and interest earned based on your monthly deposit, interest rate, and tenure."
      infoTitle="How the RD calculation works"
      infoContent={
        <p>
          This calculator estimates the maturity value of recurring monthly
          deposits using the entered annual interest rate and tenure. Actual
          maturity values may differ depending on the financial institution's
          calculation method and applicable terms.
        </p>
      }
    >
      <RDCalculator />
    </CalculatorPage>
  );
}