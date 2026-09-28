"use client";

import Link from "next/link";

/**
 * The header is deliberately reduced to a single signature mark — no section
 * nav, no monogram. (PillNav is still in the library as a specimen; the site
 * chrome simply does not use it.)
 */
export default function Nav() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-[900] flex justify-center">
      <Link
        href="#top"
        className="pointer-events-auto mt-6 px-6 py-2 text-bone/75 transition-colors duration-700 hover:text-gold-soft"
      >
        <span className="display text-[0.9375rem] italic tracking-[0.2em]">
          nuramirahmohdkamil
        </span>
      </Link>
    </header>
  );
}
