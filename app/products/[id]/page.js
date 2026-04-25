import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import Link from "next/link";
import AddToCartForm from "@/components/AddToCartForm";
import ProductGallery from "@/components/ProductGallery";

const BASE_URL = "https://teestore-ecom.vercel.app";

export const revalidate = 3600;

async function getProduct(id) {
  await dbConnect();
  const product = await Product.findById(id).lean();
  if (!product) return null;
  return {
    ...product,
    _id: product._id.toString(),
    createdAt: product.createdAt?.toISOString(),
    updatedAt: product.updatedAt?.toISOString(),
  };
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.name} | Premium T-Shirt`,
    description: `${product.description?.slice(0, 150)} — Shop ${product.name} in sizes ${product.sizes?.join(", ")}. ₹${product.price} | Free shipping in India.`,
    keywords: [
      product.name, `${product.name} tshirt`, `buy ${product.name} india`,
      `${product.category} tshirt india`, "premium tshirt india", "organic cotton tshirt",
    ],
    alternates: { canonical: `${BASE_URL}/products/${id}` },
    openGraph: {
      title: `${product.name} | TeeStore`,
      description: product.description?.slice(0, 150),
      url: `${BASE_URL}/products/${id}`,
      images: product.images?.[0]
        ? [{ url: product.images[0], width: 800, height: 1000, alt: product.name }]
        : [{ url: "/og-image.png", width: 1200, height: 630 }],
      type: "website",
    },
    other: {
      "product:price:amount": product.price,
      "product:price:currency": "INR",
    },
  };
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams.id);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: product.name,
    description: product.description.substring(0, 160),
    openGraph: {
      title: `${product.name} | TeeStore`,
      description: product.description.substring(0, 160),
      images: [
        {
          url: product.images[0] || '/og-image.png',
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | TeeStore`,
      description: product.description.substring(0, 160),
      images: [product.images[0] || '/og-image.png'],
    },
  };
}

// NextJS 16 Dynamic Route Page
export default async function ProductDetailPage({ params }) {
  // Await params specifically required in Next 15+
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams.id);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">Product Not Found</h1>
        <Link href="/products" className="text-indigo-600 mt-4 hover:underline">
          Go back to store
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-zinc-950 min-h-[calc(100vh-4rem)]">
      <div className="pt-6 pb-16 sm:pb-24">
        <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <ol role="list" className="flex items-center space-x-4">
            <li>
              <div className="flex items-center">
                <Link href="/products" className="mr-4 text-xs font-bold tracking-widest uppercase text-zinc-500 hover:text-zinc-100 transition-colors">
                  Collection
                </Link>
                <svg viewBox="0 0 6 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="h-5 w-auto text-zinc-800">
                  <path d="M4.878 4.34H3.551L.27 16.532h1.327l3.281-12.19z" fill="currentColor" />
                </svg>
              </div>
            </li>
            <li className="text-xs font-bold tracking-widest uppercase">
              <span className="text-zinc-100">
                {product.name}
              </span>
            </li>
          </ol>
        </nav>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
            {/* Image Gallery */}
            <div className="flex flex-col-reverse">
              <ProductGallery images={product.images} productName={product.name} />

              {product.stock < 10 && product.stock > 0 && (
                <div className="mb-4">
                  <span className="bg-red-600/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 uppercase tracking-widest rounded-sm">Low Stock: {product.stock} left</span>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
              <h1 className="text-4xl font-black tracking-tighter uppercase text-zinc-100">{product.name}</h1>

              <div className="mt-3">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl text-zinc-300 font-medium">${product.price.toFixed(2)}</p>
              </div>

              <div className="mt-6 border-t border-zinc-800 pt-6">
                <h3 className="sr-only">Description</h3>
                <div className="text-base text-zinc-400 space-y-6 max-w-prose leading-relaxed">
                  <p>{product.description}</p>
                </div>
              </div>

              {/* Dynamic Add to Cart Form */}
              <AddToCartForm product={product} />

              <div className="mt-8 flex flex-col items-center p-6 border border-zinc-800 rounded-sm bg-zinc-900/30">
                <div className="flex gap-8">
                  <div className="flex flex-col items-center text-zinc-300">
                    <svg className="w-6 h-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7"></path></svg>
                    <span className="text-[10px] uppercase tracking-widest font-bold">Free Shipping</span>
                  </div>
                  <div className="flex flex-col items-center text-zinc-300">
                    <svg className="w-6 h-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                    <span className="text-[10px] uppercase tracking-widest font-bold">Secure Checkout</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
