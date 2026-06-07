'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const productLinks = [
  { label: 'Expandable Homes', href: '/products/expandable-homes' },
  { label: 'Apple Cabins', href: '/products/apple-cabins' },
  { label: 'Space Capsules', href: '/products/space-capsules' },
  { label: 'Assembly Homes', href: '/products/assembly-homes' },
  { label: 'Foldout Homes', href: '/products/foldout-homes' },
];

const companyLinks = [
  { label: 'About', href: '/about' },
  { label: '$5K Challenge', href: '/5k-challenge' },
  { label: 'FAITH Foundation', href: '/faith-foundation' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQ', href: '/faq' },
];

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Close on Escape.
  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll while open.
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  // Move focus to the close button when the panel opens (focus trap entry point).
  useEffect(() => {
    if (isOpen) closeButtonRef.current?.focus();
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 z-50 lg:hidden ${isOpen ? '' : 'pointer-events-none'}`}
      aria-hidden={!isOpen}
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className={`absolute inset-0 bg-black/60 transition-opacity duration-normal ease-out ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Slide-in panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        className={`absolute right-0 top-0 flex h-full w-80 max-w-full flex-col bg-bb-surface-dark shadow-lg transition-transform duration-normal ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <Image
            src="/images/logo.png"
            alt="Bright Box Homes"
            width={180}
            height={37}
            className="h-9 w-auto"
          />
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex min-h-11 min-w-11 items-center justify-center rounded-sm text-gray-400 transition-colors duration-fast ease-out hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bb-blue"
          >
            <X size={24} aria-hidden="true" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 py-4">
          <p className="px-4 pb-1 pt-2 font-heading text-sm font-bold uppercase tracking-wide text-gray-500">
            Products
          </p>
          {productLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="flex min-h-12 items-center rounded-sm px-4 font-body text-gray-200 transition-colors duration-fast ease-out hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </Link>
          ))}

          <p className="px-4 pb-1 pt-4 font-heading text-sm font-bold uppercase tracking-wide text-gray-500">
            Company
          </p>
          {companyLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="flex min-h-12 items-center rounded-sm px-4 font-body text-gray-200 transition-colors duration-fast ease-out hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-white/10 px-6 py-4">
          <Button href="/consultation" className="w-full" onClick={onClose}>
            Book a Consultation
          </Button>
          <a
            href="tel:8002591745"
            className="mt-3 flex min-h-11 items-center justify-center gap-2 font-body text-gray-300 transition-colors duration-fast ease-out hover:text-white"
          >
            <Phone size={20} aria-hidden="true" />
            800-259-1745
          </a>
        </div>
      </div>
    </div>
  );
}
