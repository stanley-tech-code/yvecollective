'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { PropertyCard } from '@/components/sections/PropertyCard';
import { PropertyFilters, FilterState } from '@/components/sections/PropertyFilters';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

interface PropertyImage {
  id: string;
  url: string;
  altText: string | null;
  isFeatured: boolean;
  sortOrder: number;
}

interface PropertyAmenity {
  id: string;
  name: string;
  icon: string | null;
}

interface Property {
  id: string;
  title: string;
  slug: string;
  categorySlug: string;
  tagline: string | null;
  description: string;
  propertyType: string;
  country: string;
  city: string;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  nightlyRate: number;
  isFeatured: boolean;
  images: PropertyImage[];
  amenities: PropertyAmenity[];
}

interface CategoryPageClientProps {
  categorySlug: string;
  categoryName: string;
  categoryDescription: string;
  properties: Property[];
}

export function CategoryPageClient({
  categoryName,
  categoryDescription,
  properties,
}: CategoryPageClientProps) {
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 10000],
    guests: null,
    propertyTypes: [],
    amenities: [],
    sort: 'featured',
  });

  // Apply filters and sorting
  const filteredProperties = useMemo(() => {
    let result = [...properties];

    // Filter by guests
    if (filters.guests) {
      result = result.filter((p) => p.maxGuests >= filters.guests!);
    }

    // Filter by property types
    if (filters.propertyTypes.length > 0) {
      result = result.filter((p) => filters.propertyTypes.includes(p.propertyType));
    }

    // Filter by amenities
    if (filters.amenities.length > 0) {
      result = result.filter((p) =>
        filters.amenities.every((amenity) =>
          p.amenities.some((a) => a.name === amenity)
        )
      );
    }

    // Filter by price range
    result = result.filter(
      (p) => p.nightlyRate >= filters.priceRange[0] && p.nightlyRate <= filters.priceRange[1]
    );

    // Sort
    switch (filters.sort) {
      case 'price-low':
        result.sort((a, b) => a.nightlyRate - b.nightlyRate);
        break;
      case 'price-high':
        result.sort((a, b) => b.nightlyRate - a.nightlyRate);
        break;
      case 'newest':
        // Properties are already sorted by createdAt desc from the server
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    return result;
  }, [properties, filters]);

  return (
    <main className="min-h-screen bg-white">
      {/* Header — simple, clean, sharp */}
      <section className="pt-20 pb-8 px-6 md:px-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal delay={0.1}>
            <h1 className="text-4xl md:text-5xl font-serif text-[#1a1a1a] mb-4 leading-tight">
              {categoryName}
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-base md:text-lg text-[#717171] max-w-2xl leading-relaxed">
              {categoryDescription}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-4 px-6 md:px-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <PropertyFilters
            onFilterChange={setFilters}
            totalCount={filteredProperties.length}
          />

          {filteredProperties.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[#6F655C] text-lg">
                No properties match your filters.
              </p>
              <button
                onClick={() => setFilters({
                  priceRange: [0, 10000],
                  guests: null,
                  propertyTypes: [],
                  amenities: [],
                  sort: 'featured',
                })}
                className="mt-4 text-[#6F655C] underline hover:text-[#333232]"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((property, index) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 md:px-16 bg-[#F7F7F7] text-center border-t border-gray-100">
        <ScrollReveal>
          <h2 className="text-2xl md:text-3xl font-serif text-[#1a1a1a] mb-4">
            Can&apos;t find what you&apos;re looking for?
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <p className="text-[#6F655C]/80 mb-6 max-w-lg mx-auto">
            Let us help you find the perfect property for your next adventure.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <Link
            href="/contact-options"
            className="inline-flex items-center gap-2 bg-[#222] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#333] transition"
          >
            Contact Us
          </Link>
        </ScrollReveal>
      </section>
    </main>
  );
}
