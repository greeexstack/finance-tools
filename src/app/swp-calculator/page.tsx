import type { Metadata } from "next";
import CalculatorPage from "@/components/calculators/CalculatorPage";
import SWPCalculator from "@/components/calculators/SWPCalculator";

export const metadata: Metadata = {
  title: "SWP Calculator | Systematic Withdrawal Plan Calculator",
  description:
    "Calculate estimated withdrawals and remaining investment value using your initial investment, monthly withdrawal, expected return, and tenure.",
};

export default function SWPCalculatorPage() {
  return (
    <CalculatorPage
      eyebrow="Finance Calculator"
      title="SWP Calculator"
      description="Estimate your monthly withdrawals and the investment value that may remain over your chosen tenure."
      infoTitle="How the SWP calculation works"
      infoContent={
        <>
          <p>
            This calculator estimates the effect of regular monthly
            withdrawals on an initial investment while applying the expected
            annual return on a monthly basis.
          </p>

          <p className="mt-4 text-sm text-slate-500">
            Actual investment returns can vary over time, so this result is
            an estimate and should not be treated as financial advice.
          </p>
        </>
      }
    >
      <SWPCalculator />
    </CalculatorPage>
  );
}