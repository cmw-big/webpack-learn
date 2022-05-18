import HtmlWebpackPlugin from 'html-webpack-plugin'
import { resolve } from 'path'
import { Configuration, DefinePlugin } from 'webpack'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import { cwd } from 'process'
import glob from 'glob'
import CopyPlugin from 'copy-webpack-plugin'
import { accessSync, constants } from 'fs'
import EslintPlugin from 'eslint-webpack-plugin'

const entry = glob.sync('./src/index.ts?(x)')[0]
const outputPath = resolve(cwd(), 'dist')

const config: Configuration = {
  context: resolve(cwd()), // 入口的基本目录，是绝对路径。入口基于这个找
  entry,
  output: {
    path: outputPath,
    filename: 'js/[name].[contenthash:8].js', // 一般是入口代码块的名字
    // 一般是非入口代码块的名字。可能是分包产生，也可能是懒加载（动态加载）产生。import()语法加载模块
    chunkFilename: 'js/[name].[contenthash:8].js',
    publicPath: '/', // 给所有的输出的添加一个公共前缀。一般是配置线上的文件路径。我这里添加了一个公共路径是/的。如果不写的话。可能刷新页面之后，html中js的相对路径就是错误的了。
    assetModuleFilename: 'images/[name].[contenthash:8][ext][query]' // 模块输出的文件名, 图片或者文件等下的路径
  },
  stats: {
    colors: true
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      env: resolve(cwd(), `src/env/${process.env.SF_ENV || 'work'}`),
      '@': resolve(cwd(), 'src')
    }
  },
  module: {
    rules: [
      {
        test: /\.m?jsx?$/,
        use: [
          'source-map-loader',
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
              // exclude: [
              //   // \\ for Windows, \/ for Mac OS and Linux
              //   /node_modules[\\/]core-js/,
              //   /node_modules[\\/]webpack[\\/]buildin/
              // ]
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
              configFile: resolve(
                cwd(),
                `tsconfig${
                  process.env.NODE_ENV !== 'production' ? '.dev' : ''
                }.json`
              )
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
            }
          },
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // publicPath: '/assets', // 为css中的外部图像，文件等资源加上公共前缀。
            }
          },
          'css-loader',
          'postcss-loader',
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
            }
          },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|svg|gif|webp)/,
        type: 'asset'
      }
    ]
  },
  optimization: {
    minimizer: [`...`, new CssMinimizerPlugin()]
  },
  plugins: [
    //   将ts的类型检查放入单独的进程。不然每次热更新编译一次的话。类型检查都会比较慢
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: resolve(cwd(), 'tsconfig.json')
      }
    }),
    // webpack在打包之后，会把所有产出的资源，放到assets对象上。然后这个插件都会把这个对象里面的资源放到html中。
    new HtmlWebpackPlugin({
      template: resolve(cwd(), 'public/index.html')
    }),
    new CleanWebpackPlugin(),
    // 把搜集的css生成一个单独的文件。然后交给htmlwebpackplugin加入到html进行引用
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css'
    }),
    // 定义全局变量,将代码中进行文本的替换
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new EslintPlugin({
      extensions: ['js', 'ts', 'tsx', 'jsx', 'josn'],
      exclude: 'node_modules',
      fix: true,
      emitWarning: true,
      threads: true
    })
    // new BundleAnalyzerPlugin({}),
  ]
}
const staticPath = resolve(cwd(), 'static')

// 复制静态资源到指定目录
try {
  accessSync(staticPath, constants.R_OK)
  config.plugins?.push(
    new CopyPlugin({
      patterns: [
        {
          from: resolve(cwd(), 'static'),
          to: resolve(cwd(), resolve(outputPath, 'static'))
        }
      ]
    })
  )
} catch (error) {
  // console.error('文件不存在', error)
}
// 复制静态内容

export default config
