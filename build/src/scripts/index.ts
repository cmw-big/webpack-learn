/* eslint-disable no-console */
/**
 * TODO 编写脚本执行webpack打包，使用config里面的配置
 */

import { execSync } from 'child_process'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import config from '../config'

const { log } = console
execSync('tsc -b')
const compiler = webpack(config)
if (process.env.NODE_ENV === 'development') {
  const server = new WebpackDevServer(config.devServer, compiler)
  const runServer = async () => {
    log('Starting server...')
    await server.start()
  }
  runServer()
} else if (config.watch) {
  compiler.watch(
    {
      aggregateTimeout: 200,
      poll: 1000
    },
    (err, stats) => {
      if (err) {
        log('err=>', err)
        return
      }
      log(
        stats?.toString({
          colors: true,
          assetsSort: '!size'
        }) || ''
      )
    }
  )
} else {
  compiler.run((err, stats) => {
    if (err) {
      console.error('webpack err', err)
      return
    }
    if (stats?.hasErrors()) {
      console.error('webpack stats hasErrors', stats.toString({ color: true }))
    }
  })
}
