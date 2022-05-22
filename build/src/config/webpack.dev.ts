import { resolve } from 'path'
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server'
import webpackMerge from 'webpack-merge'
import EslintPlugin from 'eslint-webpack-plugin'
import { randomInt } from 'crypto'
import { type Configuration } from 'webpack'
import baseConfig from './webpack.base'

// 开发服务器配置（其中interface扩展了webpack的Configuration接口，扩展了一个devServer属性，这样写的话就不会报错）
const devServer: DevServerConfiguration = {
  // 该配置项允许配置从目录提供静态文件的选项（默认是 'public' 文件夹）。将其设置为 false 以禁用：
  // 主要是为了和一些服务器的配置一样。为了一些资源本地没有，但是线上有。这样配置这个就能在本地开发和线上都能正常访问了。
  static: {
    // 也就是说，静态资源首先会找输出目录，如果没有找到，就会找项目根目录下的 public 文件夹。
    directory: resolve(process.cwd(), 'static')
    // 告诉服务器在哪个 URL 上提供 static.directory 的内容。
    // publicPath: '/' // 默认是和output.publicPath一样的。
  },
  historyApiFallback: true, // 当匹配不到对应的路由的时候，渲染index.html文件。
  port: randomInt(62000), // 开启的端口
  open: true, // 自动打开浏览器
  compress: true, // 是否启用压缩（gzip compression）
  proxy: {
    '/api': { target: 'http://api.duyiedu.com', changeOrigin: true }
  }
}

export default function getWebpackDevConfig(
  relativePath: string,
  baseOptions: Configuration = {},
  devOptions: Configuration = {}
) {
  return webpackMerge(baseConfig(relativePath, baseOptions), {
    devServer,
    devtool: 'eval-source-map', // 最适合开发环境的source-map,初始化慢，rebuild快
    mode: 'development',
    plugins: [
      // ESlint的验证
      // 使用eslint来检查错误，然后爆出来，警告的错误
      new EslintPlugin({
        extensions: ['js', 'ts', 'tsx', 'jsx', 'josn'],
        exclude: 'node_modules',
        fix: true,
        emitWarning: false,
        threads: true
      })
    ],
    ...devOptions
  })
}
