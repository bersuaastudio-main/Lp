"use client";

import Image from "next/image";
import { selectShowcase } from "./Showcase";

/**
 * 02 · Untuk Siapa — gabungan section Kategori + Untuk Siapa.
 * Gaya: foto full-bleed + judul terpusat + empat kartu kaca melayang
 * di kiri-kanan subjek (pola hero "Superhuman").
 *
 * Tiap kartu = satu jenis bisnis + satu kalimat konkret tentang apa yang dicari
 * pembelinya. Klik kartu TIDAK membuka WhatsApp: halaman bergulir ke Featured
 * Project dan tab portofolio yang relevan langsung aktif (`selectShowcase`).
 */

/* Ikon garis sederhana, viewBox 24 — stroke mengikuti currentColor */
const ICONS: Record<string, React.ReactNode> = {
  supplier: (
    <>
      <path d="M2.5 6.5h11v9h-11z" />
      <path d="M13.5 9.5h4l3 3.2v2.8h-7" />
      <circle cx="6.5" cy="17" r="1.8" />
      <circle cx="16.5" cy="17" r="1.8" />
    </>
  ),
  jasa: (
    <>
      <rect x="3" y="7" width="18" height="12.5" rx="2" />
      <path d="M9 7V5.2C9 4.5 9.5 4 10.2 4h3.6c.7 0 1.2.5 1.2 1.2V7" />
      <path d="M3 12.5h18" />
    </>
  ),
  brand: (
    <>
      <path d="M5.5 8h13l-1 12h-11z" />
      <path d="M9 8V6.8a3 3 0 0 1 6 0V8" />
    </>
  ),
  hospitality: (
    <>
      <path d="M4 20.5V5.5L12 3l8 2.5v15" />
      <path d="M2.5 20.5h19" />
      <path d="M8.5 9h1.5M14 9h1.5M8.5 13h1.5M14 13h1.5M10.5 20.5v-3.5h3v3.5" />
    </>
  ),
};

/* `tab` = indeks portofolio di Showcase yang dibuka saat kartu diklik */
const jenis = [
  {
    id: "supplier-distributor",
    icon: "supplier",
    lead: "Supplier dan distributor",
    body: "Pembeli grosir memeriksa kapasitas, legalitas, dan jangkauan Anda sebelum menghubungi.",
    tab: 1, // Hayati House
  },
  {
    id: "jasa-profesional",
    icon: "jasa",
    lead: "Jasa profesional",
    body: "Klien membeli keahlian dan cara kerja — keduanya perlu terlihat sebelum percakapan dimulai.",
    tab: 2, // Aruna Energi
  },
  {
    id: "brand-produk",
    icon: "brand",
    lead: "Brand dan produk",
    body: "Harga premium perlu cerita di balik produknya, bukan sekadar katalog.",
    tab: 0, // Gatra
  },
  {
    id: "hospitality-properti",
    icon: "hospitality",
    lead: "Hospitality dan properti",
    body: "Tamu memesan suasana — foto dan lokasi harus meyakinkan sejak layar pertama.",
    tab: 3, // Sakhia
  },
];

export default function UntukSiapa() {
  return (
    <section id="untuk-siapa" data-track-section="untuk_siapa" className="us-sec">
      <div className="us-stage">
        <Image
          src="/img/untuk-siapa-bg-2.webp"
          alt=""
          fill
          sizes="100vw"
          unoptimized /* WebP 1672px, 95KB — sudah dioptimalkan */
          className="us-bg"
        />

        <header className="us-heading-wrap">
          <h2 className="us-heading">Untuk bisnis seperti apa Bersua bekerja?</h2>
        </header>

        <div className="us-floats">
          {jenis.map((k, i) => (
            <a
              key={k.id}
              id={k.id}
              href="#contoh"
              className={`us-card us-pos-${i + 1}`}
              onClick={(e) => {
                e.preventDefault();
                selectShowcase(k.tab);
              }}
            >
              <div className="us-card-head">
                <span className="us-icon-wrap">
                  <svg className="us-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    {ICONS[k.icon]}
                  </svg>
                </span>
                <p className="us-lead">{k.lead}</p>
              </div>
              <p className="us-body">{k.body}</p>
              <span className="us-link">
                Lihat contoh
                <svg viewBox="0 0 14 14" width="12" height="12" fill="none" aria-hidden="true">
                  <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
          ))}
        </div>
      </div>

      <style>{`
        .us-sec {
          position: relative;
          background: var(--color-studio-ink); /* sama dengan section Showcase di bawahnya */
          color: var(--color-card-white);
        }

        .us-stage {
          position: relative;
          height: clamp(600px, 56.25vw, 1000px);
          overflow: hidden;
        }

        .us-bg {
          object-fit: cover;
          object-position: center 62%;
          border-radius: 0;
        }

        /* Judul di area langit yang terang — teks gelap */
        .us-heading-wrap {
          position: relative;
          z-index: 1;
          padding: calc(clamp(40px, 4.5vw, 72px) - 8px) var(--spacing-24) 0; /* dinaikkan 8px */
          text-align: center;
        }

        .us-heading {
          margin-inline: auto;
          max-width: 13em;
          font-size: clamp(30px, 3.6vw, 56px);
          line-height: 1.05;
          letter-spacing: -0.035em;
          color: var(--color-studio-ink);
          text-wrap: balance;
        }

        /* ── Kartu kaca melayang ── */
        /* Gradasi di dasar foto: hitam rumput → ink, menyatu ke section berikutnya */
        .us-stage::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 32%;
          pointer-events: none;
          background: linear-gradient(
            180deg,
            rgba(26, 26, 26, 0) 0%,
            rgba(26, 26, 26, 0.55) 45%,
            rgba(26, 26, 26, 0.9) 75%,
            #1a1a1a 100%
          );
        }

        .us-floats {
          z-index: 2;
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .us-card {
          position: absolute;
          width: clamp(240px, 19vw, 300px);
          padding: 18px 20px 20px;
          border-radius: 14px;
          background: rgba(24, 26, 20, 0.38);
          border: 1px solid rgba(255, 255, 255, 0.18);
          backdrop-filter: blur(18px) saturate(1.2);
          -webkit-backdrop-filter: blur(18px) saturate(1.2);
          box-shadow: 0 20px 40px -20px rgba(0, 0, 0, 0.45);
          pointer-events: auto;
          scroll-margin-top: calc(var(--nav-height) + 16px);
          animation: us-float 7s ease-in-out infinite;
        }

        /* Posisi: dua di kiri, dua di kanan — menjauhi layar & sosok di tengah */
        .us-pos-1 { left: 3%;  top: 34%; }
        .us-pos-2 { left: 5%;  top: 64%; animation-delay: -2.5s; }
        .us-pos-3 { right: 3%; top: 32%; animation-delay: -1.2s; }
        .us-pos-4 { right: 5%; top: 62%; animation-delay: -4s; }

        @keyframes us-float {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-8px); }
        }

        .us-card-head {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
        }

        .us-icon-wrap {
          flex-shrink: 0;
          width: 30px;
          height: 30px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.14);
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .us-icon {
          width: 18px;
          height: 18px;
          fill: none;
          stroke: currentColor;
          stroke-width: 1.6;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        /* Kartu = tautan ke contoh portofolio */
        a.us-card {
          display: block;
          text-decoration: none;
          color: inherit;
          cursor: pointer;
          transition: background-color 0.25s ease, border-color 0.25s ease;
          -webkit-tap-highlight-color: transparent;
        }

        a.us-card:hover {
          background: rgba(24, 26, 20, 0.55);
          border-color: rgba(255, 255, 255, 0.32);
        }

        a.us-card:focus-visible {
          outline: 2px solid var(--color-card-white);
          outline-offset: 3px;
        }

        .us-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 12px;
          font-size: 13px;
          letter-spacing: -0.1px;
          color: var(--color-card-white);
          border-bottom: 1px solid rgba(255, 255, 255, 0.35);
          padding-bottom: 2px;
        }

        .us-link svg { transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1); }
        a.us-card:hover .us-link svg { transform: translateX(3px); }

        .us-lead {
          font-size: 16px;
          line-height: 1.3;
          letter-spacing: -0.3px;
          color: var(--color-card-white);
        }

        .us-body {
          font-size: 14px;
          line-height: 1.5;
          letter-spacing: -0.1px;
          color: rgba(255, 255, 255, 0.82);
        }

        /* ── Tablet & mobile: foto jadi banner, kartu tersusun di bawahnya ── */
        @media (max-width: 1100px) {
          .us-stage { height: auto; overflow: visible; }

          .us-bg {
            position: relative !important;
            height: auto !important;
            aspect-ratio: 3 / 2;
            object-position: center bottom;
          }

          .us-heading-wrap {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            padding-top: calc(clamp(24px, 5vw, 56px) - 8px);
          }

          .us-heading { font-size: clamp(24px, 4.4vw, 40px); }

          /* Gradasi pindah ke dasar banner foto (rasio 3:2), bukan dasar stage */
          .us-stage::after {
            bottom: auto;
            top: calc(100vw / 1.5 - 160px);
            height: 160px;
          }

          .us-floats {
            position: relative;
            inset: auto;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            padding: 0 var(--spacing-24) var(--spacing-64);
            margin-top: -48px;
          }

          .us-card {
            position: relative;
            left: auto; right: auto; top: auto;
            width: auto;
            animation: none;
          }
        }

        @media (max-width: 640px) {
          .us-floats { grid-template-columns: 1fr; margin-top: -24px; padding-bottom: var(--spacing-48); }
          .us-heading { max-width: 11em; font-size: clamp(22px, 6.2vw, 26px); }
          .us-heading-wrap { padding-top: 12px; }
          /* Banner lebih tinggi supaya judul punya ruang langit, tidak menimpa layar */
          .us-bg { aspect-ratio: 4 / 5; object-position: center 70%; }
          .us-stage::after { top: calc(100vw * 1.25 - 160px); }
        }

        @media (prefers-reduced-motion: reduce) {
          .us-card { animation: none; }
        }
      `}</style>
    </section>
  );
}
