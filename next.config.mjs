/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Vercel Blob Store - primary image storage
      {
        protocol: "https",
        hostname: "ozkemptmezwoxlpi.public.blob.vercel-storage.com",
      },
      // Legacy image hosts - kept temporarily for seeded data migration
      // These can be removed once all images are uploaded through the admin dashboard
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "i.ibb.co" },
    ],
  },
};

export default nextConfig;
