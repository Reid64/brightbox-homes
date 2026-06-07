'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Phone, Menu, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import MobileNav from '@/components/layout/MobileNav';

const productLinks = [
  { label: 'Expandable Homes', href: '/products/expandable-homes' },
  { label: 'Apple Cabins', href: '/products/apple-cabins' },
  { label: 'Space Capsules', href: '/products/space-capsules' },
  { label: 'Assembly Homes', href: '/products/assembly-homes' },
  { label: 'Foldout Homes', href: '/products/foldout-homes' },
];

const navLinks = [
  { label: 'About', href: '/about' },
  { label: '$5K Challenge', href: '/5k-challenge' },
  { label: 'FAITH Foundation', href: '/faith-foundation' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQ', href: '/faq' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Add a subtle shadow once scrolled past the header height. Header stays
  // visible at all times (no hide-on-scroll-down per spec).
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 64);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // 150ms close delay prevents flicker when moving between trigger and menu.
  function openProducts() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setProductsOpen(true);
  }
  function closeProducts() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setProductsOpen(false), 150);
  }

  return (
    <header
      className={`sticky top-0 z-50 border-b border-bb-gray-200 bg-bb-white transition-shadow duration-fast ease-out ${
        scrolled ? 'shadow-sm' : ''
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-6">
        {/* TODO: Replace with logo image when asset provided */}
        <Link
          href="/"
          className="font-heading text-lg font-bold tracking-tight text-bb-navy"
        >
          BRIGHT BOX HOMES
        </Link>

        {/* Desktop navigation (lg and up per anti-pattern #6) */}
        <nav className="hidden items-center gap-1 lg:flex">
          <div
            className="relative"
            onMouseEnter={openProducts}
            onMouseLeave={closeProducts}
          >
            <button
              type="button"
              aria-haspopup="true"
              aria-expanded={productsOpen}
              onClick={() => setProductsOpen((v) => !v)}
              className="flex min-h-11 items-center gap-1 rounded-sm px-3 font-body text-bb-gray-900 transition-colors duration-fast ease-out hover:text-bb-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bb-blue"
            >
              Products
              <ChevronDown size={16} aria-hidden="true" />
            </button>
            {productsOpen && (
              <div className="absolute left-0 top-full z-50 w-56 rounded-md border border-bb-gray-200 bg-bb-white py-2 shadow-md">
                {productLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex min-h-11 items-center px-4 font-body text-bb-gray-900 transition-colors duration-fast ease-out hover:bg-bb-blue-light"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex min-h-11 items-center rounded-sm px-3 font-body text-bb-gray-900 transition-colors duration-fast ease-out hover:text-bb-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bb-blue"
            >
              {link.label}
            </Link>
          ))}

          <a
            href="tel:8002591745"
            className="ml-2 flex min-h-11 items-center gap-2 px-3 font-body text-bb-gray-600 transition-colors duration-fast ease-out hover:text-bb-blue"
          >
            <Phone size={20} aria-hidden="true" />
            800-259-1745
          </a>

          <Button href="/consultation" size="sm" className="ml-2">
            Book a Consultation
          </Button>
        </nav>

        {/* Mobile controls (below lg) */}
        <div className="flex items-center gap-1 lg:hidden">
          <a
            href="tel:8002591745"
            aria-label="Call 800-259-1745"
            className="flex min-h-11 min-w-11 items-center justify-center rounded-sm text-bb-gray-600 transition-colors duration-fast ease-out hover:text-bb-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bb-blue"
          >
            <Phone size={24} aria-hidden="true" />
          </a>
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
            className="flex min-h-11 min-w-11 items-center justify-center rounded-sm text-bb-navy transition-colors duration-fast ease-out hover:bg-bb-blue-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bb-blue"
          >
            <Menu size={24} aria-hidden="true" />
          </button>
        </div>
      </div>

      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
