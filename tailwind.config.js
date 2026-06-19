/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        game: ["'OwnglyphParkDaHyun'", 'sans-serif'],
      },
      colors: {
        cream: '#FFF8F0',
        'cream-dark': '#F5EDE0',
        'btn-yellow': '#F5C542',
        'btn-yellow-hover': '#E8B635',
        'text-brown': '#5D4E37',
        'text-brown-light': '#8B7355',
        'border-brown': '#8B7355',
        'input-gold': '#E8A838',
        'heart-red': '#E74C3C',
        sb: {
          primary: '#F5C542',
          'primary-dark': '#E8A838',
          'primary-mid': '#F5C542',
          'primary-light': '#FFD54F',
          'primary-pale': '#FFF8E1',
          'primary-paler': '#FFFDE7',

          orange: '#FF7043',
          'orange-dark': '#F4511E',
          'orange-pale': '#FBE9E7',
          yellow: '#FFCA28',

          correct: '#43A047',
          'correct-dark': '#2E7D32',
          'correct-pale': '#E8F5E9',

          wrong: '#E53935',
          'wrong-dark': '#C62828',
          'wrong-pale': '#FFEBEE',
          'wrong-light': '#EF9A9A',

          bg: '#FFF8F0',
          surface: '#FFFFFF',
          'surface-alt': '#FDF9F3',

          ink: '#5D4E37',
          'ink-mid': '#776757',
          muted: '#A1887F',
          'muted-soft': '#BCAAA4',
          'muted-softer': '#D7CCC8',
          line: '#EFEBE9',
          'line-soft': '#F5F5F5',
        }
      },
      animation: {
        'pop-in': 'popIn 0.2s ease-out',
        'shake': 'shake 0.3s ease-in-out',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-glow': 'pulseGlow 1s ease-in-out infinite',
        'sparkle': 'sparkle 0.4s ease-out forwards',
        'bounce-in': 'bounceIn 0.5s ease-out',
      },
      keyframes: {
        popIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-4px)' },
          '75%': { transform: 'translateX(4px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { textShadow: '0 0 5px rgba(232, 168, 56, 0.5)' },
          '50%': { textShadow: '0 0 20px rgba(232, 168, 56, 0.8), 0 0 30px rgba(232, 168, 56, 0.4)' },
        },
        sparkle: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.3)', opacity: '0.7' },
          '100%': { transform: 'scale(0)', opacity: '0' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
