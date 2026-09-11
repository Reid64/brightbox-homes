import type { Config } from 'tailwindcss';

// All tokens mirror DESIGN_LANGUAGE.md Sections 2, 3, 5. CSS custom properties
// holding the same values live in app/globals.css; this config exposes them as
// Tailwind utility classes (bg-bb-blue, text-bb-navy, rounded-md, shadow-lg, etc).
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bb: {
          // Brand colors (DESIGN_LANGUAGE 2.1). DEFAULT enables bg-bb-blue,
          // light/dark enable bg-bb-blue-light / bg-bb-blue-dark.
          blue: {
            DEFAULT: '#4A9BD9',
            light: '#E8F2FB',
            dark: '#2E6FA3',
          },
          navy: '#1B2D4F',
          // Amber gold accent (redesign). Used on charcoal surfaces; on cream
          // surfaces emphasis is charcoal, since gold lacks contrast on light.
          gold: {
            DEFAULT: '#D4A853',
            press: '#C1953C',
          },
          // The one blue kept: hyperlinks, so a link still reads as a link.
          link: '#3461C7',
          // Neutral palette (DESIGN_LANGUAGE 2.2).
          white: '#FFFFFF',
          'warm-white': '#FAFAF7',
          // Warm cream section surface (redesign), alternates with charcoal.
          cream: {
            DEFAULT: '#F5F0E8',
            line: '#E4DCCD',
          },
          // Dark premium surfaces (DESIGN_LANGUAGE 2.2).
          charcoal: '#1C1C1E',
          // Charcoal lifted by 4% white - cards and panels on a charcoal band.
          surface: '#252527',
          gray: {
            100: '#F3F4F6',
            200: '#E5E7EB',
            400: '#9CA3AF',
            600: '#4B5563',
            900: '#111827',
          },
          // Semantic colors (DESIGN_LANGUAGE 2.3).
          success: '#16A34A',
          warning: '#D97706',
          error: '#DC2626',
        },
        // Admin dashboard palette (DESIGN_LANGUAGE 2.4, Phase 1B).
        admin: {
          bg: '#0F172A',
          surface: '#1E293B',
          border: '#334155',
          text: '#E2E8F0',
          accent: '#4A9BD9',
        },
      },
      fontFamily: {
        // var(--font-*) are set by next/font in app/layout.tsx.
        heading: ['var(--font-heading)', 'system-ui', '-apple-system', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      // Type scale (DESIGN_LANGUAGE 3.2). Merges with Tailwind defaults, adding
      // text-hero / text-h1..h4 / text-body with their locked line-heights.
      fontSize: {
        hero: ['3.5rem', { lineHeight: '1.1' }],
        h1: ['2.5rem', { lineHeight: '1.2' }],
        h2: ['1.875rem', { lineHeight: '1.25' }],
        h3: ['1.5rem', { lineHeight: '1.3' }],
        h4: ['1.25rem', { lineHeight: '1.35' }],
        body: ['1rem', { lineHeight: '1.6' }],
      },
      borderRadius: {
        sm: '6px',
        md: '10px',
        lg: '16px',
      },
      boxShadow: {
        sm: '0 1px 3px rgba(0,0,0,0.08)',
        md: '0 4px 12px rgba(0,0,0,0.1)',
        lg: '0 12px 32px rgba(0,0,0,0.12)',
        inner: 'inset 0 2px 4px rgba(0,0,0,0.05)',
      },
      // Motion tokens (DESIGN_LANGUAGE 6.1, 6.2). Enables duration-fast/normal/slow/hero
      // and ease-out/ease-in-out/ease-spring utilities without arbitrary values.
      transitionDuration: {
        fast: '150ms',
        normal: '300ms',
        slow: '500ms',
        hero: '800ms',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out': 'cubic-bezier(0.65, 0, 0.35, 1)',
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      keyframes: {
        // Gentle floating loop for the hero video PiP.
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        // Hero 3-beat entrance (run on mount via CSS, fill-mode both).
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        // FAQ hero "route": a dashed path threading the five category stops.
        // One full period is dasharray 6+6=12, so -24 loops seamlessly.
        routeDraw: {
          '0%': { strokeDashoffset: '0' },
          '100%': { strokeDashoffset: '-24' },
        },
        // FAQ hero book spines: staggered rise as the shelf settles.
        bookRise: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        // FAQ hero "sign": the headline block lands like a hung shop sign -
        // scales up out of a blur, overshoots once, settles.
        signIn: {
          '0%': { opacity: '0', transform: 'scale(0.86) translateY(24px)', filter: 'blur(10px)' },
          '60%': { opacity: '1', transform: 'scale(1.03) translateY(-4px)', filter: 'blur(0)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)', filter: 'blur(0)' },
        },
        // FAQ hero route: a single stroke drawn end to end. The path carries
        // pathLength="1", so dasharray/offset are in path-fraction units and
        // the same keyframe works for any path geometry.
        routeTrace: {
          '0%': { strokeDashoffset: '1' },
          '100%': { strokeDashoffset: '0' },
        },
        // Colour/width pulse that runs on the route once it is drawn.
        routePulse: {
          '0%, 100%': { opacity: '0.35', filter: 'drop-shadow(0 0 2px rgba(212,168,83,0.4))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 10px rgba(212,168,83,0.95))' },
        },
        // A short dash of the route travelling it end to end - reads as a
        // spark running the line. Same pathLength="1" unit trick as routeTrace.
        routeSpark: {
          '0%': { strokeDashoffset: '1', opacity: '0' },
          '12%, 88%': { opacity: '1' },
          '100%': { strokeDashoffset: '0', opacity: '0' },
        },
        // FAQ hero stop markers: pop in behind their book.
        nodePop: {
          '0%': { opacity: '0', transform: 'scale(0)' },
          '70%': { opacity: '1', transform: 'scale(1.35)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        // FAQ hero books: swing in off the shelf edge, overshoot, settle.
        bookSwing: {
          '0%': { opacity: '0', transform: 'translateY(56px) rotate(-12deg) scale(0.8)' },
          '55%': { opacity: '1', transform: 'translateY(-10px) rotate(4deg) scale(1.04)' },
          '78%': { transform: 'translateY(3px) rotate(-1.5deg) scale(0.99)' },
          '100%': { opacity: '1', transform: 'translateY(0) rotate(0) scale(1)' },
        },
        // Slow ambient drift for the hero dust motes.
        drift: {
          '0%, 100%': { transform: 'translate3d(0,0,0)', opacity: '0.25' },
          '50%': { transform: 'translate3d(12px,-26px,0)', opacity: '0.8' },
        },
        // Breathing halo behind the search field.
        haloPulse: {
          '0%, 100%': { opacity: '0.25', transform: 'scale(0.96)' },
          '50%': { opacity: '0.55', transform: 'scale(1.04)' },
        },
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        marquee: 'marquee var(--marquee-duration, 30s) linear infinite',
        'fade-in': 'fadeIn 600ms cubic-bezier(0.16,1,0.3,1) both',
        'fade-up': 'fadeUp 700ms cubic-bezier(0.16,1,0.3,1) both',
        'slide-in-right': 'slideInRight 700ms cubic-bezier(0.16,1,0.3,1) both',
        'route-draw': 'routeDraw 1.6s linear infinite',
        'book-rise': 'bookRise 700ms cubic-bezier(0.16,1,0.3,1) both',
        'sign-in': 'signIn 900ms cubic-bezier(0.34,1.56,0.64,1) both',
        'route-trace': 'routeTrace 1400ms cubic-bezier(0.65,0,0.35,1) both',
        'route-pulse': 'routePulse 2.6s ease-in-out infinite',
        'route-spark': 'routeSpark 2.8s cubic-bezier(0.45,0,0.55,1) infinite',
        'node-pop': 'nodePop 520ms cubic-bezier(0.34,1.56,0.64,1) both',
        'book-swing': 'bookSwing 1100ms cubic-bezier(0.34,1.42,0.5,1) both',
        drift: 'drift var(--drift-duration, 12s) ease-in-out infinite',
        'halo-pulse': 'haloPulse 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
