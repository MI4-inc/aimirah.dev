import type { NextConfig } from "next";

/**
 * `STATIC_EXPORT=1 npm run build` emits a fully static site into `out/`
 * (which then gets copied to `site-static/`, since `out/` is not persisted).
 * Normal `npm run dev` / `npm run build` behaviour is unchanged.
 */
const nextConfig: NextConfig = {
  ...(process.env.STATIC_EXPORT
    ? { output: "export" as const, trailingSlash: true, images: { unoptimized: true } }
    : {}),
  allowedDevOrigins: ["*.e2b.app", "*.e2b.dev", "*.arena.ai"],
};

export default nextConfig;
