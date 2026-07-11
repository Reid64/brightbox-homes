'use client';

import { Fragment } from 'react';

// Seamless horizontal ticker. Content is duplicated and translated 0 -> -50%
// for a continuous loop. Pauses on hover. Reduced motion shows static text.

interface MarqueeProps {
  items: string[];
  speed?: number; // seconds for a full cycle
}

export default function Marquee({ items, speed = 30 }: MarqueeProps) {
  const renderRun = (keyPrefix: string) =>
    items.map((item, i) => (
      <Fragment key={`${keyPrefix}-${i}`}>
        <span className="px-6 text-xs uppercase tracking-widest text-gray-300">
          {item}
        </span>
        <span aria-hidden="true" className="text-[#6B9BF7]/60">
          &middot;
        </span>
      </Fragment>
    ));

  return (
    <div className="group overflow-hidden border-y border-white/10 bg-white/5 py-4">
      {/* Animated track (duplicated for seamless loop). The global reduced-motion
          rule freezes the animation (no scroll) for users who request it. */}
      <div
        className="flex w-max animate-marquee items-center whitespace-nowrap motion-reduce:animate-none group-hover:[animation-play-state:paused]"
        style={{ '--marquee-duration': `${speed}s` } as React.CSSProperties}
      >
        <div className="flex items-center" aria-hidden="false">
          {renderRun('a')}
        </div>
        <div className="flex items-center" aria-hidden="true">
          {renderRun('b')}
        </div>
      </div>
    </div>
  );
}
