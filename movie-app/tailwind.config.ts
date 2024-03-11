import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'primar-01': '#531fc2',
        'blue-01': '#14077c',
        'blue-02': '#0818a6',
        'gray-01': '#0a0a0a',
        'gray-03': '#7b7d82',
        'gray-04': '#9e9ea4',
        'gray-05': '#d7d7d7',
        'gray-06': '#eeeeee',
      },
    },
  },
  plugins: [],
}
export default config
