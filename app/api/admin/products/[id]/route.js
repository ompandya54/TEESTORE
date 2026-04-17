import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import { cookies } from 'next/headers';

export async function DELETE(request, { params }) {
  try {
    // 1. Verify admin is logged in before allowing product deletion
    const cookieStore = await cookies();
    const adminToken = cookieStore.get('admin_token');
    
    if (!adminToken || adminToken.value !== process.env.ADMIN_SECRET_COOKIE) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Await params if Next.js 15+
    const resolvedParams = await params;
    const { id } = resolvedParams;

    if (!id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    // 2. Connect DB
    await dbConnect();

    // 3. Delete the product
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Product deleted" }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
