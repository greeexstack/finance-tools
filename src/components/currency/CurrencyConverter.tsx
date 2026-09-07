"use client";

import { useEffect, useMemo, useState } from "react";
import CurrencySelector from "@/components/calculators/CurrencySelector";
import {
  detectDefaultCurrency,
  saveCurrencyPreference,
} from "@/lib/detect-currency";

type ExchangeRateResponse = {
  date?: string | null;
  from?: string;
  to?: string;
  rate?: number;
  error?: string;
};

function formatAmount(value: number, currencyCode: string) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: 2,
  }).format(value);
}

function formatRate(value: number) {
  return new Intl.NumberFormat(undefined, {
    maximumFractionDigits: 6,
  }).format(value);
}

function formatRateDate(date: string) {
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

export default function CurrencyConverter() {
  const [amount, setAmount] = useState("");

  const [fromCurrency, setFromCurrency] = useState<string | null>(null);
  const [toCurrency, setToCurrency] = useState<string | null>(null);

  const [rate, setRate] = useState<number | null>(null);
  const [rateDate, setRateDate] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const defaultCurrency = detectDefaultCurrency();

    setFromCurrency(defaultCurrency);

    setToCurrency((currentCurrency) => {
      if (currentCurrency) {
        return currentCurrency;
      }

      return defaultCurrency === "USD" ? "INR" : "USD";
    });
  }, []);

  useEffect(() => {
    if (fromCurrency) {
      saveCurrencyPreference(fromCurrency);
    }
  }, [fromCurrency]);

  const numericAmount = useMemo(() => {
    if (!amount.trim()) {
      return null;
    }

    const parsed = Number(amount);

    if (!Number.isFinite(parsed) || parsed < 0) {
      return null;
    }

    return parsed;
  }, [amount]);

  /*
   * Fetch the exchange rate only when the selected currencies change.
   * The amount does not affect the exchange rate.
   */
  useEffect(() => {
    const from = fromCurrency;
    const to = toCurrency;

    if (!from || !to) {
      setRate(null);
      setRateDate(null);
      setError("");
      setIsLoading(false);
      return;
    }

    if (from === to) {
      setRate(1);
      setRateDate(null);
      setError("");
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();

    async function loadRate(
      sourceCurrency: string,
      targetCurrency: string,
    ) {
      setIsLoading(true);
      setError("");

      try {
        const response = await fetch(
          `/api/exchange-rate?from=${encodeURIComponent(
            sourceCurrency,
          )}&to=${encodeURIComponent(targetCurrency)}`,
          {
            signal: controller.signal,
          },
        );

        const data =
          (await response.json()) as ExchangeRateResponse;

        if (
          !response.ok ||
          typeof data.rate !== "number" ||
          !Number.isFinite(data.rate)
        ) {
          throw new Error(
            data.error ?? "Unable to fetch exchange rate.",
          );
        }

        setRate(data.rate);
        setRateDate(data.date ?? null);
      } catch (err) {
        if (
          err instanceof DOMException &&
          err.name === "AbortError"
        ) {
          return;
        }

        setRate(null);
        setRateDate(null);

        setError(
          err instanceof Error
            ? err.message
            : "Unable to fetch exchange rate.",
        );
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void loadRate(from, to);

    return () => {
      controller.abort();
    };
  }, [fromCurrency, toCurrency]);

  const convertedAmount =
    numericAmount !== null && rate !== null
      ? numericAmount * rate
      : null;

  function handleSwap() {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      <div className="space-y-5">
        {/* Amount */}
        <div>
          <label
            htmlFor="currency-amount"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Amount
          </label>

          <input
            id="currency-amount"
            type="number"
            min="0"
            step="any"
            inputMode="decimal"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            placeholder="Enter amount"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
          />
        </div>

        {/* Currency selection */}
        <div className="grid items-end gap-4 sm:grid-cols-[1fr_auto_1fr]">
          <CurrencySelector
            value={fromCurrency}
            onChange={setFromCurrency}
            label="From"
          />

          <button
            type="button"
            onClick={handleSwap}
            aria-label="Swap currencies"
            className="mx-auto inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M7 7h10" />
              <path d="m13 3 4 4-4 4" />
              <path d="M17 17H7" />
              <path d="m11 13-4 4 4 4" />
            </svg>
          </button>

          <CurrencySelector
            value={toCurrency}
            onChange={setToCurrency}
            label="To"
          />
        </div>

        {/* Result */}
        <div className="rounded-2xl bg-slate-50 p-5 sm:p-6">
          <p className="text-sm font-medium text-slate-500">
            Converted amount
          </p>

          {isLoading ? (
            <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Loading...
            </p>
          ) : error ? (
            <p className="mt-2 text-lg font-semibold text-red-600">
              Unable to convert
            </p>
          ) : convertedAmount !== null && toCurrency ? (
            <>
              <p className="mt-2 break-words text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                {formatAmount(convertedAmount, toCurrency)}
              </p>

              {fromCurrency && rate !== null && (
                <p className="mt-3 text-sm leading-6 text-slate-500">
                  1 {fromCurrency} = {formatRate(rate)}{" "}
                  {toCurrency}
                </p>
              )}

              {rateDate && (
                <p className="mt-1 text-xs text-slate-400">
                  Rate date: {formatRateDate(rateDate)}
                </p>
              )}
            </>
          ) : (
            <p className="mt-2 text-xl font-semibold text-slate-400">
              Enter an amount to convert
            </p>
          )}
        </div>

        {/* Error */}
        {error && (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700"
          >
            {error}
          </div>
        )}
      </div>
    </div>
  );
}