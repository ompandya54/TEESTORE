import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";

const BASE_URL = "https://teeestore.vercel.app/";

export default async function sitemap() {
  // Static pages
  const staticPages = [
    { url: BASE_URL,                        lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE_URL}/products`,          lastModified: new Date(), changeFrequency: "daily",   priority: 0.9 },
    { url: `${BASE_URL}/our-story`,         lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/size-guide`,        lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/contact`,           lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];

  // Dynamic product pages
  let productPages = [];
  try {
    await dbConnect();
    const products = await Product.find({}, "_id updatedAt").lean();
    productPages = products.map(p => ({
      url: `${BASE_URL}/products/${p._id.toString()}`,
      lastModified: p.updatedAt || new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  } catch {
    // DB not available during build — skip product pages
  }

  return [...staticPages, ...productPages];
}
