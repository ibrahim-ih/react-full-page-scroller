import autoprefixer from 'autoprefixer'
import browserslistToEsbuild from 'browserslist-to-esbuild'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    dedupe: ['react', 'react-dom']
  },
  css: {
    postcss: {
      plugins: [autoprefixer()]
    }
  },
  build: {
    outDir: 'build',
    target: browserslistToEsbuild()
  }
})
