"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Mounts children only while they are near the viewport. Used for the heavier
 * canvas demos so they stop consuming frame time once you scroll past them.
 */
export default function WhenVisible({
  children,
  placeholder,
  rootMargin = "200px",
  className,
}: {
  children: ReactNode;
  placeholder?: ReactNode;
  rootMargin?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (el == null) return;
    const observer = new IntersectionObserver(
      entries => setVisible(entries.some(entry => entry.isIntersecting)),
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} className={className}>
      {visible ? children : placeholder}
    </div>
  );
}
