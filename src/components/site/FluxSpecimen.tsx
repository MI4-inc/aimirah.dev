"use client";

import Link from "next/link";
import FluxCanvas from "@/components/flux/FluxCanvas";
import { PRESET_COUNT, SHOWCASE_CONFIG } from "@/lib/fluid";

export default function FluxSpecimen() {
  return (
    <div className="mt-20">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow text-[0.5625rem] text-gold/60">Guest specimen</p>
          <h3 className="display mt-4 text-[1.75rem] leading-none text-bone">
            4IM/Flux
          </h3>
          <p className="mt-3 text-[0.9375rem] italic text-mist/80">
            A real-time GPU fluid playground.
          </p>
        </div>
        <Link
          href="/flux"
          className="text-[0.625rem] uppercase tracking-[0.24em] text-mist transition-colors duration-500 hover:text-gold"
        >
          Open the studio →
        </Link>
      </div>

      <div className="mt-6 h-[26rem] w-full border border-bone/10 bg-ink">
        <FluxCanvas config={SHOWCASE_CONFIG} adaptiveQuality />
      </div>

      <p className="mt-5 max-w-2xl text-[0.8125rem] leading-relaxed text-mist/65">
        Built on Pavel Dobryakov&apos;s WebGL solver (MIT) — ported to React and TypeScript, tuned
        to the house palette. Drag through it; multitouch works. {PRESET_COUNT} presets, image
        sources, stills, video capture and four quality tiers live in the studio.
      </p>
    </div>
  );
}
