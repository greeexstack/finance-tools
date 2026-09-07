# Boring Tool Empire

A simple finance calculator platform built with Next.js, TypeScript, React, Tailwind CSS, and Vitest.

The goal is to build a collection of simple, useful, focused tools that solve everyday problems.

## Finance Hub

The first product area is the Finance Hub.

### Live Calculators

- FD Calculator — Fixed Deposit maturity and interest
- RD Calculator — Recurring Deposit maturity and interest
- PF Calculator — Provident Fund growth estimate
- SWP Calculator — Systematic Withdrawal Plan estimate

## Routes

```text
/
├── /fd-calculator
├── /rd-calculator
├── /pf-calculator
└── /swp-calculator
src/
├── app/
│   ├── fd-calculator/
│   │   └── page.tsx
│   ├── rd-calculator/
│   │   └── page.tsx
│   ├── pf-calculator/
│   │   └── page.tsx
│   ├── swp-calculator/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── calculators/
│   │   ├── CalculatorCard.tsx
│   │   ├── CalculatorPage.tsx
│   │   ├── FDCalculator.tsx
│   │   ├── RDCalculator.tsx
│   │   ├── PFCalculator.tsx
│   │   └── SWPCalculator.tsx
│   ├── SiteHeader.tsx
│   └── SiteFooter.tsx
│
└── lib/
    ├── calculators.ts
    ├── calculators.test.ts
    ├── format-currency.ts
    ├── fd-calculator.ts
    ├── fd-calculator.test.ts
    ├── rd-calculator.ts
    ├── rd-calculator.test.ts
    ├── pf-calculator.ts
    ├── pf-calculator.test.ts
    ├── swp-calculator.ts
    └── swp-calculator.test.ts