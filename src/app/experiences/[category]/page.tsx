import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { EXPERIENCE_CATEGORIES, getPropertiesByCategory, CategorySlug } from '@/lib/properties';
import { CategoryPageClient } from './CategoryPageClient';

// Disable caching to always fetch fresh data
export const dynamic = 'force-dynamic';

// Generate static params for the 3 categories
export async function generateStaticParams() {
  return Object.keys(EXPERIENCE_CATEGORIES).map((category) => ({
    category,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: { category: string };
}): Promise<Metadata> {
  const categoryData = EXPERIENCE_CATEGORIES[params.category as CategorySlug];

  if (!categoryData) {
    return {
      title: 'Category Not Found | YVE Collective',
    };
  }

  return {
    title: `${categoryData.name} | YVE Collective`,
    description: categoryData.description,
    openGraph: {
      title: `${categoryData.name} | YVE Collective`,
      description: categoryData.description,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const categorySlug = params.category;
  const categoryData = EXPERIENCE_CATEGORIES[categorySlug as CategorySlug];

  // Return 404 if category doesn't exist
  if (!categoryData) {
    notFound();
  }

  // Fetch properties for this category
  const properties = await getPropertiesByCategory(categorySlug);

  return (
    <CategoryPageClient
      categorySlug={categorySlug}
      categoryName={categoryData.name}
      categoryDescription={categoryData.description}
      properties={properties}
    />
  );
}
