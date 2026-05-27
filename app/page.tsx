import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhyLoveIt from "@/components/WhyLoveIt";
import FeaturedPerfumes from "@/components/FeaturedPerfumes";
import SocialProof from "@/components/SocialProof";
import LuxuryExperience from "@/components/LuxuryExperience";
import Scarcity from "@/components/Scarcity";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import StickyMobileCTA from "@/components/StickyMobileCTA";

const BASE = "https://www.perfume-co.co.za";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${BASE}/#organization`,
  name: "The Perfume Co. Africa",
  url: BASE,
  logo: { "@type": "ImageObject", url: `${BASE}/product.png` },
  description:
    "South Africa's premier luxury fragrance brand. Designer-inspired perfumes crafted from imported oils.",
  telephone: "+27640713844",
  address: { "@type": "PostalAddress", addressCountry: "ZA" },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+27640713844",
    contactType: "customer service",
    availableLanguage: "English",
    areaServed: "ZA",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE}/#website`,
  url: BASE,
  name: "The Perfume Co. Africa",
  description:
    "Luxury designer-inspired fragrances for South Africa. Long-lasting premium perfumes from imported oils.",
  publisher: { "@id": `${BASE}/#organization` },
};

const productListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Luxury Fragrance Collection — The Perfume Co. Africa",
  description:
    "Premium designer-inspired perfumes for men and women in South Africa. From R299 with free delivery on 3+ bottles.",
  url: `${BASE}/#collection`,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Product",
        name: "Vanilla Ray",
        image: `${BASE}/product.png`,
        description:
          "Madagascar vanilla, warm sandalwood, and amber. A long-lasting luxury unisex fragrance that commands compliments all day.",
        brand: { "@type": "Brand", name: "The Perfume Co. Africa" },
        sku: "TPC-VANILLA-RAY",
        offers: {
          "@type": "Offer",
          price: "299",
          priceCurrency: "ZAR",
          availability: "https://schema.org/InStock",
          url: `${BASE}/#collection`,
          seller: { "@type": "Organization", name: "The Perfume Co. Africa" },
          shippingDetails: {
            "@type": "OfferShippingDetails",
            shippingRate: { "@type": "MonetaryAmount", value: "90", currency: "ZAR" },
            shippingDestination: { "@type": "DefinedRegion", addressCountry: "ZA" },
            deliveryTime: {
              "@type": "ShippingDeliveryTime",
              handlingTime: { "@type": "QuantitativeValue", minValue: 1, maxValue: 2, unitCode: "DAY" },
              transitTime: { "@type": "QuantitativeValue", minValue: 2, maxValue: 5, unitCode: "DAY" },
            },
          },
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "312",
          bestRating: "5",
          worstRating: "1",
        },
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Product",
        name: "Midnight Oud",
        image: `${BASE}/product.png`,
        description:
          "Pure Arabian oud, smoked leather, and dark patchouli. A commanding masculine luxury fragrance for the man who leaves a lasting impression.",
        brand: { "@type": "Brand", name: "The Perfume Co. Africa" },
        sku: "TPC-MIDNIGHT-OUD",
        offers: {
          "@type": "Offer",
          price: "299",
          priceCurrency: "ZAR",
          availability: "https://schema.org/InStock",
          url: `${BASE}/#collection`,
          seller: { "@type": "Organization", name: "The Perfume Co. Africa" },
          shippingDetails: {
            "@type": "OfferShippingDetails",
            shippingRate: { "@type": "MonetaryAmount", value: "90", currency: "ZAR" },
            shippingDestination: { "@type": "DefinedRegion", addressCountry: "ZA" },
            deliveryTime: {
              "@type": "ShippingDeliveryTime",
              handlingTime: { "@type": "QuantitativeValue", minValue: 1, maxValue: 2, unitCode: "DAY" },
              transitTime: { "@type": "QuantitativeValue", minValue: 2, maxValue: 5, unitCode: "DAY" },
            },
          },
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          reviewCount: "198",
          bestRating: "5",
          worstRating: "1",
        },
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "Product",
        name: "Royal Amber",
        image: `${BASE}/product.png`,
        description:
          "Liquid gold. A regal amber heart with rose absolute and white musk — a timeless unisex luxury fragrance for every occasion.",
        brand: { "@type": "Brand", name: "The Perfume Co. Africa" },
        sku: "TPC-ROYAL-AMBER",
        offers: {
          "@type": "Offer",
          price: "299",
          priceCurrency: "ZAR",
          availability: "https://schema.org/InStock",
          url: `${BASE}/#collection`,
          seller: { "@type": "Organization", name: "The Perfume Co. Africa" },
          shippingDetails: {
            "@type": "OfferShippingDetails",
            shippingRate: { "@type": "MonetaryAmount", value: "90", currency: "ZAR" },
            shippingDestination: { "@type": "DefinedRegion", addressCountry: "ZA" },
            deliveryTime: {
              "@type": "ShippingDeliveryTime",
              handlingTime: { "@type": "QuantitativeValue", minValue: 1, maxValue: 2, unitCode: "DAY" },
              transitTime: { "@type": "QuantitativeValue", minValue: 2, maxValue: 5, unitCode: "DAY" },
            },
          },
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "247",
          bestRating: "5",
          worstRating: "1",
        },
      },
    },
    {
      "@type": "ListItem",
      position: 4,
      item: {
        "@type": "Product",
        name: "Noir Intense",
        image: `${BASE}/product.png`,
        description:
          "Bergamot and black pepper open into a magnetic woody cedar base. A bold, unapologetic fragrance for the confident woman.",
        brand: { "@type": "Brand", name: "The Perfume Co. Africa" },
        sku: "TPC-NOIR-INTENSE",
        offers: {
          "@type": "Offer",
          price: "299",
          priceCurrency: "ZAR",
          availability: "https://schema.org/InStock",
          url: `${BASE}/#collection`,
          seller: { "@type": "Organization", name: "The Perfume Co. Africa" },
          shippingDetails: {
            "@type": "OfferShippingDetails",
            shippingRate: { "@type": "MonetaryAmount", value: "90", currency: "ZAR" },
            shippingDestination: { "@type": "DefinedRegion", addressCountry: "ZA" },
            deliveryTime: {
              "@type": "ShippingDeliveryTime",
              handlingTime: { "@type": "QuantitativeValue", minValue: 1, maxValue: 2, unitCode: "DAY" },
              transitTime: { "@type": "QuantitativeValue", minValue: 2, maxValue: 5, unitCode: "DAY" },
            },
          },
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.7",
          reviewCount: "163",
          bestRating: "5",
          worstRating: "1",
        },
      },
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How long does the fragrance last?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our fragrances are formulated with premium imported oils for exceptional longevity. Most customers report 8–12 hours of noticeable scent on skin, with fabric holding the fragrance even longer.",
      },
    },
    {
      "@type": "Question",
      name: "Are these designer-inspired fragrances?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — our perfumes are crafted to evoke the essence of world-class designer fragrances using premium imported fragrance oils. We don't copy or counterfeit — we interpret and create our own unique compositions inspired by global luxury trends.",
      },
    },
    {
      "@type": "Question",
      name: "How long does delivery take in South Africa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Major cities (Cape Town, Johannesburg, Durban, Pretoria): 2–3 business days. Other South African provinces: 3–5 business days. You'll receive a tracking number via WhatsApp as soon as your order ships.",
      },
    },
    {
      "@type": "Question",
      name: "What is your refund policy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We stand behind every bottle. If you receive a damaged or incorrect item, we replace it immediately at no cost. For first-time buyers, we offer a 7-day satisfaction guarantee — if it's not what you expected, reach out on WhatsApp.",
      },
    },
    {
      "@type": "Question",
      name: "Are the fragrances unisex?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Several of our fragrances are perfectly unisex — Vanilla Ray and Royal Amber especially. Midnight Oud leans masculine while Noir Intense is loved by all genders. Ultimately wear what makes you feel powerful.",
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            organizationSchema,
            websiteSchema,
            productListSchema,
            faqSchema,
          ]),
        }}
      />
      <main className="relative">
        <Navbar />
        <Hero />
        <WhyLoveIt />
        <FeaturedPerfumes />
        <SocialProof />
        <LuxuryExperience />
        <Scarcity />
        <FAQ />
        <FinalCTA />
        <StickyMobileCTA />
      </main>
    </>
  );
}
