"use client";

import { useState, type ReactNode } from "react";

type SpecimenProps = {
  index: number;
  name: string;
  blurb: string;
  cli: string;
  docs: string;
  wide?: boolean;
  full?: boolean;
  children: ReactNode;
};

export default function Specimen({
  index,
  name,
  blurb,
  cli,
  docs,
  wide = false,
  full = false,
  children,
}: SpecimenProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(cli);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <article
      className={`group relative flex flex-col border border-bone/10 bg-bone/[0.015] transition-colors duration-700 hover:border-gold/25 ${
        full ? "md:col-span-2 lg:col-span-3" : wide ? "md:col-span-2" : ""
      }`}
    >
      <header className="flex items-start justify-between gap-6 border-b border-bone/10 px-6 py-5">
        <div>
          <p className="eyebrow text-[0.625rem] tracking-[0.3em] text-gold/60">
            {String(index).padStart(2, "0")}
          </p>
          <h3 className="display mt-2 text-[1.75rem] leading-none text-bone">
            {name}
          </h3>
        </div>
        <a
          href={docs}
          target="_blank"
          rel="noreferrer"
          className="mt-1 shrink-0 text-[0.625rem] uppercase tracking-[0.28em] text-mist transition-colors duration-500 hover:text-gold"
        >
          Docs ↗
        </a>
      </header>

      <div className="flex min-h-[13rem] flex-1 items-center justify-center px-6 py-12">
        {children}
      </div>

      <p className="px-6 pb-6 text-[0.9375rem] leading-relaxed text-mist">
        {blurb}
      </p>

      <footer className="mt-auto flex items-center gap-4 border-t border-bone/10 px-6 py-4">
        <code className="flex-1 truncate font-mono text-[0.6875rem] text-bone/45">
          {cli}
        </code>
        <button
          type="button"
          onClick={copy}
          className="shrink-0 border border-bone/15 px-3 py-1.5 text-[0.625rem] uppercase tracking-[0.24em] text-mist transition-all duration-500 hover:border-gold/50 hover:text-gold"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </footer>
    </article>
  );
}
