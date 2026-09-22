import CTAButton from "./CTAButton";
import { CTA_LABEL, WA_DEFAULT } from "@/app/lib/constants";

/** 01 · Hero — naskah content.md v2.3 S1. */
export default function Hero() {
  return (
    <section
      id="top"
      data-track-section="hero"
      style={{
        backgroundColor: "var(--color-cream-paper)",
        /* ~70svh, bukan 100svh: menyisakan ruang agar kartu kategori
           sudah mengintip saat pengunjung masih di layar pertama. */
        minHeight: "calc(64svh - var(--nav-height))",
        display: "flex",
        alignItems: "center",
        paddingBlock: "var(--spacing-40)",
      }}
    >
      <div className="section-container" style={{ width: "100%" }}>
        <div>
          <h1
            style={{
              fontSize: "clamp(36px, 7vw, var(--text-display))",
              lineHeight: "var(--leading-display)",
              letterSpacing: "clamp(-0.8px, -0.025em, var(--tracking-display))",
              fontWeight: "var(--weight-display)",
              color: "var(--color-studio-ink)",
              marginBottom: "var(--spacing-24)",
              maxWidth: 1240,
            }}
          >
            Partner Membangun Kredibilitas Digital Bisnis Anda.
          </h1>

          <p
            style={{
              fontSize: "var(--text-subheading)",
              lineHeight: "var(--leading-subheading)",
              letterSpacing: "var(--tracking-subheading)",
              color: "var(--color-ink-60)",
              marginBottom: "var(--spacing-32)",
              maxWidth: 580,
            }}
          >
            Kami membantu bisnis Anda untuk tumbuh melalui website profile bisnis yang dapat meningkatkan kredibilitas bisnis Anda hingga mendapatkan kesempatan menjangkau pasar global.
          </p>

          <div className="hero-cta-wrap">
            <CTAButton location="hero" message={WA_DEFAULT}>
              {CTA_LABEL}
            </CTAButton>
          </div>

        </div>
      </div>

      <style>{`
        .hero-cta-wrap a { display: inline-flex; }

        @media (max-width: 480px) {
          .hero-cta-wrap a { width: 100%; justify-content: center; }
        }
      `}</style>
    </section>
  );
}
