"use client";

import { WA_NUMBER, WA_DEFAULT } from "@/app/lib/constants";
import { openLeadForm } from "./LeadForm";

interface CTAButtonProps {
  location: string;
  message?: string;
  className?: string;
  fullWidth?: boolean;
  /** Dipakai di section berlatar Studio Ink — tombol putih di atas gelap. */
  inverted?: boolean;
  /** "link" untuk tautan teks bergaris bawah, bukan tombol terisi. */
  variant?: "button" | "link";
  /** Paket yang langsung terpilih di form leads (mis. dari kartu harga). */
  paket?: string;
  children: React.ReactNode;
}

export function buildWALink(message: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

export default function CTAButton({
  location,
  message = WA_DEFAULT,
  className = "",
  fullWidth = false,
  inverted = false,
  variant = "button",
  paket,
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
      /* Buka form leads dulu; href tetap ada sebagai cadangan tanpa JavaScript */
      onClick={(e) => {
        e.preventDefault();
        openLeadForm({ location, paket });
      }}
      aria-haspopup="dialog"
    >
      {children}
    </a>
  );
}
