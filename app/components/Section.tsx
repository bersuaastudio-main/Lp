/**
 * Section — kerangka tunggal untuk seluruh halaman (LP-BLUEPRINT-v2 §2).
 *
 * Halaman sebelumnya memakai enam kerangka berbeda untuk enam section, sehingga
 * pembaca harus mempelajari ulang cara membaca setiap kali turun. Semua section
 * kecuali Hero dan CTA Penutup sekarang memakai skeleton ini:
 *
 *   [nomor · label] → [heading kesimpulan] → [sub 1 kalimat] → [konten]
 */

type Surface = "cream" | "white" | "ink";

const SURFACE: Record<Surface, { bg: string; fg: string; muted: string; rule: string }> = {
  cream: {
    bg: "var(--color-cream-paper)",
    fg: "var(--color-studio-ink)",
    muted: "var(--color-ink-60)",
    rule: "var(--color-ink-08)",
  },
  white: {
    bg: "var(--color-card-white)",
    fg: "var(--color-studio-ink)",
    muted: "var(--color-ink-60)",
    rule: "var(--color-ink-08)",
  },
  ink: {
    bg: "var(--color-studio-ink)",
    fg: "var(--color-card-white)",
    muted: "rgba(255,255,255,0.6)",
    rule: "rgba(255,255,255,0.12)",
  },
};

export default function Section({
  id,
  track,
  heading,
  sub,
  surface = "cream",
  className = "",
  children,
}: {
  id: string;
  track: string;
  /** Tanpa heading, seluruh blok header dilewati — section berdiri dari kontennya saja. */
  heading?: string;
  sub?: string;
  surface?: Surface;
  className?: string;
  children: React.ReactNode;
}) {
  const s = SURFACE[surface];
  const hasHead = Boolean(heading);

  return (
    <section
      id={id}
      data-track-section={track}
      className={`sec section-pad${className ? ` ${className}` : ""}`}
      style={{ backgroundColor: s.bg, color: s.fg }}
    >
      <div className="section-container">
        {hasHead ? (
          <header className="sec-head">
            <h2 className="sec-heading">{heading}</h2>

            {sub ? (
              <p className="sec-sub" style={{ color: s.muted }}>
                {sub}
              </p>
            ) : null}
          </header>
        ) : null}

        <div
          className={`sec-body${hasHead ? "" : " sec-body-bare"}`}
          style={{ borderTopColor: s.rule }}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
