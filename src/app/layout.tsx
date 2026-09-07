import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const siteUrl = "https://finance-tools-ten-omega.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Finance Tools",
    template: "%s | Finance Tools",
  },

  description:
    "Simple, fast, and practical finance calculators for savings, investments, deposits, withdrawals, currency conversion, and everyday financial planning.",

  applicationName: "Finance Tools",

  authors: [
    {
      name: "Finance Tools",
    },
  ],

  creator: "Finance Tools",

  publisher: "Finance Tools",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Finance Tools",
    title: "Finance Tools",
    description:
      "Simple, fast, and practical finance calculators for everyday financial planning.",
  },

  twitter: {
    card: "summary",
    title: "Finance Tools",
    description:
      "Simple, fast, and practical finance calculators for everyday financial planning.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <SiteHeader />

        {children}

        <SiteFooter />

        <Analytics />
      </body>
    </html>
  );
}