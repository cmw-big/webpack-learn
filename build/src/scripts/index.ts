import fs from 'fs'
/* eslint-disable no-console */
/**
 * TODO 编写脚本执行webpack打包，使用config里面的配置
 */

import { Command, type OptionValues } from 'commander'
import { glob } from 'glob'
import { env } from 'process'
import getConfig from '../config'
import { getAllPackagesName } from './utils'
import { runWebpack } from './webpack'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const inquirer = require('inquirer')

let inquirerConfig: OptionValues = {}
const { log } = console

const program = new Command()

// program
//   .option('dev [package]')
//   .description('start: start the development server')
//   .version('0.0.1', '-v --version')
//   .action(async source => {
// if (!source) {
// 如果没有source的话，我就执行抛出选择列表供用户选择执行哪一个包
const packages = getAllPackagesName()
async function inquirePromptList() {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'which package start',
      choices: packages
    }
  ])
  Object.values(answers).forEach(item => {
    const packagePath = glob.sync(item as string, {
      fs
    })[0]
    // 找到入口文件了，可以开始工作了。将环境变成开发环境
    const config = getConfig(
      packagePath,
      {},
      {
        mode:
          inquirerConfig.dev || env.NODE_ENV === 'development'
            ? 'development'
            : 'production',
        optimization: {},
        watch: !!inquirerConfig.watch
      }
    )
    runWebpack(config) // 运行webpack
  })
}
inquirePromptList()

// }
// })
program
  .option('-w --watch', 'watch mode')
  .option('-d --dev')
  .option('-p --production')
  .parse(process.argv)

const options = program.opts()
inquirerConfig = options
