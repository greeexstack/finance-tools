export type Calculator = {
  name: string;
  shortName: string;
  description: string;
  href: string;
  category: string;
  status: "Live" | "Coming soon";
};

export const calculators: Calculator[] = [
  {
    name: "FD Calculator",
    shortName: "FD",
    description: "Calculate fixed deposit maturity and interest.",
    href: "/fd-calculator",
    category: "Savings & Deposits",
    status: "Live",
  },
  {
    name: "RD Calculator",
    shortName: "RD",
    description: "Calculate recurring deposit maturity and interest.",
    href: "/rd-calculator",
    category: "Savings & Deposits",
    status: "Live",
  },
  {
    name: "PF Calculator",
    shortName: "PF",
    description: "Estimate provident fund growth and maturity.",
    href: "/pf-calculator",
    category: "Retirement & Long-Term",
    status: "Live",
  },
  {
    name: "SWP Calculator",
    shortName: "SWP",
    description:
      "Estimate withdrawals and remaining investment value.",
    href: "/swp-calculator",
    category: "Retirement & Long-Term",
    status: "Live",
  },
];