/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#000000', // Pure black or very dark zinc
          2: '#09090b',      // Zinc 950
          3: '#18181b',      // Zinc 900
        },
        panel: {
          DEFAULT: '#09090b', 
          2: '#18181b',      
        },
        border: {
          DEFAULT: 'rgba(255, 255, 255, 0.05)',
          2: 'rgba(255, 255, 255, 0.1)',
        },
        accent: {
          DEFAULT: '#3b82f6', // Bright Blue
          2: '#6366f1',      // Indigo
          3: '#8b5cf6',      // Violet
          gold: '#fbbf24',
          green: '#10b981',
          red: '#ef4444',
          blue: '#3b82f6',
          yellow: '#f59e0b',
        },
        nld: {
          text: '#f8fafc',   // Slate 50
          muted: '#94a3b8',  // Slate 400
          muted2: '#cbd5e1', // Slate 300
        }
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        premium: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        'premium-glow': '0 0 30px rgba(59, 130, 246, 0.15)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        fadeUp: 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        slowPulse: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-20px)' } },
        fadeUp: { from: { opacity: '0', transform: 'translateY(30px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
}
