import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import HeroSection from "@/components/HeroSection";
import FeatureSection from "@/components/FeatureSection";
import StackedShowcase from "@/components/StackedShowcase";
import LatestArrivals from "@/components/LatestArrivals";
import Link from "next/link";

export const dynamic = 'force-dynamic';

async function getLatestProducts() {
  try {
    await dbConnect();
    const products = await Product.find({})
      .sort({ createdAt: -1 })
      .limit(4)
      .lean();
    
    return products.map(p => ({
      ...p,
      _id: p._id.toString(),
      createdAt: p.createdAt?.toISOString(),
      updatedAt: p.updatedAt?.toISOString()
    }));
  } catch (error) {
    console.error("Failed to fetch latest products:", error);
    return [];
  }
}

export default async function Home() {
  const latestProducts = await getLatestProducts();

  return (
    <div className="bg-white">
      {/* 🚀 Artistic Hero Section */}
      <HeroSection />

      {/* 🏛️ Philosophy & Craftsmanship Section */}
      <FeatureSection />

      {/* 🎰 The Stacking Vault (Pinned Cards) */}
      <StackedShowcase products={latestProducts} />

      {/* 📦 Latest Arrivals Showcase */}
      <LatestArrivals products={latestProducts} />

      {/* 🎨 Call to Action Banner (Luxury Style) */}
      <section className="py-32 bg-zinc-50 border-y border-zinc-100 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] select-none pointer-events-none -skew-y-12">
           <div className="text-[20vw] font-black text-black leading-none">ARCHIVE ARCHIVE ARCHIVE</div>
           <div className="text-[20vw] font-black text-black leading-none">COLLECTION COLLECTION</div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase italic text-zinc-950 mb-12 leading-none">
            Your Digital <br />
            <span className="text-zinc-300">Skin Awaits.</span>
          </h2>
          <Link 
            href="/products" 
            className="inline-block px-12 py-6 bg-zinc-950 text-white text-xs font-black uppercase tracking-[0.3em] hover:bg-black transition-all hover:scale-105 shadow-2xl"
          >
            Enter the Showroom
          </Link>
        </div>
      </section>
    </div>
  );
}
