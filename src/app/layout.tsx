import type { Metadata } from "next";
import "./globals.css";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Finance Tools",
  description:
    "Simple finance calculators for savings, investments, deposits, and everyday financial calculations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900">
        <SiteHeader />

        {children}

        <SiteFooter />
      </body>
    </html>
  );
}