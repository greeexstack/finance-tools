type ExpandableSectionProps = {
  title: string;
  children: React.ReactNode;
};

export default function ExpandableSection({
  title,
  children,
}: ExpandableSectionProps) {
  return (
    <details className="group border-b border-slate-200 last:border-b-0">
      <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-4 text-left text-base font-medium text-slate-900 marker:hidden transition-colors hover:text-slate-700 sm:min-h-[68px] sm:py-5 sm:text-lg">
        <span>{title}</span>

        <span
          aria-hidden="true"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-transform duration-200 group-open:rotate-180"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </span>
      </summary>

      <div className="pb-5 pr-0 text-sm leading-6 text-slate-600 sm:pb-6 sm:pr-14 sm:text-base sm:leading-7">
        {children}
      </div>
    </details>
  );
}