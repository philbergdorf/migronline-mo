import konstaConfig from 'konsta/config'

/**
 * Theme values sourced from @migrosonline/design-system (DTCG tokens).
 * Class names are kept from the prototype; each value maps to a token:
 *
 *   primary  → color.m-orange.600  (mo.sys.color.primary.main)
 *   forest   → color.m-orange.600  (action/accent, filled buttons, active states)
 *   cream    → color.m-grey.100    (mo.sys.color.background.recessed — page canvas)
 *   surface  → color.m-white.base  (mo.sys.color.surface.main)
 *   sand     → color.m-grey.200    (subtle fills, tracks, tiles)
 *   hairline → color.m-grey.300    (mo.sys.color.other.dividers)
 *   ink      → color.m-black.base  (mo.sys.color.text.main, #333333)
 *   muted    → color.m-grey.800    (strong secondary text)
 *   label    → color.m-grey.700    (mo.sys.color.text.subtle)
 *   berry    → color.m-red.800     (deep promo accents)
 *   citrus   → color.m-yellow.500  (mo.sys.color.warning — offer badges, dark text on it)
 *   tomato   → color.m-red.600     (mo.sys.color.error / promotion red)
 */
/** @type {import('tailwindcss').Config} */
export default konstaConfig({
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  // Light-only prototype; never auto-switch to dark.
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        forest: '#ff6600',
        primary: '#ff6600',
        cream: '#f0f0f0',
        surface: '#ffffff',
        sand: '#e3e3e3',
        hairline: '#d9d9d9',
        ink: '#333333',
        muted: '#595959',
        label: '#737373',
        berry: '#ae1f04',
        citrus: '#ffc233',
        tomato: '#e02905',
      },
      fontFamily: {
        display: ['"Helvetica Now Display"', '"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
        sans: ['"Helvetica Now Text"', '"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
      },
      // mo.sys.border-radius: subtle 4px · default 8px · pill full
      borderRadius: {
        chip: '9999px',
        btn: '9999px',
        card: '8px',
        sheet: '8px',
      },
      // mo.sys.elevation — ink (#333) shadows at low alpha
      boxShadow: {
        cta: '0 1px 3px rgba(51,51,51,0.10), 0 2px 8px rgba(51,51,51,0.08)',
        checkout: '0 2px 8px rgba(51,51,51,0.14)',
        soft: '0 1px 2px rgba(51,51,51,0.08)',
        chip: '0 1px 2px rgba(51,51,51,0.08)',
      },
      transitionTimingFunction: {
        // Calm standard easing (Harvest's bouncy curve retired)
        bounce: 'cubic-bezier(0.2, 0, 0, 1)',
      },
    },
  },
  plugins: [],
})
