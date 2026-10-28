"use client";

import { motion, type MotionValue } from "motion/react";

type WorkCursorProps = {
  x: MotionValue<number>;
  y: MotionValue<number>;
  visible: boolean;
};

/**
 * A small, difference-blended pointer for the pinned work gallery. The
 * reference uses a custom arrow throughout its case-study viewer; this keeps
 * that idea but keeps the mark deliberately quiet and subordinate to the work.
 */
export function WorkCursor({ x, y, visible }: WorkCursorProps) {
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[80] mix-blend-difference"
      style={{ x, y }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.82 }}
      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
    >
      <svg
        width="20"
        height="26"
        viewBox="0 0 18 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.5 1.5V21.5L6.6 16.4L10.9 25.1L14.4 23.5L10.2 14.9L17 14.9L1.5 1.5Z"
          fill="white"
          stroke="white"
          strokeWidth="0.6"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
}
