import Image from 'next/image';
import Link from 'next/link';

// Server component - no interactivity. Contact info per BLUEPRINT.md Section 13,
// legal disclosures verbatim per BLUEPRINT.md Section 12.2.

const productLinks = [
  { label: 'Expandable Homes', href: '/products/expandable-homes' },
  { label: 'Apple Cabins', href: '/products/apple-cabins' },
  { label: 'Space Capsules', href: '/products/space-capsules' },
  { label: 'Assembly Homes', href: '/products/assembly-homes' },
  { label: 'Foldout Homes', href: '/products/foldout-homes' },
];

const companyLinks = [
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQ', href: '/faq' },
  { label: '$5K Challenge', href: '/5k-challenge' },
  { label: 'FAITH Foundation', href: '/faith-foundation' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '/legal/privacy' },
  { label: 'Terms of Service', href: '/legal/terms' },
  { label: 'Return Policy', href: '/legal/returns' },
  { label: 'Warranty Terms', href: '/legal/warranty' },
];

const linkClass =
  'inline-flex min-h-11 items-center font-body text-sm text-bb-gray-200 transition-colors duration-fast ease-out hover:text-bb-white';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-bb-navy text-bb-gray-200">
      {/* 1. Main footer grid */}
      <div className="mx-auto max-w-[1280px] px-6 py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image
              src="/images/logo.png"
              alt="Bright Box Homes"
              width={48}
              height={32}
              className="h-8 w-auto"
            />
            <p className="mt-3 font-body text-sm text-bb-gray-400">
              American Owned. Globally Sourced. US Delivered.
            </p>
            <a href="tel:8002591745" className={linkClass}>
              800-259-1745
            </a>
            <br />
            <a href="mailto:info@brightboxhomes.com" className={linkClass}>
              info@brightboxhomes.com
            </a>
          </div>

          <nav aria-label="Products">
            <h2 className="font-heading text-sm font-bold uppercase tracking-wide text-bb-white">
              Products
            </h2>
            <ul className="mt-2">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <h2 className="font-heading text-sm font-bold uppercase tracking-wide text-bb-white">
              Company
            </h2>
            <ul className="mt-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Legal">
            <h2 className="font-heading text-sm font-bold uppercase tracking-wide text-bb-white">
              Legal
            </h2>
            <ul className="mt-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* 2. FAITH Foundation bar */}
      <div className="border-t border-white/10 bg-bb-blue/10">
        <div className="mx-auto max-w-[1280px] px-6 py-4">
          <Link
            href="/faith-foundation"
            className="inline-flex min-h-11 items-center font-body text-sm font-medium text-bb-blue transition-colors duration-fast ease-out hover:text-white"
          >
            For every home sold, we donate $2,500 to the FAITH Foundation.
          </Link>
        </div>
      </div>

      {/* 3. Legal disclosures */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-[1280px] space-y-2 px-6 py-6">
          <p className="font-body text-xs text-gray-500">
            Manufactured in China. Imported and distributed by Bright Box Homes LLC.
          </p>
          <p className="font-body text-xs text-gray-500">
            Bright Box Homes are classified as temporary buildings and do not require
            local building code compliance in most jurisdictions. Consult your local
            building department for placement restrictions.
          </p>
        </div>
      </div>

      {/* 4. Copyright bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-[1280px] px-6 py-4">
          <p className="font-body text-xs text-gray-500">
            &copy; 2026 Bright Box Homes LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
