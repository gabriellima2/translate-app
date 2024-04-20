/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/ui/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: 'OpenSans_600SemiBold',
        subtitle: 'OpenSans_500Medium',
				body: 'OpenSans_400Regular',
      }
    },
  },
  plugins: [],
}
