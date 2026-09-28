export type Spec = {
  name: string;
  blurb: string;
  cli: string;
  docs: string;
  wide?: boolean;
  full?: boolean;
};

const cli = (id: string) =>
  `npx shadcn@latest add https://reactbits.dev/r/${id}-TS-TW`;

export const TEXT_SPECS: Spec[] = [
  {
    name: "Split Text",
    blurb: "Splits a headline into characters and lifts them in on a stagger — the entrance signature of the Aimirah wordmark.",
    cli: cli("SplitText"),
    docs: "https://www.reactbits.dev/text-animations/split-text",
  },
  {
    name: "Blur Text",
    blurb: "Copy resolves word by word out of soft focus. Used across the site for anything the reader should land on gently.",
    cli: cli("BlurText"),
    docs: "https://www.reactbits.dev/text-animations/blur-text",
  },
  {
    name: "Shiny Text",
    blurb: "A metallic sheen sweeps the line. Reserved for section eyebrows and standing labels — never body copy.",
    cli: cli("ShinyText"),
    docs: "https://www.reactbits.dev/text-animations/shiny-text",
  },
  {
    name: "Rotating Text",
    blurb: "Phrases flip through a fixed slot with spring physics, so a sentence can hold more than one claim.",
    cli: cli("RotatingText"),
    docs: "https://www.reactbits.dev/text-animations/rotating-text",
  },
  {
    name: "Gradient Text",
    blurb: "A slow gradient sweep across live glyphs in the house palette: ink, champagne, bone.",
    cli: cli("GradientText"),
    docs: "https://www.reactbits.dev/text-animations/gradient-text",
  },
  {
    name: "Circular Text",
    blurb: "Letters set around a circle and turned slowly, after the manner of a struck seal. Our mark's companion piece.",
    cli: cli("CircularText"),
    docs: "https://www.reactbits.dev/text-animations/circular-text",
  },
  {
    name: "Count Up",
    blurb: "Figures settle on their true value when scrolled into view. Every number on this page is counted, never typed.",
    cli: cli("CountUp"),
    docs: "https://www.reactbits.dev/text-animations/count-up",
  },
];

export const MOTION_SPECS: Spec[] = [
  {
    name: "Animated Content",
    blurb: "A wrapper that carries any child in on scroll — direction, distance and easing tuned slow for this house style.",
    cli: cli("AnimatedContent"),
    docs: "https://www.reactbits.dev/animations/animated-content",
  },
  {
    name: "Magnet",
    blurb: "Elements lean toward the cursor, then settle back on springs. Applied to the single most important action on a screen.",
    cli: cli("Magnet"),
    docs: "https://www.reactbits.dev/animations/magnet",
  },
  {
    name: "Glare Hover",
    blurb: "A raking highlight crosses a surface on hover — the closest thing to a gallery light on a flat panel.",
    cli: cli("GlareHover"),
    docs: "https://www.reactbits.dev/animations/glare-hover",
  },
  {
    name: "Star Border",
    blurb: "A point of light orbits the frame. Used once per page, on the action that must be found.",
    cli: cli("StarBorder"),
    docs: "https://www.reactbits.dev/animations/star-border",
  },
  {
    name: "Logo Loop",
    blurb: "A seamless marquee with hover-pause; here it carries the venture index beneath the hero.",
    cli: cli("LogoLoop"),
    docs: "https://www.reactbits.dev/animations/logo-loop",
  },
  {
    name: "Noise",
    blurb: "A live film grain over the whole document. Set low — present on close inspection, invisible from a distance.",
    cli: cli("Noise"),
    docs: "https://www.reactbits.dev/animations/noise",
  },
];

export const SURFACE_SPECS: Spec[] = [
  {
    name: "Spotlight Card",
    blurb: "A pool of light follows the cursor across the panel. The default container for anything worth reading.",
    cli: cli("SpotlightCard"),
    docs: "https://www.reactbits.dev/components/spotlight-card",
  },
  {
    name: "Glass Surface",
    blurb: "Real-time refraction and edge lighting on a pane of glass. Holds the briefing card without ornament.",
    cli: cli("GlassSurface"),
    docs: "https://www.reactbits.dev/components/glass-surface",
  },
  {
    name: "Tilted Card",
    blurb: "Three-dimensional tilt with a caption that swings on the same springs. Our artwork carrier.",
    cli: cli("TiltedCard"),
    docs: "https://www.reactbits.dev/components/tilted-card",
  },
  {
    name: "Chroma Grid",
    blurb: "A grid held in grayscale until the cursor warms it. Reserved for the four ventures of MI4 Inc.",
    cli: cli("ChromaGrid"),
    docs: "https://www.reactbits.dev/components/chroma-grid",
    full: true,
  },
  {
    name: "Stepper",
    blurb: "Multi-step flows with a drawn connector and sliding content — the shape of our engagement process.",
    cli: cli("Stepper"),
    docs: "https://www.reactbits.dev/components/stepper",
    wide: true,
  },
  {
    name: "Pill Nav",
    blurb: "A floating pill navigation with a sliding active lozenge. It is the bar you arrived at the top of this page in.",
    cli: cli("PillNav"),
    docs: "https://www.reactbits.dev/components/pill-nav",
  },
];

export const BACKDROP_SPECS: Spec[] = [
  {
    name: "Silk",
    blurb: "Woven light on a shader plane — the backdrop behind the hero, moving too slowly to notice at first.",
    cli: cli("Silk"),
    docs: "https://www.reactbits.dev/backgrounds/silk",
  },
  {
    name: "Light Rays",
    blurb: "Volumetric rays from a single origin, tracking the pointer. It closes the page below.",
    cli: cli("LightRays"),
    docs: "https://www.reactbits.dev/backgrounds/light-rays",
  },
];
