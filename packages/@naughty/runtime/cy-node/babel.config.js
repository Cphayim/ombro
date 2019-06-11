module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: true
        }
      }
    ]
  ],
  plugins: ['@babel/plugin-proposal-optional-chaining'],
  sourceMaps: 'inline',
  retainLines: true
}
