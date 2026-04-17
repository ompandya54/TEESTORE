import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import { cookies } from 'next/headers';

export async function POST(request) {
  try {
    // 1. Verify admin is logged in before allowing product creation
    const cookieStore = await cookies();
    const adminToken = cookieStore.get('admin_token');
    
    if (!adminToken || adminToken.value !== process.env.ADMIN_SECRET_COOKIE) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Connect DB & Parse Data
    await dbConnect();
    const data = await request.json();

    // 3. Create the product
    const newProduct = await Product.create({
      name: data.name,
      description: data.description,
      price: Number(data.price),
      sizes: data.sizes,
      colors: data.colors,
      stock: Number(data.stock),
      category: data.category,
      images: data.images ? data.images.split(',').map(url => url.trim()) : [],
    });

    return NextResponse.json({ success: true, product: newProduct }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
