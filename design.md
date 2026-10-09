# Bersua LP — Design Knowledge

> Sumber kebenaran desain, copywriting, dan elemen landing page Bersua Lab Studio.
> Mencerminkan kode yang berjalan (Oktober 2026). Kalau kode dan dokumen ini berbeda,
> perbarui salah satunya — jangan biarkan keduanya menyimpang.

**Arah visual:** studio editorial — whitespace lapang, tipografi besar berbobot regular,
palet hitam–cream, foto sinematik, dan interaksi halus yang terasa "dibuat dengan sengaja".
Referensi yang membentuk sistem ini: Sandikala Studio (hero & footer), Mollie (showcase,
cara kerja), Superhuman (foto + kartu kaca melayang).

---

## 1. Prinsip

1. **Regular, bukan tebal.** Penekanan lewat ukuran, warna, dan ruang — bukan bobot huruf.
   Batas atas bobot = headline hero (400). Satu-satunya pengecualian: titik baca utama di
   kartu harga (500).
2. **Whitespace adalah pemisah.** Tidak ada garis divider antar-section atau di bawah
   judul. Pergantian warna latar dan jarak yang memisahkan.
3. **Dua warna, satu blok gelap.** Halaman bergerak cream → foto → hitam (portofolio,
   founder, harga) → cream → hitam (CTA, footer). Blok gelap selalu menyambung tanpa jahitan.
4. **Gambar utuh, tajam.** Mockup tidak boleh ter-crop berlebihan atau dikompres ulang.
5. **Gerak yang tenang.** Animasi ease-out panjang (`cubic-bezier(0.22, 1, 0.36, 1)`),
   tidak memantul. Semua mati saat `prefers-reduced-motion`.
6. **Jujur.** Tanpa angka hasil, testimoni, atau klaim "berpengalaman" (lihat §7).

---

## 2. Warna

| Token | Nilai | Peran |
|---|---|---|
| `--color-cream-paper` | `#f8f8f2` | Kanvas default (hero, kategori, cara kerja, FAQ) |
| `--color-card-white` | `#ffffff` | Navbar, kartu terang, teks di atas gelap |
| `--color-studio-ink` | `#1a1a1a` | Teks utama & **semua section gelap** |
| `--color-ink-60` | `rgba(26,26,26,.60)` | Teks sekunder di latar terang |
| `--color-ink-20` | `rgba(26,26,26,.20)` | Angka urut, dekorasi |
| `--color-ink-08` | `rgba(26,26,26,.08)` | Garis di dalam komponen (FAQ, panel) |
| `--color-powder-blue` | `#bedbff` | Aksen gradient Aurora (kartu harga) |
| `--color-mint-wash` | `#a4f4cf` | Aksen gradient Aurora (kartu harga) |

**Teks di latar gelap** (`#1a1a1a`): utama `#fff`, sekunder `rgba(255,255,255,.72)`,
daftar fitur `.85`, catatan kecil minimal `.5`. Jangan di bawah `.5` — tidak terbaca.

**Warna turunan foto** (hanya di section foto): rumput gelap `#0b0b08`, panel cokelat
hangat `#2a2420 → #5a4636` (Cara Kerja).

---

## 3. Tipografi

Font tunggal: **Inter** (next/font, self-host). Aksen mono hanya untuk eyebrow & label tab:
`ui-monospace, "SF Mono", Menlo, Consolas`.

| Peran | Ukuran | Bobot | Leading | Tracking |
|---|---|---|---|---|
| Headline hero | `clamp(38px, 6vw, 96px)` | 400 | 1.02 | -0.035em |
| Judul section foto (Untuk Siapa) | `clamp(30px, 3.6vw, 56px)` | 400 | 1.05 | -0.035em |
| Judul section (`.sec-heading`) | `clamp(30px, 3.2vw, 48px)` | 400 | 1.2 | -1.2px |
| Judul kartu panel (Cara Kerja) | `clamp(32px, 3.6vw, 52px)` | 400 | 1.05 | -0.035em |
| Kutipan founder | `clamp(28px, 3.2vw, 46px)` | 400 | 1.2 | -0.02em |
| Harga & nama paket | 30px / 20px | **500** | 1.2 | -0.75px |
| Body / sub | 16–18px | 400 | 1.45–1.5 | -0.2 / -0.4px |
| Caption / catatan | 14–15px | 400 | 1.43 | -0.35px |
| Eyebrow mono | 11px, UPPERCASE | 400 | — | 0.6px |

Aturan:
- `h1–h6`, `strong`, `b`, `summary` dipaksa 400 di `globals.css`.
- Heading selalu `text-wrap: balance`.
- Eyebrow berbentuk kurung untuk hero: `(Studio website profil bisnis)`.

---

## 4. Ruang & Layout

- Container: `max-width 1340px`, gutter 24 / 48 / 64px (mobile / ≥768 / ≥1440).
- Padding section: 64 / 96 / 112px.
- Hero: `padding-top clamp(96px, 18vh, 200px)` — ruang kosong besar di atas headline;
  CTA wajib terlihat di layar pertama pada laptop 1366×768.
- Grid utilitas: `.grid-2 / .grid-3 / .grid-4`, gap 16 → 24 → 32px.
- Radius: 8px (tombol), 12px (kartu, panggung), 14px (kartu kaca), pill (tab/chip).
  Gambar kartu kategori **bersudut tegas** (radius 0).

---

## 5. Struktur Halaman & Elemen

Urutan (`app/page.tsx`) — disusun ulang Oktober 2026 untuk memangkas beban kognitif:
satu pertanyaan per section, bukti sebelum harga, satu jenis aksi.

| # | Section | Latar | Komponen | Pertanyaan yang dijawab |
|---|---|---|---|---|
| — | Navbar | putih | `Navbar.tsx` | — |
| 01 | Hero | cream | `Hero.tsx` | Ini apa? |
| 02 | Untuk siapa | foto → ink | `UntukSiapa.tsx` | Untuk bisnis saya? |
| 03 | Featured Project | ink | `Showcase.tsx` | Hasilnya seperti apa? |
| 04 | Harga | ink | `Harga.tsx` | Berapa? |
| 05 | Cara kerja | cream | `ProseKerja.tsx` | Prosesnya bagaimana? |
| 06 | FAQ | cream | `FAQ.tsx` | Keraguan tersisa |
| 07 | CTA penutup | foto tekstur | `CTAPenutup.tsx` | Mulai |
| — | Footer | ink | `Footer.tsx` | — |
| — | Form leads | modal | `LeadForm.tsx` | Dibuka oleh semua CTA |

Tidak dipakai lagi (file disimpan): `KategoriBisnis.tsx` (digabung ke Untuk siapa),
`Tentang.tsx` (kutipan pindah ke pembuka Harga), `Demo.tsx`, `Layanan.tsx`.

### Navbar
Logo mark gelombang + titik (34px, `logo-nav.png`) + wordmark dua baris
"Bersua Lab / Studio" (17px, 400, leading 1.1). Link tengah: Portofolio · Harga · FAQ
(scroll-spy, garis bawah saat aktif). CTA kanan "Konsultasi Gratis" (mobile:
"Konsultasi") → membuka form leads.

### Hero
Eyebrow kurung → headline besar regular dengan **reveal per kata** (mask naik,
jeda 70ms/kata) → tombol CTA. Tanpa paragraf pendukung.
Tombol hero: label **bergulir** saat hover + panah dalam lingkaran putih berputar
dari ↗ ke →, lapisan abu menyapu dari bawah, terangkat 2px.

### Untuk siapa
Foto full-bleed (`untuk-siapa-bg-2.webp`, 16:9) · judul gelap terpusat di area langit
("Untuk bisnis seperti apa Bersua bekerja?") · empat **kartu kaca melayang** (blur 18px,
`rgba(24,26,20,.38)`, tepi putih 18%) berisi **jenis bisnis**: ikon garis + nama + satu
kalimat konkret + "Lihat contoh →". Dua di kiri, dua di kanan menjauhi layar di foto.
Klik kartu **tidak** membuka WhatsApp: halaman bergulir ke Featured Project dan tab
yang relevan aktif (`selectShowcase(index)`): Supplier → Hayati · Jasa → Aruna ·
Brand → Gatra · Hospitality → Sakhia. Dasar foto memudar 32% ke `#1a1a1a`.
Tablet/mobile: foto jadi banner (3:2 / 4:5), kartu tersusun di bawahnya.

### Featured Project
Panggung berlatar gelap yang **tingginya mengikuti rasio gambar aktif** (padding-top %,
dianimasikan 0.7s) — tangkapan layar memenuhi panggung tanpa crop. Di bawah panggung:
nama + keputusan desain (kiri) · enam tab thumbnail dengan garis progres (kanan).
Ganti otomatis tiap 6 detik, jeda saat hover. Di HP baris tab digeser horizontal dan
tab aktif ikut digulir. Satu CTA "Konsultasi Gratis" di bawahnya (zona "sudah yakin").
Proyek: Gatra (batik) · Hayati House (greenhouse) · Aruna Energi (panel surya) ·
Sakhia (gorden) · Niken Ecoprint (fashion) · Freshville (sayuran B2B).

### Harga
Dibuka **kutipan founder** (slot `kicker` di `Section`), lalu judul kecil "Pilih solusi…".
Tiga kartu: Starter · **Business Website** (putih, "Recommended") · Custom.
Fitur ditulis dalam bahasa manfaat, dikelompokkan "Website / Mudah dihubungi /
Ditemukan & terukur / Termasuk". Gradient **Aurora**: kartu gelap = kilau biru & mint
pastel tipis di atas `#262829`; kartu utama = putih dengan rona biru & mint.
Hover: naik 5px, skala 1.03. CTA: "Pilih Paket" (Starter, Business) · "Konsultasi
Gratis" (Custom, harga "Hubungi Kami"). Di bawah kartu: catatan promo
("Harga coret adalah harga normal. Harga promo {PROMO_NAME} berlaku hingga
{PROMO_UNTIL}.") lalu blok "Punya kebutuhan yang spesifik?" + CTA.

### Cara kerja
Dua kolom: kiri = eyebrow mono "CARA KERJA", judul, sub, daftar lima tahap (yang aktif
berbingkai). Kanan = panel gradien cokelat hangat berisi kartu putih: "Tahap 0X", nama
tahap besar, satu kalimat, linimasa lima segmen. **Tanpa ganti otomatis** — pengunjung
memilih tahap. Mobile: panel disembunyikan, kalimat tampil di bawah tahap terbuka.

### FAQ
Accordion `<details>` CSS-only, pertanyaan 20px, jawaban abu, garis antar-item.

### CTA penutup
Latar foto tekstur abu horizontal (`cta-bg-landscape.jpg`) dengan lapisan gelap
35–55%, judul putih terpusat, satu tombol putih "Diskusikan Bisnis Anda".

### Form leads (`LeadForm.tsx`)
`<dialog>` modal (cream, radius 16px, backdrop blur) yang dibuka **semua** CTA lewat
`openLeadForm({ location, paket })` — menyaring leads sebelum WhatsApp.
Kolom: Nama Anda* · Nama bisnis* · Jenis bisnis* · Tertarik paket? (Starter /
Business Website dengan harga coret, Custom, Belum yakin) · Pesan (opsional).
Tombol "Lanjut ke WhatsApp" menyusun pesan berisi semua isian; kalimat pembuka
mengikuti tombol asal (konsultasi gratis / memilih paket X / mendiskusikan bisnis).
Paket otomatis terpilih bila dibuka dari "Pilih Paket". Tutup: ×, Esc, klik backdrop.

### Footer
Latar ink. Tiga kolom: logo putih (`logo-bersua-light.png`) · "Konsultasi & pertanyaan"
+ email + WhatsApp · navigasi rata kanan. Baris bawah: © tahun Bersua Lab Studio ·
ikon sosial kotak putih (Instagram, LinkedIn, TikTok, Behance).

---

## 6. Gerak & Interaksi

| Elemen | Efek | Durasi |
|---|---|---|
| Headline hero | Kata naik dari mask, berurutan | 1s, jeda 70ms |
| Tombol hero | Label bergulir, panah berputar, isi menyapu | 0.5s |
| Kartu kaca | Melayang ±8px | 7s loop |
| Featured Project | Crossfade + tinggi panggung + garis progres, auto 6s | 0.7–0.9s |
| Cara kerja | Kartu panel muncul saat tahap dipilih (tanpa auto) | 0.6s |
| Kartu harga | Naik + skala | 0.35s |
| Form leads | Muncul naik 16px | 0.4s |

Hanya **satu** elemen yang berganti otomatis (Featured Project). Easing standar:
`cubic-bezier(0.22, 1, 0.36, 1)`. Semua animasi dimatikan oleh `prefers-reduced-motion`.

Variasi tombol yang tersedia untuk dipilih ada di `/cta-lab` (internal, noindex, tidak
di-deploy): A Rolling Label · B Fill Sweep · C Editorial Link · D Circle · E Split Arrow ·
F Magnetic.

---

## 7. Copywriting

### Suara
Tenang, yakin, tanpa hype. Bahasa Indonesia baku-santai, menyapa **"Anda"**, Bersua
menyebut diri **"kami"**. Kalimat pendek, satu gagasan per kalimat. Fitur paket
ditulis sebagai manfaat dalam bahasa Indonesia ("Rapi di HP dan desktop", bukan
"Responsive design"). Hindari mengulang "sesuai kebutuhan bisnis Anda".

### Dilarang
- Angka hasil, testimoni, klaim peningkatan penjualan/konversi.
- "Berpengalaman", "spesialis", "sudah menangani".
- Kata "Portofolio", "Case Study", "Klien Kami" sebagai **judul section**
  (boleh sebagai label navigasi).
- Harga coret tanpa alasan & tanggal berakhir (REQ-C6.13).
- Label tombol yang menjanjikan halaman lain padahal membuka WhatsApp
  (mis. "Pelajari Selengkapnya").

### Label CTA (hanya tiga)
| Label | Dipakai di |
|---|---|
| Konsultasi Gratis | Navbar, hero, Featured Project, kartu Custom, blok konsultasi |
| Pilih Paket | Kartu Starter & Business Website |
| Diskusikan Bisnis Anda | CTA penutup |

### Naskah aktif

| Lokasi | Copy |
|---|---|
| Hero eyebrow | (Studio website profil bisnis) |
| Hero headline | Partner membangun website yang tepat untuk membantu bisnis Anda berkembang. |
| Untuk siapa | Untuk bisnis seperti apa Bersua bekerja? |
| — kartu | Supplier dan distributor · Jasa profesional · Brand dan produk · Hospitality dan properti |
| Featured Project | Featured Project — Bersua membantu bisnis membangun website dari konsep, desain, hingga siap digunakan sesuai dengan karakter dan kebutuhan bisnis Anda. |
| Harga — pembuka | "Di era ketika website semakin mudah dibuat, apakah website Anda benar-benar tepat untuk bisnis Anda?" — Rafif, Founder Bersua |
| Harga — judul | Pilih solusi yang sesuai kebutuhan bisnis Anda. |
| — Custom | Harga: **Hubungi Kami** |
| — promo | Harga promo **Oktober Growth** berlaku hingga **27 Oktober 2026** |
| — blok konsultasi | Punya kebutuhan yang spesifik? / Belum yakin website seperti apa yang tepat untuk bisnis Anda? |
| Cara kerja | Proses terstruktur untuk website yang tepat bagi bisnis Anda. |
| — tahap | Konsultasi · Riset · Strategi & Konten · Desain & Development · Launch & Optimization |
| FAQ | Yang biasanya ditanyakan. |
| CTA penutup | Saatnya membawa bisnis Anda bersaing di level global. |
| Form leads | Siap mulai project? — Isi form singkat ini, kami balas langsung via WhatsApp. |

### Pola chip keputusan (Featured Project)
`[Apa yang ditaruh di depan] — [alasan dari sudut pandang pembeli].`
Contoh: "Proses membatik jadi hero — harga premium perlu cerita pembuatannya."

### Pesan WhatsApp
Isi chat harus sama dengan tombol yang diklik. Semua CTA lewat form leads; pesan disusun
di `LeadForm.tsx`. Nilai terpusat di `app/lib/constants.ts`: `WA_NUMBER`, `CTA_LABEL`,
`CTA_CHOOSE`, `WA_DEFAULT` (cadangan tanpa JS), `PACKAGE_OPTIONS` (harga di form —
samakan dengan `Harga.tsx`), `PROMO_NAME`, `PROMO_UNTIL`.

### Tracking
`lead_form_open` saat form dibuka · `wa_click` (konversi, Meta "Contact") saat form
dikirim ke WhatsApp. Rasio keduanya = tingkat penyelesaian form.

---

## 8. Aset

| File | Dipakai di | Catatan |
|---|---|---|
| `img/logo-nav.png` | Navbar | Mark gelap transparan 128px |
| `img/logo-bersua-light.png` | Footer | Mark putih 400px |
| `favicon.ico`, `favicon-32x32.png`, `apple-touch-icon.png` | Tab & home screen | Mark putih di kotak hitam |
| `img/untuk-siapa-bg-2.webp` | Untuk siapa | 1672×941, 95KB |
| `img/cta-bg-landscape.jpg` | CTA penutup | 1308×736 |
| `img/porto-web/*.webp` | Featured Project | Tangkapan layar hero 1600px, sumber PNG di `img/Porto/` |

Sumber logo asli: `C:\Bersua\Logo\Logo Abstrak Gelombang dengan Titik.png` (PNG
transparan, mark putih). Versi gelap/putih dibuat dengan mewarnai ulang kanal alfanya.

Aturan gambar:
- File di `/img` di-cache setahun (`immutable`) — **ganti nama file** saat mengganti isi.
- Gambar yang sudah dioptimalkan disajikan `unoptimized` agar tidak dikompres dua kali.
- Konversi PNG besar ke WebP q82 sebelum dipakai.

---

## 9. Checklist sebelum menambah elemen baru

- [ ] Bobot huruf ≤ 400 (kecuali angka/nama di kartu harga).
- [ ] Tidak menambah garis divider antar-bagian.
- [ ] Teks di latar gelap ≥ 50% opasitas.
- [ ] Animasi memakai easing standar dan menghormati reduced-motion.
- [ ] Gambar tidak ter-crop berlebihan; file < 200KB bila memungkinkan.
- [ ] Copy lolos daftar larangan §7.
- [ ] Dicek di 1366×768, 1280, 768, dan 375px — tanpa scroll horizontal.
