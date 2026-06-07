// Placeholder homepage. Full hero and content arrive in the content prompt series.
// CTA copy is the canonical "Book a Consultation" per DESIGN_LANGUAGE 5.3.
export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-bb-warm-white px-6 text-center">
      <h1 className="font-heading text-4xl font-extrabold tracking-tight text-bb-navy md:text-6xl">
        Bright Box Homes
      </h1>
      <p className="mt-4 max-w-xl font-body text-lg text-bb-gray-600">
        American Owned. Globally Sourced. US Delivered.
      </p>
      <a
        href="/about"
        className="mt-8 inline-flex min-h-[44px] items-center justify-center rounded-sm bg-bb-blue px-6 py-3 font-body font-medium text-white shadow-sm transition-colors duration-150 hover:bg-bb-blue-dark"
      >
        Book a Consultation
      </a>
    </main>
  );
}
