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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <Link
        href={`/experiences/${property.categorySlug}/${property.slug}`}
        className="group block bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
      >
        {/* Image */}
        <div className="relative h-56 w-full overflow-hidden">
          {featuredImage ? (
            <Image
              src={featuredImage.url}
              alt={featuredImage.altText || property.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#6F655C] to-[#A69580] flex items-center justify-center">
              <span className="text-white/50">No image</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Featured Badge */}
          {property.isFeatured && (
            <div className="absolute top-3 left-3 flex items-center gap-1 bg-[#6F655C] text-white px-3 py-1 rounded-full text-xs font-medium">
              <Star className="w-3 h-3 fill-current" />
              Featured
            </div>
          )}

          {/* Property Type Badge */}
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-[#6F655C] px-3 py-1 rounded-full text-xs font-medium capitalize">
            {property.propertyType}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Title */}
          <h3 className="text-lg font-serif text-[#333232] group-hover:text-[#6F655C] transition-colors line-clamp-1">
            {property.title}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1 mt-1 text-[#6F655C]/70 text-sm">
            <MapPin className="w-3.5 h-3.5" />
            <span className="line-clamp-1">{property.city}, {property.country}</span>
          </div>

          {/* Tagline */}
          {property.tagline && (
            <p className="mt-2 text-sm text-[#6F655C]/80 line-clamp-2">
              {property.tagline}
            </p>
          )}

          {/* Details */}
          <div className="flex items-center gap-4 mt-3 text-sm text-[#6F655C]/70">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{property.maxGuests} guests</span>
            </div>
            <span>·</span>
            <span>{property.bedrooms} bed{property.bedrooms !== 1 ? 's' : ''}</span>
            <span>·</span>
            <span>{property.bathrooms} bath{property.bathrooms !== 1 ? 's' : ''}</span>
          </div>

          {/* Amenities */}
          {displayedAmenities.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {displayedAmenities.map((amenity) => (
                <span
                  key={amenity.id}
                  className="bg-[#F5F2EB] text-[#6F655C] px-2 py-0.5 rounded-full text-xs"
                >
                  {amenity.name}
                </span>
              ))}
              {property.amenities.length > 3 && (
                <span className="text-[#6F655C]/60 text-xs">
                  +{property.amenities.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Price */}
          <div className="mt-4 pt-3 border-t border-gray-100 flex items-end justify-between">
            <div>
              <span className="text-xl font-serif text-[#333232]">
                ${property.nightlyRate.toLocaleString()}
              </span>
              <span className="text-sm text-[#6F655C]/70"> /night</span>
            </div>
            <span className="text-sm text-[#6F655C] font-medium group-hover:underline">
              View Details →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
