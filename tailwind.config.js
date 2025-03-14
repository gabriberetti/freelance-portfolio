/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#141414',
        'secondary': '#ffffff',
        'accent': '#f0f0f0',
        'muted': '#999999',
        'hover': '#e0e0e0',
      },
      fontFamily: {
        sans: ['SuisseIntl', 'var(--font-inter)', 'sans-serif'],
        suisse: ['SuisseIntl', 'sans-serif'],
      },
      fontWeight: {
        light: 300,
        regular: 400,
        bold: 700,
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out forwards',
        'slide-up': 'slideUp 0.5s ease-in-out forwards',
        'loader': 'loader 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        loader: {
          '0%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      fontSize: {
        'huge': 'clamp(3rem, 8vw, 8rem)',
      },
      spacing: {
        'section': 'clamp(6rem, 15vh, 10rem)',
      },
      letterSpacing: {
        'tighter': '-0.05em',
        'tight': '-0.025em',
      },
    },
  },
  plugins: [],
} 