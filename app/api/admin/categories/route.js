import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Category from '@/models/Category';
import { cookies } from 'next/headers';

async function verifyAdmin() {
  const cookieStore = await cookies();
  const adminToken = cookieStore.get('admin_token');
  return adminToken?.value === process.env.ADMIN_SECRET_COOKIE;
}

export async function GET() {
  await dbConnect();
  const categories = await Category.find({}).sort({ name: 1 }).lean();
  return NextResponse.json(categories.map(c => ({ ...c, _id: c._id.toString() })));
}

export async function POST(request) {
  if (!(await verifyAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { name } = await request.json();
  if (!name?.trim()) return NextResponse.json({ error: 'Name is required' }, { status: 400 });

  await dbConnect();
  const slug = name.trim().toLowerCase().replace(/\s+/g, '-');

  try {
    const category = await Category.create({ name: name.trim(), slug });
    return NextResponse.json({ ...category.toObject(), _id: category._id.toString() }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: 'Category already exists' }, { status: 400 });
  }
}
