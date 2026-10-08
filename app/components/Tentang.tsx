import Section from "./Section";

/** Founder — editorial trust statement. Satu kolom, tanpa foto.
 *  Latar ink: menyambung showcase di atas dan Harga di bawah jadi satu blok gelap. */
export default function Tentang() {
  return (
    <Section
      id="tentang"
      track="tentang"
      heading=""
      surface="ink"
    >
      <div className="founder-grid">

        <div className="founder-left">
          <span className="founder-qmark" aria-hidden="true">&ldquo;</span>

          <blockquote className="founder-quote">
            Di era ketika website semakin mudah dibuat, apakah website Anda
            benar-benar tepat untuk bisnis Anda?
          </blockquote>

          <div className="founder-identity">
            <p className="founder-name">Rafif</p>
            <p className="founder-role">Founder, Bersua</p>
          </div>
        </div>

      </div>

      <style>{`
        /* ── Grid ── */
        .founder-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--spacing-64, 64px);
          align-items: center;
        }

        /* ── Left column ── */
        .founder-left {
          display: flex;
          flex-direction: column;
          max-width: 880px;
        }

        /* ── Quotation mark ── */
        .founder-qmark {
          display: block;
          font-size: 80px;
          font-weight: 400;
          line-height: 0.85;
          color: rgba(255, 255, 255, 0.2);
          margin-bottom: var(--spacing-24, 24px);
          font-family: inherit;
          user-select: none;
        }

        /* ── Quote ── */
        .founder-quote {
          margin: 0;
          padding: 0;
          border: none;
          font-size: clamp(28px, 3.2vw, 46px);
          font-weight: 400;
          line-height: 1.2;
          letter-spacing: -0.02em;
          color: var(--color-card-white);
          margin-bottom: var(--spacing-48, 48px);
        }

        /* ── Identity ── */
        .founder-identity {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .founder-name {
          font-size: 17px;
          font-weight: 400;
          color: var(--color-card-white);
          margin: 0;
        }

        .founder-role {
          font-size: 15px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.6);
          margin: 0;
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .founder-quote {
            font-size: clamp(24px, 6vw, 32px);
            margin-bottom: var(--spacing-32, 32px);
          }
          .founder-qmark { font-size: 64px; }
        }
      `}</style>
    </Section>
  );
}
