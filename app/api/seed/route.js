import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import Category from '@/models/Category';

const defaultCategories = [
  { name: 'Men',    slug: 'men' },
  { name: 'Women',  slug: 'women' },
  { name: 'Kids',   slug: 'kids' },
  { name: 'Sports', slug: 'sports' },
  { name: 'Unisex', slug: 'unisex' },
];

const dummyProducts = [
  {
    name: "Classic Midnight Black Tee",
    description: "Our signature black t-shirt made from 100% fine spun organic cotton. Perfect for any occasion.",
    price: 25.99,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black"],
    images: ["https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
    stock: 50,
    category: "Unisex"
  },
  {
    name: "Essential White Crewneck",
    description: "A breathable, lightweight white crewneck tee that pairs perfectly with your favorite jeans.",
    price: 22.50,
    sizes: ["S", "M", "L", "XL"],
    colors: ["White"],
    images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
    stock: 120,
    category: "Unisex"
  },
  {
    name: "Vintage Washed Indigo",
    description: "Experience the ultimate comfort with our vintage-washed indigo t-shirt. Pre-shrunk and extra soft.",
    price: 28.00,
    sizes: ["M", "L", "XL"],
    colors: ["Blue"],
    images: ["https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
    stock: 35,
    category: "Men"
  },
  {
    name: "Sunset Orange Graphic Tee",
    description: "Stand out with this vibrant sunset orange t-shirt featuring a minimal aesthetic graphic.",
    price: 30.00,
    sizes: ["S", "M", "L"],
    colors: ["Orange"],
    images: ["https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
    stock: 15,
    category: "Women"
  },
  {
    name: "Eco-Friendly Olive Green",
    description: "Made entirely from recycled materials, this olive green tee is both stylish and sustainable.",
    price: 26.99,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Green"],
    images: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
    stock: 80,
    category: "Unisex"
  }
];

export async function GET() {
  try {
    await dbConnect();

    await Product.deleteMany({});
    await Category.deleteMany({});
    await Category.insertMany(defaultCategories);
    const inserted = await Product.insertMany(dummyProducts);

    return NextResponse.json({
      message: "Database successfully seeded!",
      count: inserted.length,
      data: inserted
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
