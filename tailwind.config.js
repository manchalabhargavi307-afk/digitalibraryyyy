/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#030817',
        card: 'rgba(7, 20, 48, 0.76)',
        card2: 'rgba(10, 31, 70, 0.72)',
        ink: '#eef6ff',
        mut: '#9fb6d8',
        cyanAccent: '#61e7ff',
        blueAccent: '#42a5ff',
        goldAccent: '#8bc8ff',
        borderLine: 'rgba(125, 190, 255, 0.20)',
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
