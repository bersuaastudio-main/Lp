import Section from "./Section";

/** 08 · Kutipan founder — kutipan, nama, dan peran saja. */
export default function Tentang() {
  return (
    <Section
      id="tentang"
      track="tentang"
      heading=""
      surface="cream"
    >
      <div className="founder-grid">
        <div className="founder-left">
          <blockquote className="founder-quote">
            &ldquo;Di era ketika website semakin mudah dibuat, apakah website Anda
            benar-benar tepat untuk bisnis Anda?&rdquo;
          </blockquote>

          <div className="founder-identity">
            <p className="founder-name">Rafif</p>
            <p className="founder-role">Founder, Bersua</p>
          </div>
        </div>
      </div>

      <style>{`
        #tentang .sec-body { border-top: none; padding-top: 0; }

        .founder-grid {
          display: grid;
          grid-template-columns: 1fr;
          justify-items: center;
          text-align: center;
        }

        .founder-left {
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 820px;
        }


        .founder-quote {
          margin: 0 0 var(--spacing-24, 24px);
          padding: 0;
          border: none;
          font-size: clamp(26px, 2.8vw, 40px);
          font-weight: 400;
          line-height: 1.2;
          letter-spacing: -0.02em;
          color: var(--color-studio-ink);
        }


        .founder-identity { display: flex; flex-direction: column; gap: 4px; }
        .founder-name { font-size: 17px; color: var(--color-studio-ink); margin: 0; }
        .founder-role { font-size: 15px; color: var(--color-ink-60); margin: 0; }

        @media (max-width: 767px) {
          .founder-quote { font-size: clamp(22px, 6vw, 28px); }
        }
      `}</style>
    </Section>
  );
}
