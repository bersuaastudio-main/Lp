"use client";

import { trackWAClick } from "@/app/lib/tracking";
import { WA_NUMBER } from "@/app/lib/constants";

interface CTAButtonProps {
  location: string;
  message?: string;
  className?: string;
  fullWidth?: boolean;
  /** Dipakai di section berlatar Studio Ink — tombol putih di atas gelap. */
  inverted?: boolean;
  /** "link" untuk tautan teks bergaris bawah, bukan tombol terisi. */
  variant?: "button" | "link";
  children: React.ReactNode;
}

export function buildWALink(message: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

export default function CTAButton({
  location,
  message = "Halo Bersua, saya ingin tanya soal pembuatan halaman bisnis. Bisnis saya bergerak di bidang ____",
  className = "",
  fullWidth = false,
  inverted = false,
  variant = "button",
  children,
}: CTAButtonProps) {
  const base =
    variant === "link"
      ? "btn-link"
      : inverted
        ? "btn-primary-inverted"
        : "btn-primary";

  return (
    <a
      href={buildWALink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${fullWidth && variant !== "link" ? "btn-primary-full" : ""} ${className}`}
      onClick={() => trackWAClick(location)}
      aria-label={`Hubungi via WhatsApp dari ${location}`}
    >
      {children}
    </a>
  );
}
