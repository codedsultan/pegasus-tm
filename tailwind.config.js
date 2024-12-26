import defaultTheme from 'tailwindcss/defaultTheme';
import colors from 'tailwindcss/colors'
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/**/*.blade.php',
        './resources/**/*.js',
        './resources/**/*.vue',
        './resources/**/*.jsx',
        './resources/**/*.tsx',
        './resources/**/*.ts',
        './resources/**/*.scss',
    ],
    theme: {

        container: {
          center: true,
        },

        fontFamily: {
          sans: ['Figtree', 'sans-serif'],
        },

        extend: {
          colors: {
            'primary': '#3e60d5',
            'secondary': '#6c757d',
            'success': '#47ad77',
            'info': '#16a7e9',
            'warning': '#ffc35a',
            'danger': '#f15776',
            'light': '#f2f2f7',
            'dark': '#212529',

            'gray': {
              ...colors.gray,
              '800': '#313a46'
            }
          },

          keyframes: {
            load: {
              '0%': { width: '0%' },
              '100%': { width: '100%' },
            }
          },

          minWidth: theme => ({
            ...theme('width'),
          }),

          maxWidth: theme => ({
            ...theme('width'),
          }),

          minHeight: theme => ({
            ...theme('height'),
          }),

          maxHeight: theme => ({
            ...theme('height'),
          }),
        },
      },
      plugins: [
        require('@frostui/tailwindcss/plugin'),
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
        require('@tailwindcss/aspect-ratio'),
      ],

};

