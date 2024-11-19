/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#3A6EF2",
                    dark: "#234394",
                },
                secondary: {
                    DEFAULT: "#05071A",
                    light: "#101636",
                },
                white: {
                    DEFAULT: "#ffffff",
                    light: "#9EA3BF",
                    lighter: "#9EA3BF40",
                },
                success: {
                    DEFAULT: "#22c55e",
                    dark: "#15803d",
                },
                error: {
                    DEFAULT: "#ef4444",
                    dark: "#b91c1c",
                },
            },
        },
    },
    plugins: [],
};
