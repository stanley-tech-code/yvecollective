'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface JournalSection {
  id?: string;
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

interface JournalPostEditorProps {
  posts: JournalPost[];
}

type FormData = Omit<JournalPost, 'id'>;

const emptyFormData: FormData = {
  slug: '',
  title: '',
  subtitle: '',
  heroImage: '',
  intro: '',
  sections: [],
  gallery: [],
  conclusionTitle: '',
  conclusionContent: '',
  conclusionImage: '',
  thumbnailImage: '',
  excerpt: '',
  published: false,
};

export function JournalPostEditor({ posts: initialPosts }: JournalPostEditorProps) {
  const [posts, setPosts] = useState<JournalPost[]>(initialPosts);
  const [editingPost, setEditingPost] = useState<JournalPost | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<FormData>(emptyFormData);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const router = useRouter();

  const handleCreate = () => {
    setIsCreating(true);
    setEditingPost(null);
    setFormData(emptyFormData);
  };

  const handleEdit = (post: JournalPost) => {
    setEditingPost(post);
    setIsCreating(false);
    setFormData({
      slug: post.slug,
      title: post.title,
      subtitle: post.subtitle,
      heroImage: post.heroImage,
      intro: post.intro,
      sections: post.sections.map((s, i) => ({ ...s, order: i })),
      gallery: post.gallery,
      conclusionTitle: post.conclusionTitle,
      conclusionContent: post.conclusionContent,
      conclusionImage: post.conclusionImage,
      thumbnailImage: post.thumbnailImage,
      excerpt: post.excerpt,
      published: post.published,
    });
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingPost(null);
    setFormData(emptyFormData);
  };

  const handleDelete = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/journal/${postId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete');

      setPosts(posts.filter((p) => p.id !== postId));
      router.refresh();
    } catch (error) {
      console.error('Delete failed:', error);
      alert('Failed to delete post');
    }
  };

  const handleSave = async () => {
    if (!formData.slug || !formData.title) {
      alert('Slug and title are required');
      return;
    }

    setSaving(true);

    try {
      const url = editingPost
        ? `/api/admin/journal/${editingPost.id}`
        : '/api/admin/journal';
      
      const method = editingPost ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save');
      }

      const savedPost = await response.json();

      if (editingPost) {
        setPosts(posts.map((p) => (p.id === savedPost.id ? savedPost : p)));
      } else {
        setPosts([savedPost, ...posts]);
      }

      handleCancel();
      router.refresh();
    } catch (error) {
      console.error('Save failed:', error);
      alert(error instanceof Error ? error.message : 'Failed to save post');
    } finally {
      setSaving(false);
    }
  };

  const uploadImage = async (file: File, field: string): Promise<string> => {
    const response = await fetch(
      `/api/admin/images?filename=${file.name}&sectionId=journal-${field}&altText=${encodeURIComponent(formData.title || 'Journal image')}`,
      {
        method: 'POST',
        body: file,
      }
    );

    if (!response.ok) throw new Error('Upload failed');

    const data = await response.json();
    return data.url;
  };

  const handleImageUpload = async (field: 'heroImage' | 'thumbnailImage' | 'conclusionImage') => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      setUploading(field);
      try {
        const url = await uploadImage(file, field);
        setFormData((prev) => ({ ...prev, [field]: url }));
      } catch (error) {
        console.error('Upload failed:', error);
        alert('Failed to upload image');
      } finally {
        setUploading(null);
      }
    };

    input.click();
  };

  const handleSectionImageUpload = async (index: number) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      setUploading(`section-${index}`);
      try {
        const url = await uploadImage(file, `section-${index}`);
        const newSections = [...formData.sections];
        newSections[index] = { ...newSections[index], image: url };
        setFormData((prev) => ({ ...prev, sections: newSections }));
      } catch (error) {
        console.error('Upload failed:', error);
        alert('Failed to upload image');
      } finally {
        setUploading(null);
      }
    };

    input.click();
  };

  const handleGalleryUpload = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true;
    
    input.onchange = async (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (!files || files.length === 0) return;

      setUploading('gallery');
      try {
        const uploadPromises = Array.from(files).map((file, i) =>
          uploadImage(file, `gallery-${formData.gallery.length + i}`)
        );
        const urls = await Promise.all(uploadPromises);
        setFormData((prev) => ({ ...prev, gallery: [...prev.gallery, ...urls] }));
      } catch (error) {
        console.error('Upload failed:', error);
        alert('Failed to upload images');
      } finally {
        setUploading(null);
      }
    };

    input.click();
  };

  const removeGalleryImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index),
    }));
  };

  const addSection = () => {
    setFormData((prev) => ({
      ...prev,
      sections: [
        ...prev.sections,
        { title: '', content: '', image: '', reverse: prev.sections.length % 2 === 1, order: prev.sections.length },
      ],
    }));
  };

  const removeSection = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index).map((s, i) => ({ ...s, order: i })),
    }));
  };

  const updateSection = (index: number, field: keyof JournalSection, value: string | boolean) => {
    const newSections = [...formData.sections];
    newSections[index] = { ...newSections[index], [field]: value };
    setFormData((prev) => ({ ...prev, sections: newSections }));
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  // Render post list
  if (!isCreating && !editingPost) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-serif text-[#6F655C]">Journal Posts</h2>
          <button
            onClick={handleCreate}
            className="bg-[#6F655C] text-white px-4 py-2 rounded-full text-sm hover:bg-[#5a524b] transition"
          >
            + New Post
          </button>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No journal posts yet. Create your first post!
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4"
              >
                {post.thumbnailImage && (
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={post.thumbnailImage}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-[#6F655C] truncate">{post.title}</h3>
                  <p className="text-sm text-gray-500 truncate">{post.excerpt}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${post.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                    <span className="text-xs text-gray-400">/{post.slug}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(post)}
                    className="text-[#6F655C] hover:text-[#5a524b] text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="text-red-500 hover:text-red-700 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Render form
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-serif text-[#6F655C]">
          {editingPost ? 'Edit Post' : 'New Post'}
        </h2>
        <button
          onClick={handleCancel}
          className="text-gray-500 hover:text-gray-700 text-sm"
        >
          Cancel
        </button>
      </div>

      <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
        {/* Basic Info */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
          <h3 className="font-medium text-[#6F655C]">Basic Information</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    title: e.target.value,
                    slug: prev.slug || generateSlug(e.target.value),
                  }));
                }}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6F655C]"
                placeholder="Post title"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Slug *</label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6F655C]"
                placeholder="url-friendly-slug"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Subtitle</label>
            <input
              type="text"
              value={formData.subtitle}
              onChange={(e) => setFormData((prev) => ({ ...prev, subtitle: e.target.value }))}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6F655C]"
              placeholder="Post subtitle"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Excerpt (for cards)</label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6F655C]"
              rows={2}
              placeholder="Short description for post cards"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="published"
              checked={formData.published}
              onChange={(e) => setFormData((prev) => ({ ...prev, published: e.target.checked }))}
              className="rounded border-gray-300"
            />
            <label htmlFor="published" className="text-sm text-gray-600">Published</label>
          </div>
        </div>

        {/* Hero & Thumbnail Images */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
          <h3 className="font-medium text-[#6F655C]">Images</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Hero Image</label>
              {formData.heroImage ? (
                <div className="relative h-32 rounded-lg overflow-hidden">
                  <Image src={formData.heroImage} alt="Hero" fill className="object-cover" />
                  <button
                    onClick={() => setFormData((prev) => ({ ...prev, heroImage: '' }))}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full text-xs"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleImageUpload('heroImage')}
                  disabled={uploading === 'heroImage'}
                  className="w-full h-32 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center text-gray-400 hover:border-[#6F655C] hover:text-[#6F655C] transition"
                >
                  {uploading === 'heroImage' ? 'Uploading...' : '+ Upload Hero'}
                </button>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Thumbnail Image</label>
              {formData.thumbnailImage ? (
                <div className="relative h-32 rounded-lg overflow-hidden">
                  <Image src={formData.thumbnailImage} alt="Thumbnail" fill className="object-cover" />
                  <button
                    onClick={() => setFormData((prev) => ({ ...prev, thumbnailImage: '' }))}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full text-xs"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleImageUpload('thumbnailImage')}
                  disabled={uploading === 'thumbnailImage'}
                  className="w-full h-32 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center text-gray-400 hover:border-[#6F655C] hover:text-[#6F655C] transition"
                >
                  {uploading === 'thumbnailImage' ? 'Uploading...' : '+ Upload Thumbnail'}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Intro */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
          <h3 className="font-medium text-[#6F655C]">Introduction</h3>
          <textarea
            value={formData.intro}
            onChange={(e) => setFormData((prev) => ({ ...prev, intro: e.target.value }))}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6F655C]"
            rows={4}
            placeholder="Opening paragraph of the post"
          />
        </div>

        {/* Sections */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-[#6F655C]">Content Sections</h3>
            <button
              onClick={addSection}
              className="text-sm text-[#6F655C] hover:text-[#5a524b]"
            >
              + Add Section
            </button>
          </div>

          {formData.sections.map((section, index) => (
            <div key={index} className="border border-gray-100 rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-500">Section {index + 1}</span>
                <button
                  onClick={() => removeSection(index)}
                  className="text-red-500 hover:text-red-700 text-xs"
                >
                  Remove
                </button>
              </div>

              <input
                type="text"
                value={section.title}
                onChange={(e) => updateSection(index, 'title', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6F655C]"
                placeholder="Section title"
              />

              <textarea
                value={section.content}
                onChange={(e) => updateSection(index, 'content', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6F655C]"
                rows={3}
                placeholder="Section content"
              />

              <div className="flex gap-4 items-center">
                {section.image ? (
                  <div className="relative w-24 h-16 rounded-lg overflow-hidden">
                    <Image src={section.image} alt="Section" fill className="object-cover" />
                    <button
                      onClick={() => updateSection(index, 'image', '')}
                      className="absolute top-1 right-1 bg-red-500 text-white p-0.5 rounded-full text-xs"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleSectionImageUpload(index)}
                    disabled={uploading === `section-${index}`}
                    className="w-24 h-16 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-xs hover:border-[#6F655C] hover:text-[#6F655C] transition"
                  >
                    {uploading === `section-${index}` ? '...' : '+ Image'}
                  </button>
                )}

                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    checked={section.reverse}
                    onChange={(e) => updateSection(index, 'reverse', e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  Reverse layout
                </label>
              </div>
            </div>
          ))}

          {formData.sections.length === 0 && (
            <div className="text-center py-4 text-gray-400 text-sm">
              No sections yet. Add sections to build your post content.
            </div>
          )}
        </div>

        {/* Gallery */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-[#6F655C]">Gallery</h3>
            <button
              onClick={handleGalleryUpload}
              disabled={uploading === 'gallery'}
              className="text-sm text-[#6F655C] hover:text-[#5a524b]"
            >
              {uploading === 'gallery' ? 'Uploading...' : '+ Add Images'}
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {formData.gallery.map((url, index) => (
              <div key={index} className="relative h-24 rounded-lg overflow-hidden">
                <Image src={url} alt={`Gallery ${index + 1}`} fill className="object-cover" />
                <button
                  onClick={() => removeGalleryImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white p-0.5 rounded-full text-xs"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {formData.gallery.length === 0 && (
            <div className="text-center py-4 text-gray-400 text-sm">
              No gallery images yet.
            </div>
          )}
        </div>

        {/* Conclusion */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
          <h3 className="font-medium text-[#6F655C]">Conclusion</h3>

          <input
            type="text"
            value={formData.conclusionTitle}
            onChange={(e) => setFormData((prev) => ({ ...prev, conclusionTitle: e.target.value }))}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6F655C]"
            placeholder="Conclusion title"
          />

          <textarea
            value={formData.conclusionContent}
            onChange={(e) => setFormData((prev) => ({ ...prev, conclusionContent: e.target.value }))}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6F655C]"
            rows={4}
            placeholder="Conclusion content"
          />

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Conclusion Image</label>
            {formData.conclusionImage ? (
              <div className="relative h-32 rounded-lg overflow-hidden">
                <Image src={formData.conclusionImage} alt="Conclusion" fill className="object-cover" />
                <button
                  onClick={() => setFormData((prev) => ({ ...prev, conclusionImage: '' }))}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full text-xs"
                >
                  ✕
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleImageUpload('conclusionImage')}
                disabled={uploading === 'conclusionImage'}
                className="w-full h-32 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center text-gray-400 hover:border-[#6F655C] hover:text-[#6F655C] transition"
              >
                {uploading === 'conclusionImage' ? 'Uploading...' : '+ Upload Conclusion Image'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <button
          onClick={handleCancel}
          className="px-6 py-2 text-gray-500 hover:text-gray-700 text-sm"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-[#6F655C] text-white px-6 py-2 rounded-full text-sm hover:bg-[#5a524b] transition disabled:opacity-50"
        >
          {saving ? 'Saving...' : editingPost ? 'Update Post' : 'Create Post'}
        </button>
      </div>
    </div>
  );
}

