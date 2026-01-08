import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getPropertyBySlug, getSimilarProperties, EXPERIENCE_CATEGORIES, CategorySlug } from '@/lib/properties';
import { PropertyDetailClient } from './PropertyDetailClient';

// Disable caching to always fetch fresh data
export const dynamic = 'force-dynamic';

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: { category: string; property: string };
}): Promise<Metadata> {
  const property = await getPropertyBySlug(params.property);

  if (!property) {
    return {
      title: 'Property Not Found | YVE Collective',
    };
  }

  return {
    title: `${property.title} | YVE Collective`,
    description: property.tagline || property.description.slice(0, 160),
    openGraph: {
      title: property.title,
      description: property.tagline || property.description.slice(0, 160),
      images: property.images[0]?.url ? [{ url: property.images[0].url }] : [],
    },
  };
}

export default async function PropertyDetailPage({
  params,
}: {
  params: { category: string; property: string };
}) {
  const categorySlug = params.category;
  const propertySlug = params.property;

  const categoryData = EXPERIENCE_CATEGORIES[categorySlug as CategorySlug];

  // Return 404 if category doesn't exist
  if (!categoryData) {
    notFound();
  }

  // Fetch property
  const property = await getPropertyBySlug(propertySlug);

  // Return 404 if property doesn't exist or isn't in this category
  if (!property || property.categorySlug !== categorySlug) {
    notFound();
  }

  // Fetch similar properties
  const similarProperties = await getSimilarProperties(property.id, categorySlug, 3);

  return (
    <PropertyDetailClient
      property={property}
      categoryName={categoryData.name}
      categorySlug={categorySlug}
      similarProperties={similarProperties}
    />
  );
}
