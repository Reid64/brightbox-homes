'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  baseX: number;
  y: number;
  baseRadius: number;
  radius: number;
  vy: number;
  wobbleAmp: number;
  wobbleFreq: number;
  wobblePhase: number;
  maxOpacity: number;
  age: number; // seconds
  lifespan: number; // seconds
}

// Smoke origin as a fraction of the hero canvas - over the grill on the right.
const ORIGIN_X = 0.72;
const ORIGIN_Y = 0.57;
const MAX_PARTICLES = 18;
const SPAWN_INTERVAL = 0.7; // seconds between spawns (~1.4/sec)

function rand(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

// A barely-visible rising-smoke particle overlay for the hero grill.
// Lightweight canvas particle system; only animates while in view and the tab
// is visible. Disabled for users who prefer reduced motion.
export default function SmokeEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;
    const context = canvasEl.getContext('2d');
    if (!context) return;
    // Explicitly non-null typed aliases so TS keeps the narrowing inside the
    // nested animation closures below.
    const canvas: HTMLCanvasElement = canvasEl;
    const ctx: CanvasRenderingContext2D = context;

    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    const particles: Particle[] = [];
    let raf = 0;
    let last = 0;
    let spawnAcc = 0;
    let inView = false;
    let visible = !document.hidden;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      if (width === 0 || height === 0) return;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function spawn() {
      if (particles.length >= MAX_PARTICLES) return;
      const r = rand(15, 40);
      particles.push({
        baseX: width * ORIGIN_X + rand(-6, 6),
        y: height * ORIGIN_Y + rand(-4, 4),
        baseRadius: r,
        radius: r,
        vy: rand(0.3, 0.6),
        wobbleAmp: rand(10, 20),
        wobbleFreq: rand(0.3, 0.7),
        wobblePhase: rand(0, Math.PI * 2),
        maxOpacity: rand(0.06, 0.1),
        age: 0,
        lifespan: rand(3, 5),
      });
    }

    function frame(ts: number) {
      raf = requestAnimationFrame(frame);
      if (!inView || !visible || width === 0) {
        last = ts;
        return;
      }
      const dt = last ? Math.min((ts - last) / 1000, 0.05) : 0.016;
      last = ts;
      const perFrame = dt * 60; // convert "px per frame" units to this delta

      spawnAcc += dt;
      while (spawnAcc >= SPAWN_INTERVAL) {
        spawnAcc -= SPAWN_INTERVAL;
        spawn();
      }

      ctx.clearRect(0, 0, width, height);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.age += dt;
        const t = p.age / p.lifespan;
        if (t >= 1) {
          particles.splice(i, 1);
          continue;
        }

        p.y -= p.vy * perFrame; // rise upward
        p.radius = p.baseRadius * (1 + t * 1.2); // disperse/expand as it rises
        const x = p.baseX + Math.sin(p.age * p.wobbleFreq * Math.PI * 2 + p.wobblePhase) * p.wobbleAmp * t;

        // Fade in then out (peaks mid-life), kept extremely faint.
        const alpha = p.maxOpacity * Math.sin(t * Math.PI);
        if (alpha <= 0.002) continue;

        const grad = ctx.createRadialGradient(x, p.y, 0, x, p.y, p.radius);
        grad.addColorStop(0, `rgba(255,255,255,${alpha})`);
        grad.addColorStop(0.5, `rgba(228,228,228,${alpha * 0.5})`);
        grad.addColorStop(1, 'rgba(200,200,200,0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const io = new IntersectionObserver(
      (entries) => {
        inView = entries[0]?.isIntersecting ?? false;
        last = 0;
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    function onVisibility() {
      visible = !document.hidden;
      last = 0;
    }
    document.addEventListener('visibilitychange', onVisibility);

    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[1] hidden lg:block"
      style={{ willChange: 'transform' }}
    />
  );
}
