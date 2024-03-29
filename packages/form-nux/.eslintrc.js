module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:react/recommended', 'standard'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    semi: 'off',
    'react/prop-types': ['error', { skipUndeclared: true }],
    'no-debugger': 'off',
    ' no-unused-vars': 'off'
  }
}
