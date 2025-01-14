import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

export default defineConfig({
    build: {
        rollupOptions: {
            output: {
                entryFileNames: 'assets/[name]-[hash].js',
                chunkFileNames: 'assets/[name]-[hash].js',
                assetFileNames: 'assets/[name]-[hash].[ext]',
            },
        },
    },
    define: { 'process.env': {} },
    plugins: [
        // laravel({
        //     input: ['resources/css/app.css', 'resources/js/app.js'],
        //     refresh: true,
        // }),
        laravel({
            input: ['resources/js/app.tsx', 'resources/css/app.scss'],
            refresh: true,
        }),
        react(),
        tsconfigPaths(),
    ],
    resolve: {
        alias: {
          "@": path.resolve(__dirname, "resources/js"),
        },
      },
});
