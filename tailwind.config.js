/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./resources/js/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [],
};

module.exports = {

    plugins: [
        require('flowbite/plugin')
    ]

}

module.exports = {
    darkMode: 'class',
    // ...
  }