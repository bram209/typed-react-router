import typescript from '@rollup/plugin-typescript'
import * as path from 'path'
import { typescriptPaths } from 'rollup-plugin-typescript-paths'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],
  resolve: {
    alias: [
      {
        find: '~',
        replacement: path.resolve(__dirname, './src'),
      },
    ],
  },
  // https://vitejs.dev/guide/build.html#library-mode
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.ts'),
      fileName: 'main',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react-router-dom', 'react-router'],
      plugins: [
        typescriptPaths({
          preserveExtensions: true,
        }),
        typescript({
          sourceMap: false,
          declaration: true,
          outDir: 'dist',
          exclude: ['**/__tests__'],
        }),
        visualizer(),
      ],
    },
  },
})
