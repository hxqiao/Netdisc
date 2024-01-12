import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// const { resolve } = require('path')
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      eslintrc: {
        enabled: true
      },
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    // Components({
    //   // allow auto load markdown components under `./src/components/`
    //   extensions: ['vue', 'md'],
    //   // allow auto import and register components used in markdown
    //   include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
    //   resolvers: [
    //     ElementPlusResolver({
    //       importStyle: 'sass',
    //     }),
    //   ],
    //   dts: 'src/components.d.ts',
    // }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
      // '@': resolve(__dirname, './src'),
    }
  },
  // css预处理器
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/css/index.scss" as *;`
      },
    },
  },
  server: {
    port: 9527,
    proxy: {
      "/api": {
        target: "http://106.53.198.207:3000",
        changeOrigin: true, //是否跨域
        // rewrite: (path) => path.replace(/^\/mis/, ""), //因为后端接口有mis前缀，所以不需要替换
        // ws: true,                       //是否代理 websockets
        // secure: true, //是否https接口
      },
      "/eapi": {
        target: "http://121.91.168.133:3000",
        // target: "http://106.53.198.207:3000",
        changeOrigin: true, //是否跨域
        rewrite: (path) => path.replace(/^\/eapi/, "/api"), //因为后端接口有mis前缀，所以不需要替换
        // ws: true,                       //是否代理 websockets
        // secure: true, //是否https接口
      },
      // "/":  {
      //   target: "http://127.0.0.1:8080",
      //   changeOrigin: true, //是否跨域
      // }
    },
  },
})
