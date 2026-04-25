import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const BASE_URL = "https://teestore-ecom.vercel.app";

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "TeeStore | Premium Organic Cotton T-Shirts India",
    template: "%s | TeeStore",
  },
  description:
    "Shop premium organic cotton t-shirts online in India. TeeStore offers slim-fit, ethically manufactured, 240GSM t-shirts for men, women, kids & sports. Free shipping. Easy returns.",
  keywords: [
    // Brand
    "TeeStore", "teestore india", "teestore t-shirts",
    // Product core
    "premium t-shirts india", "organic cotton t-shirts", "best t-shirts india",
    "buy t-shirts online india", "cotton t-shirts online",
    // Category
    "mens t-shirts india", "womens t-shirts india", "kids t-shirts india",
    "sports t-shirts india", "unisex t-shirts india",
    // Quality
    "240gsm t-shirts", "premium quality t-shirts", "luxury t-shirts india",
    "slim fit t-shirts", "structured fit t-shirts",
    // Sustainability
    "ethical fashion india", "sustainable clothing india",
    "organic cotton clothing", "eco friendly t-shirts",
    // Shopping intent
    "t-shirts online shopping india", "buy cotton tshirts",
    "affordable premium tshirts", "best quality tshirts",
    // Long tail
    "premium tshirts for men india", "organic tshirts women india",
    "best fitting t-shirt india", "minimalist t-shirts india",
    "streetwear india", "basics clothing india",
  ],
  authors: [{ name: "TeeStore", url: BASE_URL }],
  creator: "TeeStore",
  publisher: "TeeStore",
  category: "fashion",
  classification: "E-commerce / Apparel",
  formatDetection: { email: false, address: false, telephone: false },
  alternates: { canonical: BASE_URL },
  openGraph: {
    title: "TeeStore | Premium Organic Cotton T-Shirts India",
    description:
      "Shop premium organic cotton t-shirts online in India. Slim-fit, ethically made, 240GSM. Men, Women, Kids & Sports categories.",
    url: BASE_URL,
    siteName: "TeeStore",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "TeeStore Premium T-Shirt Collection" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TeeStore | Premium Organic Cotton T-Shirts India",
    description: "Shop premium organic cotton t-shirts online in India. Slim-fit, ethically made, 240GSM.",
    site: "@om_h_pandya",
    creator: "@om_h_pandya",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your Google Search Console verification token here when ready
    // google: "your-google-verification-token",
  },
  other: {
    "theme-color": "#09090b",
    "color-scheme": "light dark",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "TeeStore",
  },
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "TeeStore",
      url: BASE_URL,
      logo: { "@type": "ImageObject", url: `${BASE_URL}/og-image.png` },
      sameAs: ["https://instagram.com/om_h_pandya"],
      contactPoint: {
        "@type": "ContactPoint",
        email: "ompandya54@gmail.com",
        contactType: "customer support",
        availableLanguage: ["English", "Hindi"],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "TeeStore",
      publisher: { "@id": `${BASE_URL}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: `${BASE_URL}/products?q={search_term_string}` },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Store",
      "@id": `${BASE_URL}/#store`,
      name: "TeeStore",
      url: BASE_URL,
      description: "Premium organic cotton t-shirts for men, women, kids and sports. Ethically manufactured in India.",
      priceRange: "₹₹",
      currenciesAccepted: "INR",
      paymentAccepted: "Credit Card, Debit Card, UPI, Net Banking",
      areaServed: "IN",
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-gray-50 text-gray-900">
        <CartProvider>
          <Navbar />
          <main className="flex-grow flex flex-col pt-28">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
