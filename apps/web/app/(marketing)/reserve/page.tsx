import type { Metadata } from 'next';
import Link from 'next/link';
import { BookConsultation } from '@/components/ui/BookConsultation';

export const metadata: Metadata = {
  title: 'Reserve Your Home | Bright Box Homes',
  description:
    'Reserve your Bright Box Home with a fully refundable $500 deposit. Deposit checkout is coming soon - in the meantime, book a consultation to lock your configuration.',
};

export default function ReservePage() {
  return (
    <section
      className="py-24 lg:py-32"
      style={{ background: 'linear-gradient(180deg, #1C1C1E, #1C1C1E)' }}
    >
      <div className="mx-auto max-w-2xl px-6 text-center">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-[#D4A853]">
          Reserve
        </p>
        <h1 className="font-heading text-4xl font-bold text-[#FFFFFF] md:text-5xl">
          Reserve Your Home - $500
        </h1>
        <p className="mt-6 text-lg text-[#D1D5DB]">
          Deposit checkout is coming soon. In the meantime, book a consultation and our
          team will reserve your configuration and walk you through the next steps.
        </p>
        <div className="mt-8 flex justify-center">
          <BookConsultation size="lg" />
        </div>
        <p className="mt-4 text-sm text-[#D1D5DB]">
          Prefer to finance?{' '}
          <Link
            href="/financing"
            className="font-medium text-[#D4A853] underline-offset-4 hover:underline"
          >
            Apply for Financing
          </Link>
        </p>
        <p className="mt-6 text-sm text-gray-400">
          100% refundable &middot; No obligation &middot; 800-259-1745
        </p>
      </div>
    </section>
  );
}
