import type { Metadata } from "next";
import CalculatorPage from "@/components/calculators/CalculatorPage";
import SWPCalculator from "@/components/calculators/SWPCalculator";

export const metadata: Metadata = {
  title: "SWP Calculator — Systematic Withdrawal Plan Calculator India",
  description:
    "Calculate your SWP returns, total withdrawals, and remaining investment value using your initial investment, monthly withdrawal, expected return, and tenure in India.",
  alternates: {
    canonical: "/swp-calculator",
  },
};

export default function SWPCalculatorPage() {
  return (
    <CalculatorPage
      eyebrow="India • Systematic Withdrawal Plan"
      title="SWP Calculator"
      description="Calculate your systematic withdrawal plan result using your investment amount, monthly withdrawal, expected return, and tenure."
      infoTitle="How the SWP calculation works"
      infoContent={
        <>
          <p>
            This SWP calculator estimates how an investment corpus may change
            when you withdraw a fixed amount each month while the remaining
            balance earns an assumed annual return.
          </p>

          <p className="mt-4">
            A Systematic Withdrawal Plan (SWP) allows you to withdraw a chosen
            amount from an investment at regular intervals while the remaining
            corpus stays invested. The amount withdrawn, expected return, and
            withdrawal period can affect how long the investment may last and
            how much value remains.
          </p>

          <div className="mt-5 rounded-xl bg-slate-50 p-4 font-mono text-sm">
            Monthly return = Annual return ÷ 12 ÷ 100
          </div>

          <p className="mt-3 text-sm text-slate-500">
            Each month, the calculator applies the assumed monthly return to the
            current balance and then subtracts the monthly withdrawal. This
            process continues for the selected number of months or until the
            balance reaches zero.
          </p>

          <h3 className="mt-7 text-lg font-semibold text-slate-900">
            What affects your SWP result?
          </h3>

          <p className="mt-2">
            The estimated result depends on your initial investment, monthly
            withdrawal amount, expected annual return, and withdrawal period. A
            larger withdrawal can reduce the remaining corpus more quickly,
            while a higher assumed return can increase the amount that remains
            invested. A longer withdrawal period also gives the monthly
            withdrawals more time to affect the balance.
          </p>

          <p className="mt-4">
            Enter your initial investment, monthly withdrawal, expected annual
            return, and tenure to estimate your total withdrawals, remaining
            value, and overall growth.
          </p>

          <p className="mt-4">
            The calculation uses a simplified monthly model. Actual SWP
            outcomes can differ because investment returns vary over time and
            may be affected by market performance, fees, taxes, withdrawal
            dates, and the specific mutual fund or product terms.
          </p>

          <p className="mt-4">
            This calculator is designed for planning and educational estimates.
            It uses an assumed return to show how your investment may change over
            the selected withdrawal period, so it should not be treated as a
            guarantee of future investment returns.
          </p>
        </>
      }
    >
      <SWPCalculator />
    </CalculatorPage>
  );
}