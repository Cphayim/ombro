/**
 * Shared stylelint config for CSS/SCSS
 */
module.exports = {
  plugins: ['stylelint-prettier'],
  extends: [
    // standard css rule set
    'stylelint-config-standard',
    // standard scss rule set
    'stylelint-config-standard-scss',
    // style properties order
    'stylelint-config-recess-order',
    // prettier
    'stylelint-config-prettier',
    'stylelint-prettier/recommended',
  ],
  rules: {
    // enable Prettier auto format
    'prettier/prettier': true,
  },
}
