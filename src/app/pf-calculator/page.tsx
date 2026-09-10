import type { Metadata } from "next";
import CalculatorPage from "@/components/calculators/CalculatorPage";
import PFCalculator from "@/components/calculators/PFCalculator";
import ExpandableSection from "@/components/seo/ExpandableSection";

export const metadata: Metadata = {
  title: "EPF Calculator — India",
  description:
    "Calculate your estimated EPF balance, employee and employer contributions, EPS contribution, interest earned, and retirement corpus using salary, current balance, interest rate, and tenure.",
  alternates: {
    canonical: "/pf-calculator",
  },
};

export default function PFCalculatorPage() {
  return (
    <CalculatorPage
      eyebrow="India • Employees' Provident Fund"
      title="EPF Calculator"
      description="Estimate your EPF balance, contributions, interest earned, and projected corpus using your monthly Basic + DA, current EPF balance, interest rate, and tenure."
      infoTitle="How the EPF calculation works"
      infoContent={
        <>
          <ExpandableSection title="What is an EPF calculator?">
            <p>
              An Employees' Provident Fund (EPF) calculator estimates how your
              EPF balance may grow over time from your existing EPF balance,
              employee contributions, employer EPF contributions, and estimated
              interest.
            </p>

            <p className="mt-4">
              This calculator uses your monthly Basic + DA, current EPF balance,
              annual interest rate, and remaining tenure to estimate the
              contributions and interest that may accumulate in your EPF account.
            </p>
          </ExpandableSection>

          <ExpandableSection title="How EPF contributions are calculated">
            <p>
              In the standard calculation model used here, eligible EPF wages are
              capped at ₹15,000 per month. The employee contribution is calculated
              at 12% of the eligible wage, while the standard employer contribution
              is also calculated at 12%.
            </p>

            <p className="mt-4">
              The employer contribution is not treated as one amount going entirely
              into your EPF balance. The calculator separates the employer
              contribution into an EPS portion and an EPF portion.
            </p>

            <div className="mt-5 overflow-x-auto rounded-xl bg-slate-50 p-4 font-mono text-sm">
              Employee contribution = 12% × eligible wage
              <br />
              Employer contribution = 12% × eligible wage
              <br />
              EPS contribution = 8.33% × eligible wage
              <br />
              Employer EPF contribution = employer contribution − EPS contribution
              <br />
              Monthly EPF credit = employee contribution + employer EPF contribution
            </div>

            <p className="mt-3 text-sm text-slate-500">
              The ₹15,000 wage ceiling and contribution structure shown above are
              the standard-case assumptions used by this calculator. Actual EPF
              contributions can depend on your employment and contribution
              arrangement.
            </p>
          </ExpandableSection>

          <ExpandableSection title="How EPF interest is calculated">
            <p>
              This calculator estimates EPF interest using monthly running
              balances. The annual interest rate you enter is converted into a
              monthly rate, and interest is estimated on the balance during each
              month.
            </p>

            <p className="mt-4">
              Monthly EPF contributions are added after the current month's
              interest calculation in this model. As a result, a contribution made
              during a month begins earning estimated interest from the following
              month.
            </p>

            <p className="mt-4">
              Interest is accumulated during each financial year and then added to
              the EPF balance at the end of the year. The yearly interest amount is
              rounded to the nearest rupee before being credited in the
              calculation.
            </p>
          </ExpandableSection>

          <ExpandableSection title="What does the EPF calculator show?">
            <p>
              The calculator separates the estimated employee contribution,
              employer contribution, employer EPS contribution, and employer EPF
              contribution. It also shows the monthly amount credited to the EPF
              account.
            </p>

            <p className="mt-4">
              Over the selected tenure, it calculates total employee
              contributions, total employer EPF contributions, total employer EPS
              contributions, total EPF contributions, estimated interest earned,
              and the projected EPF maturity balance.
            </p>

            <p className="mt-4">
              The employer EPS contribution is tracked separately because it does
              not form part of the EPF balance calculated by this tool.
            </p>
          </ExpandableSection>

          <ExpandableSection title="What affects your EPF balance?">
            <p>
              Your estimated EPF balance depends on your current EPF balance,
              monthly Basic + DA, contribution rates, assumed interest rate, and
              remaining tenure.
            </p>

            <p className="mt-4">
              A larger eligible wage can increase contributions until the
              calculator's ₹15,000 standard wage ceiling is reached. A higher
              assumed interest rate or longer tenure can also increase the
              projected balance because contributions and existing savings have
              more opportunity to accumulate interest.
            </p>
          </ExpandableSection>

          <ExpandableSection title="Why can your EPF balance differ from this estimate?">
            <p>
              This calculator uses a standard-case model and does not attempt to
              reproduce every EPFO account-specific rule or employment
              arrangement. Actual EPF balances can differ because of contribution
              timing, wage structures, higher-wage contribution arrangements,
              transfers, withdrawals, account changes, interest-rate changes, and
              other applicable rules.
            </p>

            <p className="mt-4">
              The calculator also uses the annual interest rate you enter for the
              selected projection period. A future rate should therefore be
              treated as an assumption for planning rather than a guaranteed
              long-term EPF interest rate.
            </p>
          </ExpandableSection>

          <ExpandableSection title="EPF and EPS are not the same">
            <p>
              A common source of confusion is assuming that the entire employer
              contribution becomes part of the EPF balance. Under the standard
              contribution structure used in this calculator, a portion of the
              employer contribution is allocated to EPS and is therefore tracked
              separately from the EPF account balance.
            </p>

            <p className="mt-4">
              This calculator keeps the estimated employer EPS contribution
              separate so that the projected EPF balance represents the amount
              actually credited to the EPF account under the model used here.
            </p>
          </ExpandableSection>

          <ExpandableSection title="About the ₹15,000 wage ceiling">
            <p>
              For this calculator's standard-case estimate, the monthly Basic + DA
              used for contribution calculations is capped at ₹15,000. This is an
              explicit modeling assumption and does not mean every EPF member's
              actual contribution must always follow this exact calculation.
            </p>

            <p className="mt-4">
              Higher-wage contributions and other special EPF arrangements are not
              modeled by this version of the calculator. If your actual EPF
              contribution structure differs, your EPFO or employer records may
              therefore produce a different result.
            </p>
          </ExpandableSection>

          <ExpandableSection title="EPF interest-rate assumptions">
            <p>
              EPF interest rates are declared for financial years and can change
              over time. When using this calculator for a future projection, the
              interest rate you enter is an assumed rate applied throughout the
              selected tenure.
            </p>

            <p className="mt-4">
              This means the projected maturity amount should not be interpreted as
              a guaranteed future EPF balance. For the most accurate current
              account information, refer to your EPFO records and applicable
              official rules.
            </p>
          </ExpandableSection>

          <ExpandableSection title="Important assumptions">
            <p>
              This calculator is intended for planning and educational estimates.
              It is not an official EPFO account statement, does not reproduce
              every EPFO rule or account-specific situation, and should not be
              treated as financial advice.
            </p>
          </ExpandableSection>
        </>
      }
    >
      <PFCalculator />
    </CalculatorPage>
  );
}