import Section from "./Section";
import { WA_DEFAULT } from "@/app/lib/constants";
import CTAButton from "./CTAButton";

const layanan = [
  {
    id: "launch",
    name: "Launch",
    tagline: "Landing Page",
    price: "Rp1.250.000",
    priceLabel: "Mulai dari",
    desc: "Untuk bisnis yang mulai hadir online.",
    features: [
      "Responsive",
      "WhatsApp CTA",
      "Contact Form",
      "Basic SEO",
    ],
    recommended: false,
    tint: "var(--color-card-white)",
    waMessage: WA_DEFAULT,
  },
  {
    id: "build",
    name: "Build",
    tagline: "Business Website",
    price: "Rp2.500.000",
    priceLabel: "Mulai dari",
    desc: "Untuk bisnis yang ingin membangun kredibilitas.",
    features: [
      "Custom Design",
      "5–8 Halaman",
      "Copywriting",
      "SEO Foundation",
      "Analytics",
      "Inquiry System",
    ],
    recommended: true,
    tint: "var(--color-powder-blue)",
    waMessage: WA_DEFAULT,
  },
  {
    id: "ecommerce",
    name: "E-Commerce",
    tagline: "Online Store",
    price: "Rp5.000.000",
    priceLabel: "Mulai dari",
    desc: "Untuk bisnis yang ingin menjual produk secara online.",
    features: [
      "Product Catalog",
      "Cart & Checkout",
      "Payment Gateway",
      "Order System",
    ],
    recommended: false,
    tint: "var(--color-mint-wash)",
    waMessage: WA_DEFAULT,
  },
  {
    id: "custom",
    name: "Custom",
    tagline: "Digital Solution",
    price: "Konsultasi\ndiperlukan",
    priceLabel: "Mulai dari",
    desc: "Untuk kebutuhan digital khusus.",
    features: [
      "Booking System",
      "Automation",
      "Integration",
      "Dashboard",
      "Custom System",
    ],
    recommended: false,
    tint: "var(--color-blush-tint)",
    waMessage: WA_DEFAULT,
  },
];

export default function Layanan() {
  return (
    <Section
      id="layanan"
      track="layanan"
      heading="Temukan solusi yang tepat untuk bisnis Anda."
    >
      <div className="ly-grid">
        {layanan.map((l) => (
          <div
            key={l.id}
            className={`ly-card${l.recommended ? " ly-card--recommended" : ""}`}
            style={{ backgroundColor: l.tint }}
          >
            {l.recommended && (
              <span className="ly-badge">★</span>
            )}

            <div className="ly-top">
              <h3 className="ly-name">{l.name}</h3>
              <p className="ly-tagline">{l.tagline}</p>
            </div>

            <div className="ly-price-block">
              <p className="ly-price-label">{l.priceLabel}</p>
              <p className="ly-price">{l.price}</p>
            </div>

            <p className="ly-desc">{l.desc}</p>

            <ul className="ly-features">
              {l.features.map((f) => (
                <li key={f} className="ly-feature">
                  <span className="ly-check" aria-hidden="true">✓</span>
                  {f}
                </li>
              ))}
            </ul>

            <div className="ly-cta">
              <CTAButton location={`layanan_${l.id}`} message={l.waMessage}>
                {l.id === "custom" ? "Konsultasi" : l.recommended ? "Pilih Solusi" : "Pelajari"}
              </CTAButton>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .ly-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--spacing-16);
          align-items: start;
        }

        .ly-card {
          border-radius: var(--radius-xl);
          padding: var(--spacing-24);
          display: flex;
          flex-direction: column;
          gap: var(--spacing-16);
          color: var(--color-studio-ink);
          position: relative;
        }

        .ly-card--recommended {
          outline: 2px solid var(--color-studio-ink);
          outline-offset: -2px;
        }

        .ly-badge {
          position: absolute;
          top: var(--spacing-16);
          right: var(--spacing-16);
          font-size: var(--text-caption);
          font-weight: var(--weight-display);
          color: var(--color-studio-ink);
        }

        .ly-top {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .ly-name {
          font-size: var(--text-subheading);
          line-height: var(--leading-subheading);
          letter-spacing: var(--tracking-subheading);
          font-weight: var(--weight-display);
        }

        .ly-tagline {
          font-size: var(--text-caption);
          color: var(--color-ink-60);
          letter-spacing: var(--tracking-caption);
        }

        .ly-price-block {
          display: flex;
          flex-direction: column;
          gap: 2px;
          padding-bottom: var(--spacing-16);
          border-bottom: 1px solid rgba(26, 26, 26, 0.10);
        }

        .ly-price-label {
          font-size: var(--text-caption);
          color: var(--color-ink-60);
          letter-spacing: var(--tracking-caption);
        }

        .ly-price {
          font-size: var(--text-heading);
          line-height: var(--leading-heading);
          letter-spacing: var(--tracking-heading);
          font-weight: var(--weight-display);
          white-space: pre-line;
        }

        .ly-desc {
          font-size: var(--text-body);
          line-height: var(--leading-body);
          color: var(--color-ink-60);
        }

        .ly-features {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: var(--spacing-8);
          flex: 1;
        }

        .ly-feature {
          display: flex;
          align-items: baseline;
          gap: var(--spacing-8);
          font-size: var(--text-body);
          line-height: var(--leading-body);
        }

        .ly-check {
          font-size: var(--text-caption);
          font-weight: var(--weight-display);
          flex-shrink: 0;
          color: var(--color-studio-ink);
        }

        .ly-cta {
          margin-top: var(--spacing-8);
        }

        .ly-cta a,
        .ly-cta button {
          width: 100%;
          justify-content: center;
        }

        /* Tablet */
        @media (max-width: 1024px) {
          .ly-grid { grid-template-columns: repeat(2, 1fr); }
        }

        /* Mobile */
        @media (max-width: 600px) {
          .ly-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </Section>
  );
}
