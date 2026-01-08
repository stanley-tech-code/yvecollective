import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET - List published properties (public)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const search = searchParams.get('search');
  const sortBy = searchParams.get('sort') || 'featured';
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const guests = searchParams.get('guests');
  const propertyType = searchParams.get('type');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '12');

  try {
    const where: Record<string, unknown> = {
      isPublished: true,
    };

    if (category) {
      where.categorySlug = category;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { city: { contains: search, mode: 'insensitive' } },
        { country: { contains: search, mode: 'insensitive' } },
        { tagline: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (minPrice || maxPrice) {
      where.nightlyRate = {};
      if (minPrice) {
        (where.nightlyRate as Record<string, number>).gte = parseFloat(minPrice);
      }
      if (maxPrice) {
        (where.nightlyRate as Record<string, number>).lte = parseFloat(maxPrice);
      }
    }

    if (guests) {
      where.maxGuests = { gte: parseInt(guests) };
    }

    if (propertyType) {
      where.propertyType = propertyType;
    }

    // Determine sort order
    let orderBy: Record<string, string>[] = [];
    switch (sortBy) {
      case 'price-low':
        orderBy = [{ nightlyRate: 'asc' }];
        break;
      case 'price-high':
        orderBy = [{ nightlyRate: 'desc' }];
        break;
      case 'newest':
        orderBy = [{ createdAt: 'desc' }];
        break;
      case 'featured':
      default:
        orderBy = [{ isFeatured: 'desc' }, { sortOrder: 'asc' }, { createdAt: 'desc' }];
        break;
    }

    // Get total count for pagination
    const total = await prisma.property.count({ where });

    const properties = await prisma.property.findMany({
      where,
      include: {
        images: {
          orderBy: { sortOrder: 'asc' },
        },
        amenities: true,
      },
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
    });

    return NextResponse.json({
      properties,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Fetch properties error:', error);
    return NextResponse.json({ error: 'Failed to fetch properties' }, { status: 500 });
  }
}
