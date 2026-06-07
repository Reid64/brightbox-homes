'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';

// Word-by-word clip-and-slide-up reveal. Each word sits in an overflow-hidden
// span; the inner span translates from y-110% to y-0 with a per-word stagger.
// Triggers once via IntersectionObserver. Reduced motion renders instantly.

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  as?: keyof React.JSX.IntrinsicElements;
}

export default function AnimatedText({
  text,
  className = '',
  delay = 0,
  as = 'h1',
}: AnimatedTextProps) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReduced(true);
      setShown(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const words = text.split(' ');
  // Runtime tag is dynamic; type it as a concrete intrinsic for clean ref typing.
  const Tag = as as 'h1';

  return (
    <Tag ref={ref as RefObject<HTMLHeadingElement>} className={className}>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          {i > 0 ? ' ' : ''}
          <span className="inline-block overflow-hidden align-bottom">
            <span
              className="inline-block transition-transform duration-700 ease-out"
              style={{
                transform: shown ? 'translateY(0)' : 'translateY(110%)',
                transitionDelay: reduced ? '0ms' : `${delay + i * 60}ms`,
              }}
            >
              {word}
            </span>
          </span>
        </Fragment>
      ))}
    </Tag>
  );
}
