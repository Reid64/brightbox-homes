'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  className?: string;
}

export default function ImageGallery({ images, className = '' }: ImageGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const isOpen = openIndex !== null;

  const close = useCallback(() => setOpenIndex(null), []);
  const prev = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length)),
    [images.length],
  );
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i + 1) % images.length)),
    [images.length],
  );

  // Keyboard navigation + body scroll lock while the lightbox is open.
  useEffect(() => {
    if (!isOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    }
    document.addEventListener('keydown', onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, close, prev, next]);

  if (images.length === 0) return null;

  return (
    <div className={className}>
      {/* Grid - each image sits in a lighter card frame for separation */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {images.map((image, i) => (
          <figure key={image.src}>
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              aria-label={`View image ${i + 1}: ${image.alt}`}
              className="group block w-full overflow-hidden rounded-xl border border-white/10 bg-white/5 p-1 transition-all duration-normal ease-out hover:border-white/20"
            >
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                  className="object-cover transition-transform duration-normal ease-out group-hover:scale-[1.02]"
                />
              </div>
            </button>
            {image.caption &&
              (() => {
                const idx = image.caption.indexOf(' - ');
                return (
                  <figcaption className="mt-2 text-sm italic text-gray-400">
                    {idx === -1 ? (
                      image.caption
                    ) : (
                      <>
                        <span className="font-bold not-italic text-white">
                          {image.caption.slice(0, idx)}
                        </span>
                        {image.caption.slice(idx)}
                      </>
                    )}
                  </figcaption>
                );
              })()}
          </figure>
        ))}
      </div>

      {/* Lightbox */}
      {isOpen && openIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          onClick={close}
        >
          {/* Close - top right, always on top and visible over any image */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
            aria-label="Close"
            className="fixed right-4 top-4 z-[60] flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-fast ease-out hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6B9BF7]"
          >
            <X size={24} aria-hidden="true" />
          </button>

          {/* Prev - vertically centered */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 z-[55] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-fast ease-out hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6B9BF7] sm:left-4"
          >
            <ChevronLeft size={28} aria-hidden="true" />
          </button>

          {/* Image (clicking the image itself does not close) */}
          <div className="flex h-full w-full items-center justify-center p-4">
            <div
              className="relative h-[85vh] w-[90vw] max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[openIndex].src}
                alt={images[openIndex].alt}
                fill
                sizes="90vw"
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Next - vertically centered */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next image"
            className="absolute right-2 top-1/2 z-[55] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-fast ease-out hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6B9BF7] sm:right-4"
          >
            <ChevronRight size={28} aria-hidden="true" />
          </button>

          {/* Counter */}
          <p className="pointer-events-none absolute bottom-4 left-1/2 z-[55] -translate-x-1/2 text-sm text-gray-300">
            {openIndex + 1} / {images.length}
          </p>
        </div>
      )}
    </div>
  );
}
