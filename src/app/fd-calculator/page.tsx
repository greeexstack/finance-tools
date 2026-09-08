import type { Metadata } from "next";
import CalculatorPage from "@/components/calculators/CalculatorPage";
import FDCalculator from "@/components/calculators/FDCalculator";

export const metadata: Metadata = {
  title: "Fixed Deposit Calculator — FD Interest & Maturity",
  description:
    "Calculate your fixed deposit maturity amount and interest earned using deposit amount, annual interest rate, tenure, and compounding frequency.",
  alternates: {
    canonical: "/fd-calculator",
  },
};

export default function FDCalculatorPage() {
  return (
    <CalculatorPage
      eyebrow="Fixed Deposit Calculator"
      title="Fixed Deposit Calculator"
      description="Use this FD calculator to estimate your maturity amount, total interest earned, and principal growth from a fixed deposit using your deposit amount, interest rate, tenure, and compounding frequency."
      infoTitle="How the fixed deposit calculation works"
      infoContent={
        <>
          <p>
            A fixed deposit (FD) calculator estimates how a one-time deposit
            may grow when interest is compounded at a selected frequency. Enter
            the deposit amount, annual interest rate, tenure, and compounding
            frequency to calculate an estimated maturity amount and interest
            earned.
          </p>

          <div className="mt-5 rounded-xl bg-slate-50 p-4 font-mono text-sm">
            A = P × (1 + r / n)^(n × t)
          </div>

          <p className="mt-3 text-sm text-slate-500">
            P = principal, r = annual interest rate as a decimal, n = number of
            compounding periods per year, and t = tenure in years.
          </p>

          <h3 className="mt-7 text-lg font-semibold text-slate-900">
            What affects your FD maturity amount?
          </h3>

          <p className="mt-2">
            The maturity estimate changes with the amount deposited, the annual
            interest rate, the length of the deposit, and how frequently
            interest is compounded. More frequent compounding can produce a
            higher maturity value for the same rate and tenure because interest
            is added to the balance more often.
          </p>

          <h3 className="mt-7 text-lg font-semibold text-slate-900">
            Why can an FD calculator differ from a bank quote?
          </h3>

          <p className="mt-2">
            This tool is a general planning calculator rather than a quote from
            a specific bank or financial institution. Actual fixed deposit
            maturity values can differ because products may use different
            compounding, payout, day-count, rounding, tax, or early-withdrawal
            rules.
          </p>
        </>
      }
    >
      <FDCalculator />
    </CalculatorPage>
  );
}
