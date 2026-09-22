"use client";

import Image from "next/image";
import Section from "./Section";
import { buildWALink } from "./CTAButton";
import { trackWAClick } from "@/app/lib/tracking";

/**
 * 02 · Kategori Bisnis — tanpa header. Kartunya yang bicara.
 *
 * Mengikuti komponen "Collaboration Project Card" di DESIGN (1).md:
 * gambar full-bleed mengisi kartu, radius 12px, tanpa border, tanpa shadow,
 * teks putih di-overlay pojok kiri atas (20px/600 nama, 14px/400 keterangan).
 *
 * Kartunya sengaja mulai terlihat dari layar pertama — hero dipendekkan ke
 * ~70svh supaya baris pertama kartu mengintip di bawah lipatan.
 *
 * Gambar: mockup device di dalam .kb-media via <Image fill />, di-crop ke
 * 16:10 (object-fit: cover). Overlay gelap (.kb-scrim) menjaga teks putih
 * tetap terbaca di atas foto yang cenderung terang.
 *
 * REQ-C2.4 — dilarang menambah "berpengalaman", "spesialis", atau
 * "sudah menangani" di sini.
 */
const kategori = [
  {
    num: "01",
    slug: "supplier",
    name: "Supplier & Distributor",
    img: "/img/supplier-distributor.webp",
    note: "Produk, kapasitas, dan jaringan distribusi.",
    untuk: ["Supplier", "Distributor", "Grosir", "Manufacturer", "Trading", "B2B product company"],
    alt: "Contoh halaman untuk supplier dan distributor",
  },
  {
    num: "02",
    slug: "jasa",
    name: "Jasa Profesional",
    img: "/img/Services.webp",
    note: "Layanan, keahlian, dan cara kerja.",
    untuk: ["Konsultan", "Kontraktor", "Agency", "Vendor", "Training", "Professional services"],
    alt: "Contoh halaman untuk jasa profesional",
  },
  {
    num: "03",
    slug: "brand",
    name: "Brand & Produk",
    img: "/img/bbrand.webp",
    note: "Produk yang ingin dikenal, ditemukan, dan dibeli.",
    untuk: ["F&B", "Fashion", "Skincare", "Coffee brand", "Consumer goods", "UMKM product"],
    alt: "Contoh halaman untuk brand dan bisnis produk",
  },
  {
    num: "04",
    slug: "hospitality",
    name: "Hospitality & Properti",
    img: "/img/Hospitality.webp",
    note: "Tempat, pengalaman, dan informasi untuk calon pengunjung.",
    untuk: ["Hotel", "Villa", "Resort", "Homestay", "Property developer", "Real estate"],
    alt: "Contoh halaman untuk hospitality dan properti",
  },
];

/* Pesan WA pre-filled per kategori — nama kategori ikut terkirim (REQ-W3) */
const waMessage = (name: string) =>
  `Halo Bersua, saya tertarik membuat website untuk bisnis ${name}. Bisnis saya bergerak di bidang ____`;

export default function KategoriBisnis() {
  return (
    <Section id="kategori" track="kategori_bisnis" className="kb-sec">
      <div className="grid-2">
        {kategori.map((k, i) => (
          <a
            key={k.name}
            href={buildWALink(waMessage(k.name))}
            target="_blank"
            rel="noopener noreferrer"
            className="kb-card"
            onClick={() => trackWAClick(`kategori_${k.slug}`)}
            aria-label={`${k.name} — konsultasi via WhatsApp`}
          >
            <div className="kb-media">
              <Image
                src={k.img}
                alt={k.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 640px"
                /* Dua kartu pertama mengintip di layar pertama — kandidat LCP */
                priority={i < 2}
                className="kb-img"
              />
              <span className="kb-scrim" aria-hidden="true" />
              <div className="kb-overlay">
                <h3 className="kb-name">
                  <span className="kb-num">{k.num}</span>
                  <span className="kb-dash" aria-hidden="true">—</span>
                  {k.name}
                </h3>
                <p className="kb-note">{k.note}</p>
              </div>
              <div className="kb-for">
                <p className="kb-for-label">Untuk:</p>
                <ul className="kb-tags">
                  {k.untuk.map((u) => (
                    <li key={u} className="kb-tag">{u}</li>
                  ))}
                </ul>
              </div>
              <span className="kb-arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </a>
        ))}
      </div>

      <style>{`
        /* Section tanpa header: jarak atas dipangkas supaya kartu mengintip
           dari layar pertama, seperti referensi. */
        .kb-sec { padding-top: var(--spacing-16); }

        @media (min-width: 768px) {
          .kb-sec { padding-top: var(--spacing-24); }
        }

        .kb-card {
          display: block;
          text-decoration: none;
          color: inherit;
          border-radius: var(--radius-xl);
          transition: transform 0.35s cubic-bezier(0.2, 0.7, 0.2, 1);
          -webkit-tap-highlight-color: transparent;
        }

        .kb-card:hover { transform: translateY(-4px); }

        .kb-card:focus-visible {
          outline: 2px solid var(--color-studio-ink);
          outline-offset: 4px;
        }

        /* 4:5 mengikuti proporsi mockup (portrait 3:4 & persegi 1:1) —
           gambar hampir utuh, tanpa letterbox */
        .kb-media {
          position: relative;
          aspect-ratio: 4 / 5;
          border-radius: var(--radius-xl);
          overflow: hidden;
          background-color: var(--color-studio-ink);
        }

        .kb-img {
          object-fit: cover;
          object-position: center;
          transition: transform 0.6s cubic-bezier(0.2, 0.7, 0.2, 1);
        }

        .kb-card:hover .kb-img { transform: scale(1.04); }

        /* Penjaga keterbacaan teks putih di atas foto */
        .kb-scrim {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.28) 0%,
            rgba(0, 0, 0, 0) 32%,
            rgba(0, 0, 0, 0) 52%,
            rgba(0, 0, 0, 0.42) 100%
          );
        }

        .kb-overlay {
          position: absolute;
          top: var(--spacing-24);
          left: var(--spacing-24);
          right: var(--spacing-24);
        }

        .kb-name {
          font-size: var(--text-subheading);
          line-height: var(--leading-subheading);
          letter-spacing: var(--tracking-subheading);
          font-weight: var(--weight-medium);
          color: var(--color-card-white);
        }

        .kb-num {
          font-variant-numeric: tabular-nums;
          opacity: 0.7;
        }

        .kb-dash {
          margin-inline: 8px;
          opacity: 0.5;
        }

        .kb-note {
          margin-top: 2px;
          font-size: var(--text-caption);
          line-height: var(--leading-caption);
          letter-spacing: var(--tracking-caption);
          font-weight: 400;
          color: rgba(255, 255, 255, 0.75);
        }

        /* "Untuk:" + tag pil — pojok kiri bawah */
        .kb-for {
          position: absolute;
          left: var(--spacing-24);
          right: 84px; /* ruang untuk tombol panah */
          bottom: var(--spacing-24);
          display: flex;
          flex-direction: column;
          gap: var(--spacing-8);
        }

        /* Tombol panah — pojok kanan bawah, seperti referensi */
        .kb-arrow {
          position: absolute;
          right: var(--spacing-24);
          bottom: var(--spacing-24);
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background-color: var(--color-card-white);
          color: var(--color-studio-ink);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.35s cubic-bezier(0.2, 0.7, 0.2, 1);
        }

        .kb-card:hover .kb-arrow { transform: translate(2px, -2px); }

        .kb-for-label {
          font-size: var(--text-caption);
          line-height: var(--leading-caption);
          letter-spacing: var(--tracking-caption);
          font-weight: 500;
          color: rgba(255, 255, 255, 0.6);
        }

        .kb-tags {
          list-style: none;
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .kb-tag {
          font-size: var(--text-caption);
          line-height: 1;
          letter-spacing: var(--tracking-caption);
          font-weight: 500;
          color: var(--color-card-white);
          padding: 7px 12px;
          border-radius: var(--radius-pill);
          background-color: rgba(255, 255, 255, 0.16);
          white-space: nowrap;
        }

        @media (max-width: 640px) {
          .kb-media { aspect-ratio: 4 / 5; }
          .kb-overlay { top: var(--spacing-16); left: var(--spacing-16); right: var(--spacing-16); }
          .kb-for { left: var(--spacing-16); right: 68px; bottom: var(--spacing-16); }
          .kb-arrow { right: var(--spacing-16); bottom: var(--spacing-16); width: 40px; height: 40px; }
          .kb-tag { padding: 6px 10px; font-size: 12px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .kb-card, .kb-img { transition: none; }
          .kb-card:hover { transform: none; }
          .kb-card:hover .kb-img { transform: none; }
          .kb-card:hover .kb-arrow { transform: none; }
        }
      `}</style>
    </Section>
  );
}
