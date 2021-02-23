module.exports = {
  ignorePatterns: ['example/**/*'],
  extends: './node_modules/kcd-scripts/eslint.js',
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
  env: {
    'jest/globals': true,
  },
}
