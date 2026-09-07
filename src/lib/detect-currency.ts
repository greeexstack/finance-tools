const FALLBACK_CURRENCY = "INR";

const STORAGE_KEY = "finance-tools-currency";
const RECENT_STORAGE_KEY = "finance-tools-recent-currencies";
const MAX_RECENT_CURRENCIES = 3;

const REGION_CURRENCY_MAP: Record<string, string> = {
  AE: "AED",
  AF: "AFN",
  AL: "ALL",
  AR: "ARS",
  AU: "AUD",
  AZ: "AZN",
  BA: "BAM",
  BD: "BDT",
  BG: "BGN",
  BH: "BHD",
  BR: "BRL",
  BY: "BYN",
  CA: "CAD",
  CH: "CHF",
  CL: "CLP",
  CN: "CNY",
  CO: "COP",
  CZ: "CZK",
  DE: "EUR",
  DK: "DKK",
  DO: "DOP",
  DZ: "DZD",
  EG: "EGP",
  ES: "EUR",
  ET: "ETB",
  FI: "EUR",
  FJ: "FJD",
  FR: "EUR",
  GB: "GBP",
  GE: "GEL",
  GH: "GHS",
  GR: "EUR",
  HK: "HKD",
  HR: "EUR",
  HU: "HUF",
  ID: "IDR",
  IE: "EUR",
  IL: "ILS",
  IN: "INR",
  IQ: "IQD",
  IS: "ISK",
  IT: "EUR",
  JM: "JMD",
  JO: "JOD",
  JP: "JPY",
  KE: "KES",
  KG: "KGS",
  KH: "KHR",
  KR: "KRW",
  KW: "KWD",
  KZ: "KZT",
  LA: "LAK",
  LK: "LKR",
  LT: "EUR",
  LU: "EUR",
  LV: "EUR",
  MA: "MAD",
  MD: "MDL",
  MK: "MKD",
  MM: "MMK",
  MN: "MNT",
  MO: "MOP",
  MR: "MRU",
  MU: "MUR",
  MV: "MVR",
  MW: "MWK",
  MX: "MXN",
  MY: "MYR",
  MZ: "MZN",
  NG: "NGN",
  NI: "NIO",
  NL: "EUR",
  NO: "NOK",
  NP: "NPR",
  NZ: "NZD",
  OM: "OMR",
  PA: "PAB",
  PE: "PEN",
  PH: "PHP",
  PK: "PKR",
  PL: "PLN",
  PT: "EUR",
  PY: "PYG",
  QA: "QAR",
  RO: "RON",
  RS: "RSD",
  RU: "RUB",
  SA: "SAR",
  SE: "SEK",
  SG: "SGD",
  SI: "EUR",
  SK: "EUR",
  TH: "THB",
  TJ: "TJS",
  TM: "TMT",
  TN: "TND",
  TR: "TRY",
  TT: "TTD",
  TW: "TWD",
  TZ: "TZS",
  UA: "UAH",
  UG: "UGX",
  US: "USD",
  UY: "UYU",
  UZ: "UZS",
  VE: "VES",
  VN: "VND",
  ZA: "ZAR",
  ZM: "ZMW",
};

function getRegionFromLocale(locale: string): string | null {
  try {
    return new Intl.Locale(locale).maximize().region ?? null;
  } catch {
    return null;
  }
}

export function detectDefaultCurrency(): string {
  if (typeof window === "undefined") {
    return FALLBACK_CURRENCY;
  }

  const savedCurrency = window.localStorage.getItem(
    STORAGE_KEY,
  );

  if (savedCurrency) {
    return savedCurrency;
  }

  const locale =
    navigator.languages?.[0] ??
    navigator.language ??
    "en-IN";

  const region = getRegionFromLocale(locale);

  if (region && REGION_CURRENCY_MAP[region]) {
    return REGION_CURRENCY_MAP[region];
  }

  return FALLBACK_CURRENCY;
}

export function saveCurrencyPreference(currency: string) {
  if (typeof window === "undefined") {
    return;
  }

  const normalizedCurrency = currency.toUpperCase();

  window.localStorage.setItem(
    STORAGE_KEY,
    normalizedCurrency,
  );

  const recentCurrencies = getRecentCurrencies();

  const updatedRecentCurrencies = [
    normalizedCurrency,
    ...recentCurrencies.filter(
      (item) => item !== normalizedCurrency,
    ),
  ].slice(0, MAX_RECENT_CURRENCIES);

  window.localStorage.setItem(
    RECENT_STORAGE_KEY,
    JSON.stringify(updatedRecentCurrencies),
  );
}

export function getRecentCurrencies(): string[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = window.localStorage.getItem(
      RECENT_STORAGE_KEY,
    );

    if (!stored) {
      return [];
    }

    const parsed: unknown = JSON.parse(stored);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (item): item is string =>
        typeof item === "string" &&
        item.trim().length > 0,
    );
  } catch {
    return [];
  }
}