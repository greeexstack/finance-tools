import CalculatorPage from "@/components/calculators/CalculatorPage";
import PPFCalculator from "@/components/calculators/PPFCalculator";

export const metadata = {
  title: "PPF Calculator — India",
  description:
    "Estimate your Public Provident Fund maturity value, total contributions, and interest earned.",
};

export default function PPFCalculatorPage() {
  return (
    <CalculatorPage
      eyebrow="India • Public Provident Fund"
      title="PPF Calculator"
      description="Estimate your PPF maturity value based on your contribution, timing, interest rate, and tenure."
      infoTitle="About this PPF calculator"
      infoContent="This calculator estimates the future value of contributions made to India's Public Provident Fund (PPF) using the contribution pattern, deposit timing, planning interest rate, and selected tenure. Actual PPF returns can differ because government-notified rates, deposit dates, withdrawals, and account-specific activity can affect the final amount."
    >
      <PPFCalculator />
    </CalculatorPage>
  );
}