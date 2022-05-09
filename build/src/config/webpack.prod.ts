import { SourceMapDevToolPlugin } from 'webpack'
import webpackMerge from 'webpack-merge'
import FileManagerWebpackPlugin from 'filemanager-webpack-plugin'
import { resolve } from 'path'
import { cwd } from 'process'
import EslintPlugin from 'eslint-webpack-plugin'
import baseConfig from './webpack.base'

export default webpackMerge(baseConfig, {
  externals: {
    react: 'React', // key是模块中引入的包的名称，value是最终cdn导出后暴露在全局的变量。
    'react-dom': 'ReactDOM'
  },
  mode: 'production',
  plugins: [
    // 针对source-map的设置，生成哪些map文件。并且地址是多少可以自己添加。在线上出问题的时候。可以进行排查。
    new SourceMapDevToolPlugin({
      filename: '[file].map',
      append: '\n//# sourceMappingURL=http://localhost:12345/sourcemap/[url]'
    }),
    new FileManagerWebpackPlugin({
      events: {
        onStart: {
          delete: [resolve(cwd(), 'sourcemap/*.map')]
        },
        onEnd: {
          copy: [
            {
              source: resolve(cwd(), 'dist/**/*.map'),
              destination: resolve(cwd(), 'sourcemap')
            }
          ],
          // 删除js下面的全部的map文件。
          delete: [resolve(cwd(), 'dist/js/*.map')]
        }
      }
    }),
    new EslintPlugin({
      extensions: ['js', 'ts', 'tsx', 'jsx', 'josn'],
      exclude: 'node_modules',
      fix: true,
      emitWarning: true,
      threads: true
    })
  ]
  // devtool: 'hidden-source-map' // 最适合生产环境的source-map
})
