const { jest: jestConfig } = require('kcd-scripts/config')

module.exports = Object.assign(jestConfig, {
  testMatch: ['**/__tests__/**/*.test.(js|jsx|ts|tsx)'],
  transform: {
    ...jestConfig.transform,
    '\\.ts?$': 'ts-jest',
  },
  globals: {},
})
