'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Phone } from 'lucide-react';
import { BookConsultation } from '@/components/ui/BookConsultation';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const productLinks = [
  {
    label: 'Expandable Homes',
    href: '/products/expandable-homes',
    children: [
      { label: '20x10 Studio', href: '/products/expandable-homes/20x10' },
      { label: '20x20 Models', href: '/products/expandable-homes/20x20' },
      { label: '20x30 Models', href: '/products/expandable-homes/20x30' },
      { label: '20x40 Models', href: '/products/expandable-homes/20x40' },
    ],
  },
  { label: 'Duplex Homes', href: '/products/duplex' },
  { label: 'Apple Cabins', href: '/products/apple-cabins' },
  { label: 'Space Capsules', href: '/products/space-capsules' },
  { label: 'Assembly Homes', href: '/products/assembly-homes' },
  { label: 'Emergency Housing', href: '/products/emergency-housing' },
  { label: 'Apartments & Office Buildings', href: '/products/apartments-office-buildings' },
  { label: 'Vending Units', href: '/products/vending-units' },
];

// FAITH Foundation lives in the footer only (kept out of the primary nav).
const companyLinks = [
  { label: 'Find Land', href: '/find-land' },
  { label: 'Design Your Home', href: '/design' },
  { label: 'About', href: '/about' },
  { label: 'Delivery', href: '/delivery' },
  { label: '$5K Challenge', href: '/5k-challenge' },
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
      className={`fixed inset-0 z-[9999] lg:hidden ${isOpen ? '' : 'pointer-events-none'}`}
      aria-hidden={!isOpen}
    >
      {/* Full-screen overlay panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        className={`absolute inset-0 flex h-full w-full flex-col bg-[#1C1C1E] transition-transform duration-300 ease-out ${
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
            className="flex min-h-11 min-w-11 items-center justify-center rounded-sm text-[#FFFFFF] transition-colors duration-200 ease-out hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A853]"
          >
            <X size={24} aria-hidden="true" />
          </button>
        </div>

        <nav className="mx-auto w-full max-w-lg flex-1 overflow-y-auto px-2 py-4">
          <p className="px-4 pb-1 pt-2 font-heading text-sm font-bold uppercase tracking-wide text-[#9CA3AF]">
            Products
          </p>
          {productLinks.map((link) => (
            <div key={link.href}>
              <Link
                href={link.href}
                onClick={onClose}
                className="flex min-h-12 items-center rounded-sm px-4 font-body text-[#D1D5DB] transition-colors duration-200 ease-out hover:bg-white/5 hover:text-[#FFFFFF]"
              >
                {link.label}
              </Link>
              {'children' in link && link.children && (
                <div className="ml-4 border-l border-white/10">
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={onClose}
                      className="flex min-h-11 items-center rounded-sm px-4 font-body text-sm text-[#9CA3AF] transition-colors duration-200 ease-out hover:bg-white/5 hover:text-[#D1D5DB]"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <p className="px-4 pb-1 pt-4 font-heading text-sm font-bold uppercase tracking-wide text-[#9CA3AF]">
            Company
          </p>
          {companyLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="flex min-h-12 items-center rounded-sm px-4 font-body text-[#D1D5DB] transition-colors duration-200 ease-out hover:bg-white/5 hover:text-[#FFFFFF]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mx-auto w-full max-w-lg border-t border-white/10 px-6 py-4">
          <BookConsultation className="w-full" onClick={onClose}>Book a Consultation</BookConsultation>
          <a
            href="tel:8002591745"
            className="mt-3 flex min-h-11 items-center justify-center gap-2 font-body text-[#9CA3AF] transition-colors duration-200 ease-out hover:text-[#FFFFFF]"
          >
            <Phone size={20} aria-hidden="true" />
            800-259-1745
          </a>
        </div>
      </div>
    </div>
  );
}
