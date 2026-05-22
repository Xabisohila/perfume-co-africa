import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/payment/"],
    },
    sitemap: "https://www.perfume-co.co.za/sitemap.xml",
  };
}
