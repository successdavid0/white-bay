import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        ocean: {
          50: '#e6f4fa',
          100: '#b3dff0',
          200: '#80cbe6',
          300: '#4db6dc',
          400: '#26a6d4',
          500: '#0A72B5', // Primary Ocean Blue
          600: '#085d94',
          700: '#064873',
          800: '#043352',
          900: '#021e31',
        },
        sand: {
          50: '#FDFDF9',
          100: '#F8F8F0', // White Sand
          200: '#F0F0E4',
          300: '#E8E8D8',
          400: '#D8D8C4',
          500: '#C8C8B0',
        },
        navy: {
          50: '#e6ebed',
          100: '#b3c2c9',
          200: '#8099a5',
          300: '#4d7081',
          400: '#264d61',
          500: '#052A3C', // Deep Navy
          600: '#042230',
          700: '#031a24',
          800: '#021118',
          900: '#01090c',
        },
        gold: {
          50: '#faf6ed',
          100: '#f0e5c8',
          200: '#e6d4a3',
          300: '#dcc37e',
          400: '#D4A859', // Warm Gold
          500: '#c99534',
          600: '#a57a2b',
          700: '#815f21',
          800: '#5d4418',
          900: '#39290f',
        },
        teal: {
          50: '#e8f9f7',
          100: '#b8ede8',
          200: '#88e1d9',
          300: '#58d5ca',
          400: '#17C3B2', // Teal Aqua
          500: '#14a99a',
          600: '#108f82',
          700: '#0c756a',
          800: '#085b52',
          900: '#04413a',
        },
      },
      fontFamily: {
        heading: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        accent: ['Poppins', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.8s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.8s ease-out forwards',
        'slide-in-right': 'slideInRight 0.8s ease-out forwards',
        'scale-in': 'scaleIn 0.6s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-ocean': 'linear-gradient(135deg, #0A72B5 0%, #052A3C 100%)',
        'gradient-gold': 'linear-gradient(135deg, #D4A859 0%, #c99534 100%)',
        'gradient-sand': 'linear-gradient(180deg, #F8F8F0 0%, #F0F0E4 100%)',
      },
    },
  },
  plugins: [],
};

export default config;

