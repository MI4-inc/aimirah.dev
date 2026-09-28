# Architecture

A component showcase for **Aimirah | MI4 Inc**: 21 React Bits specimens under house chrome, plus
a guest — **4IM/Flux**, a WebGL fluid solver. No backend, no database, no API routes. Every page
prerenders to static HTML and hydrates.

## Stack at a glance

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 16.3.5, App Router, Turbopack | File routing, static prerender, `next/font` self-hosting |
| UI | React 19.2.8, TypeScript (strict) | — |
| Styling | Tailwind v4, CSS-first (`@theme inline`) | Design tokens live in `globals.css`, not a JS config |
| Type | Cormorant Garamond (display), Inter (sans) | Loaded via `next/font/google`, exposed as CSS variables |
| Scroll / timeline | `gsap` 3.15 + `@gsap/react`, ScrollTrigger, SplitText | Entrance reveals, pinned sequences |
| Micro-interaction | `motion` 12 (`useMotionValue`, `useAnimationFrame`, `useSpring`) | Per-frame values without React re-renders |
| Shader backdrop A | `three` 0.180 + `@react-three/fiber` 9.7 | Silk — full-screen fragment shader |
| Shader backdrop B | `ogl` 1.0.11 | LightRays — one triangle, one program, no three.js |
| Fluid solver | raw WebGL 2 | 4IM/Flux — float render targets, ping-pong FBOs |
| Grain | 2D canvas, drawn once | Tiled by the compositor, zero per-frame cost |
| Hosting | Static export → Netlify | `STATIC_EXPORT=1 npm run build` → `out/` |

## Page composition

```
app/page.tsx
├── Grain              fixed overlay, single generated 128² tile
├── Nav                signature mark only (no section links)
├── Hero        #top   Silk (R3F) + SplitText / RotatingText / BlurText / ShinyText
│                      CircularText / Magnet / StarBorder
├── Marquee            LogoLoop
├── Stats              CountUp + AnimatedContent
├── TextGallery #text  SplitText, BlurText, ShinyText, RotatingText
│                      GradientText, CircularText, CountUp
├── MotionGallery #motion  AnimatedContent, Magnet, GlareHover, StarBorder, LogoLoop, Noise
├── SurfaceGallery #surfaces  SpotlightCard, GlassSurface, TiltedCard, ChromaGrid, PillNav
├── Backdrops   #backdrops   Silk, LightRays, and the 4IM/Flux band  ──→ /flux
└── Footer             LightRays + GradientText + ShinyText
```

`/flux` is the standalone studio. `/fluid` is a client-side redirect to it — a static export
cannot issue a server redirect.

## Component layers

**1. `components/reactbits/<Name>/` — 21 specimens, verbatim.** Registry sources kept as
published (TypeScript + Tailwind), so an update is a copy, not a port. Two local, backwards
compatible additions: `Silk` accepts `frameloop` (to park the loop offscreen) and `dpr`.

Which library each one needs:

| Library | Specimens |
|---|---|
| `gsap` + ScrollTrigger | AnimatedContent, ChromaGrid, PillNav, SplitText (+ `@gsap/react`, `gsap/SplitText`) |
| `motion/react` | BlurText, CircularText, CountUp, GradientText, RotatingText, ShinyText, Stepper, TiltedCard |
| `three` + `@react-three/fiber` | Silk |
| `ogl` | LightRays |
| React only | GlareHover, GlassSurface, LogoLoop, Magnet, Noise, SpotlightCard, StarBorder |

**2. `components/site/` — the chrome.** `Section` and `Specimen` are the two workhorses: `Section`
owns the eyebrow, heading and lede; `Specimen` frames each demo with its name, blurb, install
command and docs link, pulling copy from `lib/specimens.ts`. `WhenVisible` mounts heavy canvases
only near the viewport. `Grain`, `Nav`, `Hero`, `Marquee`, `Stats`, three galleries, `Backdrops`,
`Footer`, `FluxSpecimen`.

**3. `lib/` — static data.** `specimens.ts` (copy, `npx shadcn` commands, docs URLs) and
`lib/fluid/` (solver, presets, defaults). No fetching anywhere.

## GPU concurrency and how it is policed

Up to six live canvas surfaces can coexist, so the frame budget is managed explicitly:

- **Offscreen parking** — the fluid solver stops on `IntersectionObserver` + `visibilitychange`;
  `Silk` switches its R3F `frameloop` to `never` when scrolled past; the `Noise` specimen mounts
  only while visible (`WhenVisible`); `LightRays` already unmounts its canvas itself.
- **The grain overlay is free** — one 128² tile generated at mount and tiled by CSS. The React
  Bits `Noise` component redraws a 1024² canvas (1M `Math.random()` calls plus a 4 MB upload)
  every few frames; as a *full-page overlay* that was the single most expensive thing on the
  page. It still appears, animated, as a specimen.
- **DPR clamps** — `MAX_PIXEL_RATIO` on the fluid buffer (1.5 for the band), `dpr=[1, 1.5]` on
  Silk. Measured on a 2× display: median 5.4fps at 1.5× versus 3.4fps at 2×.
- **No forced layout per frame** — the solver re-measures its canvas only when the
  `ResizeObserver` fires, not on every frame.
- **Adaptive quality** — `FluxCanvas` with `adaptiveQuality` samples fps and, after two
  consecutive slow two-second windows below 30fps, sheds work in two steps (dye 512→256, sunrays
  off, then bloom/shading off, fewer particles). It logs each step. Off in the studio, where
  quality is the operator's call.

Measured on the home page under headless software rendering — slow in absolute terms, useful in
relative ones: 2.7fps at the top and 2.7fps at the band before these changes, roughly 7fps and
9fps after, with the band's frame time down from 331ms to about 110ms.

## The 4IM/Flux subsystem

```
lib/fluid/
  fluid.core.js   GENERATED — do not hand-edit. Upstream solver, factory-wrapped,
                  plus the extensions below. Upstream header preserved.
  fluid.core.d.ts types for the generated module
  presets.ts      98 presets = 24 families × 4 intensities + 2 signatures; 4 quality tiers
  defaults.ts     every config key, with converters
components/flux/
  FluxCanvas.tsx  pointer input, resize, lifecycle, imperative handle
  FluxStudio.tsx  the control panel (collapsed by default)
  controls.tsx    house-styled slider / toggle / choice primitives
```

The solver is **Pavel Dobryakov's WebGL-Fluid-Simulation (MIT, © 2017)** — advection, vorticity
confinement, divergence, Jacobi pressure projection, dye and velocity on float render targets.
Upstream licence files sit at `lib/fluid/LICENSE-fluid-simulation.txt` and the header is kept at
the top of `fluid.core.js`. Upstream has no particle system, no preset system and no image UI;
those were written here.

Added on top: a GPGPU particle layer (4k–65k points advected by the velocity field, tinted by the
dye they pass through), palette hue windows (`COLOR_HUE_MIN/MAX`, `COLOR_SATURATION`,
`COLOR_VALUE`) that keep the house presets gold, `AUTO_SPLATS` ambient motion, image sources,
PNG/webm capture, and `MAX_PIXEL_RATIO`.

Regenerating the core: replace `fluid-src/script.js` with a new upstream copy and run
`node fluid-src/build-core.mjs`. The transform re-applies every extension and **fails loudly** if
an anchor it depends on has moved — treat that as the signal to re-read the diff.

4IM/Flux also ships as its own repo, **MI4-inc/4im-flux**, with a trimmed dependency list
(Next, React, Tailwind — no three, gsap, ogl or motion).

## Data, state, persistence

No backend. All content is compiled in from `lib/specimens.ts` and `lib/fluid/presets.ts`. The
only writable state is the studio's saved presets, in `localStorage` under
`aimirah.fluid.presets.v1` — that key is deliberately stable so saved presets survive a rename.

## Build and deploy

```bash
npm run build                 # prerenders /, /_not-found, /fluid, /flux
STATIC_EXPORT=1 npm run build # emits out/, a plain static site
./deploy.sh                   # export → zip → upload to Netlify via API
node push-github.mjs <name>   # create a GitHub repo and push
```

`STATIC_EXPORT=1` is what flips `output: 'export'` in `next.config.ts`; without it, dev and
build behave normally. Deploys use a token from the environment only — nothing is written to
`.git/config`, and the static zip is regenerated each run.

## Repository layout

```
src/
  app/
    layout.tsx          fonts + root metadata
    globals.css         Tailwind v4 theme, keyframes, .eyebrow / .display / .rule / .shell
    page.tsx            section composition
    flux/               the studio route (+ its own metadata)
    fluid/              redirect to /flux
  components/
    reactbits/<Name>/   verbatim registry sources
    site/               chrome, galleries, grain, nav, footer
    flux/               4IM/Flux wrapper and studio panel
  lib/
    specimens.ts        specimen copy, install commands, docs links
    fluid/              solver, presets, defaults, upstream licence
public/
  aimirah-mark.svg      monogram (favicon)
  art/art-0{1..5}.jpg   generated artwork for ChromaGrid / TiltedCard / GlareHover
```

## Maintainer notes

- `lib/fluid/fluid.core.js` is generated — edit `fluid-src/build-core.mjs`, never the output.
- `dispose()` must **not** call `WEBGL_lose_context.loseContext()`. React StrictMode mounts,
  unmounts and remounts on the same canvas; a lost context comes back on the second
  `getContext('webgl2')`, every render-target format check fails, and the solver dies with
  `Cannot read properties of null (reading 'internalFormat')`.
- Reading the fluid canvas through `drawImage` returns all zeros — its context has no
  `preserveDrawingBuffer`. Measure with a real screenshot instead.
- Under headless software rendering the page runs around 7–11fps. Judge dye dissipation over
  wall-clock seconds, not frame counts, or you will think it is broken.
- The dev sandbox does not persist `node_modules` between sessions; `npm install` before
  `npm run dev`.
