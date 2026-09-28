"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * Renders children only after mount. Some React Bits components (Glass Surface) read
 * `window`/`navigator` during render to pick a style variant, which cannot be matched
 * during server rendering — this keeps the first client paint identical to the server HTML.
 */
export default function ClientOnly({
  children,
  fallback = null,
}: {
  children: ReactNode;
  fallback?: ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return <>{mounted ? children : fallback}</>;
}
