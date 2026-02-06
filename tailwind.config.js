/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                'instrument-serif': ['"Instrument Serif"', 'serif'],
                'manrope': ['Manrope', 'sans-serif'],
                'cabin': ['Cabin', 'sans-serif'],
                'inter': ['Inter', 'sans-serif'],
                'inter-tight': ['"Inter Tight"', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
