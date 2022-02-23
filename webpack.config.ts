import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { resolve } from 'path';
import type { Configuration } from 'webpack';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
// 开发服务器配置（其中扩展了webpack的Configuration接口，扩展了一个devServer属性，这样写的话就不会报错）
const devServer: DevServerConfiguration = {};
// webpack全局配置
const config: Configuration = {
  context: __dirname, // 入口的基本目录，是绝对路径
  mode: 'development',
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  devServer,
  output: {
    path: resolve(__dirname, 'dist'),
    filename: '[name].[contenthash:8].js',
  },
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          // 只做代码转化，不做类型检查
          transpileOnly: true,
        },
      },
    ],
  },
  plugins: [
    //   将ts的类型检查放入单独的进程
    new ForkTsCheckerWebpackPlugin(),
  ],
};

export default config;
