# Bersua LP — Panduan Deploy & Pre-Launch

Domain produksi: **https://bersua.space**
Stack: Next.js 15 (App Router, static prerender) · TypeScript · CSS variables

---

## 1. Environment variables

Semuanya **opsional**. Tanpa nilai, script analytics tidak dirender sama sekali
(halaman tidak memanggil pihak ketiga). Lihat `.env.example`.

| Variable | Isi | Dari mana |
| --- | --- | --- |
| `NEXT_PUBLIC_GA_ID` | `G-XXXXXXXXXX` | GA4 → Admin → Data Streams |
| `NEXT_PUBLIC_CLARITY_ID` | `abcd1234ef` | Clarity → Settings → Overview |

Lokal: salin `.env.example` → `.env.local`.
Produksi: isi di dashboard hosting, lalu **redeploy** (env dibaca saat build).

> `NEXT_PUBLIC_` = terlihat di browser. Jangan taruh kredensial rahasia di sini.

---

## 2. Nilai yang dipusatkan

Satu sumber, jangan ditulis ulang di tempat lain:

| Nilai | File |
| --- | --- |
| Nomor WhatsApp | `app/lib/constants.ts` → `WA_NUMBER` |
| Domain | `app/lib/constants.ts` → `SITE_URL` (dipakai robots, sitemap, canonical, OG) |
| Label CTA | `app/lib/constants.ts` → `CTA_LABEL` |
| Pesan WA default | `app/lib/constants.ts` → `WA_DEFAULT` |
| Meta & OG copy | `app/layout.tsx` |

Mengubah domain cukup di `SITE_URL` — robots.txt, sitemap.xml, canonical, dan
URL OG image ikut otomatis.

---

## 3. DNS untuk bersua.space

| Record | Host | Nilai | Catatan |
| --- | --- | --- | --- |
| A / ALIAS | `@` | sesuai hosting | Vercel: `76.76.21.21` |
| CNAME | `www` | sesuai hosting | Vercel: `cname.vercel-dns.com` |

Wajib dipastikan setelah propagasi:

- [ ] `bersua.space` dan `www.bersua.space` sama-sama hidup
- [ ] Salah satu redirect ke satunya (pilih satu kanonik — canonical di kode menunjuk **non-www**)
- [ ] `http://` redirect ke `https://`
- [ ] SSL valid, tidak ada mixed content

**Jika domain ini juga dipakai untuk email** (mis. `halo@bersua.space`):
jangan hapus record MX/SPF/DKIM/DMARC saat mengarahkan DNS ke hosting.
Ubah hanya A/CNAME. Setelah itu tes kirim **dan** terima email.

---

## 4. Pre-launch checklist

### 01 — Content
- [ ] `WA_NUMBER` = nomor WhatsApp Business yang aktif
- [ ] Kirim tes ke nomor itu dari perangkat lain — pastikan masuk
- [ ] Harga di `Harga.tsx` sudah final (nominal "Hemat" dihitung otomatis dari selisih)
- [ ] Tidak ada placeholder tersisa

### 02 — Function
- [ ] 11 CTA WhatsApp membuka chat dengan pesan pre-filled yang benar
- [ ] Link navbar & footer mendarat tepat di section-nya
- [ ] Halaman 404 tampil wajar

### 03 — Responsive
- [ ] Desktop 1920 / 1440 / 1280 / 1024
- [ ] Mobile 430 / 390 / 375 / 360
- [ ] Tidak ada horizontal scroll, teks tidak terpotong
- [ ] Safari iPhone & Chrome Android (bukan sekadar resize browser)

### 04 — SEO
- [ ] `https://bersua.space/robots.txt` benar
- [ ] `https://bersua.space/sitemap.xml` benar
- [ ] Tidak ada `noindex` di produksi
- [ ] Submit sitemap di Google Search Console
- [ ] Tes preview link di WhatsApp (OG image muncul)

### 05 — Performance
- [ ] PageSpeed Insights mobile & desktop
- [ ] LCP, CLS, INP dalam batas wajar

### 06 — Tracking & Security
- [ ] `NEXT_PUBLIC_GA_ID` terisi, realtime GA4 menerima kunjungan
- [ ] Event `wa_click` muncul saat CTA diklik
- [ ] `npm audit` bersih
- [ ] Tidak ada secret di repo

### 07 — Production QA (setelah deploy)
- [ ] Buka produksi dari nol di HP: Hero → Portofolio → Harga → FAQ → CTA → WhatsApp masuk
- [ ] Console browser bersih
- [ ] Log hosting tanpa error

---

## 5. Perintah

```bash
npm run dev      # pengembangan
npm run build    # build produksi (wajib lolos sebelum deploy)
npm start        # jalankan hasil build
npm run lint     # eslint
npm audit        # cek kerentanan dependensi
```

---

## 6. Catatan pemeliharaan

- `package.json` memakai `overrides` untuk memaksa `postcss` & `sharp` ke versi
  aman. Saat upgrade Next, cek apakah blok itu masih diperlukan.
- Komponen `Demo.tsx` (contoh hasil kerja) belum dirender di `app/page.tsx` —
  aktifkan dengan menambahkan `<Demo />` saat asetnya siap.
- Analytics event ada di `app/lib/tracking.ts`: `wa_click`, `scroll_depth`,
  `section_view`.
