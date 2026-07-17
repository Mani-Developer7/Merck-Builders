/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#101826',      // deep navy-charcoal — primary dark surface
        'ink-2': '#1B2536',  // lighter navy for cards on dark bg
        brass: '#B8874A',    // warm brass/gold accent
        'brass-light': '#D9B47C',
        stone: '#EDEAE2',    // warm limestone background
        'stone-2': '#E2DDCF',
        slate: '#5B6472',    // muted secondary text
        clay: '#8E5A42',     // muted clay/rust secondary accent
        ink900: '#0B111C',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      backgroundImage: {
        blueprint:
          'linear-gradient(rgba(184,135,74,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(184,135,74,0.08) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '40px 40px',
      },
    },
  },
  plugins: [],
};
