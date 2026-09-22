import Image from "next/image";
import Section from "./Section";

/** 08 · Founder — editorial trust statement. Layout: asymmetric 2-col. */
export default function Tentang() {
  return (
    <Section
      id="tentang"
      track="tentang"
      heading=""
    >
      <div className="founder-grid">

        {/* LEFT — quote block */}
        <div className="founder-left">
          <span className="founder-qmark" aria-hidden="true">&ldquo;</span>

          <blockquote className="founder-quote">
            Setiap bisnis memiliki nilai sendiri untuk tumbuh. Kami akan
            membantu bisnis Anda dengan meningkatkan kredibilitas digital
            melalui website yang sesuai dengan kebutuhan bisnis Anda.
          </blockquote>

          <hr className="founder-divider" />

          <div className="founder-identity">
            <p className="founder-name">Rafif</p>
            <p className="founder-role">Founder, Bersua</p>
          </div>
        </div>

        {/* RIGHT — portrait */}
        <div className="founder-right">
          <div className="founder-photo">
            <Image
              src="/img/founder.webp"
              alt="Foto pendiri Bersua"
              fill
              sizes="(max-width: 600px) 80vw, (max-width: 768px) 50vw, 640px"
              className="founder-photo-img"
            />
          </div>
        </div>

      </div>

      <style>{`
        /* ── Grid ── */
        .founder-grid {
          display: grid;
          grid-template-columns: 48fr 52fr;
          gap: var(--spacing-64, 64px);
          align-items: center;
        }

        /* ── Left column ── */
        .founder-left {
          display: flex;
          flex-direction: column;
          max-width: 520px;
        }

        /* ── Quotation mark ── */
        .founder-qmark {
          display: block;
          font-size: 80px;
          font-weight: var(--weight-display);
          line-height: 0.85;
          color: var(--color-ink-20);
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
          font-weight: 500;
          line-height: 1.2;
          letter-spacing: -0.02em;
          color: var(--color-ink-100, #0a0a0a);
          margin-bottom: var(--spacing-48, 48px);
        }

        /* ── Divider ── */
        .founder-divider {
          border: none;
          border-top: 1px solid var(--color-ink-08);
          margin: 0 0 var(--spacing-24, 24px) 0;
          width: 100%;
        }

        /* ── Identity ── */
        .founder-identity {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .founder-name {
          font-size: 17px;
          font-weight: var(--weight-medium);
          color: var(--color-ink-100, #0a0a0a);
          margin: 0;
        }

        .founder-role {
          font-size: 15px;
          font-weight: 400;
          color: var(--color-ink-60);
          margin: 0;
        }

        /* ── Right column — portrait ── */
        .founder-right {
          width: 100%;
        }

        .founder-photo {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 5;
          border-radius: var(--radius-xl);
          background-color: var(--color-ink-08);
          overflow: hidden;
        }

        .founder-photo-img {
          object-fit: cover;
          object-position: center top;
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .founder-grid {
            grid-template-columns: 1fr 1fr;
            gap: var(--spacing-40, 40px);
            align-items: start;
          }
          .founder-quote {
            font-size: clamp(22px, 5vw, 30px);
            margin-bottom: var(--spacing-32, 32px);
          }
          .founder-qmark { font-size: 64px; }
        }

        @media (max-width: 600px) {
          .founder-grid {
            grid-template-columns: 1fr;
          }
          /* mobile order: quote block first, portrait second */
          .founder-left  { order: 1; max-width: 100%; }
          .founder-right { order: 2; max-width: 80%; }
          .founder-quote { font-size: clamp(24px, 7vw, 32px); }
        }
      `}</style>
    </Section>
  );
}
