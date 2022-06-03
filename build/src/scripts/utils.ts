import globModule from 'glob'
import { createRequire } from 'module'

const { glob } = globModule
const requireFn = createRequire(import.meta.url)
const packageJson = requireFn('../../../package.json')

export function getAllPackagesName(paths: string[] = packageJson.workspaces) {
  const packages: string[] = []
  paths.forEach(item => {
    packages.push(...glob.sync(item))
  })
  return packages
}
