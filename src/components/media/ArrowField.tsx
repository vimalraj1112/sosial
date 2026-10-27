"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

const VIOLET = "#8221FC";
const MID_VIOLET = "#B58CFD";

/**
 * Cursor-reactive arrow field used as the homepage hero backdrop.
 *
 * The canvas is intentionally decorative: no DOM nodes per arrow, no layout
 * work, and the animation stops as soon as the hero leaves the viewport.
 * Reduced-motion visitors get one static composition instead of a loop.
 */
export function ArrowField({ className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const frameElement = canvas?.parentElement;
    const section = canvas?.closest("section");
    const host = section instanceof HTMLElement ? section : frameElement;
    const context = canvas?.getContext("2d");
    if (!canvas || !frameElement || !host || !context) return;

    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduced = reducedQuery.matches;
    let width = 0;
    let height = 0;
    let frameId = 0;
    let visible = true;
    let pointerActive = false;
    let pointerX = 0;
    let pointerY = 0;

    const drawArrow = (
      x: number,
      y: number,
      angle: number,
      scale: number,
      alpha: number,
      color: string,
    ) => {
      context.save();
      context.translate(x, y);
      context.rotate(angle);
      context.scale(scale, scale);
      context.beginPath();
      context.moveTo(12, 0);
      context.lineTo(-7, -9);
      context.lineTo(-3, 0);
      context.lineTo(-7, 9);
      context.closePath();
      context.fillStyle = color;
      context.globalAlpha = alpha;
      context.fill();
      context.restore();
    };

    const draw = (time: number) => {
      if (!width || !height) return;

      context.clearRect(0, 0, width, height);

      const seconds = time / 1000;
      const viewportHeight = Math.min(height, window.innerHeight || height);
      const targetX = pointerActive
        ? pointerX
        : width * (0.5 + 0.3 * Math.sin(seconds * 0.5));
      const targetY = pointerActive
        ? pointerY
        : viewportHeight * (0.42 + 0.22 * Math.cos(seconds * 0.37));
      const spacing = width < 1024 ? 56 : 58;
      const influenceRadius = Math.max(380, Math.min(width, viewportHeight) * 0.7);

      for (let y = spacing / 2; y < height; y += spacing) {
        for (let x = spacing / 2; x < width; x += spacing) {
          const dx = targetX - x;
          const dy = targetY - y;
          const distance = Math.hypot(dx, dy);
          const influence = Math.max(0, 1 - distance / influenceRadius);
          const angle = reduced ? -Math.PI / 4 : Math.atan2(dy, dx);
          const scale = 0.5 + influence * 1.05;
          const baseAlpha = width < 640 ? 0.18 : 0.12;
          const alpha = reduced ? 0.18 : baseAlpha + influence * 0.7;
          drawArrow(
            x,
            y,
            angle,
            scale,
            alpha,
            influence > 0.45 ? MID_VIOLET : VIOLET,
          );
        }
      }
    };

    const frame = (time: number) => {
      if (!visible) {
        frameId = 0;
        return;
      }
      draw(time);
      frameId = window.requestAnimationFrame(frame);
    };

    const start = () => {
      if (reduced || frameId || !visible) return;
      frameId = window.requestAnimationFrame(frame);
    };

    const stop = () => {
      if (!frameId) return;
      window.cancelAnimationFrame(frameId);
      frameId = 0;
    };

    const resize = () => {
      const rect = frameElement.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduced) draw(performance.now());
    };

    const onPointerMove = (event: PointerEvent) => {
      if (reduced) return;
      const rect = host.getBoundingClientRect();
      pointerX = event.clientX - rect.left;
      pointerY = event.clientY - rect.top;
      pointerActive = true;
    };

    const onPointerLeave = () => {
      pointerActive = false;
    };

    const onReducedChange = (event: MediaQueryListEvent) => {
      reduced = event.matches;
      pointerActive = false;
      if (reduced) {
        stop();
        draw(performance.now());
      } else {
        start();
      }
    };

    const observer = new ResizeObserver(() => {
      resize();
      if (reduced) draw(performance.now());
    });
    observer.observe(host);

    const visibility = new IntersectionObserver(
      (entries) => {
        visible = entries.some((entry) => entry.isIntersecting);
        if (visible) {
          start();
        } else {
          stop();
        }
      },
      { rootMargin: "160px 0px" },
    );
    visibility.observe(host);

    host.addEventListener("pointermove", onPointerMove, { passive: true });
    host.addEventListener("pointerleave", onPointerLeave);
    host.addEventListener("pointercancel", onPointerLeave);
    reducedQuery.addEventListener("change", onReducedChange);

    resize();
    if (reduced) {
      draw(performance.now());
    } else {
      start();
    }

    return () => {
      stop();
      observer.disconnect();
      visibility.disconnect();
      host.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("pointerleave", onPointerLeave);
      host.removeEventListener("pointercancel", onPointerLeave);
      reducedQuery.removeEventListener("change", onReducedChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    />
  );
}
