/* eslint-disable no-console */
/**
 * TODO 编写脚本执行webpack打包，使用config里面的配置
 */

import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import chalk from 'chalk'
import config from '../config'

const { log } = console
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
      if (!stats?.hasErrors()) {
        const statsStr = stats?.toString()
        const assetsInfo = stats?.compilation.emittedAssets

        const greenStrList = [
          '[immutable]',
          '[emitted]',
          'successfully',
          '[copied]',
          ...(assetsInfo || [])
        ]
        const redStrList = ['[not cacheable]']
        const yellowStrList = ['[code generated]', '[built]']
        const allStrList = [greenStrList, redStrList, yellowStrList]
        let newStr = statsStr
        allStrList.forEach((strList, index) => {
          let chalkColor = chalk.green
          if (index === 1) {
            chalkColor = chalk.red
          } else if (index === 2) {
            chalkColor = chalk.yellow
          }
          strList.forEach(str => {
            newStr =
              newStr?.replaceAll(str, value => {
                return chalkColor(chalk.bold(value))
              }) || ''
          })
        })
        log(newStr)
      }
    }
  )
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
