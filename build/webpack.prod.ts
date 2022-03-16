import webpackMerge from 'webpack-merge'
import baseConfig from './webpack.base'

export default webpackMerge(baseConfig, {
  externals: {
    react: 'React', // key是模块中引入的包的名称，value是最终cdn导出后暴露在全局的变量。
    'react-dom': 'ReactDOM'
  },
  mode: 'development'
  // devtool: 'hidden-source-map' // 最适合生产环境的source-map
})
