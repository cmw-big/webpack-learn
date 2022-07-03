import webpack, { type Configuration } from 'webpack'
import * as webpackMerge from 'webpack-merge'
import FileManagerWebpackPlugin from 'filemanager-webpack-plugin'
import { resolve } from 'path'
import { cwd } from 'process'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import baseConfig from './webpack.base.js'

const { SourceMapDevToolPlugin } = webpack
export default function getWebpackProdConfig(
  relativePath: string,
  baseOptions: Configuration = {},
  prodOptions: Configuration = {}
) {
  return webpackMerge.merge(baseConfig(relativePath, baseOptions), {
    externals: {
      react: 'React', // key是模块中引入的包的名称，value是最终cdn导出后暴露在全局的变量。
      'react-dom': 'ReactDOM'
    },
    mode: 'production',
    // 优化选项
    optimization: {
      minimize: !baseOptions.mode || baseOptions.mode === 'production',
      // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer 配置。
      minimizer:
        !baseOptions.mode || baseOptions.mode === 'production'
          ? [`...`, new CssMinimizerPlugin()]
          : [] // 压缩css，但是这只是在mode=production时生效。如果想要在development模式下生效，就需要配置optimization.minimizer:true
    },
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
      })
    ],
    devtool: 'hidden-source-map', // 最适合生产环境的source-map
    ...prodOptions
  })
}
