import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => {
  return {
    build: {
      outDir: resolve(__dirname, 'dist'),
      emptyOutDir: false,
      sourcemap: mode === 'development',
      lib: {
        entry: resolve(__dirname, 'src/cli/index.ts'),
        formats: ['es'],
        fileName: (format) => `cli${format === 'es' ? '.mjs' : '.cjs'}`,
      },
      rollupOptions: {
        output: {
          banner: '#!/usr/bin/env node',
        },
        external: [
          // node
          'path',
          'url',
          // third-party
          'compressing',
          'consola',
          'fs-extra',
          'inquirer',
          'jsonc',
          'pkg-dir',
        ],
      },
    },
  }
})
