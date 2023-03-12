// tailwind.config.js
module.exports = {
    content: [
        "./dist/**/*.{html,js,css}",
        "./views/**/*.ejs",
      ],
    theme: {},
    variants: {},
    plugins: [
        require('tailwindcss'),
        require('autoprefixer')
    ],
};