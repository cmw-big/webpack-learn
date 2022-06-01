import { log } from 'console'
import glob from 'glob'
import packageJson from '../../../package.json'

export function getAllPackagesName(paths: string[] = packageJson.workspaces) {
  const packages: string[] = []
  paths.forEach(item => {
    packages.push(...glob.sync(item))
  })
  return packages
}

const a = await Promise.resolve(1)
log(a)
