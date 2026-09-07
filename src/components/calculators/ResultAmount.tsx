import { formatCurrency } from "@/lib/format-currency";

type ResultAmountProps = {
  value: number;
  currencyCode: string;
  className?: string;
  size?: "hero" | "card";
};

function getFontSize(
  formattedValue: string,
  size: "hero" | "card",
) {
  const length = formattedValue.length;

  if (size === "card") {
    if (length <= 10) return "1.125rem";
    if (length <= 13) return "1.0625rem";
    if (length <= 16) return "1rem";
    if (length <= 20) return "0.9375rem";
    if (length <= 24) return "0.875rem";
    if (length <= 28) return "0.8125rem";
    return "0.75rem";
  }

  if (length <= 10) return "3rem";
  if (length <= 13) return "2.75rem";
  if (length <= 16) return "2.45rem";
  if (length <= 20) return "2.15rem";
  if (length <= 24) return "1.9rem";
  if (length <= 28) return "1.65rem";
  if (length <= 32) return "1.4rem";
  if (length <= 36) return "1.2rem";
  return "1.05rem";
}

export default function ResultAmount({
  value,
  currencyCode,
  className = "",
  size = "hero",
}: ResultAmountProps) {
  const formattedValue = formatCurrency(
    value,
    currencyCode,
  );

  return (
    <div className="min-w-0 w-full max-w-full overflow-hidden">
      <p
        className={`block w-full max-w-full overflow-hidden whitespace-nowrap font-bold leading-none tracking-tight ${className}`}
        style={{
          fontSize: getFontSize(
            formattedValue,
            size,
          ),
          textOverflow: "clip",
        }}
        title={formattedValue}
      >
        {formattedValue}
      </p>
    </div>
  );
}