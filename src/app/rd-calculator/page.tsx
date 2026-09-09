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
      description="Use this RD calculator to estimate your maturity amount, total deposits, and interest earned from a recurring deposit based on your monthly deposit, interest rate, and tenure."
      infoTitle="How the RD calculation works"
      infoContent={
        <>
          <p>
            A recurring deposit (RD) allows you to deposit a fixed amount at
            regular intervals, usually every month, for a selected period.
            This RD calculator estimates the maturity value of those monthly
            deposits using the entered annual interest rate and tenure.
          </p>

          <p className="mt-4">
            Enter your monthly deposit, annual interest rate, and tenure to
            estimate the total amount deposited, interest earned, and maturity
            amount at the end of the selected period.
          </p>

          <div className="mt-5 rounded-xl bg-slate-50 p-4 font-mono text-sm">
            Maturity Amount = PMT × ((1 + r)^n − 1) ÷ r
          </div>

          <p className="mt-3 text-sm text-slate-500">
            PMT = monthly deposit, r = monthly interest rate, and n = total
            number of monthly deposits. The monthly rate used by this
            calculator is the entered annual rate divided by 12 and converted
            from a percentage to a decimal.
          </p>

          <p className="mt-4">
            The calculator treats the monthly deposits as a level series of
            payments earning the entered annual rate with monthly compounding.
            It calculates the estimated maturity amount from the accumulated
            value of those monthly deposits.
          </p>

          <h3 className="mt-7 text-lg font-semibold text-slate-900">
            What is an RD?
          </h3>

          <p className="mt-2">
            A recurring deposit is a savings product in which you make a
            regular deposit, typically every month, instead of investing one
            large amount at the beginning. Each deposit contributes to the
            overall maturity value, while interest is earned according to the
            applicable RD terms.
          </p>

          <p className="mt-4">
            An RD can be useful when you want to build savings gradually through
            regular deposits. Your final maturity amount depends on factors
            such as how much you deposit each month, the interest rate, and the
            length of the RD.
          </p>

          <h3 className="mt-7 text-lg font-semibold text-slate-900">
            What affects your RD maturity amount?
          </h3>

          <p className="mt-2">
            The estimated maturity amount changes with your monthly deposit,
            annual interest rate, and tenure. Increasing the monthly deposit
            generally increases the total amount accumulated. A higher assumed
            interest rate can increase the estimated interest earned, while a
            longer tenure gives the deposits more time to accumulate interest.
          </p>

          <p className="mt-4">
            The timing of individual deposits also matters in real RD products.
            Earlier deposits generally have more time to earn interest than
            later deposits. This is one reason the exact maturity calculation
            can depend on the rules and conventions used by the financial
            institution.
          </p>

          <h3 className="mt-7 text-lg font-semibold text-slate-900">
            Why can an RD calculator differ from a bank quote?
          </h3>

          <p className="mt-2">
            This calculator provides a simplified estimate rather than an
            official maturity quote from a bank or financial institution.
            Actual RD maturity values can differ because institutions may use
            different interest-calculation conventions, compounding rules,
            deposit-date assumptions, rounding methods, applicable rates, and
            product-specific terms.
          </p>

          <p className="mt-4">
            The calculation used here models the deposits as a monthly series
            earning the entered annual rate with monthly compounding. Your
            bank's actual RD calculation may follow a different convention, so
            its maturity amount may not exactly match this estimate.
          </p>

          <h3 className="mt-7 text-lg font-semibold text-slate-900">
            What does this RD calculator show?
          </h3>

          <p className="mt-2">
            The calculator provides three main results: your total deposited
            amount, estimated interest earned, and estimated maturity amount.
            Total deposited is the monthly deposit multiplied by the number of
            months in the selected tenure. Estimated interest is the difference
            between the maturity amount and your total deposits.
          </p>

          <p className="mt-4">
            Use these results to understand how changing your monthly deposit,
            interest rate, or tenure can affect the estimated outcome of an RD.
          </p>

          <p className="mt-4">
            This calculator is intended for planning and educational estimates.
            It does not provide a guaranteed return or replace an official
            maturity calculation from a bank or other financial institution.
          </p>
        </>
      }
    >
      <RDCalculator />
    </CalculatorPage>
  );
}