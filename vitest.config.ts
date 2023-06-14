import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    root: __dirname,
    environment: 'node',
    include: ['packages/**/*.{spec,test}.ts'],
    coverage: {
      include: ['packages/**/src/**/*.ts'],
      reporter: ['text', 'json'],
      statements: 90,
    },
  },
})
