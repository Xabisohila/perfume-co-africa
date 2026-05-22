import type { Metadata } from "next";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import { CartProvider } from "@/lib/cartContext";
import CartDrawer from "@/components/CartDrawer";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.perfume-co.co.za"),
  title: {
    default: "The Perfume Co. Africa | Luxury Fragrances",
    template: "%s | The Perfume Co. Africa",
  },
  description:
    "Luxury-inspired fragrances crafted from imported oils. Scents that turn heads, spark conversations, and last all day. Premium quality — real South African value.",
  keywords: [
    "luxury perfume South Africa",
    "affordable designer fragrance SA",
    "long lasting perfume",
    "oud perfume",
    "designer dupe fragrance",
    "buy perfume online South Africa",
    "perfume delivery SA",
  ],
  authors: [{ name: "The Perfume Co. Africa" }],
  creator: "The Perfume Co. Africa",
  openGraph: {
    title: "The Perfume Co. Africa | Smell Expensive. Be Unforgettable.",
    description:
      "Luxury-inspired fragrances for those who demand attention. Premium scents without the premium price.",
    url: "https://www.perfume-co.co.za",
    siteName: "The Perfume Co. Africa",
    images: [
      {
        url: "/product.png",
        width: 1200,
        height: 630,
        alt: "The Perfume Co. Africa — Luxury Fragrances",
      },
    ],
    locale: "en_ZA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Perfume Co. Africa | Smell Expensive. Be Unforgettable.",
    description: "Premium luxury fragrances — real South African value.",
    images: ["/product.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
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
