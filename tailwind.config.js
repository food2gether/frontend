/** @type {import("tailwindcss").Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    safelist: [
        "w-[50%]",
        "w-[95%]",
        "!bg-primary",
        "!bg-red-600",
        "border-2",
        "pointer-events-none",
        "cursor-not-allowed",
        "opacity-50",
        "group-hover:-translate-y-1",
        "border-black",
        "border-red-600"
    ],
};
