import Section from "./Section";
import CTAButton from "./CTAButton";
import CarouselDots from "./CarouselDots";

import { CTA_LABEL, WA_DEFAULT, waPackage, waChoosePackage } from "@/app/lib/constants";

/* ─── Harga ───────────────────────────────────────────────────────────────────
 * Struktur mengikuti referensi: banner judul di atas, lalu tiga kartu.
 * Tiap kartu = panel atas (label, nama, harga, deskripsi, tombol) yang terbaca
 * dalam sekali lihat, lalu daftar isi paket dan satu baris syarat di bawahnya.
 * `id` dipakai untuk tracking (pricing_<id>) — jangan diganti.
 * `paket` harus sama dengan PACKAGE_OPTIONS di constants.ts (dibaca LeadForm).
 * --------------------------------------------------------------------------- */

type Plan = {
  id: string;
  step: string;
  title: string;
  price: string;
  /** Satuan kecil di samping harga; kosong untuk "Hubungi kami". */
  priceUnit?: string;
  description: string;
  listLabel: string;
  items: string[];
  meta: string;
  cta: string;
  paket: string;
  waMessage: string;
  featured?: boolean;
};

const PLANS: Plan[] = [
  {
    id: "launch",
    step: "01 / Mulai",
    title: "Starter",
    price: "Rp1.000.000",
    description:
      "Untuk bisnis yang ingin memperkenalkan perusahaan dan produk secara profesional dalam satu halaman.",
    listLabel: "Yang Anda dapatkan",
    items: [
      "Website satu halaman hingga 7 bagian",
      "Profil bisnis dan produk utama",
      "Tombol WhatsApp untuk inquiry",
      "Tampilan optimal di HP dan desktop",
      "Domain dan hosting 1 tahun",
      "Website online dan siap digunakan",
    ],
    meta: "Termasuk 1 kali revisi · Estimasi 2–3 hari kerja*",
    cta: "Pilih Starter",
    paket: "Starter",
    waMessage: waChoosePackage("Starter"),
  },
  {
    id: "build",
    step: "02 / Tumbuh",
    title: "Business Website",
    price: "Rp2.500.000",
    description:
      "Website profesional dengan CMS untuk mengelola informasi bisnis dan produk secara mandiri.",
    listLabel: "Semua fitur Starter, ditambah:",
    items: [
      "Website 3–5 halaman dengan navigasi terstruktur",
      "CMS untuk mengelola konten website tanpa mengubah kode",
      "Katalog produk yang dapat diperbarui melalui CMS",
      "Informasi perusahaan, kapabilitas, dan wilayah distribusi",
      "Formulir permintaan penawaran",
      "Fondasi SEO on-page dan analytics dasar",
      "2 kali revisi",
      "Panduan penggunaan CMS dan dukungan pascapeluncuran sesuai cakupan",
    ],
    meta: "Estimasi pengerjaan 4–5 hari kerja*",
    cta: "Pilih Business Website",
    paket: "Business Website",
    waMessage: waChoosePackage("Business Website"),
    featured: true,
  },
  {
    id: "custom",
    step: "03 / Kebutuhan khusus",
    title: "Custom Digital Solution",
    price: "Hubungi kami",
    description: "Untuk kebutuhan digital yang lebih spesifik dari website standar.",
    listLabel: "Contoh solusi",
    items: [
      "Katalog produk berskala besar",
      "Sistem pemesanan atau toko online",
      "Integrasi CRM dan automasi",
      "Dashboard operasional",
    ],
    meta: "Scope, harga, dan timeline ditentukan berdasarkan kebutuhan.",
    cta: CTA_LABEL,
    paket: "Custom",
    waMessage: waPackage("Custom Digital Solution"),
  },
];

function Check() {
  return (
    <svg className="pr-check" viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true">
      <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <article className={`pr-card${plan.featured ? " is-featured" : ""}`}>
      <div className="pr-top">
        <div className="pr-step-row">
          <p className="pr-step">{plan.step}</p>
          {plan.featured && <span className="pr-badge">Pilihan utama</span>}
        </div>

        <h3 className="pr-title">{plan.title}</h3>
        <p className="pr-desc">{plan.description}</p>

        <p className="pr-price">
          <span className="pr-amount">{plan.price}</span>
          {plan.priceUnit && <span className="pr-unit">{plan.priceUnit}</span>}
        </p>

        <CTAButton
          location={`pricing_${plan.id}`}
          paket={plan.paket}
          message={plan.waMessage}
          className="pr-cta"
          inverted={plan.featured}
        >
          {plan.cta}
        </CTAButton>
      </div>

      <div className="pr-bottom">
        <p className="pr-list-label">{plan.listLabel}</p>
        <ul className="pr-list">
          {plan.items.map((item) => (
            <li key={item}>
              <Check />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="pr-meta">{plan.meta}</p>
      </div>
    </article>
  );
}

export default function Harga() {
  return (
    <Section id="harga" track="harga" surface="ink">
      <div className="pr-shell">
        {/* Banner judul */}
        <header className="pr-banner">
          <h2 className="pr-banner-title">
            Pilih solusi yang sesuai{" "}
            <br />
            kebutuhan bisnis Anda.
          </h2>
          <p className="pr-banner-sub">
            Harga jelas di depan. Mulai dari satu halaman, berkembang sesuai
            kebutuhan bisnis Anda.
          </p>
        </header>

        {/* Tiga kartu */}
        <div className="pr-grid" id="pr-grid">
          {PLANS.map((p) => (
            <PlanCard key={p.id} plan={p} />
          ))}
        </div>
      </div>
      {/* Di HP carousel dibuka di paket utama (Business Website) */}
      <CarouselDots
        targetId="pr-grid"
        count={PLANS.length}
        start={Math.max(0, PLANS.findIndex((p) => p.featured))}
        label="Pilih paket"
      />

      <p className="pr-footnote">
        *Estimasi dihitung setelah seluruh materi website diterima. Belum yakin
        paket mana yang tepat?{" "}
        <CTAButton location="pricing_consult" message={WA_DEFAULT} variant="link">
          {CTA_LABEL}
        </CTAButton>
      </p>

      <style>{`
        #harga .sec-body { border-top: none; padding-top: 0; }

        /* ── Wadah abu muda yang membingkai banner + kartu (seperti referensi) ── */
        /* Latar hitam menyambung section Contoh hasil kerja di atasnya;
           bingkai tipis transparan menggantikan bingkai abu muda */
        .pr-shell {
          background: rgba(255, 255, 255, 0.06);
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          padding: 10px;
        }

        /* ── Banner ── */
        .pr-banner {
          position: relative;
          overflow: hidden;
          border-radius: 18px;
          padding: clamp(28px, 4vw, 48px);
          color: var(--color-card-white);
          /* Bayangan daun hijau (foto diputar ke landscape: sisi gelap di kiri,
             tepat di belakang judul putih). Gradasi tipis menjaga teks terbaca. */
          background-color: #1f3d1f;
          background-image:
            linear-gradient(100deg, rgba(10, 30, 12, 0.55) 0%, rgba(10, 30, 12, 0.15) 60%, rgba(10, 30, 12, 0) 100%),
            url("/img/harga-banner-leaf.webp");
          background-size: cover;
          background-position: center 40%;
        }
        .pr-banner-title {
          margin: 0;
          font-size: clamp(28px, 3.4vw, 44px);
          font-weight: 400;
          line-height: 1.1;
          letter-spacing: -0.03em;
        }
        .pr-banner-sub {
          margin: 14px 0 0;
          max-width: 30em;
          font-size: 16px;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.78);
        }

        /* ── Grid kartu ── */
        .pr-grid {
          position: relative;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 10px;
          margin-top: 10px;
        }

        .pr-card {
          display: flex;
          flex-direction: column;
          background: var(--color-card-white);
          border-radius: 18px;
          padding: 10px;
          box-shadow: 0 0 0 1px var(--color-ink-08);
        }
        /* Paket utama: kartu gelap bergradasi agar langsung menonjol di antara dua kartu terang */
        .pr-card.is-featured {
          position: relative;
          overflow: hidden;
          color: var(--color-card-white);
          background:
            radial-gradient(120% 70% at 85% 0%, rgba(214, 196, 160, 0.38) 0%, rgba(214, 196, 160, 0) 60%),
            linear-gradient(165deg, #4a4843 0%, #262624 45%, #121212 100%);
          box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.22), 0 24px 48px -24px rgba(0, 0, 0, 0.7);
        }
        .is-featured .pr-top {
          background: rgba(255, 255, 255, 0.07);
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
        }
        .is-featured .pr-step,
        .is-featured .pr-desc,
        .is-featured .pr-list-label,
        .is-featured .pr-meta { color: rgba(255, 255, 255, 0.68); }
        .is-featured .pr-title,
        .is-featured .pr-price,
        .is-featured .pr-list li { color: var(--color-card-white); }
        .is-featured .pr-badge {
          background: var(--color-card-white);
          color: var(--color-studio-ink);
        }

        /* Panel atas — semua yang perlu dibaca dalam sekali lihat */
        .pr-top {
          background: #f6f6f2;
          border-radius: 12px;
          padding: clamp(20px, 2vw, 28px);
          display: flex;
          flex-direction: column;
        }
        .pr-step-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          min-height: 26px;
        }
        .pr-step {
          margin: 0;
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--color-ink-60);
        }
        .pr-badge {
          font-size: 12px;
          line-height: 1;
          padding: 7px 10px;
          border-radius: 9999px;
          background: var(--color-studio-ink);
          color: var(--color-card-white);
          white-space: nowrap;
        }
        .pr-title {
          margin: 14px 0 0;
          font-size: clamp(24px, 2vw, 28px);
          font-weight: 500;
          line-height: 1.15;
          letter-spacing: -0.02em;
          color: var(--color-studio-ink);
        }
        .pr-desc {
          margin: 10px 0 0;
          font-size: 15px;
          line-height: 1.5;
          color: var(--color-ink-60);
          min-height: 4.5em; /* tiga baris — harga & tombol sejajar antar kartu */
        }
        .pr-price {
          margin: 24px 0 20px;
          display: flex;
          align-items: baseline;
          flex-wrap: wrap;
          gap: 4px 8px;
          color: var(--color-studio-ink);
        }
        .pr-amount {
          font-size: clamp(30px, 2.6vw, 38px);
          font-weight: 500;
          line-height: 1;
          letter-spacing: -0.03em;
        }
        .pr-unit { font-size: 14px; color: var(--color-ink-60); }

        .pr-top a.pr-cta {
          width: 100%;
          justify-content: center;
          text-align: center;
          padding: 14px 16px;
          border-radius: 10px;
        }

        /* Panel bawah — isi paket */
        .pr-bottom {
          display: flex;
          flex-direction: column;
          flex: 1;
          padding: 22px clamp(14px, 1.6vw, 22px) 14px;
        }
        .pr-list-label {
          margin: 0 0 14px;
          font-size: 14px;
          color: var(--color-ink-60);
        }
        .pr-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 11px;
        }
        .pr-list li {
          display: flex;
          gap: 10px;
          align-items: flex-start;
          font-size: 15px;
          line-height: 1.45;
          color: var(--color-studio-ink);
        }
        .pr-check { flex: none; margin-top: 3px; }
        .pr-meta {
          margin: auto 0 0;
          padding-top: 22px;
          font-size: 13px;
          line-height: 1.5;
          color: var(--color-ink-60);
        }

        #harga .pr-footnote .btn-link { color: var(--color-card-white); }
        #harga .cdots-dot::after { background: rgba(255, 255, 255, 0.25); }
        #harga .cdots-dot.is-active::after { background: var(--color-card-white); }

        .pr-footnote {
          margin: var(--spacing-24) auto 0;
          max-width: 62em;
          text-align: center;
          font-size: 14px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.6);
        }

        /* ── Tablet & HP: kartu bertumpuk sesuai urutan 01–03 ── */
        @media (max-width: 1023px) {
          .pr-grid { grid-template-columns: 1fr; max-width: 560px; margin-inline: auto; }
          .pr-desc { min-height: 0; }
        }
        /* HP: kartu harga jadi carousel geser di dalam bingkai abu */
        @media (max-width: 767px) {
          .pr-grid {
            display: flex;
            max-width: none;
            gap: 8px;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            scrollbar-width: none;
            -webkit-overflow-scrolling: touch;
            padding-bottom: 4px;
          }
          .pr-grid::-webkit-scrollbar { display: none; }
          .pr-card { flex: 0 0 86%; scroll-snap-align: center; }
        }
        @media (max-width: 480px) {
          .pr-shell { padding: 6px; border-radius: 20px; }
          .pr-grid { margin-top: 8px; }
          .pr-banner { border-radius: 16px; }
          .pr-banner-title br { display: none; }
        }
      `}</style>
    </Section>
  );
}
