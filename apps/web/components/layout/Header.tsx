'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, Menu, ChevronDown } from 'lucide-react';
import MobileNav from '@/components/layout/MobileNav';

const productColumnLeft = [
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
  { label: 'Apple Cabins', href: '/products/apple-cabins' },
  { label: 'Assembly Homes', href: '/products/assembly-homes' },
  { label: 'Apartments & Office Buildings', href: '/products/apartments-office-buildings' },
];

const productColumnRight = [
  { label: 'Duplex Homes', href: '/products/duplex' },
  { label: 'Space Capsules', href: '/products/space-capsules' },
  { label: 'Emergency Housing', href: '/products/emergency-housing' },
  { label: 'Vending Units', href: '/products/vending-units' },
];

const navLinks = [
  { label: 'Find Land', href: '/find-land' },
  { label: 'Design Your Home', href: '/design' },
  { label: 'About', href: '/about' },
  { label: 'Delivery', href: '/delivery' },
  { label: '$5K Challenge', href: '/5k-challenge' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQ', href: '/faq' },
];

const navLinkBase =
  'flex min-h-11 items-center border-b-2 px-3 font-body text-[#D1D5DB] transition-colors duration-200 ease-out hover:text-[#FFFFFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bb-gold';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const productsTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const CLOSE_DELAY = 400;

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 64);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeAll = useCallback(() => {
    if (productsTimer.current) {
      clearTimeout(productsTimer.current);
      productsTimer.current = null;
    }
    setProductsOpen(false);
  }, []);

  function openProducts() {
    if (productsTimer.current) {
      clearTimeout(productsTimer.current);
      productsTimer.current = null;
    }
    setProductsOpen(true);
  }
  function scheduleCloseProducts() {
    if (productsTimer.current) clearTimeout(productsTimer.current);
    productsTimer.current = setTimeout(() => setProductsOpen(false), CLOSE_DELAY);
  }

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

  const productsActive = pathname?.startsWith('/products') ?? false;

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b border-white/[0.06] bg-bb-charcoal/85 backdrop-blur-[20px] transition-shadow duration-200 ease-out ${
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

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-2 lg:flex">
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
                className={`flex min-h-11 items-center gap-1 border-b-2 px-3 font-body text-[#D1D5DB] transition-colors duration-200 ease-out hover:text-[#FFFFFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bb-gold ${
                  productsActive ? 'border-bb-gold text-[#FFFFFF]' : 'border-transparent'
                }`}
              >
                Products
                <ChevronDown size={16} aria-hidden="true" />
              </button>

              {productsOpen && (
                <div className="absolute left-0 top-full z-[9999] mt-2 w-[560px] max-w-[90vw] rounded-lg border border-white/10 bg-bb-charcoal p-6 shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
                  <div aria-hidden="true" className="absolute inset-x-0 -top-2 h-2" />
                  <div className="grid grid-cols-2 gap-8">
                    <div className="flex flex-col gap-1">
                      {productColumnLeft.map((link) => (
                        <div key={link.href}>
                          <Link
                            href={link.href}
                            onClick={closeAll}
                            className="flex min-h-10 items-center rounded-md px-3 font-body font-medium text-[#D1D5DB] transition-colors duration-200 ease-out hover:bg-white/5 hover:text-[#FFFFFF]"
                          >
                            {link.label}
                          </Link>
                          {'children' in link && link.children && (
                            <div className="ml-3 mt-1 flex flex-col gap-0.5 border-l border-white/10 pl-3">
                              {link.children.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  onClick={closeAll}
                                  className="flex min-h-9 items-center rounded-md px-3 font-body text-sm text-[#9CA3AF] transition-colors duration-200 ease-out hover:text-[#D1D5DB]"
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col gap-1">
                      {productColumnRight.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={closeAll}
                          className="flex min-h-10 items-center rounded-md px-3 font-body font-medium text-[#D1D5DB] transition-colors duration-200 ease-out hover:bg-white/5 hover:text-[#FFFFFF]"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {navLinks.map((link) => {
              const active = pathname === link.href || pathname?.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${navLinkBase} ${
                    active ? 'border-bb-gold text-[#FFFFFF]' : 'border-transparent'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <a
              href="tel:8002591745"
              className="ml-1 flex min-h-11 items-center gap-2 px-2 font-body text-sm font-semibold text-[#9CA3AF] transition-colors duration-200 ease-out hover:text-[#FFFFFF]"
            >
              <Phone size={20} aria-hidden="true" className="text-red-500" />
              800-259-1745
            </a>
          </nav>

          {/* Mobile controls */}
          <div className="flex items-center gap-1 lg:hidden">
            <a
              href="tel:8002591745"
              aria-label="Call 800-259-1745"
              className="flex min-h-11 min-w-11 items-center justify-center rounded-sm transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bb-gold"
            >
              <Phone size={24} aria-hidden="true" className="text-red-500" />
            </a>
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
              className="flex min-h-11 min-w-11 items-center justify-center rounded-sm text-[#FFFFFF] transition-colors duration-200 ease-out hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bb-gold"
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
