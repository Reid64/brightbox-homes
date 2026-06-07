'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryImage {
  src: string;
  alt: string;
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
      {/* Grid */}
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
        {images.map((image, i) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setOpenIndex(i)}
            aria-label={`View image ${i + 1}: ${image.alt}`}
            className="group relative aspect-square overflow-hidden rounded-lg border border-white/5 transition-all duration-normal ease-out hover:border-white/10"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              className="object-cover transition-transform duration-normal ease-out group-hover:scale-[1.02]"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {isOpen && openIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
        >
          {/* Overlay click closes */}
          <button
            type="button"
            aria-label="Close image viewer"
            onClick={close}
            className="absolute inset-0 cursor-default"
          />

          {/* Close */}
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full text-white/80 transition-colors duration-fast ease-out hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bb-blue"
          >
            <X size={24} aria-hidden="true" />
          </button>

          {/* Prev */}
          <button
            type="button"
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-2 z-10 flex h-11 w-11 items-center justify-center rounded-full text-white/80 transition-colors duration-fast ease-out hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bb-blue sm:left-4"
          >
            <ChevronLeft size={28} aria-hidden="true" />
          </button>

          {/* Image */}
          <div className="relative z-0 h-[85vh] w-[90vw] max-w-4xl">
            <Image
              src={images[openIndex].src}
              alt={images[openIndex].alt}
              fill
              sizes="90vw"
              className="object-contain"
              priority
            />
          </div>

          {/* Next */}
          <button
            type="button"
            onClick={next}
            aria-label="Next image"
            className="absolute right-2 z-10 flex h-11 w-11 items-center justify-center rounded-full text-white/80 transition-colors duration-fast ease-out hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bb-blue sm:right-4"
          >
            <ChevronRight size={28} aria-hidden="true" />
          </button>

          {/* Counter */}
          <p className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 text-sm text-gray-400">
            {openIndex + 1} / {images.length}
          </p>
        </div>
      )}
    </div>
  );
}
