/**
 * constants.ts
 * Konstanta global. Ganti nilai di sini sebelum launch — tidak ada tempat lain.
 */

export const WA_NUMBER = "6287890205695"; // +62 878 9020 5695 — WhatsApp Business Bersua
export const SITE_URL = "https://bersua.space";

/** Satu label CTA di seluruh halaman (PRD G4). */
export const CTA_LABEL = "Konsultasi Gratis";

/**
 * Pesan pre-filled WhatsApp — dipakai SEMUA CTA di halaman, supaya chat yang
 * masuk selalu berformat sama dan mudah ditindaklanjuti.
 * Catatan format: WhatsApp menebalkan teks dengan SATU tanda bintang (*teks*).
 */
export const WA_DEFAULT =
  "Halo, saya tertarik melihat bagaimana bisnis saya dapat ditampilkan melalui *Website Preview Gratis*.\n\nNama bisnis: *[ ]*\nBidang usaha: *[ ]*";

/**
 * Tiga jalur CTA berdasarkan niat pengunjung — masing-masing membuka WhatsApp
 * dengan pesan berbeda, supaya chat yang masuk langsung jelas kebutuhannya.
 */
export const WA_NEW_SITE =
  "Halo, saya ingin membuat *website baru* untuk bisnis saya.\n\nNama bisnis: *[ ]*\nBidang usaha: *[ ]*\nKebutuhan website: *[ ]*";

export const WA_FIX_SITE =
  "Halo, saya ingin *memperbaiki website* bisnis saya yang sudah ada.\n\nNama bisnis: *[ ]*\nAlamat website: *[ ]*\nYang ingin diperbaiki: *[ ]*";
