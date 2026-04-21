import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import Link from "next/link";
import ProductCatalog from "@/components/ProductCatalog";

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
