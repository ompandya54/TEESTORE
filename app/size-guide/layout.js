export const metadata = {
  title: "Size Guide | Find Your Perfect T-Shirt Fit",
  description:
    "TeeStore size guide — chest, waist, length and shoulder measurements for S to XXL. CM and inch charts. How to measure yourself for the perfect fit.",
  keywords: [
    "tshirt size guide india", "tshirt size chart india", "how to measure tshirt size",
    "mens tshirt size guide", "womens tshirt size chart", "tshirt fit guide",
    "S M L XL XXL tshirt measurements", "tshirt chest measurement",
  ],
  alternates: { canonical: "https://teeestore.vercel.app//size-guide" },
  openGraph: {
    title: "Size Guide | TeeStore",
    description: "Find your perfect fit. Chest, waist, length & shoulder measurements for S–XXL in CM and inches.",
    url: "https://teeestore.vercel.app//size-guide",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function SizeGuideLayout({ children }) {
  return children;
}
