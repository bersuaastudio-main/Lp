"use client";

import Image from "next/image";
import { selectShowcase } from "./Showcase";
import CarouselDots from "./CarouselDots";

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
    id: "brand-produk",
    icon: "brand",
    img: "/img/bbrand.webp",
    lead: "Brand dan produk",
    body: "Bangun persepsi produk yang lebih kuat melalui presentasi yang profesional, informasi yang jelas, dan cerita di balik setiap keunggulannya.",
    tab: 0, // Gatra
  },
  {
    id: "hospitality-properti",
    icon: "hospitality",
    img: "/img/Hospitality.webp",
    lead: "Hospitality dan properti",
    body: "Sebelum memesan, tamu ingin tahu apa yang akan mereka dapatkan. Hadirkan gambaran suasana, fasilitas, dan lokasi secara meyakinkan.",
    tab: 6, // Pesiarkan
  },
  {
    id: "supplier-distributor",
    icon: "supplier",
    img: "/img/supplier-distributor.webp",
    lead: "Supplier dan distributor",
    body: "Permudah calon mitra mengevaluasi bisnis Anda melalui katalog produk, informasi perusahaan, dan kapabilitas pasokan dalam satu tempat.",
    tab: 1, // Hayati House
  },
  {
    id: "jasa-profesional",
    icon: "jasa",
    img: "/img/Services.webp",
    lead: "Jasa profesional",
    body: "Bangun kepercayaan sejak interaksi pertama melalui penjelasan layanan yang terarah, portofolio relevan, dan proses kerja yang transparan.",
    tab: 7, // Psikora
  },
];

export default function UntukSiapa() {
  return (
    <section id="untuk-siapa" data-track-section="untuk_siapa" className="us-sec">
      <div className="us-stage">
        <Image
          src="/img/untuk-siapa-person-cream.webp"
          alt=""
          fill
          sizes="(max-width: 1100px) 100vw, 800px"
          unoptimized /* WebP 1086px, 36KB — latar sudah krem halaman */
          className="us-bg"
        />

        <header className="us-heading-wrap">
          <h2 className="us-heading">Untuk bisnis seperti apa Bersua bekerja?</h2>
        </header>

        <div className="us-floats" id="us-floats">
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
              <span className="us-thumb">
                <Image
                  src={k.img}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 90vw, (max-width: 1100px) 45vw, 300px"
                  unoptimized /* WebP ±100–150KB — sudah ringan */
                />
              </span>
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
        <CarouselDots targetId="us-floats" count={jenis.length} label="Pilih jenis bisnis" />
      </div>

      <style>{`
        .us-sec {
          position: relative;
          background: var(--color-studio-ink); /* sama dengan section Showcase di bawahnya */
          color: var(--color-card-white);
        }

        .us-stage {
          position: relative;
          /* Tinggi minimal mengikuti rasio foto; bertambah sendiri bila kartu
             (dengan gambar) butuh ruang lebih, jadi tidak ada yang terpotong */
          display: flex;
          flex-direction: column;
          min-height: clamp(720px, 56.25vw, 1000px);
          overflow: hidden;
        }

        /* Latar putih foto sudah dikalikan ke krem halaman (#f8f8f2), jadi foto
           menyatu tanpa batas dengan latar section ini. */
        .us-stage {
          background: var(--color-cream-paper);
        }
        .us-bg {
          object-fit: contain;
          object-position: center bottom;
          border-radius: 0;
          /* Foto mulai sedikit di bawah judul, supaya judul tidak menempel di kepala */
          top: 9% !important;
          height: 91% !important;
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

        /* Dua kolom kartu (kiri & kanan subjek). Kartu tersusun dengan jarak tetap,
           jadi teks yang lebih panjang tidak membuat kartu saling menimpa. */
        .us-floats {
          z-index: 2;
          position: relative;
          flex: 1;
          pointer-events: none;
          display: grid;
          grid-template-columns: auto 1fr auto;
          grid-template-rows: 1fr auto auto 1fr;
          align-items: start;
          column-gap: 24px;
          row-gap: 16px;
          padding: 24px 3% 56px;
        }

        .us-card {
          position: relative;
          width: clamp(240px, 19vw, 300px);
          padding: 10px 10px 18px;
          border-radius: 16px;
          /* Kartu solid putih (gaya kartu listing), bukan kaca transparan */
          background: var(--color-card-white);
          border: 1px solid var(--color-ink-08);
          box-shadow: 0 24px 48px -24px rgba(0, 0, 0, 0.55);
          pointer-events: auto;
          scroll-margin-top: calc(var(--nav-height) + 16px);
          animation: us-float 7s ease-in-out infinite;
        }

        /* Posisi: dua di kiri, dua di kanan — menjauhi layar & sosok di tengah */
        .us-pos-1 { grid-column: 1; grid-row: 2; }
        .us-pos-2 { grid-column: 1; grid-row: 3; margin-left: 28px; animation-delay: -2.5s; }
        .us-pos-3 { grid-column: 3; grid-row: 2; justify-self: end; margin-right: 28px; animation-delay: -1.2s; }
        .us-pos-4 { grid-column: 3; grid-row: 3; justify-self: end; animation-delay: -4s; }

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
          background: var(--color-cream-paper);
          color: var(--color-studio-ink);
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
        /* Gambar layanan di atas kartu (gaya kartu listing) */
        .us-thumb {
          position: relative;
          display: block;
          aspect-ratio: 2 / 1;
          margin-bottom: 12px;
          border-radius: 10px;
          overflow: hidden;
          background: var(--color-cream-paper);
        }
        .us-thumb img { object-fit: cover; transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1); }
        a.us-card:hover .us-thumb img { transform: scale(1.04); }
        .us-card-head, .us-body, .us-link { margin-inline: 10px; }

        a.us-card {
          display: block;
          text-decoration: none;
          color: inherit;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          -webkit-tap-highlight-color: transparent;
        }

        a.us-card:hover {
          box-shadow: 0 28px 56px -24px rgba(0, 0, 0, 0.7);
        }

        a.us-card:focus-visible {
          outline: 2px solid var(--color-card-white);
          outline-offset: 3px;
        }

        .us-link {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 14px;
          padding: 11px 16px;
          border-radius: 10px;
          background: var(--color-studio-ink);
          color: var(--color-card-white);
          font-size: 14px;
          letter-spacing: -0.1px;
        }

        .us-link svg { transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1); }
        a.us-card:hover .us-link svg { transform: translateX(3px); }

        .us-lead {
          font-size: 16px;
          line-height: 1.3;
          letter-spacing: -0.3px;
          color: var(--color-studio-ink);
        }

        .us-body {
          font-size: 14px;
          line-height: 1.5;
          letter-spacing: -0.1px;
          color: var(--color-ink-60);
        }

        /* ── Tablet & mobile: foto jadi banner, kartu tersusun di bawahnya ── */
        @media (max-width: 1100px) {
          .us-stage { display: block; min-height: 0; height: auto; overflow: visible; background: none; }

          .us-bg {
            position: relative !important;
            top: auto !important;
            height: auto !important;
            aspect-ratio: 3 / 2;
            object-fit: cover;
            object-position: center 22%;
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
            grid-column: auto;
            grid-row: auto;
            margin: 0;
            width: auto;
            animation: none;
          }
        }

        /* HP: kartu jadi carousel geser — 4 kartu bergambar bertumpuk terlalu panjang */
        @media (max-width: 767px) {
          .us-floats {
            display: flex;
            gap: 12px;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            scroll-padding-inline: var(--spacing-24);
            scrollbar-width: none;
            pointer-events: auto;
            padding-bottom: 8px;
          }
          .us-floats::-webkit-scrollbar { display: none; }
          .us-card { flex: 0 0 82%; scroll-snap-align: center; }
          #untuk-siapa .cdots { padding-bottom: var(--spacing-48); }
          #untuk-siapa .cdots-dot::after { background: rgba(255, 255, 255, 0.3); }
          #untuk-siapa .cdots-dot.is-active::after { background: var(--color-card-white); }
        }

        @media (max-width: 640px) {
          .us-floats { margin-top: -24px; }
          .us-heading { max-width: 11em; font-size: clamp(22px, 6.2vw, 26px); }
          .us-heading-wrap { padding-top: 12px; }
          /* Banner lebih tinggi supaya judul punya ruang langit, tidak menimpa layar */
          .us-bg { aspect-ratio: 4 / 5; object-position: center 8%; }
          .us-stage::after { top: calc(100vw * 1.25 - 160px); }
        }

        @media (prefers-reduced-motion: reduce) {
          .us-card { animation: none; }
        }
      `}</style>
    </section>
  );
}
