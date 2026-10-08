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

Urutan (`app/page.tsx`):

| # | Section | Latar | Komponen |
|---|---|---|---|
| — | Navbar | putih | `Navbar.tsx` |
| 01 | Hero | cream | `Hero.tsx` |
| 02 | Kategori bisnis | cream | `KategoriBisnis.tsx` |
| 03 | Untuk siapa | foto → ink | `UntukSiapa.tsx` |
| 04 | Featured Project | ink | `Showcase.tsx` |
| 05 | Founder quote | ink | `Tentang.tsx` |
| 06 | Harga | ink | `Harga.tsx` |
| 07 | Cara kerja | cream | `ProseKerja.tsx` |
| 08 | FAQ | cream | `FAQ.tsx` |
| 09 | CTA penutup | foto tekstur | `CTAPenutup.tsx` |
| — | Footer | ink | `Footer.tsx` |

### Navbar
Logo mark gelombang + titik (34px, `logo-nav.png`) + wordmark dua baris
"Bersua Lab / Studio" (17px, 400, leading 1.1). Link tengah: Portofolio · Harga · FAQ
(scroll-spy, garis bawah saat aktif). CTA kanan "Hubungi Kami". Mobile: satu baris,
wordmark disembunyikan, CTA jadi "Hubungi".

### Hero
Eyebrow kurung → headline besar regular dengan **reveal per kata** (mask naik,
jeda 70ms/kata) → tombol CTA. Tanpa paragraf pendukung.
Tombol hero: label **bergulir** saat hover + panah dalam lingkaran putih berputar
dari ↗ ke →, lapisan abu menyapu dari bawah, terangkat 2px.

### Kategori bisnis
Grid 2 kolom kartu portofolio editorial: gambar 4:5 bersudut tegas tanpa overlay,
lalu satu baris keterangan — nama kiri (ink, 16–18px) · jenis bisnis kanan (abu 32%,
rata kanan). Hover: gambar zoom 1.03, keterangan kanan menggelap.

### Untuk siapa
Foto full-bleed (`untuk-siapa-bg-2.webp`, 16:9) · judul gelap terpusat di area langit ·
empat **kartu kaca melayang** (blur 18px, `rgba(24,26,20,.38)`, tepi putih 18%), dua
di kiri & dua di kanan menjauhi layar di foto, bergerak naik-turun pelan.
Dasar foto memudar 32% ke `#1a1a1a` supaya menyatu dengan Featured Project.
Tablet/mobile: foto jadi banner (3:2 / 4:5), kartu tersusun di bawahnya.

### Featured Project
Panggung 16:9 (4:3 tablet, 4:5 mobile) berlatar gelap: mockup utuh (`contain`) di depan,
salinan blur sebagai latar. Dua chip kaca kiri atas (nama bisnis + keputusan desain).
Tab thumbnail tengah bawah dengan garis progres; ganti otomatis tiap 6 detik,
jeda saat hover, bisa diklik.

### Founder quote
Satu kolom tanpa foto: tanda kutip besar redup → kutipan putih → nama & peran.

### Harga
Tiga kartu: Starter · **Business Website** (putih, "Recommended") · Custom.
Gradient **Aurora**: kartu gelap = kilau biru & mint pastel sangat tipis di atas
`#262829`; kartu utama = putih dengan rona biru kanan-atas & mint kiri-bawah.
Kartu gelap diberi garis tepi dalam 1px putih 7%. Hover: naik 5px, skala 1.03.
Di bawah kartu: blok konsultasi dua baris + tombol WhatsApp.

### Cara kerja
Dua kolom ala dashboard: kiri = eyebrow mono "CARA KERJA", judul, sub, lalu daftar
lima tahap (accordion, satu terbuka berbingkai + garis progres). Kanan = panel gradien
cokelat hangat berisi kartu putih: "Tahap 0X", nama tahap besar, satu kalimat,
tiga hasil bercentang, linimasa lima segmen. Ganti otomatis tiap 6 detik.
Mobile: panel disembunyikan.

### FAQ
Accordion `<details>` CSS-only, pertanyaan 20px, jawaban abu, garis antar-item.

### CTA penutup
Latar foto tekstur abu horizontal (`cta-bg-landscape.jpg`) dengan lapisan gelap
35–55%, judul putih terpusat, satu tombol putih.

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
| Kartu kategori | Zoom gambar | 0.8s |
| Kartu kaca | Melayang ±8px | 7s loop |
| Showcase / Cara kerja | Crossfade + garis progres, auto 6s, jeda saat hover | 0.6–0.9s |
| Kartu harga | Naik + skala | 0.35s |

Easing standar: `cubic-bezier(0.22, 1, 0.36, 1)`. Semua animasi dimatikan oleh
`prefers-reduced-motion` (aturan global di `globals.css` + per komponen).

Variasi tombol yang tersedia untuk dipilih ada di `/cta-lab` (internal, noindex):
A Rolling Label · B Fill Sweep · C Editorial Link · D Circle · E Split Arrow · F Magnetic.

---

## 7. Copywriting

### Suara
Tenang, yakin, tanpa hype. Bahasa Indonesia baku-santai, menyapa **"Anda"**, Bersua
menyebut diri **"kami"**. Kalimat pendek, satu gagasan per kalimat. Istilah teknis
Inggris boleh untuk nama fitur/paket (Responsive design, SEO foundation).

### Dilarang
- Angka hasil, testimoni, klaim peningkatan penjualan/konversi.
- "Berpengalaman", "spesialis", "sudah menangani".
- Kata "Portofolio", "Case Study", "Klien Kami" sebagai **judul section**
  (boleh sebagai label navigasi).
- Lebih dari satu label CTA utama — semua tombol utama: **"Konsultasi Gratis"**.

### Naskah aktif

| Lokasi | Copy |
|---|---|
| Hero eyebrow | (Studio website profil bisnis) |
| Hero headline | Partner membangun website yang tepat untuk membantu bisnis Anda berkembang. |
| CTA utama | Konsultasi Gratis |
| CTA navbar | Hubungi Kami |
| Untuk siapa | Dibangun untuk bisnis yang ingin bergerak lebih jauh. |
| — kartu | Menjangkau pasar global · Membangun kredibilitas sejak awal · Naik kelas · Membuka peluang baru |
| Featured Project — sub | Bersua membantu bisnis membangun website dari konsep, desain, hingga siap digunakan sesuai dengan karakter dan kebutuhan bisnis Anda. |
| Founder | "Di era ketika website semakin mudah dibuat, apakah website Anda benar-benar tepat untuk bisnis Anda?" — Rafif, Founder, Bersua |
| Harga | Pilih solusi yang sesuai kebutuhan bisnis Anda. |
| — Custom | Harga: **Hubungi Kami** |
| — blok konsultasi | Punya kebutuhan yang spesifik? / Belum yakin website seperti apa yang tepat untuk bisnis Anda? |
| Cara kerja | Proses terstruktur untuk website yang tepat bagi bisnis Anda. |
| — tahap | Konsultasi · Riset · Strategi & Konten · Desain & Development · Launch & Optimization |
| FAQ | Yang biasanya ditanyakan. |
| CTA penutup | Saatnya membawa bisnis Anda bersaing di level global. |

### Pola chip keputusan (Featured Project)
`[Apa yang ditaruh di depan] — [alasan dari sudut pandang pembeli].`
Contoh: "Proses membatik jadi hero — harga premium perlu cerita pembuatannya."

### Pesan WhatsApp
Semua CTA memakai `WA_DEFAULT` di `app/lib/constants.ts` (format bintang tunggal untuk
tebal di WhatsApp). Nomor, domain, dan label CTA hanya diubah di file itu.

---

## 8. Aset

| File | Dipakai di | Catatan |
|---|---|---|
| `img/logo-nav.png` | Navbar | Mark gelap transparan 128px |
| `img/logo-bersua-light.png` | Footer | Mark putih 400px |
| `favicon.ico`, `favicon-32x32.png`, `apple-touch-icon.png` | Tab & home screen | Mark putih di kotak hitam |
| `img/untuk-siapa-bg-2.webp` | Untuk siapa | 1672×941, 95KB |
| `img/cta-bg-landscape.jpg` | CTA penutup | 1308×736 |
| `img/*.webp` (supplier, Services, bbrand, Hospitality) | Kategori & Showcase | Disajikan `unoptimized` |

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
