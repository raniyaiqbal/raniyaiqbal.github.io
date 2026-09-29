"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks";

/**
 * Animated hero background: a field of drifting "sensor nodes" linked into a
 * proximity graph, swept by a rotating LiDAR-style scan beam. Nodes light up
 * as the beam passes and react to the cursor.
 *
 * Performance notes:
 * - Neighbour search uses a uniform spatial hash grid, so linking is ~O(n)
 *   instead of O(n²).
 * - Canvas is scaled for devicePixelRatio and paused when off-screen.
 */

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  glow: number;
}

const LINK_DIST = 120;
const BEAM_SPEED = 0.6; // radians per second
const BEAM_WIDTH = 0.35; // radians

export default function SensorField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let raf = 0;
    let visible = true;
    let last = performance.now();
    let beam = 0;
    const pointer = { x: -9999, y: -9999 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(110, (width * height) / 11000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 18,
        vy: (Math.random() - 0.5) * 18,
        glow: 0,
      }));
    };

    const angleDiff = (a: number, b: number) => {
      const d = Math.atan2(Math.sin(a - b), Math.cos(a - b));
      return Math.abs(d);
    };

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      beam = (beam + BEAM_SPEED * dt) % (Math.PI * 2);

      const cx = width * 0.78;
      const cy = height * 0.5;

      // Integrate motion + beam/pointer excitation.
      for (const n of nodes) {
        n.x += n.vx * dt;
        n.y += n.vy * dt;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        const hit = angleDiff(Math.atan2(n.y - cy, n.x - cx), beam) < BEAM_WIDTH / 2;
        const near = Math.hypot(n.x - pointer.x, n.y - pointer.y) < 140;
        n.glow = hit || near ? 1 : Math.max(0, n.glow - dt * 0.8);
      }

      // Spatial hash grid for neighbour lookup.
      const grid = new Map<string, number[]>();
      const cellOf = (x: number, y: number) => `${Math.floor(x / LINK_DIST)},${Math.floor(y / LINK_DIST)}`;
      nodes.forEach((n, i) => {
        const k = cellOf(n.x, n.y);
        (grid.get(k) ?? grid.set(k, []).get(k)!).push(i);
      });

      ctx.clearRect(0, 0, width, height);

      // Scan beam wedge.
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(width, height));
      grad.addColorStop(0, "rgba(34,211,238,0.10)");
      grad.addColorStop(1, "rgba(34,211,238,0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, Math.max(width, height), beam - BEAM_WIDTH / 2, beam + BEAM_WIDTH / 2);
      ctx.closePath();
      ctx.fill();

      // Range rings.
      ctx.strokeStyle = "rgba(34,211,238,0.06)";
      for (let r = 80; r < Math.max(width, height); r += 110) {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Links between neighbours.
      ctx.lineWidth = 1;
      nodes.forEach((a, i) => {
        const gx = Math.floor(a.x / LINK_DIST);
        const gy = Math.floor(a.y / LINK_DIST);
        for (let dx = -1; dx <= 1; dx++) {
          for (let dy = -1; dy <= 1; dy++) {
            for (const j of grid.get(`${gx + dx},${gy + dy}`) ?? []) {
              if (j <= i) continue;
              const b = nodes[j];
              const d = Math.hypot(a.x - b.x, a.y - b.y);
              if (d > LINK_DIST) continue;
              const alpha = (1 - d / LINK_DIST) * (0.08 + 0.35 * Math.max(a.glow, b.glow));
              ctx.strokeStyle = `rgba(232,121,249,${alpha})`;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
      });

      // Nodes.
      for (const n of nodes) {
        ctx.fillStyle = `rgba(34,211,238,${0.35 + 0.65 * n.glow})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.4 + n.glow * 1.8, 0, Math.PI * 2);
        ctx.fill();
      }

      if (visible && !reducedMotion) raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      pointer.x = pointer.y = -9999;
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !reducedMotion) {
        last = performance.now();
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(frame);
      }
    });

    resize();
    frame(performance.now()); // draw at least one frame (also for reduced motion)
    io.observe(canvas);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [reducedMotion]);

  return <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />;
}
