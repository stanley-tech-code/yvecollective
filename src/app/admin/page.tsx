'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

interface BlobResult {
  url: string;
}

export default function AdminPage() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<BlobResult | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!inputFileRef.current?.files) {
      throw new Error("No file selected");
    }

    const file = inputFileRef.current.files[0];
    setUploading(true);

    try {
      const response = await fetch(
        `/api/upload?filename=${file.name}`,
        {
          method: 'POST',
          body: file,
        },
      );

      const newBlob = await response.json();
      setBlob(newBlob);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F2EB] p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-serif text-[#6F655C] mb-8">Image Dashboard</h1>

        <form onSubmit={handleUpload} className="mb-12 space-y-4">
          <div className="flex items-center gap-4">
            <input
              name="file"
              ref={inputFileRef}
              type="file"
              required
              className="block w-full text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-[#F5F2EB] file:text-[#6F655C]
                hover:file:bg-[#F0EDE5]"
            />
            <button
              type="submit"
              disabled={uploading}
              className="bg-[#6F655C] text-white px-6 py-2 rounded-full hover:bg-[#5a524b] transition disabled:opacity-50"
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </form>

        {blob && (
          <div className="bg-[#F5F2EB] p-4 rounded-lg">
            <p className="text-[#6F655C] font-medium mb-2">Upload Successful!</p>
            <div className="flex items-center gap-4">
              <div className="relative h-20 w-20">
                <Image
                  src={blob.url}
                  alt="Uploaded"
                  fill
                  className="object-cover rounded"
                />
              </div>
              <a href={blob.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">
                {blob.url}
              </a>
            </div>
          </div>
        )}

        <div className="mt-12">
          <h2 className="text-xl font-serif text-[#6F655C] mb-4">Instructions</h2>
          <ul className="list-disc list-inside text-[#6F655C]/80 space-y-2">
            <li>Upload images here to host them on Vercel Blob.</li>
            <li>Copy the URL after upload to use in your website content.</li>
            <li>Ensure images are optimized before uploading (tinypng.com recommended).</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
