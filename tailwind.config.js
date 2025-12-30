/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#00C853",
                "primary-hover": "#00E676",
                "dark-green": "#1B5E20",
                "bg-color": "#F8FFF9",
            },
            fontFamily: {
                main: ['Outfit', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
