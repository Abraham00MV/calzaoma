import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
theme: {
  extend: {
    fontFamily: {
      sans: ['var(--font-poppins)'],
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
