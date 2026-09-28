"use client";

import type { CSSProperties } from "react";
import Section from "@/components/site/Section";
import Specimen from "@/components/site/Specimen";
import { SURFACE_SPECS } from "@/lib/specimens";
import SpotlightCard from "@/components/reactbits/SpotlightCard/SpotlightCard";
import GlassSurface from "@/components/reactbits/GlassSurface/GlassSurface";
import TiltedCard from "@/components/reactbits/TiltedCard/TiltedCard";
import ChromaGrid from "@/components/reactbits/ChromaGrid/ChromaGrid";
import Stepper, { Step } from "@/components/reactbits/Stepper/Stepper";
import PillNav from "@/components/reactbits/PillNav/PillNav";
import ClientOnly from "@/components/site/ClientOnly";

const VENTURES = [
  {
    image: "/art/art-01.jpg",
    title: "Aimirah Core",
    subtitle: "Reasoning",
    handle: "@aimirah",
    borderColor: "#c8a96a",
    gradient: "linear-gradient(145deg, #0d0d11, #07070a)",
  },
  {
    image: "/art/art-02.jpg",
    title: "North Vault",
    subtitle: "Custody",
    handle: "@northvault",
    borderColor: "#8a6b3a",
    gradient: "linear-gradient(145deg, #0d0d11, #07070a)",
  },
  {
    image: "/art/art-03.jpg",
    title: "Signal Index",
    subtitle: "Retrieval",
    handle: "@signalindex",
    borderColor: "#c8a96a",
    gradient: "linear-gradient(145deg, #0d0d11, #07070a)",
  },
  {
    image: "/art/art-04.jpg",
    title: "Halcyon",
    subtitle: "Interface",
    handle: "@halcyon",
    borderColor: "#8a6b3a",
    gradient: "linear-gradient(145deg, #0d0d11, #07070a)",
  },
];

export default function SurfaceGallery() {
  return (
    <Section
      id="surfaces"
      label="III · Components"
      title="Surfaces that hold their shape."
      lede="Six structural specimens — the containers, cards and navigation that carry the content. Each is shown here with real Aimirah material inside it."
    >
      <Specimen index={14} {...SURFACE_SPECS[0]}>
        <div className="w-full [&>div]:rounded-sm [&>div]:border-bone/10 [&>div]:bg-ink-soft/70 [&>div]:p-8">
          <SpotlightCard spotlightColor={"rgba(200,169,106,0.16)" as `rgba(${number}, ${number}, ${number}, ${number})`}>
            <p className="display text-2xl text-bone">Briefing no. 04</p>
            <p className="mt-3 text-sm leading-relaxed text-mist">
              A pool of champagne light tracks the pointer across the panel. Nothing else on the
              card moves.
            </p>
            <div className="rule mt-7" />
            <p className="eyebrow mt-6 text-[0.5625rem] text-mist">Move the pointer</p>
          </SpotlightCard>
        </div>
      </Specimen>

      <Specimen index={15} {...SURFACE_SPECS[1]}>
        <ClientOnly
          fallback={
            <div className="h-[186px] w-[300px] border border-bone/10 bg-bone/[0.02]" />
          }
        >
        <GlassSurface
          width={300}
          height={186}
          borderRadius={14}
          brightness={46}
          opacity={0.92}
          blur={12}
          displace={0.6}
          backgroundOpacity={0.08}
          saturation={1.15}
          distortionScale={-150}
          mixBlendMode="screen"
        >
          <div className="px-8 text-left">
            <p className="eyebrow text-[0.5625rem] text-gold/70">Custody</p>
            <p className="display mt-4 text-[1.75rem] leading-none text-bone">North Vault</p>
            <p className="mt-3 text-xs leading-relaxed text-bone/60">
              Refraction, edge light, and a held breath.
            </p>
          </div>
        </GlassSurface>
        </ClientOnly>
      </Specimen>

      <Specimen index={16} {...SURFACE_SPECS[2]}>
        <TiltedCard
          imageSrc="/art/art-01.jpg"
          altText="Aimirah Core — champagne light study"
          captionText="Aimirah Core — study no. 01"
          containerHeight="230px"
          containerWidth="100%"
          imageHeight="230px"
          imageWidth="300px"
          rotateAmplitude={9}
          scaleOnHover={1.06}
          showMobileWarning={false}
          showTooltip
          displayOverlayContent
          overlayContent={
            <div className="rounded-sm border border-gold/30 bg-ink/80 px-4 py-2 backdrop-blur-sm">
              <p className="eyebrow text-[0.5625rem] text-gold-soft">Hover · tilt</p>
            </div>
          }
        />
      </Specimen>

      <Specimen index={17} {...SURFACE_SPECS[3]}>
        <div className="w-full">
          <ChromaGrid items={VENTURES} radius={240} damping={0.45} fadeOut={0.7} ease="power3.out" />
        </div>
      </Specimen>

      <Specimen index={18} {...SURFACE_SPECS[4]}>
        <div
          className="w-full [&>div>div]:rounded-sm [&>div>div]:shadow-none"
          style={{ "--border-primary": "rgba(200,169,106,0.22)" } as CSSProperties}
        >
          <Stepper
            className="flex w-full flex-col items-center justify-center"
            initialStep={1}
            backButtonText="Previous"
            nextButtonText="Continue"
            contentClassName="text-left"
            backButtonProps={{
              className:
                "text-[0.625rem] uppercase tracking-[0.28em] text-mist transition hover:text-gold",
            }}
            nextButtonProps={{
              className:
                "flex items-center justify-center rounded-full bg-gold px-5 py-2 text-[0.625rem] uppercase tracking-[0.28em] text-ink transition duration-[350ms] hover:bg-gold-soft",
            }}
          >
            <Step>
              <p className="display text-2xl text-bone">I · Briefing</p>
              <p className="mt-2 text-sm leading-relaxed text-mist">
                A week of listening. We leave with the problem written in your words, not ours.
              </p>
            </Step>
            <Step>
              <p className="display text-2xl text-bone">II · Architecture</p>
              <p className="mt-2 text-sm leading-relaxed text-mist">
                Model selection, retrieval topology, and the evaluation that will judge it.
              </p>
            </Step>
            <Step>
              <p className="display text-2xl text-bone">III · Integration</p>
              <p className="mt-2 text-sm leading-relaxed text-mist">
                Deployed inside your perimeter, against your data, under your audit.
              </p>
            </Step>
            <Step>
              <p className="display text-2xl text-bone">IV · Custody</p>
              <p className="mt-2 text-sm leading-relaxed text-mist">
                We hand over the runbooks, the weights, and the keys. Then we step back.
              </p>
            </Step>
          </Stepper>
        </div>
      </Specimen>

      <Specimen index={19} {...SURFACE_SPECS[5]}>
        <div className="relative h-[130px] w-full overflow-hidden">
          <PillNav
            logo="/aimirah-mark.svg"
            logoAlt="Aimirah"
            items={[
              { label: "Aimirah", href: "#top" },
              { label: "Text", href: "#text" },
              { label: "Motion", href: "#motion" },
            ]}
            activeHref="#top"
            baseColor="#0b0b0d"
            pillColor="#c8a96a"
            pillTextColor="#f3eee6"
            hoveredPillTextColor="#0b0b0d"
          />
        </div>
      </Specimen>
    </Section>
  );
}
