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
    <main className="min-h-screen bg-white">
      {/* Breadcrumb - Adjusted for fixed Navbar overlap */}
      <section className="bg-white pt-24 pb-4 px-6 md:px-16 border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <Link
            href={`/experiences/${categorySlug}`}
            className="inline-flex items-center gap-2 text-[#717171] hover:text-[#1a1a1a] transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to {categoryName}
          </Link>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto md:px-16 md:pt-6">
          {property.images.length > 0 ? (
            <div className="relative">
              {/* Mobile Scroll Gallery */}
              <div className="md:hidden relative group">
                <div
                  className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide no-scrollbar"
                  onScroll={(e) => {
                    const scrollLeft = (e.target as HTMLDivElement).scrollLeft;
                    const width = (e.target as HTMLDivElement).clientWidth;
                    const index = Math.round(scrollLeft / width);
                    setLightboxIndex(index);
                  }}
                >
                  {property.images.map((image, idx) => (
                    <div
                      key={image.id}
                      className="min-w-full aspect-[4/3] relative snap-start"
                      onClick={() => openLightbox(idx)}
                    >
                      <Image
                        src={image.url}
                        alt={image.altText || property.title}
                        fill
                        className="object-cover"
                        priority={idx === 0}
                      />
                    </div>
                  ))}
                </div>
                {/* 1/n Counter Badge */}
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded-md shadow-sm pointer-events-none">
                  {lightboxIndex + 1} / {property.images.length}
                </div>
              </div>

              {/* Desktop Sharp Grid */}
              <div className="hidden md:grid grid-cols-4 gap-2 h-[450px]">
                {/* Main Large Image */}
                <div
                  className="col-span-2 row-span-2 relative h-full rounded-l-xl overflow-hidden cursor-pointer group"
                  onClick={() => openLightbox(0)}
                >
                  <Image
                    src={property.images[0].url}
                    alt={property.images[0].altText || property.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                </div>

                {/* Grid side images */}
                <div className="col-span-2 grid grid-cols-2 gap-2 h-full">
                  {property.images.slice(1, 5).map((image, index) => (
                    <div
                      key={image.id}
                      className={`relative h-full overflow-hidden cursor-pointer group ${index === 1 ? 'rounded-tr-xl' : index === 3 ? 'rounded-br-xl' : ''
                        }`}
                      onClick={() => openLightbox(index + 1)}
                    >
                      <Image
                        src={image.url}
                        alt={image.altText || property.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />

                      {index === 3 && property.images.length > 5 && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-colors group-hover:bg-black/50">
                          <span className="text-white text-sm font-semibold tracking-wide">
                            +{property.images.length - 5} photos
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="aspect-[21/9] bg-gray-100 rounded-2xl flex items-center justify-center">
              <span className="text-gray-400">No images available</span>
            </div>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-6 md:px-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Details */}
            <div className="lg:col-span-2 space-y-12">
              <ScrollReveal>
                <div>
                  {property.isFeatured && (
                    <div className="inline-flex items-center gap-1.5 bg-[#1a1a1a] text-white px-3 py-1 rounded-md text-[11px] font-semibold mb-6 uppercase tracking-wider">
                      <Star className="w-3 h-3 fill-[#FFB400] text-[#FFB400]" />
                      Featured Property
                    </div>
                  )}
                  <h1 className="text-3xl md:text-5xl font-serif text-[#1a1a1a] mb-4 leading-tight">
                    {property.title}
                  </h1>
                  <div className="flex items-center gap-2 text-[#717171] font-medium">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">
                      {property.city}, {property.country}
                    </span>
                  </div>
                  {property.tagline && (
                    <p className="mt-6 text-xl text-[#717171] italic border-l-2 border-gray-100 pl-6 py-1">
                      {property.tagline}
                    </p>
                  )}
                </div>
              </ScrollReveal>

              {/* Quick Stats Grid */}
              <ScrollReveal delay={0.1}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
                    <Users className="w-5 h-5 text-[#1a1a1a] mb-3" />
                    <p className="text-2xl font-serif text-[#1a1a1a]">{property.maxGuests}</p>
                    <p className="text-xs font-semibold text-[#717171] uppercase tracking-wider">Guests</p>
                  </div>
                  <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
                    <BedDouble className="w-5 h-5 text-[#1a1a1a] mb-3" />
                    <p className="text-2xl font-serif text-[#1a1a1a]">{property.bedrooms}</p>
                    <p className="text-xs font-semibold text-[#717171] uppercase tracking-wider">Bedrooms</p>
                  </div>
                  <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
                    <Bath className="w-5 h-5 text-[#1a1a1a] mb-3" />
                    <p className="text-2xl font-serif text-[#1a1a1a]">{property.bathrooms}</p>
                    <p className="text-xs font-semibold text-[#717171] uppercase tracking-wider">Bathrooms</p>
                  </div>
                  <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
                    <Calendar className="w-5 h-5 text-[#1a1a1a] mb-3" />
                    <p className="text-2xl font-serif text-[#1a1a1a]">{property.minimumStay}</p>
                    <p className="text-xs font-semibold text-[#717171] uppercase tracking-wider">Min Nights</p>
                  </div>
                </div>
              </ScrollReveal>

              {/* Description */}
              <ScrollReveal delay={0.2}>
                <div className="border-t border-gray-100 pt-10">
                  <h2 className="text-2xl font-serif text-[#1a1a1a] mb-6">About this property</h2>
                  <div className="prose prose-stone max-w-none text-[#555] leading-relaxed">
                    {property.description.split('\n').map((paragraph, i) => (
                      <p key={i} className="mb-4 text-base">{paragraph}</p>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              {/* Amenities */}
              {property.amenities.length > 0 && (
                <ScrollReveal delay={0.3}>
                  <div className="border-t border-gray-100 pt-10">
                    <h2 className="text-2xl font-serif text-[#1a1a1a] mb-6">What this place offers</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                      {property.amenities.map((amenity) => (
                        <div key={amenity.id} className="flex items-center gap-3 text-[#555]">
                          <Check className="w-4 h-4 text-[#1a1a1a]" />
                          <span className="text-base">{amenity.name}</span>
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
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xl sticky top-32">
                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-3xl font-bold text-[#1a1a1a]">
                      ${property.nightlyRate.toLocaleString()}
                    </span>
                    <span className="text-[#717171] font-medium text-sm">night</span>
                  </div>

                  {property.weekendRate && (
                    <div className="text-xs font-medium text-[#717171] -mt-6 mb-6 inline-block bg-gray-50 px-2 py-1 rounded">
                      Weekend rate: ${property.weekendRate.toLocaleString()}/night
                    </div>
                  )}

                  {/* Pricing Details */}
                  <div className="space-y-4 mb-8">
                    {property.cleaningFee && (
                      <div className="flex justify-between text-sm">
                        <span className="text-[#717171] underline underline-offset-2">Cleaning fee</span>
                        <span className="text-[#1a1a1a] font-semibold">${property.cleaningFee.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-[#717171] underline underline-offset-2">Service fee</span>
                      <span className="text-[#1a1a1a] font-semibold">$0</span>
                    </div>
                    <div className="pt-4 border-t border-gray-100 flex justify-between font-bold text-[#1a1a1a] text-lg">
                      <span>Total nightly</span>
                      <span>${property.nightlyRate.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Booking CTA */}
                  <Link
                    href="/contact-options"
                    className="block w-full text-center bg-[#1a1a1a] text-white py-4 rounded-xl font-bold hover:bg-black transition-all mb-4"
                  >
                    {property.instantBook ? 'Reserve Now' : 'Request to Book'}
                  </Link>

                  <Link
                    href="/contact-options"
                    className="block w-full text-center border border-[#1a1a1a] text-[#1a1a1a] py-3.5 rounded-xl font-semibold hover:bg-gray-50 transition-all text-sm"
                  >
                    Message Host
                  </Link>

                  <p className="text-[11px] text-center text-[#717171] mt-6 font-medium">
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
        <section className="py-16 px-6 md:px-16 bg-white border-t border-gray-100">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <h2 className="text-2xl md:text-3xl font-serif text-[#1a1a1a] mb-8">
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
