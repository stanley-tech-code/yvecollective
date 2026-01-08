'use client';

import { useState } from 'react';
import { SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import { PROPERTY_TYPES, COMMON_AMENITIES } from '@/lib/properties';

interface PropertyFiltersProps {
  onFilterChange: (filters: FilterState) => void;
  totalCount: number;
}

export interface FilterState {
  priceRange: [number, number];
  guests: number | null;
  propertyTypes: string[];
  amenities: string[];
  sort: string;
}

const defaultFilters: FilterState = {
  priceRange: [0, 10000],
  guests: null,
  propertyTypes: [],
  amenities: [],
  sort: 'featured',
};

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest' },
];

export function PropertyFilters({ onFilterChange, totalCount }: PropertyFiltersProps) {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [showFilters, setShowFilters] = useState(false);

  const updateFilters = (updates: Partial<FilterState>) => {
    const newFilters = { ...filters, ...updates };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  const hasActiveFilters =
    filters.guests !== null ||
    filters.propertyTypes.length > 0 ||
    filters.amenities.length > 0 ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 10000;

  const togglePropertyType = (type: string) => {
    const types = filters.propertyTypes.includes(type)
      ? filters.propertyTypes.filter((t) => t !== type)
      : [...filters.propertyTypes, type];
    updateFilters({ propertyTypes: types });
  };

  const toggleAmenity = (amenity: string) => {
    const amenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter((a) => a !== amenity)
      : [...filters.amenities, amenity];
    updateFilters({ amenities });
  };

  return (
    <div className="mb-8">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div className="text-[#6F655C]">
          <span className="font-medium">{totalCount}</span>
          <span className="text-[#6F655C]/70"> {totalCount === 1 ? 'property' : 'properties'}</span>
        </div>

        <div className="flex items-center gap-3">
          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={filters.sort}
              onChange={(e) => updateFilters({ sort: e.target.value })}
              className="appearance-none bg-white border border-gray-200 rounded-full px-4 py-2 pr-10 text-sm text-[#6F655C] focus:outline-none focus:ring-1 focus:ring-[#6F655C] cursor-pointer"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6F655C]/50 pointer-events-none" />
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition ${showFilters || hasActiveFilters
                ? 'bg-[#6F655C] text-white'
                : 'bg-white border border-gray-200 text-[#6F655C] hover:bg-[#F5F2EB]'
              }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {hasActiveFilters && (
              <span className="bg-white/20 px-1.5 py-0.5 rounded-full text-xs">
                {[
                  filters.guests ? 1 : 0,
                  filters.propertyTypes.length,
                  filters.amenities.length,
                ].reduce((a, b) => a + b, 0)}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-[#333232]">Filters</h3>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 text-sm text-[#6F655C] hover:text-[#333232]"
              >
                <X className="w-4 h-4" />
                Clear all
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Guests */}
            <div>
              <label className="block text-sm font-medium text-[#6F655C] mb-2">Guests</label>
              <div className="flex gap-2">
                {[1, 2, 4, 6, 8, 10].map((num) => (
                  <button
                    key={num}
                    onClick={() => updateFilters({ guests: filters.guests === num ? null : num })}
                    className={`flex-1 py-2 rounded-lg text-sm transition ${filters.guests === num
                        ? 'bg-[#6F655C] text-white'
                        : 'bg-[#F5F2EB] text-[#6F655C] hover:bg-[#F0EDE5]'
                      }`}
                  >
                    {num}+
                  </button>
                ))}
              </div>
            </div>

            {/* Property Types */}
            <div>
              <label className="block text-sm font-medium text-[#6F655C] mb-2">Property Type</label>
              <div className="flex flex-wrap gap-2">
                {PROPERTY_TYPES.slice(0, 6).map((type) => (
                  <button
                    key={type}
                    onClick={() => togglePropertyType(type)}
                    className={`px-3 py-1.5 rounded-full text-sm transition capitalize ${filters.propertyTypes.includes(type)
                        ? 'bg-[#6F655C] text-white'
                        : 'bg-[#F5F2EB] text-[#6F655C] hover:bg-[#F0EDE5]'
                      }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div>
              <label className="block text-sm font-medium text-[#6F655C] mb-2">Amenities</label>
              <div className="flex flex-wrap gap-2">
                {COMMON_AMENITIES.slice(0, 6).map((amenity) => (
                  <button
                    key={amenity.name}
                    onClick={() => toggleAmenity(amenity.name)}
                    className={`px-3 py-1.5 rounded-full text-sm transition ${filters.amenities.includes(amenity.name)
                        ? 'bg-[#6F655C] text-white'
                        : 'bg-[#F5F2EB] text-[#6F655C] hover:bg-[#F0EDE5]'
                      }`}
                  >
                    {amenity.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
