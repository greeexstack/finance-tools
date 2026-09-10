import type { Metadata } from "next";
import CalculatorPage from "@/components/calculators/CalculatorPage";
import PPFCalculator from "@/components/calculators/PPFCalculator";
import ExpandableSection from "@/components/seo/ExpandableSection";

export const metadata: Metadata = {
  title: "PPF Calculator — Public Provident Fund Calculator India",
  description:
    "Calculate your estimated PPF maturity amount, total contributions, and interest earned using your contribution, deposit timing, interest rate, and tenure.",
  alternates: {
    canonical: "/ppf-calculator",
  },
};

export default function PPFCalculatorPage() {
  return (
    <CalculatorPage
      eyebrow="India • Public Provident Fund"
      title="PPF Calculator"
      description="Use this PPF calculator to estimate your maturity amount, total contributions, and interest earned based on your contribution pattern, deposit timing, interest rate, and tenure."
      infoTitle="How the PPF calculation works"
      infoContent={
        <>
          <ExpandableSection title="What is a PPF calculator?">
            <p>
              A Public Provident Fund (PPF) calculator estimates how your
              contributions may grow over time using an assumed interest rate and
              the selected contribution pattern and tenure.
            </p>

            <p className="mt-4">
              PPF is a long-term savings scheme in India. You can make eligible
              contributions during the financial year, and the account earns
              interest according to the rate notified for the scheme. This
              calculator provides an estimate of your total contributions,
              estimated interest earned, and projected maturity value.
            </p>
          </ExpandableSection>

          <ExpandableSection title="What is PPF?">
            <p>
              The Public Provident Fund is a government-backed long-term savings
              scheme designed for individuals who want to build savings over an
              extended period. A PPF account normally has a 15-year maturity
              period and can be extended in five-year blocks subject to the
              applicable rules.
            </p>

            <p className="mt-4">
              Under the standard scheme rules, eligible contributions can range
              from ₹500 to ₹1.5 lakh in a financial year, with up to 12 deposits
              permitted in a year. The applicable interest rate is notified by
              the government and can change over time.
            </p>
          </ExpandableSection>

          <ExpandableSection title="How PPF interest is calculated">
            <p>
              PPF interest is not simply calculated by applying the annual rate to
              the amount you deposit at the end of the year. The timing of your
              deposits matters because PPF interest is calculated using the lowest
              balance between the close of the fifth day of a month and the end of
              that month.
            </p>

            <p className="mt-4">
              This means that depositing money earlier in a month can allow that
              contribution to be included in the balance used for that month's
              interest calculation. A contribution made after the fifth day may
              not receive interest for that month under the applicable calculation
              rule.
            </p>

            <p className="mt-4">
              This timing rule is particularly important when comparing a yearly
              lump-sum contribution with monthly contributions. The final result
              can depend not only on how much you contribute, but also on when
              those contributions are made.
            </p>
          </ExpandableSection>

          <ExpandableSection title="What affects your PPF maturity amount?">
            <p>
              Your estimated PPF maturity value depends on the amount you
              contribute, how frequently you contribute, when contributions are
              made, the assumed interest rate, and the length of the investment
              period.
            </p>

            <p className="mt-4">
              Contributing earlier can give an amount more time to earn interest.
              Over a long period, even differences caused by contribution timing
              can compound and affect the final projected balance.
            </p>

            <p className="mt-4">
              The interest rate is also important. Because PPF rates are notified
              for applicable periods and may change in the future, a projection
              using today's rate should be treated as an assumption rather than a
              guaranteed long-term return.
            </p>
          </ExpandableSection>

          <ExpandableSection title="Monthly vs yearly PPF contributions">
            <p>
              Investors often compare making a larger contribution early in the
              financial year with spreading contributions across multiple months.
              The amount contributed may be the same, but the timing of those
              contributions can affect the interest earned because of the PPF
              monthly balance rule.
            </p>

            <p className="mt-4">
              For example, if the same annual amount is contributed earlier in the
              financial year rather than gradually later in the year, the earlier
              contribution can have more opportunity to be included in the
              interest calculation. The exact difference depends on the deposit
              dates and the applicable PPF rate.
            </p>

            <p className="mt-4">
              This calculator can therefore be used to understand how different
              contribution patterns may affect the estimated result. It should be
              treated as a planning estimate rather than an official PPF account
              calculation.
            </p>
          </ExpandableSection>

          <ExpandableSection title="PPF contribution limits and tenure">
            <p>
              Under the standard PPF rules, the minimum contribution is ₹500 per
              financial year and the maximum contribution is ₹1.5 lakh per
              financial year. Up to 12 deposits can generally be made in a
              financial year.
            </p>

            <p className="mt-4">
              The standard maturity period is 15 years. After maturity, the
              account may be extended in five-year blocks according to the
              applicable PPF rules. Extension decisions can affect how long the
              corpus remains invested and whether additional contributions are
              made.
            </p>
          </ExpandableSection>

          <ExpandableSection title="PPF withdrawals and loans">
            <p>
              PPF also has rules governing loans and partial withdrawals during
              the account's life. These transactions can affect the balance used
              for future interest calculations and therefore can change the final
              amount accumulated.
            </p>

            <p className="mt-4">
              This calculator does not attempt to model every loan, withdrawal,
              premature-closure, or account-specific scenario. If you have
              already withdrawn money or taken a loan against your PPF account,
              your actual account balance may differ from a simple projection.
            </p>
          </ExpandableSection>

          <ExpandableSection title="PPF interest-rate assumptions">
            <p>
              PPF interest rates are notified by the government and can change
              over time. The rate entered into this calculator is therefore a
              planning assumption applied to the selected projection period.
            </p>

            <p className="mt-4">
              A current PPF rate should not be interpreted as a guaranteed rate
              for all future years. For a long-term projection, changing the
              assumed rate can significantly change the estimated maturity value.
            </p>
          </ExpandableSection>

          <ExpandableSection title="Why can the PPF calculator differ from your actual account?">
            <p>
              This calculator is a planning tool and does not reproduce every
              account-specific rule or transaction recorded by a bank or post
              office. Actual PPF balances can differ because of deposit dates,
              withdrawals, loans, changes in notified interest rates, account
              activity, rounding, and other applicable scheme rules.
            </p>

            <p className="mt-4">
              In particular, the timing of deposits is important for PPF interest.
              A simple calculation that applies the annual rate to the total
              yearly contribution may not accurately represent the interest
              calculation used for an actual PPF account.
            </p>
          </ExpandableSection>

          <ExpandableSection title="PPF tax treatment">
            <p>
              PPF has specific tax treatment under Indian tax rules, including
              tax-exempt interest under the applicable provisions. The treatment
              of contribution deductions can depend on the applicable tax regime
              and current rules.
            </p>

            <p className="mt-4">
              This calculator does not determine your personal tax liability or
              provide individual tax advice. Tax rules can change, so tax-related
              decisions should be checked against current official guidance.
            </p>
          </ExpandableSection>

          <ExpandableSection title="Important assumptions">
            <p>
              This calculator is intended for planning and educational estimates.
              It is not an official PPF account statement and does not guarantee
              future returns. Actual results may differ based on applicable PPF
              rules, notified interest rates, deposit timing, withdrawals, and
              account-specific activity.
            </p>
          </ExpandableSection>
        </>
      }
    >
      <PPFCalculator />
    </CalculatorPage>
  );
}