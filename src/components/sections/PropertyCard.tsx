'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Users, Star } from 'lucide-react';

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

interface PropertyCardProps {
  property: {
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
  };
  index: number;
}

export function PropertyCard({ property, index }: PropertyCardProps) {
  const featuredImage = property.images.find((img) => img.isFeatured) || property.images[0];
  const displayedAmenities = property.amenities.slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <Link
        href={`/experiences/${property.categorySlug}/${property.slug}`}
        className="group block bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl hover:border-gray-300 transition-all duration-300"
      >
        {/* Image */}
        <div className="relative h-56 w-full overflow-hidden bg-gray-100">
          {featuredImage ? (
            <Image
              src={featuredImage.url}
              alt={featuredImage.altText || property.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#6F655C] to-[#A69580] flex items-center justify-center">
              <span className="text-white/50 text-sm">No image</span>
            </div>
          )}

          {/* Featured Badge */}
          {property.isFeatured && (
            <div className="absolute top-3 left-3 flex items-center gap-1 bg-white text-[#1a1a1a] px-2.5 py-1 rounded-md text-xs font-semibold shadow-sm">
              <Star className="w-3 h-3 fill-[#FFB400] text-[#FFB400]" />
              Featured
            </div>
          )}

          {/* Property Type Badge */}
          <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white px-2.5 py-1 rounded-md text-xs font-medium capitalize">
            {property.propertyType}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Title + Location */}
          <div className="mb-2">
            <h3 className="text-base font-semibold text-[#1a1a1a] group-hover:text-[#6F655C] transition-colors line-clamp-1 leading-snug">
              {property.title}
            </h3>
            <div className="flex items-center gap-1 mt-0.5 text-[#717171] text-xs">
              <MapPin className="w-3 h-3 flex-shrink-0" />
              <span className="line-clamp-1">{property.city}, {property.country}</span>
            </div>
          </div>

          {/* Tagline */}
          {property.tagline && (
            <p className="text-xs text-[#717171] line-clamp-1 mb-2">
              {property.tagline}
            </p>
          )}

          {/* Specs row */}
          <div className="flex items-center gap-2 text-xs text-[#717171] mb-3">
            <div className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              <span>{property.maxGuests} guests</span>
            </div>
            <span className="text-gray-300">•</span>
            <span>{property.bedrooms} bed{property.bedrooms !== 1 ? 's' : ''}</span>
            <span className="text-gray-300">•</span>
            <span>{property.bathrooms} bath{property.bathrooms !== 1 ? 's' : ''}</span>
          </div>

          {/* Amenities */}
          {displayedAmenities.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {displayedAmenities.map((amenity) => (
                <span
                  key={amenity.id}
                  className="bg-gray-100 text-[#555] px-2 py-0.5 rounded text-[11px] font-medium"
                >
                  {amenity.name}
                </span>
              ))}
              {property.amenities.length > 3 && (
                <span className="text-[#717171] text-[11px] self-center">
                  +{property.amenities.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Price */}
          <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-baseline gap-1">
              <span className="text-base font-bold text-[#1a1a1a]">
                ${property.nightlyRate.toLocaleString()}
              </span>
              <span className="text-xs text-[#717171] font-normal">/ night</span>
            </div>
            <span className="text-xs font-medium text-[#6F655C] group-hover:underline underline-offset-2">
              View details →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
