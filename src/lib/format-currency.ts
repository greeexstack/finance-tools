const CURRENCY_LOCALES: Record<string, string> = {
  AED: "en-AE",
  AFN: "en-AF",
  ALL: "en-AL",
  AMD: "en-AM",
  ANG: "en-CW",
  AOA: "en-AO",
  ARS: "es-AR",
  AUD: "en-AU",
  AWG: "en-AW",
  AZN: "en-AZ",
  BAM: "bs-BA",
  BBD: "en-BB",
  BDT: "en-BD",
  BGN: "bg-BG",
  BHD: "en-BH",
  BIF: "en-BI",
  BMD: "en-BM",
  BND: "en-BN",
  BOB: "es-BO",
  BRL: "pt-BR",
  BSD: "en-BS",
  BTN: "en-BT",
  BWP: "en-BW",
  BYN: "be-BY",
  BZD: "en-BZ",
  CAD: "en-CA",
  CDF: "fr-CD",
  CHF: "de-CH",
  CLP: "es-CL",
  CNY: "zh-CN",
  COP: "es-CO",
  CRC: "es-CR",
  CUP: "es-CU",
  CVE: "pt-CV",
  CZK: "cs-CZ",
  DJF: "fr-DJ",
  DKK: "da-DK",
  DOP: "es-DO",
  DZD: "fr-DZ",
  EGP: "en-EG",
  ERN: "en-ER",
  ETB: "en-ET",
  EUR: "en-IE",
  FJD: "en-FJ",
  FKP: "en-FK",
  GBP: "en-GB",
  GEL: "en-GE",
  GHS: "en-GH",
  GIP: "en-GI",
  GMD: "en-GM",
  GNF: "fr-GN",
  GTQ: "es-GT",
  GYD: "en-GY",
  HKD: "en-HK",
  HNL: "es-HN",
  HRK: "hr-HR",
  HTG: "fr-HT",
  HUF: "hu-HU",
  IDR: "id-ID",
  ILS: "he-IL",
  INR: "en-IN",
  IQD: "ar-IQ",
  IRR: "fa-IR",
  ISK: "is-IS",
  JMD: "en-JM",
  JOD: "en-JO",
  JPY: "ja-JP",
  KES: "en-KE",
  KGS: "en-KG",
  KHR: "km-KH",
  KMF: "fr-KM",
  KRW: "ko-KR",
  KWD: "en-KW",
  KYD: "en-KY",
  KZT: "en-KZ",
  LAK: "lo-LA",
  LBP: "ar-LB",
  LKR: "en-LK",
  LRD: "en-LR",
  LSL: "en-LS",
  LYD: "en-LY",
  MAD: "fr-MA",
  MDL: "ro-MD",
  MGA: "fr-MG",
  MKD: "mk-MK",
  MMK: "my-MM",
  MNT: "mn-MN",
  MOP: "zh-MO",
  MRU: "fr-MR",
  MUR: "en-MU",
  MVR: "dv-MV",
  MWK: "en-MW",
  MXN: "es-MX",
  MYR: "ms-MY",
  MZN: "pt-MZ",
  NAD: "en-NA",
  NGN: "en-NG",
  NIO: "es-NI",
  NOK: "nb-NO",
  NPR: "en-NP",
  NZD: "en-NZ",
  OMR: "en-OM",
  PAB: "es-PA",
  PEN: "es-PE",
  PGK: "en-PG",
  PHP: "en-PH",
  PKR: "en-PK",
  PLN: "pl-PL",
  PYG: "es-PY",
  QAR: "en-QA",
  RON: "ro-RO",
  RSD: "sr-RS",
  RUB: "ru-RU",
  RWF: "rw-RW",
  SAR: "en-SA",
  SCR: "en-SC",
  SDG: "en-SD",
  SEK: "sv-SE",
  SGD: "en-SG",
  SHP: "en-SH",
  SLL: "en-SL",
  SOS: "en-SO",
  SRD: "nl-SR",
  SSP: "en-SS",
  STN: "pt-ST",
  SVC: "es-SV",
  SZL: "en-SZ",
  THB: "th-TH",
  TJS: "tg-TJ",
  TMT: "tk-TM",
  TND: "fr-TN",
  TOP: "en-TO",
  TRY: "tr-TR",
  TTD: "en-TT",
  TWD: "zh-TW",
  TZS: "sw-TZ",
  UAH: "uk-UA",
  UGX: "en-UG",
  USD: "en-US",
  UYU: "es-UY",
  UZS: "uz-UZ",
  VES: "es-VE",
  VND: "vi-VN",
  VUV: "en-VU",
  WST: "en-WS",
  XAF: "fr-CM",
  XCD: "en-AG",
  XOF: "fr-SN",
  XPF: "fr-PF",
  YER: "en-YE",
  ZAR: "en-ZA",
  ZMW: "en-ZM",
  ZWL: "en-ZW",
};

const ZERO_DECIMAL_CURRENCIES = new Set([
  "BIF",
  "CLP",
  "DJF",
  "GNF",
  "ISK",
  "JPY",
  "KMF",
  "KRW",
  "PYG",
  "RWF",
  "UGX",
  "VND",
  "VUV",
  "XAF",
  "XOF",
  "XPF",
]);

const THREE_DECIMAL_CURRENCIES = new Set([
  "BHD",
  "IQD",
  "JOD",
  "KWD",
  "LYD",
  "OMR",
  "TND",
]);

function getLocale(currencyCode: string): string {
  return (
    CURRENCY_LOCALES[currencyCode.toUpperCase()] ??
    "en-US"
  );
}

function getFractionDigits(currencyCode: string): number {
  const normalizedCurrency =
    currencyCode.toUpperCase();

  if (
    ZERO_DECIMAL_CURRENCIES.has(
      normalizedCurrency,
    )
  ) {
    return 0;
  }

  if (
    THREE_DECIMAL_CURRENCIES.has(
      normalizedCurrency,
    )
  ) {
    return 3;
  }

  return 2;
}

/**
 * Formats money using a consistent Finance Tools display convention.
 *
 * Important:
 * - The calculation value is never changed.
 * - Only the visual representation changes.
 * - INR keeps Indian grouping.
 * - EUR uses a left-side € symbol.
 * - USD uses a left-side $ symbol.
 * - GBP uses a left-side £ symbol.
 * - Other currencies follow the selected currency's
 *   familiar symbol/code and decimal convention.
 */
export function formatCurrency(
  value: number,
  currencyCode: string,
): string {
  const normalizedCurrency =
    currencyCode.toUpperCase();

  const locale = getLocale(normalizedCurrency);
  const fractionDigits =
    getFractionDigits(normalizedCurrency);

  try {
    const formatter =
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: normalizedCurrency,
        minimumFractionDigits:
          fractionDigits,
        maximumFractionDigits:
          fractionDigits,
      });

    const parts =
      formatter.formatToParts(value);

    const currencyPart = parts.find(
      (part) => part.type === "currency",
    );

    const numberParts = parts.filter(
      (part) => part.type !== "currency" &&
        part.type !== "literal",
    );

    const numberText = numberParts
      .map((part) => part.value)
      .join("");

    const currencyText =
      currencyPart?.value ??
      normalizedCurrency;

    return `${currencyText}${numberText}`;
  } catch {
    const numberText =
      new Intl.NumberFormat(locale, {
        minimumFractionDigits:
          fractionDigits,
        maximumFractionDigits:
          fractionDigits,
      }).format(value);

    return `${normalizedCurrency} ${numberText}`;
  }
}

/**
 * Compact display for charts and donut centers.
 *
 * Examples:
 * INR → ₹2.35 Cr
 * INR → ₹8.5 L
 * USD → $235.4M
 * EUR → €235.4M
 * JPY → ¥235.4M
 */
export function formatCompactCurrency(
  value: number,
  currencyCode: string,
): string {
  const normalizedCurrency =
    currencyCode.toUpperCase();

  const locale =
    getLocale(normalizedCurrency);

  const absoluteValue = Math.abs(value);

  let divisor = 1;
  let suffix = "";

  if (normalizedCurrency === "INR") {
    if (absoluteValue >= 10_000_000) {
      divisor = 10_000_000;
      suffix = "Cr";
    } else if (absoluteValue >= 100_000) {
      divisor = 100_000;
      suffix = "L";
    } else if (absoluteValue >= 1_000) {
      divisor = 1_000;
      suffix = "K";
    }
  } else {
    if (absoluteValue >= 1_000_000_000) {
      divisor = 1_000_000_000;
      suffix = "B";
    } else if (absoluteValue >= 1_000_000) {
      divisor = 1_000_000;
      suffix = "M";
    } else if (absoluteValue >= 1_000) {
      divisor = 1_000;
      suffix = "K";
    }
  }

  if (divisor === 1) {
    return formatCurrency(
      value,
      normalizedCurrency,
    );
  }

  const compactValue =
    value / divisor;

  const compactFractionDigits =
    Math.abs(compactValue) >= 100
      ? 0
      : Math.abs(compactValue) >= 10
        ? 1
        : 2;

  let formattedNumber: string;

  try {
    formattedNumber =
      new Intl.NumberFormat(locale, {
        minimumFractionDigits: 0,
        maximumFractionDigits:
          compactFractionDigits,
      }).format(compactValue);
  } catch {
    formattedNumber =
      compactValue.toFixed(
        compactFractionDigits,
      );
  }

  let currencySymbol =
    normalizedCurrency;

  try {
    const currencyPart =
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: normalizedCurrency,
        maximumFractionDigits: 0,
      })
        .formatToParts(0)
        .find(
          (part) => part.type === "currency",
        );

    currencySymbol =
      currencyPart?.value ??
      normalizedCurrency;
  } catch {
    // Keep the ISO currency code.
  }

  return `${currencySymbol}${formattedNumber}${suffix}`;
}

/**
 * Backward-compatible INR formatter.
 */
export function formatINR(
  value: number,
): string {
  return formatCurrency(value, "INR");
}