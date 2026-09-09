'use client';

import { useRef, useState } from 'react';
import type { ReactNode, PointerEvent } from 'react';

// Subtle 3D tilt following the cursor (max 6deg), with a cursor-tracking
// radial highlight. Resets smoothly on leave. Disabled under reduced motion.

interface TiltCardProps {
  children: ReactNode;
  className?: string;
}

const MAX_TILT = 6;

export default function TiltCard({ children, className = '' }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50, on: false });

  const reduced = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function handleMove(e: PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || reduced()) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({
      rx: (0.5 - py) * 2 * MAX_TILT,
      ry: (px - 0.5) * 2 * MAX_TILT,
    });
    setGlow({ x: px * 100, y: py * 100, on: true });
  }

  function handleLeave() {
    setTilt({ rx: 0, ry: 0 });
    setGlow((g) => ({ ...g, on: false }));
  }

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={`relative transition-transform duration-normal ease-out [transform-style:preserve-3d] ${className}`}
      style={{
        perspective: '1000px',
        transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
      }}
    >
      {/* Cursor-tracking highlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 rounded-lg transition-opacity duration-normal ease-out"
        style={{
          opacity: glow.on ? 1 : 0,
          background: `radial-gradient(220px circle at ${glow.x}% ${glow.y}%, rgba(74,155,217,0.15), transparent 70%)`,
        }}
      />
      {children}
    </div>
  );
}
