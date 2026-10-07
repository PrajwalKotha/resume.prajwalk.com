/** @type {import('tailwindcss').Config} */
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  // src/3d has its own stylesheet; scanning it would add stray utilities to the resume
  content: ['./index.html', './src/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ground: token('ground'),
        surface: token('surface'),
        line: token('line'),
        ink: token('ink'),
        muted: token('muted'),
        accent: token('accent'),
        'accent-strong': token('accent-strong'),
        live: token('live'),
        award: token('award'),
      },
      minHeight: { 11: '2.75rem' },
    },
  },
  plugins: [],
};
