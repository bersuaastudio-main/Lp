import Section from "./Section";
import CTAButton from "./CTAButton";
import { WA_DEFAULT } from "@/app/lib/constants";

/* Hover card memakai CSS transition (lihat .sol-card di <style> bawah), bukan
 * library animasi — satu efek tidak sepadan dengan ~124KB JS di bundle.
 * Kurva easing di bawah meniru rasa spring: cepat di awal, melambat di akhir. */

/* ─── Data ────────────────────────────────────────────────────────────────────
 * Solution-based pricing architecture.
 * anchorPrice = harga standar (dicoret), launchPrice = harga yang berlaku.
 * Nominal "Hemat" dihitung otomatis dari selisih keduanya — jangan ditulis manual.
 * --------------------------------------------------------------------------- */

/** "Rp3.750.000" → 3750000; string tanpa angka → NaN */
const parseRupiah = (s: string) => Number(s.replace(/[^\d]/g, ""));

/** 1250000 → "Rp1.250.000" */
const formatRupiah = (n: number) => `Rp${n.toLocaleString("id-ID")}`;

/** Selisih anchor − launch; null jika salah satu tidak berupa nominal */
function savingsOf(sol: { anchorPrice: string; launchPrice: string }): string | null {
  const a = parseRupiah(sol.anchorPrice);
  const l = parseRupiah(sol.launchPrice);
  if (!a || !l || a <= l) return null;
  return formatRupiah(a - l);
}

type Solution = {
  id: string;
  tag: string;
  title: string;
  positioning: string;
  description: string;
  anchorPrice: string;
  launchPrice: string;
  priceNote?: string;
  featuresLabel?: string;
  features?: string[];
  featureGroups?: { label: string; items: string[] }[];
  hostingNote?: string;
  timeline?: string;
  bottomNote?: string;
  cta: string;
  waMessage: string;
  primary: boolean;
};

const SOLUTIONS: Solution[] = [
  {
    id: "launch",
    tag: "01 — Launch",
    title: "Starter",
    positioning: "Mulai hadir secara profesional di dunia digital.",
    description:
      "Untuk bisnis yang membutuhkan satu halaman terarah untuk memperkenalkan produk, layanan, atau mendapatkan lebih banyak inquiry.",
    anchorPrice: "Rp1.600.000",
    launchPrice: "Rp1.100.000",
    featureGroups: [
      {
        label: "Website",
        items: [
          "One-page custom website",
          "Up to 7 sections",
          "Responsive design",
        ],
      },
      {
        label: "Essential",
        items: [
          "WhatsApp CTA",
          "Contact form",
          "Basic SEO",
          "Social media integration",
        ],
      },
      {
        label: "Service",
        items: ["1x revision", "Domain + hosting 1 tahun*"],
      },
    ],
    timeline: "Pengerjaan 2-3 hari",
    cta: "Pelajari Selengkapnya",
    waMessage: WA_DEFAULT,
    primary: false,
  },
  {
    id: "build",
    tag: "02 — Build",
    title: "Business Website",
    positioning: "Bangun kredibilitas. Tumbuhkan bisnis.",
    description:
      "Website profil bisnis yang profesional untuk membangun kredibilitas dan membantu calon pelanggan mengenal bisnis Anda.",
    anchorPrice: "Rp3.750.000",
    launchPrice: "Rp2.500.000",
    featureGroups: [
      {
        label: "Website",
        items: [
          "3–5 custom pages",
          "Responsive design",
          "Professional navigation",
          "WhatsApp & inquiry system",
        ],
      },
      {
        label: "Growth",
        items: [
          "SEO foundation",
          "Google Analytics",
          "Search Console",
          "Social media integration",
        ],
      },
      {
        label: "Service",
        items: [
          "2x revision",
          "Domain + hosting 1 tahun*",
          "Deployment",
          "Post-launch support",
        ],
      },
    ],
    timeline: "Pengerjaan 4-5 hari",
    cta: "Mulai Project Anda",
    waMessage: WA_DEFAULT,
    primary: true,
  },
  {
    id: "custom",
    tag: "03 — Custom",
    title: "Custom Digital Solution",
    positioning: "Bangun solusi digital sesuai proses bisnis Anda.",
    description:
      "Untuk kebutuhan yang membutuhkan fungsi, integrasi, atau alur operasional bisnis Anda.",
    anchorPrice: "",
    launchPrice: "Start from Rp3.999.000",
    featuresLabel: "Contoh kebutuhan:",
    features: [
      "E-Commerce",
      "Payment Gateway",
      "Booking",
      "Dashboard",
      "CRM Integration",
      "Business Automation",
      "Custom Web Application",
    ],
    bottomNote:
      "Pengerjaan dan harga akhir berdasarkan scope & kompleksitas proyek.",
    cta: "Konsultasikan Kebutuhan",
    waMessage: WA_DEFAULT,
    primary: false,
  },
];

function SolutionCard({ sol }: { sol: Solution }) {
  const savings = savingsOf(sol);

  return (
    <div className={`sol-card${sol.primary ? " is-primary" : ""}`}>
      {sol.primary ? (
        <span className="sol-badge">Recommended</span>
      ) : (
        <span className="sol-badge-spacer" aria-hidden="true" />
      )}

      <div className="sol-header">
        <h3 className="sol-title">{sol.title}</h3>
        <p className="sol-desc">{sol.description}</p>
      </div>

      <div className="sol-pricing">
        {sol.anchorPrice && (
          <p className="sol-anchor">
            <s className="sol-anchor-price">{sol.anchorPrice}</s>
          </p>
        )}
        <p className="sol-launch-price">{sol.launchPrice}</p>
        {savings && (
          <p className={`sol-savings${sol.primary ? " sol-savings--dark" : ""}`}>
            Hemat {savings}
          </p>
        )}
        {sol.priceNote && (
          <p className="sol-price-note">{sol.priceNote}</p>
        )}
      </div>

      <div className="sol-features-wrap">
        {sol.featureGroups ? (
          sol.featureGroups.map((g) => (
            <div key={g.label} className="sol-feature-group">
              <p className="sol-features-label">{g.label}</p>
              <ul className="sol-features">
                {g.items.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <>
            {sol.featuresLabel && (
              <p className="sol-features-label">{sol.featuresLabel}</p>
            )}
            <ul className="sol-features">
              {sol.features?.map((f) => (
                <li key={f}>{f}</li>
              ))}
              {sol.hostingNote && (
                <li className="sol-feature-hosting">{sol.hostingNote}</li>
              )}
            </ul>
          </>
        )}
      </div>

      {sol.timeline && <p className="sol-timeline">{sol.timeline}</p>}
      {sol.bottomNote && <p className="sol-bottom-note">{sol.bottomNote}</p>}

      <CTAButton
        location={`pricing_${sol.id}`}
        message={sol.waMessage}
        fullWidth
        inverted={sol.primary}
      >
        {sol.cta}
      </CTAButton>
    </div>
  );
}

export default function Harga() {
  return (
    <Section
      id="harga"
      track="harga"
      heading="Pilih solusi yang sesuai kebutuhan bisnis Anda."
      surface="ink"
    >
      {/* 3 solution cards — horizontal row */}
      <div className="sol-grid">
        {SOLUTIONS.map((s) => (
          <SolutionCard key={s.id} sol={s} />
        ))}
      </div>

      {/* Secondary consultation CTA */}
      <div className="harga-consult">
        <div>
          <h3 className="harga-consult-t">Belum yakin solusi mana yang sesuai?</h3>
          <p className="harga-consult-b">
            Diskusikan kebutuhan bisnis Anda bersama kami.
          </p>
        </div>
        <CTAButton
          location="pricing_consult"
          message={WA_DEFAULT}
        >
          Konsultasi Gratis via WhatsApp
        </CTAButton>
      </div>

      <style>{`
        /* ── Override sec-body border untuk section harga ── */
        #harga .sec-body {
          border-top: none;
          padding-top: 0;
        }

        /* ── Solution Grid ── */
        .sol-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--spacing-24);
          align-items: stretch;
          margin-bottom: var(--spacing-24);
        }

        .sol-grid-custom {
          margin-bottom: var(--spacing-24);
        }

        .sol-grid-custom .sol-card {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-template-rows: auto auto;
          gap: var(--spacing-16) var(--spacing-40);
          align-items: start;
        }

        /* Badge row spans all columns */
        .sol-grid-custom .sol-badge-spacer { display: none; }

        /* Header — col 1 */
        .sol-grid-custom .sol-header {
          grid-column: 1;
          grid-row: 1;
        }

        /* Pricing — col 2 */
        .sol-grid-custom .sol-pricing {
          grid-column: 2;
          grid-row: 1;
        }

        /* Features — col 3 */
        .sol-grid-custom .sol-features {
          grid-column: 3;
          grid-row: 1;
        }

        /* CTA — col 3, row 2 */
        .sol-grid-custom a.btn-primary,
        .sol-grid-custom a.btn-primary-inverted {
          grid-column: 3;
          grid-row: 2;
          width: 100%;
        }

        /* ── Solution Card ── */
        /* Non-primary: slightly lighter than #1a1a1a section bg — elevation via color shift */
        .sol-card {
          border: none;
          border-radius: var(--radius-xl);
          box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
          transition:
            transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 0.35s cubic-bezier(0.22, 1, 0.36, 1);
          will-change: transform, box-shadow;
          padding: var(--card-padding);
          display: flex;
          flex-direction: column;
          gap: var(--spacing-24);
          background-color: #272727;
          color: var(--color-card-white);
        }

        .sol-card:hover {
          transform: translateY(-5px) scale(1.03);
          box-shadow: 0 12px 32px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.08);
        }

        @media (prefers-reduced-motion: reduce) {
          .sol-card { transition: none; }
          .sol-card:hover { transform: none; }
        }

        /* Primary: white surface — strongest elevation contrast against dark section */
        .sol-card.is-primary {
          background-color: var(--color-card-white);
          color: var(--color-studio-ink);
          border: none;
        }

        /* Recommended badge — dark on white card */
        .sol-badge {
          align-self: flex-start;
          background-color: var(--color-studio-ink);
          color: var(--color-card-white);
          border-radius: var(--radius-pill);
          padding: 4px 12px;
          font-size: var(--text-caption);
          font-weight: var(--weight-medium);
          letter-spacing: 0.6px;
          text-transform: uppercase;
        }

        .sol-badge-spacer { display: block; height: 24px; }

        /* ── Card header ── */
        .sol-header { display: flex; flex-direction: column; gap: 6px; }

        .sol-title {
          font-size: var(--text-subheading);
          font-weight: var(--weight-display);
          letter-spacing: var(--tracking-subheading);
          line-height: var(--leading-subheading);
        }

        .sol-positioning {
          font-size: var(--text-body);
          font-weight: 500;
          line-height: var(--leading-body);
          letter-spacing: var(--tracking-body);
        }

        .sol-desc {
          font-size: var(--text-caption);
          font-weight: 400;
          line-height: var(--leading-caption);
          letter-spacing: var(--tracking-caption);
          color: rgba(255,255,255,0.50);
        }

        .sol-card.is-primary .sol-desc { color: var(--color-ink-60); }

        /* ── Pricing ── */
        .sol-pricing { display: flex; flex-direction: column; gap: 4px; }

        /* Strikethrough anchor price */
        .sol-anchor {
          font-size: var(--text-caption);
          font-weight: 400;
          letter-spacing: var(--tracking-caption);
          color: rgba(255,255,255,0.30);
        }

        .sol-card.is-primary .sol-anchor { color: var(--color-ink-60); }

        .sol-anchor-price { text-decoration: line-through; }

        /* Founding price — primary display */
        .sol-launch-price {
          font-size: var(--text-heading);
          font-weight: var(--weight-display);
          line-height: var(--leading-heading);
          letter-spacing: var(--tracking-heading);
        }

        /* Savings callout */
        .sol-savings {
          font-size: var(--text-caption);
          font-weight: 500;
          letter-spacing: var(--tracking-caption);
          color: rgba(255,255,255,0.45);
          margin-top: 2px;
        }

        .sol-card.is-primary .sol-savings { color: var(--color-ink-60); }

        /* Override: savings on primary card */
        .sol-savings--dark { color: var(--color-ink-60); }

        .sol-price-note {
          font-size: var(--text-caption);
          font-weight: 400;
          line-height: var(--leading-caption);
          letter-spacing: var(--tracking-caption);
          color: rgba(255,255,255,0.35);
          margin-top: 4px;
        }

        .sol-card.is-primary .sol-price-note { color: var(--color-ink-60); }

        /* ── Features ── */
        .sol-features-wrap {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-8);
          flex-grow: 1;
        }

        .sol-feature-group {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-8);
        }

        .sol-feature-group + .sol-feature-group {
          margin-top: var(--spacing-8);
        }

        .sol-features-label {
          font-size: var(--text-caption);
          font-weight: var(--weight-medium);
          text-transform: uppercase;
          letter-spacing: 0.6px;
          line-height: var(--leading-caption);
          color: rgba(255,255,255,0.45);
        }

        .sol-card.is-primary .sol-features-label { color: var(--color-ink-60); }

        .sol-features {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: var(--spacing-8);
        }

        .sol-features li {
          font-size: var(--text-body);
          font-weight: 400;
          line-height: var(--leading-body);
          letter-spacing: var(--tracking-body);
          color: rgba(255,255,255,0.60);
          padding-left: var(--spacing-16);
          position: relative;
        }

        .sol-card.is-primary .sol-features li { color: var(--color-studio-ink); }

        /* dash marker */
        .sol-features li::before {
          content: "";
          position: absolute;
          left: 0;
          top: 11px;
          width: 6px;
          height: 1px;
          background-color: rgba(255,255,255,0.20);
        }

        .sol-card.is-primary .sol-features li::before {
          background-color: var(--color-ink-20);
        }

        /* Domain/hosting footnote */
        .sol-feature-hosting {
          font-size: var(--text-caption);
          font-weight: 400;
          letter-spacing: var(--tracking-caption);
          color: rgba(255,255,255,0.25);
          margin-top: var(--spacing-8);
          padding-left: 0;
        }

        .sol-feature-hosting::before { display: none; }

        .sol-card.is-primary .sol-feature-hosting { color: var(--color-ink-60); }

        /* Timeline pengerjaan */
        .sol-timeline {
          font-size: var(--text-caption);
          font-weight: var(--weight-medium);
          letter-spacing: var(--tracking-caption);
          line-height: var(--leading-caption);
          color: rgba(255,255,255,0.60);
          padding-top: var(--spacing-16);
          border-top: 1px solid rgba(255,255,255,0.08);
        }

        .sol-card.is-primary .sol-timeline {
          color: var(--color-studio-ink);
          border-top-color: var(--color-ink-20);
        }

        /* Catatan scope — posisi sama dengan timeline, di atas CTA */
        .sol-bottom-note {
          font-size: var(--text-caption);
          font-weight: 400;
          letter-spacing: var(--tracking-caption);
          line-height: var(--leading-caption);
          color: rgba(255,255,255,0.45);
          padding-top: var(--spacing-16);
          border-top: 1px solid rgba(255,255,255,0.08);
        }

        /* ── Custom Card (legacy .sol-custom-card, not used in current grid) ── */
        .sol-custom-card {
          border-radius: var(--radius-xl);
          padding: var(--card-padding);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--spacing-48);
          background-color: #272727;
          color: var(--color-card-white);
          margin-bottom: var(--spacing-32);
        }

        .sol-custom-left {
          display: flex;
          flex-direction: column;
          gap: 6px;
          max-width: 560px;
        }

        .sol-custom-title {
          font-size: var(--text-subheading);
          font-weight: var(--weight-display);
          letter-spacing: var(--tracking-subheading);
        }

        .sol-custom-pos {
          font-size: var(--text-body);
          font-weight: 500;
          line-height: var(--leading-body);
          letter-spacing: var(--tracking-body);
        }

        .sol-custom-desc {
          font-size: var(--text-body);
          font-weight: 400;
          line-height: var(--leading-body);
          letter-spacing: var(--tracking-body);
          color: rgba(255,255,255,0.50);
        }

        .sol-custom-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: var(--spacing-16);
          flex-shrink: 0;
        }

        .sol-custom-price {
          font-size: var(--text-heading);
          font-weight: var(--weight-display);
          letter-spacing: var(--tracking-heading);
          white-space: nowrap;
        }

        /* ── Consultation CTA ── */
        .harga-consult {
          margin-top: var(--spacing-48);
          padding-top: var(--spacing-40);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--spacing-48);
        }

        .harga-consult-t {
          font-size: var(--text-heading);
          font-weight: var(--weight-display);
          line-height: var(--leading-heading);
          letter-spacing: var(--tracking-heading);
          margin-bottom: var(--spacing-8);
          color: var(--color-card-white);
        }

        .harga-consult-b {
          font-size: var(--text-body);
          font-weight: 400;
          line-height: var(--leading-body);
          letter-spacing: var(--tracking-body);
          color: rgba(255,255,255,0.50);
          max-width: 480px;
        }

        .harga-consult > a { flex-shrink: 0; }

        /* ── Button overrides khusus dark section ── */
        /* Konsultasi CTA: putih bg, hitam teks */
        #harga .harga-consult .btn-primary {
          background-color: var(--color-card-white);
          color: var(--color-studio-ink);
        }

        /* Business Website CTA (is-primary card): hitam bg, putih teks */
        #harga .sol-card.is-primary .btn-primary-inverted {
          background-color: var(--color-studio-ink);
          color: var(--color-card-white);
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .sol-grid { grid-template-columns: 1fr 1fr; }
          .sol-grid > :nth-child(1) { order: 2; }
          .sol-grid > :nth-child(2) { order: 1; grid-column: 1 / -1; }
          .sol-grid > :nth-child(3) { order: 3; }
        }

        @media (max-width: 640px) {
          .sol-grid { grid-template-columns: 1fr; }
          .sol-grid > :nth-child(1) { order: 2; }
          .sol-grid > :nth-child(2) { order: 1; }
          .sol-grid > :nth-child(3) { order: 3; }
          .sol-custom-card {
            flex-direction: column;
            align-items: stretch;
            gap: var(--spacing-24);
          }
          .sol-custom-right { align-items: stretch; }
          .harga-consult {
            flex-direction: column;
            align-items: stretch;
            gap: var(--spacing-24);
          }
          .harga-consult > a { width: 100%; }
        }
      `}</style>
    </Section>
  );
}
