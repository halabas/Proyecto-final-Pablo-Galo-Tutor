import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Room Bold", 'sans-serif'],            },
                backgroundImage: theme => ({
                    'gradient-custom': 'linear-gradient(180deg, rgba(0, 0, 0, 0.95) 0%, rgba(118, 115, 115, 0.95) 49.5%, rgba(0, 0, 0, 0.95) 100%)',
                  }),
        },
    },

    plugins: [forms],
};
