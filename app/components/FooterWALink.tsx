"use client";

import { trackWAClick } from "@/app/lib/tracking";

/** Nomor WA di footer — langsung ke WhatsApp tanpa form, tapi tetap tercatat. */
export default function FooterWALink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWAClick("footer")}
    >
      {children}
    </a>
  );
}
