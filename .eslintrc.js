module.exports = {
  root: true,
  parser: '@typescript-eslint/parser', // 定义ESLint的解析器,使之能识别ts
  // 定义文件继承的子规范。prettier的ts样式规范。
  // 第二个继承是，如果ESLint会检测prettier的格式问题，同样将格式问题以error的形式抛出
  extends: [
    // 使用@typescript-eslint/eslint-plugin的推荐规则
    'plugin:@typescript-eslint/recommended',
    'airbnb',
    // 使用eslint-config-prettier来禁用@typescript-eslint/eslint-plugin中与prettier冲突的ESLint规则
    'prettier',
    // 启用eslint-plugin-prettier和eslint-config-prettier。
    // 这会将prettier错误作为ESLint错误来展示。确保这个配置放到数组的最后。
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2022,
    ecmaFeatures: {
      jsx: true // 允许解析JSX
    }
  },
  env: {
    // 指定代码的运行环境
    browser: true,
    node: true
  },
  settings: {
    'import/parsers': {
      // 使用 TypeScript parser
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    'import/resolver': {
      // use a glob pattern
      typescript: {
        directory: './packages/*/tsconfig.json'
      }
    }
  },
  rules: {
    'no-console': 1,
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'no-unused-vars': 0,
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx', 'ts', 'tsx'] }
    ],
    'no-debugger': 1,
    'jsx-a11y/no-noninteractive-element-interactions': 0, // 关闭强制要求非交互语义标签(main,hX,ul,ol,liarea)不包含交互事件(onClick等)
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0, // 关闭强制一个可单击的非交互元素至少有一个键盘事件监听器。
    'import/extensions': 0,
    'import/no-mutable-exports': 0,
    'import/prefer-default-export': 0
  }
}
