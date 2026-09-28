import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "4IM/Flux — Aimirah | MI4 Inc.",
  description:
    "A real-time GPU fluid playground — 98 presets, particles that ride the velocity field, image sources, stills and video capture.",
};

export default function FluxLayout({ children }: { children: ReactNode }) {
  return children;
}
