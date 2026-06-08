'use client';

import { useEffect, useRef } from 'react';

// Ambient floating hero video. Plays slightly slowed (0.75x) for a calmer feel.
export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.playbackRate = 0.75;
  }, []);

  return (
    <div className="mx-auto max-w-[400px] animate-float overflow-hidden rounded-2xl border border-white/10 shadow-[0_8px_32px_rgba(74,155,217,0.15)]">
      <video
        ref={ref}
        autoPlay
        muted
        loop
        playsInline
        aria-label="Ambient footage of a Bright Box home"
        className="aspect-video w-full object-cover"
      >
        <source src="/videos/hero-video.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
