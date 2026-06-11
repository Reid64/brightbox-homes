'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Menu, ChevronDown, ChevronRight } from 'lucide-react';
import MobileNav from '@/components/layout/MobileNav';

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

const navLinks = [
  { label: 'Design Your Home', href: '/design' },
  { label: 'About', href: '/about' },
  { label: '$5K Challenge', href: '/5k-challenge' },
  { label: 'The Real Cost', href: '/the-real-cost' },
  { label: 'FAITH Foundation', href: '/faith-foundation' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQ', href: '/faq' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [subOpen, setSubOpen] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const productsTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const subTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const productsRef = useRef<HTMLDivElement>(null);

  // Generous close delay so the cursor can travel between the trigger, the
  // dropdown, and the sub-menu without the menu vanishing mid-move.
  const CLOSE_DELAY = 400;

  // Deepen the glass once scrolled past the header height. Header stays
  // visible at all times (no hide-on-scroll-down per spec).
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 64);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const clear = (ref: React.MutableRefObject<ReturnType<typeof setTimeout> | null>) => {
    if (ref.current) {
      clearTimeout(ref.current);
      ref.current = null;
    }
  };

  const closeAll = useCallback(() => {
    clear(productsTimer);
    clear(subTimer);
    setProductsOpen(false);
    setSubOpen(null);
  }, []);

  function openProducts() {
    clear(productsTimer);
    setProductsOpen(true);
  }
  function scheduleCloseProducts() {
    clear(productsTimer);
    productsTimer.current = setTimeout(() => {
      setProductsOpen(false);
      setSubOpen(null);
    }, CLOSE_DELAY);
  }
  function openSub(href: string) {
    clear(subTimer);
    setSubOpen(href);
  }
  function scheduleCloseSub() {
    clear(subTimer);
    subTimer.current = setTimeout(() => setSubOpen(null), CLOSE_DELAY);
  }

  // Close on click-outside or Escape (only while open).
  useEffect(() => {
    if (!productsOpen) return;
    function onPointerDown(e: PointerEvent) {
      if (productsRef.current && !productsRef.current.contains(e.target as Node)) {
        closeAll();
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') closeAll();
    }
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [productsOpen, closeAll]);

  // MobileNav is rendered as a sibling of <header>, NOT a child: the header's
  // `backdrop-blur-md` (a backdrop-filter) establishes a containing block for
  // fixed-positioned descendants, which would clip the full-screen mobile
  // overlay to the 64px header box. Keeping it outside anchors `fixed` to the
  // viewport so the menu covers the page.
  return (
    <>
      <header
      className={`sticky top-0 z-50 border-b border-white/10 bg-bb-charcoal/80 backdrop-blur-md transition-shadow duration-fast ease-out ${
        scrolled ? 'shadow-lg' : ''
      }`}
    >
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center" aria-label="Bright Box Homes home">
          <Image
            src="/images/logo.png"
            alt="Bright Box Homes"
            width={232}
            height={48}
            priority
            className="h-12 w-auto"
          />
        </Link>

        {/* Desktop navigation (lg and up per anti-pattern #6) */}
        <nav className="hidden items-center gap-3 lg:flex">
          <div
            className="relative"
            ref={productsRef}
            onMouseEnter={openProducts}
            onMouseLeave={scheduleCloseProducts}
          >
            <button
              type="button"
              aria-haspopup="true"
              aria-expanded={productsOpen}
              onClick={() => setProductsOpen((v) => !v)}
              className="flex min-h-11 items-center gap-1 rounded-sm px-3 font-body text-gray-300 transition-colors duration-fast ease-out hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bb-blue"
            >
              Products
              <ChevronDown size={16} aria-hidden="true" />
            </button>
            {productsOpen && (
              <div className="absolute left-0 top-full z-50 w-60 rounded-md border border-white/10 bg-bb-surface-dark py-2 shadow-lg">
                {/* Invisible bridge so the cursor can cross from the trigger into the panel */}
                <div aria-hidden="true" className="absolute inset-x-0 -top-2 h-2" />
                {productLinks.map((link) =>
                  'children' in link && link.children ? (
                    <div
                      key={link.href}
                      className="relative"
                      onMouseEnter={() => openSub(link.href)}
                      onMouseLeave={scheduleCloseSub}
                    >
                      <Link
                        href={link.href}
                        onClick={closeAll}
                        className="flex min-h-11 items-center justify-between gap-2 px-4 font-body text-gray-300 transition-colors duration-fast ease-out hover:bg-white/5 hover:text-white"
                      >
                        {link.label}
                        <ChevronRight size={16} aria-hidden="true" />
                      </Link>
                      {subOpen === link.href && (
                        <div className="absolute left-full top-0 z-50 w-52 rounded-md border border-white/10 bg-bb-surface-dark py-2 shadow-lg">
                          {/* Invisible bridge across the gap to the sub-menu */}
                          <div aria-hidden="true" className="absolute inset-y-0 -left-2 w-2" />
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={closeAll}
                              className="flex min-h-11 items-center px-4 font-body text-gray-300 transition-colors duration-fast ease-out hover:bg-white/5 hover:text-white"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeAll}
                      className="flex min-h-11 items-center px-4 font-body text-gray-300 transition-colors duration-fast ease-out hover:bg-white/5 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  ),
                )}
              </div>
            )}
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex min-h-11 items-center rounded-sm px-3 font-body text-gray-300 transition-colors duration-fast ease-out hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bb-blue"
            >
              {link.label}
            </Link>
          ))}

          <a
            href="tel:8002591745"
            className="ml-2 flex min-h-11 items-center gap-2 px-3 font-body text-base font-semibold text-gray-100 transition-colors duration-fast ease-out hover:text-white"
          >
            <Phone size={22} aria-hidden="true" className="text-red-500" />
            800-259-1745
          </a>
        </nav>

        {/* Mobile controls (below lg) */}
        <div className="flex items-center gap-1 lg:hidden">
          <a
            href="tel:8002591745"
            aria-label="Call 800-259-1745"
            className="flex min-h-11 min-w-11 items-center justify-center rounded-sm transition-colors duration-fast ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bb-blue"
          >
            <Phone size={24} aria-hidden="true" className="text-red-500" />
          </a>
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
            className="flex min-h-11 min-w-11 items-center justify-center rounded-sm text-white transition-colors duration-fast ease-out hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bb-blue"
          >
            <Menu size={24} aria-hidden="true" />
          </button>
        </div>
      </div>
      </header>

      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
