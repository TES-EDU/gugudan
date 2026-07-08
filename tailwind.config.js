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
        // Golden Summer Fields
        cream: '#FEFAE0',
        'cream-dark': '#FAEDCD',
        'card-bg': '#E9EDC9',
        sage: '#CCD5AE',
        'sage-dark': '#AEBF88',
        bronze: '#D4A373',
        'bronze-dark': '#BC8C5A',
        'text-brown': '#5C4A1E',
        'text-mid': '#8B6E3C',
        'border-sage': '#C8C39A',
        // feedback
        'heart-red': '#E74C3C',
        sb: {
          primary: '#AEBF88',          // Sage-dark — 주 액션
          'primary-dark': '#8FA86B',    // Deeper Sage — hover/emphasis
          'primary-mid': '#CCD5AE',     // Sage — 미득튼/배지
          'primary-light': '#D8E3B8',   // Light Sage — hover 바두
          'primary-pale': '#EDF2DC',    // Pale Sage — chip 배경
          'primary-paler': '#F5F8EC',   // Paler Sage — row hover

          correct: '#43A047',
          'correct-dark': '#2E7D32',
          'correct-pale': '#E8F5E9',

          wrong: '#E53935',
          'wrong-dark': '#C62828',
          'wrong-pale': '#FFEBEE',
          'wrong-light': '#EF9A9A',

          bg: '#F5F8EE',               // 연한 Sage 백그라운드
          surface: '#FFFFFF',
          'surface-alt': '#EDF2DC',

          ink: '#3D5229',              // Deep Olive — 주제목
          'ink-mid': '#5C6E3A',
          muted: '#7A8F58',
          'muted-soft': '#9AAD74',
          'muted-softer': '#C2CFA0',
          line: '#D8E3B8',
          'line-soft': '#EDF2DC',
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
