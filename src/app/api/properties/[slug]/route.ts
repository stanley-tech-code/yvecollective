import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET - Get a single published property by slug
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const property = await prisma.property.findFirst({
      where: {
        slug: params.slug,
        isPublished: true,
      },
      include: {
        images: {
          orderBy: { sortOrder: 'asc' },
        },
        amenities: true,
      },
    });

    if (!property) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }

    // Get similar properties
    const similarProperties = await prisma.property.findMany({
      where: {
        categorySlug: property.categorySlug,
        isPublished: true,
        id: { not: property.id },
      },
      include: {
        images: {
          where: { isFeatured: true },
          take: 1,
        },
      },
      take: 3,
      orderBy: [
        { isFeatured: 'desc' },
        { createdAt: 'desc' },
      ],
    });

    return NextResponse.json({
      property,
      similarProperties,
    });
  } catch (error) {
    console.error('Fetch property error:', error);
    return NextResponse.json({ error: 'Failed to fetch property' }, { status: 500 });
  }
}
