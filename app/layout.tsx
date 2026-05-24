import type { Metadata } from "next";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import { CartProvider } from "@/lib/cartContext";
import CartDrawer from "@/components/CartDrawer";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.perfume-co.co.za"),
  title: {
    default: "The Perfume Co. Africa | Luxury Fragrances South Africa",
    template: "%s | The Perfume Co. Africa",
  },
  description:
    "Shop luxury designer-inspired fragrances in South Africa. Long-lasting premium perfumes for men and women crafted from imported oils. Free delivery on 3+ bottles. From R299.",
  keywords: [
    "luxury perfume South Africa",
    "buy perfume online South Africa",
    "designer inspired fragrances South Africa",
    "long lasting perfume South Africa",
    "affordable luxury perfume SA",
    "oud perfume South Africa",
    "premium fragrance collection South Africa",
    "niche perfume South Africa",
    "inspired perfumes South Africa",
    "perfume delivery South Africa",
    "luxury scents for men South Africa",
    "luxury scents for women South Africa",
    "The Perfume Co Africa",
  ],
  authors: [{ name: "The Perfume Co. Africa" }],
  creator: "The Perfume Co. Africa",
  alternates: {
    canonical: "https://www.perfume-co.co.za",
  },
  openGraph: {
    title: "The Perfume Co. Africa | Luxury Fragrances South Africa",
    description:
      "Designer-inspired luxury fragrances for South Africa. Long-lasting premium scents from R299. Free delivery on 3+ bottles.",
    url: "https://www.perfume-co.co.za",
    siteName: "The Perfume Co. Africa",
    images: [
      {
        url: "/product.png",
        width: 1200,
        height: 630,
        alt: "The Perfume Co. Africa — Luxury Fragrances South Africa",
      },
    ],
    locale: "en_ZA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Perfume Co. Africa | Luxury Fragrances South Africa",
    description: "Designer-inspired luxury fragrances from R299. Free delivery on 3+ bottles.",
    images: ["/product.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,600&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-luxury font-inter antialiased" suppressHydrationWarning>
        <CartProvider>
          <LenisProvider>{children}</LenisProvider>
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
