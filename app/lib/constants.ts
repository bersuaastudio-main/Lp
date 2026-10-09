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
  "Halo Bersua, saya ingin *konsultasi gratis* untuk website bisnis saya.\n\nNama bisnis: *[ ]*\nBidang usaha: *[ ]*";

/** Pesan dari kartu harga — menyebut paket yang dipilih agar percakapan langsung terarah. */
export const waPackage = (paket: string) =>
  `Halo Bersua, saya ingin *konsultasi gratis* tentang paket *${paket}*.\n\nNama bisnis: *[ ]*\nBidang usaha: *[ ]*`;

/** Pilihan paket di form leads (LeadForm). `name` harus sama dengan judul kartu harga;
 *  `anchor` = harga normal (dicoret) — samakan dengan `anchorPrice` di Harga.tsx. */
export const PACKAGE_OPTIONS: { name: string; price: string; anchor?: string }[] = [
  { name: "Starter", price: "Rp1,1 jt", anchor: "Rp1,6 jt" },
  { name: "Business Website", price: "Rp2,5 jt", anchor: "Rp3,75 jt" },
  { name: "Custom", price: "Sesuai scope" },
  { name: "Belum yakin", price: "Bantu pilihkan" },
];

/** Label & pesan untuk paket berharga tetap — pengunjung sudah memilih, bukan bertanya. */
export const CTA_CHOOSE = "Pilih Paket";
export const waChoosePackage = (paket: string) =>
  `Halo Bersua, saya ingin *memilih paket ${paket}*.\n\nNama bisnis: *[ ]*\nBidang usaha: *[ ]*`;

/**
 * Promo harga coret (REQ-C6.13 — wajib menyebut alasan & tanggal berakhir).
 * Setelah tanggal lewat: perbarui nama & tanggal, atau kosongkan `anchorPrice`
 * di Harga.tsx agar harga coret hilang.
 */
export const PROMO_NAME = "Oktober Growth";
export const PROMO_UNTIL = "27 Oktober 2026";

/**
 * Tiga jalur CTA berdasarkan niat pengunjung — masing-masing membuka WhatsApp
 * dengan pesan berbeda, supaya chat yang masuk langsung jelas kebutuhannya.
 */
export const WA_NEW_SITE =
  "Halo, saya ingin membuat *website baru* untuk bisnis saya.\n\nNama bisnis: *[ ]*\nBidang usaha: *[ ]*\nKebutuhan website: *[ ]*";

export const WA_FIX_SITE =
  "Halo, saya ingin *memperbaiki website* bisnis saya yang sudah ada.\n\nNama bisnis: *[ ]*\nAlamat website: *[ ]*\nYang ingin diperbaiki: *[ ]*";
