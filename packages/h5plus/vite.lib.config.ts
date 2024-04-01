import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig(({ mode }) => {
  return {
    build: {
      outDir: resolve(__dirname, 'dist'),
      emptyOutDir: false,
      sourcemap: mode === 'development',
      lib: {
        entry: resolve(__dirname, 'src/lib/index.ts'),
        formats: ['es', 'cjs'],
        fileName: (format) => `lib${format === 'es' ? '.mjs' : '.cjs'}`,
      },
      rollupOptions: {
        external: [],
      },
    },
    plugins: [
      dts({
        rollupTypes: mode === 'production',
        copyDtsFiles: false,
        // tsConfigFilePath: resolve(__dirname, 'tsconfig.lib.json'),
        beforeWriteFile: (filePath, content) => {
          return { filePath, content }
        },
      }),
    ],
  }
})
