'use client';

import { useState } from 'react';
import { ImageUploadCard } from './ImageUploadCard';
import { JournalPostEditor } from './JournalPostEditor';
import { PropertyEditor } from './PropertyEditor';

interface Image {
  id: string;
  sectionId: string;
  url: string;
  altText: string | null;
}

interface JournalSection {
  id: string;
  title: string;
  content: string;
  image: string;
  reverse: boolean;
  order: number;
}

interface JournalPost {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  heroImage: string;
  intro: string;
  sections: JournalSection[];
  gallery: string[];
  conclusionTitle: string;
  conclusionContent: string;
  conclusionImage: string;
  thumbnailImage: string;
  excerpt: string;
  published: boolean;
}

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

interface AdminDashboardProps {
  images: Image[];
  journalPosts: JournalPost[];
  properties: Property[];
}

const IMAGE_SECTIONS = {
  'Homepage': [
    { id: 'hero-slide-1', label: 'Hero Slide 1' },
    { id: 'hero-slide-2', label: 'Hero Slide 2' },
    { id: 'hero-slide-3', label: 'Hero Slide 3' },
    { id: 'hero-slide-4', label: 'Hero Slide 4' },
    { id: 'hero-slide-5', label: 'Hero Slide 5' },
  ],
  'Experiences': [
    { id: 'experiences-hero', label: 'Experiences Page Hero' },
    { id: 'experience-safari', label: 'Safari Escapes' },
    { id: 'experience-coastal', label: 'Coastal Retreats' },
    { id: 'experience-mountain', label: 'Mountain & Cabin' },
    { id: 'experience-group', label: 'Curated Group Retreats' },
  ],
  'About': [
    { id: 'about-hero', label: 'About Hero Image' },
  ],
  'Journal Hero': [
    { id: 'journal-hero', label: 'Journal Page Hero Image' },
  ]
};

const TABS = ['Homepage', 'Experiences', 'About', 'Journal Hero', 'Journal Posts', 'Properties'];

export function AdminDashboard({ images, journalPosts, properties }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('Homepage');

  const getImage = (sectionId: string) => {
    return images.find(img => img.sectionId === sectionId);
  };

  return (
    <div className="min-h-screen bg-[#F5F2EB] p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif text-[#6F655C]">Content Management</h1>
          <div className="text-sm text-[#6F655C]">
            Images: {images.length} | Journal Posts: {journalPosts.length} | Properties: {properties.length}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-100 p-4 flex gap-4 overflow-x-auto">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition whitespace-nowrap ${activeTab === tab
                  ? 'bg-[#6F655C] text-white'
                  : 'bg-[#F5F2EB] text-[#6F655C] hover:bg-[#F0EDE5]'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-8">
            {activeTab === 'Properties' ? (
              <PropertyEditor properties={properties} />
            ) : activeTab === 'Journal Posts' ? (
              <JournalPostEditor posts={journalPosts} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {IMAGE_SECTIONS[activeTab as keyof typeof IMAGE_SECTIONS]?.map((section) => (
                  <ImageUploadCard
                    key={section.id}
                    sectionId={section.id}
                    label={section.label}
                    currentImage={getImage(section.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
