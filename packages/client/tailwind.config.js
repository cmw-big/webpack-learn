// eslint-disable-next-line @typescript-eslint/no-var-requires
const { cwd } = require('process')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const baseTailwindConfig = require('../../tailwind.config')

module.exports = {
  ...baseTailwindConfig,
  content: ['src/**/*.{js,jsx,ts,tsx}']
}

console.log(cwd(), '=======')
