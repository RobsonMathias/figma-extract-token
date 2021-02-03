const { jest: jestConfig } = require('kcd-scripts/config')

module.exports = Object.assign(jestConfig, {
  transform: {
    ...jestConfig.transform,
    '\\.ts?$': 'ts-jest',
  },
  globals: {},
})
