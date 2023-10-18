import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import path from "path";

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/react/Main.tsx'],
      refresh: true,
    }),
    react(),
  ],
  resolve: {
    alias: {
      // @ts-ignore
      '@/': `${path.resolve(__dirname, './resources/react')}/`,
      // @ts-ignore
      '~/': `${path.resolve(__dirname, './public')}/`,
      // @ts-ignore
      "~bootstrap/": `${path.resolve(__dirname, './node_modules/bootstrap/scss')}/`,
      // @ts-ignore
      "~tailwind/": `${path.resolve(__dirname, './config/tailwind')}/`
    }
  },
});
