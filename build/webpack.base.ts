import HtmlWebpackPlugin from 'html-webpack-plugin'
import { resolve } from 'path'
import { Configuration, DefinePlugin } from 'webpack'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import type { LoaderOptions } from 'mini-css-extract-plugin'
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import EslintPlugin from 'eslint-webpack-plugin'
import { cwd } from 'process'

// webpack全局配置
const config: Configuration = {
  context: __dirname, // 入口的基本目录，是绝对路径。入口基于这个找
  entry: { app: resolve(cwd(), 'src/index.tsx') },
  output: {
    path: resolve(cwd(), 'dist'),
    filename: 'js/[name].[contenthash:8].js',
    // publicPath: '/assets', // 给所有的输出的添加一个公共前缀。一般是配置线上的文件路径。
    assetModuleFilename: 'images/[name].[contenthash:8][ext][query]' // 模块输出的文件名, 图片或者文件等下的路径
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      env: resolve(cwd(), `src/env/${process.env.SF_ENV || 'work'}`)
    }
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
                /node_modules[\\/]core-js/,
                /node_modules[\\/]webpack[\\/]buildin/
              ]
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.tsx?$/,
        use: [
          'source-map-loader',
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
              transpileOnly: true,
              configFile: resolve(cwd(), 'tsconfig.json')
            }
          }
        ],
        exclude: [
          /node_modules[\\/]core-js/,
          /node_modules[\\/]webpack[\\/]buildin/
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
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: resolve(cwd(), 'tsconfig.json')
      }
    }),
    // ESlint的验证
    // 使用eslint来检查错误，然后爆出来，警告的错误
    new EslintPlugin({
      extensions: ['js', 'ts', 'tsx', 'jsx', 'josn'],
      exclude: 'node_modules',
      fix: true,
      emitWarning: false
    }),
    new HtmlWebpackPlugin({
      template: resolve(cwd(), 'public/index.html')
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css'
    }),
    // 定义全局变量,将代码中进行文本的替换
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
    // new BundleAnalyzerPlugin({}),
  ]
}

export default config
