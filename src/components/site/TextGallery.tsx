"use client";

import Section from "@/components/site/Section";
import Specimen from "@/components/site/Specimen";
import { TEXT_SPECS } from "@/lib/specimens";
import SplitText from "@/components/reactbits/SplitText/SplitText";
import BlurText from "@/components/reactbits/BlurText/BlurText";
import ShinyText from "@/components/reactbits/ShinyText/ShinyText";
import RotatingText from "@/components/reactbits/RotatingText/RotatingText";
import GradientText from "@/components/reactbits/GradientText/GradientText";
import CircularText from "@/components/reactbits/CircularText/CircularText";
import CountUp from "@/components/reactbits/CountUp/CountUp";

export default function TextGallery() {
  return (
    <Section
      id="text"
      label="I · Text Animations"
      title="Type that arrives, never appears."
      lede="Seven text specimens. Each one is set in the house serif and tuned to the slow end of its range — nothing on this page should ever startle the reader."
    >
      <Specimen index={1} {...TEXT_SPECS[0]}>
        <SplitText
          tag="h3"
          text="Composure"
          className="display text-[clamp(2rem,4vw,3rem)] leading-none text-bone"
          delay={45}
          duration={0.95}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 30, rotateX: -45 }}
          to={{ opacity: 1, y: 0, rotateX: 0 }}
          textAlign="center"
        />
      </Specimen>

      <Specimen index={2} {...TEXT_SPECS[1]}>
        <BlurText
          text="Restraint, rendered."
          className="display text-[clamp(1.75rem,3.4vw,2.5rem)] text-bone/85"
          animateBy="words"
          direction="top"
          delay={40}
          stepDuration={0.5}
        />
      </Specimen>

      <Specimen index={3} {...TEXT_SPECS[2]}>
        <ShinyText
          text="Aimirah — MI4 Inc."
          speed={4}
          color="#7d7869"
          shineColor="#e7d6b0"
          spread={130}
          className="display text-[clamp(1.5rem,3vw,2.25rem)]"
        />
      </Specimen>

      <Specimen index={4} {...TEXT_SPECS[3]}>
        <p className="display text-center text-[clamp(1.5rem,3vw,2.25rem)] text-bone/85">
          We build{" "}
          <RotatingText
            texts={["signal", "silence", "structure", "systems"]}
            mainClassName="text-gold-soft"
            staggerFrom="last"
            rotationInterval={2400}
            transition={{ type: "spring", damping: 22, stiffness: 220 }}
          />
        </p>
      </Specimen>

      <Specimen index={5} {...TEXT_SPECS[4]}>
        <GradientText
          colors={["#8a6b3a", "#c8a96a", "#f3eee6", "#c8a96a", "#8a6b3a"]}
          animationSpeed={11}
          showBorder={false}
          direction="horizontal"
          className="display text-[clamp(1.75rem,3.6vw,2.75rem)]"
        >
          Champagne
        </GradientText>
      </Specimen>

      <Specimen index={6} {...TEXT_SPECS[5]}>
        <div className="scale-[0.72]">
          <div className="[&>div]:h-[200px] [&>div]:w-[200px] [&>div]:font-normal [&>div]:text-gold/60 [&>div>span]:text-[15px] [&>div>span]:font-normal [&>div>span]:tracking-[0.28em]">
            <CircularText text="AIMIRAH · MI4 INC · MMXXVI · " spinDuration={26} onHover="slowDown" />
          </div>
        </div>
      </Specimen>

      <Specimen index={7} {...TEXT_SPECS[6]}>
        <div className="text-center">
          <CountUp
            to={2026}
            from={1900}
            duration={2.6}
            separator=""
            className="display block text-[clamp(2.5rem,5vw,3.5rem)] leading-none text-bone"
          />
          <p className="eyebrow mt-4 text-[0.5625rem]">Anno · Est. MI4</p>
        </div>
      </Specimen>
    </Section>
  );
}
