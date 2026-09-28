import type { ReactNode } from "react";
import AnimatedContent from "@/components/reactbits/AnimatedContent/AnimatedContent";

type SectionProps = {
  id: string;
  label: string;
  title: string;
  lede: string;
  children: ReactNode;
};

export default function Section({
  id,
  label,
  title,
  lede,
  children,
}: SectionProps) {
  return (
    <section id={id} className="relative border-t border-bone/10 py-24 md:py-32">
      <div className="shell">
        <AnimatedContent distance={40} duration={1.1} ease="power3.out" threshold={0.15}>
          <div className="max-w-3xl">
            <p className="eyebrow text-gold/70">{label}</p>
            <h2 className="display mt-6 text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.02] text-bone">
              {title}
            </h2>
            <div className="rule mt-8" />
            <p className="mt-8 max-w-2xl text-[1.0625rem] leading-relaxed text-mist">
              {lede}
            </p>
          </div>
        </AnimatedContent>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {children}
        </div>
      </div>
    </section>
  );
}
