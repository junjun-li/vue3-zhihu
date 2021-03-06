module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  // "off" 或 0 - 关闭规则
  // "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
  // "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    //关闭 ts 禁止使用忽略语法
    'ban-ts-ignore': 'off',
    // 关闭模板字符串 `${  }` 两遍禁止使用空格
    'template-curly-spacing': 'off',
    'vue/no-unused-components': 1,
    '@typescript-eslint/ban-ts-ignore': 'off',
    'vue/no-deprecated-slot-scope-attribute': 'off'
  }
}
