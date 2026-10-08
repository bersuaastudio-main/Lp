import CTAButton from "./CTAButton";
import { CTA_LABEL, WA_DEFAULT } from "@/app/lib/constants";

const HEADLINE = "Partner membangun website yang tepat untuk membantu bisnis Anda berkembang.";

/** 01 · Hero — naskah content.md v2.3 S1. */
export default function Hero() {
  const words = HEADLINE.split(" ");

  return (
    <section
      id="top"
      data-track-section="hero"
      style={{
        backgroundColor: "var(--color-cream-paper)",
        /* Whitespace lapang ala studio editorial: jarak atas besar dari navbar,
           headline duduk di bawah, kiri-rata. */
        paddingTop: "clamp(96px, 18vh, 200px)",
        paddingBottom: "clamp(64px, 10vh, 112px)",
      }}
    >
      <div className="section-container" style={{ width: "100%" }}>
        <div>
          <p className="hero-eyebrow">(Studio website profil bisnis)</p>

          {/* Reveal per kata: tiap kata naik dari balik mask, berurutan.
              aria-label memberi pembaca layar kalimat utuh, bukan potongan kata. */}
          <h1 className="hero-title" aria-label={HEADLINE}>
            {words.map((word, i) => (
              <span key={i} aria-hidden="true">
                <span className="hero-word">
                  <span
                    className="hero-word-inner"
                    style={{ animationDelay: `${150 + i * 70}ms` }}
                  >
                    {word}
                  </span>
                </span>
                {i < words.length - 1 && " "}
              </span>
            ))}
          </h1>

          <div className="hero-cta-wrap">
            <CTAButton location="hero" message={WA_DEFAULT} className="hero-cta">
              <span className="hero-cta-label">
                <span className="hero-cta-roll" data-text={CTA_LABEL}>
                  {CTA_LABEL}
                </span>
              </span>
              <span className="hero-cta-arrow" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M1 7h12M8 2l5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </CTAButton>
          </div>
        </div>
      </div>

      <style>{`
        .hero-eyebrow {
          font-size: clamp(15px, 1.2vw, 18px);
          line-height: 1.4;
          letter-spacing: -0.2px;
          font-weight: 400;
          color: var(--color-studio-ink);
          margin-bottom: clamp(16px, 2vw, 28px);
          animation: hero-fade 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        /* Headline besar, bobot regular, leading rapat — mengikuti referensi */
        .hero-title {
          font-size: clamp(38px, 6vw, 96px);
          line-height: 1.02;
          letter-spacing: -0.035em;
          font-weight: 400;
          color: var(--color-studio-ink);
          margin-bottom: clamp(32px, 4vw, 56px);
          max-width: 13em;
          text-wrap: balance;
        }

        /* Mask: padding bawah memberi ruang descender (g, p) agar tidak terpotong */
        .hero-word {
          display: inline-block;
          overflow: hidden;
          vertical-align: top;
          padding-bottom: 0.12em;
          margin-bottom: -0.12em;
        }

        .hero-word-inner {
          display: inline-block;
          animation: hero-word-up 1s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        @keyframes hero-word-up {
          from { transform: translateY(110%); }
          to   { transform: translateY(0); }
        }

        @keyframes hero-fade {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── CTA interaktif ── */
        .hero-cta-wrap {
          animation: hero-fade 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.75s both;
        }

        .hero-cta-wrap a.hero-cta {
          display: inline-flex;
          position: relative;
          overflow: hidden;
          isolation: isolate;
          gap: 14px;
          padding-right: 10px;
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 0.4s ease;
        }

        /* Lapisan isi yang menyapu dari bawah saat hover */
        .hero-cta::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          background: #333;
          border-radius: inherit;
          transform: translateY(101%);
          transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .hero-cta:hover {
          opacity: 1;
          transform: translateY(-2px);
          box-shadow: 0 10px 24px -12px rgba(26, 26, 26, 0.55);
        }

        .hero-cta:hover::before { transform: translateY(0); }
        .hero-cta:active { transform: translateY(0) scale(0.97); }

        /* Label bergulir: teks lama naik keluar, salinannya masuk dari bawah */
        .hero-cta-label {
          display: inline-block;
          overflow: hidden;
          line-height: 1.2;
          height: 1.2em;
        }

        .hero-cta-roll {
          display: inline-block;
          position: relative;
          transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .hero-cta-roll::after {
          content: attr(data-text);
          position: absolute;
          left: 0;
          top: 100%;
        }

        .hero-cta:hover .hero-cta-roll { transform: translateY(-100%); }

        /* Panah dalam lingkaran: berputar dari diagonal ke lurus saat hover */
        .hero-cta-arrow {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          border-radius: 9999px;
          background: var(--color-card-white);
          color: var(--color-studio-ink);
          transform: rotate(-45deg);
          transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .hero-cta:hover .hero-cta-arrow { transform: rotate(0deg) scale(1.08); }

        @media (max-width: 480px) {
          .hero-cta-wrap a.hero-cta { width: 100%; justify-content: center; }
        }
      `}</style>
    </section>
  );
}
