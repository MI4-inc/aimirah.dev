"use client";

import Silk from "@/components/reactbits/Silk/Silk";
import LightRays from "@/components/reactbits/LightRays/LightRays";
import { useEffect, useRef, useState } from "react";
import AnimatedContent from "@/components/reactbits/AnimatedContent/AnimatedContent";
import FluxSpecimen from "@/components/site/FluxSpecimen";
import { BACKDROP_SPECS } from "@/lib/specimens";

export default function Backdrops() {
  const silkRef = useRef<HTMLDivElement>(null);
  const [silkVisible, setSilkVisible] = useState(false);

  useEffect(() => {
    const el = silkRef.current;
    if (el == null) return;
    const observer = new IntersectionObserver(
      entries => setSilkVisible(entries.some(entry => entry.isIntersecting)),
      { rootMargin: "0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="backdrops" className="relative border-t border-bone/10 py-24 md:py-32">
      <div className="shell">
        <AnimatedContent distance={40} duration={1.1} ease="power3.out" threshold={0.15}>
          <div className="max-w-3xl">
            <p className="eyebrow text-gold/70">IV · Backgrounds</p>
            <h2 className="display mt-6 text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.02] text-bone">
              What the page is standing on.
            </h2>
            <div className="rule mt-8" />
            <p className="mt-8 max-w-2xl text-[1.0625rem] leading-relaxed text-mist">
              Two shader backdrops, plus 4IM/Flux. Silk is running behind the hero above; Light Rays
              closes the page below. Both are framed here at rest so you can read them plainly.
            </p>
          </div>
        </AnimatedContent>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex flex-col border border-bone/10 bg-bone/[0.015]">
            <div ref={silkRef} className="relative h-[320px] w-full overflow-hidden">
              <Silk
                frameloop={silkVisible ? "always" : "never"}
                dpr={[1, 1.5]}
                speed={2.6}
                scale={1.15}
                color="#7b6134"
                noiseIntensity={1.1}
                rotation={0.25}
              />
            </div>
            <div className="border-t border-bone/10 p-6">
              <h3 className="display text-[1.75rem] leading-none text-bone">Silk</h3>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-mist">
                {BACKDROP_SPECS[0].blurb}
              </p>
              <code className="mt-5 block truncate font-mono text-[0.6875rem] text-bone/45">
                {BACKDROP_SPECS[0].cli}
              </code>
            </div>
          </div>

          <div className="flex flex-col border border-bone/10 bg-bone/[0.015]">
            <div className="relative h-[320px] w-full overflow-hidden bg-ink">
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
            <div className="border-t border-bone/10 p-6">
              <h3 className="display text-[1.75rem] leading-none text-bone">Light Rays</h3>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-mist">
                {BACKDROP_SPECS[1].blurb}
              </p>
              <code className="mt-5 block truncate font-mono text-[0.6875rem] text-bone/45">
                {BACKDROP_SPECS[1].cli}
              </code>
            </div>
          </div>
        </div>

        <FluxSpecimen />
      </div>
    </section>
  );
}
