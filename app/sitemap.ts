import { MetadataRoute } from "next";

const BASE = "https://www.perfume-co.co.za";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE,
      lastModified: new Date("2026-05-24"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE}/the-perfume-co-africa`,
      lastModified: new Date("2026-05-27"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
}
