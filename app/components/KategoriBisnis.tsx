"use client";

import Image from "next/image";
import Section from "./Section";
import { buildWALink } from "./CTAButton";
import { trackWAClick } from "@/app/lib/tracking";
import { WA_DEFAULT } from "@/app/lib/constants";

/**
 * 02 · Kategori Bisnis — tanpa header. Kartunya yang bicara.
 *
 * Gaya kartu portofolio editorial: gambar 4:5 bersudut tegas tanpa
 * overlay, lalu satu baris keterangan di bawahnya — nama di kiri (ink,
 * regular), kategori di kanan (abu, regular).
 *
 * Kartunya sengaja mulai terlihat dari layar pertama — hero dipendekkan ke
 * ~70svh supaya baris pertama kartu mengintip di bawah lipatan.
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

export default function KategoriBisnis() {
  return (
    <Section id="kategori" track="kategori_bisnis" className="kb-sec">
      <div className="grid-2">
        {kategori.map((k, i) => (
          <a
            key={k.name}
            href={buildWALink(WA_DEFAULT)}
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
                /* File sumber sudah WebP terkompresi & berukuran web (~1250px).
                   Dikompres ulang oleh optimizer membuatnya buram — sajikan apa adanya. */
                unoptimized
              />
            </div>
            <div className="kb-caption">
              <h3 className="kb-name">{k.name}</h3>
              <p className="kb-note">{k.untuk.slice(0, 3).join(", ")}</p>
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

        /* Jarak antar-baris lebih lega karena keterangan kini di bawah gambar */
        .kb-sec .grid-2 { row-gap: clamp(40px, 5vw, 72px); }

        .kb-card {
          display: block;
          text-decoration: none;
          color: inherit;
          -webkit-tap-highlight-color: transparent;
        }

        .kb-card:focus-visible {
          outline: 2px solid var(--color-studio-ink);
          outline-offset: 4px;
        }

        /* Gambar bersudut tegas, tanpa overlay — mengikuti referensi.
           4:5 mendekati proporsi mockup asli (persegi 1:1 & potret ~3:4),
           jadi crop-nya minimal dan device tetap utuh. */
        .kb-media {
          position: relative;
          aspect-ratio: 4 / 5;
          overflow: hidden;
          background-color: var(--color-ink-08);
        }

        .kb-img {
          object-fit: cover;
          object-position: center;
          border-radius: 0;
          transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .kb-card:hover .kb-img { transform: scale(1.03); }

        /* Keterangan di bawah gambar: nama kiri (ink), kategori kanan (abu) */
        .kb-caption {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: var(--spacing-16);
          padding-top: var(--spacing-16);
        }

        .kb-name {
          font-size: clamp(16px, 1.3vw, 18px);
          line-height: 1.4;
          letter-spacing: -0.2px;
          font-weight: 400;
          color: var(--color-studio-ink);
          white-space: nowrap;
        }

        .kb-note {
          font-size: clamp(14px, 1.2vw, 17px);
          line-height: 1.4;
          letter-spacing: -0.2px;
          font-weight: 400;
          color: rgba(26, 26, 26, 0.32);
          text-align: right;
        }

        .kb-card:hover .kb-note { color: var(--color-ink-60); }
        .kb-note { transition: color 0.3s ease; }

        @media (max-width: 640px) {
          .kb-caption { flex-direction: column; gap: 2px; padding-top: 12px; }
          .kb-note { text-align: left; }
        }

        @media (prefers-reduced-motion: reduce) {
          .kb-img { transition: none; }
          .kb-card:hover .kb-img { transform: none; }
        }
      `}</style>
    </Section>
  );
}
