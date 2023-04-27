/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./resources/js/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            backgroundImage: {
                'person-stands-hallway': "url('/resources/img/person-stands-hallway.jpg')",
            }
        },
        container: {
            center: true,
        },
    },
    plugins: [],
};
