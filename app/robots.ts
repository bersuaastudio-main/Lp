import type { MetadataRoute } from "next";
import { SITE_URL } from "@/app/lib/constants";

/**
 * /robots.txt — dibangkitkan Next, bukan file statis, supaya domain ikut
 * berubah otomatis saat SITE_URL diganti (satu sumber di constants.ts).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
