/**
 * tracking.ts
 * GA4 + Meta Pixel event helpers — satu tempat untuk semua tracking event halaman.
 * Semua fungsi silent-fail jika gtag/fbq belum tersedia (SSR / ad-block).
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

function track(eventName: string, params?: Record<string, string | number>) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params ?? {});
  }
}

/* Meta Pixel: standard event dipakai untuk optimasi iklan, custom event untuk
   rincian per section. */
function trackMeta(eventName: string, params?: Record<string, string | number>) {
  if (typeof window === "undefined") return;
  if (typeof window.fbq === "function") {
    window.fbq("track", eventName, params ?? {});
  }
}

/* ─── CTA Click Events ───────────────────────────────────────────────────── */
/* Klik WhatsApp = konversi utama LP → dikirim sebagai "Contact" ke Meta agar
   kampanye bisa dioptimasi ke event ini. */
export const trackWAClick = (location: string) => {
  track("wa_click", { click_location: location });
  trackMeta("Contact", { content_name: location });
};

/* ─── Scroll Depth ───────────────────────────────────────────────────────── */
export function initScrollDepthTracking() {
  if (typeof window === "undefined") return;
  const milestones = [25, 50, 75, 100];
  const fired = new Set<number>();

  const onScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;
    const pct = Math.round((scrollTop / docHeight) * 100);
    milestones.forEach((m) => {
      if (pct >= m && !fired.has(m)) {
        fired.add(m);
        track("scroll_depth", { depth_percent: m });
      }
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
}

/* ─── Section View (Intersection Observer, 3s dwell) ────────────────────── */
export function initSectionViewTracking() {
  if (typeof window === "undefined") return;
  if (!("IntersectionObserver" in window)) return;

  const sections = document.querySelectorAll<HTMLElement>("[data-track-section]");
  const timers = new Map<string, ReturnType<typeof setTimeout>>();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const name =
          (entry.target as HTMLElement).dataset.trackSection ?? "unknown";
        if (entry.isIntersecting) {
          const t = setTimeout(() => {
            track("section_view", { section_name: name });
          }, 3000);
          timers.set(name, t);
        } else {
          const existing = timers.get(name);
          if (existing) {
            clearTimeout(existing);
            timers.delete(name);
          }
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach((el) => observer.observe(el));
  return () => observer.disconnect();
}
