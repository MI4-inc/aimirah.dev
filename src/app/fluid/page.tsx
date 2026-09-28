"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * The studio moved to /flux when it was renamed to 4IM/Flux.
 * A static export cannot issue a server redirect, so this does it client-side
 * and still shows a link if scripting is off.
 */
export default function FluidRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/flux");
  }, [router]);

  return (
    <main className="grid h-[100svh] w-full place-items-center bg-ink px-8 text-center">
      <p className="eyebrow text-[0.5625rem] text-mist">
        The Fluid Studio is now{" "}
        <a href="/flux" className="text-gold transition-colors duration-500 hover:text-gold-soft">
          4IM/Flux — open the studio →
        </a>
      </p>
    </main>
  );
}
