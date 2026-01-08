import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET - Get a single property by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const property = await prisma.property.findUnique({
      where: { id: params.id },
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

    return NextResponse.json(property);
  } catch (error) {
    console.error('Fetch property error:', error);
    return NextResponse.json({ error: 'Failed to fetch property' }, { status: 500 });
  }
}

// PUT - Update a property
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      title,
      slug,
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

    // Check if property exists
    const existingProperty = await prisma.property.findUnique({
      where: { id: params.id },
    });

    if (!existingProperty) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }

    // Check slug uniqueness if changing
    if (slug && slug !== existingProperty.slug) {
      const slugExists = await prisma.property.findUnique({
        where: { slug },
      });

      if (slugExists) {
        return NextResponse.json({ error: 'A property with this slug already exists' }, { status: 400 });
      }
    }

    // Update property with transaction to handle images and amenities
    const property = await prisma.$transaction(async (tx) => {
      // Delete existing images and amenities if new ones provided
      if (images !== undefined) {
        await tx.propertyImage.deleteMany({
          where: { propertyId: params.id },
        });
      }

      if (amenities !== undefined) {
        await tx.propertyAmenity.deleteMany({
          where: { propertyId: params.id },
        });
      }

      // Update property
      return tx.property.update({
        where: { id: params.id },
        data: {
          ...(title !== undefined && { title }),
          ...(slug !== undefined && { slug }),
          ...(categorySlug !== undefined && { categorySlug }),
          ...(tagline !== undefined && { tagline: tagline || null }),
          ...(description !== undefined && { description }),
          ...(propertyType !== undefined && { propertyType }),
          ...(country !== undefined && { country }),
          ...(city !== undefined && { city }),
          ...(address !== undefined && { address: address || null }),
          ...(latitude !== undefined && { latitude: latitude ? parseFloat(latitude) : null }),
          ...(longitude !== undefined && { longitude: longitude ? parseFloat(longitude) : null }),
          ...(nearbyAttractions !== undefined && { nearbyAttractions }),
          ...(maxGuests !== undefined && { maxGuests: parseInt(maxGuests) }),
          ...(bedrooms !== undefined && { bedrooms: parseInt(bedrooms) }),
          ...(bathrooms !== undefined && { bathrooms: parseInt(bathrooms) }),
          ...(bedConfigurations !== undefined && { bedConfigurations: bedConfigurations || null }),
          ...(nightlyRate !== undefined && { nightlyRate: parseFloat(nightlyRate) }),
          ...(weekendRate !== undefined && { weekendRate: weekendRate ? parseFloat(weekendRate) : null }),
          ...(cleaningFee !== undefined && { cleaningFee: cleaningFee ? parseFloat(cleaningFee) : null }),
          ...(serviceFeePercent !== undefined && { serviceFeePercent: parseFloat(serviceFeePercent) }),
          ...(minimumStay !== undefined && { minimumStay: parseInt(minimumStay) }),
          ...(cancellationPolicy !== undefined && { cancellationPolicy }),
          ...(blockedDates !== undefined && { blockedDates }),
          ...(instantBook !== undefined && { instantBook }),
          ...(isPublished !== undefined && { isPublished }),
          ...(isFeatured !== undefined && { isFeatured }),
          ...(sortOrder !== undefined && { sortOrder: parseInt(sortOrder) }),
          ...(images !== undefined && {
            images: {
              create: images.map((img: { url: string; altText?: string; isFeatured?: boolean }, index: number) => ({
                url: img.url,
                altText: img.altText || null,
                isFeatured: img.isFeatured || false,
                sortOrder: index,
              })),
            },
          }),
          ...(amenities !== undefined && {
            amenities: {
              create: amenities.map((amenity: { name: string; icon?: string }) => ({
                name: amenity.name,
                icon: amenity.icon || null,
              })),
            },
          }),
        },
        include: {
          images: {
            orderBy: { sortOrder: 'asc' },
          },
          amenities: true,
        },
      });
    });

    return NextResponse.json(property);
  } catch (error) {
    console.error('Update property error:', error);
    return NextResponse.json({ error: 'Failed to update property' }, { status: 500 });
  }
}

// DELETE - Delete a property
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Check if property exists
    const existingProperty = await prisma.property.findUnique({
      where: { id: params.id },
    });

    if (!existingProperty) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }

    // Delete property (cascade will delete images and amenities)
    await prisma.property.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete property error:', error);
    return NextResponse.json({ error: 'Failed to delete property' }, { status: 500 });
  }
}
