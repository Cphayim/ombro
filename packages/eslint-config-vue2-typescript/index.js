module.exports = {
  extends: ['plugin:vue/essential', 'plugin:@typescript-eslint/recommended', 'prettier'],
  plugins: ['@typescript-eslint'],
  // The difference between the two parsers is that the outside parser is used to parse the .vue file,
  // allowing eslint to parse the contents of the <template> tag.
  // and the parser in parserOptions, @typescript-eslint/parser is used to parse the code
  // in the <script> tag in the .vue file
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    extraFileExtensions: ['.vue'],
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    node: true,
    es2022: true,
  },
}
