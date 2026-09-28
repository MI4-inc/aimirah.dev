"use client";

import Section from "@/components/site/Section";
import Specimen from "@/components/site/Specimen";
import WhenVisible from "@/components/site/WhenVisible";
import { MOTION_SPECS } from "@/lib/specimens";
import AnimatedContent from "@/components/reactbits/AnimatedContent/AnimatedContent";
import Magnet from "@/components/reactbits/Magnet/Magnet";
import GlareHover from "@/components/reactbits/GlareHover/GlareHover";
import StarBorder from "@/components/reactbits/StarBorder/StarBorder";
import LogoLoop from "@/components/reactbits/LogoLoop/LogoLoop";
import Noise from "@/components/reactbits/Noise/Noise";

export default function MotionGallery() {
  return (
    <Section
      id="motion"
      label="II · Animations"
      title="Motion with good manners."
      lede="Six interaction specimens. Every easing curve here is long and every overshoot is small — the motion should read as material, not as personality."
    >
      <Specimen index={8} {...MOTION_SPECS[0]}>
        <AnimatedContent
          distance={70}
          direction="vertical"
          reverse={false}
          duration={1.2}
          ease="power3.out"
          initialOpacity={0}
          animateOpacity
          scale={0.96}
          threshold={0.1}
        >
          <div className="border border-gold/25 bg-ink-soft/60 px-8 py-7 text-center">
            <p className="display text-2xl text-bone">Carried in on scroll</p>
            <p className="eyebrow mt-3 text-[0.5625rem]">Distance 70 · Power3</p>
          </div>
        </AnimatedContent>
      </Specimen>

      <Specimen index={9} {...MOTION_SPECS[1]}>
        <Magnet padding={80} magnetStrength={3}>
          <div className="border border-gold/40 px-8 py-4">
            <span className="eyebrow text-bone">Lean toward me</span>
          </div>
        </Magnet>
      </Specimen>

      <Specimen index={10} {...MOTION_SPECS[2]}>
        <GlareHover
          width="100%"
          height="176px"
          background="#0d0d11"
          borderRadius="2px"
          borderColor="rgba(200,169,106,0.25)"
          glareColor="#e7d6b0"
          glareOpacity={0.28}
          glareAngle={-32}
          glareSize={320}
          transitionDuration={900}
          className="w-full"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/art/art-05.jpg"
            alt="Champagne light field"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />
          <span className="relative z-10 eyebrow text-bone">Hover for the light</span>
        </GlareHover>
      </Specimen>

      <Specimen index={11} {...MOTION_SPECS[3]}>
        <StarBorder
          as="button"
          type="button"
          color="#c8a96a"
          speed="6s"
          thickness={1}
          backgroundColor="#07070a"
          textColor="#f3eee6"
          borderColor="rgba(200,169,106,0.3)"
        >
          <span className="eyebrow text-[0.5625rem] text-bone">The one action</span>
        </StarBorder>
      </Specimen>

      <Specimen index={12} {...MOTION_SPECS[4]}>
        <div className="w-full">
          <LogoLoop
            logos={["Ink", "Bone", "Champagne", "Vellum"].map(name => ({
              node: (
                <span className="display whitespace-nowrap text-xl text-bone/60">{name}</span>
              ),
              title: name,
              ariaLabel: name,
            }))}
            speed={55}
            direction="left"
            logoHeight={28}
            gap={48}
            pauseOnHover
            hoverSpeed={12}
            fadeOut
            fadeOutColor="#07070a"
            ariaLabel="House palette"
          />
        </div>
      </Specimen>

      <Specimen index={13} {...MOTION_SPECS[5]}>
        <div className="relative h-[120px] w-full overflow-hidden border border-bone/10">
          <div className="absolute inset-0 opacity-[0.35]">
            <Noise patternSize={220} patternScaleX={1} patternScaleY={1} patternRefreshInterval={3} patternAlpha={22} />
          </div>
          <div className="relative z-10 grid h-full place-items-center">
            <span className="eyebrow text-[0.5625rem]">Grain · Alpha 22</span>
          </div>
        </div>
      </Specimen>
    </Section>
  );
}
