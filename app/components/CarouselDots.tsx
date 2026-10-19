"use client";

import { useEffect, useState } from "react";

/**
 * Titik indikator untuk deretan kartu yang di HP berubah jadi carousel geser
 * (CSS scroll-snap). Komponen ini hanya membaca/menggeser `scrollLeft` wadahnya,
 * jadi halaman tidak ikut tergulir. Di layar lebar (tanpa overflow) titik
 * disembunyikan lewat CSS dan tidak ada yang digeser.
 */
export default function CarouselDots({
  targetId,
  count,
  start = 0,
  label,
}: {
  /** id elemen wadah kartu yang bisa digeser. */
  targetId: string;
  count: number;
  /** Kartu yang tampil pertama kali di HP. */
  start?: number;
  label: string;
}) {
  const [active, setActive] = useState(start);

  const centerOf = (el: HTMLElement, i: number) => {
    const card = el.children[i] as HTMLElement | undefined;
    if (!card) return 0;
    return card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2;
  };

  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;

    if (el.scrollWidth > el.clientWidth + 1) {
      el.scrollLeft = centerOf(el, start);
    }

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const mid = el.scrollLeft + el.clientWidth / 2;
        let best = 0;
        let bestDist = Infinity;
        Array.from(el.children).forEach((c, i) => {
          const card = c as HTMLElement;
          const d = Math.abs(card.offsetLeft + card.offsetWidth / 2 - mid);
          if (d < bestDist) {
            bestDist = d;
            best = i;
          }
        });
        setActive(best);
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    /* Ukuran layar berubah (mis. diputar) → titik aktif dihitung ulang */
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [targetId, start]);

  const go = (i: number) => {
    const el = document.getElementById(targetId);
    if (el) el.scrollTo({ left: centerOf(el, i), behavior: "smooth" });
  };

  return (
    <div className="cdots" role="group" aria-label={label}>
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          className={`cdots-dot${i === active ? " is-active" : ""}`}
          aria-label={`Kartu ${i + 1} dari ${count}`}
          aria-current={i === active}
          onClick={() => go(i)}
        />
      ))}
      <style>{`
        .cdots { display: none; }
        @media (max-width: 767px) {
          .cdots {
            display: flex;
            justify-content: center;
            gap: 4px;
            margin-top: 14px;
          }
        }
        /* Target sentuh 24px, titik yang terlihat 8px */
        .cdots-dot {
          position: relative;
          width: 24px;
          height: 24px;
          padding: 0;
          border: none;
          background: none;
          cursor: pointer;
        }
        .cdots-dot::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 8px;
          height: 8px;
          border-radius: 9999px;
          background: var(--color-ink-20);
          transform: translate(-50%, -50%);
          transition: width 0.3s ease, background-color 0.3s ease;
        }
        .cdots-dot.is-active::after {
          width: 20px;
          background: var(--color-studio-ink);
        }
      `}</style>
    </div>
  );
}
