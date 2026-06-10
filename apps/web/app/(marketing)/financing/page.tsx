import type { Metadata } from 'next';
import { BookConsultation } from '@/components/ui/BookConsultation';

export const metadata: Metadata = {
  title: 'Financing Options | Bright Box Homes',
  description:
    'Flexible financing available for all Bright Box Homes. Apply in minutes - fast approvals, competitive rates, and low monthly payments.',
};

export default function FinancingPage() {
  return (
    <section className="bg-bb-charcoal py-24 lg:py-32">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-bb-blue">
          Financing
        </p>
        <h1 className="font-heading text-4xl font-bold text-white md:text-5xl">
          Financing Options
        </h1>
        <p className="mt-6 text-lg text-gray-300">
          Flexible financing available for all Bright Box Homes. Apply in minutes - fast
          approvals, competitive rates, and low monthly payments.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {/* TODO: replace href="#" with the Acorn financing application URL once active */}
          <a
            href="#"
            className="inline-block rounded-lg bg-bb-blue px-8 py-4 text-lg font-semibold text-white transition-colors duration-fast ease-out hover:bg-bb-blue-dark"
          >
            Apply Now
          </a>
          <BookConsultation size="lg" variant="secondary">
            Book a Consultation
          </BookConsultation>
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-2 text-gray-300 sm:flex-row sm:gap-6">
          <a
            href="tel:8002591745"
            className="transition-colors duration-fast ease-out hover:text-white"
          >
            800-259-1745
          </a>
          <a
            href="mailto:info@brightboxhomes.com"
            className="transition-colors duration-fast ease-out hover:text-white"
          >
            info@brightboxhomes.com
          </a>
        </div>
      </div>
    </section>
  );
}
