import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { generatePropertySlug } from '@/lib/properties';

// GET - List all properties (admin)
export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const status = searchParams.get('status');
  const search = searchParams.get('search');

  try {
    const where: Record<string, unknown> = {};

    if (category) {
      where.categorySlug = category;
    }

    if (status === 'published') {
      where.isPublished = true;
    } else if (status === 'draft') {
      where.isPublished = false;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { city: { contains: search, mode: 'insensitive' } },
        { country: { contains: search, mode: 'insensitive' } },
      ];
    }

    const properties = await prisma.property.findMany({
      where,
      include: {
        images: {
          orderBy: { sortOrder: 'asc' },
        },
        amenities: true,
      },
      orderBy: [
        { createdAt: 'desc' },
      ],
    });

    return NextResponse.json(properties);
  } catch (error) {
    console.error('Fetch properties error:', error);
    return NextResponse.json({ error: 'Failed to fetch properties' }, { status: 500 });
  }
}

// POST - Create a new property
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      title,
      slug: customSlug,
      categorySlug,
      tagline,
      description,
      propertyType,
      country,
      city,
      address,
      latitude,
      longitude,
      nearbyAttractions,
      maxGuests,
      bedrooms,
      bathrooms,
      bedConfigurations,
      nightlyRate,
      weekendRate,
      cleaningFee,
      serviceFeePercent,
      minimumStay,
      cancellationPolicy,
      blockedDates,
      instantBook,
      isPublished,
      isFeatured,
      sortOrder,
      images,
      amenities,
    } = body;

    // Validate required fields
    if (!title || !categorySlug || !description || !country || !city || !nightlyRate) {
      return NextResponse.json(
        { error: 'Title, category, description, country, city, and nightly rate are required' },
        { status: 400 }
      );
    }

    // Generate or use custom slug
    let slug = customSlug || generatePropertySlug(title);

    // Check if slug already exists and make unique
    const existingProperty = await prisma.property.findUnique({
      where: { slug },
    });

    if (existingProperty) {
      slug = `${slug}-${Date.now().toString(36)}`;
    }

    const property = await prisma.property.create({
      data: {
        title,
        slug,
        categorySlug,
        tagline: tagline || null,
        description,
        propertyType: propertyType || 'villa',
        country,
        city,
        address: address || null,
        latitude: latitude ? parseFloat(latitude) : null,
        longitude: longitude ? parseFloat(longitude) : null,
        nearbyAttractions: nearbyAttractions || [],
        maxGuests: parseInt(maxGuests) || 2,
        bedrooms: parseInt(bedrooms) || 1,
        bathrooms: parseInt(bathrooms) || 1,
        bedConfigurations: bedConfigurations || null,
        nightlyRate: parseFloat(nightlyRate),
        weekendRate: weekendRate ? parseFloat(weekendRate) : null,
        cleaningFee: cleaningFee ? parseFloat(cleaningFee) : null,
        serviceFeePercent: serviceFeePercent ? parseFloat(serviceFeePercent) : 10,
        minimumStay: parseInt(minimumStay) || 1,
        cancellationPolicy: cancellationPolicy || 'flexible',
        blockedDates: blockedDates || [],
        instantBook: instantBook || false,
        isPublished: isPublished || false,
        isFeatured: isFeatured || false,
        sortOrder: parseInt(sortOrder) || 0,
        images: {
          create: (images || []).map((img: { url: string; altText?: string; isFeatured?: boolean }, index: number) => ({
            url: img.url,
            altText: img.altText || null,
            isFeatured: img.isFeatured || index === 0,
            sortOrder: index,
          })),
        },
        amenities: {
          create: (amenities || []).map((amenity: { name: string; icon?: string }) => ({
            name: amenity.name,
            icon: amenity.icon || null,
          })),
        },
      },
      include: {
        images: {
          orderBy: { sortOrder: 'asc' },
        },
        amenities: true,
      },
    });

    return NextResponse.json(property);
  } catch (error) {
    console.error('Create property error:', error);
    return NextResponse.json({ error: 'Failed to create property' }, { status: 500 });
  }
}
