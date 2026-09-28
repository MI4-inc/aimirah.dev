"use client";

import CountUp from "@/components/reactbits/CountUp/CountUp";
import AnimatedContent from "@/components/reactbits/AnimatedContent/AnimatedContent";

const FIGURES = [
  { value: 124, label: "Institutions served", suffix: "" },
  { value: 38, label: "Median latency, ms", suffix: "" },
  { value: 12, label: "Models in production", suffix: "" },
  { value: 99, label: "Uptime, trailing year", suffix: "%" },
];

export default function Stats() {
  return (
    <section className="relative border-t border-bone/10 py-20">
      <div className="shell">
        <AnimatedContent distance={30} duration={1} ease="power3.out" threshold={0.2}>
          <div className="grid grid-cols-2 gap-y-12 md:grid-cols-4">
            {FIGURES.map(figure => (
              <div key={figure.label} className="px-2 md:border-l md:border-bone/10 md:px-8 md:first:border-l-0">
                <p className="display text-[clamp(2.5rem,5vw,4rem)] leading-none text-bone">
                  <CountUp
                    to={figure.value}
                    from={0}
                    duration={2.4}
                    separator=""
                    className="display"
                  />
                  <span className="text-gold">{figure.suffix}</span>
                </p>
                <div className="mt-4 h-px w-10 bg-gold/40" />
                <p className="eyebrow mt-4 text-[0.5625rem] leading-[1.6]">
                  {figure.label}
                </p>
              </div>
            ))}
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
}
