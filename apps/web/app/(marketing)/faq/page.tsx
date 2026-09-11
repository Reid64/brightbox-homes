import type { Metadata } from 'next';
import { BookConsultation } from '@/components/ui/BookConsultation';
import Accordion from '@/components/ui/Accordion';
import FAQHeroGuide from '@/components/ui/FAQHeroGuide';
import {
  faqSections,
  faqCategories,
  faqByCategoryId,
  categoryAnchorMap,
} from '@/lib/faq-data';
import type { FaqCategoryId } from '@/lib/faq-data';

export const metadata: Metadata = {
  title: 'FAQ | Bright Box Homes - Everything You Need to Know',
  description:
    'Answers to the most common questions about expandable container homes, permits, delivery, true costs, off-grid living, financing, building code, and unrestricted land.',
};

const categoryCounts = Object.fromEntries(
  faqCategories.map((category) => [category.id, faqByCategoryId(category.id).length]),
) as Record<FaqCategoryId, number>;

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqSections.flatMap((s) =>
    s.items.map((it) => ({
      '@type': 'Question',
      name: it.question,
      acceptedAnswer: { '@type': 'Answer', text: it.answer },
    })),
  ),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <FAQHeroGuide counts={categoryCounts} />

      {/* Accordion */}
      {/* bg-white is the base coat, not decoration: the gradient's last stop is 2%
          charcoal, i.e. 98% transparent, and body is #1C1C1E - without an opaque
          white underneath, the dark body bleeds through the bottom-right. */}
      <section className="bg-white bg-gradient-to-br from-white via-white to-bb-charcoal/[0.02] py-12 lg:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Accordion sections={faqSections} anchors={categoryAnchorMap()} />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1C1C1E] py-16 lg:py-24">
        <div className="mx-auto max-w-[1280px] px-6 text-center">
          <h2 className="font-heading text-3xl font-bold text-[#FFFFFF] md:text-4xl">
            Still have questions?
          </h2>
          <p className="mt-4 text-lg text-[#D1D5DB]">
            Our team is happy to walk you through anything - from land to delivery to
            financing.
          </p>
          <div className="mt-8 flex justify-center">
            <BookConsultation size="lg" />
          </div>
          <p className="mt-6 text-sm text-gray-400">
            800-259-1745 &middot; info@brightboxhomes.com
          </p>
        </div>
      </section>
    </>
  );
}
