'use client';

import { useState } from 'react';
import { ImageUploadCard } from './ImageUploadCard';

interface Image {
  id: string;
  sectionId: string;
  url: string;
  altText: string | null;
}

interface AdminDashboardProps {
  images: Image[];
}

const SECTIONS = {
  'Homepage': [
    { id: 'hero-slide-1', label: 'Hero Slide 1' },
    { id: 'hero-slide-2', label: 'Hero Slide 2' },
    { id: 'hero-slide-3', label: 'Hero Slide 3' },
    { id: 'hero-slide-4', label: 'Hero Slide 4' },
    { id: 'hero-slide-5', label: 'Hero Slide 5' },
  ],
  'Experiences': [
    { id: 'experience-safari', label: 'Safari Escapes' },
    { id: 'experience-coastal', label: 'Coastal Retreats' },
    { id: 'experience-mountain', label: 'Mountain & Cabin' },
    { id: 'experience-group', label: 'Curated Group Retreats' },
  ],
  'About': [
    { id: 'about-hero', label: 'About Hero Image' },
  ],
  'Journal': [
    { id: 'journal-hero', label: 'Journal Hero Image' },
  ]
};

export function AdminDashboard({ images }: AdminDashboardProps) {
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
            Total Images: {images.length}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-100 p-4 flex gap-4 overflow-x-auto">
            {Object.keys(SECTIONS).map((tab) => (
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SECTIONS[activeTab as keyof typeof SECTIONS].map((section) => (
                <ImageUploadCard
                  key={section.id}
                  sectionId={section.id}
                  label={section.label}
                  currentImage={getImage(section.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
