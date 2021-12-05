module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        screens: {
            'xs': '468px',

            'sm': '640px',
            // => @media (min-width: 640px) { ... }

            'md': '768px',
            // => @media (min-width: 768px) { ... }

            'xmd': '867px',
            'semi-md': '960px',

            'lg': '1094px',
            // => @media (min-width: 1024px) { ... }
            'semi-lg': '1200px',

            'xl': '1280px',
            // => @media (min-width: 1280px) { ... }

            '2xl': '1536px',
            '3xl': '1600px',
            // => @media (min-width: 1536px) { ... }
        },
        corePlugins: {
            preflight: false,
        },
        extend: {
            colors: {
                primary: {
                    light: '#f2e1e2',
                    normal: '#e8bec0',
                    DEFAULT: '#e02329',
                    dark: '#ed5e21'
                },
                secondary: {
                    light: '#e0fcff',
                    normal: '#c7faff',
                    DEFAULT: '#2ae3f7',
                    dark: '#0bc9db'
                },
                success: {
                    DEFAULT: "#2CB851"
                },
                wrong: {
                    DEFAULT: "#CC0808"
                },
                dark: {
                    gray: "#707070",
                    light: "#292929",
                    DEFAULT: "#1C1C1C"
                }
            }
        }
    },
    variants: {
        extend: {
            inset: ['hover', 'focus'],
            textColor: ['nextOnChecked'],
            backgroundColor: ['nextOnChecked'],
            borderColor: ['nextOnChecked']
        },
    },
    plugins: [
        require('@tailwindcss/line-clamp'),
        require('tailwind-scrollbar'),
        require('./tailwind/clip-path.tailwind'),
        require('./tailwind/height.tailwind'),
        require('./tailwind/width.tailwind'),
        require('./tailwind/z-index.tailwind'),
        require('./tailwind/complex-variants.tailwind')
    ],
}