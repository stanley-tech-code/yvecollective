'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface ImageUploadCardProps {
  sectionId: string;
  label: string;
  currentImage?: {
    id: string;
    url: string;
    altText: string | null;
  };
}

export function ImageUploadCard({ sectionId, label, currentImage }: ImageUploadCardProps) {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [altText, setAltText] = useState(currentImage?.altText || '');
  const router = useRouter();

  const handleUpload = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!inputFileRef.current?.files?.length) {
      alert("Please select a file");
      return;
    }

    const file = inputFileRef.current.files[0];
    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB");
      return;
    }

    setUploading(true);

    try {
      const response = await fetch(
        `/api/admin/images?filename=${file.name}&sectionId=${sectionId}&altText=${encodeURIComponent(altText)}`,
        {
          method: 'POST',
          body: file,
        },
      );

      if (!response.ok) throw new Error('Upload failed');

      router.refresh();
      if (inputFileRef.current) inputFileRef.current.value = '';
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!currentImage || !confirm('Are you sure you want to delete this image?')) return;

    try {
      const response = await fetch(`/api/admin/images/${currentImage.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Delete failed');

      router.refresh();
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Delete failed. Please try again.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="font-serif text-lg text-[#6F655C] mb-4">{label}</h3>

      {currentImage ? (
        <div className="mb-4">
          <div className="relative h-48 w-full mb-2 rounded-lg overflow-hidden bg-gray-50">
            <Image
              src={currentImage.url}
              alt={currentImage.altText || label}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500 truncate max-w-[200px]">{currentImage.altText}</span>
            <button
              onClick={handleDelete}
              className="text-red-500 hover:text-red-700 font-medium"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div className="h-48 w-full mb-4 bg-gray-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-200">
          <span className="text-gray-400 text-sm">No image uploaded</span>
        </div>
      )}

      <form onSubmit={handleUpload} className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Alt Text</label>
          <input
            type="text"
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
            placeholder="Describe the image..."
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6F655C]"
          />
        </div>

        <div className="flex gap-2">
          <input
            ref={inputFileRef}
            type="file"
            accept="image/*"
            className="block w-full text-sm text-slate-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-xs file:font-semibold
              file:bg-[#F5F2EB] file:text-[#6F655C]
              hover:file:bg-[#F0EDE5]"
          />
          <button
            type="submit"
            disabled={uploading}
            className="bg-[#6F655C] text-white px-4 py-2 rounded-full text-sm hover:bg-[#5a524b] transition disabled:opacity-50 whitespace-nowrap"
          >
            {uploading ? '...' : 'Upload'}
          </button>
        </div>
      </form>
    </div>
  );
}
