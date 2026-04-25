export const metadata = {
  title: "Contact Us | TeeStore Support",
  description:
    "Get in touch with TeeStore. Order issues, size questions, returns, wholesale enquiries — we reply to every message within 24 hours.",
  keywords: [
    "teestore contact", "teestore support", "tshirt store contact india",
    "teestore email", "teestore instagram", "order help teestore",
    "tshirt return india", "tshirt exchange india",
  ],
  alternates: { canonical: "https://teestore-ecom.vercel.app/contact" },
  openGraph: {
    title: "Contact Us | TeeStore",
    description: "Order issues, size questions, returns — we reply to every message within 24 hours.",
    url: "https://teestore-ecom.vercel.app/contact",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function ContactLayout({ children }) {
  return children;
}
