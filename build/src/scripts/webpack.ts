import { execSync } from 'child_process'
import { log } from 'console'
import webpack, { type Configuration } from 'webpack'
import WebpackDevServer from 'webpack-dev-server'

export function runWebpack(config: Configuration) {
  // 每次打包之前，先进行类型检查
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
        ignored: ['/**node_modules', '**/dist'], // 这些文件改变，不重新打包
        poll: false // 是否开启轮询，不开启，浪费性能
      },
      (err, stats) => {
        if (err) {
          log('err=>', err)
          return
        }
        log(
          stats?.toString({
            colors: true,
            assetsSort: '!size',
            errorDetails: true
          }) || ''
        )
      }
    )
  } else {
    console.dir(config, { depth: null })
    compiler.run((err, stats) => {
      if (err) {
        console.error('webpack err', err)
        return
      }
      if (stats?.hasErrors()) {
        console.error(
          'webpack stats hasErrors',
          stats.toString({ colors: true, errorDetails: true })
        )
      }
      console.log(stats?.toString({ colors: true, errorDetails: true }))
    })
  }
}
