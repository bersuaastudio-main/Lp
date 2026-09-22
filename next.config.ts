import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /* AVIF didahulukan (lebih kecil ~40% dari WebP); browser lama jatuh ke WebP */
    formats: ["image/avif", "image/webp"],
  },

  async headers() {
    return [
      {
        /* Aset di /img bersifat immutable — namanya hanya berubah saat filenya
           diganti, jadi aman di-cache setahun oleh browser & CDN. */
        source: "/img/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        /* Header keamanan dasar untuk seluruh halaman */
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
