import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
    plugins: [sveltekit()],
    server: {
        port: 9009,
        strictPort: false,
    },
};

export default config;
