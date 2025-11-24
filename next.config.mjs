/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "assets.micontenthub.com" },
      { protocol: "https", hostname: "nataniatravel.com" },
      { protocol: "https", hostname: "i.ibb.co" },
      { protocol: "https", hostname: "soroi.com" },
      { protocol: "https", hostname: "azuravilla.com" },
      { protocol: "https", hostname: "forrestnaromoru.com" },
      { protocol: "https", hostname: "bookretreats.com" },
      { protocol: "https", hostname: "www.transparenttextures.com" },
    ],
  },
};

export default nextConfig;
