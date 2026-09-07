import type { ReactNode } from "react";

type CalculatorPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  infoTitle: string;
  infoContent: ReactNode;
};

export default function CalculatorPage({
  eyebrow,
  title,
  description,
  children,
  infoTitle,
  infoContent,
}: CalculatorPageProps) {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            {eyebrow}
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            {title}
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-600">
            {description}
          </p>
        </header>

        <section className="mx-auto mt-10 max-w-4xl">
          {children}
        </section>

        <section className="mx-auto mt-10 max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">
            {infoTitle}
          </h2>

          <div className="mt-3 leading-7 text-slate-600">
            {infoContent}
          </div>
        </section>
      </div>
    </main>
  );
}