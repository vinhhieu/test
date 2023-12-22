module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,svg}'],
  important: true,
  theme: {
    extend: {

    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
  corePlugins: {
    preflight: false,
  },
}
