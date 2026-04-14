import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-space-grotesk)', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'sans-serif'],
      },
      colors: {
        brand: {
          dark: '#1E3A8A',
          DEFAULT: '#2563EB',
        },
      },
    },
  },
  plugins: [],
}

export default config