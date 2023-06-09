import { resolve } from 'node:path'

import type { BuildOptions } from 'vite'

export const EXTERNAL_REPO_PKG = /^@ombro\/(.*)/

export type CreateOptions = {
  mode: string
  root: string
}

export const createBuild = ({ root }: CreateOptions) => {
  const build: BuildOptions = {
    outDir: resolve(root, 'dist'),
    emptyOutDir: true,
    sourcemap: true,
    lib: {
      entry: resolve(root, 'src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: (format) => `index${format === 'es' ? '.js' : '.cjs'}`,
    },
    rollupOptions: {
      external: [EXTERNAL_REPO_PKG],
    },
  }
  return build
}
