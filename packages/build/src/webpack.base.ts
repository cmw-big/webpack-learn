import HtmlWebpackPlugin from 'html-webpack-plugin'
import { resolve } from 'path'
import { Configuration, DefinePlugin, sources } from 'webpack'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { cwd } from 'process'
import glob from 'glob'

const entry = glob.sync('./src/index.ts?(x)')[0]

const config: Configuration = {
  context: resolve(cwd()), // 入口的基本目录，是绝对路径。入口基于这个找
  entry,
  output: {
    path: resolve(cwd(), 'dist'),
    filename: 'js/[name].[contenthash:8].js',
    publicPath: '/', // 给所有的输出的添加一个公共前缀。一般是配置线上的文件路径。我这里添加了一个公共路径是/的。如果不写的话。可能刷新页面之后，html中js的相对路径就是错误的了。
    assetModuleFilename: 'images/[name].[contenthash:8][ext][query]' // 模块输出的文件名, 图片或者文件等下的路径
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      env: resolve(cwd(), `src/env/${process.env.SF_ENV || 'work'}`),
      '@': resolve(cwd(), 'src')
    }
  },
  // 跟编译有关，和开发的没什么关系。
  watch: true,
  watchOptions: {
    ignored: '**/node_modules', // 忽略node_modules目录下的文件
    aggregateTimeout: 300, // 等文件变动后300ms内重新编译
    poll: 1000 // 每秒询问文件变动 轮询，数字越大，越敏感
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
          {
            loader: 'postcss-loader'
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
            }
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
            }
          },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
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
    }),
    {
      apply(compiler) {
        compiler.hooks.emit.tap('addPl', compilation => {
          Object.entries(compilation.assets).forEach(([pathname, source]) => {
            const size = source.size()

            if (size <= 1) {
              compilation.updateAsset(pathname, source => {
                return new sources.RawSource(
                  `/* 娃娃飒飒大苏打*/${source.source()}`
                )
              })
            }
          })
        })
      }
    }
    // new BundleAnalyzerPlugin({}),
  ]
}
export default config
