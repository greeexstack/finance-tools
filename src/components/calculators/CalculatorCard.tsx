import Link from "next/link";

type CalculatorCardProps = {
  name: string;
  shortName: string;
  description: string;
  href: string;
};

export default function CalculatorCard({
  name,
  shortName,
  description,
  href,
}: CalculatorCardProps) {
  return (
    <Link
      href={href}
      className="group block min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="shrink-0 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
            {shortName}
          </span>

          <h3 className="min-w-0 text-base font-semibold leading-6 text-slate-900 sm:text-lg">
            {name}
          </h3>
        </div>

        <span
          aria-hidden="true"
          className="shrink-0 text-lg text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-slate-900"
        >
          →
        </span>
      </div>

      <p className="mt-3 text-sm leading-6 text-slate-600">
        {description}
      </p>

      <div className="mt-5 flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-slate-900">
          Open calculator
        </span>

        <span
          aria-hidden="true"
          className="text-sm text-slate-400 transition-transform group-hover:translate-x-1"
        >
          →
        </span>
      </div>
    </Link>
  );
}