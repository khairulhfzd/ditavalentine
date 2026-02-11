/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      colors: {
        blush: {
          50: '#fff5f7',
          100: '#ffe4ea',
          200: '#ffccd7',
          300: '#ffa1b8',
          400: '#ff6f95',
          500: '#ff3b73',
          600: '#e1245f',
          700: '#b2164a',
          800: '#7b0f33',
          900: '#47081d',
        },
        ink: {
          900: '#05030a',
          800: '#0b0714',
          700: '#120b1f',
        },
      },
      backgroundImage: {
        'valentine-gradient':
          'radial-gradient(circle at top, rgba(255,182,193,0.35), transparent 55%), radial-gradient(circle at bottom, rgba(255,105,180,0.35), transparent 55%), linear-gradient(to bottom, #05030a, #120b1f)',
      },
    },
  },
  plugins: [],
}

