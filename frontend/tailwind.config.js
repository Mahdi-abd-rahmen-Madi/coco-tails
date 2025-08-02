/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Classic, elegant color palette
        primary: {
          50: '#f9f5f0',
          100: '#f1e8d9',
          200: '#e3d1b3',
          300: '#d4b98d',
          400: '#c6a167',
          500: '#b88a41', // Warm brown
          600: '#936e34',
          700: '#6e5227',
          800: '#4a371a',
          900: '#251b0d',
        },
        secondary: {
          50: '#f5f3f0',
          100: '#eae7e1',
          200: '#d5cec3',
          300: '#c0b6a5',
          400: '#ab9d87',
          500: '#968569', // Muted gold
          600: '#786a54',
          700: '#5a503f',
          800: '#3c352a',
          900: '#1e1b15',
        },
        accent: {
          50: '#f0f4f5',
          100: '#d1dfe3',
          200: '#b3c9d1',
          300: '#94b4bf',
          400: '#759ead',
          500: '#5c8a99', // Muted teal
          600: '#496e7a',
          700: '#36535c',
          800: '#24373d',
          900: '#121c1f',
        },
        // Wellness brand colors
        wellness: {
          charcoal: '#333333',
          sage: '#8A9B6E',
          mint: '#A8D5BA',
          cream: '#F5F5F0',
          gold: {
            100: '#F5E7D6',
            200: '#EAD0AD',
            300: '#E0B883',
            400: '#D5A15A',
            500: '#C08A3D',
            600: '#9A6E31',
            700: '#735225',
            800: '#4D3718',
            900: '#261B0C',
            DEFAULT: '#C0A080',
          },
        },
        neutral: {
          50: '#f8f8f8',
          100: '#f0f0f0',
          200: '#e0e0e0',
          300: '#c6c6c6',
          400: '#a8a8a8',
          500: '#8d8d8d',
          600: '#6f6f6f',
          700: '#525252',
          800: '#393939',
          900: '#1d1d1d',
        },
        // Additional colors
        charcoal: '#374151',
        // Status colors
        success: {
          100: '#f0fdf4',
          500: '#10b981',
          900: '#064e3b',
        },
        warning: {
          100: '#fffbeb',
          500: '#f59e0b',
          900: '#78350f',
        },
        error: {
          100: '#fef2f2',
          500: '#ef4444',
          900: '#7f1d1d',
        },
        info: {
          100: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'serif': ['Playfair Display', 'serif'],
        'display': ['Montserrat', 'sans-serif']
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'liquid': 'liquid 8s ease-in-out infinite',
        'particle': 'particle 12s linear infinite',
        'gradient': 'gradient 15s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        liquid: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70%/60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40%/50% 60% 30% 60%' }
        },
        particle: {
          '0%': { transform: 'translateX(-100vw) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateX(100vw) rotate(360deg)', opacity: '0' }
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        }
      },
      backgroundSize: {
        '300%': '300% 300%'
      }
    },
  },
  plugins: [],
}
