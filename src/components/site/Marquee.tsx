"use client";

import LogoLoop from "@/components/reactbits/LogoLoop/LogoLoop";

const VENTURES = [
  "Aimirah",
  "Signal Index",
  "North Vault",
  "Halcyon Labs",
  "Meridian Rail",
  "Quiet Machines",
];

export default function Marquee() {
  return (
    <div className="relative border-y border-bone/10 bg-ink-soft/40 py-8">
      <p className="shell eyebrow mb-6 text-[0.625rem] tracking-[0.36em] text-gold/50">
        Ventures of MI4 Inc.
      </p>
      <LogoLoop
        logos={VENTURES.map(name => ({
          node: (
            <span className="display whitespace-nowrap text-[1.5rem] text-bone/55 transition-colors duration-500 hover:text-gold-soft md:text-[1.75rem]">
              {name}
            </span>
          ),
          title: name,
          ariaLabel: name,
        }))}
        speed={70}
        direction="left"
        logoHeight={36}
        gap={72}
        pauseOnHover
        scaleOnHover
        fadeOut
        fadeOutColor="#07070a"
        ariaLabel="Ventures of MI4 Inc."
      />
    </div>
  );
}
