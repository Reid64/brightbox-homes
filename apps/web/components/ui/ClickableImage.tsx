'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X, ZoomIn } from 'lucide-react';

interface ClickableImageProps {
  src: string;
  alt: string;
  /** Required for natural (non-fill) rendering. */
  width?: number;
  height?: number;
  caption?: string;
  /** Classes for the trigger button/wrapper (sizing, aspect, borders). */
  className?: string;
  /** Classes for the <Image> itself (object-fit, padding). */
  imgClassName?: string;
  /** Use next/image fill mode (the wrapper must be sized via className). */
  fill?: boolean;
  sizes?: string;
}

// A single image that displays inline and opens in a full-screen lightbox on
// click. Modal styling matches ImageGallery for site-wide consistency.
export default function ClickableImage({
  src,
  alt,
  width,
  height,
  caption,
  className = '',
  imgClassName = '',
  fill = false,
  sizes,
}: ClickableImageProps) {
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) {
      setShown(false);
      return;
    }
    const raf = requestAnimationFrame(() => setShown(true)); // fade + scale in
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close();
    }
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close]);

  const hover = 'transition-transform duration-normal ease-out group-hover:scale-[1.02]';

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Enlarge image: ${alt}`}
        className={`group relative block w-full cursor-zoom-in ${className}`}
      >
        {fill ? (
          <Image src={src} alt={alt} fill sizes={sizes} className={`${hover} ${imgClassName}`} />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width ?? 1200}
            height={height ?? 800}
            sizes={sizes}
            className={`${hover} ${imgClassName}`}
          />
        )}
        {/* Zoom affordance */}
        <span className="pointer-events-none absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity duration-fast ease-out group-hover:opacity-100">
          <ZoomIn size={16} aria-hidden="true" />
        </span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          onClick={close}
          style={{ animation: 'fadeIn 150ms ease-out' }}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
            aria-label="Close"
            className="fixed right-4 top-4 z-[60] flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-fast ease-out hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bb-blue"
          >
            <X size={24} aria-hidden="true" />
          </button>

          <div
            className={`flex flex-col items-center transition-all duration-150 ease-out ${
              shown ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[85vh] max-h-[85vh] w-[90vw] max-w-5xl">
              <Image src={src} alt={alt} fill sizes="90vw" className="object-contain" priority />
            </div>
            {caption && (
              <p className="mt-3 max-w-2xl text-center text-sm text-gray-300">{caption}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
