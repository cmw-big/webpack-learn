module.exports = {
  presets: [
    '@babel/react',
    [
      '@babel/preset-env',
      {
        targets: {
          edge: '17',
          firefox: '60',
          chrome: '67',
          safari: '11.1'
        },
        // Babel 将检查你的所有代码，以便查找目标环境中缺失的功能，然后只把必须的 polyfill 包含进来。
        useBuiltIns: 'usage',
        corejs: '3.21',
        debug: true,
        shippedProposals: true // 将代码中提案的也进行转化
      }
    ]
  ],
  plugins: [
    'react-require',
    // 将一些babel生成的helper方法，弄成公共的，而不是每一个地方都引用一次帮助方法。
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: {
          version: 3,
          proposals: true // 将提案的也进行垫片
        }
      }
    ]
  ]
}
