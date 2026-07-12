'use client';

import { useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

interface ShowcaseCardProps {
  index: number;
  image: string;
  alt: string;
  children: ReactNode;
  beige?: boolean;
}

// Full-width horizontal showcase card. Odd cards image-left, even image-right.
// The image is shown uncropped (object-contain) and is clickable to enlarge.
export default function ShowcaseCard({ index, image, alt, children, beige = false }: ShowcaseCardProps) {
  const imageLeft = index % 2 === 0;
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close();
    }
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#232B45] shadow-[0_8px_24px_rgba(0,0,0,0.35)] lg:flex">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Enlarge image: ${alt}`}
        className={`relative block aspect-video w-full cursor-zoom-in bg-[#0F1729] lg:aspect-auto lg:w-2/5 ${
          imageLeft ? 'lg:order-first' : 'lg:order-last'
        }`}
      >
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-contain"
        />
      </button>
      <div className={`p-8 lg:w-3/5 ${beige ? 'bg-[#D4C4A8]' : ''}`}>{children}</div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          onClick={close}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
            aria-label="Close"
            className="fixed right-4 top-4 z-[60] flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-fast ease-out hover:bg-white/20"
          >
            <X size={24} aria-hidden="true" />
          </button>
          <div
            className="relative h-[85vh] w-[90vw] max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image src={image} alt={alt} fill sizes="90vw" className="object-contain" priority />
          </div>
        </div>
      )}
    </div>
  );
}
