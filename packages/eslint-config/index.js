module.exports = {
  extends: ['eslint:recommended', 'prettier'],
  parserOptions: {
    sourceType: 'module',
  },
  env: {
    node: true,
    es2022: true,
  },
}
