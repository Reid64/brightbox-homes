'use client';

import { useEffect, useRef, useState } from 'react';

// Delivery zone checker. Resolves a US ZIP to coordinates via Zippopotam, then
// measures great-circle distance to the nearest port city we ship from.
// Free inside 300 miles; beyond that, $3 per mile over the threshold.

interface Port {
  name: string;
  lat: number;
  lon: number;
}

const PORTS: Port[] = [
  { name: 'Houston, TX', lat: 29.7604, lon: -95.3698 },
  { name: 'Los Angeles, CA', lat: 33.7291, lon: -118.2625 },
  { name: 'Newark, NJ', lat: 40.7282, lon: -74.1719 },
  { name: 'Savannah, GA', lat: 32.0835, lon: -81.0998 },
  { name: 'Charleston, SC', lat: 32.7765, lon: -79.9311 },
  { name: 'Seattle, WA', lat: 47.6062, lon: -122.3321 },
  { name: 'Norfolk, VA', lat: 36.8508, lon: -76.2859 },
  { name: 'Miami, FL', lat: 25.7617, lon: -80.1918 },
  { name: 'New Orleans, LA', lat: 29.9511, lon: -90.0715 },
  { name: 'Baltimore, MD', lat: 39.2904, lon: -76.6122 },
];

const FREE_RADIUS_MILES = 300;
const RATE_PER_MILE = 3;
const EARTH_RADIUS_MILES = 3958.8;

function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

// Haversine great-circle distance in miles.
function distanceMiles(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) ** 2;
  return EARTH_RADIUS_MILES * 2 * Math.asin(Math.sqrt(a));
}

function nearestPort(lat: number, lon: number): { port: Port; miles: number } {
  let best = { port: PORTS[0], miles: distanceMiles(lat, lon, PORTS[0].lat, PORTS[0].lon) };
  for (const port of PORTS.slice(1)) {
    const miles = distanceMiles(lat, lon, port.lat, port.lon);
    if (miles < best.miles) best = { port, miles };
  }
  return best;
}

interface Result {
  free: boolean;
  miles: number;
  portName: string;
  fee: number;
}

export default function DeliveryZoneChecker() {
  const [showZoneChecker, setShowZoneChecker] = useState(false);
  const [zipCode, setZipCode] = useState('');
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close on Escape, and move focus into the dialog when it opens.
  useEffect(() => {
    if (!showZoneChecker) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setShowZoneChecker(false);
    }
    document.addEventListener('keydown', onKey);
    inputRef.current?.focus();
    return () => document.removeEventListener('keydown', onKey);
  }, [showZoneChecker]);

  async function check() {
    const zip = zipCode.trim();
    setResult(null);
    setError(null);

    if (!/^\d{5}$/.test(zip)) {
      setError('Enter a 5-digit US ZIP code.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`https://api.zippopotam.us/us/${zip}`);
      if (!res.ok) {
        setError(`We couldn't find ZIP ${zip}. Check the code and try again.`);
        return;
      }
      const data = await res.json();
      const place = data?.places?.[0];
      const lat = Number(place?.latitude);
      const lon = Number(place?.longitude);

      if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
        setError(`We couldn't locate ZIP ${zip}. Call us and we'll quote it directly.`);
        return;
      }

      const { port, miles } = nearestPort(lat, lon);
      const rounded = Math.round(miles);
      setResult({
        free: rounded <= FREE_RADIUS_MILES,
        miles: rounded,
        portName: port.name,
        fee: Math.max(0, rounded - FREE_RADIUS_MILES) * RATE_PER_MILE,
      });
    } catch {
      setError('Could not reach the lookup service. Check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setShowZoneChecker(true)}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-8 py-4 text-lg font-semibold transition-colors duration-fast ease-out hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A853] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D1526]"
        style={{ background: '#D4A853', color: '#111111' }}
      >
        Check Your Delivery Zone
      </button>

      {showZoneChecker && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.6)' }}
          onClick={() => setShowZoneChecker(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="zone-checker-title"
            className="w-full max-w-md rounded-2xl p-8"
            style={{ background: '#1A2540', border: '1px solid rgba(107,155,247,0.2)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <h2
                id="zone-checker-title"
                className="font-heading text-xl font-bold text-white"
              >
                Check Your Delivery Zone
              </h2>
              <button
                type="button"
                onClick={() => setShowZoneChecker(false)}
                aria-label="Close"
                className="-mr-2 -mt-2 flex h-11 w-11 items-center justify-center rounded-md text-2xl leading-none text-gray-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A853]"
              >
                &times;
              </button>
            </div>

            <p className="mt-2 text-sm text-gray-400">
              Delivery is free within {FREE_RADIUS_MILES} miles of any major US port.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                void check();
              }}
              className="mt-6"
            >
              <label htmlFor="zip" className="block text-sm font-medium text-white">
                ZIP code
              </label>
              <div className="mt-2 flex gap-2">
                <input
                  id="zip"
                  ref={inputRef}
                  type="text"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  maxLength={5}
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value.replace(/\D/g, ''))}
                  placeholder="77001"
                  className="min-h-11 w-full rounded-md px-3 py-2 font-mono text-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A853]"
                  style={{
                    background: 'rgba(0,0,0,0.25)',
                    border: '1px solid rgba(107,155,247,0.25)',
                  }}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="min-h-11 shrink-0 rounded-md px-5 font-semibold transition-colors duration-fast hover:opacity-90 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A853] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A2540]"
                  style={{ background: '#D4A853', color: '#111111' }}
                >
                  {loading ? 'Checking…' : 'Check'}
                </button>
              </div>
            </form>

            <div aria-live="polite" className="mt-5 min-h-[3rem]">
              {error && <p className="text-sm font-medium text-[#F09189]">{error}</p>}

              {result && result.free && (
                <p className="text-sm font-semibold text-[#6FCB92]">
                  Free Delivery Zone — You are {result.miles} miles from {result.portName}.
                </p>
              )}

              {result && !result.free && (
                <div className="text-sm text-white">
                  <p className="font-semibold">
                    Estimated delivery fee: ${result.fee.toLocaleString()}
                  </p>
                  <p className="mt-1 text-gray-400">
                    Based on {result.miles} miles from {result.portName}, at $
                    {RATE_PER_MILE} per mile beyond the first {FREE_RADIUS_MILES} miles.
                  </p>
                </div>
              )}
            </div>

            <p className="mt-4 text-xs text-gray-500">
              Estimate only. Final delivery cost is confirmed on your quote.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
