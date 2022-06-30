import fs from 'fs'
/* eslint-disable no-console */
/**
 * TODO 编写脚本执行webpack打包，使用config里面的配置
 */

import { Command, type OptionValues } from 'commander'
import globModule from 'glob'
import { env } from 'process'
import inquirer from 'inquirer'
import getConfig from '../config/index.js'
import { getAllPackagesName } from './utils.js'
import { runWebpack } from './webpack.js'

const { glob } = globModule
let inquirerConfig: OptionValues = {}
const program = new Command()
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
  Object.values(answers).some(item => {
    const packagePath = glob.sync(item as string, {
      fs
    })[0]
    // 找到入口文件了，可以开始工作了。将环境变成开发环境
    const config = getConfig(
      packagePath,
      {
        mode:
          inquirerConfig.dev || env.ENV === 'development'
            ? 'development'
            : 'production'
      },
      {
        mode:
          inquirerConfig.dev || env.ENV === 'development'
            ? 'development'
            : 'production',
        watch: !!inquirerConfig.watch
      }
    )
    runWebpack(config) // 运行webpack
    return true
  })
}
inquirePromptList()

program
  .option('-w --watch', 'watch mode')
  .option('-d --dev')
  .option('-p --production')
  .parse(process.argv)

const options = program.opts()
inquirerConfig = options
