/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  testEnvironment: 'node',
  projects: [
    {
      displayName: '@ombro/logger',
      rootDir: 'packages/logger',
      preset: 'ts-jest',
      testMatch: ['<rootDir>/**/*.(test|spec).ts'],
      resetMocks: true,
    },
    {
      displayName: '@ombro/node',
      rootDir: 'packages/node',
      preset: 'ts-jest',
      testMatch: ['<rootDir>/**/*.(test|spec).ts'],
    },
  ],
}
