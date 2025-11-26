import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');
  const sectionId = searchParams.get('sectionId');
  const altText = searchParams.get('altText') || '';

  if (!filename || !request.body || !sectionId) {
    return NextResponse.json({ error: 'Filename, body, and sectionId are required' }, { status: 400 });
  }

  try {
    // 1. Upload to Vercel Blob (addRandomSuffix ensures unique filenames)
    const blob = await put(filename, request.body, {
      access: 'public',
      addRandomSuffix: true,
    });

    // 2. Save metadata to Database
    const image = await prisma.image.create({
      data: {
        sectionId,
        url: blob.url,
        altText,
        fileName: filename,
      },
    });

    return NextResponse.json(image);
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sectionId = searchParams.get('sectionId');

  try {
    const where = sectionId ? { sectionId, isActive: true } : { isActive: true };
    const images = await prisma.image.findMany({
      where,
      orderBy: { uploadedAt: 'desc' },
    });

    return NextResponse.json(images);
  } catch (error) {
    console.error('Fetch error:', error);
    return NextResponse.json({ error: 'Fetch failed' }, { status: 500 });
  }
}
