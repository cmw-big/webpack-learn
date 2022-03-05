import type { Configuration as DevServerConfiguration } from 'webpack-dev-server'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { resolve } from 'path'
import type { Configuration } from 'webpack'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import type { LoaderOptions } from 'mini-css-extract-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
// 使用eslint来检查错误，然后爆出来
import EslintPlugin from 'eslint-webpack-plugin'
// 开发服务器配置（其中扩展了webpack的Configuration接口，扩展了一个devServer属性，这样写的话就不会报错）
const devServer: DevServerConfiguration = {
  // 该配置项允许配置从目录提供静态文件的选项（默认是 'public' 文件夹）。将其设置为 false 以禁用：
  // 主要是为了和一些服务器的配置一样。为了一些资源本地没有，但是线上有。这样配置这个就能在本地开发和线上都能正常访问了。
  static: {
    // 也就是说，静态资源首先会找输出目录，如果没有找到，就会找项目根目录下的 public 文件夹。
    directory: resolve(process.cwd(), 'static'),
    // 告诉服务器在哪个 URL 上提供 static.directory 的内容。
    publicPath: '/' // 默认是和output.publicPath一样的。
  },
  port: 12356, // 开启的端口
  open: true, // 自动打开浏览器
  compress: true // 是否启用压缩（gzip compression）
}
// webpack全局配置
const config: Configuration = {
  context: __dirname, // 入口的基本目录，是绝对路径。入口基于这个找
  mode: 'development',
  entry: { app: './src/index.tsx' },
  devtool: 'source-map',
  devServer,
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'js/[name].[contenthash:8].js',
    // publicPath: '/assets', // 给所有的输出的添加一个公共前缀。一般是配置线上的文件路径。
    assetModuleFilename: 'images/[name].[contenthash:8][ext][query]' // 模块输出的文件名
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
  },
  module: {
    rules: [
      {
        test: /\.m?jsx?$/,
        enforce: 'pre',
        use: [
          'source-map-loader',
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              exclude: [
                // \\ for Windows, \/ for Mac OS and Linux
                /node_modules[\\\/]core-js/,
                /node_modules[\\\/]webpack[\\\/]buildin/
              ]
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          },
          {
            loader: 'ts-loader',
            options: {
              // 只做代码转化，不做类型检查
              transpileOnly: true
            }
          }
        ],
        exclude: [
          // \\ for Windows, \/ for Mac OS and Linux
          /node_modules[\\\/]core-js/,
          /node_modules[\\\/]webpack[\\\/]buildin/
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // publicPath: '/assets', // 为css中的外部图像，文件等资源加上公共前缀。
            } as LoaderOptions
          },
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // publicPath: '/assets', // 为css中的外部图像，文件等资源加上公共前缀。
            } as LoaderOptions
          },
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.s[a|c]ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // publicPath: '/assets', // 为css中的外部图像，文件等资源加上公共前缀。
            } as LoaderOptions
          },
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|svg|gif|webp)/,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    //   将ts的类型检查放入单独的进程。不然每次热更新编译一次的话。类型检查都会比较慢
    new ForkTsCheckerWebpackPlugin(),
    new EslintPlugin({
      extensions: ['js', 'ts', 'tsx', 'jsx'],
      exclude: 'node_modules',
      fix: true
    }),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, 'public/index.html')
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css'
    })
    // new BundleAnalyzerPlugin({}),
  ]
}

export default config
