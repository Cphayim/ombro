module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: true,
        },
      },
    ],
  ],
  plugins: [
    ['@babel/plugin-proposal-decorators', { version: '2018-09', decoratorsBeforeExport: true }],
    ['@babel/plugin-proposal-pipeline-operator', { proposal: 'hack', topicToken: '%' }],
  ],
  sourceMaps: 'inline',
  retainLines: true,
}
