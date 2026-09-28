"use client";

import { useEffect, useRef, useState } from "react";
import Silk from "@/components/reactbits/Silk/Silk";
import SplitText from "@/components/reactbits/SplitText/SplitText";
import RotatingText from "@/components/reactbits/RotatingText/RotatingText";
import BlurText from "@/components/reactbits/BlurText/BlurText";
import ShinyText from "@/components/reactbits/ShinyText/ShinyText";
import CircularText from "@/components/reactbits/CircularText/CircularText";
import Magnet from "@/components/reactbits/Magnet/Magnet";
import StarBorder from "@/components/reactbits/StarBorder/StarBorder";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [heroVisible, setHeroVisible] = useState(true);

  useEffect(() => {
    const el = heroRef.current;
    if (el == null) return;
    const observer = new IntersectionObserver(
      entries => setHeroVisible(entries.some(entry => entry.isIntersecting)),
      { rootMargin: "120px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={heroRef}
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* Backdrop — React Bits: Silk */}
      <div className="absolute inset-0 opacity-70">
        <Silk
          frameloop={heroVisible ? "always" : "never"}
          dpr={[1, 1.5]}
          speed={2.6}
          scale={1.15}
          color="#7b6134"
          noiseIntensity={1.1}
          rotation={0.25}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(115%_85%_at_50%_-10%,rgba(7,7,10,0.15)_0%,rgba(7,7,10,0.72)_58%,#07070a_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-ink" />

      <div className="shell relative z-10 pt-36 pb-28">
        <div className="max-w-4xl">
          <ShinyText
            text="MI4 INC · INTELLIGENCE DIVISION"
            speed={5}
            color="#8a8578"
            shineColor="#e7d6b0"
            spread={140}
            className="eyebrow tracking-[0.42em]"
          />

          <SplitText
            tag="h1"
            text="Intelligence, composed."
            className="display mt-10 text-[clamp(2.75rem,8.5vw,7rem)] leading-[0.92] text-bone"
            delay={55}
            duration={1.15}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 48, rotateX: -50 }}
            to={{ opacity: 1, y: 0, rotateX: 0 }}
            textAlign="left"
          />

          <p className="display mt-10 max-w-2xl text-[clamp(1.25rem,2.4vw,1.875rem)] leading-snug text-bone/75">
            Aimirah builds{" "}
            <RotatingText
              texts={["reasoning systems", "agent fleets", "signal engines", "quiet machines"]}
              mainClassName="text-gold-soft"
              staggerFrom="last"
              rotationInterval={2800}
              transition={{ type: "spring", damping: 22, stiffness: 220 }}
            />{" "}
            for institutions that measure twice.
          </p>

          <BlurText
            text="Every component on this page is a specimen. Twenty-one of them, drawn from the open source React Bits library, wearing the house palette of Aimirah — ink, bone and champagne, set in a serif that does not raise its voice."
            className="mt-10 max-w-xl text-[1.0625rem] leading-relaxed text-mist"
            animateBy="words"
            direction="top"
            delay={28}
            stepDuration={0.45}
          />

          <div className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-6">
            <Magnet padding={70} magnetStrength={2.2}>
              <StarBorder
                as="a"
                href="#surfaces"
                color="#c8a96a"
                speed="7s"
                thickness={1}
                backgroundColor="#07070a"
                textColor="#f3eee6"
                borderColor="rgba(200,169,106,0.35)"
              >
                <span className="eyebrow text-[0.625rem] text-bone">
                  Request a private briefing
                </span>
              </StarBorder>
            </Magnet>

            <a
              href="#text"
              className="eyebrow transition-colors duration-500 hover:text-gold"
            >
              Twenty-one specimens ↓
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-16 right-10 hidden xl:block">
        <div className="origin-bottom-right scale-[0.62]">
          <div className="[&>div]:h-[200px] [&>div]:w-[200px] [&>div]:font-normal [&>div]:text-gold/55 [&>div>span]:text-[15px] [&>div>span]:font-normal [&>div>span]:tracking-[0.28em]">
            <CircularText text="AIMIRAH · MI4 INC · MMXXVI · " spinDuration={28} onHover="speedUp" />
          </div>
        </div>
      </div>
    </section>
  );
}
