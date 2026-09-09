import Image from 'next/image';
import Link from 'next/link';

// Server component - no interactivity. Contact info per BLUEPRINT.md Section 13,
// legal disclosures verbatim per BLUEPRINT.md Section 12.2.

const productLinks = [
  { label: 'Expandable Homes', href: '/products/expandable-homes' },
  { label: 'Apple Cabins', href: '/products/apple-cabins' },
  { label: 'Space Capsules', href: '/products/space-capsules' },
  { label: 'Assembly Homes', href: '/products/assembly-homes' },
  { label: 'Emergency Housing', href: '/products/emergency-housing' },
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
  'inline-flex min-h-11 items-center font-body text-sm text-[#9CA3AF] transition-colors duration-200 ease-out hover:text-[#FFFFFF]';

const headingClass =
  'font-heading text-xs font-bold uppercase tracking-[0.1em] text-[#9CA3AF]';

export default function Footer() {
  return (
    <footer
      className="text-[#9CA3AF]"
      style={{ background: 'linear-gradient(180deg, #1C1C1E, #1C1C1E)' }}
    >
      {/* Gradient top border */}
      <div
        className="h-px w-full"
        style={{
          background:
            'linear-gradient(to right, transparent, rgba(212,168,83,0.15), transparent)',
        }}
      />

      {/* 1. Main footer grid */}
      <div className="mx-auto max-w-[1280px] px-6 py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image
              src="/images/logo.png"
              alt="Bright Box Homes"
              width={160}
              height={33}
              className="h-8 w-auto"
            />
            <p className="mt-3 font-body text-sm text-[#9CA3AF]">
              American Owned. Globally Sourced. US Delivered.
            </p>
            <a
              href="tel:8002591745"
              className="inline-flex min-h-11 items-center font-body text-sm font-semibold text-[#FFFFFF] transition-colors duration-200 ease-out hover:text-[#FFFFFF]"
            >
              800-259-1745
            </a>
            <br />
            <a href="mailto:info@brightboxhomes.com" className={linkClass}>
              info@brightboxhomes.com
            </a>
          </div>

          <nav aria-label="Products">
            <h2 className={headingClass}>Products</h2>
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
            <h2 className={headingClass}>Company</h2>
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
            <h2 className={headingClass}>Legal</h2>
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
      <div className="border-t border-white/[0.06] bg-[#D4A853]/10">
        <div className="mx-auto max-w-[1280px] px-6 py-4">
          <Link
            href="/faith-foundation"
            className="inline-flex min-h-11 items-center font-body text-sm font-medium text-[#D4A853] transition-colors duration-200 ease-out hover:text-[#FFFFFF]"
          >
            For every home sold, we donate $2,500 to the FAITH Foundation.
          </Link>
        </div>
      </div>

      {/* 3. Legal disclosures */}
      <div className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-[1280px] space-y-2 px-6 py-6">
          <p className="font-body text-xs text-[#9CA3AF]">
            Manufactured in China. Imported and distributed by Bright Box Homes LLC.
          </p>
          <p className="font-body text-xs text-[#9CA3AF]">
            Bright Box Homes are classified as temporary buildings and do not require
            local building code compliance in most jurisdictions. Consult your local
            building department for placement restrictions.
          </p>
        </div>
      </div>

      {/* 4. Trust badges */}
      <div className="border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-center gap-6 px-6 py-8 opacity-90">
          {[
            ['faith-foundation-partnership', 'FAITH Foundation Partner'],
            ['faith-2500-donation', '$2,500 donated per home sold'],
            ['exclusive-us-distributor', 'Exclusive US Distributor'],
            ['american-owned-globally-sourced', 'American Owned, Globally Sourced'],
          ].map(([file, alt]) => (
            <Image
              key={file}
              src={`/images/badges/${file}.png`}
              alt={alt}
              width={200}
              height={200}
              className="h-20 w-auto"
            />
          ))}
        </div>
      </div>

      {/* 5. Copyright bar */}
      <div className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-[1280px] px-6 py-4">
          <p className="font-body text-xs text-[#9CA3AF]">
            &copy; 2026 Bright Box Homes LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
