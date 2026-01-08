'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Plus, Pencil, Trash2, Eye, Search, X } from 'lucide-react';
import {
  EXPERIENCE_CATEGORIES,
  COMMON_AMENITIES,
  PROPERTY_TYPES,
  CANCELLATION_POLICIES,
  COUNTRIES,
  CategorySlug,
} from '@/lib/properties';

interface PropertyImage {
  id?: string;
  url: string;
  altText: string | null;
  isFeatured: boolean;
  sortOrder: number;
}

interface PropertyAmenity {
  id?: string;
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
  latitude: number | null;
  longitude: number | null;
  nearbyAttractions: string[];
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  bedConfigurations: string | null;
  nightlyRate: number;
  weekendRate: number | null;
  cleaningFee: number | null;
  serviceFeePercent: number | null;
  minimumStay: number;
  cancellationPolicy: string;
  instantBook: boolean;
  isPublished: boolean;
  isFeatured: boolean;
  sortOrder: number;
  images: PropertyImage[];
  amenities: PropertyAmenity[];
}

interface PropertyEditorProps {
  properties: Property[];
}

const emptyProperty: Omit<Property, 'id'> = {
  title: '',
  slug: '',
  categorySlug: 'safari-escapes',
  tagline: '',
  description: '',
  propertyType: 'villa',
  country: 'Kenya',
  city: '',
  address: '',
  latitude: null,
  longitude: null,
  nearbyAttractions: [],
  maxGuests: 2,
  bedrooms: 1,
  bathrooms: 1,
  bedConfigurations: '',
  nightlyRate: 0,
  weekendRate: null,
  cleaningFee: null,
  serviceFeePercent: 10,
  minimumStay: 1,
  cancellationPolicy: 'flexible',
  instantBook: false,
  isPublished: false,
  isFeatured: false,
  sortOrder: 0,
  images: [],
  amenities: [],
};

export function PropertyEditor({ properties: initialProperties }: PropertyEditorProps) {
  const router = useRouter();
  const [properties, setProperties] = useState(initialProperties);
  const [mode, setMode] = useState<'list' | 'create' | 'edit'>('list');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [formData, setFormData] = useState<Omit<Property, 'id'>>(emptyProperty);
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [uploadingImages, setUploadingImages] = useState(false);

  // Filter properties
  const filteredProperties = properties.filter((p) => {
    const matchesSearch = !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.country.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !categoryFilter || p.categorySlug === categoryFilter;
    const matchesStatus = !statusFilter ||
      (statusFilter === 'published' && p.isPublished) ||
      (statusFilter === 'draft' && !p.isPublished);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleCreate = () => {
    setMode('create');
    setSelectedProperty(null);
    setFormData(emptyProperty);
  };

  const handleEdit = (property: Property) => {
    setMode('edit');
    setSelectedProperty(property);
    setFormData({
      title: property.title,
      slug: property.slug,
      categorySlug: property.categorySlug,
      tagline: property.tagline || '',
      description: property.description,
      propertyType: property.propertyType,
      country: property.country,
      city: property.city,
      address: property.address || '',
      latitude: property.latitude,
      longitude: property.longitude,
      nearbyAttractions: property.nearbyAttractions || [],
      maxGuests: property.maxGuests,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      bedConfigurations: property.bedConfigurations || '',
      nightlyRate: property.nightlyRate,
      weekendRate: property.weekendRate,
      cleaningFee: property.cleaningFee,
      serviceFeePercent: property.serviceFeePercent,
      minimumStay: property.minimumStay,
      cancellationPolicy: property.cancellationPolicy,
      instantBook: property.instantBook,
      isPublished: property.isPublished,
      isFeatured: property.isFeatured,
      sortOrder: property.sortOrder,
      images: property.images,
      amenities: property.amenities,
    });
  };

  const handleCancel = () => {
    setMode('list');
    setSelectedProperty(null);
    setFormData(emptyProperty);
  };

  const handleDelete = async (propertyId: string) => {
    if (!confirm('Are you sure you want to delete this property? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/properties/${propertyId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Delete failed');

      setProperties(properties.filter((p) => p.id !== propertyId));
      router.refresh();
    } catch (error) {
      console.error('Delete failed:', error);
      alert('Failed to delete property. Please try again.');
    }
  };

  const handleSave = async () => {
    if (!formData.title || !formData.description || !formData.city || !formData.nightlyRate) {
      alert('Please fill in all required fields: Title, Description, City, and Nightly Rate');
      return;
    }

    setSaving(true);

    try {
      const url = mode === 'create'
        ? '/api/admin/properties'
        : `/api/admin/properties/${selectedProperty?.id}`;

      const method = mode === 'create' ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Save failed');
      }

      const savedProperty = await response.json();

      if (mode === 'create') {
        setProperties([savedProperty, ...properties]);
      } else {
        setProperties(properties.map((p) => (p.id === savedProperty.id ? savedProperty : p)));
      }

      handleCancel();
      router.refresh();
    } catch (error) {
      console.error('Save failed:', error);
      alert(error instanceof Error ? error.message : 'Failed to save property. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (files: FileList) => {
    setUploadingImages(true);

    try {
      const newImages: PropertyImage[] = [...formData.images];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.size > 5 * 1024 * 1024) {
          alert(`File ${file.name} is too large. Maximum size is 5MB.`);
          continue;
        }

        const response = await fetch(
          `/api/upload?filename=${encodeURIComponent(file.name)}`,
          {
            method: 'POST',
            body: file,
          }
        );

        if (!response.ok) throw new Error('Upload failed');

        const blob = await response.json();
        newImages.push({
          url: blob.url,
          altText: file.name.replace(/\.[^/.]+$/, ''),
          isFeatured: newImages.length === 0,
          sortOrder: newImages.length,
        });
      }

      setFormData({ ...formData, images: newImages });
    } catch (error) {
      console.error('Image upload failed:', error);
      alert('Failed to upload images. Please try again.');
    } finally {
      setUploadingImages(false);
    }
  };

  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    // If we removed the featured image, make the first one featured
    if (formData.images[index].isFeatured && newImages.length > 0) {
      newImages[0].isFeatured = true;
    }
    setFormData({ ...formData, images: newImages });
  };

  const setFeaturedImage = (index: number) => {
    const newImages = formData.images.map((img, i) => ({
      ...img,
      isFeatured: i === index,
    }));
    setFormData({ ...formData, images: newImages });
  };

  const toggleAmenity = (amenityName: string, icon: string) => {
    const exists = formData.amenities.some((a) => a.name === amenityName);
    if (exists) {
      setFormData({
        ...formData,
        amenities: formData.amenities.filter((a) => a.name !== amenityName),
      });
    } else {
      setFormData({
        ...formData,
        amenities: [...formData.amenities, { name: amenityName, icon }],
      });
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  // List View
  if (mode === 'list') {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <h2 className="text-xl font-serif text-[#6F655C]">
            Properties ({properties.length})
          </h2>
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 bg-[#6F655C] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#5a534b] transition"
          >
            <Plus className="w-4 h-4" />
            Add Property
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search properties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6F655C]"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6F655C]"
          >
            <option value="">All Categories</option>
            {Object.entries(EXPERIENCE_CATEGORIES).map(([slug, cat]) => (
              <option key={slug} value={slug}>{cat.name}</option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6F655C]"
          >
            <option value="">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        {/* Property Grid */}
        {filteredProperties.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            {properties.length === 0
              ? 'No properties yet. Click "Add Property" to create one.'
              : 'No properties match your filters.'}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition"
              >
                <div className="relative h-40 bg-gray-100">
                  {property.images[0]?.url ? (
                    <Image
                      src={property.images[0].url}
                      alt={property.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      No image
                    </div>
                  )}
                  <div className="absolute top-2 right-2 flex gap-1">
                    {property.isPublished ? (
                      <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        Published
                      </span>
                    ) : (
                      <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                        Draft
                      </span>
                    )}
                    {property.isFeatured && (
                      <span className="bg-[#6F655C] text-white text-xs px-2 py-1 rounded-full">
                        Featured
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-serif text-lg text-[#333232] truncate">{property.title}</h3>
                  <p className="text-sm text-gray-500">
                    {property.city}, {property.country}
                  </p>
                  <p className="text-sm text-[#6F655C] mt-1">
                    ${property.nightlyRate}/night · {property.maxGuests} guests
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {EXPERIENCE_CATEGORIES[property.categorySlug as CategorySlug]?.name || property.categorySlug}
                  </p>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleEdit(property)}
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm bg-[#F5F2EB] text-[#6F655C] rounded-lg hover:bg-[#F0EDE5] transition"
                    >
                      <Pencil className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(property.id)}
                      className="px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Create/Edit Form
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-serif text-[#6F655C]">
          {mode === 'create' ? 'Add New Property' : 'Edit Property'}
        </h2>
        <button
          onClick={handleCancel}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Basic Info */}
          <div className="bg-gray-50 rounded-xl p-6 space-y-4">
            <h3 className="font-medium text-[#333232]">Basic Information</h3>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    title: e.target.value,
                    slug: mode === 'create' ? generateSlug(e.target.value) : formData.slug,
                  });
                }}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6F655C]"
                placeholder="Serengeti Safari Lodge"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Slug</label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6F655C]"
                placeholder="serengeti-safari-lodge"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Category</label>
                <select
                  value={formData.categorySlug}
                  onChange={(e) => setFormData({ ...formData, categorySlug: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6F655C]"
                >
                  {Object.entries(EXPERIENCE_CATEGORIES).map(([slug, cat]) => (
                    <option key={slug} value={slug}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Property Type</label>
                <select
                  value={formData.propertyType}
                  onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6F655C]"
                >
                  {PROPERTY_TYPES.map((type) => (
                    <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Tagline <span className="text-xs text-gray-400">(max 150 chars)</span>
              </label>
              <input
                type="text"
                value={formData.tagline || ''}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value.slice(0, 150) })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6F655C]"
                placeholder="A luxurious retreat in the heart of the Serengeti"
                maxLength={150}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={6}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6F655C] resize-none"
                placeholder="Describe the property in detail..."
              />
            </div>
          </div>

          {/* Location */}
          <div className="bg-gray-50 rounded-xl p-6 space-y-4">
            <h3 className="font-medium text-[#333232]">Location</h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Country <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6F655C]"
                >
                  {COUNTRIES.map((country) => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  City/Region <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6F655C]"
                  placeholder="Serengeti National Park"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Address</label>
              <input
                type="text"
                value={formData.address || ''}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6F655C]"
                placeholder="Full address (optional)"
              />
            </div>
          </div>

          {/* Capacity */}
          <div className="bg-gray-50 rounded-xl p-6 space-y-4">
            <h3 className="font-medium text-[#333232]">Capacity</h3>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Max Guests</label>
                <input
                  type="number"
                  min="1"
                  value={formData.maxGuests}
                  onChange={(e) => setFormData({ ...formData, maxGuests: parseInt(e.target.value) || 1 })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6F655C]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Bedrooms</label>
                <input
                  type="number"
                  min="0"
                  value={formData.bedrooms}
                  onChange={(e) => setFormData({ ...formData, bedrooms: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6F655C]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Bathrooms</label>
                <input
                  type="number"
                  min="0"
                  value={formData.bathrooms}
                  onChange={(e) => setFormData({ ...formData, bathrooms: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6F655C]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Images */}
          <div className="bg-gray-50 rounded-xl p-6 space-y-4">
            <h3 className="font-medium text-[#333232]">Images</h3>

            <div className="grid grid-cols-3 gap-3">
              {formData.images.map((img, index) => (
                <div
                  key={index}
                  className={`relative aspect-video rounded-lg overflow-hidden border-2 ${img.isFeatured ? 'border-[#6F655C]' : 'border-transparent'
                    }`}
                >
                  <Image src={img.url} alt={img.altText || ''} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition flex items-center justify-center gap-2">
                    <button
                      onClick={() => setFeaturedImage(index)}
                      className="p-1.5 bg-white rounded-full text-[#6F655C] hover:bg-gray-100"
                      title="Set as featured"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => removeImage(index)}
                      className="p-1.5 bg-white rounded-full text-red-500 hover:bg-gray-100"
                      title="Remove"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  {img.isFeatured && (
                    <span className="absolute top-1 left-1 bg-[#6F655C] text-white text-xs px-1.5 py-0.5 rounded">
                      Featured
                    </span>
                  )}
                </div>
              ))}

              {/* Upload Button */}
              <label className="aspect-video rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-[#6F655C] transition">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => e.target.files && handleImageUpload(e.target.files)}
                  disabled={uploadingImages}
                />
                {uploadingImages ? (
                  <span className="text-sm text-gray-400">Uploading...</span>
                ) : (
                  <>
                    <Plus className="w-6 h-6 text-gray-400" />
                    <span className="text-xs text-gray-400 mt-1">Add Image</span>
                  </>
                )}
              </label>
            </div>

            <p className="text-xs text-gray-400">
              Upload up to 20 images. First image or marked as featured will be the cover.
            </p>
          </div>

          {/* Pricing */}
          <div className="bg-gray-50 rounded-xl p-6 space-y-4">
            <h3 className="font-medium text-[#333232]">Pricing</h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Nightly Rate ($) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.nightlyRate}
                  onChange={(e) => setFormData({ ...formData, nightlyRate: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6F655C]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Weekend Rate ($)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.weekendRate || ''}
                  onChange={(e) => setFormData({ ...formData, weekendRate: e.target.value ? parseFloat(e.target.value) : null })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6F655C]"
                  placeholder="Optional"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Cleaning Fee ($)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.cleaningFee || ''}
                  onChange={(e) => setFormData({ ...formData, cleaningFee: e.target.value ? parseFloat(e.target.value) : null })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6F655C]"
                  placeholder="Optional"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Minimum Stay</label>
                <input
                  type="number"
                  min="1"
                  value={formData.minimumStay}
                  onChange={(e) => setFormData({ ...formData, minimumStay: parseInt(e.target.value) || 1 })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6F655C]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Cancellation Policy</label>
              <select
                value={formData.cancellationPolicy}
                onChange={(e) => setFormData({ ...formData, cancellationPolicy: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6F655C]"
              >
                {CANCELLATION_POLICIES.map((policy) => (
                  <option key={policy.value} value={policy.value}>{policy.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Amenities */}
          <div className="bg-gray-50 rounded-xl p-6 space-y-4">
            <h3 className="font-medium text-[#333232]">Amenities</h3>

            <div className="grid grid-cols-3 gap-2">
              {COMMON_AMENITIES.map((amenity) => (
                <label
                  key={amenity.name}
                  className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition ${formData.amenities.some((a) => a.name === amenity.name)
                      ? 'bg-[#6F655C] text-white'
                      : 'bg-white hover:bg-gray-100'
                    }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.amenities.some((a) => a.name === amenity.name)}
                    onChange={() => toggleAmenity(amenity.name, amenity.icon)}
                    className="sr-only"
                  />
                  <span className="text-xs">{amenity.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="bg-gray-50 rounded-xl p-6 space-y-4">
            <h3 className="font-medium text-[#333232]">Status</h3>

            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isPublished}
                  onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                  className="rounded border-gray-300 text-[#6F655C] focus:ring-[#6F655C]"
                />
                <span className="text-sm">Published</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  className="rounded border-gray-300 text-[#6F655C] focus:ring-[#6F655C]"
                />
                <span className="text-sm">Featured</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.instantBook}
                  onChange={(e) => setFormData({ ...formData, instantBook: e.target.checked })}
                  className="rounded border-gray-300 text-[#6F655C] focus:ring-[#6F655C]"
                />
                <span className="text-sm">Instant Book</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
        <button
          onClick={handleCancel}
          className="px-6 py-2 text-[#6F655C] hover:bg-gray-100 rounded-full transition"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            setFormData({ ...formData, isPublished: false });
            handleSave();
          }}
          disabled={saving}
          className="px-6 py-2 bg-[#F5F2EB] text-[#6F655C] rounded-full hover:bg-[#F0EDE5] transition disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save as Draft'}
        </button>
        <button
          onClick={() => {
            setFormData({ ...formData, isPublished: true });
            handleSave();
          }}
          disabled={saving}
          className="px-6 py-2 bg-[#6F655C] text-white rounded-full hover:bg-[#5a534b] transition disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Publish'}
        </button>
      </div>
    </div>
  );
}
