import type { Metadata } from "next";
import CalculatorPage from "@/components/calculators/CalculatorPage";
import FDCalculator from "@/components/calculators/FDCalculator";

export const metadata: Metadata = {
  title: "FD Calculator | Fixed Deposit Calculator",
  description:
    "Calculate your fixed deposit maturity amount and interest earned using deposit amount, interest rate, tenure, and compounding frequency.",
};

export default function FDCalculatorPage() {
  return (
    <CalculatorPage
      eyebrow="Finance Calculator"
      title="FD Calculator"
      description="Calculate your fixed deposit maturity amount and interest earned based on your deposit, interest rate, tenure, and compounding frequency."
      infoTitle="How the FD calculation works"
      infoContent={
        <>
          <p>
            This calculator uses compound interest based on the selected
            compounding frequency. Your maturity amount depends on the
            principal, annual interest rate, tenure, and compounding frequency.
          </p>

          <div className="mt-5 rounded-xl bg-slate-50 p-4 font-mono text-sm">
            A = P × (1 + r / n)^(n × t)
          </div>

          <p className="mt-3 text-sm text-slate-500">
            P = principal, r = annual interest rate, n = compounding periods
            per year, and t = tenure in years.
          </p>
        </>
      }
    >
      <FDCalculator />
    </CalculatorPage>
  );
}