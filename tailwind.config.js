/** @type {import("tailwindcss").Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    extend: {
        screens: {
            print: { raw: "print" },
            screen: { raw: "screen" },
        }
    }
};
