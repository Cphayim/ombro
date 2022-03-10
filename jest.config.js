/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  projects: [
    tsProject({ displayName: '@ombro/logger', rootDir: 'packages/logger' }),
    tsProject({ displayName: '@ombro/node', rootDir: 'packages/node' }),
  ],
}

function tsProject({ displayName, rootDir }, others = {}) {
  return {
    displayName,
    rootDir,
    transform: {
      '^.+\\.tsx?$': ['@swc/jest'],
    },
    testMatch: ['<rootDir>/**/*.(test|spec).ts'],
    ...others,
  }
}
