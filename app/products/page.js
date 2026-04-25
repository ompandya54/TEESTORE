import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import Link from "next/link";
import ProductCatalog from "@/components/ProductCatalog";

export const metadata = {
  title: "Premium T-Shirts Collection | Shop Online India",
  description:
    "Explore TeeStore's complete archive of premium organic cotton t-shirts. Shop men's, women's, kids' and sports t-shirts online in India. Filter by size, color & category.",
  keywords: [
    "buy t-shirts online india", "premium t-shirts collection",
    "mens t-shirts online", "womens t-shirts online", "kids t-shirts online",
    "sports t-shirts india", "organic cotton tshirts shop",
    "slim fit tshirts india", "best tshirts india 2026",
  ],
  alternates: { canonical: "https://teestore-ecom.vercel.app/products" },
  openGraph: {
    title: "Shop All T-Shirts | TeeStore India",
    description: "Browse our complete archive of premium organic cotton t-shirts. Men, Women, Kids & Sports.",
    url: "https://teestore-ecom.vercel.app/products",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

// Force dynamic rendering since products might change
export const revalidate = 600; // Revalidate every 10 minutes

async function getProducts() {
  await dbConnect();
  // Fetch all products, lean() returns plain JS objects instead of Mongoose Docs
  const products = await Product.find({}).lean();

  // Convert MongoDB ObjectIds to strings so they can be passed to Client Components safely
  return products.map(product => ({
    ...product,
    _id: product._id.toString(),
    createdAt: product.createdAt?.toISOString(),
    updatedAt: product.updatedAt?.toISOString()
  }));
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <ProductCatalog initialProducts={products} />
  );
}
