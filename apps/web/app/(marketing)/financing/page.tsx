import type { Metadata } from 'next';
import { BookConsultation } from '@/components/ui/BookConsultation';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Financing Options | Bright Box Homes',
  description:
    'Flexible financing available for all Bright Box Homes. Apply in minutes - fast approvals, competitive rates, and low monthly payments.',
};

export default function FinancingPage() {
  return (
    <section
      className="py-24 lg:py-32"
      style={{ background: 'linear-gradient(180deg, #1C1C1E, #1C1C1E)' }}
    >
      <div className="mx-auto max-w-2xl px-6 text-center">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-[#D4A853]">
          Financing
        </p>
        <h1 className="font-heading text-4xl font-bold text-[#FFFFFF] md:text-5xl">
          Financing Options
        </h1>
        <p className="mt-6 text-lg text-[#D1D5DB]">
          Flexible financing available for all Bright Box Homes. Apply in minutes - fast
          approvals, competitive rates, and low monthly payments.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {/* TODO: replace href="#" with the Acorn financing application URL once active */}
          <Button href="#" size="lg">
            Apply Now
          </Button>
          <BookConsultation size="lg" variant="secondary">
            Book a Consultation
          </BookConsultation>
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-2 text-[#D1D5DB] sm:flex-row sm:gap-6">
          <a
            href="tel:8002591745"
            className="transition-colors duration-fast ease-out hover:text-[#FFFFFF]"
          >
            800-259-1745
          </a>
          <a
            href="mailto:info@brightboxhomes.com"
            className="transition-colors duration-fast ease-out hover:text-[#FFFFFF]"
          >
            info@brightboxhomes.com
          </a>
        </div>
      </div>
    </section>
  );
}
