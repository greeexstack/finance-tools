"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { currencies, getCurrency } from "@/lib/currencies";
import {
  detectDefaultCurrency,
  getRecentCurrencies,
  saveCurrencyPreference,
} from "@/lib/detect-currency";

type CurrencySelectorProps = {
  value: string | null;
  onChange: (currency: string) => void;
  label?: string;
};

export default function CurrencySelector({
  value,
  onChange,
  label = "Currency",
}: CurrencySelectorProps) {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [recentCurrencies, setRecentCurrencies] = useState<string[]>(
    [],
  );

  const containerRef = useRef<HTMLDivElement>(null);

  const selectedCode = value ?? "INR";
  const selectedCurrency = getCurrency(selectedCode);

  /*
   * Initialize the currency only when the parent has
   * not initialized it yet.
   *
   * Priority:
   * 1. Previously selected currency
   * 2. User's country/locale currency
   * 3. INR fallback
   */
  useEffect(() => {
    if (value !== null) {
      setRecentCurrencies(getRecentCurrencies());
      return;
    }

    const detectedCurrency = detectDefaultCurrency();

    onChange(detectedCurrency);
    setRecentCurrencies(getRecentCurrencies());
  }, [value, onChange]);

  /*
   * Close the dropdown when the user clicks outside it.
   */
  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearch("");
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick,
      );
    };
  }, []);

  /*
   * Search by:
   * - currency code
   * - currency name
   * - currency symbol
   * - country/region aliases
   */
  const filteredCurrencies = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return currencies;
    }

    return currencies.filter((currency) => {
      return currency.searchTerms.some((term) =>
        term.toLowerCase().includes(query),
      );
    });
  }, [search]);

  /*
   * Convert stored recent currency codes into
   * currency objects and remove the currently selected one.
   */
  const recentCurrencyObjects = useMemo(() => {
    return recentCurrencies
      .map((code) => getCurrency(code))
      .filter((currency) => currency.code !== selectedCode);
  }, [recentCurrencies, selectedCode]);

  function handleSelect(currencyCode: string) {
    saveCurrencyPreference(currencyCode);
    setRecentCurrencies(getRecentCurrencies());
    onChange(currencyCode);
    setSearch("");
    setIsOpen(false);
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full min-w-0"
    >
      <label
        htmlFor="currency-search"
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        {label}
      </label>

      {/* Selected currency */}
      <button
        type="button"
        onClick={() => {
          setIsOpen((open) => !open);
          setSearch("");
        }}
        className="flex w-full min-w-0 items-center justify-between gap-3 rounded-xl border border-slate-300 bg-white px-3 py-3 text-left outline-none transition hover:border-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="min-w-0 truncate text-sm text-slate-900">
          <span className="font-semibold">
            {selectedCurrency.code}
          </span>{" "}
          — {selectedCurrency.name}
        </span>

        <span
          aria-hidden="true"
          className={`shrink-0 text-slate-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ↓
        </span>
      </button>

      {/* Currency dropdown */}
      {isOpen && (
        <div className="absolute left-0 right-0 z-50 mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
          {/* Search */}
          <div className="border-b border-slate-100 p-3">
            <input
              id="currency-search"
              type="search"
              autoFocus
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search by country, currency, or code..."
              className="w-full min-w-0 rounded-xl border border-slate-300 px-3 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              aria-label="Search currencies"
            />
          </div>

          <div
            className="max-h-[min(20rem,60vh)] overflow-y-auto overscroll-contain"
            role="listbox"
            aria-label="Currencies"
          >
            {/* Recent currencies */}
            {!search && recentCurrencyObjects.length > 0 && (
              <div className="border-b border-slate-100 px-3 py-3">
                <p className="px-1 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Recent
                </p>

                <div className="space-y-1">
                  {recentCurrencyObjects.map((currency) => (
                    <button
                      key={currency.code}
                      type="button"
                      role="option"
                      aria-selected={
                        currency.code === selectedCode
                      }
                      onClick={() =>
                        handleSelect(currency.code)
                      }
                      className="flex w-full min-w-0 items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-slate-700 transition hover:bg-slate-50 focus:bg-slate-50 focus:outline-none"
                    >
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold">
                          {currency.code}
                        </span>

                        <span className="block truncate text-xs text-slate-500">
                          {currency.name}
                        </span>
                      </span>

                      <span className="shrink-0 text-sm font-medium text-slate-500">
                        {currency.symbol}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* All/search results */}
            {filteredCurrencies.length > 0 ? (
              <div className="py-1">
                {!search && (
                  <p className="px-4 pb-2 pt-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    All currencies
                  </p>
                )}

                {filteredCurrencies.map((currency) => {
                  const isSelected =
                    currency.code === selectedCode;

                  return (
                    <button
                      key={currency.code}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() =>
                        handleSelect(currency.code)
                      }
                      className={`flex w-full min-w-0 items-center justify-between gap-3 px-4 py-3 text-left transition focus:outline-none ${
                        isSelected
                          ? "bg-indigo-50 text-indigo-700"
                          : "text-slate-700 hover:bg-slate-50 focus:bg-slate-50"
                      }`}
                    >
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold">
                          {currency.code}
                        </span>

                        <span className="block truncate text-xs text-slate-500">
                          {currency.name}
                        </span>
                      </span>

                      <span className="shrink-0 text-sm font-medium text-slate-500">
                        {currency.symbol}
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="px-4 py-8 text-center text-sm text-slate-500">
                No currencies found.
              </div>
            )}
          </div>
        </div>
      )}

      <p className="mt-2 text-xs text-slate-500">
        Selected: {selectedCurrency.symbol}{" "}
        {selectedCurrency.code}
      </p>
    </div>
  );
}