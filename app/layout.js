import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL('https://teestore-ecom.vercel.app'), // Replace with actual domain when available
  title: {
    default: "TeeStore | Premium Organic Cotton T-Shirts",
    template: "%s | TeeStore"
  },
  description: "Experience the finest organic cotton t-shirts engineered for durability and style. Ethically manufactured, architectural silhouettes, and premium quality.",
  keywords: ["premium t-shirts", "organic cotton t-shirts", "luxury streetwear", "ethical fashion", "minimalist clothing", "TeeStore", "high-quality basics"],
  authors: [{ name: "TeeStore Team" }],
  creator: "TeeStore",
  publisher: "TeeStore",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "TeeStore | Premium Organic Cotton T-Shirts",
    description: "Shop the best premium quality organic cotton t-shirts. Architectural silhouettes meet conscious craftsmanship.",
    url: 'https://teestore-ecom.vercel.app',
    siteName: 'TeeStore',
    images: [
      {
        url: '/og-image.png', // User should add this to public/
        width: 1200,
        height: 630,
        alt: 'TeeStore Premium Collection',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "TeeStore | Premium Organic Cotton T-Shirts",
    description: "Shop the best premium quality organic cotton t-shirts. Architectural silhouettes meet conscious craftsmanship.",
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-gray-50 text-gray-900">
        <CartProvider>
          <Navbar />
          <main className="flex-grow flex flex-col pt-28">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
