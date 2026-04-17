import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Category from '@/models/Category';
import { cookies } from 'next/headers';

export async function DELETE(request, { params }) {
  const cookieStore = await cookies();
  const adminToken = cookieStore.get('admin_token');
  if (adminToken?.value !== process.env.ADMIN_SECRET_COOKIE)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  await dbConnect();
  await Category.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
