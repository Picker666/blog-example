import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    // alias: {
    //   '/@': resolve(__dirname, 'src'),
    // },
    alias: [{ find: '/@', replacement: resolve(__dirname, 'src') }],
  },
  css: {
    // css预处理器
    preprocessorOptions: {
      less: {
        charset: false,
      },
    },
  },
  plugins: [react()],
});
