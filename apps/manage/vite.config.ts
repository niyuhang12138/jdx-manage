import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueDevTools from 'vite-plugin-vue-devtools';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueJsx(),
        vueDevTools(),
        Components({
            resolvers: [AntDesignVueResolver({ importStyle: false })],
        }),
    ],
    resolve: {
        alias: {
            '@manage': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    css: {},
    server: {
        host: '0.0.0.0',
        proxy: {
            '/dev-api': {
                // target: 'http://192.168.0.20:8082',
                target: 'http://127.0.0.1:8082',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/dev-api/, ''),
            },
        },
    },
});
