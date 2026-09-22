# Design System — Bersua LP
> Referensi desain aktif. Semua token di bawah mencerminkan nilai yang diterapkan di `globals.css`.
> Style direction: Apple (España) — editorial white space, oversized typography, near-monochrome palette, single accent.

---

## 1. Color Tokens

Token warna berikut sudah terdaftar di `:root` pada `globals.css` dan merupakan **satu-satunya** nilai warna yang boleh digunakan di seluruh komponen.

### Surface & Background

| Token | Value | Peran |
|-------|-------|-------|
| `--color-cream-paper` | `#f8f8f2` | Background default halaman (body) — canvas utama |
| `--color-card-white` | `#ffffff` | Permukaan kartu, section bergantian, navbar |

> **Prinsip Apple:** section bergantian antara `--color-cream-paper` dan `--color-card-white` tanpa divider. Perbedaan warna latar cukup sebagai pemisah visual.

### Foreground & Text

| Token | Value | Peran |
|-------|-------|-------|
| `--color-studio-ink` | `#1a1a1a` | Teks utama, heading, icon, border aktif |
| `--color-deep-black` | `#000000` | Cadangan — dipakai hanya jika kontras tertinggi dibutuhkan |
| `--color-ink-60` | `rgba(26,26,26,0.60)` | Teks sekunder, body copy muted, metadata |
| `--color-ink-20` | `rgba(26,26,26,0.20)` | Placeholder, teks disabled, dekorasi ringan |
| `--color-ink-08` | `rgba(26,26,26,0.08)` | Border hairline, divider, background subtle |

### Accent (Gunakan Sparingly)

| Token | Value | Peran |
|-------|-------|-------|
| `--color-powder-blue` | `#bedbff` | Aksen dingin — highlight, tag, badge informational |
| `--color-mint-wash` | `#a4f4cf` | Aksen hijau — tag sukses, indikator positif |
| `--color-blush-tint` | `#ffc9c9` | Aksen merah muda — peringatan ringan, tag perhatian |
| `--color-signal-green` | `#00c950` | Status aktif / live — gunakan hanya untuk indikator boolean |

> **Aturan Apple:** warna aksen **tidak pernah** dipakai sebagai dekorasi UI. Satu warna per fungsi. Jangan menumpuk beberapa aksen dalam satu section.

### Reference — Apple Style Palette (tidak dipakai langsung di CSS)

Nilai-nilai ini adalah referensi arah visual yang menginspirasi sistem Bersua:

| Nama Apple | Value | Padanan Bersua |
|------------|-------|----------------|
| Primary Ink | `#1d1d1f` | `--color-studio-ink` (#1a1a1a) |
| Canvas | `#f5f5f7` | `--color-cream-paper` (#f8f8f2) |
| Paper | `#ffffff` | `--color-card-white` |
| Mid Gray | `#707070` | `--color-ink-60` |
| Hairline | `#d6d6d6` | `--color-ink-08` |
| Electric Blue | `#0071e3` | — (belum ada token; gunakan `--color-studio-ink` untuk CTA) |
| Link Blue | `#0066cc` | — |

---

## 2. Typography Tokens

Font: **Inter Variable** (via `@fontsource-variable/inter`). Tidak ada font lain yang diizinkan.

```
--font-sans: 'Inter Variable', 'Inter', system-ui, -apple-system, sans-serif;
```

### Type Scale

| Role | Token Size | Token Leading | Token Tracking | Dipakai untuk |
|------|-----------|---------------|----------------|---------------|
| caption | `--text-caption` · 14px | `--leading-caption` · 1.43 | `--tracking-caption` · -0.35px | Label kecil, metadata, footnote |
| body | `--text-body` · 16px | `--leading-body` · 1.5 | `--tracking-body` · -0.4px | Body copy utama, FAQ answer, deskripsi |
| subheading | `--text-subheading` · 20px | `--leading-subheading` · 1.4 | `--tracking-subheading` · -0.5px | Card title, FAQ question, tier name |
| heading | `--text-heading` · 30px | `--leading-heading` · 1.2 | `--tracking-heading` · -0.75px | Section heading minimum |
| heading-lg | `--text-heading-lg` · 48px | `--leading-heading-lg` · 1.2 | `--tracking-heading-lg` · -1.2px | Section heading maksimum (clamp target) |
| display | `--text-display` · 88px | `--leading-display` · 1 | `--tracking-display` · -2.2px | Hero headline |
| display-xl | `--text-display-xl` · 96px | `--leading-display-xl` · 1 | `--tracking-display-xl` · -2.4px | Hero headline XL (desktop lebar) |

### Section Heading (`.sec-heading`)

```css
font-size: clamp(var(--text-heading), 3.2vw, var(--text-heading-lg));
/* = clamp(30px, 3.2vw, 48px) */
line-height: var(--leading-heading-lg);   /* 1.2 */
letter-spacing: var(--tracking-heading-lg); /* -1.2px */
font-weight: 700;
text-wrap: balance;
```

### Founder Quote (`.founder-quote`)

```css
font-size: clamp(28px, 3.2vw, 46px);
font-weight: 500;
line-height: 1.2;
letter-spacing: -0.02em;
```

> **Prinsip Apple:** headline harus terasa oversized. Jangan turunkan font-weight di bawah 500 untuk heading. Body copy standar di 16px dengan -0.4px tracking untuk ketajaman.

### Font Weight yang Diizinkan

| Weight | Digunakan untuk |
|--------|----------------|
| 400 | Body copy, deskripsi, metadata |
| 500 | Emphasized body, quote, subheading ringan |
| 600 | Card title, identity name, CTA label |
| 700 | Section heading, display, nomor harga |

---

## 3. Spacing Tokens

Base unit: **8px**.

| Token | Value | Contoh penggunaan |
|-------|-------|-------------------|
| `--spacing-8` | 8px | Gap ikon–label, padding tag |
| `--spacing-16` | 16px | Gap antar elemen dalam satu grup |
| `--spacing-24` | 24px | Padding card compact, gap list |
| `--spacing-32` | 32px | Padding card standar, gap section-internal |
| `--spacing-40` | 40px | Margin bawah sec-head, padding-top sec-body |
| `--spacing-48` | 48px | Padding inline section desktop |
| `--spacing-64` | 64px | Section padding-block mobile |
| `--spacing-96` | 96px | Section padding-block tablet |
| `--spacing-112` | 112px | Section padding-block desktop |
| `--spacing-176` | 176px | Cadangan — offset besar |

---

## 4. Border Radius Tokens

| Token | Value | Dipakai untuk |
|-------|-------|---------------|
| `--radius-lg` | 8px | Button primary, button inverted |
| `--radius-xl` | 12px | Kartu harga, gambar, foto founder |
| `--radius-3xl` | 24px | Kartu besar, panel featured |
| `--radius-pill` | 9999px | Tag pill, toggle tab |

> **Jangan** menambah radius baru. Pilih dari empat nilai di atas.

---

## 5. Layout

| Properti | Value | Token / Catatan |
|----------|-------|-----------------|
| Max width | 1340px | `--max-width` |
| Section gap | 96px | `--section-gap` |
| Card padding | 32px | `--card-padding` |
| Navbar height | 60px desktop / 120px mobile | `--nav-height` |
| Section padding inline (mobile) | 24px | `--spacing-24` |
| Section padding inline (tablet) | 48px | `--spacing-48` |
| Section padding inline (desktop 1440+) | 64px | `--spacing-64` |

### Grid System

| Class | Kolom | Breakpoint responsif |
|-------|-------|----------------------|
| `.grid-4` | 4 kolom | → 2 kolom di ≤1100px → 1 kolom di ≤640px |
| `.grid-3` | 3 kolom | → 2 kolom di ≤900px → 1 kolom di ≤640px |
| `.grid-2` | 2 kolom | → 1 kolom di ≤640px |

Gap default: `--spacing-16` → `--spacing-24` di ≥1024px → `--spacing-32` di ≥1280px.

---

## 6. Components

### Button Primary (`.btn-primary`)
- Background: `--color-studio-ink`
- Text: `--color-card-white`
- Radius: `--radius-lg` (8px)
- Size: `--text-body` / weight 500 / min-height 48px
- Padding: 14px `--spacing-32`

### Button Inverted (`.btn-primary-inverted`)
- Background: `--color-card-white`
- Text: `--color-studio-ink`
- Radius: `--radius-lg` (8px)
- Dipakai di section surface `ink` (dark background)

### Section Frame
Setiap section menggunakan skeleton:
```
[heading] → [sub] → [konten]
```
- `.sec-head` — max-width 680px, margin-bottom `--spacing-40`
- `.sec-heading` — clamp(30px, 3.2vw, 48px), weight 700
- `.sec-sub` — `--text-body`, max-width 560px, color muted
- `.sec-body` — border-top 1px + padding-top `--spacing-40`

### FAQ Accordion (`details.faq-item`)
- Question: `--text-subheading` / weight 500
- Answer: `--text-body` / color `--color-ink-60` / max-width 640px
- Separator: 1px `--color-ink-08`
- Width: penuh container (tanpa max-width pembatas)

---

## 7. Surface System

| Surface | Background | Text | Muted | Rule |
|---------|-----------|------|-------|------|
| `cream` (default) | `--color-cream-paper` | `--color-studio-ink` | `--color-ink-60` | `--color-ink-08` |
| `white` | `--color-card-white` | `--color-studio-ink` | `--color-ink-60` | `--color-ink-08` |
| `ink` | `--color-studio-ink` | `--color-card-white` | `rgba(255,255,255,0.6)` | `rgba(255,255,255,0.12)` |

Section bergantian `cream` → `white` → `cream` sebagai pengganti divider (prinsip Apple).

---

## 8. Do's and Don'ts

### Do
- Gunakan `clamp()` untuk heading agar responsif tanpa breakpoint tambahan.
- Bergantian surface `cream` / `white` antar section sebagai pemisah visual.
- Batasi aksen warna — satu fungsi, satu warna.
- Gunakan `text-wrap: balance` pada heading untuk baris yang rapi.
- Terapkan `--tracking-*` yang sesuai per ukuran — tracking negatif pada display, sedikit negatif pada body.
- Gunakan whitespace generously — section harus "breathing".

### Don't
- Jangan tambah font baru. Inter sudah cukup.
- Jangan tambah shadow pada kartu. Sistem ini flat.
- Jangan gunakan lebih dari 3 font weight dalam satu section.
- Jangan center body paragraph. Heading boleh center, deskripsi multi-baris left-align.
- Jangan tambah warna aksen baru tanpa token di `globals.css`.
- Jangan gunakan border radius di luar empat nilai yang ada.
- Jangan buat section label (number · label) — sudah dihapus dari `Section.tsx`.
