/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#050508',
          2: '#0a0a10',
          3: '#0f0f18',
        },
        panel: {
          DEFAULT: '#12121e',
          2: '#181a26',
        },
        border: {
          DEFAULT: '#1e1e32',
          2: '#2a2d45',
        },
        accent: {
          DEFAULT: '#00f0ff',
          2: '#ff3c00',
          3: '#7000ff',
          gold: '#ffd700',
          green: '#4fffb0',
          red: '#ff4d6d',
          blue: '#4d9fff',
          yellow: '#ffd60a',
        },
        nld: {
          text: '#e0e0f0',
          muted: '#6060a0',
          muted2: '#7a80a8',
        }
      },
      fontFamily: {
        orbitron: ['Orbitron', 'monospace'],
        rajdhani: ['Rajdhani', 'sans-serif'],
        mono: ['"Share Tech Mono"', 'monospace'],
        syne: ['Syne', 'sans-serif'],
        jetbrains: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 20px rgba(0,240,255,0.3)',
        'glow-2': '0 0 20px rgba(255,60,0,0.3)',
        'glow-green': '0 0 16px rgba(79,255,176,0.25)',
      },
      animation: {
        ticker: 'ticker 22s linear infinite',
        gridPulse: 'gridPulse 4s ease-in-out infinite',
        float: 'float 3s ease-in-out infinite',
        fadeUp: 'fadeUp 0.6s ease forwards',
        pulse: 'pulse 2s ease-in-out infinite',
      },
      keyframes: {
        ticker: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        gridPulse: { '0%,100%': { opacity: '0.5' }, '50%': { opacity: '1' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        fadeUp: { from: { opacity: '0', transform: 'translateY(20px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
      },
      clipPath: {
        hex: 'polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)',
        'hex-sm': 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
        'hex-xs': 'polygon(5px 0%, 100% 0%, calc(100% - 5px) 100%, 0% 100%)',
      },
    },
  },
  plugins: [],
}
