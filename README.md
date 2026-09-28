# Aimirah — MI4 Inc.

A luxury-serif specimen index for **Aimirah**, the intelligence division of **MI4 Inc.**, built entirely from
[React Bits](https://www.reactbits.dev) — the open source component library. Every element on the page is a
live, running React Bits component rather than a screenshot.

Stack: **Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4**. All React Bits components are the
**TypeScript + Tailwind** variants, pulled straight from the public registry.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static prerender, passes clean
```

## Deploying

The app is fully client-side, so it exports to plain static files.

```bash
STATIC_EXPORT=1 npm run build   # emits out/
cp -r out site-static           # out/ is not persisted in this workspace
node deploy-netlify.mjs <name>  # needs NETLIFY_TOKEN, uploads aimirah-static.zip
```

`STATIC_EXPORT=1` is what flips `output: 'export'` in `next.config.ts`; without it
`dev` and `build` behave exactly as before. The deploy script creates the Netlify site
and uploads the prebuilt zip through the API — no CLI, no build step on their side.

Current deployment: **https://aimirah-mi4.netlify.app**

## The house style

| Token | Value | Use |
| --- | --- | --- |
| `ink` | `#07070A` | Page ground |
| `ink-soft` | `#0D0D11` | Panel ground |
| `bone` | `#F3EEE6` | Primary type |
| `gold` | `#C8A96A` | Rule, accent, active pill |
| `gold-soft` | `#E7D6B0` | Highlight, hover type |
| `mist` | `#8A8578` | Secondary type |

Type is **Cormorant Garamond** (display, weight 300) over **Inter** (UI, wide uppercase tracking at
0.34em for labels). Hairline rules at 1px, motion tuned long and quiet, and a film grain over everything.

## The 21 specimens

**Backgrounds (2)** — Silk (hero backdrop), Light Rays (footer).

**Text Animations (7)** — Split Text, Blur Text, Shiny Text, Rotating Text, Gradient Text, Circular Text, Count Up.

**Animations (6)** — Animated Content, Magnet, Glare Hover, Star Border, Logo Loop, Noise (global grain).

**Components (6)** — Spotlight Card, Glass Surface, Tilted Card, Chroma Grid, Stepper, Pill Nav.

Each specimen card on the page shows the component running, a note on how Aimirah uses it, and a copyable
`npx shadcn@latest add https://reactbits.dev/r/<Component>-TS-TW` command.

## 4IM/Flux (guest specimen)

A port of [Pavel Dobryakov's WebGL-Fluid-Simulation](https://github.com/PavelDoGreat/WebGL-Fluid-Simulation)
(MIT — upstream header and `LICENSE-fluid-simulation.txt` kept in `src/lib/fluid/`). The solver is
faithful to upstream: advection, vorticity confinement, divergence, Jacobi pressure projection.

**4IM/Flux is the product name.** The engine under `src/lib/fluid/` keeps upstream "fluid"
naming (`createFluidSimulation`, `FluidConfig`) because that is literally the ported solver;
everything user-facing — the route, the panel, the specimen — is branded 4IM/Flux.

- **`/flux`** — the studio: 98 presets (house + classic × four intensities, plus signatures),
  save your own to `localStorage`, every solver parameter, four quality tiers, image as backdrop or
  as a fluid source, pause, PNG stills and webm recording, keyboard shortcuts (space / R / S).
- **Multi-touch** — pointer events with per-pointer tracking; drag with as many fingers as you like.
- **Particles** — new GPGPU layer: up to 65k points whose positions live in a float texture and are
  advected by the velocity field each frame, tinted by the dye they swim through.
- **Palettes** — new `COLOR_HUE_MIN/MAX`, `COLOR_SATURATION`, `COLOR_VALUE` keys narrow
  `generateColor()` to a hue window, which is how the champagne house presets stay gold.
- **Ambient splats** — `AUTO_SPLATS` throws a gentle splat on an interval so an unattended canvas
  keeps moving.

The home page carries it as a full-width band in the Backdrops section. `/fluid` still
resolves — it is a client-side redirect to `/flux`, since a static export cannot send a
server redirect.

```
src/lib/fluid/
  fluid.core.js            factory-wrapped upstream solver + particles, capture, palettes
                           (upstream naming retained: this is the ported engine, not the brand)
  fluid.core.d.ts          types for the above
  build script:            ../fluid-src/build-core.mjs regenerates it from upstream script.js
  presets.ts               98 presets, 4 quality tiers, showcase config
  defaults.ts              every config key with its default, hex converters
src/components/flux/
  FluxCanvas.tsx           React wrapper: pointer input, resize, lifecycle, imperative handle
  FluxStudio.tsx           the control panel
  controls.tsx             house-styled slider / toggle / choice primitives
```

## Performance

The showcase page runs several WebGL and canvas contexts at once, so the budget has to be
policed. Five things keep it responsive:

- **Nothing renders offscreen.** The 4IM/Flux solver parks itself via an `IntersectionObserver`
  (plus `visibilitychange` for background tabs); the hero and backdrop Silk canvases switch
  their R3F `frameloop` to `never` once scrolled past; the React Bits `Noise` specimen mounts
  only while it is on screen. `LightRays` already did this on its own.
- **The grain overlay is free.** `components/site/Grain.tsx` draws one 128² noise tile at
  mount and lets the compositor tile it. The React Bits `Noise` component redraws a 1024²
  canvas — 1M `Math.random()` calls and a 4 MB upload — every few frames; as a *full-page
  overlay* that was the single most expensive thing on the page. It is still shown, animated,
  as specimen 13 in the motion gallery.
- **High-DPI is clamped.** `MAX_PIXEL_RATIO` caps the fluid's drawing buffer (1.5 for the
  showcase band) and Silk renders at `dpr=[1, 1.5]`. On a 2x display that is 1.8x fewer
  pixels for a soft shader backdrop, measured at 5.4fps vs 3.4fps under software rendering.
- **No forced layout per frame.** The core measured `canvas.clientWidth` on every frame; it
  now only re-measures when the `ResizeObserver` says the size changed.
- **Adaptive quality.** `FluxCanvas` with `adaptiveQuality` samples the frame rate and, if
  it holds below 30fps for two consecutive two-second windows, sheds work in two steps
  (dye 512 → 256, sunrays off, then bloom/shading off and fewer particles). It logs each
  step. The studio route leaves it off so quality stays the operator's call.

Measured on the home page under headless software rendering (SwiftShader — slow in absolute
terms, useful in relative ones): 2.7fps at the top of the page and 2.7fps at the 4IM/Flux band
before, ~7fps and ~9fps after, with the band's frame time down from 331ms to ~110ms.

## Layout

```
src/
  app/
    layout.tsx            fonts + metadata
    globals.css           Tailwind v4 theme, keyframes, .eyebrow / .display / .rule / .shell
    page.tsx              section composition
    fluid/page.tsx        fluid studio route
  components/
    reactbits/<Name>/     verbatim React Bits registry sources (TS + Tailwind)
    site/                 hero, nav, marquee, stats, galleries, backdrops, footer, grain
  lib/specimens.ts        specimen copy, install commands, docs links
public/
  aimirah-mark.svg        monogram
  art/art-0{1..5}.jpg     generated artwork used by Chroma Grid / Tilted Card / Glare Hover
```

## Notes for maintainers

- React Bits sources live under `src/components/reactbits/`. Re-fetch any of them with:
  `npx shadcn@latest add https://reactbits.dev/r/<Component>-TS-TW`
- Four upstream sources needed small corrections to run cleanly under Next 16 + strict TS. All are
  upstream bugs in the published registry files, noted here so a re-fetch does not reintroduce them:
  - `LightRays` — three inverted null-guards (the WebGL init effect returned early, so the canvas
    never mounted), and a fragment shader line `if (saturation = 1.0)` that assigns to a uniform and
    fails to compile. The component renders nothing at all until both are corrected.
  - `LogoLoop` — `typeof window` check was inverted, plus `hoverSpeed` and the RAF cleanup guard.
  - `PillNav` — swapped `react-router-dom` for `next/link`.
- `LightRays` unmounts its canvas when scrolled out of view (its own IntersectionObserver). That is
  by design, not a bug — the backdrop re-initialises when it comes back into view.
- `StarBorder` needs the `star-movement-top` / `star-movement-bottom` keyframes; they are defined in
  `globals.css` and exposed to Tailwind through `--animate-*` theme variables.
- Component-owned Tailwind classes are overridden with specificity-raising arbitrary variants
  (`[&>div]:…`) rather than `!important`, so the library sources stay untouched.
