import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/app/(frontend)/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'reup-deep': '#0A1F33',
        'reup-marine': '#0E3A5F',
        'reup-spark': '#39E5C7',
        'reup-mist': '#E8EEF2',
        'reup-sand': '#F6F2EA',
        'reup-graphite': '#2A2F36',
        'reup-alert': '#F25C5C',
        'reup-warning': '#F5B74A',
        'reup-ok': '#4CCFA6',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Outfit', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'IBM Plex Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config
