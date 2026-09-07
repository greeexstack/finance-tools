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
      className="group block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
            {shortName}
          </span>

          <h3 className="text-lg font-semibold text-slate-900">
            {name}
          </h3>
        </div>

        <span className="text-lg text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-slate-900">
          →
        </span>
      </div>

      <p className="mt-3 text-sm leading-6 text-slate-600">
        {description}
      </p>

      <p className="mt-5 text-sm font-medium text-slate-900">
        Open calculator
      </p>
    </Link>
  );
}