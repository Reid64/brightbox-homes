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
          // Neutral palette (DESIGN_LANGUAGE 2.2).
          white: '#FFFFFF',
          'warm-white': '#FAFAF7',
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
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
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
    },
  },
  plugins: [],
};

export default config;
