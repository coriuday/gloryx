/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                'gx-black': '#0a0a0a',
                'gx-dark': '#161616',
                'gx-green': '#79c043',
                'gx-orange': '#f58220',
                'gx-blue': '#0f2b5c',
                'gx-gray': '#2a2a2a',
                'rockstar-black': '#000000',
                'rockstar-yellow': '#fdb927',
            },
            fontFamily: {
                sans: ['var(--font-roboto)', 'Roboto', 'sans-serif'],
                display: ['var(--font-oswald)', 'Oswald', 'sans-serif'],
            },
            backgroundImage: {
                'grid-pattern': "linear-gradient(to right, #2a2a2a 1px, transparent 1px), linear-gradient(to bottom, #2a2a2a 1px, transparent 1px)",
            },
            animation: {
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
        },
    },
    plugins: [],
};
