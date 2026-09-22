import type { MetadataRoute } from "next";
import { SITE_URL } from "@/app/lib/constants";

/**
 * /sitemap.xml — halaman ini single-page, jadi hanya satu URL.
 * Anchor section (#harga, #faq, …) sengaja TIDAK didaftarkan: Google
 * mengindeks halaman, bukan fragment.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
