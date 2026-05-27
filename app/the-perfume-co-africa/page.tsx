import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import FeaturedPerfumes from "@/components/FeaturedPerfumes";
import FAQ from "@/components/FAQ";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { BrandHero, TickerStrip, TrustPillars, Reviews, BrandCTA } from "./Sections";

const BASE = "https://www.perfume-co.co.za";

export const metadata: Metadata = {
  title: "The Perfume Co Africa | Luxury Designer Fragrances South Africa",
  description:
    "The Perfume Co Africa crafts premium designer-inspired fragrances using imported oils. Shop The Perfume Co Africa's full collection — long-lasting luxury scents from R299 with free nationwide delivery.",
  keywords: [
    "The Perfume Co Africa",
    "the perfume co africa",
    "The Perfume Co. Africa",
    "perfume co africa",
    "perfume co africa fragrances",
    "luxury perfume South Africa",
    "designer inspired fragrances South Africa",
    "buy perfume online South Africa",
    "long lasting perfume South Africa",
    "affordable luxury perfume South Africa",
  ],
  alternates: {
    canonical: `${BASE}/the-perfume-co-africa`,
  },
  openGraph: {
    title: "The Perfume Co Africa | Luxury Designer Fragrances",
    description:
      "The Perfume Co Africa — premium designer-inspired scents crafted from imported oils. From R299 with free delivery across South Africa.",
    url: `${BASE}/the-perfume-co-africa`,
    siteName: "The Perfume Co. Africa",
    images: [
      {
        url: `${BASE}/product.jpg`,
        width: 1200,
        height: 630,
        alt: "The Perfume Co Africa — Luxury Fragrances South Africa",
      },
    ],
    locale: "en_ZA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Perfume Co Africa | Luxury Designer Fragrances",
    description:
      "The Perfume Co Africa — premium scents from R299. Free delivery across South Africa.",
    images: [`${BASE}/product.jpg`],
  },
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${BASE}/the-perfume-co-africa`,
  url: `${BASE}/the-perfume-co-africa`,
  name: "The Perfume Co Africa | Luxury Designer Fragrances South Africa",
  description:
    "The Perfume Co Africa crafts premium designer-inspired fragrances using imported oils. Shop The Perfume Co Africa's collection — scents from R299 with free nationwide delivery.",
  isPartOf: { "@id": `${BASE}/#website` },
  about: { "@id": `${BASE}/#organization` },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: BASE },
    {
      "@type": "ListItem",
      position: 2,
      name: "The Perfume Co Africa",
      item: `${BASE}/the-perfume-co-africa`,
    },
  ],
};

const productSchemas = [
  {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Inspired by One Million — The Perfume Co Africa",
    image: `${BASE}/product.jpg`,
    description:
      "Warm grapefruit, cinnamon, and leathery amber. A long-lasting luxury fragrance by The Perfume Co Africa — the scent that turns heads and opens doors.",
    brand: { "@type": "Brand", name: "The Perfume Co Africa" },
    sku: "TPC-ONE-MILLION",
    offers: {
      "@type": "Offer",
      price: "299",
      priceCurrency: "ZAR",
      availability: "https://schema.org/InStock",
      url: `${BASE}/the-perfume-co-africa#collection`,
      seller: { "@type": "Organization", name: "The Perfume Co Africa" },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "312",
      bestRating: "5",
      worstRating: "1",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Inspired by Armani Black Oud — The Perfume Co Africa",
    image: `${BASE}/product 2.png`,
    description:
      "Pure Arabian oud, smoked leather, and dark patchouli. A commanding luxury fragrance for those who leave a mark. By The Perfume Co Africa.",
    brand: { "@type": "Brand", name: "The Perfume Co Africa" },
    sku: "TPC-BLACK-OUD",
    offers: {
      "@type": "Offer",
      price: "299",
      priceCurrency: "ZAR",
      availability: "https://schema.org/InStock",
      url: `${BASE}/the-perfume-co-africa#collection`,
      seller: { "@type": "Organization", name: "The Perfume Co Africa" },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "198",
      bestRating: "5",
      worstRating: "1",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Inspired by Boss Orange — The Perfume Co Africa",
    image: `${BASE}/product.jpg`,
    description:
      "Orange blossom, peach, and sun-warmed woods. A radiant unisex aura for those who live in full colour. By The Perfume Co Africa.",
    brand: { "@type": "Brand", name: "The Perfume Co Africa" },
    sku: "TPC-BOSS-ORANGE",
    offers: {
      "@type": "Offer",
      price: "299",
      priceCurrency: "ZAR",
      availability: "https://schema.org/InStock",
      url: `${BASE}/the-perfume-co-africa#collection`,
      seller: { "@type": "Organization", name: "The Perfume Co Africa" },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "247",
      bestRating: "5",
      worstRating: "1",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Inspired by Gucci Oud — The Perfume Co Africa",
    image: `${BASE}/product 2.png`,
    description:
      "Rose, iris, and rich oud in perfect balance. A fragrance that carries the weight of pure elegance. By The Perfume Co Africa.",
    brand: { "@type": "Brand", name: "The Perfume Co Africa" },
    sku: "TPC-GUCCI-OUD",
    offers: {
      "@type": "Offer",
      price: "299",
      priceCurrency: "ZAR",
      availability: "https://schema.org/InStock",
      url: `${BASE}/the-perfume-co-africa#collection`,
      seller: { "@type": "Organization", name: "The Perfume Co Africa" },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.7",
      reviewCount: "163",
      bestRating: "5",
      worstRating: "1",
    },
  },
];

export default function ThePerfumeCoAfricaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            webPageSchema,
            breadcrumbSchema,
            ...productSchemas,
          ]),
        }}
      />
      <main className="relative">
        <Navbar />
        <BrandHero />
        <TickerStrip />
        <FeaturedPerfumes />
        <TrustPillars />
        <Reviews />
        <FAQ />
        <BrandCTA />
        <StickyMobileCTA />
      </main>
    </>
  );
}
