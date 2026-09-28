"use client";

import LightRays from "@/components/reactbits/LightRays/LightRays";
import GradientText from "@/components/reactbits/GradientText/GradientText";
import ShinyText from "@/components/reactbits/ShinyText/ShinyText";

const COLUMNS = [
  {
    heading: "Index",
    links: [
      { label: "Text animations", href: "#text" },
      { label: "Animations", href: "#motion" },
      { label: "Components", href: "#surfaces" },
      { label: "Backgrounds", href: "#backdrops" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-bone/10">
      <div className="absolute inset-0 opacity-90">
        <LightRays
          raysOrigin="top-center"
          raysColor="#c8a96a"
          raysSpeed={0.55}
          lightSpread={1.6}
          rayLength={2.6}
          pulsating={false}
          fadeDistance={0.75}
          saturation={1.15}
          followMouse
          mouseInfluence={0.18}
          noiseAmount={0.02}
          distortion={0.02}
        />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-b from-transparent to-ink" />

      <div className="shell relative z-10 py-24 md:py-28">
        <div className="grid gap-16 md:grid-cols-[1.1fr_1.4fr]">
          <div>
            <GradientText
              colors={["#8a6b3a", "#c8a96a", "#f3eee6", "#c8a96a", "#8a6b3a"]}
              animationSpeed={13}
              direction="horizontal"
              className="display text-[clamp(3rem,7vw,5.5rem)] leading-none"
            >
              Aimirah
            </GradientText>
            <p className="mt-8 max-w-sm text-[1.0625rem] leading-relaxed text-mist">
              The intelligence division of MI4 Inc. We build systems that are quiet enough to be
              trusted with real work.
            </p>
            <div className="rule mt-10 max-w-sm" />
            <div className="mt-8 space-y-3">
              <p className="eyebrow text-[0.5625rem] text-mist">MI4 Inc.</p>
              <p>
                <a
                  href="mailto:ai@mi4inc.com"
                  className="text-sm text-bone/70 transition-colors duration-500 hover:text-gold-soft"
                >
                  ai@mi4inc.com
                </a>
              </p>
              <p>
                <a
                  href="https://aimirah.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-bone/70 transition-colors duration-500 hover:text-gold-soft"
                >
                  aimirah.com
                </a>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2">
            {COLUMNS.map(column => (
              <div key={column.heading}>
                <p className="eyebrow text-[0.5625rem] text-gold/70">{column.heading}</p>
                <ul className="mt-6 space-y-4">
                  {column.links.map(link => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-bone/70 transition-colors duration-500 hover:text-gold-soft"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="rule my-16" />

        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <ShinyText
            text="Twenty-one specimens · React Bits · open source"
            speed={6}
            color="#7d7869"
            shineColor="#e7d6b0"
            spread={130}
            className="eyebrow text-[0.625rem]"
          />
          <p className="eyebrow text-[0.5625rem] text-mist">© MMXXVI MI4 Inc.</p>
        </div>
      </div>
    </footer>
  );
}
