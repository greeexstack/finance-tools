import type { MetadataRoute } from "next";

const siteUrl = "https://finance-tools-ten-omega.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/fd-calculator`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/rd-calculator`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/pf-calculator`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/swp-calculator`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/currency-converter`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];
}