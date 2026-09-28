"use client";

import { useEffect, useState } from "react";

/**
 * Film grain with no per-frame cost.
 *
 * The React Bits <Noise> component redraws a 1024² canvas (1M Math.random calls plus a
 * 4 MB texture upload) every few frames. As a *full page overlay* that is the single most
 * expensive thing on the page and it lands straight on the main thread, which is what made
 * the 4IM/Flux band feel dead under the pointer. Here the tile is generated once at mount and
 * handed to the compositor; the animated React Bits version stays where it belongs — as
 * specimen 13 in the motion gallery, mounted only while it is on screen.
 */
export default function Grain() {
  const [tile, setTile] = useState<string | null>(null);

  useEffect(() => {
    const size = 128;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (ctx == null) return;

    const image = ctx.createImageData(size, size);
    const data = image.data;
    for (let i = 0; i < data.length; i += 4) {
      const v = (Math.random() * 256) | 0;
      data[i] = v;
      data[i + 1] = v;
      data[i + 2] = v;
      data[i + 3] = 26;
    }
    ctx.putImageData(image, 0, 0);
    setTile(canvas.toDataURL("image/png"));
  }, []);

  if (tile == null) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1200] opacity-[0.055]"
      style={{
        backgroundImage: `url(${tile})`,
        backgroundRepeat: "repeat",
        backgroundSize: "128px 128px",
        transform: "translateZ(0)",
      }}
    />
  );
}
