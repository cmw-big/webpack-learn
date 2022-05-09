/**
 * TODO 编写脚本执行webpack打包，使用config里面的配置
 */

import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import config from '../config'

const compiler = webpack(config)
if (process.env.NODE_ENV === 'development') {
  const server = new WebpackDevServer(config.devServer, compiler)
  const runServer = async () => {
    console.log('Starting server...')
    await server.start()
  }
  runServer()
} else {
  compiler.run((err, stats) => {
    if (err) {
      console.error('webpack err', err)
      return
    }
    if (stats?.hasErrors()) {
      console.error('webpack stats hasErrors', stats.toString())
    }
  })
}
