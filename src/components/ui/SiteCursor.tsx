"use client";

import { motion, useMotionValue } from "motion/react";
import { useEffect, useState } from "react";

/**
 * One cursor treatment for the whole site.
 *
 * The mark follows the pointer directly rather than trailing behind it, and it
 * never changes shape over links or controls. Native cursors are hidden only
 * when the browser reports a fine pointer, so touch devices keep their normal
 * behaviour.
 */
export function SiteCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(any-pointer: fine)").matches) return;

    const root = document.documentElement;
    root.classList.add("has-site-cursor");

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;

      x.set(event.clientX - 2);
      y.set(event.clientY - 1);
      setVisible(true);
    };

    const hide = () => setVisible(false);

    const onPointerOut = (event: PointerEvent) => {
      if (!event.relatedTarget) hide();
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === "touch") hide();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    document.addEventListener("pointerout", onPointerOut);
    document.documentElement.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);

    return () => {
      root.classList.remove("has-site-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("pointerout", onPointerOut);
      document.documentElement.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
    };
  }, [x, y]);

  return (
    <motion.div
      aria-hidden="true"
      data-site-cursor
      className="pointer-events-none fixed left-0 top-0 z-[120] mix-blend-difference"
      style={{ x, y }}
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.08, ease: "linear" }}
    >
      <svg
        width="20"
        height="26"
        viewBox="0 0 18 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="block"
      >
        <path
          d="M1.5 1.5V21.5L6.6 16.4L10.9 25.1L14.4 23.5L10.2 14.9L17 14.9L1.5 1.5Z"
          fill="white"
          stroke="white"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
}
