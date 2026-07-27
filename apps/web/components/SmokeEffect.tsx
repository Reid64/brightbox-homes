'use client';

import { useEffect, useRef } from 'react';

// SMALL, CONSTRAINED canvas (~250x400) positioned ONLY over the grill area -
// NOT a full-hero inset-0 overlay. The v1 full-hero canvas forced Chrome to
// promote a huge GPU layer that evicted the hero image's layer (white/pink
// background bug). This version keeps the painted area tiny and never uses
// will-change.
const CANVAS_W = 250;
const CANVAS_H = 400;

// Origin over the grate: bottom-center, nudged up 64px and right 25px.
const ORIGIN_X = CANVAS_W / 2 + 25;
const ORIGIN_Y = CANVAS_H - 20;

// Smoke
const SMOKE_MAX = 18;
const SMOKE_SPAWN_INTERVAL = 0.7; // ~1.4/sec
// Fire
const FIRE_MAX = 18;
const FIRE_SPAWN_INTERVAL = 0.4; // ~2.5/sec

interface SmokeParticle {
  baseX: number;
  y: number;
  baseRadius: number;
  radius: number;
  vy: number;
  wobbleAmp: number;
  wobbleFreq: number;
  wobblePhase: number;
  maxOpacity: number;
  age: number;
  lifespan: number;
}

interface FireParticle {
  x: number;
  startY: number;
  y: number;
  radius: number;
  travel: number; // total upward travel before fully fading
  jitter: number;
  maxOpacity: number;
  color: [number, number, number];
  age: number;
  lifespan: number;
}

const FIRE_COLORS: Array<[number, number, number]> = [
  [255, 140, 0],
  [255, 80, 0],
  [255, 200, 50],
];

function rand(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

export default function SmokeEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;
    const context = canvasEl.getContext('2d', { alpha: true });
    if (!context) return;
    const canvas: HTMLCanvasElement = canvasEl;
    const ctx: CanvasRenderingContext2D = context;

    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    // Fixed small backing store at 1x DPR (no window.devicePixelRatio multiply).
    canvas.width = CANVAS_W;
    canvas.height = CANVAS_H;

    const smoke: SmokeParticle[] = [];
    const fire: FireParticle[] = [];
    let raf = 0;
    let last = 0;
    let smokeAcc = 0;
    let fireAcc = 0;
    let inView = false;
    let visible = !document.hidden;

    function spawnSmoke() {
      if (smoke.length >= SMOKE_MAX) return;
      const r = rand(15, 40);
      smoke.push({
        baseX: ORIGIN_X + rand(-8, 8),
        y: ORIGIN_Y + rand(-4, 4),
        baseRadius: r,
        radius: r,
        vy: rand(0.3, 0.6),
        wobbleAmp: rand(10, 20),
        wobbleFreq: rand(0.3, 0.7),
        wobblePhase: rand(0, Math.PI * 2),
        maxOpacity: rand(0.08, 0.14),
        age: 0,
        lifespan: rand(3, 5),
      });
    }

    function spawnFire() {
      if (fire.length >= FIRE_MAX) return;
      const sy = ORIGIN_Y + rand(-3, 3);
      fire.push({
        x: ORIGIN_X + rand(-10, 10),
        startY: sy,
        y: sy,
        radius: rand(4, 10),
        travel: rand(25, 50),
        jitter: rand(2, 5),
        maxOpacity: rand(0.35, 0.55),
        color: FIRE_COLORS[Math.floor(Math.random() * FIRE_COLORS.length)],
        age: 0,
        lifespan: rand(0.5, 1.5),
      });
    }

    function frame(ts: number) {
      raf = requestAnimationFrame(frame);
      if (!inView || !visible) {
        last = ts;
        return;
      }
      const dt = last ? Math.min((ts - last) / 1000, 0.05) : 0.016;
      last = ts;
      const perFrame = dt * 60;

      smokeAcc += dt;
      while (smokeAcc >= SMOKE_SPAWN_INTERVAL) {
        smokeAcc -= SMOKE_SPAWN_INTERVAL;
        spawnSmoke();
      }
      fireAcc += dt;
      while (fireAcc >= FIRE_SPAWN_INTERVAL) {
        fireAcc -= FIRE_SPAWN_INTERVAL;
        spawnFire();
      }

      ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

      // Fire (drawn first, low at the grate)
      for (let i = fire.length - 1; i >= 0; i--) {
        const p = fire[i];
        p.age += dt;
        const t = p.age / p.lifespan;
        if (t >= 1) {
          fire.splice(i, 1);
          continue;
        }
        p.y = p.startY - p.travel * t;
        const x = p.x + Math.sin(p.age * 18 + p.startY) * p.jitter * (1 - t);
        const alpha = p.maxOpacity * Math.sin(t * Math.PI);
        if (alpha <= 0.002) continue;
        const [r, g, b] = p.color;
        const grad = ctx.createRadialGradient(x, p.y, 0, x, p.y, p.radius);
        grad.addColorStop(0, `rgba(${r},${g},${b},${alpha})`);
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Smoke (rises and disperses)
      for (let i = smoke.length - 1; i >= 0; i--) {
        const p = smoke[i];
        p.age += dt;
        const t = p.age / p.lifespan;
        if (t >= 1) {
          smoke.splice(i, 1);
          continue;
        }
        p.y -= p.vy * perFrame;
        p.radius = p.baseRadius * (1 + t * 1.2);
        const x = p.baseX + Math.sin(p.age * p.wobbleFreq * Math.PI * 2 + p.wobblePhase) * p.wobbleAmp * t;
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
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      width={CANVAS_W}
      height={CANVAS_H}
      className="pointer-events-none absolute z-[1] hidden lg:block"
      style={{ width: CANVAS_W, height: CANVAS_H, left: '72%', top: '38%' }}
    />
  );
}
