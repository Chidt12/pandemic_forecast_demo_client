const plugin = require('tailwindcss/plugin')

module.exports = plugin(function ({ addUtilities }) {
    let newUtilities = {};

    for (let i = 10; i <= 100; i = i + 1) {
        newUtilities[`.w-screen-${i}`] = {
            width: `${i}vw`
        };
    }

    for (let i = 10; i <= 100; i = i + 1) {
        newUtilities[`.max-w-screen-${i}`] = {
            maxWidth: `${i}vw`
        };
    }

    for (let i = 10; i <= 100; i = i + 1) {
        newUtilities[`.min-w-screen-${i}`] = {
            minWidth: `${i}vw`
        };
    }

    for (let i = 10; i <= 200; i = i + 5) {
        newUtilities[`.max-w-${i}`] = {
            maxWidth: `${i}px`
        };
    }


    addUtilities(newUtilities, {
        variants: ['responsive', 'hover'],
    })
});