'use client';

import Image from 'next/image';

// ─── ASSET MAPS ───────────────────────────────────────────────────────────────

// Base model renders keyed by the order label produced in DesignJourneyContent.
const MODEL_IMAGES: Record<string, string> = {
  '20×10 Studio': '/images/configurator/20x10-front.png',
  '20×20': '/images/configurator/20x20-front.jpg',
  '20×30': '/images/configurator/20x30-front.png',
  '20×40': '/images/configurator/20x40-front.jpg',
};

// Upgrade overlays composited over the base render when the upgrade is in the order.
const OVERLAY_ROOF = '/images/configurator/upgrade-roof.png';
const OVERLAY_PATIO = '/images/configurator/upgrade-patio.jpeg';
const OVERLAY_DECK = '/images/configurator/upgrade-deck.png';
const OVERLAY_SOLAR = '/images/configurator/upgrade-solar.webp';

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function fmt(n: number) {
  return '$' + n.toLocaleString('en-US');
}

// Strip the "Exterior: " / "Carved Metal Plate: " prefix for a compact chip label.
function cleanLabel(label: string | null) {
  if (!label) return null;
  return label.replace(/^[^:]+:\s*/, '');
}

function Overlay({ src, show, alt }: { src: string; show: boolean; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="380px"
      className="object-cover transition-opacity duration-500"
      style={{ opacity: show ? 1 : 0 }}
    />
  );
}

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export default function HomeConfigurator({
  model,
  exteriorColor,
  roofColor,
  hasRoof,
  hasPatio,
  hasDeck,
  hasSolar,
  orderTotal,
}: {
  model: string | null;
  exteriorColor: string | null;
  roofColor: string | null;
  hasRoof: boolean;
  hasPatio: boolean;
  hasDeck: boolean;
  hasSolar: boolean;
  orderTotal: number;
}) {
  const baseImage = model ? MODEL_IMAGES[model] ?? null : null;

  const chips: { label: string; active: boolean }[] = [
    { label: hasRoof ? 'Metal Roof' : 'No Roof', active: hasRoof },
    { label: 'Patio', active: hasPatio },
    { label: 'Deck', active: hasDeck },
    { label: 'Solar', active: hasSolar },
  ];

  return (
    <div
      className="overflow-hidden rounded-2xl"
      style={{
        background: '#1A2540',
        border: '1px solid rgba(107,155,247,0.2)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      }}
    >
      {/* Preview stage */}
      <div className="relative aspect-video w-full overflow-hidden bg-[#0D1526]">
        {baseImage ? (
          <>
            <Image
              src={baseImage}
              alt={model ?? 'Home preview'}
              fill
              sizes="380px"
              className="object-cover"
              priority
            />
            {/* Upgrade overlays fade in over the base render */}
            <Overlay src={OVERLAY_ROOF} show={hasRoof} alt="Metal roof upgrade" />
            <Overlay src={OVERLAY_SOLAR} show={hasSolar} alt="Solar upgrade" />
            <Overlay src={OVERLAY_PATIO} show={hasPatio} alt="Covered patio upgrade" />
            <Overlay src={OVERLAY_DECK} show={hasDeck} alt="Side deck upgrade" />
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center text-center">
            <div>
              <p className="text-sm font-medium text-[#6B9BF7]">Home Configurator</p>
              <p className="mt-1 text-xs text-gray-500">
                {model ? 'Preview coming soon for this model' : 'Select a home to preview'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Spec readout */}
      <div className="space-y-3 p-4">
        <div>
          <p className="font-heading text-base font-bold text-white">
            {model ?? 'Your Build'}
          </p>
          {(exteriorColor || roofColor) && (
            <p className="mt-0.5 text-xs text-gray-400">
              {[cleanLabel(exteriorColor), cleanLabel(roofColor)].filter(Boolean).join(' · ')}
            </p>
          )}
        </div>

        {/* Upgrade chips */}
        <div className="flex flex-wrap gap-1.5">
          {chips.map((c) => (
            <span
              key={c.label}
              className="rounded-full px-2.5 py-1 text-xs font-medium transition-colors"
              style={{
                background: c.active ? '#6B9BF7' : 'rgba(255,255,255,0.05)',
                color: c.active ? '#ffffff' : '#6B7280',
              }}
            >
              {c.active ? '✓ ' : ''}
              {c.label}
            </span>
          ))}
        </div>

        {/* Running total */}
        <div
          className="flex items-center justify-between pt-2"
          style={{ borderTop: '1px solid rgba(107,155,247,0.15)' }}
        >
          <span className="text-xs text-gray-400">Upgrades Total</span>
          <span className="font-mono text-sm font-bold text-white">{fmt(orderTotal)}</span>
        </div>
      </div>
    </div>
  );
}
