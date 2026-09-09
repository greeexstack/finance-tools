import type { Metadata } from "next";
import CalculatorPage from "@/components/calculators/CalculatorPage";
import RDCalculator from "@/components/calculators/RDCalculator";

export const metadata: Metadata = {
  title: "RD Calculator — Recurring Deposit Calculator India",
  description:
    "Calculate your recurring deposit maturity amount and interest earned using your monthly deposit, interest rate, and tenure in India.",
  alternates: {
    canonical: "/rd-calculator",
  },
};

export default function RDCalculatorPage() {
  return (
    <CalculatorPage
      eyebrow="India • Recurring Deposit"
      title="RD Calculator"
      description="Calculate your recurring deposit maturity amount and interest earned based on your monthly deposit, interest rate, and tenure."
      infoTitle="How the RD calculation works"
      infoContent={
        <>
          <p>
            This RD calculator estimates the maturity value of recurring
            monthly deposits using the entered annual interest rate and
            tenure. It shows your total contributions, estimated interest
            earned, and estimated maturity amount.
          </p>

          <p className="mt-4">
            The basic calculation depends on your monthly deposit, annual
            interest rate, and investment period. Because banks can use
            different compounding conventions, deposit-date rules, rounding
            methods, and product terms, the result from this calculator may
            differ from an actual bank maturity quote.
          </p>

          <p className="mt-4">
            Use this calculator to estimate your recurring deposit returns and
            compare how different deposit amounts, interest rates, and
            tenures can affect your expected maturity value.
          </p>
        </>
      }
    >
      <RDCalculator />
    </CalculatorPage>
  );
}