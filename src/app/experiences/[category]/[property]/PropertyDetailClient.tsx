'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  MapPin,
  Users,
  BedDouble,
  Bath,
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  X,
  Star,
} from 'lucide-react';
import { PropertyCard } from '@/components/sections/PropertyCard';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { CANCELLATION_POLICIES } from '@/lib/properties';

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
  address: string | null;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  nightlyRate: number;
  weekendRate: number | null;
  cleaningFee: number | null;
  minimumStay: number;
  cancellationPolicy: string;
  instantBook: boolean;
  isFeatured: boolean;
  images: PropertyImage[];
  amenities: PropertyAmenity[];
}

interface SimilarProperty {
  id: string;
  title: string;
  slug: string;
  categorySlug: string;
  tagline: string | null;
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

interface PropertyDetailClientProps {
  property: Property;
  categoryName: string;
  categorySlug: string;
  similarProperties: SimilarProperty[];
}

export function PropertyDetailClient({
  property,
  categoryName,
  categorySlug,
  similarProperties,
}: PropertyDetailClientProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const cancellationLabel = CANCELLATION_POLICIES.find(
    (p) => p.value === property.cancellationPolicy
  )?.label || property.cancellationPolicy;

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setLightboxIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  return (
    <main className="min-h-screen bg-[#F5F2EB]">
      {/* Breadcrumb */}
      <section className="bg-white py-4 px-6 md:px-16 border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <Link
            href={`/experiences/${categorySlug}`}
            className="inline-flex items-center gap-2 text-[#6F655C] hover:text-[#333232] transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to {categoryName}
          </Link>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="bg-white pb-8">
        <div className="max-w-6xl mx-auto px-6 md:px-16">
          {property.images.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 pt-6">
              {/* Main Image */}
              <div
                className="md:col-span-2 md:row-span-2 relative aspect-[4/3] rounded-l-2xl overflow-hidden cursor-pointer group"
                onClick={() => openLightbox(0)}
              >
                <Image
                  src={property.images[0].url}
                  alt={property.images[0].altText || property.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />
              </div>

              {/* Secondary Images */}
              {property.images.slice(1, 5).map((image, index) => (
                <div
                  key={image.id}
                  className={`relative aspect-[4/3] overflow-hidden cursor-pointer group ${index === 1 ? 'rounded-tr-2xl' : index === 3 ? 'rounded-br-2xl' : ''
                    } hidden md:block`}
                  onClick={() => openLightbox(index + 1)}
                >
                  <Image
                    src={image.url}
                    alt={image.altText || property.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />

                  {/* Show more overlay on last visible image */}
                  {index === 3 && property.images.length > 5 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white font-medium">
                        +{property.images.length - 5} more
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="aspect-[21/9] bg-gradient-to-br from-[#6F655C] to-[#A69580] rounded-2xl flex items-center justify-center">
              <span className="text-white/50">No images available</span>
            </div>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Details */}
            <div className="lg:col-span-2 space-y-8">
              <ScrollReveal>
                <div>
                  {property.isFeatured && (
                    <div className="inline-flex items-center gap-1 bg-[#6F655C] text-white px-3 py-1 rounded-full text-xs font-medium mb-4">
                      <Star className="w-3 h-3 fill-current" />
                      Featured Property
                    </div>
                  )}
                  <h1 className="text-3xl md:text-4xl font-serif text-[#333232] mb-2">
                    {property.title}
                  </h1>
                  <div className="flex items-center gap-2 text-[#6F655C]">
                    <MapPin className="w-4 h-4" />
                    <span>
                      {property.city}, {property.country}
                    </span>
                  </div>
                  {property.tagline && (
                    <p className="mt-4 text-lg text-[#6F655C]/80 italic">
                      {property.tagline}
                    </p>
                  )}
                </div>
              </ScrollReveal>

              {/* Quick Stats */}
              <ScrollReveal delay={0.1}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white rounded-xl p-4 text-center">
                    <Users className="w-6 h-6 mx-auto text-[#6F655C] mb-2" />
                    <p className="text-2xl font-serif text-[#333232]">{property.maxGuests}</p>
                    <p className="text-sm text-[#6F655C]/70">Guests</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 text-center">
                    <BedDouble className="w-6 h-6 mx-auto text-[#6F655C] mb-2" />
                    <p className="text-2xl font-serif text-[#333232]">{property.bedrooms}</p>
                    <p className="text-sm text-[#6F655C]/70">Bedrooms</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 text-center">
                    <Bath className="w-6 h-6 mx-auto text-[#6F655C] mb-2" />
                    <p className="text-2xl font-serif text-[#333232]">{property.bathrooms}</p>
                    <p className="text-sm text-[#6F655C]/70">Bathrooms</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 text-center">
                    <Calendar className="w-6 h-6 mx-auto text-[#6F655C] mb-2" />
                    <p className="text-2xl font-serif text-[#333232]">{property.minimumStay}</p>
                    <p className="text-sm text-[#6F655C]/70">Min Nights</p>
                  </div>
                </div>
              </ScrollReveal>

              {/* Description */}
              <ScrollReveal delay={0.2}>
                <div className="bg-white rounded-2xl p-6">
                  <h2 className="text-xl font-serif text-[#333232] mb-4">About this property</h2>
                  <div className="prose prose-stone max-w-none text-[#6F655C]/80">
                    {property.description.split('\n').map((paragraph, i) => (
                      <p key={i} className="mb-4">{paragraph}</p>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              {/* Amenities */}
              {property.amenities.length > 0 && (
                <ScrollReveal delay={0.3}>
                  <div className="bg-white rounded-2xl p-6">
                    <h2 className="text-xl font-serif text-[#333232] mb-4">Amenities</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {property.amenities.map((amenity) => (
                        <div key={amenity.id} className="flex items-center gap-2 text-[#6F655C]">
                          <Check className="w-4 h-4 text-green-600" />
                          <span>{amenity.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              )}
            </div>

            {/* Right Column - Booking Card */}
            <div className="lg:col-span-1">
              <ScrollReveal delay={0.2}>
                <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-24">
                  <div className="flex items-end gap-1 mb-6">
                    <span className="text-3xl font-serif text-[#333232]">
                      ${property.nightlyRate.toLocaleString()}
                    </span>
                    <span className="text-[#6F655C]/70 pb-1">/night</span>
                  </div>

                  {property.weekendRate && (
                    <p className="text-sm text-[#6F655C]/70 -mt-4 mb-4">
                      Weekend rate: ${property.weekendRate.toLocaleString()}/night
                    </p>
                  )}

                  {/* Pricing Details */}
                  <div className="space-y-2 mb-6 pb-6 border-b border-gray-100">
                    {property.cleaningFee && (
                      <div className="flex justify-between text-sm">
                        <span className="text-[#6F655C]/70">Cleaning fee</span>
                        <span className="text-[#333232]">${property.cleaningFee.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-[#6F655C]/70">Minimum stay</span>
                      <span className="text-[#333232]">{property.minimumStay} nights</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#6F655C]/70">Cancellation</span>
                      <span className="text-[#333232] capitalize">{cancellationLabel}</span>
                    </div>
                  </div>

                  {/* Booking CTA */}
                  <Link
                    href="/contact-options"
                    className="block w-full text-center bg-[#6F655C] text-white py-3 rounded-full font-medium hover:bg-[#5a534b] transition mb-3"
                  >
                    {property.instantBook ? 'Book Now' : 'Request to Book'}
                  </Link>

                  <Link
                    href="/contact-options"
                    className="block w-full text-center bg-[#F5F2EB] text-[#6F655C] py-3 rounded-full font-medium hover:bg-[#F0EDE5] transition"
                  >
                    Contact Host
                  </Link>

                  <p className="text-xs text-center text-[#6F655C]/50 mt-4">
                    You won&apos;t be charged yet
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Properties */}
      {similarProperties.length > 0 && (
        <section className="py-16 px-6 md:px-16 bg-white">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <h2 className="text-2xl md:text-3xl font-serif text-[#333232] mb-8">
                Similar Properties
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {similarProperties.map((prop, index) => (
                <PropertyCard
                  key={prop.id}
                  property={prop}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lightbox */}
      {lightboxOpen && property.images.length > 0 && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition z-10"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-4 text-white hover:text-gray-300 transition z-10"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          <div className="relative w-full h-full max-w-5xl max-h-[80vh] mx-auto">
            <Image
              src={property.images[lightboxIndex].url}
              alt={property.images[lightboxIndex].altText || property.title}
              fill
              className="object-contain"
            />
          </div>

          <button
            onClick={nextImage}
            className="absolute right-4 text-white hover:text-gray-300 transition z-10"
          >
            <ChevronRight className="w-10 h-10" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
            {lightboxIndex + 1} / {property.images.length}
          </div>
        </div>
      )}
    </main>
  );
}
