export type Currency = {
  code: string;
  name: string;
  symbol: string;
  searchTerms: string[];
};

const currencyCodes = [
  "AED",
  "AFN",
  "ALL",
  "AMD",
  "ANG",
  "AOA",
  "ARS",
  "AUD",
  "AWG",
  "AZN",
  "BAM",
  "BBD",
  "BDT",
  "BGN",
  "BHD",
  "BIF",
  "BMD",
  "BND",
  "BOB",
  "BRL",
  "BSD",
  "BTN",
  "BWP",
  "BYN",
  "BZD",
  "CAD",
  "CDF",
  "CHF",
  "CLP",
  "CNY",
  "COP",
  "CRC",
  "CUP",
  "CVE",
  "CZK",
  "DJF",
  "DKK",
  "DOP",
  "DZD",
  "EGP",
  "ERN",
  "ETB",
  "EUR",
  "FJD",
  "FKP",
  "GBP",
  "GEL",
  "GHS",
  "GIP",
  "GMD",
  "GNF",
  "GTQ",
  "GYD",
  "HKD",
  "HNL",
  "HTG",
  "HUF",
  "IDR",
  "ILS",
  "INR",
  "IQD",
  "IRR",
  "ISK",
  "JMD",
  "JOD",
  "JPY",
  "KES",
  "KGS",
  "KHR",
  "KMF",
  "KPW",
  "KRW",
  "KWD",
  "KYD",
  "KZT",
  "LAK",
  "LBP",
  "LKR",
  "LRD",
  "LSL",
  "LYD",
  "MAD",
  "MDL",
  "MGA",
  "MKD",
  "MMK",
  "MNT",
  "MOP",
  "MRU",
  "MUR",
  "MVR",
  "MWK",
  "MXN",
  "MYR",
  "MZN",
  "NAD",
  "NGN",
  "NIO",
  "NOK",
  "NPR",
  "NZD",
  "OMR",
  "PAB",
  "PEN",
  "PGK",
  "PHP",
  "PKR",
  "PLN",
  "PYG",
  "QAR",
  "RON",
  "RSD",
  "RUB",
  "RWF",
  "SAR",
  "SBD",
  "SCR",
  "SDG",
  "SEK",
  "SGD",
  "SHP",
  "SLE",
  "SOS",
  "SRD",
  "SSP",
  "STN",
  "SVC",
  "SYP",
  "SZL",
  "THB",
  "TJS",
  "TMT",
  "TND",
  "TOP",
  "TRY",
  "TTD",
  "TWD",
  "TZS",
  "UAH",
  "UGX",
  "USD",
  "UYU",
  "UZS",
  "VED",
  "VES",
  "VND",
  "VUV",
  "WST",
  "XAF",
  "XCD",
  "XOF",
  "XPF",
  "YER",
  "ZAR",
  "ZMW",
  "ZWL",
] as const;

/*
 * Search aliases make the currency picker more useful.
 *
 * Users can search by:
 * - currency code
 * - currency name
 * - symbol
 * - country name
 * - common country abbreviations
 */
const currencySearchAliases: Record<string, string[]> = {
  AED: [
    "United Arab Emirates",
    "UAE",
    "Emirates",
    "Arab Emirates",
    "Dirham",
  ],

  AFN: [
    "Afghanistan",
    "Afghan",
    "Afghani",
  ],

  ALL: [
    "Albania",
    "Albanian",
    "Lek",
  ],

  AMD: [
    "Armenia",
    "Armenian",
    "Dram",
  ],

  ARS: [
    "Argentina",
    "Argentine",
    "Peso",
  ],

  AUD: [
    "Australia",
    "Australian",
    "Australian Dollar",
  ],

  AZN: [
    "Azerbaijan",
    "Azerbaijani",
    "Manat",
  ],

  BDT: [
    "Bangladesh",
    "Bangladeshi",
    "Taka",
  ],

  BGN: [
    "Bulgaria",
    "Bulgarian",
    "Lev",
  ],

  BHD: [
    "Bahrain",
    "Bahraini",
    "Dinar",
  ],

  BRL: [
    "Brazil",
    "Brazilian",
    "Real",
  ],

  CAD: [
    "Canada",
    "Canadian",
    "Canadian Dollar",
  ],

  CHF: [
    "Switzerland",
    "Swiss",
    "Swiss Franc",
  ],

  CLP: [
    "Chile",
    "Chilean",
    "Peso",
  ],

  CNY: [
    "China",
    "Chinese",
    "Yuan",
    "Renminbi",
    "RMB",
  ],

  COP: [
    "Colombia",
    "Colombian",
    "Peso",
  ],

  CZK: [
    "Czech Republic",
    "Czechia",
    "Czech",
    "Koruna",
  ],

  DKK: [
    "Denmark",
    "Danish",
    "Krone",
  ],

  DZD: [
    "Algeria",
    "Algerian",
    "Dinar",
  ],

  EGP: [
    "Egypt",
    "Egyptian",
    "Pound",
  ],

  ETB: [
    "Ethiopia",
    "Ethiopian",
    "Birr",
  ],

  EUR: [
    "Euro",
    "Eurozone",
    "European Union",
    "Germany",
    "France",
    "Italy",
    "Spain",
    "Portugal",
    "Ireland",
    "Netherlands",
    "Belgium",
    "Austria",
    "Finland",
    "Greece",
    "Croatia",
    "Slovakia",
    "Slovenia",
    "Estonia",
    "Latvia",
    "Lithuania",
    "Luxembourg",
    "Malta",
    "Cyprus",
  ],

  FJD: [
    "Fiji",
    "Fijian",
    "Dollar",
  ],

  GBP: [
    "United Kingdom",
    "UK",
    "Britain",
    "British",
    "England",
    "Scotland",
    "Wales",
    "Northern Ireland",
    "Pound",
    "Pound Sterling",
  ],

  GEL: [
    "Georgia",
    "Georgian",
    "Lari",
  ],

  GHS: [
    "Ghana",
    "Ghanaian",
    "Cedi",
  ],

  HKD: [
    "Hong Kong",
    "Hong Kong Dollar",
  ],

  HUF: [
    "Hungary",
    "Hungarian",
    "Forint",
  ],

  IDR: [
    "Indonesia",
    "Indonesian",
    "Rupiah",
  ],

  ILS: [
    "Israel",
    "Israeli",
    "Shekel",
    "Sheqel",
  ],

  INR: [
    "India",
    "Indian",
    "Indian Rupee",
    "Rupee",
    "Bharat",
  ],

  IQD: [
    "Iraq",
    "Iraqi",
    "Dinar",
  ],

  IRR: [
    "Iran",
    "Iranian",
    "Rial",
  ],

  ISK: [
    "Iceland",
    "Icelandic",
    "Krona",
    "Króna",
  ],

  JMD: [
    "Jamaica",
    "Jamaican",
    "Dollar",
  ],

  JOD: [
    "Jordan",
    "Jordanian",
    "Dinar",
  ],

  JPY: [
    "Japan",
    "Japanese",
    "Yen",
  ],

  KES: [
    "Kenya",
    "Kenyan",
    "Shilling",
  ],

  KHR: [
    "Cambodia",
    "Cambodian",
    "Riel",
  ],

  KRW: [
    "South Korea",
    "Korea",
    "Korean",
    "Won",
  ],

  KWD: [
    "Kuwait",
    "Kuwaiti",
    "Dinar",
  ],

  KZT: [
    "Kazakhstan",
    "Kazakh",
    "Tenge",
  ],

  LAK: [
    "Laos",
    "Lao",
    "Kip",
  ],

  LKR: [
    "Sri Lanka",
    "Sri Lankan",
    "Rupee",
  ],

  MAD: [
    "Morocco",
    "Moroccan",
    "Dirham",
  ],

  MMK: [
    "Myanmar",
    "Burmese",
    "Kyat",
  ],

  MNT: [
    "Mongolia",
    "Mongolian",
    "Tugrik",
    "Tögrög",
  ],

  MUR: [
    "Mauritius",
    "Mauritian",
    "Rupee",
  ],

  MVR: [
    "Maldives",
    "Maldivian",
    "Rufiyaa",
  ],

  MXN: [
    "Mexico",
    "Mexican",
    "Peso",
  ],

  MYR: [
    "Malaysia",
    "Malaysian",
    "Ringgit",
  ],

  NGN: [
    "Nigeria",
    "Nigerian",
    "Naira",
  ],

  NOK: [
    "Norway",
    "Norwegian",
    "Krone",
  ],

  NPR: [
    "Nepal",
    "Nepalese",
    "Nepali",
    "Rupee",
  ],

  NZD: [
    "New Zealand",
    "New Zealand Dollar",
  ],

  OMR: [
    "Oman",
    "Omani",
    "Rial",
  ],

  PEN: [
    "Peru",
    "Peruvian",
    "Sol",
  ],

  PHP: [
    "Philippines",
    "Filipino",
    "Peso",
  ],

  PKR: [
    "Pakistan",
    "Pakistani",
    "Rupee",
  ],

  PLN: [
    "Poland",
    "Polish",
    "Zloty",
    "Złoty",
  ],

  QAR: [
    "Qatar",
    "Qatari",
    "Riyal",
  ],

  RON: [
    "Romania",
    "Romanian",
    "Leu",
  ],

  RUB: [
    "Russia",
    "Russian",
    "Ruble",
    "Rouble",
  ],

  SAR: [
    "Saudi Arabia",
    "Saudi",
    "Saudi Arabian",
    "Riyal",
  ],

  SEK: [
    "Sweden",
    "Swedish",
    "Krona",
  ],

  SGD: [
    "Singapore",
    "Singaporean",
    "Singapore Dollar",
  ],

  THB: [
    "Thailand",
    "Thai",
    "Baht",
  ],

  TRY: [
    "Turkey",
    "Türkiye",
    "Turkish",
    "Lira",
  ],

  TWD: [
    "Taiwan",
    "Taiwanese",
    "New Taiwan Dollar",
  ],

  UAH: [
    "Ukraine",
    "Ukrainian",
    "Hryvnia",
  ],

  UGX: [
    "Uganda",
    "Ugandan",
    "Shilling",
  ],

  USD: [
    "United States",
    "USA",
    "US",
    "America",
    "American",
    "United States Dollar",
    "Dollar",
  ],

  UYU: [
    "Uruguay",
    "Uruguayan",
    "Peso",
  ],

  UZS: [
    "Uzbekistan",
    "Uzbek",
    "Som",
    "Sum",
  ],

  VND: [
    "Vietnam",
    "Vietnamese",
    "Dong",
  ],

  ZAR: [
    "South Africa",
    "South African",
    "Rand",
  ],

  ZMW: [
    "Zambia",
    "Zambian",
    "Kwacha",
  ],
};

const displayNames =
  typeof Intl !== "undefined" && "DisplayNames" in Intl
    ? new Intl.DisplayNames(["en"], {
        type: "currency",
      })
    : null;

export const currencies: Currency[] = currencyCodes
  .map((code) => {
    const name = displayNames?.of(code) ?? code;

    let symbol: string = code;

    try {
      symbol =
        new Intl.NumberFormat("en", {
          style: "currency",
          currency: code,
          currencyDisplay: "narrowSymbol",
        })
          .formatToParts(0)
          .find((part) => part.type === "currency")
          ?.value ?? code;
    } catch {
      symbol = code;
    }

    return {
      code,
      name,
      symbol,
      searchTerms: [
        code,
        name,
        symbol,
        ...(currencySearchAliases[code] ?? []),
      ],
    };
  })
  .filter((currency) => currency.name !== currency.code);

export const currencyMap = new Map(
  currencies.map((currency) => [
    currency.code,
    currency,
  ]),
);

export function getCurrency(code: string): Currency {
  return (
    currencyMap.get(code.toUpperCase()) ??
    currencyMap.get("INR")!
  );
}