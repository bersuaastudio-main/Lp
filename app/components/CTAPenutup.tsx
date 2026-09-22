import Section from "./Section";
import { WA_NUMBER, WA_DEFAULT } from "@/app/lib/constants";

/** 09 · Mulai — naskah dari content.md S9. Menyebut apa yang terjadi setelah klik (REQ-C9.2). */
export default function CTAPenutup() {
  const message = WA_DEFAULT;

  return (
    <Section
      id="mulai"
      track="cta_penutup"
      heading="Saatnya membawa bisnis Anda bersaing di level global."
      surface="ink"
    >
      <div style={{ maxWidth: 620, marginInline: "auto", textAlign: "center" }}>
        <div className="ctap-wrap">
          <a
            href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary-inverted"
          >
            Konsultasi Gratis
          </a>
        </div>
      </div>

      <style>{`
        /* Tanpa garis pemisah di bawah heading — section penutup dibiarkan bersih */
        #mulai .sec-body {
          border-top: none;
          padding-top: 0;
        }

        .ctap-body {
          font-size: var(--text-body);
          line-height: var(--leading-body);
          color: rgba(255,255,255,0.7);
          margin-bottom: var(--spacing-16);
        }

        .ctap-wrap { margin-top: var(--spacing-32); display: flex; justify-content: center; }

        .ctap-meta {
          margin-top: var(--spacing-16);
          font-size: var(--text-caption);
          letter-spacing: var(--tracking-caption);
          color: rgba(255,255,255,0.45);
        }

        @media (max-width: 480px) {
          .ctap-wrap a { width: 100%; }
        }
      `}</style>
    </Section>
  );
}
