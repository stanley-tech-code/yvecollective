import { prisma } from '@/lib/db';
import { cache } from 'react';

// Category display names and slugs
export const EXPERIENCE_CATEGORIES = {
  'safari-escapes': {
    name: 'Safari Escapes',
    description: 'Wake to golden light across vast savannahs and the rhythm of the wild at your doorstep.',
  },
  'coastal-retreats': {
    name: 'Coastal Retreats',
    description: 'Along coastlines, we curate stays that blend barefoot luxury with timeless charm.',
  },
  'mountain-and-cabin-getaways': {
    name: 'Mountain & Cabin Getaways',
    description: 'In the highlands and forests, find peace in simplicity.',
  },
} as const;

export type CategorySlug = keyof typeof EXPERIENCE_CATEGORIES;

/**
 * Get display name for a category slug
 */
export function getCategoryDisplayName(slug: string): string {
  const category = EXPERIENCE_CATEGORIES[slug as CategorySlug];
  return category?.name || slug;
}

/**
 * Convert title to URL-safe slug
 */
export function generatePropertySlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

/**
 * Fetch all published properties for a category (cached for SSR)
 */
export const getPropertiesByCategory = cache(async (categorySlug: string) => {
  return prisma.property.findMany({
    where: {
      categorySlug,
      isPublished: true,
    },
    include: {
      images: {
        orderBy: { sortOrder: 'asc' },
      },
      amenities: true,
    },
    orderBy: [
      { isFeatured: 'desc' },
      { sortOrder: 'asc' },
      { createdAt: 'desc' },
    ],
  });
});

/**
 * Fetch a single published property by slug (cached for SSR)
 */
export const getPropertyBySlug = cache(async (slug: string) => {
  return prisma.property.findFirst({
    where: {
      slug,
      isPublished: true,
    },
    include: {
      images: {
        orderBy: { sortOrder: 'asc' },
      },
      amenities: true,
    },
  });
});

/**
 * Get similar properties in the same category
 */
export const getSimilarProperties = cache(async (propertyId: string, categorySlug: string, limit = 3) => {
  return prisma.property.findMany({
    where: {
      categorySlug,
      isPublished: true,
      id: { not: propertyId },
    },
    include: {
      images: {
        where: { isFeatured: true },
        take: 1,
      },
      amenities: true,
    },
    take: limit,
    orderBy: [
      { isFeatured: 'desc' },
      { createdAt: 'desc' },
    ],
  });
});

// Common amenities for checkbox selection
export const COMMON_AMENITIES = [
  { name: 'WiFi', icon: 'wifi' },
  { name: 'Pool', icon: 'pool' },
  { name: 'Kitchen', icon: 'utensils' },
  { name: 'Air Conditioning', icon: 'snowflake' },
  { name: 'Heating', icon: 'flame' },
  { name: 'Washer', icon: 'washer' },
  { name: 'Dryer', icon: 'wind' },
  { name: 'Free Parking', icon: 'car' },
  { name: 'Gym', icon: 'dumbbell' },
  { name: 'Hot Tub', icon: 'bath' },
  { name: 'BBQ Grill', icon: 'flame' },
  { name: 'Fireplace', icon: 'fire' },
  { name: 'Beach Access', icon: 'umbrella' },
  { name: 'Mountain View', icon: 'mountain' },
  { name: 'Ocean View', icon: 'waves' },
  { name: 'Garden', icon: 'flower' },
  { name: 'Pet Friendly', icon: 'paw' },
  { name: 'Wheelchair Accessible', icon: 'wheelchair' },
];

// Property types for dropdown
export const PROPERTY_TYPES = [
  'villa',
  'cabin',
  'lodge',
  'tent',
  'apartment',
  'house',
  'cottage',
  'bungalow',
  'treehouse',
  'yurt',
  'boat',
  'castle',
];

// Cancellation policies
export const CANCELLATION_POLICIES = [
  { value: 'flexible', label: 'Flexible - Full refund 24 hours before check-in' },
  { value: 'moderate', label: 'Moderate - Full refund 5 days before check-in' },
  { value: 'strict', label: 'Strict - 50% refund up to 1 week before check-in' },
  { value: 'non-refundable', label: 'Non-refundable - No refunds' },
];

// Countries for dropdown
export const COUNTRIES = [
  'Kenya',
  'Tanzania',
  'South Africa',
  'Botswana',
  'Namibia',
  'Rwanda',
  'Uganda',
  'Zimbabwe',
  'Zambia',
  'Mozambique',
  'Madagascar',
  'Mauritius',
  'Seychelles',
  'Morocco',
  'Egypt',
  'Ethiopia',
  'Ghana',
  'Senegal',
];
