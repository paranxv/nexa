/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        container: {
            center: true,
            padding: "1rem",
            screens: {
                sm: "640px",
                md: "768px",
                lg: "1024px",
                xl: "1280px",
            },
        },
        extend: {
            colors: {
                primary: "#1a237e", // Navy
                secondary: "#77BC1F", // Green
                "secondary-hover": "#66a31a", // Darker Green
                "dark-gray": "#1a1a1a",
                "light-gray": "#f5f5f5",
                "text-light": "#ffffff",
            },
            fontFamily: {
                sans: ['Montserrat', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
