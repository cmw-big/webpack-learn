import globModule from 'glob'
import packageJson from '../../../package.json'

const { glob } = globModule

export function getAllPackagesName(paths: string[] = packageJson.workspaces) {
  const packages: string[] = []
  paths.forEach(item => {
    packages.push(...glob.sync(item))
  })
  return packages
}
