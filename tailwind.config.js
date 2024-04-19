/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/ui/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: '',
        subtitle: '',
				body: '',
				thin: '',
        bold: ''
      }
    },
  },
  plugins: [],
}
