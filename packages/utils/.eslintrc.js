module.exports = {
  //    parser: '@typescript-eslint/parser', // TS解析器
  env: {
    browser: true,
    es2020: true,
    node: true,
    jest: true,
  },
  globals: {
    ga: true,
    chrome: true,
    __DEV__: true,
  }, // 全局变量s
  parser: 'vue-eslint-parser', //vue

  parserOptions: {
    files: 'src/*.*', //制定eslint文件范围
    // 解析es6版本
    ecmaVersion: 6, //es6语法
    sourceType: 'module', // es6模块支持
    ecmaFeatures: {
      jsx: true, //jsx
    },
    parser: '@typescript-eslint/parser', // 解析vue文件里面Ts解析器
  },
  extends: ['eslint:recommended'], //eslint推荐配置
  plugins: ['prettier'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': 'off',
    'prettier/prettier': 'error',
    semi: 'off',
  },
}
