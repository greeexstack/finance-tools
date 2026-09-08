"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ContactEmail from "@/components/ContactEmail";

const navigation = [
  { name: "Home", href: "/" },
  { name: "FD", href: "/fd-calculator" },
  { name: "RD", href: "/rd-calculator" },
  { name: "SWP", href: "/swp-calculator" },
  {
    name: "EPF — India",
    href: "/pf-calculator",
  },
  {
    name: "PPF — India",
    href: "/ppf-calculator",
  },
  {
    name: "Currency",
    href: "/currency-converter",
  },
];

export default function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] =
    useState(false);

  useEffect(() => {
    function handleEscape(
      event: KeyboardEvent,
    ) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener(
      "keydown",
      handleEscape,
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape,
      );
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-16 items-center gap-4">
          <Link
            href="/"
            className="group flex min-w-0 shrink-0 items-center gap-2.5"
            onClick={() =>
              setIsMenuOpen(false)
            }
          >
            <span
              aria-hidden="true"
              className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-slate-900 shadow-sm"
            >
              <span className="absolute h-4 w-4 rounded-full bg-indigo-500" />
              <span className="absolute h-2 w-2 rounded-full bg-white" />
            </span>

            <span className="truncate text-[15px] font-bold tracking-tight text-slate-900 sm:text-base">
              Finance Tools
            </span>
          </Link>

          <div className="ml-auto hidden items-center gap-1 sm:flex">
            <nav
              aria-label="Main navigation"
              className="flex items-center gap-1"
            >
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-xl px-3 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-indigo-500/30 ${
                    item.name.includes("India")
                      ? "text-slate-500 hover:bg-indigo-50 hover:text-indigo-700"
                      : "text-slate-600 hover:bg-indigo-50 hover:text-indigo-700"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="ml-1">
              <ContactEmail
                variant="icon"
                behavior="chooser"
              />
            </div>
          </div>

          <div className="ml-auto flex items-center gap-2 sm:hidden">
            <ContactEmail
              variant="icon"
              behavior="direct"
            />

            <button
              type="button"
              onClick={() =>
                setIsMenuOpen(
                  (open) => !open,
                )
              }
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
              aria-label={
                isMenuOpen
                  ? "Close menu"
                  : "Open menu"
              }
              aria-expanded={
                isMenuOpen
              }
              aria-controls="mobile-navigation"
            >
              <span className="sr-only">
                {isMenuOpen
                  ? "Close menu"
                  : "Open menu"}
              </span>

              {isMenuOpen ? (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="M6 6l12 12" />
                  <path d="M18 6L6 18" />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="M4 7h16" />
                  <path d="M4 12h16" />
                  <path d="M4 17h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="border-t border-slate-100 py-3 sm:hidden"
          >
            <div className="grid gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() =>
                    setIsMenuOpen(false)
                  }
                  className="rounded-xl px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                >
                  {item.href === "/"
                    ? "Home"
                    : item.href ===
                        "/fd-calculator"
                      ? "FD Calculator"
                      : item.href ===
                          "/rd-calculator"
                        ? "RD Calculator"
                        : item.href ===
                            "/swp-calculator"
                          ? "SWP Calculator"
                          : item.href ===
                              "/pf-calculator"
                            ? "EPF Calculator — India"
                            : item.href ===
                                "/ppf-calculator"
                              ? "PPF Calculator — India"
                              : "Currency Converter"}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}