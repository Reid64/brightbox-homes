import type { ReactNode } from 'react';
import Image from 'next/image';

interface ShowcaseCardProps {
  index: number;
  image: string;
  alt: string;
  children: ReactNode;
}

// Full-width horizontal showcase card. Odd cards (index 0, 2, ...) image-left;
// even cards (index 1, 3, ...) image-right - for visual rhythm.
export default function ShowcaseCard({ index, image, alt, children }: ShowcaseCardProps) {
  const imageLeft = index % 2 === 0;
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-bb-surface-dark lg:flex">
      <div
        className={`relative aspect-video w-full lg:aspect-auto lg:w-2/5 ${
          imageLeft ? 'lg:order-first' : 'lg:order-last'
        }`}
      >
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="p-8 lg:w-3/5">{children}</div>
    </div>
  );
}
